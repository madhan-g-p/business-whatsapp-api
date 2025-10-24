# business-whatsapp-api

TypeScript SDK for WhatsApp Cloud API with full ESM & CommonJS support.
## Features

- Full TypeScript support with type definitions
- ESM and CommonJS compatibility
- Fluent API for building messages, templates, and flows
- Comprehensive validation
- Webhook handling
- Full async support
- Error handling with custom error classes
- Modular structure for selective imports
- Media upload and management
- Business account management
- Interactive flows support
- Call handling
- User preferences management

## Installation

```bash
npm install business-whatsapp-api
```
## API Version
By default this package uses facebook graph api of version ```v23.0``` , you can update it in your app environment variable.

```node
process.env.FB_GRAPH_API_VERSION = <latest_version>
```
## QuickStart
```typescript
// ESM
import { WhatsAppClient } from 'business-whatsapp-api';
import { text } from 'business-whatsapp-api/messages';
import { template } from 'business-whatsapp-api/templates';

// CommonJS
const { WhatsAppClient } = require('business-whatsapp-api');
const { text } = require('business-whatsapp-api/messages');
const { template } = require('business-whatsapp-api/templates');

const client = new WhatsAppClient('phone_number_id', 'access_token');

// Send a text message
const message = text()
  .to('1234567890')
  .body('Hello, World!')
  .build();

await client.sendMessage(message);

// Send a template
const templateMessage = template()
  .name('shipping_confirmation')
  .language('en_US')
  .addBody([parameter().text('Your order has been shipped!').build()])
  .build();

await client.sendTemplate(templateMessage);
```

## Module Structure
The package is organized into modules for better organization:

- client: Core client functionality
- messages: Message types and builders
- templates: Template functionality
- flows: Interactive flows
- filters: Message filtering
- handlers: Event handlers
- listeners: Async listeners
- utils: Utility functions
- types: Type definitions

## Selective Imports
```typescript
// Import only what you need
import { WhatsAppClient } from 'business-whatsapp-api/client';
import { TextMessageBuilder, ImageMessageBuilder } from 'business-whatsapp-api/messages';
import { TemplateBuilder } from 'business-whatsapp-api/templates';
import { FlowBuilder } from 'business-whatsapp-api/flows';
import { MessageFilterComposer } from 'business-whatsapp-api/filters';
import { isValidPhoneNumber } from 'business-whatsapp-api/utils';
```

The Following code snippets would come in handy for quick start and better understanding of the package.
<style>
    summary{
        font-weight: bold;
        font-size: 18px;
    }
</style>
<details>
    <summary>Client Initialization</summary>

```typescript
const client = new WhatsAppClient('phone_number_id', 'access_token');
```
</details>

<details>
    <summary>Sending Messages</summary>
    
```typescript
const textMessage = text().to('1234567890')
                    .body('Hello, World!')
                    .build();

await client.sendMessage(textMessage);

const imageMessage = image().to('1234567890')
            .link('https://example.com/image.jpg')
            .caption('Check this image')
            .build();

await client.sendMessage(imageMessage);
```
</details>

<details>
    <summary>Sending Templates</summary>

```typescript
const templateMessage = template()
  .name('shipping_confirmation')
  .language('en_US')
  .addBody([parameter().text('Your order has been shipped!').build()])
  .build();

await client.sendTemplate(templateMessage);
```

</details>

<details>
    <summary>Handling Webhooks</summary>

```typescript
// Set up webhook handlers
client.onMessage((message) => {
  console.log('Received message:', message);
});

client.onMessageStatus((status) => {
  console.log('Message status:', status);
});

// Handle webhook requests (Express example)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  
  if (mode && token) {
    if (mode === 'subscribe' && token === process.env.WEBHOOK_VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.status(403).send('Forbidden');
    }
  }
});

app.post('/webhook', (req, res) => {
  client.handleWebhook(req, res);
});
```
</details>

<details>
    <summary>Using Filters</summary>

```typescript
import { filter } from 'business-whatsapp-api/filters';

const filterObj = filter()
  .since('2023-01-01')
  .limit(10)
  .build();

const messages = await client.getMessages(filterObj);
```
</details>

<details>
    <summary>Using Handlers</summary>

```typescript
import { onMessage } from 'business-whatsapp-api/handlers';

async handleMessage(message: any) {
  console.log('Received message:', message.text);
}

onMessage(handleMessage)
```
</details>

<details>
    <summary>Using Listeners</summary>

```typescript
import { waitForReply } from 'business-whatsapp-api/listeners';

// Wait for a reply to a message
const reply = await waitForReply(message, { timeout: 30000 });
console.log('Received reply:', reply.text);
```
</details>
