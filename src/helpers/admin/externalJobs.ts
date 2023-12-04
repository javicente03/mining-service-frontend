import { requestGet } from "../../utils/requestGet";

export const GetExternalJobsAdmin = async (
    id: string = '0'
): Promise<{ data: Models.ExternalJobsGetModel[] }> => {
    const data = requestGet('/admin/trabajos_externos/get/' + id);
    return data;
}