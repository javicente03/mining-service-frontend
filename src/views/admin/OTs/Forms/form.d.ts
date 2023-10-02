declare namespace Models {
    export interface FormPresupuestoAsignacion {
        status: string,
        date: string,
        cost: number,
        motivo: 'Precio' | 'Plazo' | 'No se repara' | string,
        lavado: boolean,
        evaluacion: boolean,
        desarme_evaluacion: boolean,
        informe_tecnico: string,
        tipo_componenteId: number,
    }
}