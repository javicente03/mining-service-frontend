declare namespace Models {
    export interface UserGetModel {
        id: number
        rut: string
        email: string
        name: string
        lastname: string
        password: string
        role: string
        thumbnail: any
        active: boolean
        deleted: boolean
        createdAt: string
        companyId: number
        company: {
            id: number
            rut: string
            razon_social: string
            direccion: string
            telefono: string
            logo: any
        }
    }
}