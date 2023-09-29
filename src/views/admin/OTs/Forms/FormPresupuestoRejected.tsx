import { Fragment, useEffect, useState } from "react";
import { Grid, Typography, Checkbox, FormControlLabel, FormGroup, FormControl, TextField, Button, AlertColor, Dialog, DialogContent, Divider } from "@mui/material";
import { SnakbarAlert } from "../../../../components/snakbar/snakbarAlert";
import mutatorRequest from "../../../../utils/mutatorRequest";
import { useParams } from "react-router-dom";
import icon_worker from "../../../../assets/img/ast-03.png";

export default function FormPresupuestoRejected({
    data, setData, request
}: {
    data: Models.FormPresupuestoAsignacion,
    setData: React.Dispatch<React.SetStateAction<Models.FormPresupuestoAsignacion>>,
    request: any
}): JSX.Element {

    const { id } = useParams<{ id: string }>();
    const senBudget = mutatorRequest('/admin/ots/send-budget/'+id, 'POST', {
        motivo_rechazo: data.motivo.trim(),
        status: 'rejected',
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

    const [ openDialogSuccess, setOpenDialogSuccess ] = useState<boolean>(false);

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

            <SnakbarAlert 
                open={viewAlert.open}
                message={viewAlert.message}
                color={viewAlert.color}
                onClose={viewAlert.onClose}
            />

            <Dialog open={openDialogSuccess} onClose={() => setOpenDialogSuccess(false)} maxWidth='xs' fullWidth className="modal-dialog">
                <DialogContent className="modal-principal">

                    <Grid container justifyContent={'center'}>
                        <Grid item xs={12} md={6} mb={5}>
                            <Typography className="modal-principal-title-error">
                                Orden N° #{id} Rechazada
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
                                border: '2px solid red', borderRadius: '50%'
                            }}/>
                        </Grid>

                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} mt={5} textAlign='center'>
                            <Button variant="contained" className="modal-principal-button-alert" onClick={
                                () => {
                                    setOpenDialogSuccess(false)
                                }
                            }>
                                Aceptar
                            </Button>
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>

            <Typography sx={{
                fontSize: '12px', color: '#000', fontWeight: 'bold', marginTop: '40px'
            }}>
                Motivo del rechazo
            </Typography>
            <Grid item xs={12}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox
                        sx={{
                            color: '#ffac1e',
                            '&.Mui-checked': {
                                color: '#ffac1e',
                            },
                        }} checked={data.motivo === 'Precio'} onChange={() => {
                            // Si el valor es el mismo, se desmarca
                            if (data.motivo === 'Precio') setData({ ...data, motivo: '' })
                            else setData({ ...data, motivo: 'Precio' })
                        }}
                    />
                    } label={
                        <Typography>
                            Precio
                        </Typography>
                    } />
                </FormGroup>
            </Grid>
            <Grid item xs={12}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox
                        sx={{
                            color: '#ffac1e',
                            '&.Mui-checked': {
                                color: '#ffac1e',
                            },
                        }} checked={data.motivo === 'Plazo'} onChange={() => {
                            // Si el valor es el mismo, se desmarca
                            if (data.motivo === 'Plazo') setData({ ...data, motivo: '' })
                            else setData({ ...data, motivo: 'Plazo' })
                        }}
                    />
                    } label={
                        <Typography>
                            Plazo
                        </Typography>
                    } />
                </FormGroup>
            </Grid>
            <Grid item xs={12}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox
                        sx={{
                            color: '#ffac1e',
                            '&.Mui-checked': {
                                color: '#ffac1e',
                            },
                        }} checked={data.motivo === 'No se repara'} onChange={() => {
                            // Si el valor es el mismo, se desmarca
                            if (data.motivo === 'No se repara') setData({ ...data, motivo: '' })
                            else setData({ ...data, motivo: 'No se repara' })
                        }}
                    />
                    } label={
                        <Typography>
                            No se repara
                        </Typography>
                    } />
                </FormGroup>
            </Grid>
            <Typography sx={{ fontSize: '12px', color: '#000', fontWeight: 'bold' }}>
                Otro
            </Typography>
            <Grid item xs={12}>
                <FormGroup sx={{
                    position: 'relative',
                }}>
                    <TextField className="input-text-principal" placeholder='Describir...'
                        multiline rows={3}
                        value={data.motivo === 'Precio' || data.motivo === 'Plazo' || data.motivo === 'No se repara' ? '' : data.motivo}
                        onChange={(e) => {
                            if (e.target.value.length <= 2500) setData({ ...data, motivo: e.target.value })
                        }}
                        disabled={data.motivo === 'Precio' || data.motivo === 'Plazo' || data.motivo === 'No se repara'}
                        sx={{
                            ":disabled": {
                                "::placeholder": { color: '#fff !important' },
                            },
                        }}
                    />
                    <span style={{
                        fontSize: '10px', color: '#000', position: 'absolute', right: '10px', bottom: '10px',
                    }}>
                        {data.motivo.length}/2500
                    </span>
                </FormGroup>
            </Grid>

            <Grid item xs={12} mt={2}>
                <Grid container justifyContent={'center'}>
                    <Grid item xs={12} md={6} lg={4} textAlign='center'>
                        <Button sx={{ backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block', width: '100%',
                            ":hover": { backgroundColor: '#272936', color: '#fff' },
                        }}
                            onClick={() => senBudget.mutate()}
                            disabled={senBudget.isLoading}
                        >
                            Aceptar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

        </Fragment>
    )
}