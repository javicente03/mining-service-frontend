import { Fragment } from "react";
import { Grid, Typography } from "@mui/material";
import otsej1 from '../../assets/img/otsdash1.png';
import otsej2 from '../../assets/img/otsdash2.png';
import otsej3 from '../../assets/img/otsdash3.png';
import { SizeHook } from "../../utils/SizeHook";

export const HomeAdmin = () => {
    
    const size = SizeHook();

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3} height={'200px'} style={{
                    display: 'flex', flexWrap: 'wrap', borderRadius: '10px', backgroundColor: 'transparent'
                }}>
                    <Grid container height={'100%'} style={{borderRadius: '10px', backgroundColor: '#fff',
                        boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 3px 0px'}}>
                        <Grid item xs={12} style={{backgroundColor: '#b0db43', height: '30%', padding: '10px', width: '100%',
                            borderRadius: '10px 10px 0px 0px',
                            // verticalmente en el centro pero horizontalmente a la izquierda
                            display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                            <Typography fontSize={'14px'}>
                                OTs Completados
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ backgroundColor: '#fff', height: '70%', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                            borderRadius: '0px 0px 10px 10px'}}>
                            <Typography fontSize={'32px'}> 18 </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={3} height={'200px'} style={{
                    display: 'flex', flexWrap: 'wrap', borderRadius: '10px', backgroundColor: 'transparent'
                }}>
                    <Grid container height={'100%'} style={{borderRadius: '10px', backgroundColor: '#fff',
                        boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 3px 0px'}}>
                        <Grid item xs={12} style={{backgroundColor: '#fece00', height: '30%', padding: '10px', width: '100%',
                            borderRadius: '10px 10px 0px 0px',
                            // verticalmente en el centro pero horizontalmente a la izquierda
                            display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                            <Typography fontSize={'14px'}>
                                OTs Pendientes por Aprobar
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ backgroundColor: '#fff', height: '70%', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                            borderRadius: '0px 0px 10px 10px'}}>
                            <Typography fontSize={'32px'}> 18 </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={3} height={'200px'} style={{
                    display: 'flex', flexWrap: 'wrap', borderRadius: '10px', backgroundColor: 'transparent'
                }}>
                    <Grid container height={'100%'} style={{borderRadius: '10px', backgroundColor: '#fff',
                        boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 3px 0px'}}>
                        <Grid item xs={12} style={{backgroundColor: '#fe0000', height: '30%', padding: '10px', width: '100%',
                            borderRadius: '10px 10px 0px 0px',
                            // verticalmente en el centro pero horizontalmente a la izquierda
                            display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                            <Typography fontSize={'14px'} style={{color: '#fff'}}>
                                Solicitudes rechazadas
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ backgroundColor: '#fff', height: '70%', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                            borderRadius: '0px 0px 10px 10px'}}>
                            <Typography fontSize={'32px'}> 18 </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={3} height={'200px'} style={{
                    display: 'flex', flexWrap: 'wrap', borderRadius: '10px', backgroundColor: 'transparent'
                }}>
                    <Grid container height={'100%'} style={{borderRadius: '10px', backgroundColor: '#fff',
                        boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 3px 0px'}}>
                        <Grid item xs={12} style={{backgroundColor: '#272936', height: '30%', padding: '10px', width: '100%',
                            borderRadius: '10px 10px 0px 0px',
                            // verticalmente en el centro pero horizontalmente a la izquierda
                            display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                            <Typography fontSize={'14px'} style={{color: '#fff'}}>
                                OTs Finalizadas
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ backgroundColor: '#fff', height: '70%', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                            borderRadius: '0px 0px 10px 10px'}}>
                            <Typography fontSize={'32px'}> 18 </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {/* <Grid item xs={12} style={{
                    boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 3px 0px', borderRadius: '10px', backgroundColor: '#fff', paddingBottom: '40px'
                }} mt={4}>
                    <Typography fontSize={'14px'} style={{color: '#369fe8', fontSize: '16px'}}>
                        Estado de OT
                    </Typography>
                    <Grid container justifyContent={'center'}>
                        <Grid item xs={12} md={9} >
                            <Grid container>
                                <Grid item xs={12} md={4}>
                                    <img src={otsej1} alt={'otsej1'} width={'100%'} style={{
                                        height: size.width < 600 ? '350px' : size.width < 900 ? '450px' : '100%',
                                        objectFit: 'contain'
                                    }} />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <img src={otsej2} alt={'otsej2'} width={'100%'} style={{
                                        height: size.width < 600 ? '350px' : size.width < 900 ? '450px' : '100%',
                                        objectFit: 'contain'
                                    }} />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <img src={otsej3} alt={'otsej3'} width={'100%'} style={{
                                        height: size.width < 600 ? '350px' : size.width < 900 ? '450px' : '100%',
                                        objectFit: 'contain'
                                    }} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> */}
            
            </Grid>
        </Fragment>
    )
}