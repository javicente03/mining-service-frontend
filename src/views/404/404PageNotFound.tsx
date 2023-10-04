import { Fragment } from "react"
import { Container, Grid, Typography, Button } from "@mui/material"
import logo from '../../assets/img/logominigservicesweb.png'
import { useNavigate } from "react-router-dom"

export const PageNotFound = () => {

    const navigateTo = useNavigate()

    return (
        <Fragment>

            <div style={{
                background: 'linear-gradient(45deg, rgba(39,41,54,1) 0%, rgba(51,53,64,1) 66%)',
            }}>
                

                <Container>
                    <Grid container justifyContent={'center'} sx={{
                        height: '100vh', display: 'flex', alignItems: {
                            xs: 'initial', md: 'center'
                        }, justifyContent: {
                            xs: 'initial', md: 'center'
                        }, paddingTop: {
                            xs: '40px', md: '0'
                        }
                    }}>
                        <Grid item xs={12} md={9}>
                            <Grid container sx={{
                                borderRadius: '20px',
                                boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 3px 0px',
                            }}>
                                <Grid item xs={12} md={6} className='bg-img-login-1' style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }} borderRadius={{
                                xs: '20px 20px 0px 0px', md: '20px 0px 0px 20px' 
                                }} padding={{
                                    xs: '20px 0', md: '0'
                                }}>
                                    <div style={{
                                        backgroundColor: '#ffad1d', width: '70%', textAlign: 'center', padding: '10px',
                                    }}>
                                        <img src={logo} alt="logo" style={{ width: '70%', height: 'auto' }} />
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6} textAlign='center' className="bg-img-login-2" borderRadius={{
                                    xs: '0px 0px 20px 20px', md: '0px 20px 20px 0px'
                                }} padding={{
                                    // padding: 100px 0px 100px 0px;
                                    xs: '10px 0 0 0', md: '100px 0'
                                }}>
                                    <Typography sx={{
                                        color: '#fff',
                                        fontSize: '18px',
                                    }}>
                                        ¡Página no encontrada!
                                    </Typography>

                                    <Typography sx={{
                                        color: '#fff',
                                        fontSize: '10px', lineHeight: '2',
                                    }}>
                                        Lo sentimos, la página que buscas no existe o aún no está disponible.
                                    </Typography>

                                    <Grid container justifyContent={'center'}>
                                        <Grid item xs={12} md={8} p={
                                            {
                                                xs: '20px'
                                            }
                                        }>  
                                            
                                            <Button variant='contained' sx={{
                                                backgroundColor: '#111111', color: '#fff', margin: '0 auto', marginTop: '10px', display: 'block',
                                                textTransform: 'capitalize',
                                                ":hover": { backgroundColor: '#111111' },
                                            }} onClick={() => navigateTo('/')}
                                            >
                                                Volver
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Typography sx={{
                        color: '#de8b29', position: 'absolute', transform: 'translateX(-50%)',
                        fontSize: '10px', textAlign: 'center',
                    }} bottom={{
                        xs: '0px', md: '20px'
                    }} left={{ xs: '50%' }} width={{ xs: '100%', md: 'auto' }}>
                        Copyrigth © 2023 Todos los derechos reservados
                    </Typography>
                </Container>

            </div>

        </Fragment>
    )
}