import { HandlerType } from './types';
import { Update } from '../filters';
export declare function wrapHandler(handler: HandlerType): (update: Update) => Promise<void>;
