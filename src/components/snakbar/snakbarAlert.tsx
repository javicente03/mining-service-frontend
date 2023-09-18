import { Snackbar, Alert } from '@mui/material';
import { AlertColor } from '@mui/material';

interface SnakbarAlertProps {
    open: boolean,
    message: string | JSX.Element,
    color: AlertColor,
    onClose: () => void
}


export const SnakbarAlert = (props: SnakbarAlertProps) => {
    return (
        <Snackbar open={
            props.open
        } autoHideDuration={6000} onClose={
            props.onClose
        } anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert onClose={
                props.onClose
            } severity={ props.color }
            sx={{ width: '100%' }}>
                { props.message }
            </Alert>
        </Snackbar>
    )
}