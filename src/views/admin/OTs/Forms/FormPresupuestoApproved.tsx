import { Fragment } from "react";
import { Grid, Typography, Checkbox, FormControlLabel, FormGroup, FormControl, TextField, MenuItem, Select } from "@mui/material";

export default function FormPresupuestoApproved({
    data, setData
}: {
    data: Models.FormPresupuestoAsignacion,
    setData: React.Dispatch<React.SetStateAction<Models.FormPresupuestoAsignacion>>,
}): JSX.Element {

    return (
        <Fragment>

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
                                value={data.lavado}
                                onChange={() => setData({ ...data, lavado: !data.lavado })}
                                checked={data.lavado}
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
                                value={data.evaluacion}
                                onChange={() => setData({ ...data, evaluacion: !data.evaluacion })}
                                checked={data.evaluacion}
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
                                value={data.desarme_evaluacion}
                                onChange={() => setData({ ...data, desarme_evaluacion: !data.desarme_evaluacion })}
                                checked={data.desarme_evaluacion}
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
                                value={data.informe_tecnico}
                                onChange={(e) => {
                                    if (e.target.value.length <= 2500) setData({ ...data, informe_tecnico: e.target.value })
                                }}
                                placeholder='Escriba aquí...'
                            />
                            <span style={{
                                fontSize: '10px', color: '#000', position: 'absolute', right: '10px', bottom: '10px',
                            }}>
                                {data.informe_tecnico.length}/2500
                            </span>
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
                                value={data.tipo_componente}
                                onChange={ (e) => setData({ ...data, tipo_componente: e.target.value as string }) }
                            >
                                <MenuItem value={data.tipo_componente} disabled>Seleccionar</MenuItem>
                                <MenuItem key={1} value={'tipo_1'}>Tipo 1</MenuItem>
                                <MenuItem key={2} value={'tipo_2'}>Tipo 2</MenuItem>
                                <MenuItem key={3} value={'tipo_3'}>Tipo 3</MenuItem>
                                <MenuItem key={4} value={'tipo_4'}>Tipo 4</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>

        </Fragment>
    )
}