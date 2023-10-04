import { AlertColor, Button, Checkbox, Dialog, DialogContent, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { SnakbarAlert } from "../../../../components/snakbar/snakbarAlert";
import mutatorRequest from "../../../../utils/mutatorRequest";
import icon_worker from '../../../../assets/img/ast-03.png';
import FormMaestranza from "../../../Solicitudes/Forms/FormMaestranza";
import FormEquipos from "../../../Solicitudes/Forms/FormEquipos";
import FormComponents from "../../../Solicitudes/Forms/FormComponents";
import FormTerrenoServicio from "../../../Solicitudes/Forms/FormTerrenoServicio";
import FormSelectClient from "./forms/SelectClient";
import { Link, useNavigate } from "react-router-dom";

export const OTCreate = () => {

    const [data, setData] = useState<Models.FormCreateOT0Admin>({ works: [], description: '', type_work: 'null', form_equipos: [], form_components: [], form_terreno: [], userId: 0, companyId: 0, numero_gd: '', fecha_ingreso: '' })

    const handleInputChange = (event: any) => {
        setData({ ...data, [event.target.name]: event.target.value })
    };

    const createRequest = mutatorRequest('/admin/ots/create-ot', 'POST', data)

    const sendData = () => {

        if (createRequest.isLoading) return

        if (data.companyId === 0) {
            setViewAlert({ ...viewAlert, open: true, message: 'Debe seleccionar una razón social', color: 'error' });
            return
        }

        if (data.userId === 0) {
            setViewAlert({ ...viewAlert, open: true, message: 'Debe seleccionar un cliente', color: 'error' });
            return
        }

        if (data.numero_gd.trim() === '') {
            setViewAlert({ ...viewAlert, open: true, message: 'Debe ingresar un número de GD', color: 'error' });
            return
        }

        // la descripción de la solicitud en línea es obligatoria
        if (data.description.trim() === '') {
            setViewAlert({ ...viewAlert, open: true, message: 'Debe ingresar una descripción', color: 'error' });
            return
        }

        if (data.type_work !== 'equipo' && data.type_work !== 'maestranza' && data.type_work !== 'componente' && data.type_work !== 'servicio_terreno') {
            setViewAlert({ ...viewAlert, open: true, message: 'Debe seleccionar un tipo de trabajo', color: 'error' });
            return
        }

        // Si el tipo de trabajo es equipo
        if (data.type_work === 'equipo') {
            if (data.form_equipos.length === 0) {
                setViewAlert({ ...viewAlert, open: true, message: 'Debe seleccionar al menos un tipo de equipo', color: 'error' });
                return
            }
            if (data.form_equipos.find((item) => item.description.trim() === '' && item.type_field === 'text')) {
                setViewAlert({ ...viewAlert, open: true, message: 'Faltan datos por llenar', color: 'error' });
                return
            }

            if (!data.img || data.img === '') {
                setViewAlert({ ...viewAlert, open: true, message: 'Debe seleccionar una imagen', color: 'error' });
                return
            }
        }

        // Si el tipo de trabajo es componente
        if (data.type_work === 'componente') {
            if (data.form_components.length === 0) {
                setViewAlert({ ...viewAlert, open: true, message: 'Debe seleccionar al menos un tipo de componente', color: 'error' });
                return
            }
            if (data.form_components.find((item) => item.description.trim() === '' && item.type_field === 'text')) {
                setViewAlert({ ...viewAlert, open: true, message: 'Faltan datos por llenar', color: 'error' });
                return
            }

            if (!data.img || data.img === '') {
                setViewAlert({ ...viewAlert, open: true, message: 'Debe seleccionar una imagen', color: 'error' });
                return
            }
        }

        // Si el tipo de trabajo es maestranza
        if (data.type_work === 'maestranza') {
            if (data.works.length === 0) {
                setViewAlert({ ...viewAlert, open: true, message: 'Debe seleccionar al menos un tipo de trabajo', color: 'error' });
                return
            }
        }

        // Si el tipo de trabajo es servicio en terreno
        if (data.type_work === 'servicio_terreno') {
            if (data.form_terreno.length === 0) {
                setViewAlert({ ...viewAlert, open: true, message: 'Debe seleccionar al menos un tipo de servicio en terreno', color: 'error' });
                return
            }
            if (data.form_terreno.find((item) => item.description.trim() === '')) {
                setViewAlert({ ...viewAlert, open: true, message: 'Faltan datos por llenar', color: 'error' });
                return
            }
        }

        // Si alguno de los trabajos seleccionados tiene descripción vacía
        if (data.works.find((item) => item.description.trim() === '')) {
            setViewAlert({ ...viewAlert, open: true, message: 'Debe ingresar una descripción para cada tipo de trabajo seleccionado', color: 'error' });
            return
        }

        createRequest.mutate()
    }

    const navigateTo = useNavigate()
    useEffect(() => {
        if (createRequest.isSuccess) {
            setData({ description: '', works: [], type_work: 'null', form_equipos: [], form_components: [], form_terreno: [], img: '', img_format: '', userId: 0, companyId: 0, numero_gd: '', fecha_ingreso: '' })
            setOpenDialogSuccess(true)
        }

        if (createRequest.isError) {
            // @ts-ignore
            setViewAlert({ ...viewAlert, open: true, message: createRequest.error.response.data.error, color: 'error' });
        }
    }, [createRequest.isSuccess, createRequest.isError])


    const [openDialogSuccess, setOpenDialogSuccess] = useState(false)

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

            <Dialog open={openDialogSuccess} onClose={() => {
                setOpenDialogSuccess(false)
                navigateTo('/admin/ots')
            }} maxWidth='md' fullWidth className="modal-dialog">
                <DialogContent className="modal-principal">

                    <Grid container justifyContent={'space-evenly'}>
                        <Grid item xs={12} md={3} mb={5}>
                            <Typography className="modal-principal-title">
                                Solicitud Enviada N°#{createRequest.data?.data?.solicitud?.id}
                            </Typography>
                            <Divider
                                sx={{
                                    backgroundColor: '#fff',
                                    height: '3px',
                                    marginTop: '2px',
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} sm={3} md={3}>
                            <img src={icon_worker} alt="worker" width={'100%'} />
                        </Grid>
                        <Grid item xs={12} sm={8} md={6} sx={{
                            overflow: 'scroll',
                            scrollbarWidth: 'thin',
                            maxHeight: '300px',
                            overflowX: 'hidden',
                            wordBreak: 'break-word',
                        }}>
                            <Typography sx={{
                                color: 'white', fontSize: '16px', marginBottom: '10px'
                            }}>
                                Detalles
                            </Typography>
                            <p style={{
                                color: 'white', fontSize: '12px', marginBottom: '10px'
                            }}>
                                {createRequest.data?.data?.solicitud?.description}
                            </p>

                            {
                                createRequest.data?.data?.solicitud?.type_work === 'equipo' ?
                                    createRequest.data?.data?.solicitud?.equipo_trabajo_solicitud?.map((item: any, index: number) => (
                                        <Fragment key={index}>
                                            <Typography sx={{
                                                color: 'white', fontSize: '14px', marginBottom: '10px', fontWeight: 'bold'
                                            }}>
                                                {item.equipoTrabajo?.name}: <span style={{ fontWeight: 'normal' }}>
                                                    {item.equipoTrabajo?.type_field === 'text' ? item.description : item.opcion?.name}
                                                </span>
                                            </Typography>
                                        </Fragment>
                                    ))
                                : createRequest.data?.data?.solicitud?.type_work === 'componente' ?
                                    createRequest.data?.data?.solicitud?.componente_solicitud?.map((item: any, index: number) => (
                                        <Fragment key={index}>
                                            <Typography sx={{
                                                color: 'white', fontSize: '14px', marginBottom: '10px', fontWeight: 'bold'
                                            }}>
                                                {item.componente?.name}: <span style={{ fontWeight: 'normal' }}>
                                                    {item.componente?.type_field === 'text' ? item.description : item.opcion?.name}
                                                </span>
                                            </Typography>
                                        </Fragment>
                                    ))
                                : createRequest.data?.data?.solicitud?.type_work === 'maestranza' ?
                                    createRequest.data?.data?.solicitud?.tipos_trabajos_solicitud?.map((item: any, index: number) => (
                                        <Fragment key={index}>
                                            <Typography sx={{
                                                color: 'white', fontSize: '14px',
                                            }}>
                                                {item.tipoTrabajo?.name}
                                            </Typography>
                                            <p style={{
                                                color: 'white', fontSize: '11px', marginBottom: '10px'
                                            }}>
                                                {item.description}
                                            </p>
                                        </Fragment>
                                    ))
                                : createRequest.data?.data?.solicitud?.type_work === 'servicio_terreno' ?
                                    createRequest.data?.data?.solicitud?.servicio_terreno_solicitud?.map((item: any, index: number) => (
                                        <Fragment key={index}>
                                            <Typography sx={{
                                                color: 'white', fontSize: '14px',
                                            }}>
                                                {item.servicioTerreno?.name}
                                            </Typography>
                                            <p style={{
                                                color: 'white', fontSize: '11px', marginBottom: '10px'
                                            }}>
                                                {item.description}
                                            </p>
                                        </Fragment>
                                    ))
                                : null
                            }
                        </Grid>

                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} sm={6} md={3} textAlign='center'>
                            <Link to={'/admin/ots/budget/' + createRequest.data?.data?.solicitud?.id} style={{
                                textDecoration: 'none',
                            }}>
                                <Button variant="contained" className="modal-principal-button-success" fullWidth >
                                    Crear Cotización
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>

            <Grid container border={'2px solid #f78f15'} style={{ borderRadius: '10px', padding: '10px' }}>
                <Grid item xs={12} p={2}>
                    <Button variant='contained' sx={{
                        backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                        textTransform: 'capitalize',
                        ":disabled": { backgroundColor: '#272936', color: '#fff' },
                    }} disabled={true}>
                        Nueva Solicitud
                    </Button>
                </Grid>
                <Grid item xs={12} textAlign='center' style={{ marginTop: '10px' }}>
                    <Button variant='contained' sx={{
                        backgroundColor: 'transparent', color: '#f4ae33', border: '1px solid #272936',
                        textTransform: 'capitalize', fontWeight: 'bold',
                        ":disabled": { backgroundColor: 'transparent', color: '#f4ae33' },
                    }} disabled>
                        Generar nueva solicitud
                    </Button>
                </Grid>
                
                <Grid item xs={12} p={1}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Grid container>
                                <FormSelectClient data={data} setData={setData} />

                                <Grid item xs={12} md={3}>
                                    <FormGroup>
                                        <Typography sx={{
                                            color: '#272936',
                                            fontSize: '14px',
                                        }}>
                                            Tipo de trabajo:
                                        </Typography>
                                        <Select
                                            className="input-text-principal select-input-text-principal"
                                            value={data.type_work}
                                            onChange={handleInputChange}
                                            name='type_work'
                                            sx={{ ":disabled": { backgroundColor: '#fff' }, color: 'white' }}
                                        >
                                            <MenuItem value={'null'} disabled>Seleccionar</MenuItem>
                                            <MenuItem value={'equipo'}>Equipo</MenuItem>
                                            <MenuItem value={'componente'}>Componente</MenuItem>
                                            <MenuItem value={'maestranza'}>Maestranza</MenuItem>
                                            <MenuItem value={'servicio_terreno'}>Servicio en terreno</MenuItem>
                                        </Select>
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        </Grid>

                        {
                            data.type_work === 'maestranza' ?
                            // @ts-ignore
                            <FormMaestranza data={data} setData={setData} /> :
                            data.type_work === 'equipo' ?
                            // @ts-ignore
                            <FormEquipos data={data} setData={setData} /> :
                            data.type_work === 'componente' ?
                            // @ts-ignore
                            <FormComponents data={data} setData={setData} /> :
                            data.type_work === 'servicio_terreno' ?
                            // @ts-ignore
                            <FormTerrenoServicio data={data} setData={setData} /> :
                            null
                        }

                        <Grid item xs={12} display={
                            {
                                xs: 'none', sm: 'none', md: 'block'
                            }
                        }></Grid>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{ color: '#272936', fontSize: '14px' }}>
                                Descripción de la solicitud en línea:
                            </Typography>
                            <FormControl fullWidth>
                                <TextField
                                    className="input-text-principal"
                                    placeholder='Describir...'
                                    multiline
                                    rows={4}
                                    value={data.description}
                                    onChange={handleInputChange}
                                    name='description'
                                    sx={{ ":disabled": { backgroundColor: '#fff' } }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} pl={1}>
                    <Button variant="contained" sx={{
                        backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                        ":hover": { backgroundColor: '#272936' },
                        width: '150px', borderRadius: '50px', textTransform: 'capitalize'
                    }} onClick={
                        () => { sendData() }
                    }
                        disabled={createRequest.isLoading}
                    >
                        Enviar
                    </Button>
                </Grid>
            </Grid>

        </Fragment>
    )
}