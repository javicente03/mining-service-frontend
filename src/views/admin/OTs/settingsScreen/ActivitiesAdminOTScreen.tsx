import { Add, Remove } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, AlertColor, Button, Checkbox, Container, Divider, FormControlLabel, FormGroup, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ModalSuccessGenerico from "../../../../components/modals/ModalSuccessGenerico"
import { SnakbarAlert } from "../../../../components/snakbar/snakbarAlert"
import { GetActivitiesAdmin, GetActivitiesAdminByOT } from "../../../../helpers/admin/activities"
import { formatTpoReal } from "../../../../helpers/formatAmount"
import mutatorRequest from "../../../../utils/mutatorRequest"
import mutatorRequestParam from "../../../../utils/mutatorRequestParam"

export default function ActivitiesAdminOT({
    ot
}: {
    ot: any
}): JSX.Element {

    const actividades = useQuery(['GetActivitiesAdmin'], () => GetActivitiesAdmin());
    const { id } = useParams<{ id: string }>();
    const myActivities = useQuery(['GetActivitiesAdminByOT', {}, id], () => GetActivitiesAdminByOT({}, id));

    const [ myActivitiesSelected, setMyActivitiesSelected ] = useState<Models.MyActivitiesGetModel[]>([]);

    useEffect(() => {
        if (myActivities.data?.data) {
            setMyActivitiesSelected(myActivities.data?.data);
        }
    }, [myActivities.data]);

    const [activitiesSelected, setActivitiesSelected] = useState<{
        otId: number,
        activities: { id: number }[]
    }>({
        otId: parseInt(id || '0'),
        activities: []
    });

    const assignAct = mutatorRequest('/admin/activities/assign-activities', 'POST', activitiesSelected);
    const [textModalSuccess, setTextModalSuccess] = useState('');

    useEffect(() => {
        if (assignAct.isSuccess) {
            setOpenDialogSuccess(true);
            setTextModalSuccess('Actividades asignadas correctamente');
            myActivities.refetch();
            ot.refetch();
        }

        if (assignAct.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: assignAct.error?.response?.data?.error,
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [assignAct.isSuccess, assignAct.isError]);

    const checkSubActMutator = mutatorRequestParam('/admin/activities/check-subactivity', 'POST');

    useEffect(() => {
        if (checkSubActMutator.isSuccess) {
            myActivities.refetch();
            ot.refetch();
            setOpenDialogSuccess(true);
            setTextModalSuccess(checkSubActMutator.data?.data?.message);
        }

        if (checkSubActMutator.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: checkSubActMutator.error?.response?.data?.error,
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [checkSubActMutator.isSuccess, checkSubActMutator.isError]);

        

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

    const [expanded, setExpanded] = useState<number | false>(false);
    const handleChange = (panel: number) => {
        // Si es el mismo panel, se cierra
        if (panel === expanded) {
            setExpanded(false);
        } else {
            setExpanded(panel);
        }
    }

    const progressStatus = (item: Models.MyActivitiesGetModel) => {

        // Sacar el progreso en base a las subactividades con finished
        let total_elementos = item.otSubActividadesRelation?.length || 0;
        let total_elementos_terminados = item.otSubActividadesRelation?.filter((sub) => sub.finished).length || 0;

        let porcentaje = (total_elementos_terminados * 100) / total_elementos;
        // Que no sea decimal
        porcentaje = Math.round(porcentaje);

        return <div className="progress-activity">
            <div className="progress-activity-bar" style={{
                width: porcentaje + '%',
                borderRadius: porcentaje === 100 ? '10px' : '10px 0 0 10px'
            }}>
            </div>
            <span className="percentage-activity">
                {porcentaje + '%'}
            </span>
        </div>
    }

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

            {
                myActivities.data?.total === 0 ?
                    <Grid item xs={12}>
                        <Typography ml={3}>
                            Agregar Trabajo Técnico
                        </Typography>

                        <Grid container>
                            <Grid item xs={12} sx={{
                                maxHeight: '400px',
                                overflowY: 'scroll',
                                overflowX: 'hidden',
                                scrollbarWidth: 'thin'
                            }}>
                                <Table className="table-head-fz-18">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Descripción de Trabajos</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            actividades.data?.data?.map((act, index: number) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {act.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormGroup>
                                                            <FormControlLabel labelPlacement="start" control={<Checkbox
                                                                sx={{
                                                                    color: '#ffac1e',
                                                                    '&.Mui-checked': {
                                                                        color: '#ffac1e',
                                                                    },
                                                                }}
                                                                value={activitiesSelected.activities.find((a: any) => a.id === act.id)}
                                                                onChange={() => {
                                                                    if (activitiesSelected.activities.find((a: any) => a.id === act.id)) {
                                                                        setActivitiesSelected({
                                                                            ...activitiesSelected,
                                                                            activities: activitiesSelected.activities.filter((a: any) => a.id !== act.id)
                                                                        })
                                                                    } else {
                                                                        setActivitiesSelected({
                                                                            ...activitiesSelected,
                                                                            activities: [...activitiesSelected.activities, { id: act.id }]
                                                                        })
                                                                    }
                                                                }}
                                                                checked={activitiesSelected.activities.find((a) => a.id === act.id) ? true : false}
                                                            />} label='' />
                                                        </FormGroup>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }

                                        {
                                            actividades.data?.total === 0 &&
                                            <TableRow>
                                                <TableCell colSpan={2} align='center'>
                                                    No hay actividades para mostrar
                                                </TableCell>
                                            </TableRow>
                                        }
                                    </TableBody>
                                </Table>
                            </Grid>

                            <Grid item xs={12} textAlign={{
                                xs: 'center', sm: 'right'
                            }} mt={2}>
                                <Button variant="contained" sx={{
                                    backgroundColor: '#272936', color: '#fff',
                                    textTransform: 'capitalize',
                                    ":disabled": { backgroundColor: '#272936', color: '#fff' },
                                    ":hover": { backgroundColor: '#272936', color: '#fff' },
                                }}
                                    disabled={assignAct.isLoading}
                                    onClick={() => {
                                        if (activitiesSelected.activities.length > 0) {
                                            assignAct.mutate();
                                        } else {
                                            setViewAlert({
                                                open: true,
                                                message: 'Seleccione al menos una actividad',
                                                color: 'error',
                                                onClose: () => setViewAlert({ ...viewAlert, open: false })
                                            });
                                        }
                                    }}
                                >
                                    Siguiente
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    :
                    <Fragment>

                        <Grid item xs={12} sx={{
                            maxHeight: '400px',
                            overflowY: 'scroll',
                            overflowX: 'hidden',
                            scrollbarWidth: 'thin', padding: '0 20px'
                        }}>
                            {
                                myActivitiesSelected.map((act, index: number) => (
                                    <Fragment key={index}>

                                        <Accordion expanded={expanded === act.id} onChange={() => handleChange(act.id)} sx={{
                                            backgroundColor: expanded !== act.id ? '#f78f15' : '#272936', marginBottom: '15px'
                                        }} className='accordion-activity'>
                                            <AccordionSummary
                                                expandIcon={
                                                    expanded === act.id ? <Remove sx={{
                                                        color: '#f78f15'
                                                    }} /> : <Add sx={{
                                                        color: '#272936'
                                                    }} />
                                                }
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                                sx={{
                                                    // Si es el panel abierto #272936 : #f78f15
                                                    backgroundColor: expanded !== act.id ? '#f78f15' : '#272936',
                                                    color: expanded !== act.id ? '#272936' : '#f78f15'
                                                }}
                                            >
                                                <Typography sx={{
                                                    width: {
                                                        xs: '50%', md: '20%'
                                                    }, flexShrink: 0, fontSize: {
                                                        xs: '11px', md: '14px'
                                                    }
                                                }}>
                                                    {act.actividad?.name}
                                                </Typography>
                                                {
                                                    expanded !== act.id ?
                                                        progressStatus(act) : null
                                                }
                                            </AccordionSummary>
                                            <AccordionDetails sx={{
                                                backgroundColor: expanded !== act.id ? '#f78f15' : '#272936',
                                            }}>
                                                <Grid container sx={{
                                                    maxHeight: '300px', overflowY: 'scroll', overflowX: 'hidden', scrollbarWidth: 'thin',
                                                    scrollbarColor: '#f78f15 #f6f6f6'
                                                }}>
                                                    {
                                                        act.otSubActividadesRelation?.map((sub, index: number) => (
                                                            <Grid item xs={12} mb={2}>
                                                                <Grid container>
                                                                    <Grid item xs={12}>
                                                                        <Grid container spacing={1}>
                                                                            <Grid item xs={2} sm={1} md={0.4}>
                                                                                <IconButton sx={{
                                                                                    color: '#272936', backgroundColor: '#fff', height: '30px', width: '30px', fontSize: '12px'
                                                                                }} size="small">
                                                                                    {index + 1}
                                                                                </IconButton>
                                                                            </Grid>
                                                                            <Grid item xs={10} sm={11} md={11.6} mb={4}>
                                                                                <span style={{
                                                                                    color: '#fff', fontSize: '12px', fontWeight: 'bold', marginLeft: '10px', textAlign: 'justify', display: 'block'
                                                                                }}>
                                                                                    {sub.subActividad?.description}
                                                                                </span>
                                                                            </Grid>
                                                                            <Grid item xs={12}>
                                                                                <Grid container>
                                                                                    <Grid item xs={6} md={2} sx={{
                                                                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                                                    }}>
                                                                                        <span style={{
                                                                                            color: '#fff', fontSize: '12px', fontWeight: 'bold', marginLeft: '10px', textAlign: 'justify', display: 'block'
                                                                                        }}>
                                                                                            HH: {sub.horas_hombre}
                                                                                        </span>
                                                                                    </Grid>
                                                                                    <Grid item xs={6} md={2} sx={{
                                                                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                                                    }}>
                                                                                        <span style={{
                                                                                            color: '#fff', fontSize: '12px', fontWeight: 'bold', marginLeft: '10px', textAlign: 'justify', display: 'block'
                                                                                        }}>
                                                                                            Varianza HH: {
                                                                                                // La varianza es la diferencia entre las horas_hombre y tiempo_real identificando si es positiva o negativa
                                                                                                // Si el tiempo_real es 0, la varianza es 0
                                                                                                Number(sub.tiempo_real) === 0 ? 0 : (
                                                                                                    sub.horas_hombre - sub.tiempo_real > 0 ?
                                                                                                        '-' + (sub.horas_hombre - sub.tiempo_real) : +(
                                                                                                            // Quitamos el signo negativo
                                                                                                            (sub.horas_hombre - sub.tiempo_real) * -1
                                                                                                        )
                                                                                                )
                                                                                            }
                                                                                        </span>
                                                                                    </Grid>
                                                                                    <Grid item xs={12} md={5} lg={3} sx={{
                                                                                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: {
                                                                                            xs: '15px', md: '0'
                                                                                        }
                                                                                    }}>
                                                                                        <TextField className="input-blank" sx={{
                                                                                            borderRadius: '0 !important', width: {
                                                                                                xs: '100% !important', sm: '200px !important', md: '200px !important'
                                                                                            }
                                                                                        }} onChange={(e) => {
                                                                                            setMyActivitiesSelected(myActivitiesSelected.map((item) => {
                                                                                                let value = parseInt(e.target.value);
                                                                                                if (isNaN(value)) { value = 0; }
                                                                                                if (item.id === act.id) {
                                                                                                    return {
                                                                                                        ...item,
                                                                                                        otSubActividadesRelation: item.otSubActividadesRelation?.map((subAct) => {
                                                                                                            if (subAct.id === sub.id) {
                                                                                                                return {
                                                                                                                    ...subAct,
                                                                                                                    tiempo_real: value
                                                                                                                }
                                                                                                            } else {
                                                                                                                return subAct;
                                                                                                            }
                                                                                                        })
                                                                                                    }
                                                                                                } else {
                                                                                                    return item;
                                                                                                }
                                                                                            }))
                                                                                        }} value={
                                                                                            // formatTpoReal(sub.tiempo_real) || 'Tpo Real: '
                                                                                            sub.tiempo_real
                                                                                        } placeholder='Tpo Real' 
                                                                                            InputProps={{
                                                                                                startAdornment: <span style={{
                                                                                                    // width: '200px',
                                                                                                    fontSize: '12px'
                                                                                                }}>
                                                                                                    Tpo Real:
                                                                                                </span>,
                                                                                                endAdornment: <span style={{
                                                                                                    // width: '200px',
                                                                                                    fontSize: '12px', textAlign: 'left'
                                                                                                }}>
                                                                                                    hrs
                                                                                                </span>,
                                                                                            }}
                                                                                        />
                                                                                    </Grid>
                                                                                    <Grid item xs={12} md={2} sx={{
                                                                                        display: 'flex', alignItems: 'center', justifyContent: {
                                                                                            xs: 'left', md: 'center'
                                                                                        }, marginTop: {
                                                                                            xs: '15px', md: '0'
                                                                                        }
                                                                                    }}>
                                                                                        <FormControlLabel control={<Checkbox
                                                                                            sx={{
                                                                                                color: '#ffac1e',
                                                                                                '&.Mui-checked': {
                                                                                                    color: '#ffac1e',
                                                                                                },
                                                                                            }}
                                                                                            value={sub.finished}
                                                                                            onChange={() => {
                                                                                                checkSubActMutator.mutate({
                                                                                                    id: sub.id, tiempo_real: sub.tiempo_real
                                                                                                });
                                                                                            }}
                                                                                            checked={sub.finished}
                                                                                        />} label={
                                                                                            <Typography fontWeight={'bold'} color='white' fontSize={14}>
                                                                                                Finalizada
                                                                                            </Typography>
                                                                                        } />
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Divider sx={{
                                                                    backgroundColor: '#fff', margin: '0 auto', marginTop: '20px', marginBottom: '10px', width: '95%',
                                                                }} />
                                                            </Grid>
                                                        ))
                                                    }
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>

                                    </Fragment>
                                ))
                            }
                        </Grid>

                    </Fragment>
            }

        </Fragment>
    )
}