import { requestGet } from "../../utils/requestGet";

export const GetOTSAdmin = async (
    filters: any = null
): Promise<{
    data: Models.SolicitudGetModel[],
    total: number
}> => {
    const data = requestGet('/admin/ots/get', filters);
    return data;
}

export const GetOTByIdAdmin = async ( id: string = '0'
): Promise<{
    data: Models.SolicitudGetModel
}> => {
    const data = requestGet('/admin/ots/get/' + id);
    return data;
}

export const GetOTSChildrenAdmin = async (
    id: string = '0', filters: any = null
): Promise<{
    data: Models.SolicitudGetModel[],
    total: number
}> => {
    const data = requestGet('/admin/children/ots/get-children/' + id, filters);
    return data;
}