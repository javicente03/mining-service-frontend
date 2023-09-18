import { Fragment, useEffect, useState } from "react";
import { Grid, Typography, Button, Container, AlertColor } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import './index.css'
import logo from '../../assets/img/logofake.png'
import mutatorRequest from "../../utils/mutatorRequest";
import { useRut } from "react-rut-formatter";
import { AuthLogin } from "../../utils/AuthService";
import { SnakbarAlert } from "../../components/snakbar/snakbarAlert";

export const Login = () => {

    const { rut, isValid, updateRut } = useRut();
    const [ data, setData ] = useState({
        rut: '',
        password: '',
    });

    const handleInputChange = (event: any) => {
        setData({ ...data, [event.target.name]: event.target.value })
    };

    const login = mutatorRequest('/admin/auth/login', 'POST', {
        rut: rut.formatted,
        password: data.password,
    })

    const navigateTo = useNavigate();
    useEffect(() => {
        if (login.isSuccess) {
            AuthLogin(login.data.data)
            navigateTo('/')
        }

        if (login.isError) {
            setViewAlert({
                ...viewAlert,
                open: true,
                // @ts-ignore
                message: login.error.response.data.error || 'Error al iniciar sesión',
                color: 'error'
            });
        }
    }, [login.isSuccess, login.isError])

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

            <div style={{
                background: 'linear-gradient(45deg, rgba(39,41,54,1) 0%, rgba(51,53,64,1) 66%)',
            }}>
                <Container>
                    <Grid container justifyContent={'center'} style={{
                        height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'
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
                                        <img src={logo} alt="logo" style={{ width: '40px', height: 'auto' }} />
                                        <Typography sx={{
                                            color: '#050000',
                                            fontSize: '1.5rem',
                                            textTransform: 'uppercase',
                                        }}>
                                            Mining Services Chile
                                        </Typography>
                                        <Typography style={{
                                            color: '#050000',
                                            fontSize: '12px',
                                            textTransform: 'uppercase',
                                            // separacion de letras
                                            letterSpacing: '0.2rem',
                                        }}>
                                            Servicios para la minería
                                        </Typography>
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
                                        ¡Bienvenido!
                                    </Typography>

                                    <Typography sx={{
                                        color: '#fff',
                                        fontSize: '10px', lineHeight: '2',
                                    }}>
                                        Repuestos <br /> Confianza y Compromiso
                                    </Typography>

                                    <Grid container justifyContent={'center'}>
                                        <Grid item xs={12} md={8} p={
                                            {
                                                xs: '20px'
                                            }
                                        }>
                                            <input type="text" className="btn-login" placeholder='Usuario' onChange={
                                                (e) => { updateRut(e.target.value) }
                                            } name='rut' value={rut.formatted} onKeyPress={(e) => { e.key === 'Enter' && login.mutate() } }
                                            />
                                            
                                            <input type="password" className="btn-login" placeholder='Contraseña' onChange={handleInputChange} name='password' value={data.password} 
                                            onKeyPress={(e) => { e.key === 'Enter' && login.mutate() } }
                                            />
                                            
                                            
                                            <Button variant='contained' sx={{
                                                backgroundColor: '#111111', color: '#fff', marginTop: '10px', display: 'block',
                                                textTransform: 'capitalize',
                                                ":hover": { backgroundColor: '#111111' },
                                            }} onClick={() => login.mutate()}
                                                disabled={login.isLoading}
                                            >
                                                Iniciar Sesión
                                            </Button>

                                            <Link to='/forgot-password' style={{ display: 'block', textDecoration: 'none', textAlign: 'center', width: '100%', margin: 'auto', marginTop: '20px' }}>
                                                <Typography sx={{ color: '#fff', fontSize: '10px' }}>
                                                    ¿Olvidaste tu contraseña?
                                                </Typography>
                                            </Link>
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
};