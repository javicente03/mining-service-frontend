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

export const CreateUser = () => {

    const [ data, setData ] = useState<Models.FormCreateUserAdmin>({
        name: '',
        lastname: '',
        email: '',
        password: '',
        role: 'user',
        companyId: 0,
        cargo: '',
        phone: '',
        thumbnail: '',
        thumbnail_format: '',
    });

    const { isValid, rut, updateRut } = useRut(); 

    const companies = useQuery(['GetCompaniesAdmin'], () => GetCompaniesAdmin())

    const [companies_select, setCompanies_select] = useState<{
        label: string,
        value: number,
    }[]>([]);

    useEffect(() => {
        if (companies.data?.data) {
            setCompanies_select([])
            setCompanies_select((prev) => [...prev, {
                label: 'Todos',
                value: 0,
            }]);
            companies.data?.data.forEach((company) => {
                setCompanies_select((prev) => [...prev, {
                    label: `${company.razon_social}`,
                    value: company.id,
                }]);
            });
        }
    }, [companies.data?.data])

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
            setData({ ...data, thumbnail: imgClean, thumbnail_format: e.target.files[0].type })
        })
    }

    const [openDialogSuccess, setOpenDialogSuccess] = useState(false);

    const createUser = mutatorRequest('/admin/users/create', 'POST', {
        ...data,
        rut: rut.raw
    })

    useEffect(() => {
        if (createUser.isSuccess) {
            setData({
                name: '',
                lastname: '',
                email: '',
                password: '',
                role: 'user',
                companyId: 0,
                cargo: '',
                phone: '',
                thumbnail: '',
                thumbnail_format: '',
            })
            updateRut('');
            setOpenDialogSuccess(true)
        }

        if (createUser.isError) {
            // @ts-ignore
            setViewAlert({ ...viewAlert, open: true, message: createUser.error.response.data.error, color: 'error' });
        }
    }, [createUser.isSuccess, createUser.isError])

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

        createUser.mutate();

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
                title={'Usuario creado correctamente'} subtitle={'El usuario podrá iniciar sesión con las credenciales ingresadas'}
                returnTo={'/admin/users'}
            />
            
            <Grid container border={'2px solid #f78f15'} style={{ borderRadius: '10px', padding: '10px' }}>
                <Grid item xs={12} p={2}>
                    <Button variant='contained' sx={{
                        backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                        textTransform: 'capitalize',
                        ":disabled": { backgroundColor: '#272936', color: '#fff' },
                    }} disabled={true}>
                        Nuevo Usuario
                    </Button>
                </Grid>

                <Grid item xs={12} p={1}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormGroup>
                                        <InputLabel className="label-principal" >Rol</InputLabel>
                                        <Select
                                            className="input-text-principal select-input-text-principal"
                                            name='type_rol'
                                            sx={{ ":disabled": { backgroundColor: '#fff' }, color: 'white' }}
                                            value={data.role}
                                            onChange={ (e) => { setData({...data, role: e.target.value as string}) } }
                                        >
                                            <MenuItem value={'user'}>Usuario</MenuItem>
                                            <MenuItem value={'admin'}>Administrador</MenuItem>
                                            <MenuItem value={'gestor'}>Gestor</MenuItem>
                                        </Select>
                                    </FormGroup>
                                </Grid>

                                {
                                    data.role === 'user' &&
                                        <Grid item xs={12} sm={6} md={3}>
                                            <FormGroup>
                                            <InputLabel className="label-principal" >Razón Social</InputLabel>
                                            <Autocomplete
                                                style={{
                                                    width: '100%',
                                                }}
                                                className="input-text-principal autocomplete-input"
                                                disablePortal
                                                id="combo-box-demo"
                                                // @ts-ignore
                                                getOptionLabel={(option) => `${option[0]}`}
                                                options={companies_select.map((option) => [option.label, option.value])}
                                                freeSolo
                                                sx={{ width: 300 }}
                                                renderInput={(params) => <TextField {...params}
                                                // onChange={
                                                //     (e: any) => {
                                                //         console.log(e.target.value);
                                                //         setFiltersProd({
                                                //             search: e.target.value,
                                                //         });
                                                //     }
                                                // }
                                                // value={filtersProd.search}
                                                />}
                                                // No mostrar el icono de x
                                                clearIcon={null}
                                                value={data.companyId === 0 ? [companies_select[0]?.label, companies_select[0]?.value] : [companies_select.find((company) => company.value === data.companyId)?.label, data.companyId]}
                                                onChange={(event, value) => {
                                                    // @ts-ignore
                                                    if (value && !isNaN(value[1])) {

                                                        setData({...data,
                                                            companyId: parseInt(value[1] as any),
                                                        })
                                                    }
                                                }}
                                            />
                                            </FormGroup>
                                        </Grid>
                                }

                                <Grid item xs={12} sm={6} md={3}>
                                    <FormGroup>
                                        <InputLabel className="label-principal" >Nombre</InputLabel>
                                        <TextField
                                            className="input-text-principal"
                                            variant="outlined"
                                            // size="small"
                                            fullWidth
                                            value={data.name}
                                            onChange={(e) => setData({...data, name: e.target.value})}
                                        />
                                    </FormGroup>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <FormGroup>
                                        <InputLabel className="label-principal" >Apellido</InputLabel>
                                        <TextField
                                            className="input-text-principal"
                                            variant="outlined"
                                            // size="small"
                                            fullWidth
                                            value={data.lastname}
                                            onChange={(e) => setData({...data, lastname: e.target.value})}
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
                                        <InputLabel className="label-principal" >Email</InputLabel>
                                        <TextField
                                            className="input-text-principal"
                                            variant="outlined"
                                            // size="small"
                                            fullWidth
                                            value={data.email}
                                            onChange={(e) => setData({...data, email: e.target.value})}
                                        />
                                    </FormGroup>
                                </Grid>

                                {
                                    data.role === 'user' &&
                                        <Grid item xs={12} sm={6} md={3}>
                                            <FormGroup>
                                                <InputLabel className="label-principal" >Cargo</InputLabel>
                                                <TextField
                                                    className="input-text-principal"
                                                    variant="outlined"
                                                    // size="small"
                                                    fullWidth
                                                    value={data.cargo}
                                                    onChange={(e) => setData({...data, cargo: e.target.value})}
                                                />
                                            </FormGroup>
                                        </Grid>
                                }

                                <Grid item xs={12} sm={6} md={3}>
                                    <FormGroup>
                                        <InputLabel className="label-principal" >Teléfono</InputLabel>
                                        <TextField
                                            className="input-text-principal"
                                            variant="outlined"
                                            // size="small"
                                            fullWidth
                                            value={data.phone}
                                            onChange={(e) => setData({...data, phone: e.target.value})}
                                        />
                                    </FormGroup>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <FormGroup>
                                        <InputLabel className="label-principal" >Contraseña</InputLabel>
                                        <TextField
                                            className="input-text-principal"
                                            variant="outlined"
                                            // size="small"
                                            fullWidth
                                            value={data.password}
                                            onChange={(e) => setData({...data, password: e.target.value})}
                                        />
                                    </FormGroup>
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <FormGroup>
                                        <InputLabel className="label-principal" sx={{ textAlign: 'center' }} >Foto</InputLabel>
                                        <input type={'file'} style={{
                                            display: 'none'
                                        }} id="fileImg" onChange={UploadImage} 
                                            accept="image/png, image/jpeg"
                                        />
                                        {
                                            !data.thumbnail || data.thumbnail === '' ?
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
                                            <img src={`data:${data.thumbnail_format};base64,${data.thumbnail}`} alt="img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <IconButton sx={{
                                                backgroundColor: '#ffac1e', color: '#fff', cursor: 'pointer',
                                                position: 'absolute', top: '0', right: '0',
                                                "&:hover": {
                                                    backgroundColor: '#ffac1e',
                                                    color: '#fff'
                                                }
                                            }} size="small" onClick={() => setData({ ...data, thumbnail: '', thumbnail_format: '' })}
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
                                        disabled={createUser.isLoading}
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