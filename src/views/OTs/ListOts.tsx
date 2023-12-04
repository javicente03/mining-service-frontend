import { Avatar, AvatarGroup, Box, Grid, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import Paginator from "../../components/Paginator/Paginator"
import { GetOTS } from "../../helpers/ots"

export const ListOts = () => {

    const [filters, setFilters] = useState({
        skip: 0,
        limit: 10,
    })
    const ots = useQuery(['GetOTS', filters], () => GetOTS(filters))

    const formatStatus = (status: string | null = '') => {
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
                    Rechazada
                </Typography>
                break;
            case 'in_process':
                ret = <Typography className="status-orange">
                    En proceso
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

    const formatProcess = (status: string | null = '', item: Models.SolicitudGetModel) => {

        let className_progress ='';
        switch (status) {
            case 'pending':
                className_progress = 'progress-blue'
                break;
            case 'approved':
                className_progress = 'progress-green'
                break;
            case 'rejected':
                className_progress = 'progress-red'
                break;
            case 'in_process':
                className_progress = 'progress-orange'
                break;
            default:
                className_progress = 'progress-blue'
                break;
        }

        // en item.ot_actividades_relation (array) viene otSubActividadesRelation (array), quiero contar cuantos hay en total
        let total_activities = item.ot_actividades_relation?.reduce((a, b) => a + b.otSubActividadesRelation.length, 0);
        // Ahora quiero contar cuantos estan completados, dentro de otSubActividadesRelation hay un campo llamado finished que es booleano
        let total_activities_finished = item.ot_actividades_relation?.reduce((a, b) => a + b.otSubActividadesRelation.filter((item: any) => item.finished).length, 0);
        // @ts-ignore
        let porcentaje = (total_activities_finished * 100) / total_activities;
        // Que no sea decimal
        porcentaje = Math.round(porcentaje);
        porcentaje = isNaN(porcentaje) ? 0 : porcentaje;

        return <Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '50%', mr: 1 }}>
                    <LinearProgress variant="determinate" value={porcentaje} className={`linearproccess ${className_progress}`} />
                </Box>
                <Box sx={{ minWidth: '50%', display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" className={className_progress}>{porcentaje}%</Typography>
                    {
                        item.tecnicos_ot && item.tecnicos_ot.length > 0 ? (
                            <AvatarGroup total={item.tecnicos_ot.length} sx={{
                                width: '70%', marginLeft: {
                                    xs: '30px', md: '25px'
                                }
                            }} className='avatarProgress'
                            >
                                {
                                    item.tecnicos_ot.slice(0, 4).map((item, index: number) => (
                                        <Avatar alt={item.user?.name} src={item.user?.thumbnail || ''} sx={{
                                            width: '30px', height: '30px'
                                        }} key={index} />
                                    ))
                                }
                            </AvatarGroup>
                        ) : null
                    }
                </Box>
            </Box>
        </Fragment>
    }

    return (
        <Fragment>
            <Grid container border={'2px solid #f78f15'} style={{ borderRadius: '10px', padding: '10px', height: '85vh', alignContent: 'baseline' }}>
                <Grid item xs={12} p={2}>
                    <Button variant='contained' sx={{
                        backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                        textTransform: 'capitalize',
                        ":disabled": { backgroundColor: '#272936', color: '#fff' },
                    }} disabled={true}>
                        Ordenes de Trabajo
                    </Button>
                </Grid>

                <Grid item xs={12} sx={{
                    overflow: 'scroll',
                    width: '100%',
                    height: '60%',
                    scrollbarWidth: 'thin',
                    overflowX: {
                        xs: 'visible', md: 'hidden'
                    },
                }}>
                    <Table>
                        <TableHead sx={{
                            backgroundColor: '#f0f3f8',
                        }} className='table-head'>
                            <TableRow>
                                <TableCell>
                                    N° OTs
                                </TableCell>
                                <TableCell>
                                    Encargado
                                </TableCell>
                                <TableCell sx={{
                                    minWidth: {
                                        xs: '300px', md: '350ox'
                                    }
                                }}>
                                    Proceso
                                </TableCell>
                                <TableCell>
                                    Estado
                                </TableCell>
                                <TableCell>
                                    Fecha
                                </TableCell>
                                <TableCell>
                                    Detalle
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='table-body'>
                            {
                                ots.data?.data?.map((item, index: number) => (
                                    <Fragment key={index}>
                                        <TableRow>
                                            <TableCell>
                                                #{item.id}
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    item.user?.thumbnail ? (
                                                        <img src={item.user.thumbnail} alt={item.user?.name} 
                                                            style={{ width: '30px', height: '30px', borderRadius: '50%',
                                                                display: 'inline-flex', verticalAlign: 'middle', marginRight: '5px'
                                                            }} />
                                                    ) : (
                                                        <Avatar 
                                                            sx={{
                                                                backgroundColor: '#272936',
                                                                color: '#fff', display: 'inline-flex',
                                                                width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px'
                                                            }}
                                                        />
                                                    )
                                                }
                                                <span>
                                                    {item.user?.name} {item.user?.lastname}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {formatProcess(item.status_ot, item)}
                                            </TableCell>
                                            <TableCell>
                                                {formatStatus(item.status_ot)}
                                            </TableCell>
                                            <TableCell sx={{ textTransform: 'capitalize' }}>
                                                {format(new Date(item.createdAt), 'dd MMM yyyy', { locale: es })}
                                            </TableCell>
                                            <TableCell>
                                                {/* <Link to={'/admin/ots/budget/'+item.id}> */}
                                                    <button style={{
                                                        backgroundColor: '#272936',
                                                        color: '#fff',
                                                        border: 'none',
                                                        padding: '5px 10px',
                                                        borderRadius: '10px',
                                                        cursor: 'pointer'
                                                    }}>
                                                        Ver
                                                    </button>
                                                {/* </Link> */}
                                            </TableCell>
                                        </TableRow>
                                    </Fragment>
                                ))
                            }

                            {
                                ots.data?.data?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <Typography variant='h6' align='center'>
                                                No hay ordenes de trabajo
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : null
                            }
                        </TableBody>
                    </Table>
                </Grid>

                <Grid item xs={12} mt={2}>
                    {
                        ots.data?.total ? (
                            <Paginator
                                filters={filters} setFilters={setFilters} query={ots.data.total}
                            />
                        ) : null
                    }
                </Grid>
            </Grid>
        </Fragment>
    )
}