import { requestGet } from "../../utils/requestGet";

export const GetInsumosAdmin = async (
    filters: any = null
): Promise<{
    data: Models.InsumosGetModel[],
    total: number
}> => {
    const data = requestGet('/admin/insumos/get', filters);
    return data;
}

export const GetInsumoAdmin = async (
    id: string = '0'
): Promise<{ data: Models.InsumosGetModel }> => {
    const data = requestGet('/admin/insumos/get/' + id);
    return data;
}