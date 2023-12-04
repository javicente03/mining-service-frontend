declare namespace Models {
    export interface SolicitudGetModel {
        id: number
        userId: number
        status: string
        status_ot: string | null
        description: string
        createdAt: string
        type_work: string
        date_begin?: string
        date_end?: string
        tipos_trabajos_solicitud: {
            description: string
            tipoTrabajoId: number
            tipoTrabajo: {
                name: string
            }
        }[],
        tecnicos_ot?: {
            user: {
                name: string
                lastname: string
                email: string
                rut: string
                id: number
                thumbnail: string | null
            },
            id: number
            userId: number
            otId: number
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
        insumos_ot?: {
            id: number
            otId: number
            insumoId: number
            cantidad: number
            createdAt: string
            insumo: {
                id: number
                title: string
                description: string
                modelo: string
                marca: string
                nro_componente: number
                year: number
                stock: number
                image: string
                deleted: boolean
                createdAt: string
            }
        }[],
        lubricantes_ot?: {
            id: number
            otId: number
            code: string
            lts: any
            name: string
        }[],
        alistamiento_ot?: {
            id: number
            otId: number
            code: string
            name: string
        }[],
        isChild: boolean
        ot_actividades_relation?: {
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
        }[]
        tecnicos_ot: {
            id: number
            otId: number
            userId: number
            user: {
                name: string
                lastname: string
                thumbnail: string | null
                rut: string
                email: string
                cargo: string
            }
        }
          
    }
}