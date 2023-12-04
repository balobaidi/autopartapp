import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { read } from './api-part';
import auth from '../lib/auth-helper';
import { Paper, Typography, RadioGroup, Radio, FormControl, FormControlLabel,
     Slider, TextareaAutosize, Button,  Dialog, DialogTitle, 
     DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createResponse } from './api-response';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        textAlign: 'center',
        margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px` ,
        color: theme.palette.protectedTitle,
        fontSize: '1.2em'
    },
    questionText: {
        fontWeight: 'bold'
    },
    sliderDiv: {
        width: '300px',
        margin: 'auto'
    },
    textArea: {
        width: '300px'
    },
    question: {
        marginBottom: theme.spacing(3),
        display: 'block'
    }
}))
function Part() {
    
    const classes = useStyles();
    const { partId } = useParams();
    const jwt = auth.isAuthenticated()
    const [partData, setPartData] = useState({})
    const [userResponses, setUserResponses] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [dialogMessage, setDialogMessage] = useState('');

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    useEffect(() => {
        read({partId: partId})
        .then((data) => {
            setPartData(data)
            initializeUserResponses(data)
            console.log(data)
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    const initializeUserResponses = (data) => {
        const initialResponses = {
            part: partId,
          answers: data.questions.map((question) => ({
            question: question._id,
            answer: ''
          }))
        };
        setUserResponses(initialResponses);
      };

    const handleResponseChange = (index, response) => {
        setUserResponses((prevResponses) => ({
            ...prevResponses,
            answers: [
              ...prevResponses.answers.slice(0, index),
              { ...prevResponses.answers[index], answer: response },
              ...prevResponses.answers.slice(index + 1),
            ],
          }));
    }

    const handleSubmit = () => {
        const unanswered = userResponses.answers.filter((answer) => answer.answer === '');
        if (unanswered.length > 0) {

            const unansweredQuestions = unanswered.map((unansweredItem) => {
                const correspondingQuestion = partData.questions.find(
                    (question) => question._id === unansweredItem.question);

                return correspondingQuestion
                    ? `"${correspondingQuestion.questionText}"`
                    : 'Unknown Question';
            });
            const questionList = unansweredQuestions.join('\n');
            alert(`You have ${unanswered.length} unanswered question(s): \n\n${questionList}\n\nPlease answer all questions before pressing Submit!`);
            return;
        }
        createResponse(userResponses).then((data) => {
            console.log(data)
            setDialogMessage('Responses successfully submitted.')
            setOpenDialog(true)
        }).catch((err) => {
            console.log(err)
            setDialogMessage('An error occured when attempting to submit your responses.')
            setOpenDialog(true)
        })
    }
    
  return (
    <div>
        <Paper className={classes.root} elevation={4}>
            <Typography type="title" className={classes.title}>
                {partData.title}
            </Typography>
            {partData.questions && partData.questions.map((question, i) => (
                <span key={i} className={classes.question}>
                    <Typography className={classes.questionText}>
                        {question.questionText}
                    </Typography>
                    <FormControl>
                        {question.questionType === 'multipleChoice' && (
                            <RadioGroup name={`question-${i}`}>
                                {question.choices.map((choice, j) => (
                                    <FormControlLabel
                                    key={j}
                                    value={choice.value}
                                    control={<Radio />} 
                                    label={choice.value}
                                    onChange={(e) => handleResponseChange(i, e.target.value)}
                                    />
                                ))}
                        </RadioGroup>    
                        )}
                        {question.questionType === 'rating' && (
                            <div className={classes.sliderDiv}>
                                <Slider
                                valueLabelDisplay="auto"
                                defaultValue={null}
                                step={1}
                                marks={true}
                                min={0}
                                max={question.ratingScale}
                                onChange={(e, value) => handleResponseChange(i, value)}
                                />
                            </div>
                        )}
                        {question.questionType === 'shortAnswer' && (
                            <TextareaAutosize
                            minRows={3}
                            className={classes.textArea}
                            onChange={(e) => handleResponseChange(i, e.target.value)} />
                        )}
                    </FormControl>
                </span>
            ))}
            <Button
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleSubmit}
            >
                Submit Responses
            </Button>
        </Paper>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogMessage}
                </DialogContentText>
                <DialogActions>
                    <div className={classes.dialogActions}>
                        <Button onClick={handleCloseDialog} color="secondary" autoFocus="autoFocus">
                            Confirm
                        </Button>
                    </div>
                </DialogActions>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default Part
