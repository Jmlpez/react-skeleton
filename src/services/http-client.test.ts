// HttpClient.test.ts
import { HttpClient } from './http-client';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('HttpClient', () => {
    const client = new HttpClient('https://fake-api.com');

    beforeEach(() => {
        mockFetch.mockReset();
    });

    test('should make a GET request', async () => {
        const mockResponse = { data: 'test' };
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        } as Response);

        const result = await client.get<{ data: string }>('/endpoint');

        expect(mockFetch).toHaveBeenCalledWith('https://fake-api.com/endpoint', expect.objectContaining({
            method: 'GET'
        }));
        expect(result).toEqual(mockResponse);
    });

    test('should make a POST request with data', async () => {
        const mockResponse = { success: true };
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        } as Response);

        const result = await client.post<{ success: boolean }>('/endpoint', JSON.stringify({ name: 'Katana' }));

        expect(mockFetch).toHaveBeenCalledWith('https://fake-api.com/endpoint', expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ name: 'Katana' })
        }));
        expect(result).toEqual(mockResponse);
    });

    test('should throw an error if response is not ok', async () => {
        const mockError = { error: 'Unauthorized' };
        mockFetch.mockResolvedValueOnce({
            ok: false,
            json: async () => mockError
        } as Response);

        await expect(client.get('/unauthorized')).rejects.toThrow(JSON.stringify(mockError));
    });
});

