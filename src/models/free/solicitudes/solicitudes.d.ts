declare namespace Models {
    export interface SolicitudGetModel {
        id: number
        userId: number
        status: string
        status_ot: string | null
        description: string
        createdAt: string
        type_work: string
        tipos_trabajos_solicitud: {
            description: string
            tipoTrabajoId: number
            tipoTrabajo: {
                name: string
            }
        }[],
        servicio_terreno_solicitud: {
            description: string
            servicioTerrenoId: number
            servicioTerreno: {
                name: string
            }
        }[],
        equipo_trabajo_solicitud: {
            description: string
            equipoTrabajoId: number
            equipoTrabajo: {
                name: string, type_field: string
            }
            idOpcion: number
            opcion: { name: string }
        }[],
        componente_solicitud: {
            description: string
            componenteId: number
            componente: {
                name: string, type_field: string
            }
            idOpcion: number
            opcion: { name: string }
        }[],
        user?: {
            name: string
            lastname: string
            email: string
            rut: string
            id: number
            thumbnail: string | null
        },
        motivo_rechazo_solicitud?: {
            id: number
            description: string
            createdAt: string
        }[],
        presupuestoOt?: {
            id: number
            lavado: boolean
            evaluacion: boolean
            desarme_evaluacion: boolean
            informe_tecnico: string
            tipo_componenteId: number
            cost: number
            date: string
            motivo_rechazo: string
        } | null,
        motivo_rechazo_solicitud_cliente?: {
            id: number
            description: string
            createdAt: string
        }[],
        registro_fotografico_solicitud?: {
            id: number
            url: string
            createdAt: string
            solicitudId: number
        }[],
    }
}