import { requestGet } from "../../utils/requestGet";

export const GetRequestsAdmin = async (
    filters: any = null
): Promise<{
    data: Models.SolicitudGetModel[],
    total: number
}> => {
    const data = requestGet('/admin/requests/get', filters);
    return data;
}

export const GetRequestsAdminById = async (
    id: string = '0'
): Promise<{
    data: Models.SolicitudGetModel
}> => {
    const data = requestGet('/admin/requests/get/' + id);
    return data;
}