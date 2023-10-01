import { Button, Dialog, DialogContent, Divider, Grid, Typography } from "@mui/material"
import React, { Fragment } from "react"

export default function ModalImage({
    openDialogSuccess, setOpenDialogSuccess
}: {
    openDialogSuccess: {
        open: boolean
        url: string
    }
    setOpenDialogSuccess: React.Dispatch<React.SetStateAction<{
        open: boolean
        url: string
    }>>
}): JSX.Element {
    return (
        <Fragment>

            <Dialog open={openDialogSuccess.open} onClose={() => setOpenDialogSuccess(
                {
                    open: false,
                    url: ''
                }
            )} maxWidth='xs' fullWidth className="modal-dialog">
                <DialogContent className="modal-principal">

                    <img src={openDialogSuccess.url} alt="image" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />                    

                </DialogContent>
            </Dialog>

        </Fragment>
    )
}