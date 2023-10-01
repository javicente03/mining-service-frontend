import { Fragment, useEffect, useState } from "react";
import { Grid, FormGroup, InputLabel, TextField, Select, MenuItem, AlertColor, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GetFormComponents } from "../../../helpers/requests";
import { SnakbarAlert } from "../../../components/snakbar/snakbarAlert";
import EncodeBase64 from "../../../utils/UploadImage";
import { Add, Close } from "@mui/icons-material";

export default function FormComponents({
    data, setData
}: {
    data: Models.FormCreateSolicitud,
    setData: React.Dispatch<React.SetStateAction<Models.FormCreateSolicitud>>,
}): JSX.Element {

    const form = useQuery(["GetFormComponents"], () => GetFormComponents());

    const handleInputChange = (id: number, description: string) => {
        setData({ ...data, form_components: data.form_components.map((item) => item.id === id ? { ...item, description: description } : item) })
    }

    useEffect(() => {
        if (data.form_components.length !== 0) return;
        if (form.data?.data) {
            let form_local: {
                id: number, description: string, name: string, type_field: string, opciones_componente_solicitud: { id: number, name: string }[],
                opcion_componente_solicitud_id: number
            }[] = []
            form.data?.data?.map((item) => {
                form_local.push({
                    id: item.id, description: '', name: item.name, opciones_componente_solicitud: item.opciones_componente_solicitud,
                    type_field: item.type_field, opcion_componente_solicitud_id: 0
                })
            })
            setData({ ...data, form_components: form_local })
        }
    }, [form.data])

    const UploadImage = (e: any) => {

        // El formato de la imagen debe ser png o jpg
        if (e.target.files[0].type !== 'image/png' && e.target.files[0].type !== 'image/jpeg') {
            setViewAlert({
                open: true,
                message: 'El formato de la imagen debe ser png o jpg',
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            })
            return;
        }

        // El tamaño de la imagen no debe ser mayor a 10MB
        if (e.target.files[0].size > 10000000) {
            setViewAlert({
                open: true,
                message: 'El tamaño de la imagen no debe ser mayor a 10MB',
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            })
            return;
        }

        EncodeBase64(e.target.files[0], (result: any) => {
            let imgClean = result.split(',')[1];
            setData({ ...data, img: imgClean, img_format: e.target.files[0].type })
        })
    }

    // Alert de error
    const [viewAlert, setViewAlert] = useState<{
        open: boolean,
        message: string | JSX.Element,
        color: AlertColor,
        onClose: any
    }>({
        open: false,
        message: '',
        color: 'error',
        onClose: () => setViewAlert({ ...viewAlert, open: false })
    });

    return (
        <Fragment>

            <SnakbarAlert
                open={viewAlert.open}
                message={viewAlert.message}
                color={viewAlert.color}
                onClose={viewAlert.onClose}
            />

            {
                data.form_components?.map((item, index: number) => (
                    <Fragment key={index}>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormGroup>
                                <InputLabel className="label-principal" sx={{ marginLeft: "10px" }} >{item.name}</InputLabel>
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
                                                            ...data, form_components: data.form_components.map((field) => field.id === item.id ? { ...item, opcion_componente_solicitud_id: e.target.value as number } : field)
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

            <Grid item xs={12} sm={6} md={3}>
                <FormGroup>
                    <InputLabel className="label-principal" sx={{ textAlign: 'center' }} >Registro Fotográfico</InputLabel>
                    <span style={{
                        textAlign: 'center', fontSize: '11px'
                    }}>
                        Toma de fotografía para ingresar información en el proceso de evaluación
                    </span>
                    <input type={'file'} style={{
                        display: 'none'
                    }} id="fileImg" onChange={UploadImage}
                        accept="image/png, image/jpeg"
                    />
                    {
                        !data.img || data.img === '' ?
                            <InputLabel className="label-principal" sx={{ height: '80px', width: '140px', backgroundColor: '#272936', margin: '0 auto', borderRadius: '10px', position: 'relative' }}
                                htmlFor="fileImg"
                            >
                                <InputLabel sx={{
                                    backgroundColor: '#ffac1e', color: '#fff',
                                    width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    position: 'absolute', top: '-15px', right: '0',
                                    "&:hover": {
                                        backgroundColor: '#ffac1e',
                                        color: '#fff'
                                    }
                                }} size="small" htmlFor="fileImg">
                                    <Add />
                                </InputLabel>
                            </InputLabel>
                            :
                            <InputLabel className="label-principal" sx={{ height: '80px', width: '140px', backgroundColor: '#272936', margin: '0 auto', borderRadius: '10px', position: 'relative' }}
                                htmlFor="fileImg"
                            >
                                <img src={`data:${data.img_format};base64,${data.img}`} alt="img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <IconButton sx={{
                                    backgroundColor: '#ffac1e', color: '#fff', cursor: 'pointer',
                                    position: 'absolute', top: '0', right: '0',
                                    "&:hover": {
                                        backgroundColor: '#ffac1e',
                                        color: '#fff'
                                    }
                                }} size="small" onClick={() => setData({ ...data, img: '', img_format: '' })}
                                >
                                    <Close />
                                </IconButton>
                            </InputLabel>
                    }
                </FormGroup>
            </Grid>

        </Fragment>
    )
}