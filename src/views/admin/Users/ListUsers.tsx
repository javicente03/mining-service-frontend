import { useQuery } from "@tanstack/react-query"
import { GetUsersAllAdmin } from "../../../helpers/admin/users"
import { Fragment, useEffect, useState } from "react"
import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button, Avatar, FormGroup, InputLabel, Autocomplete, TextField, Select, FormControl, MenuItem } from "@mui/material"
import { Link } from "react-router-dom"
import Paginator from "../../../components/Paginator/Paginator"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { formatRut } from "../../../helpers/formatRut"
import { GetCompaniesAdmin } from "../../../helpers/admin/companies"

export const ListUsers = () => {

    const [filters, setFilters] = useState({
        skip: 0,
        limit: 10,
        companyId: 0,
        role: 'user',
    })
    const users = useQuery(['GetUsersAllAdmin', filters], () => GetUsersAllAdmin(filters))

    const formatStatus = (active: boolean) => {
        if (active) {
            return <Typography className="status-blue">
                Activo
            </Typography>
        } else {
            return <Typography className="status-red">
                Inactivo
            </Typography>
        }
    }

    const formatRole = (role: string) => {
        if (role === 'admin') {
            return 'Administrador'
        } else if (role === 'user') {
            return 'Usuario'
        } else {
            return 'Gestor'
        }
    }

    const companies = useQuery(['GetCompaniesAdmin'], () => GetCompaniesAdmin())

    const [companies_select, setCompanies_select] = useState<{
        label: string,
        value: number,
    }[]>([]);

    useEffect(() => {
        if (companies.data?.data) {
            setCompanies_select([])
            setCompanies_select((prev) => [...prev, {
                label: 'Todos',
                value: 0,
            }]);
            companies.data?.data.forEach((company) => {
                setCompanies_select((prev) => [...prev, {
                    label: `${company.razon_social}`,
                    value: company.id,
                }]);
            });
        }
    }, [companies.data?.data])


    return (
        <Fragment>
            <Grid container border={'2px solid #f78f15'} style={{ borderRadius: '10px', padding: '10px' }} spacing={2}>

                <Grid item xs={12}>
                    {/* <Link to='/admin/users/create' style={{
                        textDecoration: 'none'
                    }}> */}
                        <Button variant='contained' sx={{
                            backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                            textTransform: 'capitalize',
                            ":disabled": { backgroundColor: '#272936', color: '#fff' },
                        }} disabled>
                            Administrador de Perfiles
                        </Button>
                    {/* </Link> */}
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <FormGroup>
                        <Typography sx={{
                            fontSize: '12px', color: '#000', fontWeight: 'bold'
                        }}>Razón Social</Typography>
                        <Autocomplete
                            style={{
                                width: '100%',
                            }}
                            className="input-text-principal autocomplete-input"
                            disablePortal
                            id="combo-box-demo"
                            // @ts-ignore
                            getOptionLabel={(option) => `${option[0]}`}
                            options={companies_select.map((option) => [option.label, option.value])}
                            freeSolo
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params}
                            // onChange={
                            //     (e: any) => {
                            //         console.log(e.target.value);
                            //         setFiltersProd({
                            //             search: e.target.value,
                            //         });
                            //     }
                            // }
                            // value={filtersProd.search}
                            />}
                            // No mostrar el icono de x
                            clearIcon={null}
                            value={filters.companyId === 0 ? [companies_select[0]?.label, companies_select[0]?.value] : [companies_select.find((company) => company.value === filters.companyId)?.label, filters.companyId]}
                            onChange={(event, value) => {
                                // @ts-ignore
                                if (value && !isNaN(value[1])) {

                                    setFilters({...filters,
                                        companyId: parseInt(value[1] as any),
                                    })
                                }
                            }}
                        />
                    </FormGroup>
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{
                    // Colocar contenido a la izquierda abajo
                    display: 'flex',
                    alignItems: 'flex-end',
                }}>
                    <FormControl fullWidth>
                        <Typography sx={{
                            fontSize: '12px', color: '#000', fontWeight: 'bold'
                        }}>
                            Rol
                        </Typography>
                        <Select
                            className="input-text-principal select-input-text-principal"
                            name='type_rol'
                            sx={{ ":disabled": { backgroundColor: '#fff' }, color: 'white' }}
                            value={filters.role}
                            onChange={ (e) => { setFilters({...filters, role: e.target.value as string}) } }
                        >
                            <MenuItem value={'technical'}>Técnico</MenuItem>
                            <MenuItem value={'admin'}>Administrador</MenuItem>
                            <MenuItem value={'gestor'}>Supervisor</MenuItem>
                            <MenuItem value={'user'}>Cliente</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3} sx={{
                    // Colocar contenido a la izquierda abajo
                    display: 'flex',
                    alignItems: 'flex-end',
                }}>
                    <Link to='/admin/users/create' style={{
                        textDecoration: 'none'
                    }}>
                        <Button variant='contained' sx={{
                            backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                            textTransform: 'capitalize',
                            ":hover": { backgroundColor: '#272936', color: '#fff' },
                        }}>
                            Crear Perfil
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
                                    N° Perfil
                                </TableCell>
                                <TableCell>
                                    Nombre
                                </TableCell>
                                {/* <TableCell>
                                    Rut
                                </TableCell> */}
                                <TableCell>
                                    Email
                                </TableCell>
                                {/* <TableCell>
                                    Razón Social
                                </TableCell>
                                <TableCell>
                                    Rol
                                </TableCell> */}
                                <TableCell>
                                    Cargo
                                </TableCell>
                                <TableCell>
                                    Teléfono
                                </TableCell>
                                <TableCell>
                                    Estado
                                </TableCell>
                                {/* <TableCell>
                                    Fecha de creación
                                </TableCell> */}
                                <TableCell>
                                    Acciones
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='table-body'>
                            {
                                users.data?.data?.map((item, index: number) => (
                                    <Fragment key={index}>
                                        <TableRow>
                                            <TableCell>
                                                {item?.id}
                                            </TableCell>
                                            <TableCell sx={{
                                                fontWeight: 'bold', textAlign: 'left !important'
                                            }}>
                                                {
                                                    item.thumbnail ? (
                                                        <img src={item.thumbnail} alt={item?.name} 
                                                            style={{ width: '35px', height: '35px', borderRadius: '5px',
                                                                display: 'inline-flex', verticalAlign: 'middle', marginRight: '5px'
                                                            }} />
                                                    ) : (
                                                        <Avatar 
                                                            sx={{
                                                                backgroundColor: '#272936',
                                                                borderRadius: '5px',
                                                                color: '#fff', display: 'inline-flex',
                                                                width: '35px', height: '35px', verticalAlign: 'middle', marginRight: '5px'
                                                            }}
                                                        />
                                                    )
                                                }
                                                {item?.name} {item?.lastname}
                                            </TableCell>
                                            {/* <TableCell>
                                                {formatRut(item?.rut)}
                                            </TableCell> */}
                                            <TableCell>
                                                <a style={{
                                                    textDecoration: 'none',
                                                    color: '#70a9e2',
                                                }}>
                                                    {item?.email}
                                                </a>
                                            </TableCell>
                                            {/* <TableCell>
                                                {item?.company?.razon_social}
                                            </TableCell>
                                            <TableCell>
                                                {formatRole(item?.role)}
                                            </TableCell> */}
                                            <TableCell>
                                                {item?.cargo}
                                            </TableCell>
                                            <TableCell>
                                                {item?.phone}
                                            </TableCell>
                                            <TableCell>
                                                {formatStatus(item.active)}
                                            </TableCell>
                                            {/* <TableCell sx={{
                                                textTransform: 'capitalize'
                                            }}>
                                                {
                                                    // que quede asi: 08 sep 2021
                                                    // en español
                                                    format(new Date(item.createdAt), 'dd MMM yyyy', { locale: es })
                                                }
                                            </TableCell> */}
                                            <TableCell>
                                                <Link to={`/admin/users/update/${item.id}`} style={{
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
                                users.data?.data?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8}>
                                            <Typography variant='h6' align='center'>
                                                No hay usuarios
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
                        users.data?.total ? (
                            <Paginator
                                filters={filters} setFilters={setFilters} query={users.data.total}
                            />
                        ) : null
                    }
                </Grid>
            </Grid>
        </Fragment>
    )
}