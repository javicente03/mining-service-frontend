import { Add, Close } from "@mui/icons-material"
import { AlertColor, Button, FormGroup, Grid, IconButton, InputLabel, TextField, Typography } from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import ModalSuccessGenerico from "../../../components/modals/ModalSuccessGenerico"
import { SnakbarAlert } from "../../../components/snakbar/snakbarAlert"
import mutatorRequest from "../../../utils/mutatorRequest"
import EncodeBase64 from "../../../utils/UploadImage"

export const CreateInsumo = () => {

    const [data, setData] = useState<Models.InsumoFormModel>({
        title: '',
        description: '',
        format_image: '',
        image: '',
        marca: '',
        modelo: '',
        stock: 0,
        nro_componente: 0,
        year: 0,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(event.target.value);
        if (isNaN(value)) { value = 0; }
        setData({ ...data, [event.target.name]: value });
    };

    const createMutator = mutatorRequest('/admin/insumos/create', 'POST', data);

    useEffect(() => {
        if (createMutator.isSuccess) {
            setOpenDialogSuccess(true);
            setData({ ...data, title: '', description: '', format_image: '', image: '', marca: '', modelo: '', stock: 0, nro_componente: 0, year: 0 });
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
            setData({ ...data, image: imgClean, format_image: e.target.files[0].type })
        })
    }

    const [openDialogSuccess, setOpenDialogSuccess] = useState(false);
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
                title='Insumo Creado' subtitle="El insumo se ha creado correctamente" returnTo="/admin/insumos"
            />

            <Grid container border={'2px solid #f78f15'} style={{ borderRadius: '10px', padding: '10px' }}>
                <Grid item xs={12} p={2}>
                    <Button variant='contained' sx={{
                        backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                        textTransform: 'capitalize',
                        ":disabled": { backgroundColor: '#272936', color: '#fff' },
                    }} disabled={true}>
                        Insumos
                    </Button>
                </Grid>

                <Grid item xs={12} >
                    <Grid container p={{
                        xs: 2, md: 4
                    }} spacing={2}>
                        <Grid item xs={12} textAlign='center' mt={1} mb={2}>
                            <Button variant='contained' sx={{
                                backgroundColor: 'transparent', color: '#f4ae33', border: '1px solid #272936',
                                textTransform: 'capitalize', fontWeight: 'bold',
                                ":disabled": { backgroundColor: 'transparent', color: '#f4ae33' },
                            }} disabled>
                                Agregar Nuevo Insumo
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography sx={{
                                color: '#272936', fontWeight: 'bold', fontSize: '1rem', textAlign: 'left'
                            }}>
                                Título
                            </Typography>
                            <FormGroup>
                                <TextField
                                    className="input-text-principal"
                                    variant="outlined"
                                    // size="small"
                                    fullWidth
                                    value={data.title}
                                    onChange={handleChange}
                                    name="title"
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography sx={{
                                color: '#272936', fontWeight: 'bold', fontSize: '1rem', textAlign: 'left'
                            }}>
                                Marca
                            </Typography>
                            <FormGroup>
                                <TextField
                                    className="input-text-principal"
                                    variant="outlined"
                                    // size="small"
                                    fullWidth
                                    value={data.marca}
                                    onChange={handleChange}
                                    name="marca"
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography sx={{
                                color: '#272936', fontWeight: 'bold', fontSize: '1rem', textAlign: 'left'
                            }}>
                                Modelo
                            </Typography>
                            <FormGroup>
                                <TextField
                                    className="input-text-principal"
                                    variant="outlined"
                                    // size="small"
                                    fullWidth
                                    value={data.modelo}
                                    onChange={handleChange}
                                    name="modelo"
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography sx={{
                                color: '#272936', fontWeight: 'bold', fontSize: '1rem', textAlign: 'left'
                            }}>
                                Cantidad Disponible
                            </Typography>
                            <FormGroup>
                                <TextField
                                    className="input-text-principal"
                                    variant="outlined"
                                    // size="small"
                                    fullWidth
                                    value={data.stock}
                                    onChange={handleChangeNumber}
                                    name="stock"
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography sx={{
                                color: '#272936', fontWeight: 'bold', fontSize: '1rem', textAlign: 'left'
                            }}>
                                Nro. Componente
                            </Typography>
                            <FormGroup>
                                <TextField
                                    className="input-text-principal"
                                    variant="outlined"
                                    // size="small"
                                    fullWidth
                                    value={data.nro_componente}
                                    onChange={handleChangeNumber}
                                    name="nro_componente"
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography sx={{
                                color: '#272936', fontWeight: 'bold', fontSize: '1rem', textAlign: 'left'
                            }}>
                                Año
                            </Typography>
                            <FormGroup>
                                <TextField
                                    className="input-text-principal"
                                    variant="outlined"
                                    // size="small"
                                    fullWidth
                                    value={data.year}
                                    onChange={handleChangeNumber}
                                    name="year"
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography sx={{
                                color: '#272936', fontWeight: 'bold', fontSize: '1rem', textAlign: 'left'
                            }}>
                                Descripción
                            </Typography>
                            <FormGroup>
                                <TextField
                                    className="input-text-principal"
                                    variant="outlined"
                                    multiline
                                    // size="small"
                                    fullWidth
                                    value={data.description}
                                    onChange={handleChange}
                                    name="description"
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <FormGroup>
                                <InputLabel className="label-principal white" sx={{ textAlign: 'center' }} >Foto</InputLabel>
                                <input type={'file'} style={{
                                    display: 'none'
                                }} id="fileImg" onChange={UploadImage}
                                    accept="image/png, image/jpeg"
                                />
                                {
                                    !data.image || data.image === '' ?
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
                                            <img src={`data:${data.format_image};base64,${data.image}`} alt="img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <IconButton sx={{
                                                backgroundColor: '#272936', color: '#fff', cursor: 'pointer',
                                                position: 'absolute', top: '0', right: '0',
                                                "&:hover": {
                                                    backgroundColor: '#272936',
                                                    color: '#fff'
                                                }
                                            }} size="small" onClick={() => setData({ ...data, image: '', format_image: '' })}
                                            >
                                                <Close />
                                            </IconButton>
                                        </InputLabel>
                                }
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} justifyContent='center' textAlign={'center'}>
                            {/* <FormGroup> */}
                                <Button variant='contained' sx={{
                                    backgroundColor: '#272936', color: '#fff', textTransform: 'capitalize',
                                    ":hover": { backgroundColor: '#272936', color: '#fff' }, borderRadius: '30px', width: '200px',
                                    ":disabled": { backgroundColor: 'gray', color: '#fff' },
                                }}
                                    onClick={() => {
                                        createMutator.mutate();
                                    }}
                                    disabled={createMutator.isLoading}
                                >
                                    Agregar
                                </Button>
                            {/* </FormGroup> */}
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Fragment>
    )
}