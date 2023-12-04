import React, {useState} from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import auth from '../lib/auth-helper.js';
import {remove} from './api-part.js'

export default function DeletePart(props) {
    const [open, setOpen] = useState(false)
    
    const jwt = auth.isAuthenticated()
    const clickButton = () => {
        setOpen(true)
    }
    const deletePart = () => {
        console.log("props.part._id", props.part._id);
        remove(
            {partId: props.part._id}
        , {t: jwt.token}).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setOpen(false)
                props.onRemove(props.part)
            }
        })
    }
    const handleRequestClose = () => {
        setOpen(false)
    }
    return (<span>
                <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
                    <DeleteIcon/>
                </IconButton>

                <Dialog open={open} onClose={handleRequestClose}>
                    <DialogTitle>{"Delete "+props.part.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Confirm to delete your part: 
                            <Typography color="textPrimary">
                                {props.part.title}
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleRequestClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={deletePart} color="secondary" autoFocus="autoFocus">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </span>)
}

DeletePart.propTypes = {
    part: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
}
