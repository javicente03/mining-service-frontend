declare namespace Models {
    export interface FormCreateSolicitud {
        works: {
            id: number,
            description: string,
        }[],
        description: string,
        type_work: 'equipo' | 'maestranza' | 'componente' | 'servicio_terreno' | 'null',
        form_equipos: {
            id: number,
            description: string,
            name: string,
            type_field: string,
            opciones_componente_solicitud: {
                id: number,
                name: string,
            }[],
            opcion_componente_solicitud_id: number,
        }[],
        form_components: {
            id: number,
            description: string,
            name: string,
            type_field: string,
            opciones_componente_solicitud: {
                id: number,
                name: string,
            }[],
            opcion_componente_solicitud_id: number,
        }[],
        form_terreno: {
            id: number,
            description: string,
        }[],
    }
}