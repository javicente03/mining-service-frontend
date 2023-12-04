import { Add, Close, Edit, Remove } from "@mui/icons-material";
import { AlertColor, Button, Checkbox, Dialog, DialogContent, Divider, FormControlLabel, FormGroup, Grid, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import ModalSuccessGenerico from "../../../../components/modals/ModalSuccessGenerico"
import { SnakbarAlert } from "../../../../components/snakbar/snakbarAlert"
import { GetInsumosAdmin } from "../../../../helpers/admin/insumos";
import mutatorRequest from "../../../../utils/mutatorRequest";
import mutatorRequestParam from "../../../../utils/mutatorRequestParam";

export default function InsumosAdminOT({
    ot
}: {
    ot: any
}): JSX.Element {

    const { id } = useParams<{ id: string }>();

    // Repuestos
    const repuestos = useQuery(['GetRepuestos'], () => GetInsumosAdmin());
    const [repuestoSelected, setRepuestoSelected] = useState<{
        id: number,
        cantidad: number
    }>({
        id: 0, cantidad: 0
    });

    const addRepuesto = mutatorRequest('/admin/insumos/add-ot/' + id, 'POST', {
        insumoId: repuestoSelected.id,
        cantidad: repuestoSelected.cantidad
    })

    useEffect(() => {
        if (addRepuesto.isSuccess) {
            setTextModalSuccess('Se ha agregado el repuesto correctamente');
            setOpenDialogSuccess(true);
            setRepuestoSelected({ id: 0, cantidad: 0 });
            ot.refetch();
        }

        if (addRepuesto.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: addRepuesto.error?.response?.data?.error,
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [addRepuesto.isSuccess, addRepuesto.isError]);

    const [repuestosOT, setRepuestosOT] = useState<{
        id: number
        otId: number
        insumoId: number
        cantidad: number
        cantidad_now: number
        createdAt: string
        insumo: {
            id: number
            title: string
            description: string
            modelo: string
            marca: string
            nro_componente: number
            year: number
            stock: number
            image: string
            deleted: boolean
            createdAt: string
        }
    }[]>([]);

    useEffect(() => {
        if (ot.data?.data?.insumos_ot) {
            setRepuestosOT(
                ot.data?.data?.insumos_ot.map((item: any) => ({
                    ...item,
                    cantidad_now: item.cantidad
                }))
            );
        }
    }, [ot.data?.data?.insumos_ot]);

    const updateRepuesto = mutatorRequestParam('/admin/insumos/update-ot', 'PUT');

    useEffect(() => {
        if (updateRepuesto.isSuccess) {
            setTextModalSuccess('Se ha actualizado el repuesto correctamente');
            setOpenDialogSuccess(true);
            ot.refetch();
        }

        if (updateRepuesto.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: updateRepuesto.error?.response?.data?.error,
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [updateRepuesto.isSuccess, updateRepuesto.isError]);

    const [dialogDeleteInsumo, setDialogDeleteInsumo] = useState<{
        open: boolean,
        idInsumo: number
    }>({
        open: false,
        idInsumo: 0
    });
    const deleteRepuesto = mutatorRequest('/admin/insumos/delete-ot', 'DELETE', {
        id: dialogDeleteInsumo.idInsumo
    });

    useEffect(() => {
        if (deleteRepuesto.isSuccess) {
            setTextModalSuccess('Se ha eliminado el repuesto correctamente');
            setOpenDialogSuccess(true);
            setDialogDeleteInsumo({ open: false, idInsumo: 0 });
            ot.refetch();
        }

        if (deleteRepuesto.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: deleteRepuesto.error?.response?.data?.error,
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [deleteRepuesto.isSuccess, deleteRepuesto.isError]);

    // ---- End Repuestos

    // Lubricantes

    const lubcricantesDisponibles = [
        {
            name: 'SAE 10W',
            code: 'sae_10w'
        },
        {
            name: 'SAE 15W40',
            code: 'sae_15w40'
        },
        {
            name: 'SAE 30',
            code: 'sae_30'
        },
        {
            name: 'SAE 50',
            code: 'sae_50'
        },
        {
            name: 'SAE 60',
            code: 'sae_60'
        },
        {
            name: 'Refrigerante',
            code: 'refrigerante'
        },
        {
            name: 'Grasa Kg',
            code: 'grasa_kg'
        }
    ]

    const checkLubricanteMutator = mutatorRequestParam('/admin/lubricantes/check', 'POST');

    useEffect(() => {
        if (checkLubricanteMutator.isSuccess) {
            ot.refetch();
        }

        if (checkLubricanteMutator.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: checkLubricanteMutator.error?.response?.data?.error,
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [checkLubricanteMutator.isSuccess, checkLubricanteMutator.isError]);

    const updateLubricanteMutator = mutatorRequestParam('/admin/lubricantes/update', 'PUT');

    useEffect(() => {
        if (updateLubricanteMutator.isSuccess) {
            ot.refetch();
        }

        if (updateLubricanteMutator.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: updateLubricanteMutator.error?.response?.data?.error,
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [updateLubricanteMutator.isSuccess, updateLubricanteMutator.isError]);

    // ---- End Lubricantes

    // Alistamiento

    const alistamientosDisponibles = [
        {
            name: 'Extintor + base',
            code: 'extintor_base'
        },
        {
            name: 'Baliza',
            code: 'baliza'
        },
        {
            name: 'Parada Emergencia',
            code: 'parada_emergencia'
        },
        {
            name: 'Corta Corriente',
            code: 'corta_corriente'
        },
        {
            name: 'Cuñas',
            code: 'cunas'
        },
        {
            name: 'Caja metalica corta corriente',
            code: 'caja_metalica_corta_corriente'
        },
        {
            name: 'Pertiga',
            code: 'pertiga'
        },
        {
            name: 'Mangueras',
            code: 'mangueras'
        }
    ];

    const checkAlistamientoMutator = mutatorRequestParam('/admin/alistamiento/check', 'POST');

    useEffect(() => {
        if (checkAlistamientoMutator.isSuccess) {
            ot.refetch();
        }

        if (checkAlistamientoMutator.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: checkAlistamientoMutator.error?.response?.data?.error,
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [checkAlistamientoMutator.isSuccess, checkAlistamientoMutator.isError]);

    // ---- End Alistamiento

    const [textModalSuccess, setTextModalSuccess] = useState('');

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

            <Dialog open={dialogDeleteInsumo.open} onClose={() => setDialogDeleteInsumo({ ...dialogDeleteInsumo, open: false })} maxWidth='xs' fullWidth className="modal-dialog">
                <DialogContent className="modal-principal">

                    <Grid container justifyContent={'center'}>
                        <Grid item xs={12} md={6} mb={5}>
                            <Typography className="modal-principal-title">
                                ¿Seguro que deseas eliminar el repuesto de la orden de trabajo?
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
                                    deleteRepuesto.mutate();
                                }
                            } disabled={deleteRepuesto.isLoading}>
                                Confirmar
                            </Button>
                            <Button variant="contained" className="modal-principal-button-error" sx={{
                                marginLeft: { xs: '0px', sm: '10px' },
                                marginTop: { xs: '10px', sm: '0px' },
                            }} onClick={
                                () => {
                                    setDialogDeleteInsumo({ open: false, idInsumo: 0 });
                                }
                            }>
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>

            <Grid item xs={12} p={2}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={4} sx={{
                        // Border #cecece 1px solid pero solo en la derecha para md y abajo para xs
                        borderRight: { xs: 'none', md: '#cecece 2px solid' },
                        borderBottom: { xs: '#cecece 2px solid', md: 'none' },
                        padding: '10px'
                    }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography sx={{
                                    fontSize: '1rem', fontWeight: 'bold', color: '#272936'
                                }}>
                                    Repuestos
                                </Typography>
                                <FormGroup>
                                    <Select
                                        className="input-text-principal select-input-text-principal"
                                        name='type_rol'
                                        sx={{ ":disabled": { backgroundColor: '#fff' }, color: 'white' }}
                                        value={repuestoSelected?.id || 0}
                                        onChange={(e) => {
                                            setRepuestoSelected({
                                                id: Number(e.target.value),
                                                cantidad: 1
                                            });
                                        }}
                                    >
                                        <MenuItem value={0} disabled>Listado de Repuestos</MenuItem>
                                        {
                                            repuestos.data?.data?.map((item, index) => (
                                                <MenuItem key={index} value={item.id}>{item.title}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormGroup>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography sx={{
                                    fontSize: '1rem', fontWeight: 'bold', color: '#272936'
                                }}>
                                    Cantidad
                                </Typography>
                                <FormGroup>
                                    <TextField
                                        className="input-text-principal"
                                        sx={{ ":disabled": { backgroundColor: '#fff' }, color: 'white' }}
                                        value={repuestoSelected?.cantidad || ''}
                                        disabled={!repuestoSelected}
                                        onChange={(e) => {
                                            if (!repuestoSelected) return;
                                            let value = e.target.value;
                                            if (isNaN(Number(value))) { setRepuestoSelected({ ...repuestoSelected, cantidad: 0 }); return; }
                                            setRepuestoSelected({
                                                ...repuestoSelected,
                                                cantidad: Number(e.target.value)
                                            });
                                        }}
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} mt={8}>
                            <Button variant='contained' sx={{
                                backgroundColor: '#272936', color: '#fff',
                                textTransform: 'capitalize',
                                ":disabled": { backgroundColor: '#272936', color: '#fff' },
                                ":hover": { backgroundColor: '#272936', color: '#fff' },
                            }} disabled={repuestoSelected.id === 0 || addRepuesto.isLoading} onClick={() => {
                                if (!repuestoSelected) return;
                                addRepuesto.mutate();
                            }} fullWidth>
                                Agregar Repuesto
                                <Add />
                            </Button>
                        </Grid>

                        {
                            repuestosOT.length > 0 && (

                                <Grid item xs={12} mt={2}>
                                    <Grid container sx={{
                                        maxHeight: '350px',
                                        overflowY: 'scroll',
                                        overflowX: 'hidden',
                                        scrollbarWidth: 'thin',
                                        border: '#cecece 1px solid',
                                        padding: '10px',
                                        borderRadius: '5px'
                                    }}>
                                        {
                                            repuestosOT.map((item, index) => (
                                                <Fragment key={index}>
                                                    <Grid item xs={12} key={index} mt={1} sx={{
                                                    }}>
                                                        <Grid container>
                                                            <Grid item xs={8} md={7} sx={{
                                                            }}>
                                                                <Typography sx={{
                                                                    fontSize: '1rem', fontWeight: 'bold', color: '#272936'
                                                                }}>
                                                                    {item.insumo.title}
                                                                </Typography>
                                                                <Typography sx={{
                                                                    fontSize: '1rem', fontWeight: 'bold', color: '#272936'
                                                                }}>
                                                                    Cantidad: {item.cantidad}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={2} md={2.5}>
                                                                <IconButton
                                                                    sx={{
                                                                        color: '#272936',
                                                                        backgroundColor: '#f78f15',
                                                                        ":hover": { backgroundColor: '#f78f15' },
                                                                    }} size="small"
                                                                    disabled={item.cantidad >= item.insumo.stock + item.cantidad_now}
                                                                    onClick={() => {
                                                                        // Agregar 1 de cantidad
                                                                        // No se puede agregar mas de lo que hay en stock
                                                                        if (item.cantidad >= item.insumo.stock + item.cantidad_now) return;
                                                                        setRepuestosOT(repuestosOT.map((item2) => {
                                                                            if (item2.id === item.id) {
                                                                                return {
                                                                                    ...item2,
                                                                                    cantidad: item2.cantidad + 1
                                                                                }
                                                                            }
                                                                            return item2;
                                                                        }));
                                                                    }}
                                                                >
                                                                    <Add />
                                                                </IconButton>

                                                                <IconButton
                                                                    sx={{
                                                                        color: '#272936',
                                                                        backgroundColor: '#f78f15',
                                                                        ":hover": { backgroundColor: '#f78f15' }, marginTop: {
                                                                            xs: '5px', sm: '0', md: '5px'
                                                                        }
                                                                    }} size="small"
                                                                    disabled={item.cantidad <= 1}
                                                                    onClick={() => {
                                                                        // Restar 1 de cantidad
                                                                        // No se puede restar menos de 1
                                                                        if (item.cantidad <= 1) return;
                                                                        setRepuestosOT(repuestosOT.map((item2) => {
                                                                            if (item2.id === item.id) {
                                                                                return {
                                                                                    ...item2,
                                                                                    cantidad: item2.cantidad - 1
                                                                                }
                                                                            }
                                                                            return item2;
                                                                        }));
                                                                    }}
                                                                >
                                                                    <Remove />
                                                                </IconButton>
                                                            </Grid>

                                                            <Grid item xs={2} md={2.5}>
                                                                <IconButton sx={{
                                                                    backgroundColor: '#272936', color: '#fff',
                                                                    textTransform: 'capitalize',
                                                                    ":disabled": { backgroundColor: '#272936', color: '#fff' },
                                                                    ":hover": { backgroundColor: '#272936', color: '#fff' },
                                                                }} disabled={updateRepuesto.isLoading} onClick={() => {
                                                                    updateRepuesto.mutate({
                                                                        id: item.id,
                                                                        cantidad: item.cantidad
                                                                    });
                                                                }}
                                                                    size="small"
                                                                >
                                                                    <Edit />
                                                                </IconButton>

                                                                <IconButton sx={{
                                                                    backgroundColor: '#272936', color: '#fff',
                                                                    textTransform: 'capitalize',
                                                                    ":disabled": { backgroundColor: '#272936', color: '#fff' },
                                                                    ":hover": { backgroundColor: '#272936', color: '#fff' },
                                                                    marginTop: {
                                                                        xs: '5px', sm: '0', md: '5px'
                                                                    }
                                                                }} disabled={deleteRepuesto.isLoading} onClick={() => {
                                                                    setDialogDeleteInsumo({
                                                                        open: true,
                                                                        idInsumo: item.id
                                                                    });
                                                                }}
                                                                    size="small"
                                                                >
                                                                    <Close />
                                                                </IconButton>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Divider sx={{
                                                        backgroundColor: '#cecece', marginTop: '10px', width: '100%'
                                                    }} />
                                                </Fragment>
                                            ))
                                        }
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Grid>

                    <Grid item xs={12} md={4} sx={{
                        // Border #cecece 1px solid pero solo en la derecha para md y abajo para xs
                        borderRight: { xs: 'none', md: '#cecece 2px solid' },
                        borderBottom: { xs: '#cecece 2px solid', md: 'none' },
                        padding: '10px'
                    }}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Typography sx={{
                                    fontSize: '1rem', fontWeight: 'bold', color: '#272936', textAlign: 'center', marginBottom: '20px'
                                }}>
                                    Lubricantes
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography sx={{
                                    fontSize: '1rem', fontWeight: 'bold', color: '#272936', textAlign: 'center', marginBottom: '20px'
                                }}>
                                    Cantidad
                                </Typography>
                            </Grid>
                            {
                                lubcricantesDisponibles.map((item, index) => (
                                    <Fragment key={index}>
                                        <Grid item xs={12} md={6}>
                                            <FormGroup>
                                                <FormControlLabel labelPlacement="end" control={<Checkbox
                                                    sx={{
                                                        color: '#ffac1e',
                                                        '&.Mui-checked': {
                                                            color: '#ffac1e',
                                                        },
                                                    }}
                                                    onChange={(e) => {
                                                        checkLubricanteMutator.mutate({
                                                            code: item.code,
                                                            otId: Number(id),
                                                            name: item.name
                                                        });
                                                    }}
                                                    checked={ot.data?.data?.lubricantes_ot?.find((item2: any) => item2.code === item.code) ? true : false}
                                                />} label={item.name} />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormGroup >
                                                <Select
                                                    className="input-text-secondary select-input-text-secondary"
                                                    name='type_secondary'
                                                    sx={{ ":disabled": { backgroundColor: '#fff' }, color: 'white !important' }}
                                                    value={
                                                        // Si no esta seleccionado el lubricante se coloca 0
                                                        // Si esta seleccionado se coloca el valor que tiene
                                                        // Si el valor es null se coloca 0
                                                        ot.data?.data?.lubricantes_ot?.find((item2: any) => item2.code === item.code) ?
                                                            ot.data?.data?.lubricantes_ot?.find((item2: any) => item2.code === item.code).lts === null ?
                                                                0 :
                                                                ot.data?.data?.lubricantes_ot?.find((item2: any) => item2.code === item.code).lts
                                                            :
                                                            0
                                                    }
                                                    onChange={(e) => {
                                                        updateLubricanteMutator.mutate({
                                                            code: item.code,
                                                            lts: Number(e.target.value),
                                                            id: id
                                                        });
                                                    }}
                                                    readOnly={!ot.data?.data?.lubricantes_ot?.find((item2: any) => item2.code === item.code)}
                                                    // disabled={!ot.data?.data?.lubricantes_ot?.find((item2: any) => item2.code === item.code)}
                                                >
                                                    <MenuItem value={0} disabled>Lts</MenuItem>
                                                    <MenuItem value={3}>3 Lts</MenuItem>
                                                    <MenuItem value={4}>4 Lts</MenuItem>
                                                    <MenuItem value={5}>5 Lts</MenuItem>
                                                </Select>
                                                
                                            </FormGroup>
                                        </Grid>

                                        <Divider 
                                            sx={{
                                                display: {
                                                    xs: 'block', md: 'none'
                                                },
                                                backgroundColor: '#cecece', marginTop: '10px', width: '100%'
                                            }}
                                        />
                                    </Fragment>
                                ))
                            }
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={4} sx={{
                        // Border #cecece 1px solid pero solo en la derecha para md y abajo para xs
                        borderBottom: { xs: '#cecece 2px solid', md: 'none' },
                        padding: '10px'
                    }}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Typography sx={{
                                    fontSize: '1rem', fontWeight: 'bold', color: '#272936', textAlign: 'center', marginBottom: '20px'
                                }}>
                                    Alistamiento
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                            </Grid>

                            {
                                alistamientosDisponibles.map((item, index) => (
                                    <Fragment key={index}>
                                        <Grid item xs={12} md={6}>
                                            <FormGroup>
                                                <FormControlLabel labelPlacement="end" control={<Checkbox
                                                    sx={{
                                                        color: '#ffac1e',
                                                        '&.Mui-checked': {
                                                            color: '#ffac1e',
                                                        },
                                                    }}
                                                    onChange={(e) => {
                                                        checkAlistamientoMutator.mutate({
                                                            code: item.code,
                                                            otId: Number(id),
                                                            name: item.name
                                                        });
                                                    }}
                                                    checked={ot.data?.data?.alistamiento_ot?.find((item2: any) => item2.code === item.code) ? true : false}
                                                />} label={item.name} />
                                            </FormGroup>
                                        </Grid>

                                        <Divider 
                                            sx={{
                                                display: {
                                                    xs: 'block', md: 'none'
                                                },
                                                backgroundColor: '#cecece', marginTop: '10px', width: '100%'
                                            }}
                                        />
                                    </Fragment>
                                ))
                            }
                        </Grid>    
                    </Grid>
                </Grid>
            </Grid>

        </Fragment>
    )
}