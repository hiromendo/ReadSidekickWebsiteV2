interface HttpRequest {
    method: string;
    headers: Record<string, string | undefined>;
    body?: unknown;
    query?: Record<string, string | string[] | undefined>;
}
interface HttpResponse {
    set(key: string, value: string): void;
    status(code: number): HttpResponse;
    send(body: string): void;
    json(body: unknown): void;
}
export declare function generateFlashcardsHandler(req: HttpRequest, res: HttpResponse): Promise<void>;
export {};
