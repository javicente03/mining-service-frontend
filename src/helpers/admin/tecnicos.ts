import { requestGet } from "../../utils/requestGet";

export const GetTecnicos = async (
): Promise<{
    data: {
        id: number
        rut: string
        email: string
        name: string
        lastname: string
        password: string
        cargo: string
        phone: string
        role: string
        thumbnail: any
        active: boolean
        deleted: boolean
        createdAt: string
        companyId: any
      }[],
    total: number
}> => {
    const data = requestGet('/admin/tecnicos/get');
    return data;
}