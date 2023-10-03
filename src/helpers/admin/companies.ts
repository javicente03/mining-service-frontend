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

export const GetCompanyById = async (
    id: string = '0'
): Promise<{
    data: Models.CompanyGetModel
}> => {
    const data = requestGet('/admin/companies/get/' + id);
    return data;
}