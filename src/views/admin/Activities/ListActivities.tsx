import { Add, Close } from "@mui/icons-material";
import { AlertColor, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query"
import { Fragment, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Paginator from "../../../components/Paginator/Paginator";
import { SnakbarAlert } from "../../../components/snakbar/snakbarAlert";
import { GetActivitiesAdmin } from "../../../helpers/admin/activities"
import mutatorRequest from "../../../utils/mutatorRequest";

export const ListActivities = () => {

    const [filters, setFilters] = useState({
        skip: 0,
        limit: 10,
    })
    const activities = useQuery(['getActivities', filters], async () => GetActivitiesAdmin(filters));
    const navigateTo = useNavigate();

    const [dialogDetail, setDialogDetail] = useState<{
        open: boolean,
        data: Models.ActivitiesGetModel | null
    }>({ open: false, data: null });

    const [dialogDelete, setDialogDelete] = useState<{
        open: boolean,
        data: Models.ActivitiesGetModel | null
    }>({ open: false, data: null });

    const deleteMutator = mutatorRequest('/admin/activities/delete-activity/' + dialogDelete.data?.id, 'DELETE', {});

    useEffect(() => {
        if (deleteMutator.isSuccess) {
            setDialogDelete({ open: false, data: null });
            activities.refetch();
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

            <Dialog open={dialogDetail.open} onClose={() => setDialogDetail({ ...dialogDetail, open: false })} maxWidth='lg' fullWidth>
                <DialogTitle sx={{
                    fontWeight: 'bold',
                    paddingLeft: '30px',
                }}>
                    {dialogDetail.data?.name}
                    <IconButton sx={{
                        position: 'absolute',
                        right: '10px',
                        top: '10px',
                        backgroundColor: 'transparent',
                        color: '#f10409',
                    }} onClick={() => setDialogDetail({ ...dialogDetail, open: false })}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Table className="table-no-lines">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                </TableCell>
                                <TableCell>
                                    Descripción de trabajos
                                </TableCell>
                                <TableCell>
                                    HH
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                dialogDetail.data?.subActividades.map((activity, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {dialogDetail.data?.id}.{index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {activity.description}
                                        </TableCell>
                                        <TableCell>
                                            {activity.horas_hombre}
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </DialogContent>
            </Dialog>

            <Dialog open={dialogDelete.open} onClose={() => setDialogDelete({ ...dialogDelete, open: false })} maxWidth='xs' fullWidth className="modal-dialog">
                <DialogContent className="modal-principal">

                    <Grid container justifyContent={'center'}>
                        <Grid item xs={12} md={6} mb={5}>
                            <Typography className="modal-principal-title">
                                ¿Seguro que deseas eliminar esta actividad?
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
                            }>
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
                        Actividades Técnicas
                    </Button>

                    <Link to='/admin/activities/create' style={{ textDecoration: 'none' }}>
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
                            Agregar Trabajo Técnico
                            <Add />
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
                        }} className='table-head left'>
                            <TableRow>
                                <TableCell>
                                    Descripción de trabajos
                                </TableCell>
                                {/* <TableCell>
                                    HH
                                </TableCell> */}
                                <TableCell>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                activities.data?.data.map((activity, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {activity.name}
                                        </TableCell>
                                        {/* <TableCell>
                                            {activity.horas_hombre}
                                        </TableCell> */}
                                        <TableCell sx={{
                                            display: 'flex', flexWrap: 'wrap', justifyContent: 'center'
                                        }}>
                                            <Button variant='contained' sx={{
                                                backgroundColor: '#272936', color: '#fff', fontWeight: 'bold',
                                                textTransform: 'capitalize', width: { xs: '80%', md: '30%' }, borderRadius: '30px',
                                                ":hover": { backgroundColor: '#272936', color: '#fff' },
                                                display: 'block',
                                                marginTop: { xs: '10px', md: '0px' },
                                                marginRight: { xs: '0px', sm: '10px' },
                                            }}
                                                onClick={
                                                    () => {
                                                        setDialogDetail({
                                                            open: true,
                                                            data: activity
                                                        })
                                                    }
                                                }
                                            >
                                                Ver
                                            </Button>
                                            {/* <Link to={`/admin/activities/update/${activity.id}`} style={{ textDecoration: 'none' }}> */}
                                            <Button variant='contained' sx={{
                                                backgroundColor: '#ffac1e', color: '#272936', fontWeight: 'bold',
                                                textTransform: 'capitalize', width: { xs: '80%', md: '30%' }, borderRadius: '30px',
                                                ":hover": { backgroundColor: '#ffac1e', color: '#272936' },
                                                display: 'block',
                                                marginTop: { xs: '10px', md: '0px' },
                                                marginRight: { xs: '0px', sm: '10px' },
                                            }}
                                                onClick={
                                                    () => {
                                                        navigateTo(`/admin/activities/update/${activity.id}`)
                                                    }
                                                }
                                            >
                                                Editar
                                            </Button>
                                            {/* </Link> */}
                                            <Button variant='contained' sx={{
                                                backgroundColor: '#f10409',
                                                color: '#fff', fontWeight: 'bold',
                                                textTransform: 'capitalize', width: { xs: '80%', md: '30%' }, borderRadius: '30px',
                                                ":hover": { backgroundColor: '#f10409', color: '#fff' },
                                                display: 'block',
                                                marginTop: { xs: '10px', md: '0px' },
                                                marginRight: { xs: '0px', sm: '10px' },
                                            }}
                                                onClick={() => { setDialogDelete({ open: true, data: activity }) }}
                                            >
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }

                            {
                                activities.data?.data.length === 0 &&
                                <TableRow>
                                    <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                                        No hay datos
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </Grid>

                <Grid item xs={12} mt={2}>
                    {
                        activities.data?.total ? (
                            <Paginator
                                filters={filters} setFilters={setFilters} query={activities.data.total}
                            />
                        ) : null
                    }
                </Grid>

                {/* <Grid item xs={12} mt={2}>
                    <Table>
                    <TableHead sx={{
                            backgroundColor: '#272936', color: '#fff',
                        }} className='table-head left clfff fwi'>
                            <TableRow>
                                <TableCell>
                                    Total:
                                </TableCell>
                                <TableCell>
                                    Trabajos: {activities.data?.total}
                                </TableCell>
                                <TableCell>
                                    HH: {activities.data?.total_horas_hombre}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Grid> */}
            </Grid>

        </Fragment>
    )
}