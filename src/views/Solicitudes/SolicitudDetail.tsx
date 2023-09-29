import { Button, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Fragment } from "react"
import { Link, useParams } from "react-router-dom"
import { GetMyRequestsById } from "../../helpers/requests";
import es from "date-fns/locale/es";

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

    return (
        <Fragment>

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