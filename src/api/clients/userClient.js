export class UserClient {
    constructor(request) {
        this.request = request;
    }

    // GET
    async getUsersList(page = 1) {
        const response = await this.request.get(`/api/users?page=${page}`);
        return response;
    }

    async getUserById(id) {
        const response = await this.request.get(`/api/users/${id}`);
        return response;
    }

    // POST
    async createUser(data) {
        const response = await this.request.post('/api/users', { data });
        return response;
    }

    // PUT
    async updateUser(id, data) {
        const response = await this.request.put(`/api/users/${id}`, { data });
        return response;
    }

    // DELETE
    async deleteUser(id) {
        const response = await this.request.delete(`/api/users/${id}`);
        return response;
    }
}