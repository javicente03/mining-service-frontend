import { requestGet } from "../../utils/requestGet";

export const GetUsersAdmin = async (
    filters: any = null
): Promise<{
    data: Models.UserGetModel[],
    total: number
}> => {
    const data = requestGet('/admin/users/get', filters);
    return data;
}