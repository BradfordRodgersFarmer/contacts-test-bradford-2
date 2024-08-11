import { getRequestContext } from '@cloudflare/next-on-pages';
let baseDatabase: any;

if (process.env.NODE_ENV === "development") {
    const { env } = getRequestContext();
    baseDatabase = env.DB;
} else {
    baseDatabase = (process.env as any).DB;
}

export const baseDb = baseDatabase;