import { requestGet } from "../../utils/requestGet";

export const GetActivitiesAdmin = async (
    filters: any = null
): Promise<{
    data: Models.ActivitiesGetModel[],
    total: number,
    total_horas_hombre: number
}> => {
    const data = requestGet('/admin/activities/get-activities', filters);
    return data;
}

export const GetActivitiesAdminByOT = async (
    filters: any = null, id: string = '0'
): Promise<{
    data: Models.MyActivitiesGetModel[],
    total: number
}> => {
    const data = requestGet('/admin/activities/get-activities-ot/'+id, filters);
    return data;
}

export const GetActivityAdmin = async (
    id: string = '0'
): Promise<{ data: Models.ActivitiesGetModel }> => {
    const data = requestGet('/admin/activities/get-activities/' + id);
    return data;
}