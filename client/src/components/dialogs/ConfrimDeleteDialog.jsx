import React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material"

const ConfrimDeleteDialog = ({open, handleCLose, deleteHandler}) => {
    return (
        <Dialog open={open} onClose={handleCLose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you wanted to delete this app
                </DialogContentText>
            </DialogContent>
            < DialogActions>
                <Button onClick={() => handleCLose()}>No</Button>
                <Button onClick={() => deleteHandler()} color={"error"}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}
export default ConfrimDeleteDialog
