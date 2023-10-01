import { AlertColor, Button, Dialog, DialogContent, Divider, FormControl, Grid, ImageList, ImageListItem, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Fragment, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { GetRequestsAdminById } from "../../../helpers/admin/requests";
import icon_worker from "../../../assets/img/ast-03.png";
import mutatorRequestParam from "../../../utils/mutatorRequestParam";
import { SnakbarAlert } from "../../../components/snakbar/snakbarAlert";
import ModalImage from "../../../components/modals/ModalImage";

export const SolicitudDetailAdmin = () => {

    const { id } = useParams<{ id: string }>();

    const request = useQuery(['GetRequestsAdminById', id], () => GetRequestsAdminById(id));

    const formatStatus = (status: string) => {
        let ret: string | JSX.Element = '';
        switch (status) {
            case 'pending':
                ret = <Typography className="status-blue">
                    Pendiente
                </Typography>
                break;
            case 'approved':
                ret = <Typography className="status-green">
                    Aprobada
                </Typography>
                break;
            case 'rejected':
                ret = <Typography className="status-red">
                    Rechazada: {request.data && request.data.data && request.data.data.motivo_rechazo_solicitud && request.data.data.motivo_rechazo_solicitud[0]?.description}
                </Typography>
                break;
            default:
                ret = <Typography>
                    Pendiente
                </Typography>
                break;
        }

        return ret;
    }

    const formatTypeWork = (type_work: string = 'equipo') => {
        let ret: string | JSX.Element = '';
        switch (type_work) {
            case 'equipo':
                ret = 'Equipo'
                break;
            case 'componente':
                ret = 'Componente'
                break;
            case 'maestranza':
                ret = 'Maestranza'
                break;
            case 'servicio_terreno':
                ret = 'Servicio de terreno'
                break;
            default:
                ret = 'Equipo'
                break;
        }

        return ret;
    }

    const [ openDialogAttend, setOpenDialogAttend ] = useState(false);
    const [ openDialogSuccess, setOpenDialogSuccess ] = useState(false);
    const [ openDialogError, setOpenDialogError ] = useState(false);

    const attendRequest = mutatorRequestParam('/admin/requests/send-status/'+id, 'POST');

    useEffect(() => {
        if (attendRequest.isSuccess) {
            request.refetch();
            setOpenDialogAttend(false);
            if (attendRequest.data?.data?.status === 'approved') {
                setOpenDialogSuccess(true);
            }
            if (attendRequest.data?.data?.status === 'rejected') {
                setOpenDialogError(true);
            }
        }

        if (attendRequest.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: attendRequest.error.response.data.error || 'Error al atender la solicitud',
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [attendRequest.isSuccess, attendRequest.isError])

    const [ motivoRechazo, setMotivoRechazo ] = useState('');

    function srcset(image: string, size: number, rows = 1, cols = 1) {
        return {
          src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
          srcSet: `${image}?w=${size * cols}&h=${
            size * rows
          }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    const [ openDialogImage, setOpenDialogImage ] = useState<{
        open: boolean,
        url: string
    }>({ open: false, url: '' });

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

            <ModalImage 
                openDialogSuccess={openDialogImage} setOpenDialogSuccess={setOpenDialogImage}
            />

            <Dialog open={openDialogAttend} onClose={() => setOpenDialogAttend(false)} maxWidth='md' fullWidth className="modal-dialog">
                <DialogContent className="modal-principal">

                    <Grid container justifyContent={'center'}>
                        <Grid item xs={12} md={4} mb={5}>
                            <Typography className="modal-principal-title">
                                Solicitud N°#{id}
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
                        {/* <Grid item xs={12} sm={8} md={6} sx={{
                            overflow: 'scroll',
                            scrollbarWidth: 'thin',
                            maxHeight: '300px',
                            overflowX: 'hidden',
                            wordBreak: 'break-word',
                        }}>
                            <Typography sx={{
                                color: 'white', fontSize: '18px', marginBottom: '10px'
                            }}>
                                {request.data?.data?.user?.name} {request.data?.data?.user?.lastname}
                            </Typography>
                            <Typography sx={{
                                color: 'white', fontSize: '16px', marginBottom: '10px'
                            }}>
                                Detalles
                            </Typography>
                            <p style={{
                                color: 'white', fontSize: '12px', marginBottom: '10px'
                            }}>
                                {request.data?.data?.description}
                            </p>

                            {
                                request.data?.data?.tipos_trabajos_solicitud.map((item, index: number) => (
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
                            }

                        </Grid> */}

                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} mt={5} textAlign='center' sx={{
                            display: {
                                xs: 'flex', sm: 'block'
                            }, flexDirection: {
                                xs: 'column', sm: 'row'
                            }, alignItems: 'center'
                        }}>
                            <Button variant="contained" className="modal-principal-button-success" onClick={
                                () => {
                                    attendRequest.mutate({ response: 'approved' });
                                }
                            } sx={{ marginRight: { xs: '0', sm:'5px'} }}
                                disabled={attendRequest.isLoading}
                            >
                                Aceptar
                            </Button>

                            <Button variant="contained" className="modal-principal-button-error" onClick={
                                () => {
                                    attendRequest.mutate({ response: 'rejected', motivo: motivoRechazo });
                                }
                            } sx={{ marginLeft: { xs: '0', sm:'5px'}, marginTop: { xs: '5px', sm:'0'} }} 
                                disabled={motivoRechazo.trim() === '' || attendRequest.isLoading}
                            >
                                Rechazar
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6} m='0 auto' mt={2}>
                            <FormControl fullWidth>
                                <TextField
                                    className="input-text-principal"
                                    sx={{
                                        backgroundColor: 'transparent',
                                        border: '1px solid #fff',
                                    }}
                                    placeholder='En caso de rechazo, indicar motivo...'
                                    multiline rows={2}
                                    value={motivoRechazo}
                                    onChange={(e) => {
                                        // Max 2500 caracteres
                                        if (e.target.value.length <= 2500) {
                                            setMotivoRechazo(e.target.value)
                                        }
                                    }}
                                />
                                <span style={{
                                    color: 'white', fontSize: '10px', position: 'absolute', right: '10px', bottom: '10px'
                                }}>
                                    {motivoRechazo.length}/2500
                                </span>
                            </FormControl>
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>

            <Dialog open={openDialogSuccess} onClose={() => setOpenDialogSuccess(false)} maxWidth='xs' fullWidth className="modal-dialog">
                <DialogContent className="modal-principal">

                    <Grid container justifyContent={'center'}>
                        <Grid item xs={12} md={8} mb={5}>
                            <Typography className="modal-principal-title">
                                Solicitud N°#{id}
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
                        <Grid item xs={12} sm={10}>
                            <Typography sx={{
                                color: 'white', fontSize: '16px', marginBottom: '20px', textAlign: 'center'
                            }}>
                                Solicitud de cliente aceptada
                            </Typography>
                            <p style={{
                                color: 'white', fontSize: '12px', textAlign: 'center'
                            }}>
                                Orden de trabajo aceptada. Podrá visualizar el estado de la OT y el seguimiento en el menú "Listado de OTs"
                            </p>
                        </Grid>

                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} mt={5} textAlign='center'>
                            <Link to={'/admin/ots/budget/'+id} style={{
                                textDecoration: 'none'
                            }}>
                                <Button variant="contained" className="modal-principal-button-success" onClick={
                                    () => {
                                        setOpenDialogSuccess(false)
                                    }
                                } sx={{
                                    width: { xs: '100%', sm: '300px'}
                                }}
                                >
                                    Crear Orden de Trabajo
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>

            <Dialog open={openDialogError} onClose={() => setOpenDialogError(false)} maxWidth='xs' fullWidth className="modal-dialog">
                <DialogContent className="modal-principal">

                    <Grid container justifyContent={'center'}>
                        <Grid item xs={12} md={8} mb={5}>
                            <Typography className="modal-principal-title">
                                Solicitud N°#{id}
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
                        <Grid item xs={12} sm={10}>
                            <Typography sx={{
                                color: 'white', fontSize: '16px', textAlign: 'center'
                            }}>
                                Solicitud de cliente rechazada
                            </Typography>
                        </Grid>

                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} mt={5} textAlign='center'>
                            <Button variant="contained" className="modal-principal-button-success" onClick={
                                () => {
                                    setOpenDialogError(false)
                                }
                            }
                            >
                                Aceptar
                            </Button>
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>

            <Grid container border={'2px solid #f78f15'} style={{ borderRadius: '10px', padding: '10px 20px' }}>
                <Grid item xs={12} sx={{
                    position: 'relative'
                }}>
                    <Button variant='contained' sx={{
                        backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                        textTransform: 'capitalize',
                        ":disabled": { backgroundColor: '#272936', color: '#fff' }, marginBottom: '10px'
                    }} disabled={true}>
                        Solicitud #{id}
                    </Button>

                    <Typography sx={{
                        fontWeight: 'bold',
                        color: '#272936',
                        marginBottom: '5px'
                    }}>
                        Cliente: <span style={{ fontWeight: 'initial' }}>{request.data?.data?.user?.name} {request.data?.data?.user?.lastname}</span>
                    </Typography>

                    {
                        request.data?.data?.status && formatStatus(request.data?.data?.status)
                    }

                    {
                        request.data?.data?.status === 'pending' &&
                            <Button variant='contained' sx={{
                                backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                                textTransform: 'capitalize',
                                ":hover": { backgroundColor: '#272936', color: '#fff' }, marginBottom: '10px'
                            }} onClick={() => setOpenDialogAttend(true)}>
                                Atender
                            </Button>
                    }

                    {
                        request.data?.data?.createdAt &&
                            <Typography sx={{
                                color: '#272936',
                                position: {
                                    xs: 'initial', sm: 'absolute'
                                },
                                marginTop: {
                                    xs: '10px', sm: '0'
                                },
                                fontSize: '12px',
                                right: '20px',
                                top: '20px',
                                textTransform: 'capitalize'
                            }}>
                                {format(new Date(request.data?.data?.createdAt), 'dd MMM yyyy', { locale: es })}
                            </Typography>
                    }
                </Grid>

                <Grid item xs={12} md={6} mt={2}>
                    <Typography sx={{
                        fontWeight: 'bold',
                        color: '#272936'
                    }}>
                        Descripción de la solicitud en línea
                    </Typography>
                    <Typography sx={{
                        color: 'white',
                        backgroundColor: '#ffac1e',
                        padding: '5px',
                        borderRadius: '5px',
                    }}>
                        {request.data?.data?.description}
                    </Typography>
                </Grid>

                <Grid item xs={12} textAlign='center' mt={4}>
                    <Button variant='contained' sx={{
                        backgroundColor: 'transparent', color: '#f4ae33', border: '1px solid #272936',
                        textTransform: 'capitalize', fontWeight: 'bold',
                        ":disabled": { backgroundColor: 'transparent', color: '#f4ae33' },
                    }} disabled>
                        {formatTypeWork(request.data?.data?.type_work)}
                    </Button>
                </Grid>

                <Grid item xs={12} mt={1}>
                    <Typography sx={{
                        fontWeight: 'bold',
                        color: '#272936'
                    }}>
                        Tipos de trabajos solicitados
                    </Typography>
                    <Grid container spacing={2}>
                        {
                            request.data?.data?.type_work === 'equipo' ?
                                request.data?.data?.equipo_trabajo_solicitud?.map((item, index: number) => (
                                    <Fragment key={index}>
                                        <Grid item xs={12} md={6}>
                                            <Typography sx={{
                                                color: '#272936'
                                            }}>
                                                {item.equipoTrabajo?.name}
                                            </Typography>
                                            <Typography sx={{
                                                color: 'white',
                                                backgroundColor: '#ffac1e',
                                                padding: '5px',
                                                borderRadius: '5px',
                                            }}>
                                                {item.equipoTrabajo?.type_field === 'select' ? item.opcion?.name : item.description}
                                            </Typography>
                                        </Grid>
                                    </Fragment>
                                ))
                            : request.data?.data?.type_work === 'componente' ?
                                request.data?.data?.componente_solicitud?.map((item, index: number) => (
                                    <Fragment key={index}>
                                        <Grid item xs={12} md={6}>
                                            <Typography sx={{
                                                color: '#272936'
                                            }}>
                                                {item.componente?.name}
                                            </Typography>
                                            <Typography sx={{
                                                color: 'white',
                                                backgroundColor: '#ffac1e',
                                                padding: '5px',
                                                borderRadius: '5px',
                                            }}>
                                                {item.componente?.type_field === 'select' ? item.opcion?.name : item.description}
                                            </Typography>
                                        </Grid>
                                    </Fragment>
                                ))
                            : request.data?.data?.type_work === 'maestranza' ?
                                request.data?.data?.tipos_trabajos_solicitud?.map((item, index: number) => (
                                    <Fragment key={index}>
                                        <Grid item xs={12} md={6}>
                                            <Typography sx={{
                                                color: '#272936'
                                            }}>
                                                {item.tipoTrabajo?.name}
                                            </Typography>
                                            <Typography sx={{
                                                color: 'white',
                                                backgroundColor: '#ffac1e',
                                                padding: '5px',
                                                borderRadius: '5px',
                                            }}>
                                                {item.description}
                                            </Typography>
                                        </Grid>
                                    </Fragment>
                                ))
                            : request.data?.data?.type_work === 'servicio_terreno' ?
                                request.data?.data?.servicio_terreno_solicitud?.map((item, index: number) => (
                                    <Fragment key={index}>
                                        <Grid item xs={12} md={6}>
                                            <Typography sx={{
                                                color: '#272936'
                                            }}>
                                                {item.servicioTerreno?.name}
                                            </Typography>
                                            <Typography sx={{
                                                color: 'white',
                                                backgroundColor: '#ffac1e',
                                                padding: '5px',
                                                borderRadius: '5px',
                                            }}>
                                                {item.description}
                                            </Typography>
                                        </Grid>
                                    </Fragment>
                                ))
                            : null
                        }

                        {request.data?.data?.registro_fotografico_solicitud &&
                            <Grid item xs={12}>
                                <Typography sx={{
                                    fontWeight: 'bold',
                                    color: '#272936'
                                }}>
                                    Registro fotográfico
                                </Typography>
                                <ImageList
                                    sx={{ width: 500, }}
                                    variant="quilted"
                                    cols={4}
                                    rowHeight={121}
                                    >
                                    {request.data?.data?.registro_fotografico_solicitud?.map((item, index: number) => (
                                        <Fragment key={index}>
                                            <ImageListItem key={item.url} cols={1} rows={1}>
                                                <img
                                                    // Seguir el patron de la serie de imagenes de arriba
                                                    {...srcset(item.url, 121, (index + 1 > 4 ? 2 : 1), (index + 1 > 4 ? 2 : 1))}
                                                    alt={'image'}
                                                    loading="lazy" style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setOpenDialogImage({
                                                            open: true,
                                                            url: item.url
                                                        })
                                                    }}
                                                />
                                            </ImageListItem>
                                        </Fragment>
                                    ))}
                                </ImageList>
                            </Grid>
                        }

                    </Grid>
                </Grid>

                <Grid item xs={12} justifyContent='center' display={'flex'} mt={2}>
                    <Link to={`/admin/requests`} style={{
                        textDecoration: 'none'
                    }}>
                        <Button variant='contained' sx={{
                            backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                            textTransform: 'capitalize',
                            ":hover": { backgroundColor: '#272936', color: '#fff' },
                        }}>
                            Regresar
                        </Button>
                    </Link>
                </Grid>

            </Grid>

        </Fragment>
    )
}