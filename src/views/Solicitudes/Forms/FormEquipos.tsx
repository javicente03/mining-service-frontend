import { Fragment, useEffect } from "react";
import { Grid, FormGroup, InputLabel, TextField, Select, MenuItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GetFormEquipos } from "../../../helpers/requests";

export default function FormEquipos({
    data, setData
}:{ 
    data: Models.FormCreateSolicitud,
    setData: React.Dispatch<React.SetStateAction<Models.FormCreateSolicitud>>,
}): JSX.Element {

    const form = useQuery(["GetFormEquipos"], () => GetFormEquipos());

    const handleInputChange = (id: number, description: string) => {
        setData({ ...data, form_equipos: data.form_equipos.map((item) => item.id === id ? { ...item, description: description } : item) })
    }

    useEffect(() => {
        if (data.form_equipos.length !== 0) return;
        if (form.data?.data) {
            let form_local: { id: number, description: string, name: string, type_field: string, opciones_componente_solicitud: { id: number, name: string }[],
            opcion_componente_solicitud_id: number }[] = []
            form.data?.data?.map((item) => {
                form_local.push({ id: item.id, description: '', name: item.name, opciones_componente_solicitud: item.opciones_componente_solicitud, 
                type_field: item.type_field, opcion_componente_solicitud_id: 0 })
            })
            setData({ ...data, form_equipos: form_local })
        }
    }, [form.data])

    return (
        <Fragment>

            {
                data.form_equipos?.map((item, index: number) => (
                    <Fragment key={index}>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormGroup>
                                <InputLabel className="label-principal" sx={{ marginLeft: "10px"}} >{item.name}</InputLabel>
                                {
                                    item.type_field === 'text' ?
                                        <TextField className="input-text-principal" type="text" placeholder="Descripción" 
                                            value={item.description}
                                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                                        />
                                    : item.type_field === 'select' ?
                                        <Select
                                            className="input-text-principal select-input-text-principal"
                                            value={item.opcion_componente_solicitud_id}
                                            onChange={
                                                (e) => {
                                                    setData({
                                                        ...data, form_equipos: data.form_equipos.map((field) => field.id === item.id ? { ...item, opcion_componente_solicitud_id: e.target.value as number } : field)
                                                    })
                                                }
                                            }
                                            name='type_component'
                                            sx={{ ":disabled": { backgroundColor: '#fff' }, color: 'white' }}
                                        >
                                            <MenuItem value={0} disabled>Seleccionar</MenuItem>
                                            {
                                                item.opciones_componente_solicitud.map((item, index: number) => (
                                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    : null
                                }
                            </FormGroup>
                        </Grid>
                    </Fragment>
                ))
            }

        </Fragment>
    )
}