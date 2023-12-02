import { Add } from "@mui/icons-material"
import { AlertColor, Button, Dialog, DialogContent, Divider, FormGroup, Grid, MenuItem, Select, Slider, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ModalSuccessGenerico from "../../../components/modals/ModalSuccessGenerico"
import Paginator from "../../../components/Paginator/Paginator"
import { SnakbarAlert } from "../../../components/snakbar/snakbarAlert"
import { GetInsumosAdmin } from "../../../helpers/admin/insumos"
import mutatorRequest from "../../../utils/mutatorRequest"

export const ListInsumos = () => {

    const [filters, setFilters] = useState<{
        skip: number,
        limit: number,
        order: 'asc' | 'desc',
        year?: number,
        search?: string,
    }>({
        skip: 0,
        limit: 10,
        order: 'asc',
        year: 2023,
    });

    const insumos = useQuery(['GetInsumos', filters], () => GetInsumosAdmin(filters));

    const [dialogDelete, setDialogDelete] = useState<{
        open: boolean,
        data: Models.InsumosGetModel | null,
    }>({ open: false, data: null });

    const deleteMutator = mutatorRequest('/admin/insumos/delete/'+dialogDelete.data?.id, 'DELETE', {});

    useEffect(() => {
        if (deleteMutator.isSuccess) {
            setOpenDialogSuccess(true);
            setDialogDelete({ open: false, data: null });
            insumos.refetch();
        }

        if (deleteMutator.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: deleteMutator.error?.response?.data?.error,
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [deleteMutator.isSuccess, deleteMutator.isError]);

    const [openDialogSuccess, setOpenDialogSuccess] = useState(false);
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

            <ModalSuccessGenerico openDialogSuccess={openDialogSuccess} setOpenDialogSuccess={setOpenDialogSuccess}
                title='Insumo Eliminado' subtitle="El insumo se ha eliminado correctamente"
            />

            <Dialog open={dialogDelete.open} onClose={() => setDialogDelete({ ...dialogDelete, open: false })} maxWidth='xs' fullWidth className="modal-dialog">
                <DialogContent className="modal-principal">

                    <Grid container justifyContent={'center'}>
                        <Grid item xs={12} md={6} mb={5}>
                            <Typography className="modal-principal-title">
                                ¿Seguro que deseas eliminar este insumo?
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
                        <Grid item xs={12} textAlign='center'>
                            <Button variant="contained" className="modal-principal-button-success" onClick={
                                () => {
                                    deleteMutator.mutate();
                                }
                            } disabled={deleteMutator.isLoading}>
                                Confirmar
                            </Button>
                            <Button variant="contained" className="modal-principal-button-error" sx={{
                                marginLeft: { xs: '0px', sm: '10px' },
                                marginTop: { xs: '10px', sm: '0px' },
                            }} onClick={
                                () => {
                                    setDialogDelete({ ...dialogDelete, open: false })
                                }
                            }>
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>

            <Grid container border={'2px solid #f78f15'} style={{ borderRadius: '10px', padding: '10px' }}>
                <Grid item xs={12} p={2} justifyContent='space-between' display='flex' alignItems='center' style={{ flexWrap: 'wrap' }}>
                    <Button variant='contained' sx={{
                        backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'inline-block',
                        textTransform: 'capitalize',
                        ":disabled": { backgroundColor: '#272936', color: '#fff' },
                    }} disabled={true}>
                        Insumos
                    </Button>

                    <Link to='/admin/insumos/create' style={{ textDecoration: 'none' }}>
                        <Button variant='contained' sx={{
                            backgroundColor: '#ffac1e', color: '#272936', fontWeight: 'bold',
                            textTransform: 'capitalize',
                            ":hover": { backgroundColor: '#ffac1e', color: '#272936' },
                            // Centrar el contenido del botón verticalmente
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: { xs: '10px', md: '0px' },
                        }} disabled={false}>
                            Agregar Insumo
                            <Add />
                        </Button>
                    </Link>
                </Grid>

                <Grid item xs={12} bgcolor={'#f0f3f8'} p={2} style={{ borderRadius: '10px' }}>
                    <Typography sx={{
                        color: '#272936', fontWeight: 'bold', fontSize: '18px'
                    }}>
                        Filtrar
                    </Typography>
                    <Grid container justifyContent={'space-between'}>
                        <Grid item xs={12} md={4} sx={{
                            position: 'relative',
                        }}>
                            <Typography sx={{ color: '#272936', fontWeight: 'bold', fontSize: '14px' }}>
                                Año
                            </Typography>
                            {/* @ts-ignore */}
                            <Slider aria-label="Default" valueLabelDisplay="auto" color="warning"
                                onChange={(event, value) => { setFilters({ ...filters, year: Number(value) }) }}
                                value={filters.year ? filters.year : 2023} min={2015} max={2023} step={1}
                            />
                            <Typography sx={{
                                color: '#272936', fontWeight: 'bold', fontSize: '11px', 
                                position: 'absolute', left: '0px', bottom: {
                                    xs: '0px', md: '15px'
                                },
                            }}>
                                2015
                            </Typography>
                            <Typography sx={{
                                color: '#272936', fontWeight: 'bold', fontSize: '11px', 
                                position: 'absolute', right: '0px', bottom: {
                                    xs: '0px', md: '15px'
                                },
                            }}>
                                2023
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={2} textAlign='center'>
                            <Typography sx={{ color: '#272936', fontWeight: 'bold', fontSize: '14px' }}>
                                Ordenar
                            </Typography>
                            <FormGroup>
                                <Select
                                    className="input-text-principal select-input-text-principal"
                                    name='type_rol'
                                    sx={{ ":disabled": { backgroundColor: '#fff' }, color: 'white' }}
                                    value={filters.order}
                                    // @ts-ignore
                                    onChange={(event) => { setFilters({ ...filters, order: event.target.value }) }}
                                >
                                    <MenuItem value={'asc'}>Ascendente</MenuItem>
                                    <MenuItem value={'desc'}>Descendente</MenuItem>
                                </Select>
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} md={4} textAlign='center'>
                            <Typography sx={{ color: '#272936', fontWeight: 'bold', fontSize: '14px' }}>
                                Buscar
                            </Typography>
                            <FormGroup>
                                <TextField
                                    className="input-text-principal"
                                    variant="outlined"
                                    // size="small"
                                    fullWidth
                                    name='search'
                                    value={filters.search}
                                    onChange={(event) => { setFilters({ ...filters, search: event.target.value }) }}
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
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
                        }} className='table-head left'>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Título</TableCell>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Marca</TableCell>
                                <TableCell>Modelo</TableCell>
                                <TableCell>Año</TableCell>
                                <TableCell>Cantidad Disponible</TableCell>
                                <TableCell>Nro. Componente</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                insumos.data?.data?.map((item) => (
                                    <TableRow>
                                        <TableCell>
                                            <img src={item.image} alt={item?.title}
                                                style={{
                                                    width: '35px', height: '35px', borderRadius: '5px',
                                                    display: 'inline-flex', verticalAlign: 'middle', marginRight: '5px'
                                                }} />
                                        </TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell sx={{
                                            // Truncar el texto
                                            maxWidth: '200px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}>{item.description}</TableCell>
                                        <TableCell>{item.marca}</TableCell>
                                        <TableCell>{item.modelo}</TableCell>
                                        <TableCell>{item.year}</TableCell>
                                        <TableCell>{item.stock}</TableCell>
                                        <TableCell>{item.nro_componente}</TableCell>
                                        <TableCell>
                                            <Link to={`/admin/insumos/update/${item.id}`} style={{ textDecoration: 'none' }}>
                                                <Button variant='contained' sx={{
                                                    backgroundColor: '#ffac1e', color: '#272936', fontWeight: 'bold',
                                                    textTransform: 'capitalize',
                                                    ":hover": { backgroundColor: '#ffac1e', color: '#272936' },
                                                    // Centrar el contenido del botón verticalmente
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginTop: { xs: '10px', md: '0px' },
                                                }} fullWidth>
                                                    Editar
                                                </Button>
                                            </Link>
                                            <Button variant='contained' sx={{
                                                backgroundColor: '#f10409', color: '#fff', fontWeight: 'bold',
                                                textTransform: 'capitalize',
                                                ":hover": { backgroundColor: '#f10409', color: '#fff' },
                                                ":disabled": { backgroundColor: 'gray', color: '#fff' },
                                                // Centrar el contenido del botón verticalmente
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginTop: '10px'
                                            }} fullWidth
                                                onClick={() => { setDialogDelete({ open: true, data: item }) }}
                                                disabled={deleteMutator.isLoading}
                                            >
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }

                            {
                                insumos.data?.data?.length === 0 &&
                                <TableRow>
                                    <TableCell colSpan={9} style={{ textAlign: 'center' }}>
                                        No hay datos para mostrar
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </Grid>

                <Grid item xs={12} mt={2}>
                    {
                        insumos.data?.total ? (
                            <Paginator
                                filters={filters} setFilters={setFilters} query={insumos.data.total}
                            />
                        ) : null
                    }
                </Grid>
            </Grid>

        </Fragment>
    )
}