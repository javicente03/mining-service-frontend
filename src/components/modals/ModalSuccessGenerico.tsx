import { Button, Dialog, DialogContent, Divider, Grid, Typography } from "@mui/material"
import { Fragment } from "react"
import { useNavigate } from "react-router-dom"

export default function ModalSuccessGenerico({
    openDialogSuccess, setOpenDialogSuccess, title, subtitle, returnTo
}: {
    openDialogSuccess: boolean
    setOpenDialogSuccess: any
    title: string
    subtitle?: string | undefined,
    returnTo?: string | undefined
}): JSX.Element {

    const navigateTo = useNavigate()

    return (
        <Fragment>

            <Dialog open={openDialogSuccess} onClose={() => {
                if (returnTo) {
                    setOpenDialogSuccess(false)
                    navigateTo(returnTo)
                } else {
                    setOpenDialogSuccess(false)
                }
            }} maxWidth='xs' fullWidth className="modal-dialog">
                <DialogContent className="modal-principal">

                    <Grid container justifyContent={'center'}>
                        <Grid item xs={12} md={6} mb={5}>
                            <Typography className="modal-principal-title">
                                {title}
                            </Typography>
                            <Divider
                                sx={{
                                    backgroundColor: '#fff',
                                    height: '3px',
                                    marginTop: '2px',
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} sm={10}>
                            <p style={{
                                color: 'white', textAlign: 'center'
                            }}>
                                {subtitle}
                            </p>
                        </Grid>

                        <Grid item xs={12}></Grid>
                        <Grid item xs={12} mt={5} textAlign='center'>
                            <Button variant="contained" className="modal-principal-button-success" onClick={
                                () => {
                                    if (returnTo) {
                                        setOpenDialogSuccess(false)
                                        navigateTo(returnTo)
                                    } else {
                                        setOpenDialogSuccess(false)
                                    }
                                }
                            }>
                                Aceptar
                            </Button>
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>

        </Fragment>
    )
}