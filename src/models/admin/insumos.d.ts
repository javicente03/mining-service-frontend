declare namespace Models {
    export interface InsumosGetModel {
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
}