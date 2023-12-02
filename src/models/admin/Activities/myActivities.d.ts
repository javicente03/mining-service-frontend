declare namespace Models {
    export interface MyActivitiesGetModel {
        id: number
        otId: number
        actividadId: number
        finished: boolean
        deleted: boolean
        createdAt: string
        actividad: {
            id: number
            name: string
            deleted: boolean
            createdAt: string
        }
        otSubActividadesRelation: {
            id: number
            otActividadRelationId: number
            subActividadId: number
            horas_hombre: number
            tiempo_real: number
            varianza: number
            finished: boolean
            deleted: boolean
            createdAt: string
            subActividad: {
                id: number
                description: string
                horas_hombre: number
                deleted: boolean
                createdAt: string
                actividadId: number
            }
        }[]
    }
}