import { requestGet } from "../utils/requestGet";

export const GetOTS = async (
    filters: any = null
): Promise<{
    data: Models.SolicitudGetModel[],
    total: number
}> => {
    const data = requestGet('/ots/get', filters);
    return data;
}

export const GetOTById = async ( id: string = '0'
): Promise<{
    data: Models.SolicitudGetModel
}> => {
    const data = requestGet('/ots/get/' + id);
    return data;
}