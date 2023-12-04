import { Button, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetOTByIdAdmin } from "../../../helpers/admin/ots";
import ActivitiesAdminOT from "./settingsScreen/ActivitiesAdminOTScreen";
import InsumosAdminOT from "./settingsScreen/InsumosAdminOTScreen";
import PresupuestosAddAdminOTScreen from "./settingsScreen/PresupuestosAddAdminOTScreen";
import TecnicosAdminOT from "./settingsScreen/TecnicosAdminOTScreen";
import TrabajosExternosAdminOt from "./settingsScreen/TrabajosExternosAdminOtScreen";

export const OTSettings = () => {

    const { id } = useParams<{ id: string }>();
    const ot = useQuery(['GetOTByIdAdmin', id], () => GetOTByIdAdmin(id));

    const [screen, setScreen] = useState<null | 'technical' | 'activities' | 'supplies' | 'externaljobs' | 'budget_add'>('technical');

    return (
        <Fragment>

            <Grid container border={'2px solid #f78f15'} style={{ borderRadius: '10px', padding: '10px' }}>
                <Grid item xs={12} p={2} sx={{
                    display: 'flex', flexWrap: 'wrap'
                }}>
                    <Button variant='contained' sx={{
                        backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                        textTransform: 'capitalize',
                        ":disabled": { backgroundColor: '#272936', color: '#fff' },
                    }} disabled={true}>
                        Orden de Trabajo: N° #{id}
                    </Button>

                    <Typography className="status-green" sx={{
                        border: '#cecece 1px solid', marginLeft: {
                            xs: '0', sm: '10px'
                        }, marginTop: '10px', display: {
                            xs: 'block', sm: 'inline-block'
                        }
                    }}>
                        Aprobada
                    </Typography>
                </Grid>

                {
                    !ot.data?.data?.isChild &&
                        <Grid item xs={12} mt={2} mb={2}>
                            <Link to={`/admin/ots/${id}/newbudget`} style={{
                                textDecoration: 'none'
                            }}>
                                <Button sx={{
                                    backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block', textTransform: 'capitalize',
                                    ":hover": { backgroundColor: '#272936', color: '#fff' },
                                }}>
                                    Generar Nuevo Presupuesto
                                </Button>
                            </Link>
                        </Grid>
                }

                <Grid item xs={12} md={3} lg={2} display={{
                    xs: 'none', md: 'block'
                }} >
                    <Button fullWidth className={screen === 'technical' ? "btn-tab-active" : "btn-tab-disabled"} onClick={() => setScreen('technical')}>
                        Asignación de Técnico
                    </Button>
                </Grid>
                <Grid item xs={12} md={3} lg={2} display={{
                    xs: 'none', md: 'block'
                }}>
                    <Button fullWidth className={screen === 'activities' ? "btn-tab-active" : "btn-tab-disabled"} onClick={() => setScreen('activities')}>
                        Listado de Actividades
                    </Button>
                </Grid>
                <Grid item xs={12} md={3} lg={2} display={{
                    xs: 'none', md: 'block'
                }}>
                    <Button fullWidth className={screen === 'supplies' ? "btn-tab-active" : "btn-tab-disabled"} onClick={() => setScreen('supplies')}>
                        Listado de Insumos
                    </Button>
                </Grid>
                <Grid item xs={12} md={3} lg={2} display={{
                    xs: 'none', md: 'block'
                }}>
                    <Button fullWidth className={screen === 'externaljobs' ? "btn-tab-active" : "btn-tab-disabled"} onClick={() => setScreen('externaljobs')}>
                        Trabajos Externos
                    </Button>
                </Grid>

                {
                    !ot.data?.data?.isChild &&
                        <Grid item xs={12} md={3} lg={2} display={{
                            xs: 'none', md: 'block'
                        }}>
                            <Button fullWidth className={screen === 'budget_add' ? "btn-tab-active" : "btn-tab-disabled"} onClick={() => setScreen('budget_add')}>
                                Presupuestos Adicionales
                            </Button>
                        </Grid>
                }

                <Grid item xs={12} mt={2}></Grid>
                <Grid item xs={12} display={{
                    xs: 'block', md: 'none'
                }} mb={2}>
                    <Button fullWidth className={screen === 'technical' ? "btn-tab-active" : "btn-tab-disabled"} onClick={() => {
                        screen === 'technical' ? setScreen(null) : setScreen('technical')
                    }}>
                        Asignación de Técnico
                    </Button>
                </Grid>

                {
                    screen === 'technical' &&
                        <TecnicosAdminOT ot={ot} />
                }

                <Grid item xs={12} display={{
                    xs: 'block', md: 'none'
                }} mb={2}>
                    <Button fullWidth className={screen === 'activities' ? "btn-tab-active" : "btn-tab-disabled"} onClick={() => {
                        screen === 'activities' ? setScreen(null) : setScreen('activities')
                    }}>
                        Listado de Actividades
                    </Button>
                </Grid>

                {
                    screen === 'activities' &&
                        <ActivitiesAdminOT ot={ot} />
                }

                <Grid item xs={12} display={{
                    xs: 'block', md: 'none'
                }} mb={2}>
                    <Button fullWidth className={screen === 'supplies' ? "btn-tab-active" : "btn-tab-disabled"} onClick={() => {
                        screen === 'supplies' ? setScreen(null) : setScreen('supplies')
                    }}>
                        Listado de Insumos
                    </Button>
                </Grid>

                {
                    screen === 'supplies' &&
                        <InsumosAdminOT ot={ot} />   
                }

                <Grid item xs={12} display={{
                    xs: 'block', md: 'none'
                }} mb={2}>
                    <Button fullWidth className={screen === 'externaljobs' ? "btn-tab-active" : "btn-tab-disabled"} onClick={() => {
                        screen === 'externaljobs' ? setScreen(null) : setScreen('externaljobs')
                    }}>
                        Trabajos Externos
                    </Button>
                </Grid>

                {
                    screen === 'externaljobs' &&
                        <TrabajosExternosAdminOt ot={ot} />
                }

                {
                    !ot.data?.data?.isChild &&
                        <Fragment>
                            <Grid item xs={12} display={{
                                xs: 'block', md: 'none'
                            }} mb={2}>
                                <Button fullWidth className={screen === 'budget_add' ? "btn-tab-active" : "btn-tab-disabled"} onClick={() => {
                                    screen === 'budget_add' ? setScreen(null) : setScreen('budget_add')
                                }}>
                                    Presupuestos Adicionales
                                </Button>
                            </Grid>

                            {
                                screen === 'budget_add' &&
                                    <PresupuestosAddAdminOTScreen ot={ot} />
                            }
                        </Fragment>
                }


            </Grid>

        </Fragment>
    );
};