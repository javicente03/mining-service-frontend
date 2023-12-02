declare namespace Models {

    export interface ActivitiesGetModel {
        id: number
        name: string
        horas_hombre: number
        deleted: boolean
        createdAt: string
        subActividades: SubActividades[]
    }

    export interface SubActividades {
        id: number
        description: string
        horas_hombre: number
        deleted: boolean
        createdAt: string
        actividadId: number
    }
}