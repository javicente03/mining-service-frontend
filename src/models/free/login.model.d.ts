declare namespace Models {
    export interface LoginResponseModel {
        token: string;
        user: {
            id: number
            rut: string
            email: string
            name: string
            lastname: string
            password: string
            role: string
            active: boolean
            deleted: boolean
            createdAt: string
        }
    }

}