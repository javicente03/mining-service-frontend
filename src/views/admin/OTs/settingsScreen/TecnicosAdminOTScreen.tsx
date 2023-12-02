import { Add } from "@mui/icons-material";
import { AlertColor, Button, Dialog, DialogContent, Divider, FormGroup, Grid, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalSuccessGenerico from "../../../../components/modals/ModalSuccessGenerico";
import { SnakbarAlert } from "../../../../components/snakbar/snakbarAlert";
import { GetTecnicos } from "../../../../helpers/admin/tecnicos";
import mutatorRequest from "../../../../utils/mutatorRequest";

export default function TecnicosAdminOT({
    ot
}: {
    ot: any
}): JSX.Element {

    const tecnicos = useQuery(['getTecnicos'], () => GetTecnicos());

    const { id } = useParams<{ id: string }>();

    const [data, setData] = useState<{
        idTecnico: number
    }>({ idTecnico: 0 });

    const addMutator = mutatorRequest('/admin/tecnicos/add-to-ot', 'POST', {
        idOt: id,
        idTecnico: data.idTecnico
    })

    useEffect(() => {
        if (addMutator.isSuccess) {
            setTextModalSuccess('Se ha asignado el técnico a la orden de trabajo');
            setOpenDialogSuccess(true);
            setData({ idTecnico: 0 });
            ot.refetch();
        }

        if (addMutator.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: addMutator.error?.response?.data?.error,
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [addMutator.isSuccess, addMutator.isError]);

    const [dialogDeleteTecnico, setDialogDeleteTecnico] = useState({
        open: false,
        idTecnico: 0
    });

    const deleteMutator = mutatorRequest('/admin/tecnicos/remove-from-ot/' + dialogDeleteTecnico.idTecnico, 'DELETE', {})
    const [textModalSuccess, setTextModalSuccess] = useState('');

    useEffect(() => {
        if (deleteMutator.isSuccess) {
            setDialogDeleteTecnico({ open: false, idTecnico: 0 });
            setTextModalSuccess('Se ha eliminado el técnico de la orden de trabajo');
            setOpenDialogSuccess(true);
            ot.refetch();
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

    const [ dataDates, setDataDates ] = useState<{ date_begin: string, date_end: string }>({
        date_begin: '',
        date_end: ''
    });

    useEffect(() => {
        setDataDates({
            date_begin: ot.data?.data?.date_begin?.split('T')[0] || '',
            date_end: ot.data?.data?.date_end?.split('T')[0] || ''
        });
    }, [ot.data?.data?.date_begin, ot.data?.data?.date_end]);

    const changeDatesMutator = mutatorRequest('/admin/ots/change-date-begin-end/' + id, 'POST', dataDates);

    useEffect(() => {
        if (changeDatesMutator.isSuccess) {
            setTextModalSuccess('Se ha cambiado la fecha de inicio y finalización de la orden de trabajo');
            setOpenDialogSuccess(true);
            ot.refetch();
        }

        if (changeDatesMutator.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: changeDatesMutator.error?.response?.data?.error,
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [changeDatesMutator.isSuccess, changeDatesMutator.isError]);

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
                title={textModalSuccess}
            />

            <Dialog open={dialogDeleteTecnico.open} onClose={() => setDialogDeleteTecnico({ ...dialogDeleteTecnico, open: false })} maxWidth='xs' fullWidth className="modal-dialog">
                <DialogContent className="modal-principal">

                    <Grid container justifyContent={'center'}>
                        <Grid item xs={12} md={6} mb={5}>
                            <Typography className="modal-principal-title">
                                ¿Seguro que deseas eliminar el técnico de la orden de trabajo?
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
                                    setDialogDeleteTecnico({ open: false, idTecnico: 0 });
                                }
                            }>
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>
            <Grid item xs={12}>
                <Grid container p={5} spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Typography sx={{
                            fontSize: '1rem', fontWeight: 'bold', color: '#272936'
                        }}>
                            Asignación de OT
                        </Typography>
                        <FormGroup>
                            <Select
                                className="input-text-principal select-input-text-principal"
                                name='type_rol'
                                sx={{ ":disabled": { backgroundColor: '#fff' }, color: 'white' }}
                                value={data.idTecnico}
                                onChange={(e: any) => setData({ ...data, idTecnico: e.target.value })}
                            >
                                {
                                    tecnicos.data?.data?.map((item, index) => (
                                        <MenuItem key={index} value={item.id}>{item.name} {item.lastname}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12} md={4} lg={3}>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#272936', visibility: 'hidden' }}>
                            Técnico
                        </Typography>
                        <Button variant='contained' className="btn-tab-disabled" sx={{
                            color: '#f78f15 !important', border: '#f78f15 1px solid', display: 'flex', justifyContent: 'space-between',
                            ":hover": { color: '#f78f15 !important' }
                        }}
                            disabled={addMutator.isLoading}
                            fullWidth onClick={
                                () => {
                                    if (data.idTecnico === 0) {
                                        setViewAlert({
                                            open: true,
                                            message: 'Debe seleccionar un técnico',
                                            color: 'error',
                                            onClose: () => setViewAlert({ ...viewAlert, open: false })
                                        });
                                        return;
                                    }

                                    addMutator.mutate();
                                }
                            }>
                            Añadir Técnico
                            <Add />
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={8} lg={5}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#272936' }}>
                                    Fecha de inicio
                                </Typography>
                                <FormGroup>
                                    <input type="date" className="input-text-principal" name="date" style={{
                                        borderRadius: '0 !important', border: '1px solid #272936', padding: '10px', width: '100%'
                                    }} value={dataDates.date_begin}
                                    onChange={(e: any) => setDataDates({ ...dataDates, date_begin: e.target.value })}
                                    />
                                </FormGroup>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#272936' }}>
                                    Fecha de finalización
                                </Typography>
                                <FormGroup>
                                    <input type="date" className="input-text-principal" name="date" style={{
                                        borderRadius: '0 !important', border: '1px solid #272936', padding: '10px', width: '100%'
                                    }} value={dataDates.date_end}
                                    onChange={(e: any) => setDataDates({ ...dataDates, date_end: e.target.value })}
                                    />
                                </FormGroup>
                            </Grid>

                            <Grid item xs={12} textAlign='center'>
                                <Button variant="contained" sx={{
                                    backgroundColor: '#272936', color: '#fff',
                                    textTransform: 'capitalize',
                                    ":disabled": { backgroundColor: '#272936', color: '#fff' },
                                    ":hover": { backgroundColor: '#272936', color: '#fff' },
                                }} onClick={
                                    () => {
                                        if (dataDates.date_begin === '' || dataDates.date_end === '') {
                                            setViewAlert({
                                                open: true,
                                                message: 'Debe seleccionar una fecha de inicio y finalización',
                                                color: 'error',
                                                onClose: () => setViewAlert({ ...viewAlert, open: false })
                                            });
                                            return;
                                        }

                                        changeDatesMutator.mutate();
                                    }
                                } disabled={changeDatesMutator.isLoading}>
                                    Aceptar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Table className="table-head-fz-18">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Rol</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    ot.data?.data?.tecnicos_ot?.map((item: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.user?.name} {item.user?.lastname}</TableCell>
                                            <TableCell>Técnico</TableCell>
                                            <TableCell>
                                                <Button variant='text' color="error" fullWidth
                                                    onClick={() => setDialogDeleteTecnico({ open: true, idTecnico: item.id })}
                                                >
                                                    Eliminar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }

                                {
                                    ot.data?.data && ot.data?.data?.tecnicos_ot?.length === 0 &&
                                    <TableRow>
                                        <TableCell colSpan={3} align='center'>
                                            No hay técnicos asignados
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
}