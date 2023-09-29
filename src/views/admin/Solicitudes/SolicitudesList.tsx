import { Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import Paginator from "../../../components/Paginator/Paginator"
import { GetRequestsAdmin } from "../../../helpers/admin/requests"

export const SolicitudesListAdmin = () => {

    const [filters, setFilters] = useState({
        skip: 0,
        limit: 10,
    })
    const requests = useQuery(['GetRequestsAdmin', filters], () => GetRequestsAdmin(filters))

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

    return (
        <Fragment>
            <Grid container border={'2px solid #f78f15'} style={{ borderRadius: '10px', padding: '10px', height: '85vh', alignContent: 'baseline' }}>
                <Grid item xs={12} p={2}>
                    <Button variant='contained' sx={{
                        backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                        textTransform: 'capitalize',
                        ":disabled": { backgroundColor: '#272936', color: '#fff' },
                    }} disabled={true}>
                        Solicitudes de Clientes
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
                                    Cliente
                                </TableCell>
                                <TableCell>
                                    N° Solicitud
                                </TableCell>
                                <TableCell>
                                    Estatus
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
                                                {item.user?.name} {item.user?.lastname}
                                            </TableCell>
                                            <TableCell>
                                                #{item.id}
                                            </TableCell>
                                            <TableCell>
                                                {formatStatus(item.status)}
                                            </TableCell>
                                            <TableCell sx={{
                                                textTransform: 'capitalize'
                                            }}>
                                                {
                                                    // que quede asi: 08 sep 2021
                                                    // en español
                                                    format(new Date(item.createdAt), 'dd MMM yyyy', { locale: es })
                                                }
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/admin/requests/${item.id}`} style={{
                                                    textDecoration: 'none'
                                                }}>
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
                                        <TableCell colSpan={5}>
                                            <Typography variant='h6' align='center'>
                                                No hay solicitudes
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