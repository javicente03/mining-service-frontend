import { Add } from "@mui/icons-material";
import { AlertColor, Button, Dialog, DialogContent, DialogTitle, FormGroup, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import ModalSuccessGenerico from "../../../components/modals/ModalSuccessGenerico";
import { SnakbarAlert } from "../../../components/snakbar/snakbarAlert";
import mutatorRequest from "../../../utils/mutatorRequest";

export const CreateActivity = () => {

    const [data, setData] = useState<{
        name: string,
        subActividades: {
            description: string,
            horas_hombre: number,
        }[]
    }>({
        name: '', subActividades: [{ description: '', horas_hombre: 0 }]
    });

    const [scren, setScren] = useState<'general' | 'sub'>('general');

    const NextScreen = () => {
        if (data.name === '') {
            setViewAlert({
                open: true,
                message: 'El nombre de la actividad general es obligatorio',
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
            return;
        }
        setScren('sub');
    };

    const createMutator = mutatorRequest('/admin/activities/create-activity', 'POST', data)

    useEffect(() => {
        if (createMutator.isSuccess) {
            setOpenDialogSuccess(true);
        }
        
        if (createMutator.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: createMutator.error?.response?.data?.error,
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [createMutator.isSuccess, createMutator.isError]);

    const [ openDialogSuccess, setOpenDialogSuccess ] = useState(false);
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
                title='Actividad Creada' subtitle="La actividad se ha creado correctamente" returnTo="/admin/activities"
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
                                Agregar Trabajo Técnico
                            </Button>
                        </Grid>

                        {
                            scren === 'general' &&
                            <Fragment>
                                <Grid item xs={12}>
                                    <Grid container spacing={2} justifyContent='center'>
                                        <Grid item xs={12}>
                                            <Typography sx={{
                                                color: '#272936', fontWeight: 'bold', fontSize: '1rem', textAlign: 'center'
                                            }}>
                                                Nombre de la actividad general
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <FormGroup>
                                                <TextField
                                                    className="input-text-principal"
                                                    variant="outlined"
                                                    // size="small"
                                                    fullWidth
                                                    placeholder="Escribe el nombre de la actividad general"
                                                    value={data.name}
                                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            NextScreen();
                                                        }
                                                    }}
                                                />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} textAlign='center' mt={2}>
                                    <Button variant='contained' sx={{
                                        backgroundColor: '#272936', color: '#fff', textTransform: 'capitalize',
                                        ":hover": { backgroundColor: '#272936', color: '#fff' },
                                    }} onClick={() => NextScreen()}>
                                        Siguiente
                                    </Button>
                                </Grid>
                            </Fragment>
                        }

                        {
                            scren === 'sub' &&
                            <Fragment>
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
                                                    value={data.name}
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
                                                    data.subActividades.map((item, index) => (
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
                                                                            const newData = data.subActividades;
                                                                            newData[index].description = e.target.value;
                                                                            setData({ ...data, subActividades: newData });
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
                                                                        onChange={(e) => {
                                                                            const newData = data.subActividades;
                                                                            newData[index].horas_hombre = Number(e.target.value);
                                                                            if (isNaN(newData[index].horas_hombre)) {
                                                                                newData[index].horas_hombre = 0;
                                                                            }
                                                                            setData({ ...data, subActividades: newData });
                                                                        }}
                                                                        // type='number'
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
                                                                        const newData = data.subActividades;
                                                                        newData.splice(index, 1);
                                                                        setData({ ...data, subActividades: newData });
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
                                                                const newData = data.subActividades;
                                                                newData.push({ description: '', horas_hombre: 0 });
                                                                setData({ ...data, subActividades: newData });
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
                                                                createMutator.mutate();
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
                            </Fragment>
                        }
                    </Grid>
                </Grid>

            </Grid>

        </Fragment>
    )
};