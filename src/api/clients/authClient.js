export class AuthClient {
    constructor(request) {
        this.request = request;
    }

    async registerUser(data) {
        const response = await this.request.post('/api/register', { data });
        return response;
    }

    async loginUser(data) {
        const response = await this.request.post('/api/login', { data });
        return response;
    }
}