import { useQuery } from "@tanstack/react-query"
import { Fragment, useState } from "react"
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button, Avatar, FormGroup, InputLabel, Autocomplete, TextField, Select, FormControl, MenuItem } from "@mui/material"
import { Link } from "react-router-dom"
import Paginator from "../../../components/Paginator/Paginator"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { formatRut } from "../../../helpers/formatRut"
import { GetCompaniesAdmin } from "../../../helpers/admin/companies"
import { Business } from "@mui/icons-material"

export const ListCompanies = () => {

    const [filters, setFilters] = useState({
        skip: 0,
        limit: 10,
        list: 1
    })

    const companies = useQuery(['GetCompaniesAdmin', filters], () => GetCompaniesAdmin(filters))


    return (
        <Fragment>
            <Grid container border={'2px solid #f78f15'} style={{ borderRadius: '10px', padding: '10px' }} spacing={2}>
                <Grid item xs={12} p={2}>
                    <Button variant='contained' sx={{
                        backgroundColor: 'transparent', color: '#f4ae33', border: '1px solid #272936',
                        textTransform: 'capitalize', fontWeight: 'bold',
                        ":disabled": { backgroundColor: 'transparent', color: '#f4ae33' },
                    }} disabled>
                        Empresas
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Link to='/admin/companies/create' style={{
                        textDecoration: 'none'
                    }}>
                        <Button variant='contained' sx={{
                            backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                            textTransform: 'capitalize',
                            ":hover": { backgroundColor: '#272936', color: '#fff' },
                        }}>
                            Crear Empresa
                        </Button>
                    </Link>
                </Grid>

                <Grid item xs={12} mt={2} sx={{
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
                                    Razón Social
                                </TableCell>
                                <TableCell>
                                    Rut
                                </TableCell>
                                <TableCell>
                                    Logo
                                </TableCell>
                                <TableCell>
                                    Teléfono
                                </TableCell>
                                <TableCell>
                                    Fecha de creación
                                </TableCell>
                                <TableCell>
                                    Acciones
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='table-body'>
                            {
                                companies.data?.data?.map((item, index: number) => (
                                    <Fragment key={index}>
                                        <TableRow>
                                            <TableCell>
                                                {item?.razon_social}
                                            </TableCell>
                                            <TableCell>
                                                {formatRut(item?.rut)}
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    item.logo ? (
                                                        <img src={item.logo} alt={'logo'} 
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
                                                        ><Business />
                                                        </Avatar>
                                                    )
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {item?.telefono}
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
                                                <Link to={`/admin/companies/update/${item.id}`} style={{
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
                                                        Modificar
                                                    </button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    </Fragment>
                                ))
                            }

                            {
                                companies.data?.data?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <Typography variant='h6' align='center'>
                                                No hay empresas
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
                        companies.data?.total ? (
                            <Paginator
                                filters={filters} setFilters={setFilters} query={companies.data.total}
                            />
                        ) : null
                    }
                </Grid>
            </Grid>
        </Fragment>
    )
}