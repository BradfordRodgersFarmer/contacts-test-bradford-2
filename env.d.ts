interface CloudflareEnv {
    DB: D1Database;
}

interface ProcessEnv {
    [key: string]: string | undefined;
    DATABASE: D1Database;
}