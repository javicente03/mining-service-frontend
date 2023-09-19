declare namespace Models {
    export interface SolicitudGetModel {
        id: number
        userId: number
        status: string
        description: string
        createdAt: string
        tipos_trabajos_solicitud: {
            description: string
            tipoTrabajoId: number
            tipoTrabajo: {
                name: string
            }
        }[],
        user?: {
            name: string
            lastname: string
            email: string
            rut: string
            id: number
        }
    }
}