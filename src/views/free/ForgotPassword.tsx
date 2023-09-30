import { Fragment, useEffect, useState } from "react";
import { Grid, Typography, Button, Container, AlertColor } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import './index.css'
import logo from '../../assets/img/logominigservicesweb.webp'
import mutatorRequest from "../../utils/mutatorRequest";
import { useRut } from "react-rut-formatter";
import { AuthLogin } from "../../utils/AuthService";
import { SnakbarAlert } from "../../components/snakbar/snakbarAlert";
import ModalSuccessGenerico from "../../components/modals/ModalSuccessGenerico";

export const ForgotPassword = () => {

    const { rut, isValid, updateRut } = useRut();

    const forgot_password = mutatorRequest('/auth/forgot-password', 'POST', {
        rut: rut.formatted,
    })

    const [ openDialogSuccess, setOpenDialogSuccess ] = useState(false);
    const [ emailUser, setEmailUser ] = useState('');

    useEffect(() => {
        if (forgot_password.isSuccess) {
            setEmailUser(forgot_password.data.data.email)
            setOpenDialogSuccess(true)
            updateRut('')
        }

        if (forgot_password.isError) {
            setViewAlert({
                ...viewAlert,
                open: true,
                // @ts-ignore
                message: forgot_password.error.response.data.error || 'Error al recuperar contraseña',
                color: 'error'
            });
        }
    }, [forgot_password.isSuccess, forgot_password.isError])

    const sendData = () => {
        if (forgot_password.isLoading) return;
        forgot_password.mutate();
    }

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

            <ModalSuccessGenerico openDialogSuccess={openDialogSuccess} setOpenDialogSuccess={setOpenDialogSuccess} title={'Recuperación de contraseña'} subtitle={`Se ha enviado un mensaje a tu correo electrónico "${emailUser}" para que puedas restablecer tu contraseña`} />

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
                                        <img src={logo} alt="logo" style={{ width: '100%', height: 'auto' }} />
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
                                        Recuperar Contraseña
                                    </Typography>

                                    <Grid container justifyContent={'center'}>
                                        <Grid item xs={12} md={8} p={
                                            {
                                                xs: '20px'
                                            }
                                        }>
                                            <input type="text" className="btn-login" placeholder='Usuario' onChange={
                                                (e) => { updateRut(e.target.value) }
                                            } name='rut' value={rut.formatted} onKeyPress={(e) => { e.key === 'Enter' && sendData() }}
                                            />
                                            
                                            <Button variant='contained' sx={{
                                                backgroundColor: '#111111', color: '#fff', marginTop: '10px', display: 'block',
                                                textTransform: 'capitalize',
                                                ":hover": { backgroundColor: '#111111' },
                                            }} onClick={() => sendData()}
                                                disabled={forgot_password.isLoading}
                                            >
                                                Recuperar Contraseña
                                            </Button>

                                            <Link to='/login' style={{ display: 'block', textDecoration: 'none', textAlign: 'center', width: '100%', margin: 'auto', marginTop: '20px' }}>
                                                <Typography sx={{ color: '#fff', fontSize: '10px' }}>
                                                    Iniciar sesión
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