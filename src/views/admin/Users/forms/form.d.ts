declare namespace Models {
    export interface FormCreateUserAdmin {
        // name, lastname, email, password, role, companyId, cargo, rut, phone, thumbnail, thumbnail_format
        name: string
        lastname: string
        email: string
        password: string
        role?: string
        companyId?: number
        cargo: string
        phone: string
        thumbnail: string
        thumbnail_format: string
        active?: boolean
    }
}