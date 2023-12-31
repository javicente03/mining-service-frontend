import { Fragment, useEffect, useState } from "react"
import { Grid, Button, Typography, Checkbox, FormControlLabel, FormGroup, FormControl, InputLabel, TextField, MenuItem, Select, AlertColor, Dialog, DialogContent, Divider } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { GetOTByIdAdmin } from "../../../helpers/admin/ots"
import { useNavigate, useParams } from "react-router-dom"
import { formatAmount } from "../../../helpers/formatAmount"
import FormPresupuestoApproved from "./Forms/FormPresupuestoApproved"
import FormPresupuestoRejected from "./Forms/FormPresupuestoRejected"
import { SnakbarAlert } from "../../../components/snakbar/snakbarAlert"
import icon_worker from "../../../assets/img/ast-03.png";
import mutatorRequest from "../../../utils/mutatorRequest"
import mutatorRequestParam from "../../../utils/mutatorRequestParam"
import ModalSuccessGenerico from "../../../components/modals/ModalSuccessGenerico"

export const AsignacionPresupuesto = () => {

    const { id } = useParams<{ id: string }>()
    const request = useQuery(['GetOTByIdAdmin', id], () => GetOTByIdAdmin(id));

    const [ data, setData ] = useState<Models.FormPresupuestoAsignacion>({
        date: '',
        status:'approved',
        cost: 0,
        desarme_evaluacion: false,
        lavado: false,
        evaluacion: false,
        informe_tecnico: '',
        motivo: '',
        tipo_componenteId: 0,
    })

    useEffect(() => {
        if (request.data?.data && request.data?.data?.presupuestoOt) {
            setData({
                ...data,
                date: request.data?.data?.presupuestoOt?.date?.split('T')[0] || '',
                status: request.data?.data?.status_ot === 'pending' ? 'approved' : request.data?.data?.status_ot || 'approved',
                cost: request.data?.data?.presupuestoOt?.cost,
                desarme_evaluacion: request.data?.data?.presupuestoOt?.desarme_evaluacion,
                lavado: request.data?.data?.presupuestoOt?.lavado,
                evaluacion: request.data?.data?.presupuestoOt?.evaluacion,
                informe_tecnico: request.data?.data?.presupuestoOt?.informe_tecnico,
                motivo: request.data?.data?.presupuestoOt?.motivo_rechazo,
                tipo_componenteId: request.data?.data?.presupuestoOt?.tipo_componenteId,
            })
        }
    }, [request.data])

    const formatStatus = (status: string) => {
        let ret: string | JSX.Element = '';
        switch (status) {
            case 'pending':
                ret = <Typography className="status-blue" sx={{
                    border: '#cecece 1px solid', marginLeft: {
                        xs: '0', sm: '10px'
                    }, marginTop: '10px', display: {
                        xs: 'block', sm: 'inline-block'
                    }
                }}>
                    Pendiente
                </Typography>
                break;
            case 'approved':
                ret = <Typography className="status-green" sx={{
                    border: '#cecece 1px solid', marginLeft: {
                        xs: '0', sm: '10px'
                    }, marginTop: '10px', display: {
                        xs: 'block', sm: 'inline-block'
                    }
                }}>
                    Aprobada
                </Typography>
                break;
            case 'in_process':
                ret = <Typography className="status-orange" sx={{
                    border: '#cecece 1px solid', marginLeft: {
                        xs: '0', sm: '10px'
                    }, marginTop: '10px', display: {
                        xs: 'block', sm: 'inline-block'
                    }
                }}>
                    En Proceso
                </Typography>
                break;
            case 'rejected':
                ret = <Typography className="status-red" sx={{
                    border: '#cecece 1px solid', marginLeft: {
                        xs: '0', sm: '10px'
                    }, marginTop: '10px', display: {
                        xs: 'block', sm: 'inline-block'
                    }
                }}>
                    Rechazada
                </Typography>
                break;
            // case 
            default:
                ret = <Typography className="status-blue" sx={{
                    border: '#cecece 1px solid', marginLeft: {
                        xs: '0', sm: '10px'
                    }, marginTop: '10px', display: {
                        xs: 'block', sm: 'inline-block'
                    }
                }}>
                    Pendiente
                </Typography>
                break;
        }

        return ret;
    }

    const senBudget = mutatorRequest('/admin/ots/send-budget/'+id, 'POST', {
        ...data,
        informe_tecnico: data.informe_tecnico.trim(),
    });

    useEffect(() => {
        if (senBudget.isSuccess) {
            setOpenDialogSuccess(true);
            request.refetch();
        }

        if (senBudget.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: senBudget.error.response.data.error || 'Error al atender la solicitud',
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [senBudget.isSuccess, senBudget.isError])

    const [ dataBudget, setDataBudget ] = useState<{
        motivo_rechazo: string,
    }>({ motivo_rechazo: '' });

    const attendRequest = mutatorRequestParam('/admin/ots/accept-budget/'+id, 'PUT');

    const [ openDialogAccept, setOpenDialogAccept ] = useState<boolean>(false);
    const [ openDialogReject, setOpenDialogReject ] = useState<boolean>(false);
    useEffect(() => {
        if (attendRequest.isSuccess) {
            request.refetch();
            if (attendRequest.data?.data?.status === 'approved') {
                setOpenDialogAccept(true);
            }
            if (attendRequest.data?.data?.status === 'rejected') {
                setOpenDialogReject(true);
            }
        }

        if (attendRequest.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: attendRequest.error.response.data.error || 'Error al atender la solicitud',
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [attendRequest.isSuccess, attendRequest.isError])

    const [ openDialogSuccess, setOpenDialogSuccess ] = useState<boolean>(false);

    const navigateTo = useNavigate();

    // Alert de error
    const [ viewAlert, setViewAlert ] = useState<{
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

            <ModalSuccessGenerico 
                openDialogSuccess={openDialogAccept} setOpenDialogSuccess={setOpenDialogAccept}
                title="Presupuesto aceptado" subtitle="La orden de trabajo ha sido creada con éxito"
            />

            <ModalSuccessGenerico 
                openDialogSuccess={openDialogReject} setOpenDialogSuccess={setOpenDialogReject}
                title="Presupuesto rechazado" subtitle="Has rechazado el presupuesto y la solicitud ha sido cancelada"
            />

            <Dialog open={openDialogSuccess} onClose={() => {
                setOpenDialogSuccess(false)
                navigateTo('/admin/ots')
            }} maxWidth='xs' fullWidth className="modal-dialog">
                <DialogContent className="modal-principal">

                    <Grid container justifyContent={'center'}>
                        <Grid item xs={12} md={6} mb={5}>
                            <Typography className="modal-principal-title">
                                Orden N° #{id} Aprobada
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
                        <Grid item xs={6} sm={4} md={3}>
                            <img src={icon_worker} alt="worker" width={'100%'} style={{
                                border: '2px solid green', borderRadius: '50%'
                            }}/>
                        </Grid>

                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} mt={5} textAlign='center'>
                            <Button variant="contained" className="modal-principal-button-success" onClick={
                                () => {
                                    setOpenDialogSuccess(false)
                                    navigateTo('/admin/ots')
                                }
                            }>
                                Aceptar
                            </Button>
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>

            <SnakbarAlert 
                open={viewAlert.open}
                message={viewAlert.message}
                color={viewAlert.color}
                onClose={viewAlert.onClose}
            />

            <Grid container border={'2px solid #f78f15'} style={{ borderRadius: '10px', padding: '10px' }}>
                <Grid item xs={12} p={2} sx={{
                    display: 'flex', flexWrap: 'wrap'
                }}>
                    <Button variant='contained' sx={{
                        backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                        textTransform: 'capitalize',
                        ":disabled": { backgroundColor: '#272936', color: '#fff' },
                    }} disabled={true}>
                        Orden de Trabajo N° #{request.data?.data?.id}
                    </Button>

                    {
                        request.data?.data?.status_ot && formatStatus(request.data?.data?.status_ot)
                    }
                </Grid>

                {
                    request.data?.data?.status_ot === 'rejected' && request.data?.data?.motivo_rechazo_solicitud_cliente 
                        && request.data?.data?.motivo_rechazo_solicitud_cliente?.length > 0 &&
                            <Grid item xs={12}>
                                <Typography className="status-red" sx={{
                                    border: '#cecece 1px solid', marginLeft: {
                                        xs: '0', sm: '10px'
                                    }, marginTop: '10px', display: {
                                        xs: 'block', sm: 'inline-block'
                                    }
                                }}>
                                    Motivo de Rechazo: &nbsp;
                                    {
                                    request.data?.data?.motivo_rechazo_solicitud_cliente[0].description
                                    }
                                </Typography>
                            </Grid>
                }

                <Grid item xs={12} textAlign='center' mt={3}>
                    <Button variant='contained' sx={{
                        backgroundColor: '#272936', color: '#fff', boxShadow:'rgba(0, 0, 0, 0.2) 4px 4px 3px 0px !important',
                        textTransform: 'capitalize', fontWeight: 'bold',
                        ":disabled": { backgroundColor: '#272936', color: '#fff' }, width: {
                            xs: '100%', sm: '300px'
                        }
                    }} disabled>
                        Presupuesto
                    </Button>
                </Grid>
                
                {
                    request.data?.data?.status_ot !== 'in_process' ?
                        <Grid item xs={12} md={
                            data.status === 'approved' ? 8 : 6
                        } m='0 auto'>
                            <Grid container mt={2}>
                                {
                                    data.status === 'approved' &&
                                        <FormPresupuestoApproved data={data} setData={setData} />
                                }
                                <Grid item xs={12} md={
                                    data.status === 'approved' ? 6 : 12
                                } sx={{
                                    borderLeft: {
                                        // El borde debe ser algo difuminado
                                        xs: 'none', md: data.status === 'approved' ? '1px solid #c7c7c7' : 'none'
                                    }, borderTop: {
                                        xs: '1px solid #c7c7c7', md: 'none'
                                    }, padding: '5px', paddingLeft: {
                                        xs: '0', md: '20px'
                                    }, paddingTop: {
                                        xs: '20px', md: '0'
                                    }
                                }}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <Select
                                                    className={`input-text-principal select-input-text-secondary ${data.status === 'approved' ? 'green' : 'red'}`}
                                                    name='type_component'
                                                    value={data.status}
                                                    onChange={(e) => setData({ ...data, status: e.target.value as string })}
                                                >
                                                    <MenuItem sx={{
                                                        color: '#37cb77'
                                                    }} value={'approved'}>Aprobar</MenuItem>
                                                    <MenuItem sx={{
                                                        color: '#fb6065'
                                                    }} value={'rejected'}>Rechazar</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        {
                                            data.status === 'approved' &&
                                                <Grid item xs={12} mt={2}>
                                                    <FormControl fullWidth>
                                                        <Typography sx={{
                                                            fontSize: '12px', color: '#000', fontWeight: 'bold'
                                                        }}>
                                                            Asignar Fecha
                                                        </Typography>
                                                        <input type="date" className="input-text-principal" style={{
                                                            backgroundColor: '#fff', color: '#000', padding: '20px 10px', borderRadius: '5px', marginTop: '5px'
                                                        }} 
                                                            // No permitir fechas anteriores a la actual
                                                            min={new Date().toISOString().split('T')[0]}
                                                            value={data.date}
                                                            onChange={(e) => setData({ ...data, date: e.target.value })}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                        }

                                        {
                                            data.status === 'rejected' &&
                                                <FormPresupuestoRejected data={data} setData={setData} request={request} />
                                        }
                                    </Grid>
                                </Grid>

                                {
                                    data.status === 'approved' &&
                                        <Grid item xs={12} mt={2}>
                                            <Grid container justifyContent={'center'}>
                                                <Grid item xs={12} md={6} lg={4} textAlign='center'>
                                                    <FormControl>
                                                        <Typography sx={{
                                                            fontSize: '12px', color: '#000', fontWeight: 'bold', marginTop: '10px', textAlign: 'center'
                                                        }}>
                                                            Precio
                                                        </Typography>
                                                        <TextField 
                                                            className="input-text-principal no-border text-center"
                                                            value={formatAmount(data.cost) || 0}
                                                            onChange={(e) => {
                                                                // Limpiar el valor de los puntos y el signo $
                                                                let value = e.target.value.replace(/\$|\.|\s/g, '')
                                                                // Si el valor no es un número, no hacer nada
                                                                console.log(value)
                                                                // Si el valor es empty string mandar 0
                                                                if (value === '') {
                                                                    setData({...data, cost: 0 })
                                                                }
                                                                if (isNaN(parseInt(value))) return;
                                                                // Setear el valor
                                                                setData({ ...data, cost: parseInt(value) })
                                                            }}
                                                        />
                                                        <Button sx={{ backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block', width: '100%',
                                                            ":hover": { backgroundColor: '#272936', color: '#fff' },
                                                        }}
                                                            onClick={() => senBudget.mutate()}
                                                            disabled={senBudget.isLoading}
                                                        >
                                                            Aceptar
                                                        </Button>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                }

                                {
                                    request.data?.data?.status_ot === 'approved' && request.data?.data?.presupuestoOt &&
                                        <Fragment>
                                            <Grid item xs={12} mt={2}>
                                                <Typography sx={{
                                                    fontSize: '16px', color: '#272936', fontWeight: 'bold', textAlign: 'center'
                                                }}>
                                                    ¿El cliente aceptó el presupuesto?
                                                </Typography>
                                            </Grid>

                                            <div style={{ width: '100%', marginTop: '10px', textAlign: 'center' }}>
                                                <Button variant="contained"
                                                    className="modal-principal-button-success"
                                                    onClick={() => {
                                                        attendRequest.mutate({ status: 'approved' });
                                                    }} disabled={attendRequest.isLoading}
                                                >
                                                    Sí
                                                </Button>

                                                <Button variant="contained"
                                                    className="modal-principal-button-error"
                                                    disabled={
                                                        dataBudget.motivo_rechazo.length === 0 || attendRequest.isLoading
                                                    }
                                                    sx={{
                                                        ":disabled": { opacity: 0.5 },
                                                        marginLeft: {
                                                            xs: '0', sm: '10px'
                                                        }, marginTop: {
                                                            xs: '10px', sm: '0'
                                                        }
                                                    }}
                                                    onClick={() => {
                                                        attendRequest.mutate({ status: 'rejected', motivo_rechazo: dataBudget.motivo_rechazo });
                                                    }}
                                                >
                                                    No
                                                </Button>
                                            </div>

                                            <Grid item xs={12} sm={8} m='0 auto' mt={2}>
                                                <Typography sx={{ fontWeight: 'bold', color: '#272936', textAlign: 'left' }}>
                                                    Motivo de rechazo
                                                </Typography>
                                                <FormControl fullWidth>
                                                    <TextField 
                                                        multiline
                                                        placeholder="Escribe aquí..."
                                                        rows={4}
                                                        className="input-text-principal"
                                                        value={dataBudget.motivo_rechazo}
                                                        onChange={(e) => {
                                                            if (e.target.value.length <= 2500) {
                                                                setDataBudget({
                                                                    ...dataBudget,
                                                                    motivo_rechazo: e.target.value
                                                                })
                                                            }
                                                        }}
                                                    />
                                                    <span style={{ color: '#272936', fontSize: '10px', position: 'absolute', bottom: '10px', right: '10px' }}>
                                                        {dataBudget.motivo_rechazo.length}/2500
                                                    </span>
                                                </FormControl>
                                            </Grid>
                                        </Fragment>
                                }
                            </Grid>    
                        </Grid>
                    :
                    <Fragment>
                        {/* Un mensaje sobre que ya se asigno un presupuesto */}
                        <Grid item xs={12} textAlign='center' mt={3}>
                            <Typography sx={{
                                fontSize: '16px', color: '#000', fontWeight: 'bold'
                            }}>
                                Ya se asignó un presupuesto a esta orden de trabajo
                            </Typography>
                        </Grid>
                    </Fragment>
                }
            </Grid>

        </Fragment>
    )
}