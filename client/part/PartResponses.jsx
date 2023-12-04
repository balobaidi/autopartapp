import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import auth from '../lib/auth-helper';
import { getResponsesByPartId } from './api-response';
import { read } from './api-part';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, RadioGroup, Radio, FormControl, FormControlLabel, Slider, TextareaAutosize, Button } from '@material-ui/core';
import ShortAnswerResponses from '../lib/ShortAnswerResponses';
import html2canvas from 'html2canvas';
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        textAlign: 'center',
        margin: `${theme.spacing(3)}px 0 ${theme.spacing(1)}px ${theme.spacing(1)}px` ,
        color: theme.palette.protectedTitle,
        fontSize: '1.2em'
    },
    subtitle: {
        textAlign: 'center',
        margin: `${theme.spacing(1)}px 0 ${theme.spacing(3)}px ${theme.spacing(1)}px` ,
        fontSize: '1.1em'
    },
    questionText: {
        fontWeight: 'bold',
        marginTop: theme.spacing(2)
    },
    ratingResponses: {
        display: 'flex',
        marginBottom: theme.spacing(1),
        

    },
    ratingResponseCount: {
        marginLeft: theme.spacing(1)
    }
}))

function PartResponses() {
    const classes = useStyles();
    const { partId } = useParams();
    const jwt = auth.isAuthenticated()
    const [partData, setPartData] = useState({});
    const [responseData, setResponseData] = useState([]);

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        getResponsesByPartId({
            partId: partId
        }, {t: jwt.token}, signal).then((data) => {
            setResponseData(data)
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })

        read({partId: partId})
        .then((data) => {
            setPartData(data)
            console.log(data)
        })
        .catch((err) => {
            console.log(err);
        })

        return function cleanup(){
            abortController.abort()
        }
    },[])
    const getResponseCountForChoice = (choiceValue, questionId, index) => {
        let responseCount = 0;
        {responseData != null &&
            responseData.forEach(response => {
                if(response.answers.length > index
                   &&
                   response.answers[index].answer === choiceValue
                   &&
                   response.answers[index].question === questionId
                  )
                {
                    responseCount++
                }
            }); 
        } 
        return responseCount  
    }
    const getResponseCountForRating = (choiceValue, questionId, index) => {
        let responseCount = 0;
        {responseData != null && 
         responseData.forEach(response => {
             if(response.answers.length > index
                &&
                response.answers[index].answer == choiceValue
                &&
                response.answers[index].question === questionId)
             {
                 responseCount++;
             }
         })
        }
        return responseCount
    }
    const getShortAnswerResponses = (questionId, index) => {
        let shortAnswerResponses = [];
        {responseData != null &&
        responseData.forEach(response => {
            if(response.answers[index].question === questionId){
                shortAnswerResponses.push(response.answers[index].answer)
            }
        })}
        return shortAnswerResponses
    }
    const getResponseText = (count) => {
        return count === 1 ? 'response' : 'responses'
    }

  const generateReport = () => {
        let reportContent = `Part Title: ${partData.title}\n\n`;
    
        partData.questions.forEach((question, questionIndex) => {
            reportContent += `Question ${questionIndex + 1}: ${question.questionText}\n`;
    
            switch (question.questionType) {
                case 'multipleChoice':
                    question.choices.forEach((choice, choiceIndex) => {
                        const responseCount = getResponseCountForChoice(choice.value, question._id, questionIndex);
                        reportContent += `- ${choice.value}: ${responseCount} ${getResponseText(responseCount)}\n`;
                    });
                    break;
                case 'rating':
                    for (let i = 0; i <= question.ratingScale; i++) {
                        const responseCount = getResponseCountForRating(i, question._id, questionIndex);
                        reportContent += `- Rating ${i}: ${responseCount} ${getResponseText(responseCount)}\n`;
                    }
                    break;
                case 'shortAnswer':
                    const shortAnswerResponses = getShortAnswerResponses(question._id, questionIndex);
                    if (shortAnswerResponses.length > 0) {
                        reportContent += '- Short answer responses:\n';
                        shortAnswerResponses.forEach((response) => {
                            reportContent += `  - ${response}\n`;
                        });
                    }
                    break;
                default:
                    break;
            }
    
            reportContent += '\n';
        });
    
        console.log('Generated Report:', reportContent);
    
        const printableWindow = window.open('', '_blank');
        if (printableWindow) {
            printableWindow.document.write(`<pre>${reportContent}</pre>`);
            printableWindow.document.close();
        } else {
            alert('Please allow pop-ups for printing');
        }
    };
    const handleExport = () => {
  
        generateReport();
    };
    
 
  return (
    <div>
        <Paper className={classes.root} elevation={4}> 
            <Typography type="title" className={classes.title}>
                {partData.title} Responses
            </Typography>
            <Typography className={classes.subtitle}>{responseData && responseData.length} Total Respondents</Typography>
            {partData.questions && partData.questions.map((question, i) =>(
                <span key={i}>
                    <Typography className={classes.questionText}>{question.questionText}</Typography>
                    {question.questionType === 'multipleChoice' && (
                        <>
                            {question.choices.map((choice, j) => (
                                <span key={j}>
                                    <Typography>
                                        {choice.value}{' '}(
                                            {getResponseCountForChoice(choice.value, question._id, i)}
                                            {' '}
                                            {getResponseText(getResponseCountForChoice(choice.value, question._id, i))}
                                        )
                                    </Typography>
                                </span>
                                ))}
                        </>
                    )}
                    {question.questionType === 'rating' && (
                        
                        Array.from({length: question.ratingScale + 1}, (_, index) => (
                            <span className={classes.ratingResponses} key={index}>
                            <Typography>
                                {index}   
                            </Typography>
                            <Typography className={classes.ratingResponseCount}>
                                (
                                {getResponseCountForRating(index, question._id, i)}
                                {' '} 
                                {getResponseText(getResponseCountForRating(index, question._id, i))})
                            </Typography>
                            </span>
                        ))
                    )}
                    {question.questionType === 'shortAnswer' && (
                        <>
                            <ShortAnswerResponses answers={getShortAnswerResponses(question._id, i)}/>
                        </>
                    )}
                    
                            <Button variant="contained" color="primary" onClick={handleExport} >Export Report (Printable)
                             </Button>
        
                </span>

            ))}
        </Paper>
    </div>
  )
 
                    }
export default PartResponses
