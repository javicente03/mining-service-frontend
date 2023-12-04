import { AlertColor, Button, Checkbox, FormControlLabel, FormGroup, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import ModalSuccessGenerico from "../../../../components/modals/ModalSuccessGenerico";
import { SnakbarAlert } from "../../../../components/snakbar/snakbarAlert";
import { GetExternalJobsAdmin } from "../../../../helpers/admin/externalJobs";
import mutatorRequest from "../../../../utils/mutatorRequest";

export default function TrabajosExternosAdminOt({
    ot
}: {
    ot: any
}) : JSX.Element {

    const { id } = useParams<{ id: string }>();
    const externalJobs = useQuery(['externalJobs', id], () => GetExternalJobsAdmin(id));

    const type_external_jobs = [
        {
            code: 'ac',
            name: 'AC',
            items: [
                { code: 'mangeras', name: 'Mangeras' },
                { code: 'vidrios', name: 'Vidrios' }
            ]
        },
        {
            name: 'Vidrios N°',
            code: 'vidrios',
            items: [
                { code: 'mangeras', name: 'Mangeras' },
                { code: 'vidrios', name: 'Vidrios' }
            ]
        },
        {
            name: 'Técnico N°',
            code: 'tecnico',
            items: [
                { code: 'mangeras', name: 'Mangeras' },
                { code: 'vidrios', name: 'Vidrios' }
            ]
        },
    ];

    const [ dataExternalJobs, setDataExternalJobs ] = useState<{
        type: string,
        code_type: string,
        items: {
            code: string,
            name: string,
            text: string,
        }[]
    }>({
        type: 'AC',
        code_type: 'ac',
        items: []
    });

    useEffect(() => {
        if (externalJobs.data?.data && externalJobs.data?.data?.length > 0) {
            setDataExternalJobs({
                code_type: externalJobs.data?.data[0]?.code_type|| '',
                type: externalJobs.data?.data[0]?.type || '',
                items: externalJobs.data?.data[0]?.items.map((item) => ({
                    code: item.code,
                    name: item.name,
                    text: item.text
                })) || []
            });
        }
    }, [externalJobs.data]);

    const handleChangeType = (e: any) => {
        if (externalJobs.data?.data?.find((item) => item.code_type === e.target.value)) {
            setDataExternalJobs({
                code_type: e.target.value,
                type: externalJobs.data?.data?.find((item) => item.code_type === e.target.value)?.type || '',
                items: externalJobs.data?.data?.find((item) => item.code_type === e.target.value)?.items.map((item) => ({
                    code: item.code,
                    name: item.name,
                    text: item.text
                })) || []
            });
        } else {
            setDataExternalJobs({
                code_type: e.target.value,
                type: type_external_jobs.find((item) => item.code === e.target.value)?.name || '',
                items: []
            });
        }
    }

    const postExternalJobs = mutatorRequest('/admin/trabajos_externos/save/'+id, 'POST', dataExternalJobs);

    useEffect(() => {
        if (postExternalJobs.isSuccess) {
            setTextModalSuccess('Trabajos Externos guardados correctamente');
            setOpenDialogSuccess(true);
            externalJobs.refetch();
        }

        if (postExternalJobs.isError) {
            setViewAlert({
                open: true,
                // @ts-ignore
                message: postExternalJobs.error?.response?.data?.error,
                color: 'error',
                onClose: () => setViewAlert({ ...viewAlert, open: false })
            });
        }
    }, [postExternalJobs.isSuccess, postExternalJobs.isError]);

    const [textModalSuccess, setTextModalSuccess] = useState('');

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
                title={textModalSuccess}
            />

            <Grid item xs={12} sm={10} md={7} bgcolor='#eff3f4' m='0 auto' p={2}>
                <Typography sx={{
                    color: '#272936', fontWeight: 'bold', fontSize: '1rem'
                }}>
                    Añadir Trabajo Externo
                </Typography>
                <Grid container mt={2} sx={{
                    height: '350px',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    scrollbarWidth: 'thin', padding: '0 10px'
                }}>
                    <Grid item xs={12}>
                        <FormGroup>
                            <Select
                                className="input-text-tertiary select-input-text-tertiary"
                                name='type_tertiary'
                                sx={{ ":disabled": { backgroundColor: '#fff' }, color: 'white' }}
                                value={dataExternalJobs.code_type}
                                onChange={handleChangeType}
                            >
                                <MenuItem value='null' disabled>
                                    Tipo de Trabajo Externo
                                </MenuItem>
                                {
                                    type_external_jobs.map((type, index) => (
                                        <MenuItem key={index} value={type.code}>
                                            {type.name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormGroup>
                    </Grid>

                    {
                        type_external_jobs.find(type => type.code === dataExternalJobs.code_type)?.items.map((item, index) => (
                            <Fragment>
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel labelPlacement="end" control={<Checkbox
                                                    sx={{
                                                        color: '#ffac1e',
                                                        '&.Mui-checked': {
                                                            color: '#ffac1e',
                                                        },
                                                    }}
                                                    checked={
                                                        // Si el item ya existe en el array de items, entonces se marca como checked
                                                        // Si no existe, entonces se marca como false
                                                        dataExternalJobs.items.find(i => i.code === item.code) ? true : false
                                                    }
                                                    onChange={(e) => {
                                                        if (dataExternalJobs.items.find(i => i.code === item.code)) {
                                                            // Si ya existe, eliminarlo del array
                                                            setDataExternalJobs({
                                                                ...dataExternalJobs,
                                                                items: dataExternalJobs.items.filter(i => i.code !== item.code)
                                                            });
                                                        } else {
                                                            // Si no existe, agregarlo al array
                                                            setDataExternalJobs({
                                                                ...dataExternalJobs,
                                                                items: [...dataExternalJobs.items, {
                                                                    code: item.code,
                                                                    name: item.name,
                                                                    text: ''
                                                                }]
                                                            });
                                                        }
                                                    }}
                                                />} label={item.name} />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <TextField className="input-text-principal" placeholder={'Maestranza'} fullWidth
                                                    disabled={
                                                        // Si el item ya existe en el array de items, entonces se marca como checked
                                                        // Si no existe, entonces se marca como false
                                                        dataExternalJobs.items.find(i => i.code === item.code) ? false : true
                                                    }
                                                    multiline
                                                    value={
                                                        // Si el item ya existe en el array de items, entonces se marca como checked
                                                        // Si no existe, entonces se marca como false
                                                        dataExternalJobs.items.find(i => i.code === item.code) ? dataExternalJobs.items.find(i => i.code === item.code)?.text : ''
                                                    }

                                                    onChange={(e) => {
                                                        // Solo si el item existe en el array, entonces se puede modificar el texto, de lo contrario no: return
                                                        if (!dataExternalJobs.items.find(i => i.code === item.code)) return;

                                                        // Si el item existe en el array, entonces se puede modificar el texto
                                                        setDataExternalJobs({
                                                            ...dataExternalJobs,
                                                            items: dataExternalJobs.items.map(i => {
                                                                if (i.code === item.code) {
                                                                    return {
                                                                        ...i,
                                                                        text: e.target.value
                                                                    }
                                                                } else {
                                                                    return i;
                                                                }
                                                            })
                                                        });
                                                    }}
                                                />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Fragment>
                        ))
                    }

                    <Grid item xs={12} mt={2}>
                        <Button fullWidth variant="contained" sx={{
                                backgroundColor: '#272936', color: '#fff',
                                textTransform: 'capitalize',
                                ":disabled": { backgroundColor: '#272936', color: '#fff' },
                                ":hover": { backgroundColor: '#272936', color: '#fff' },
                            }}
                            onClick={() => {
                                postExternalJobs.mutate();
                            }}
                                disabled={postExternalJobs.isLoading}
                            >
                            Aceptar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

        </Fragment>
    )
}