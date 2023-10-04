import { Add, Close } from "@mui/icons-material";
import { AlertColor, Autocomplete, Button, FormGroup, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react"
import { useRut } from "react-rut-formatter";
import ModalSuccessGenerico from "../../../components/modals/ModalSuccessGenerico";
import { SnakbarAlert } from "../../../components/snakbar/snakbarAlert";
import { GetCompaniesAdmin } from "../../../helpers/admin/companies";
import mutatorRequest from "../../../utils/mutatorRequest";
import EncodeBase64 from "../../../utils/UploadImage";

export const CreateCompany = () => {

    const [ data, setData ] = useState<Models.FormCreateCompanyAdmin>({
        razon_social: '',
        telefono: '',
        direccion: '',
        logo: '',
        logo_format: '',
    });

    const { isValid, rut, updateRut } = useRut();

    const UploadImage = (e: any) => {

        // El formato de la imagen debe ser png o jpg
        if (e.target.files[0].type !== 'image/png' && e.target.files[0].type !== 'image/jpeg') {
            setViewAlert({
                open: true,
                message: 'El formato de la imagen debe ser png o jpg',
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            })
            return;
        }

        // El tamaño de la imagen no debe ser mayor a 10MB
        if (e.target.files[0].size > 10000000) {
            setViewAlert({
                open: true,
                message: 'El tamaño de la imagen no debe ser mayor a 10MB',
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            })
            return;
        }

        EncodeBase64(e.target.files[0], (result: any) => {
            let imgClean = result.split(',')[1];
            setData({ ...data, logo: imgClean, logo_format: e.target.files[0].type })
        })
    }

    const [openDialogSuccess, setOpenDialogSuccess] = useState(false);

    const createCompany = mutatorRequest('/admin/companies/create', 'POST', {
        ...data,
        rut: rut.raw
    })

    useEffect(() => {
        if (createCompany.isSuccess) {
            setData({
                razon_social: '',
                telefono: '',
                direccion: '',
                logo: '',
                logo_format: '',
            })
            updateRut('');
            setOpenDialogSuccess(true)
        }

        if (createCompany.isError) {
            // @ts-ignore
            setViewAlert({ ...viewAlert, open: true, message: createCompany.error.response.data.error, color: 'error' });
        }
    }, [createCompany.isSuccess, createCompany.isError])

    const sendData = () => {
        if (!isValid) {
            setViewAlert({
                open: true,
                message: 'El rut ingresado no es válido',
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            })
            return;
        }

        createCompany.mutate();

    }

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
                title={'Empresa creada correctamente'} subtitle={'Ahora puedes crear usuarios para esta empresa'}
                returnTo='/admin/companies'
            />
            
            <Grid container border={'2px solid #f78f15'} style={{ borderRadius: '10px', padding: '10px' }}>
                <Grid item xs={12} p={2}>
                    <Button variant='contained' sx={{
                        backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                        textTransform: 'capitalize',
                        ":disabled": { backgroundColor: '#272936', color: '#fff' },
                    }} disabled={true}>
                        Nueva Empresa
                    </Button>
                </Grid>

                <Grid item xs={12} p={1}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={6} md={3}>
                                    <FormGroup>
                                        <InputLabel className="label-principal" >Razon Social</InputLabel>
                                        <TextField
                                            className="input-text-principal"
                                            variant="outlined"
                                            // size="small"
                                            fullWidth
                                            value={data.razon_social}
                                            onChange={(e) => setData({...data, razon_social: e.target.value})}
                                        />
                                    </FormGroup>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <FormGroup>
                                        <InputLabel className="label-principal" >Rut</InputLabel>
                                        <TextField
                                            className="input-text-principal"
                                            variant="outlined"
                                            // size="small"
                                            fullWidth
                                            value={rut.formatted}
                                            onChange={(e) => updateRut(e.target.value)}
                                            error={!isValid}
                                        />
                                    </FormGroup>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <FormGroup>
                                        <InputLabel className="label-principal" >Teléfono</InputLabel>
                                        <TextField
                                            className="input-text-principal"
                                            variant="outlined"
                                            // size="small"
                                            fullWidth
                                            value={data.telefono}
                                            onChange={(e) => setData({...data, telefono: e.target.value})}
                                        />
                                    </FormGroup>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <FormGroup>
                                        <InputLabel className="label-principal" >Dirección</InputLabel>
                                        <TextField
                                            className="input-text-principal"
                                            variant="outlined"
                                            // size="small"
                                            fullWidth
                                            value={data.direccion}
                                            onChange={(e) => setData({...data, direccion: e.target.value})}
                                        />
                                    </FormGroup>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <FormGroup>
                                        <InputLabel className="label-principal" sx={{ textAlign: 'center' }} >Logo</InputLabel>
                                        <input type={'file'} style={{
                                            display: 'none'
                                        }} id="fileImg" onChange={UploadImage} 
                                            accept="image/png, image/jpeg"
                                        />
                                        {
                                            !data.logo || data.logo === '' ?
                                        <InputLabel className="label-principal" sx={{ height: '80px', width: '140px', backgroundColor: '#272936', margin: '0 auto', borderRadius: '10px', position: 'relative' }}
                                            htmlFor="fileImg"
                                        >
                                            <InputLabel sx={{
                                                backgroundColor: '#ffac1e', color: '#fff',
                                                width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                position: 'absolute', top: '-15px', right: '0',
                                                "&:hover": {
                                                    backgroundColor: '#ffac1e',
                                                    color: '#fff'
                                                }
                                            }} size="small" htmlFor="fileImg">
                                                <Add />
                                            </InputLabel>
                                        </InputLabel>
                                            :
                                        <InputLabel className="label-principal" sx={{ height: '80px', width: '140px', backgroundColor: '#272936', margin: '0 auto', borderRadius: '10px', position: 'relative' }}
                                            htmlFor="fileImg"
                                        >
                                            <img src={`data:${data.logo_format};base64,${data.logo}`} alt="img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <IconButton sx={{
                                                backgroundColor: '#ffac1e', color: '#fff', cursor: 'pointer',
                                                position: 'absolute', top: '0', right: '0',
                                                "&:hover": {
                                                    backgroundColor: '#ffac1e',
                                                    color: '#fff'
                                                }
                                            }} size="small" onClick={() => setData({ ...data, logo: '', logo_format: '' })}
                                            >
                                                <Close />
                                            </IconButton>
                                        </InputLabel>
                                        }
                                    </FormGroup>
                                </Grid>

                                <Grid item xs={12} pl={1} sx={{
                                    justifyContent: {
                                        xs: 'center', md: 'left'
                                    }, display: 'flex'
                                }}>
                                    <Button variant="contained" sx={{
                                        backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                                        ":hover": { backgroundColor: '#272936' },
                                        width: '150px', borderRadius: '50px', textTransform: 'capitalize'
                                    }} onClick={
                                        () => { sendData() }
                                    }
                                        disabled={createCompany.isLoading}
                                    >
                                        Enviar
                                    </Button>
                                </Grid>


                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>    

            </Grid>

        </Fragment>
    )
}