declare namespace Models {
    export interface ExternalJobsGetModel {
        id: number
        otId: number
        type: string
        code_type: string
        items: ItemExternalJobs[]
    }

    export interface ItemExternalJobs {
        id: number
        trabajoExternoId: number
        code: string
        name: string
        text: string
    }
}