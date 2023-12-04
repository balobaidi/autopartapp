
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import logo from './../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
   

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%'
    }
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.protectedTitle,
  },
  media: {
    minHeight: 400,
    [theme.breakpoints.down('sm')]: {
      minHeight: 200, // Adjust for smaller screens
    }
  },
  partBtnDiv: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function Home(){ 
  const classes = useStyles()
  return (
  <Card className={classes.card}>
    <Typography variant="h6" className={`${classes.title} MuiTypography-alignCenter`}>Home Page</Typography>
    <CardMedia className={classes.media}
      image={logo} title="Logo"/>
    <CardContent>
      <Typography component="p" className='MuiTypography-alignCenter'> 
      Welcome to the Auto Part Store home page.
      </Typography> 
      <div className={classes.partBtnDiv}>
      <Link to={"/parts/"} >
        <Button variant='contained' color="secondary">
          Parts
        </Button>
      </Link>
      </div>
    </CardContent>
  </Card> 
  )
}