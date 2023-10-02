import { requestGet } from "../../utils/requestGet";

export const GetCompaniesAdmin = async (
    filters: any = null
): Promise<{
    data: Models.CompanyGetModel[],
    total: number
}> => {
    const data = requestGet('/admin/companies/get', filters);
    return data;
}