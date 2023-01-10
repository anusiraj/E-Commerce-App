export interface AuthType {
    token: string | null
}
export type Role = "admin"|"customer"

export interface User {
    userDetail: any
    id: number
    email: string
    password: string
    name: string
    role: string
    avatar?: string
}