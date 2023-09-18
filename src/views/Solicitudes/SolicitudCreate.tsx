import { AlertColor, Button, Checkbox, Dialog, DialogContent, Divider, FormControl, FormControlLabel, FormGroup, Grid, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query"
import { Fragment, useEffect, useState } from "react"
import { GetTypesWorksRequest } from "../../helpers/requests"
import mutatorRequest from "../../utils/mutatorRequest";
import icon_worker from "../../assets/img/ast-03.png";
import { SnakbarAlert } from "../../components/snakbar/snakbarAlert";

export const SolicitudCreate = () => {

    const types_work = useQuery(["GetTypesWorksRequest"], () => GetTypesWorksRequest());

    const [ data, setData ] = useState<{
        works: {
            id: number,
            description: string,
        }[],
        description: string,
    }>({ works: [], description: '' })

    const handleInputChange = (event: any) => {
        setData({ ...data, [event.target.name]: event.target.value })
    };

    const isWorkChecked = (id: number) => {
        return data.works.find((item) => item.id === id) ? true : false
    }

    const handleWorkChecked = (id: number) => {
        if (isWorkChecked(id)) {
            // Limpiar la descripción
            setData({ ...data, works: data.works.filter((item) => item.id !== id) })
        } else {
            setData({ ...data, works: [...data.works, { id: id, description: '' }] })
        }
    }

    const handleWorkDescription = (id: number, description: string) => {
        setData({ ...data, works: data.works.map((item) => item.id === id ? { ...item, description: description } : item) })
    }

    const createRequest = mutatorRequest('/requests/create', 'POST', data)

    const sendData = () => {

        if (createRequest.isLoading) return

        // la descripción de la solicitud en línea es obligatoria
        if (data.description.trim() === '') {
            setViewAlert({ ...viewAlert, open: true, message: 'Debe ingresar una descripción', color: 'error' });
            return
        }

        if (data.works.length === 0) {
            setViewAlert({ ...viewAlert, open: true, message: 'Debe seleccionar al menos un tipo de trabajo', color: 'error' });
            return
        }

        // Si alguno de los trabajos seleccionados tiene descripción vacía
        if (data.works.find((item) => item.description.trim() === '')) {
            setViewAlert({ ...viewAlert, open: true, message: 'Debe ingresar una descripción para cada tipo de trabajo seleccionado', color: 'error' });
            return
        }

        createRequest.mutate()
    }

    useEffect(() => {
        if (createRequest.isSuccess) {
            setData({ description: '', works: [] })
            setOpenDialogSuccess(true)
        }

        if (createRequest.isError) {
            // @ts-ignore
            // setViewAlert({ ...viewAlert, open: true, message: createRequest.error.response.data.error, color: 'error' });
            console.log(createRequest.error.response.data.error)
        }
    }, [createRequest.isSuccess, createRequest.isError])


    const [ openDialogSuccess, setOpenDialogSuccess ] = useState(false)

    // Alert de error
    const [ viewAlert, setViewAlert ] = useState<{
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

            <Dialog open={openDialogSuccess} onClose={() => setOpenDialogSuccess(false)} maxWidth='md' fullWidth className="modal-dialog">
                <DialogContent className="modal-principal">

                    <Grid container justifyContent={'center'}>
                        <Grid item xs={12} md={3} mb={5}>
                            <Typography className="modal-principal-title">
                                Solicitud Enviada
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
                        <Grid item xs={12} sm={4} md={3}>
                            <img src={icon_worker} alt="worker" width={'100%'}/>
                        </Grid>
                        <Grid item xs={12} sm={8} md={6}>
                            <Typography sx={{
                                color: 'white', fontSize: '18px', marginBottom: '10px'
                            }}>
                                OT Gato M01 #0312
                            </Typography>
                            <p style={{
                                color: 'white', fontSize: '14px'
                            }}>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores pariatur consectetur accusantium sit dicta. Consectetur quis impedit voluptates distinctio ratione similique, possimus, expedita, reiciendis cupiditate libero minima saepe vitae optio.
                            </p>

                            <ul style={{
                                color: 'white', fontSize: '12px', marginTop: '10px', listStyle: 'none'
                            }}>
                                <li>
                                    - Lorem ipsum dolor sit amet consectetur.
                                </li>
                                <li>
                                    - Lorem ipsum dolor sit amet consectetur.
                                </li>
                                <li>
                                    - Lorem ipsum dolor sit amet consectetur.
                                </li>
                                <li>
                                    - Lorem ipsum dolor sit amet consectetur.
                                </li>
                                <li>
                                    - Lorem ipsum dolor sit amet consectetur.
                                </li>
                                <li>
                                    - Lorem ipsum dolor sit amet consectetur.
                                </li>
                            </ul>
                        </Grid>

                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} mt={5} textAlign='center'>
                            <Button variant="contained" className="modal-principal-button-success" onClick={
                                () => {
                                    setOpenDialogSuccess(false)
                                }
                            }>
                                Aceptar
                            </Button>
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

                <Grid item xs={12} mt={2} pl={2}>
                    <Typography sx={{
                        color: '#272936',
                        fontSize: '14px',
                    }}>
                        Tipo de trabajo:
                    </Typography>
                </Grid>

                <Grid item xs={12} p={1}>
                    <Grid container spacing={2}>
                        {
                            types_work.data?.data?.map((item, index: number) => (
                                <Fragment key={index}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox
                                                sx={{
                                                    color: '#ffac1e',
                                                    '&.Mui-checked': {
                                                        color: '#ffac1e',
                                                    },
                                                }}
                                                checked={isWorkChecked(item.id)}
                                                onChange={() => handleWorkChecked(item.id)}
                                            />} label={item.name} />
                                            <TextField className="input-text-principal" placeholder='Describir...'
                                                multiline rows={1}
                                                value={data.works.find((work) => work.id === item.id)?.description || ''}
                                                onChange={(e) => handleWorkDescription(item.id, e.target.value)}
                                                disabled={!isWorkChecked(item.id)}
                                                sx={{
                                                    ":disabled": { color: '#fff !important' }, 
                                                }}
                                            />

                                        </FormGroup>
                                    </Grid>
                                </Fragment>
                            ))
                        }

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
                        disabled={ createRequest.isLoading }
                    >
                        Enviar
                    </Button>
                </Grid>
            </Grid>

        </Fragment>
    )
}