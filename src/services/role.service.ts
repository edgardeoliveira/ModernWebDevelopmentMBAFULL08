import { Role } from "../models/role"
import { getLoggedUser } from './auth.service'

class RoleService {

    private url = 'http://localhost:3030/roles'

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

    public async getRoles() {
        const response = await fetch(this.url, {
            method: 'GET',
            headers: this.getHeaders()
        })
        return await this.getData(response) as Role[]
    }

    public async getRolesById(id: number) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'GET',
            headers: this.getHeaders()
        })
        return await this.getData(response) as Role
    }

    public async create(role: Role) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(role)
        })
        return await this.getData(response) as Role
    }

    public async update(role: Role) {
        const response = await fetch(`${this.url}/${role.id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(role)
            
        })
        return await this.getData(response) as Role
        
    }

    public async delete(id: number) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders()
        })
        return await this.getData(response) as boolean
    }
}

export const roleService = new RoleService()