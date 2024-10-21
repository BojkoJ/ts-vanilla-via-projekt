import { IncomingMessage } from "http";

declare module "http" {
	interface IncomingMessage {
		session?: { userId?: number };
		body?: any;
	}
}
