import { AlertColor, Button, FormControl, Grid, ImageList, ImageListItem, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Fragment, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { GetMyRequestsById } from "../../helpers/requests";
import es from "date-fns/locale/es";
import { formatAmount } from "../../helpers/formatAmount";
import mutatorRequestParam from "../../utils/mutatorRequestParam";
import { SnakbarAlert } from "../../components/snakbar/snakbarAlert";
import ModalSuccessGenerico from "../../components/modals/ModalSuccessGenerico";
import ModalImage from "../../components/modals/ModalImage";

export const SolicitudDetail = () => {

    const { id } = useParams<{ id: string }>();

    const request = useQuery(['GetMyRequestsById', id], () => GetMyRequestsById(id));

    const formatStatus = (status: string) => {
        let ret: string | JSX.Element = '';
        switch (status) {
            case 'pending':
                ret = <Typography className="status-blue" sx={{
                    border: '#cecece 1px solid'
                }}>
                    Pendiente
                </Typography>
                break;
            case 'approved':
                ret = <Typography className="status-green" sx={{
                    border: '#cecece 1px solid'
                }}>
                    Aprobada
                </Typography>
                break;
            case 'rejected':
                ret = <Typography className="status-red" sx={{
                    border: '#cecece 1px solid'
                }}>
                    Rechazada: {
                        request.data && request.data.data && request.data.data.motivo_rechazo_solicitud && request.data.data.motivo_rechazo_solicitud.length > 0 ? request.data.data.motivo_rechazo_solicitud[0]?.description :
                        request.data && request.data.data && request.data.data.motivo_rechazo_solicitud_cliente && request.data.data.motivo_rechazo_solicitud_cliente.length > 0 ? request.data.data.motivo_rechazo_solicitud_cliente[0]?.description : ''
                    }
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

    const [ dataBudget, setDataBudget ] = useState<{
        motivo_rechazo: string,
    }>({ motivo_rechazo: '' });

    const attendRequest = mutatorRequestParam('/requests/accept-budget/'+id, 'PUT');

    useEffect(() => {
        if (attendRequest.isSuccess) {
            request.refetch();
            if (attendRequest.data?.data?.status === 'approved') {
                setOpenDialogAccept(true);
            }
            if (attendRequest.data?.data?.status === 'rejected') {
                setOpenDialogReject(true);
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

    const [ openDialogAccept, setOpenDialogAccept ] = useState<boolean>(false);
    const [ openDialogReject, setOpenDialogReject ] = useState<boolean>(false);

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

            <ModalSuccessGenerico 
                openDialogSuccess={openDialogAccept} setOpenDialogSuccess={setOpenDialogAccept}
                title="Presupuesto aceptado" subtitle="La orden de trabajo ha sido creada con éxito"
            />

            <ModalSuccessGenerico 
                openDialogSuccess={openDialogReject} setOpenDialogSuccess={setOpenDialogReject}
                title="Presupuesto rechazado" subtitle="Has rechazado el presupuesto y la solicitud ha sido cancelada"
            />

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

                    {
                        request.data?.data?.status && formatStatus(request.data?.data?.status)
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

                {
                    request.data?.data?.status_ot === 'approved' && request.data?.data?.presupuestoOt &&
                    <Fragment>
                        <Grid item xs={12} textAlign='center' mt={4}>
                            <Button variant='contained' sx={{
                                backgroundColor: 'transparent', color: '#f4ae33', border: '1px solid #272936',
                                textTransform: 'capitalize', fontWeight: 'bold',
                                ":disabled": { backgroundColor: 'transparent', color: '#f4ae33' },
                            }} disabled>
                                Presupuesto
                            </Button>
                        </Grid>

                        <Grid item xs={12} mt={2} textAlign='center'>
                            <Typography sx={{
                                color: 'white',
                                backgroundColor: '#ffac1e',
                                padding: '5px',
                                borderRadius: '5px', textAlign: 'justify'
                            }}>
                                Hemos revisado y aprobado tu solicitud, te indicamos el presupuesto. En caso de que estés de acuerdo procederemos a crear la Orden de Trabajo.
                            </Typography>
                            <Typography className="status-blue" sx={{
                                border: '#cecece 1px solid', marginTop: '10px', fontSize: '20px !important'
                            }}>
                                {
                                    formatAmount(request.data?.data?.presupuestoOt?.cost)
                                }
                            </Typography>

                            <div style={{ width: '100%', marginTop: '10px' }}>
                                <Button variant="contained"
                                    className="modal-principal-button-success"
                                    onClick={() => {
                                        attendRequest.mutate({ status: 'approved' });
                                    }} disabled={attendRequest.isLoading}
                                >
                                    Aceptar
                                </Button>

                                <Button variant="contained"
                                    className="modal-principal-button-error"
                                    disabled={
                                        dataBudget.motivo_rechazo.length === 0 || attendRequest.isLoading
                                    }
                                    sx={{
                                        ":disabled": { opacity: 0.5 },
                                        marginLeft: {
                                            xs: '0', sm: '10px'
                                        }, marginTop: {
                                            xs: '10px', sm: '0'
                                        }
                                    }}
                                    onClick={() => {
                                        attendRequest.mutate({ status: 'rejected', motivo_rechazo: dataBudget.motivo_rechazo });
                                    }}
                                >
                                    Rechazar
                                </Button>
                            </div>

                            <Grid container>
                                <Grid item xs={12} sm={8} md={4} m='0 auto' mt={2}>
                                    <Typography sx={{ fontWeight: 'bold', color: '#272936', textAlign: 'left' }}>
                                        Motivo de rechazo
                                    </Typography>
                                    <FormControl fullWidth>
                                        <TextField 
                                            multiline
                                            placeholder="Escribe aquí..."
                                            rows={4}
                                            className="input-text-principal"
                                            value={dataBudget.motivo_rechazo}
                                            onChange={(e) => {
                                                if (e.target.value.length <= 2500) {
                                                    setDataBudget({
                                                        ...dataBudget,
                                                        motivo_rechazo: e.target.value
                                                    })
                                                }
                                            }}
                                        />
                                        <span style={{ color: '#272936', fontSize: '10px', position: 'absolute', bottom: '10px', right: '10px' }}>
                                            {dataBudget.motivo_rechazo.length}/2500
                                        </span>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Fragment>
                }

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

                        {request.data?.data?.registro_fotografico_solicitud && request.data?.data?.registro_fotografico_solicitud.length > 0 &&
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
                    <Link to={`/requests`} style={{
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