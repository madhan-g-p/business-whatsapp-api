import express, { Request, Response } from 'express';

export class WebhooksHandler {
  private app: express.Application;
  private messageCallbacks: ((message: any) => void)[] = [];
  private statusCallbacks: ((status: any) => void)[] = [];
  private authErrorCallbacks: ((error: any) => void)[] = [];

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.setupRoutes();
  }

  /**
   * Register a callback for incoming messages
   * @param callback Function to handle incoming messages
   */
  onMessage(callback: (message: any) => void): void {
    this.messageCallbacks.push(callback);
  }

  /**
   * Register a callback for message status updates
   * @param callback Function to handle status updates
   */
  onMessageStatus(callback: (status: any) => void): void {
    this.statusCallbacks.push(callback);
  }

  /**
   * Register a callback for authentication errors
   * @param callback Function to handle auth errors
   */
  onAuthError(callback: (error: any) => void): void {
    this.authErrorCallbacks.push(callback);
  }

  /**
   * Verify a webhook request
   * @param mode The verification mode
   * @param token The verification token
   * @param challenge The challenge string
   * @returns The challenge response
   */
  verifyWebhook(mode: string, token: string, challenge: string): string {
    return mode === 'subscribe' && token === challenge ? challenge : '';
  }

  /**
   * Handle an incoming webhook request
   * @param req The request object
   * @param res The response object
   */
  handleWebhook(req: Request, res: Response): void {
    try {
      const body = req.body;

      if (body.object === 'whatsapp_business_account') {
        if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages) {
          // Handle incoming messages
          const messages = body.entry[0].changes[0].value.messages;
          messages.forEach((message: any) => {
            this.messageCallbacks.forEach(callback => callback(message));
          });
        }

        if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.statuses) {
          // Handle status updates
          const statuses = body.entry[0].changes[0].value.statuses;
          statuses.forEach((status: any) => {
            this.statusCallbacks.forEach(callback => callback(status));
          });
        }
      }

      res.status(200).send('EVENT_RECEIVED');
    } catch (error) {
      this.authErrorCallbacks.forEach(callback => callback(error));
      res.status(500).send('ERROR');
    }
  }

  /**
   * Get the Express app for webhook handling
   * @returns Express application
   */
  getApp(): express.Application {
    return this.app;
  }

  /**
   * Setup webhook routes
   */
  private setupRoutes(): void {
    this.app.get('/webhook', (req, res) => {
      const mode = req.query['hub.mode'] as string;
      const token = req.query['hub.verify_token'] as string;
      const challenge = req.query['hub.challenge'] as string;

      const verifyToken = process.env.WEBHOOK_VERIFY_TOKEN || 'YOUR_VERIFY_TOKEN';

      if (mode && token) {
        if (mode === 'subscribe' && token === verifyToken) {
          console.log('WEBHOOK_VERIFIED');
          res.status(200).send(challenge);
        } else {
          res.status(403).send('Forbidden');
        }
      } else {
        res.status(400).send('Bad Request');
      }
    });

    this.app.post('/webhook', (req, res) => {
      this.handleWebhook(req, res);
    });
  }
}
