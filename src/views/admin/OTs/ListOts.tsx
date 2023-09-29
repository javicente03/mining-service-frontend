import { Avatar, Box, Button, Grid, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import Paginator from "../../../components/Paginator/Paginator"
import { GetOTSAdmin } from "../../../helpers/admin/ots"
import './progress.css'

export const OTsListAdmin = () => {

    const [filters, setFilters] = useState({
        skip: 0,
        limit: 10,
    })
    const requests = useQuery(['GetOTSAdmin', filters], () => GetOTSAdmin(filters))

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
            default:
                ret = <Typography>
                    Pendiente
                </Typography>
                break;
        }

        return ret;
    }

    const formatProcess = (process: number, status: string | null = '') => {

        let className_progress = status === 'pending' ? 'progress-blue' : status === 'approved' ? 'progress-green' : status === 'rejected' ? 'progress-red' : '';

        return <Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" value={process} className={`linearproccess ${className_progress}`} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" className={className_progress}>{process}%</Typography>
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
                                        xs: '150px', md: '150px', lg: '100px'
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
                                requests.data?.data?.map((item, index: number) => (
                                    <Fragment key={index}>
                                        <TableRow>
                                            <TableCell>
                                                #{item.id}
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    item.user?.thumbnail ? (
                                                        <img src={'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'} alt={item.user?.name} 
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
                                                    {item.user?.name} Gerardo Oliveros leon
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {formatProcess(50, item.status_ot)}
                                            </TableCell>
                                            <TableCell>
                                                {formatStatus(item.status_ot)}
                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(item.createdAt), 'dd/MM/yyyy', { locale: es })}
                                            </TableCell>
                                            <TableCell>
                                                <Link to={'/admin/ots/'+item.id}>
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
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    </Fragment>
                                ))
                            }

                            {
                                requests.data?.data?.length === 0 ? (
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
                        requests.data?.total ? (
                            <Paginator
                                filters={filters} setFilters={setFilters} query={requests.data.total}
                            />
                        ) : null
                    }
                </Grid>
            </Grid>
        </Fragment>
    )
}