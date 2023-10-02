import { Fragment, useEffect, useState } from "react";
import { Grid, Typography, Button, Container, AlertColor } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import './index.css'
import logo from '../../assets/img/logominigservicesweb.png'
import mutatorRequest from "../../utils/mutatorRequest";
import { useRut } from "react-rut-formatter";
import { AuthLogin } from "../../utils/AuthService";
import { SnakbarAlert } from "../../components/snakbar/snakbarAlert";
import ModalSuccessGenerico from "../../components/modals/ModalSuccessGenerico";

export const ResetPassword = () => {

    const { token } = useParams<{ token: string }>();
    const [ data, setData] = useState({
        new_password: '',
        confirm_password: ''
    });

    const reset_password = mutatorRequest('/auth/reset-password', 'POST', {
        new_password: data.new_password,
        token: token
    })

    const handleInputChange = (event: any) => {
        setData({ ...data, [event.target.name]: event.target.value })
    };

    const [ openDialogSuccess, setOpenDialogSuccess ] = useState(false);

    const sendData = () => {
        if (reset_password.isLoading) return;
        
        if (data.new_password.trim() === '' || data.confirm_password.trim() === '') {
            setViewAlert({
                ...viewAlert,
                open: true,
                message: 'Debe ingresar la nueva contraseña',
                color: 'error'
            });
            return
        }

        if (data.new_password.length < 6) {
            setViewAlert({
                ...viewAlert,
                open: true,
                message: 'La contraseña debe tener al menos 6 caracteres',
                color: 'error'
            });
            return
        }

        if (data.new_password !== data.confirm_password) {
            setViewAlert({
                ...viewAlert,
                open: true,
                message: 'Las contraseñas no coinciden',
                color: 'error'
            });
            return
        }

        reset_password.mutate();
    }

    useEffect(() => {
        if (reset_password.isSuccess) {
            setOpenDialogSuccess(true)
            setData({ new_password: '', confirm_password: '' })
        }

        if (reset_password.isError) {
            setViewAlert({
                ...viewAlert,
                open: true,
                // @ts-ignore
                message: reset_password.error.response.data.error || 'Error al recuperar contraseña',
                color: 'error'
            });
        }
    }, [reset_password.isSuccess, reset_password.isError])

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

            <ModalSuccessGenerico openDialogSuccess={openDialogSuccess} setOpenDialogSuccess={setOpenDialogSuccess} title={'Contraseña Reestablecida'} subtitle='Su contraseña ha sido reestablecida correctamente' />

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
                                        Reestablecer Contraseña
                                    </Typography>

                                    <Grid container justifyContent={'center'}>
                                        <Grid item xs={12} md={8} p={
                                            {
                                                xs: '20px'
                                            }
                                        }>
                                            <input type="password" className="btn-login" placeholder='Ingrese su nueva contraseña' onChange={handleInputChange}
                                            name='new_password' value={data.new_password} onKeyPress={(e) => { e.key === 'Enter' && sendData() } }
                                            />

                                            <input type="password" className="btn-login" placeholder='Confirme su nueva contraseña' onChange={handleInputChange}
                                            name='confirm_password' value={data.confirm_password} onKeyPress={(e) => { e.key === 'Enter' && sendData() } }
                                            />
                                            
                                            <Button variant='contained' sx={{
                                                backgroundColor: '#111111', color: '#fff', marginTop: '10px', display: 'block',
                                                textTransform: 'capitalize',
                                                ":hover": { backgroundColor: '#111111' },
                                            }} onClick={() => sendData()}
                                                disabled={reset_password.isLoading}
                                            >
                                                Reestablecer Contraseña
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