import axios from 'axios';
import nock from 'nock';
import { executeWithMiddleware } from './middleware';
import { retry } from './retry';

describe('retry', () => {
    const HTTP_STATUS = {
        OK: 200,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        SERVICE_UNAVAILABLE: 504
    };

    it('No retry needed', async () => {
        nock('https://example.com', {})
            .get('/retry').reply(HTTP_STATUS.OK);

        const request = () => axios.request({
            baseURL: 'https://example.com',
            method: 'get',
            url: '/retry'
        });

        await expect(
            executeWithMiddleware([retry(0)],
                { uri: 'https://example.com', args: [] },
                request)
        ).resolves.not.toThrow();
    });

    it('Needs to retry twice', async () => {
        nock('https://example.com', {})
            .get('/retry').reply(HTTP_STATUS.SERVICE_UNAVAILABLE)
            .get('/retry').reply(HTTP_STATUS.SERVICE_UNAVAILABLE)
            .get('/retry').reply(HTTP_STATUS.OK);

        const request = () => axios.request({
            baseURL: 'https://example.com',
            method: 'get',
            url: '/retry'
        });

        await expect(
            executeWithMiddleware([retry(2)],
                { uri: 'https://example.com', args: [] },
                request)
        ).resolves.not.toThrow();
    });

    it('Does not retry on HTTP Status 401', async () => {
        nock('https://example.com', {})
            .get('/retry').reply(HTTP_STATUS.UNAUTHORIZED);

        const request = () => axios.request({
            baseURL: 'https://example.com',
            method: 'get',
            url: '/retry'
        });

        await expect(
            executeWithMiddleware([retry(2)],
                { uri: 'https://example.com', args: [] },
                request)
        ).resolves.toThrow();
    });
});
