import { requestGet } from "../../utils/requestGet";

// Usuarios tipo user
export const GetUsersAdmin = async (
    filters: any = null
): Promise<{
    data: Models.UserGetModel[],
    total: number
}> => {
    const data = requestGet('/admin/users/get', filters);
    return data;
}

// Usuarios todos
export const GetUsersAllAdmin = async (
    filters: any = null
): Promise<{
    data: Models.UserGetModel[],
    total: number
}> => {
    const data = requestGet('/admin/users/get-users', filters);
    return data;
}

export const GetUserById = async (
    id: string = '0'
): Promise<{
    data: Models.UserGetModel
}> => {
    const data = requestGet('/admin/users/get/' + id);
    return data;
}