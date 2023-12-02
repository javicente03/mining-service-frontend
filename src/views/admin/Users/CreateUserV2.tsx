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

export const CreateUserV2 = () => {

    const [data, setData] = useState<Models.FormCreateUserAdmin>({
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

            <Grid container border={'2px solid #f78f15'} style={{ borderRadius: '10px', padding: '10px 40px' }}>
                <Grid item xs={12} p={2}>
                    <Button variant='contained' sx={{
                        backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                        textTransform: 'capitalize',
                        ":disabled": { backgroundColor: '#272936', color: '#fff' },
                    }} disabled={true}>
                        Administrador de Perfiles
                    </Button>
                </Grid>

                <Grid item xs={12} sx={{
                    textAlign: 'center', backgroundColor: '#ffac1e', color: '#272936', fontWeight: 'bold',
                    border: '1px solid #272936', borderRadius: '10px', borderBottom: 'none', padding: '10px',
                    borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px'
                }}>
                    Agregar Nuevo
                </Grid>
                <Grid item xs={12} sx={{
                    backgroundColor: '#272936', color: '#fff', padding: '10px', borderRadius: '10px', borderTop: 'none',
                    borderTopLeftRadius: '0px', borderTopRightRadius: '0px'
                }}>
                    <Grid container justifyContent={'space-evenly'}>
                        <Grid item xs={12} md={4} mt={3}>
                            <FormGroup>
                                <InputLabel className="label-principal white" >Rol</InputLabel>
                                <Select
                                    className="input-text-principal select-input-text-principal"
                                    name='type_rol'
                                    sx={{ ":disabled": { backgroundColor: '#fff' }, color: 'white' }}
                                    value={data.role}
                                    onChange={(e) => { setData({ ...data, role: e.target.value as string }) }}
                                >
                                    <MenuItem value={'technical'}>Técnico</MenuItem>
                                    <MenuItem value={'admin'}>Administrador</MenuItem>
                                    <MenuItem value={'gestor'}>Supervisor</MenuItem>
                                    <MenuItem value={'user'}>Cliente</MenuItem>
                                </Select>
                            </FormGroup>
                        </Grid>

                        {
                            data.role === 'user' &&
                            <Grid item xs={12} md={4} mt={3}>
                                <FormGroup>
                                    <InputLabel className="label-principal white" >Razón Social</InputLabel>
                                    <Autocomplete
                                        style={{
                                            width: '100%',
                                        }}
                                        className="input-text-principal autocomplete-input white"
                                        disablePortal
                                        id="combo-box-demo"
                                        // @ts-ignore
                                        getOptionLabel={(option) => `${option[0]}`}
                                        options={companies_select.map((option) => [option.label, option.value])}
                                        freeSolo
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params}
                                        />}
                                        // No mostrar el icono de x
                                        clearIcon={null}
                                        value={data.companyId === 0 ? [companies_select[0]?.label, companies_select[0]?.value] : [companies_select.find((company) => company.value === data.companyId)?.label, data.companyId]}
                                        onChange={(event, value) => {
                                            // @ts-ignore
                                            if (value && !isNaN(value[1])) {

                                                setData({
                                                    ...data,
                                                    companyId: parseInt(value[1] as any),
                                                })
                                            }
                                        }}
                                    />
                                </FormGroup>
                            </Grid>
                        }

                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} md={4} mt={3}>
                            <FormGroup>
                                <InputLabel className="label-principal white" >Nombre</InputLabel>
                                <TextField
                                    className="input-text-principal white h-minus"
                                    variant="outlined"
                                    // size="small"
                                    fullWidth
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                />
                            </FormGroup>
                        </Grid>
                        {/* <Grid item xs={12}></Grid> */}
                        <Grid item xs={12} md={4} mt={3}>
                            <FormGroup>
                                <InputLabel className="label-principal white" >Apellido</InputLabel>
                                <TextField
                                    className="input-text-principal white h-minus"
                                    variant="outlined"
                                    // size="small"
                                    fullWidth
                                    value={data.lastname}
                                    onChange={(e) => setData({ ...data, lastname: e.target.value })}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} md={4} mt={3}>
                            <FormGroup>
                                <InputLabel className="label-principal white" >Rut</InputLabel>
                                <TextField
                                    className="input-text-principal white h-minus"
                                    variant="outlined"
                                    // size="small"
                                    fullWidth
                                    value={rut.formatted}
                                    onChange={(e) => updateRut(e.target.value)}
                                    error={!isValid}
                                />
                            </FormGroup>
                        </Grid>

                        {/* <Grid item xs={12}></Grid> */}
                        <Grid item xs={12} md={4} mt={3}>
                            <FormGroup>
                                <InputLabel className="label-principal white" >Email</InputLabel>
                                <TextField
                                    className="input-text-principal white h-minus"
                                    variant="outlined"
                                    // size="small"
                                    fullWidth
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} md={4} mt={3}>
                            <FormGroup>
                                <InputLabel className="label-principal white" >Teléfono</InputLabel>
                                <TextField
                                    className="input-text-principal white h-minus"
                                    variant="outlined"
                                    // size="small"
                                    fullWidth
                                    value={data.phone}
                                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                                />
                            </FormGroup>
                        </Grid>
                        {/* <Grid item xs={12}></Grid> */}
                        <Grid item xs={12} md={4} mt={3}>
                            <FormGroup>
                                <InputLabel className="label-principal white" >Contraseña</InputLabel>
                                <TextField
                                    className="input-text-principal white h-minus"
                                    variant="outlined"
                                    // size="small"
                                    fullWidth
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}></Grid>
                        {
                            data.role === 'user' &&
                            <Grid item xs={12} md={4} mt={3}>
                                <FormGroup>
                                    <InputLabel className="label-principal white" >Cargo</InputLabel>
                                    <TextField
                                        className="input-text-principal white h-minus"
                                        variant="outlined"
                                        // size="small"
                                        fullWidth
                                        value={data.cargo}
                                        onChange={(e) => setData({ ...data, cargo: e.target.value })}
                                    />
                                </FormGroup>
                            </Grid>
                        }
                        {/* <Grid item xs={12}></Grid> */}
                        <Grid item xs={12} md={4} mt={3}>
                            <FormGroup>
                                <InputLabel className="label-principal white" sx={{ textAlign: 'center' }} >Foto</InputLabel>
                                <input type={'file'} style={{
                                    display: 'none'
                                }} id="fileImg" onChange={UploadImage}
                                    accept="image/png, image/jpeg"
                                />
                                {
                                    !data.thumbnail || data.thumbnail === '' ?
                                        <InputLabel className="label-principal white" sx={{ height: '80px', width: '140px', backgroundColor: '#ffac1e', margin: '0 auto', borderRadius: '10px', position: 'relative' }}
                                            htmlFor="fileImg"
                                        >
                                            <InputLabel sx={{
                                                backgroundColor: '#272936', color: '#fff',
                                                width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                position: 'absolute', top: '-15px', right: '0',
                                                "&:hover": {
                                                    backgroundColor: '#272936',
                                                    color: '#fff'
                                                }
                                            }} size="small" htmlFor="fileImg">
                                                <Add />
                                            </InputLabel>
                                        </InputLabel>
                                        :
                                        <InputLabel className="label-principal white" sx={{ height: '80px', width: '140px', backgroundColor: '#ffac1e', margin: '0 auto', borderRadius: '10px', position: 'relative' }}
                                            htmlFor="fileImg"
                                        >
                                            <img src={`data:${data.thumbnail_format};base64,${data.thumbnail}`} alt="img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <IconButton sx={{
                                                backgroundColor: '#272936', color: '#fff', cursor: 'pointer',
                                                position: 'absolute', top: '0', right: '0',
                                                "&:hover": {
                                                    backgroundColor: '#272936',
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

                        <Grid item xs={12} sx={{
                            justifyContent: 'center', display: 'flex'
                        }}>
                            <Button variant="contained" sx={{
                                backgroundColor: '#ffac1e', color: '#fff', marginTop: '10px', display: 'block',
                                ":hover": { backgroundColor: '#ffac1e' }, fontWeight: 'bold',
                                width: '150px', borderRadius: '50px', textTransform: 'capitalize'
                            }} onClick={
                                () => { sendData() }
                            }
                                disabled={createUser.isLoading}
                            >
                                Agregar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

        </Fragment>
    )
}