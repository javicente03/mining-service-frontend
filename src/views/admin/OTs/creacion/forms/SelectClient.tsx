import { Autocomplete, FormGroup, Grid, InputLabel, TextField } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { Fragment, useEffect, useState } from "react"
import { GetCompaniesAdmin } from "../../../../../helpers/admin/companies"
import { GetUsersAdmin } from "../../../../../helpers/admin/users"

export default function FormSelectClient({
    data, setData
}: {
    data: Models.FormCreateOT0Admin, setData: React.Dispatch<React.SetStateAction<Models.FormCreateOT0Admin>>
}): JSX.Element {

    const companies = useQuery(['GetCompaniesAdmin'], () => GetCompaniesAdmin())

    const [ filters_user, setFilters_user ] = useState<{
        companyId: number,
    }>({ companyId: 0 })
    const users = useQuery(['GetUsersAdmin', filters_user], () => GetUsersAdmin(filters_user))

    const [companies_select, setCompanies_select] = useState<{
        label: string,
        value: number,
    }[]>([]);

    useEffect(() => {
        if (companies.data?.data) {
            setCompanies_select([])
            setCompanies_select((prev) => [...prev, {
                label: 'Seleccionar',
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

    const [users_select, setUsers_select] = useState<{
        label: string,
        value: number,
    }[]>([]);

    useEffect(() => {
        if (users.data?.data) {
            setUsers_select([])
            setUsers_select((prev) => [...prev, {
                label: 'Seleccionar',
                value: 0,
            }]);
            users.data?.data.forEach((user) => {
                setUsers_select((prev) => [...prev, {
                    label: `${user.name} ${user.lastname}`,
                    value: user.id,
                }]);
            });
        }
    }, [users.data?.data])

    const handleInputChange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <Fragment>
            <Grid item xs={12} mb={2}>

                <Grid container spacing={2}>
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
                                        setData({
                                            ...data,
                                            companyId: parseInt(value[1] as any),
                                            userId: 0,
                                        })

                                        setFilters_user({
                                            companyId: parseInt(value[1] as any),
                                        })
                                    }
                                }}
                            />
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FormGroup>
                            <InputLabel className="label-principal" >Responsable Cliente</InputLabel>
                            <Autocomplete disabled={data.companyId === 0}
                                style={{
                                    width: '100%',
                                }}
                                className="input-text-principal autocomplete-input"
                                // placeholder="Seleccionar"
                                disablePortal
                                id="combo-box-demo"
                                // @ts-ignore
                                getOptionLabel={(option) => `${option[0]}`}
                                options={users_select.map((option) => [option.label, option.value])}
                                freeSolo
                                sx={{ width: 300, ":disabled": { backgroundColor: '#ffac1eb0 !important' }}}
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
                                value={data.userId === 0 ? [users_select[0]?.label, users_select[0]?.value] : [users_select.find((user) => user.value === data.userId)?.label, data.userId]}
                                onChange={(event, value) => {
                                    // @ts-ignore
                                    if (value && !isNaN(value[1])) {
                                        setData({
                                            ...data,
                                            userId: parseInt(value[1] as any),
                                        })
                                    }
                                }}
                            />
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FormGroup>
                            <InputLabel className="label-principal" >Fecha de Inicio</InputLabel>
                            <input className="input-text-principal" type="date"
                                value={data.fecha_ingreso} name="fecha_ingreso" onChange={handleInputChange} style={{
                                    color: '#000', padding: '20px 10px', borderRadius: '5px',
                                }} 
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FormGroup>
                            <InputLabel className="label-principal" >Número GD</InputLabel>
                            <TextField className="input-text-principal" 
                                value={data.numero_gd} name="numero_gd" onChange={handleInputChange}
                            />
                        </FormGroup>
                    </Grid>
                </Grid>

            </Grid>
        </Fragment>
    )
}