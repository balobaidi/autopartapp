
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listParts } from './api-part'
import { Card, CardContent, Typography, TextField,
   Button, CardActions, Paper, List, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5)
  },
  title: {
    textAlign: 'center',
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px`,
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  }
}))

function Parts() {
  const classes = useStyles();
  const [parts, setParts] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    
    listParts(signal)
    .then((data) => {
      console.log(data);
      setParts(data);
    })
    .catch((err) => {
      console.error(err);
    });

    return function cleanup(){
      abortController.abort()
    }
  }, [])
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type='title' className={classes.title}> All Available Parts</Typography>
        1. #333     Des fffhttps://github.com/balobaidi/autopartapp.git
        <List>
          {parts.map((part, i) => (
            <span key={i}>
              {new Date(part.startDate) < new Date() && new Date(part.endDate) > new Date() && 
                <Link to={'/part/' + part._id} className={classes.link}>
                  <ListItem>
                    <ListItemText 
                    primary={part.title}/>
                  </ListItem>
                </Link>
              }
            </span>
          ))}
        </List>
      </Paper>
    </div>
  )
}

export default Parts
