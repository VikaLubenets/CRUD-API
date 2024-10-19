import { IncomingMessage, ServerResponse } from 'http';
import { ParsedUrlQuery } from 'querystring';
import type { User } from './src/types';

declare module 'http' {
    interface IncomingMessage {
        users: User[];
        query: URL;
        body?: Buffer | string | Partial<User>; 
    }
}
