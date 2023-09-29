import { Checkbox, FormControlLabel, FormGroup, Grid, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { Fragment } from "react";
import { GetTypesWorksRequest } from "../../../helpers/requests";

export default function FormMaestranza({
    data, setData
}:{
    data: Models.FormCreateSolicitud,
    setData: React.Dispatch<React.SetStateAction<Models.FormCreateSolicitud>>,
}) : JSX.Element {

    const types_work = useQuery(["GetTypesWorksRequest"], () => GetTypesWorksRequest());

    const isWorkChecked = (id: number) => {
        return data.works.find((item) => item.id === id) ? true : false
    }

    const handleWorkChecked = (id: number) => {
        if (isWorkChecked(id)) {
            // Limpiar la descripción
            setData({ ...data, works: data.works.filter((item) => item.id !== id) })
        } else {
            setData({ ...data, works: [...data.works, { id: id, description: '' }] })
        }
    }

    const handleWorkDescription = (id: number, description: string) => {
        setData({ ...data, works: data.works.map((item) => item.id === id ? { ...item, description: description } : item) })
    }

    return (
        <Fragment>

            {
                types_work.data?.data?.map((item, index: number) => (
                    <Fragment key={index}>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox
                                    sx={{
                                        color: '#ffac1e',
                                        '&.Mui-checked': {
                                            color: '#ffac1e',
                                        },
                                    }}
                                    checked={isWorkChecked(item.id)}
                                    onChange={() => handleWorkChecked(item.id)}
                                />} label={item.name} />
                                <TextField className="input-text-principal" placeholder='Describir...'
                                    multiline rows={1}
                                    value={data.works.find((work) => work.id === item.id)?.description || ''}
                                    onChange={(e) => handleWorkDescription(item.id, e.target.value)}
                                    disabled={!isWorkChecked(item.id)}
                                    sx={{
                                        ":disabled": { color: '#fff !important' }, 
                                    }}
                                />

                            </FormGroup>
                        </Grid>
                    </Fragment>
                ))
            }

        </Fragment>
    )
}