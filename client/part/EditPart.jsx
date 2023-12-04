

import React, {useEffect, useState} from 'react'
import auth from '../lib/auth-helper';
import {read} from './api-part'
import { useParams } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';

export default function EditPart(props) {
    const [open, setOpen] = useState(false)

    const jwt = auth.isAuthenticated()

    const navigate = useNavigate();

    const editpart = async () => {
        try {
            const response = await read(
                { partId: props.part._id },
                { t: jwt.token }
            );

            if (response.error) {
                console.log(response.error);
            } else {
                navigate('/createpart', { state: { partData: response } });
            }
        } catch (error) {
            console.error('Error fetching part data:', error);
        }
    }

    return (<span>
                <IconButton aria-label="Edit" onClick={editPart} color="secondary">
                    <Edit/>
                </IconButton>
            </span>
           )
}

EditPart.propTypes = {
    part: PropTypes.object.isRequired
}

