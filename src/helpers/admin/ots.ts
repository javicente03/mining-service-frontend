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