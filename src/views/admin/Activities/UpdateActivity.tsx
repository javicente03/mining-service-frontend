import { Add } from "@mui/icons-material";
import { AlertColor, Button, FormGroup, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalSuccessGenerico from "../../../components/modals/ModalSuccessGenerico";
import { SnakbarAlert } from "../../../components/snakbar/snakbarAlert";
import { GetActivityAdmin } from "../../../helpers/admin/activities";
import mutatorRequest from "../../../utils/mutatorRequest";

export const UpdateActivity = () => {

    const { id } = useParams<{ id: string }>();
    const activities = useQuery(['getActivities', id], async () => GetActivityAdmin(id));

    const [data, setData] = useState<{
        description: string,
        horas_hombre: number,
        id: number
    }[]>([{ description: '', horas_hombre: 0, id: 0 }]);

    useEffect(() => {
        if (activities.data?.data) {
            setData(activities.data?.data?.subActividades);
        }
    }, [activities.data]);

    const updateMutator = mutatorRequest('/admin/activities/update-subactivities/' + id, 'PUT', {
        subActividades: data
    })

    useEffect(() => {
        if (updateMutator.isSuccess) {
            setOpenDialogSuccess(true);
        }

        if (updateMutator.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: updateMutator.error?.response?.data?.error,
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [updateMutator.isSuccess, updateMutator.isError]);

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
                title='Actividad Creada' subtitle="La actividad se ha modificado correctamente" returnTo="/admin/activities"
            />

            <Grid container border={'2px solid #f78f15'} style={{ borderRadius: '10px', padding: '10px' }}>
                <Grid item xs={12} p={2}>
                    <Button variant='contained' sx={{
                        backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                        textTransform: 'capitalize',
                        ":disabled": { backgroundColor: '#272936', color: '#fff' },
                    }} disabled={true}>
                        Actividades Técnicas
                    </Button>
                </Grid>

                <Grid item xs={12} >
                    <Grid container>
                        <Grid item xs={12} textAlign='center' mt={4} mb={2}>
                            <Button variant='contained' sx={{
                                backgroundColor: 'transparent', color: '#f4ae33', border: '1px solid #272936',
                                textTransform: 'capitalize', fontWeight: 'bold',
                                ":disabled": { backgroundColor: 'transparent', color: '#f4ae33' },
                            }} disabled>
                                Editar Trabajo Técnico
                            </Button>
                        </Grid>

                        <Grid item xs={12} p={4} sx={{
                            overflow: 'scroll', height: '400px',
                            scrollbarWidth: 'thin', scrollbarColor: '#272936 #fff', overflowX: 'hidden'
                        }}>
                            <Grid container justifyContent='left'>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography sx={{
                                        color: '#272936', fontWeight: 'bold', fontSize: '1rem', textAlign: 'left'
                                    }}>
                                        Nombre de la actividad general
                                    </Typography>
                                    <FormGroup>
                                        <TextField
                                            className="input-text-principal"
                                            variant="outlined"
                                            // size="small"
                                            fullWidth
                                            // Solo lectura
                                            inputProps={{ readOnly: true }}
                                            value={activities.data?.data?.name}
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid xs={12} mt={3}>
                                    <Typography sx={{ color: '#272936', fontWeight: 'bold', fontSize: '1rem' }}>
                                        Sub Actividades
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justifyContent='left' spacing={1} mt={1}>

                                        {
                                            data.map((item, index) => (
                                                <Fragment>
                                                    <Grid item xs={12} sm={2} md={4} key={index}>
                                                        <FormGroup>
                                                            <InputLabel sx={{ color: '#272936', fontSize: '1rem' }}>
                                                                Nombre
                                                            </InputLabel>
                                                            <TextField
                                                                className="input-text-principal"
                                                                variant="outlined"
                                                                // size="small"
                                                                fullWidth
                                                                placeholder="Describe..."
                                                                value={item.description}
                                                                onChange={(e) => {
                                                                    setData(data.map((item, i) => {
                                                                        if (i === index) {
                                                                            return {
                                                                                ...item,
                                                                                description: e.target.value
                                                                            }
                                                                        }
                                                                        return item;
                                                                    }))
                                                                }}
                                                            />
                                                        </FormGroup>
                                                    </Grid>
                                                    <Grid item xs={12} sm={5} md={4} key={index}>
                                                        <FormGroup>
                                                            <InputLabel sx={{ color: '#272936', fontSize: '1rem' }}>
                                                                HH
                                                            </InputLabel>
                                                            <TextField
                                                                className="input-text-principal"
                                                                variant="outlined"
                                                                // size="small"
                                                                fullWidth
                                                                placeholder="Describe..."
                                                                value={item.horas_hombre}
                                                                // type='number'
                                                                onChange={(e) => {
                                                                    setData(data.map((item, i) => {
                                                                        if (i === index) {
                                                                            return {
                                                                                ...item,
                                                                                horas_hombre: isNaN(Number(e.target.value)) ? 0 : Number(e.target.value) 
                                                                            }
                                                                        }
                                                                        return item;
                                                                    }))
                                                                }}
                                                            />
                                                        </FormGroup>
                                                    </Grid>
                                                    <Grid item xs={12} sm={2} md={4} key={index} sx={{
                                                        // Centrar verticalmente y alinear a la izquierda
                                                        display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '10px'
                                                    }}>

                                                        <Button variant='contained' sx={{
                                                            backgroundColor: '#f10409', color: '#fff', textTransform: 'capitalize',
                                                            ":hover": { backgroundColor: '#f10409', color: '#fff' }, borderRadius: '30px'
                                                        }}
                                                            onClick={() => {
                                                                setData(data.filter((item, i) => i !== index));
                                                            }}
                                                        >
                                                            Eliminar
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={12}></Grid>
                                                </Fragment>
                                            ))
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} mt={3}>
                                    <Grid container justifyContent='space-between'>
                                        <Grid item xs={12} sm={5} md={4}>
                                            <FormGroup>
                                                <Button variant='contained' sx={{
                                                    backgroundColor: '#272936', color: '#fff', textTransform: 'capitalize',
                                                    ":hover": { backgroundColor: '#272936', color: '#fff' },
                                                }}
                                                    onClick={() => {
                                                        setData([...data, { description: '', horas_hombre: 0, id: 0 }]);
                                                    }}
                                                >
                                                    Añadir Sub Actividad
                                                    <Add />
                                                </Button>
                                            </FormGroup>
                                        </Grid>
                                        <Grid item xs={12} sm={5} md={3}>
                                            <FormGroup>
                                                <Button variant='contained' sx={{
                                                    backgroundColor: '#272936', color: '#fff', textTransform: 'capitalize',
                                                    ":hover": { backgroundColor: '#272936', color: '#fff' }, borderRadius: '30px'
                                                }}
                                                    onClick={() => {
                                                        updateMutator.mutate();
                                                    }}
                                                >
                                                    Agregar
                                                </Button>
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Fragment>
    )
};