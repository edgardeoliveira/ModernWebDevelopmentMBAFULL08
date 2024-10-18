import { User } from "../models/user"
import { getLoggedUser } from './auth.service'

class UserService {

    private url = 'http://localhost:3030/users'

    private getHeaders() {
        const logged = getLoggedUser()
        if (!logged) new Error('Token Inválido!')

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${logged?.token}`
        } as HeadersInit
    }

    private async getData(response: Response) {
        if (response.status >= 200 && response.status < 300) {
            return await response.json()
        }
        throw new Error(response.statusText, { cause: response.status })
    }

    public async getUsers() {
        const response = await fetch(this.url, {
            method: 'GET',
            headers: this.getHeaders()
        })
        return await this.getData(response) as User[]
    }

    public async getById(id: number) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'GET',
            headers: this.getHeaders()
        })
        return await this.getData(response) as User
    }

    public async create(user: User) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(user)
        })
        return await this.getData(response) as User
    }

    public async update(user: User) {
        const response = await fetch(`${this.url}/${user.id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(user)
        })
        return await this.getData(response) as User
    }

    public async delete(id: number) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        })
        return await this.getData(response) as boolean
    }
}

export const userService = new UserService()