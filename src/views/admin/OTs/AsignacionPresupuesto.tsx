import { Fragment, useState } from "react"
import { Grid, Button, Typography, Checkbox, FormControlLabel, FormGroup, FormControl, InputLabel, TextField, MenuItem, Select } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { GetOTByIdAdmin } from "../../../helpers/admin/ots"
import { useParams } from "react-router-dom"

export const AsignacionPresupuesto = () => {

    const { id } = useParams<{ id: string }>()
    const request = useQuery(['GetOTByIdAdmin', id], () => GetOTByIdAdmin(id));

    const [ data, setData ] = useState<Models.FormPresupuestoAsignacion>({
        fecha: '',
        status:'approved',
    })

    const formatStatus = (status: string) => {
        let ret: string | JSX.Element = '';
        switch (status) {
            case 'pending':
                ret = <Typography className="status-blue" sx={{
                    border: '#cecece 1px solid', marginLeft: {
                        xs: '0', sm: '10px'
                    }, marginTop: '10px', display: {
                        xs: 'block', sm: 'inline-block'
                    }
                }}>
                    Pendiente
                </Typography>
                break;
            case 'approved':
                ret = <Typography className="status-green" sx={{
                    border: '#cecece 1px solid', marginLeft: {
                        xs: '0', sm: '10px'
                    }, marginTop: '10px', display: {
                        xs: 'block', sm: 'inline-block'
                    }
                }}>
                    Aprobada
                </Typography>
                break;
            case 'rejected':
                ret = <Typography className="status-red" sx={{
                    border: '#cecece 1px solid', marginLeft: {
                        xs: '0', sm: '10px'
                    }, marginTop: '10px', display: {
                        xs: 'block', sm: 'inline-block'
                    }
                }}>
                    Rechazada
                </Typography>
                break;
            default:
                ret = <Typography>
                    Pendiente
                </Typography>
                break;
        }

        return ret;
    }

    return (
        <Fragment>

            <Grid container border={'2px solid #f78f15'} style={{ borderRadius: '10px', padding: '10px', height: '85vh', alignContent: 'baseline' }}>
                <Grid item xs={12} p={2} sx={{
                    display: 'flex', flexWrap: 'wrap'
                }}>
                    <Button variant='contained' sx={{
                        backgroundColor: '#272936', color: '#fff', marginTop: '10px', display: 'block',
                        textTransform: 'capitalize',
                        ":disabled": { backgroundColor: '#272936', color: '#fff' },
                    }} disabled={true}>
                        Orden de Trabajo N° #{request.data?.data?.id}
                    </Button>

                    {
                        request.data?.data?.status_ot && formatStatus(request.data?.data?.status_ot)
                    }
                </Grid>

                <Grid item xs={12} textAlign='center' mt={3}>
                    <Button variant='contained' sx={{
                        backgroundColor: '#272936', color: '#fff', boxShadow:'rgba(0, 0, 0, 0.2) 4px 4px 3px 0px !important',
                        textTransform: 'capitalize', fontWeight: 'bold',
                        ":disabled": { backgroundColor: '#272936', color: '#fff' }, width: {
                            xs: '100%', sm: '300px'
                        }
                    }} disabled>
                        Presupuesto
                    </Button>
                </Grid>

                <Grid item xs={12} md={8} m='0 auto'>
                    <Grid container mt={2}>
                        <Grid item xs={12} md={6} sx={{
                            borderRight: {
                                // El borde debe ser algo difuminado
                                xs: 'none', md: '1px solid #c7c7c7'
                            }, borderBottom: {
                                xs: '1px solid #c7c7c7', md: 'none'
                            }, padding: '5px',
                        }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox
                                            sx={{
                                                color: '#ffac1e',
                                                '&.Mui-checked': {
                                                    color: '#ffac1e',
                                                },
                                            }}
                                        />} label={
                                            <Typography fontWeight={'bold'}>
                                                Proceso de Lavado
                                            </Typography>
                                        } />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox
                                            sx={{
                                                color: '#ffac1e',
                                                '&.Mui-checked': {
                                                    color: '#ffac1e',
                                                },
                                            }}
                                        />} label={
                                            <Typography fontWeight={'bold'}>
                                                Evaluación <span style={{ color: '#f6b754', fontWeight: 'initial' }}>
                                                    (Máquina)
                                                </span>
                                            </Typography>
                                        } />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox
                                            sx={{
                                                color: '#ffac1e',
                                                '&.Mui-checked': {
                                                    color: '#ffac1e',
                                                },
                                            }}
                                        />} label={
                                            <Typography fontWeight={'bold'}>
                                                Desarme y Evaluación <span style={{
                                                    color: '#f6b754', fontWeight: 'initial'
                                                }}>
                                                    (Componente)
                                                </span>
                                            </Typography>
                                        } />
                                    </FormGroup>
                                </Grid>

                                <Grid item xs={12} mt={2}>
                                    <FormControl fullWidth>
                                        <Typography sx={{
                                            fontSize: '12px', color: '#000', fontWeight: 'bold'
                                        }}>
                                            Informe Técnico
                                        </Typography>
                                        <TextField 
                                            className="input-text-principal"
                                            multiline rows={3}
                                            sx={{
                                                ":disabled": { color: '#000 !important' }, 
                                            }}
                                            placeholder='Escriba aquí...'
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} mt={2}>
                                    <FormControl fullWidth>
                                        <Typography sx={{
                                            fontSize: '12px', color: '#000', fontWeight: 'bold'
                                        }}>
                                            Tipo de Componente
                                        </Typography>
                                        <Select
                                            className="input-text-principal select-input-text-principal"
                                            name='type_component'
                                            sx={{ ":disabled": { backgroundColor: '#fff' }, color: 'white' }}
                                            value={0}
                                        >
                                            <MenuItem value={0} disabled>Seleccionar</MenuItem>
                                            <MenuItem key={1} value={1}>Tipo 1</MenuItem>
                                            <MenuItem key={2} value={2}>Tipo 2</MenuItem>
                                            <MenuItem key={3} value={3}>Tipo 3</MenuItem>
                                            <MenuItem key={4} value={4}>Tipo 4</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{
                            borderLeft: {
                                // El borde debe ser algo difuminado
                                xs: 'none', md: '1px solid #c7c7c7'
                            }, borderTop: {
                                xs: '1px solid #c7c7c7', md: 'none'
                            }, padding: '5px',
                        }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <Select
                                            className={`input-text-principal select-input-text-secondary ${data.status === 'approved' ? 'green' : 'red'}`}
                                            name='type_component'
                                            value={data.status}
                                            onChange={(e) => setData({ ...data, status: e.target.value as string })}
                                        >
                                            <MenuItem sx={{
                                                color: '#37cb77'
                                            }} value={'approved'}>Aprobar</MenuItem>
                                            <MenuItem sx={{
                                                color: '#fb6065'
                                            }} value={'rejected'}>Rechazar</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>    
                </Grid>
            </Grid>

        </Fragment>
    )
}