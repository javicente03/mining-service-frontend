import { requestGet } from "../utils/requestGet";

export const GetMyRequests = async (
    filters: any = null
): Promise<{
    data: Models.SolicitudGetModel[],
    total: number
}> => {
    const data = requestGet('/requests/get', filters);
    return data;
}

export const GetMyRequestsById = async (
    id: string = '0'
): Promise<{
    data: Models.SolicitudGetModel,
}> => {
    const data = requestGet('/requests/get/' + id);
    return data;
}

export const GetTypesWorksRequest = async (): Promise<{
    data: {
        id: number
        name: string
        deleted: boolean
        createdAt: string
      }[]
}> => {
    const data = requestGet('/requests/types-work');
    return data;
}

export const GetFormEquipos = async (): Promise<{
    data: {
        id: number
        name: string
        deleted: boolean
        createdAt: string
        type_field: string
        opciones_componente_solicitud: {
            id: number
            name: string
        }[]
      }[]
}> => {
    const data = requestGet('/requests/form-equipment');
    return data;
}

export const GetFormComponents = async (): Promise<{
    data: {
        id: number
        name: string
        deleted: boolean
        createdAt: string
        type_field: string
        opciones_componente_solicitud: {
            id: number
            name: string
        }[]
      }[]
}> => {
    const data = requestGet('/requests/form-components');
    return data;
}

export const GetGroundServiceRequest = async (): Promise<{
    data: {
        id: number
        name: string
        deleted: boolean
        createdAt: string
      }[]
}> => {
    const data = requestGet('/requests/form-ground-service');
    return data;
}