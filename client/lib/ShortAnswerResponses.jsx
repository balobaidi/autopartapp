import React, {useState}from 'react'
import { TextareaAutosize } from '@material-ui/core'
import  { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        width: '300px'
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        padding: '5px 5px 5px 5px'
    },
    textArea: {
        width: '300px'
    }
}))

function ShortAnswerResponses({ answers }) {
    const classes = useStyles();
    const [responseIndex, setResponseIndex] = useState(0)

    const handlePrev = () => {
        setResponseIndex((prevIndex) => (prevIndex - 1 + answers.length) % answers.length)
    }

    const handleNext = () => {
        setResponseIndex((prevIndex) => (prevIndex + 1) % answers.length)
    }
  return (
    <div className={classes.container}>
        <TextareaAutosize
        minRows={4}
        value={answers[responseIndex]}
        readOnly
        className={classes.textArea} />
        <div className={classes.buttonGroup}>
            <Button 
            variant='contained' 
            color="primary" 
            className={classes.button}
            onClick={handlePrev}>
                Previous
            </Button>
            <Button 
            variant='contained' 
            color="primary" 
            onClick={handleNext}>
                Next
            </Button>
        </div>
    </div>

  )
}

export default ShortAnswerResponses
