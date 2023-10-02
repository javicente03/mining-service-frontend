import { requestGet } from "../../utils/requestGet";

export const GetTiposComponentes = async (
    filters: any = null
): Promise<{
    data: {
        id: number
        name: string
        deleted: boolean
        createdAt: string
        componente_solicitudId: number
      }[]      
}> => {
    const data = requestGet('/admin/forms/get-components-types', filters);
    return data;
}