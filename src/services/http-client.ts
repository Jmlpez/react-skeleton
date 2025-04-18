type RequestOptions = {
    method?: string;
    data?: string | FormData;
};

/**
 * A class to handle HTTP requests to a specified base URL.
 */
export class HttpClient {
    baseUrl: string;
    defaultHeaders: HeadersInit;

    constructor(baseUrl?: string) {
        // Use provided baseUrl or fallback to environment variable or default value.
        this.baseUrl = baseUrl || '/';
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
    }

    private async request<TResult>(endpoint: string, { method = 'GET', data }: RequestOptions): Promise<TResult> {
        const options: RequestInit = {
            method,
            // credentials: 'include',
            headers: this.defaultHeaders,
        };

        if (data) {
            options.body = data;
        }

        const response = await fetch(this.baseUrl + endpoint, options);

        // try {
        // Check for HTTP error statuses.
        if (!response.ok) {
            // Try to extract error details.
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }
        return response.json();
        // } catch (e: unknown) {
        // if (!(e instanceof KatanaApiError)) throw Error(UnknownError);
        // }
    }

    async get<TResult>(endpoint: string): Promise<TResult> {
        return this.request<TResult>(endpoint, { method: 'GET' });
    }

    async post<TResult>(endpoint: string, data: string | FormData): Promise<TResult> {
        return this.request<TResult>(endpoint, { method: 'POST', data });
    }

    async put<TResult>(endpoint: string, data: string | FormData): Promise<TResult> {
        return this.request<TResult>(endpoint, { method: 'PUT', data });
    }

    async delete<TResult>(endpoint: string): Promise<TResult> {
        return this.request<TResult>(endpoint, { method: 'DELETE' });
    }
}

export default new HttpClient();
