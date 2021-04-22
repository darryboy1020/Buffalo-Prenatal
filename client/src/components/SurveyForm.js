import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import css from 'styled-jsx/css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import emailjs from 'emailjs-com';
import axios from 'axios';
import useDatabase from '../hooks/useDatabase';

const SurveyForm = ({ textItems, radioItems }) => {
  const SERVICE_ID = 'contact_service';
  const TEMPLATE_ID = 'contact_form';
  const USER_ID = 'user_axPgJ0ZCW7NtK2twyMIHZ';

  const { register, handleSubmit, errors } = useForm();

  const { getDataFromDb, putDataToDB, deleteFromDB, updateDB } = useDatabase();

  const [showChart, setShowChart] = useState(null);

  const onSubmit = (data) => {
    // q1: SD 1
    // q2: SD 1
    // q3: SD 4
    //max: 15

    // q4: SD 1
    // q5: SD 1
    // q6: SD 1
    // q7: SD 1
    // q8: SD 1

    //max 25

    // q9: SD 4
    // q10: SD 4
    // q11: SD 4
    // max: 15

    // q12: SA 9
    // q13: SA 9
    // q14: SA 9
    // q15: SA 9
    // q16: SA 9
    // q17: SA 9
    // q18: SA 9
    // q19: SA 9
    // q20: SA 9
    // q21: SA 9
    // q22: SA 9
    // q23: SA 9
    //max: 108

    // q24: SA 9
    // q25: SA 1
    // q26: SA 9
    // q27: SA 9

    //max : 36

    // q28: SA 9
    // q29: SA 9
    // q30: SA 9
    // q31: SA 9

    //max: 36

    var results = {
      undermining: 0, //q 1-3
      allianceFactor: 0, //q 4-8
      gateKeeping: 0, //q 9-11
      positiveEngagement: 0, //q 12-23
      directCare: 0, //q 24-27
      financialProvision: 0, //q 28 - 31
    };

    var sdMaxArr = ['question3', 'question9', 'question10', 'question11'];
    var sdMinArr = ['question25'];

    Object.keys(data).forEach((key) => {
      var inverseScore = sdMaxArr.includes(key) || sdMinArr.includes(key);
      let arrAgree = {
        'Strongly disagree': inverseScore ? 5 : 1,
        Disagree: inverseScore ? 4 : 2,
        Neutral: 3,
        Agree: inverseScore ? 2 : 4,
        'Strongly agree': inverseScore ? 1 : 5,
      };

      let arrAgreeExtended = {
        'Extremely Agree': inverseScore ? 1 : 9,
        'Strongly Agree': inverseScore ? 2 : 8,
        'Moderately Agree': inverseScore ? 3 : 7,
        'Slightly Agree': inverseScore ? 4 : 6,
        Neutral: 5,
        'Slightly Disagree': inverseScore ? 6 : 4,
        'Moderately Disagree': inverseScore ? 7 : 3,
        'Strongly Disagree': inverseScore ? 8 : 2,
        'Extremely Disagree': inverseScore ? 9 : 1,
      };
      if (key.includes('question')) {
        var questionNumber = parseInt(key.substring(8));
        let value = data[key];

        if (questionNumber <= 3) {
          results.undermining += arrAgree[value];
        } else if (questionNumber > 3 && questionNumber <= 8) {
          results.allianceFactor += arrAgree[value];
        } else if (questionNumber > 8 && questionNumber <= 11) {
          results.gateKeeping += arrAgree[value];
        } else if (questionNumber > 11 && questionNumber <= 23) {
          results.positiveEngagement += arrAgreeExtended[value];
        } else if (questionNumber > 23 && questionNumber <= 27) {
          results.directCare += arrAgreeExtended[value];
        } else if (questionNumber > 27 && questionNumber <= 31) {
          results.financialProvision += arrAgreeExtended[value];
        }
      }
    });

    var postData = {
      ...data,
      ...results,
      chartresults: results,
    };
    console.log(postData);
    putDataToDB(postData).then((res) => {
      console.log(res.data);
      setShowChart(res.data.chartUrls);
    });
  };

  const { className: containerClass, styles: containerStyle } = css.resolve`
    * {
      max-width: 35rem;
    }

    @media only screen and (max-width: 600px) {
      margin: 0 auto;
    }
  `;

  const {
    className: cardContainerClass,
    styles: cardContainerStyle,
  } = css.resolve`
    * {
      margin-top: 1rem;
    }
  `;

  const { className: formClass, styles: formStyle } = css.resolve`
    * {
      min-width: 35rem;
      display: flex;
      flex-direction: column;
    }

    @media only screen and (max-width: 600px) {
      min-width: 1px;
      width: 100vw;
    }
  `;
  const { className: buttonClass, styles: buttonStyle } = css.resolve`
    * {
      margin: 1rem auto;
    }

    @media only screen and (max-width: 600px) {
      min-width: 1px;
      width: 100%;
    }
  `;

  const getTextInputs = (textItems) => {
    return (
      <Grid
        className={containerClass}
        justify='center'
        direction='column'
        container
      >
        {textItems.map(({ question, name, required, placeholder }) => {
          return (
            <Card className={cardContainerClass} key={question}>
              <CardContent>
                <Grid item>
                  <div style={{ wordBreak: 'break-word' }}>{question}</div>
                  {required ? <Typography color='error'>*</Typography> : null}
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    name={name}
                    fullWidth
                    error={errors[name] !== undefined}
                    placeholder={placeholder}
                    inputRef={register({
                      required: 'Field cannot be empty',
                      minLength: 1,
                    })}
                  ></TextField>

                  {errors[name] && (
                    <Typography paragraph color='error'>
                      {errors[name].message}
                    </Typography>
                  )}
                </Grid>
              </CardContent>
            </Card>
          );
        })}
      </Grid>
    );
  };

  const getRadioButtons = (radioItems) => {
    return (
      <Grid
        className={containerClass}
        justify='center'
        direction='column'
        container
      >
        {radioItems.map(
          ({ question, name, required, questionType = 'agree' }, index) => {
            const arrAgree =
              questionType === 'agreeExtended'
                ? [
                    'Extremely Agree',
                    'Strongly Agree',
                    'Moderately Agree',
                    'Slightly Agree',
                    'Neutral',
                    'Slightly Disagree',
                    'Moderately Disagree',
                    'Strongly Disagree',
                    'Extremely Disagree',
                  ]
                : [
                    'Strongly disagree',
                    'Disagree',
                    'Neutral',
                    'Agree',
                    'Strongly agree',
                  ];

            return (
              <Card className={cardContainerClass} key={question}>
                <CardContent>
                  <Grid item>
                    <div style={{ wordBreak: 'break-word' }}>{`${
                      index + 1
                    }. ${question}`}</div>
                    {required ? <Typography color='error'>*</Typography> : null}
                  </Grid>
                  <Grid item>
                    <RadioGroup defaultValue={arrAgree[0]} onChange={() => {}}>
                      {arrAgree.map((answer) => {
                        return (
                          <Grid key={answer} alignItems='center' container>
                            <Grid item sm={1}>
                              <Radio
                                name={name}
                                value={answer}
                                required={required}
                                inputRef={register}
                              />
                            </Grid>
                            <Grid item sm={11}>
                              <Typography>{answer}</Typography>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </RadioGroup>
                  </Grid>
                </CardContent>
              </Card>
            );
          }
        )}
      </Grid>
    );
  };

  const showCharts = (arr) => {
    /* console.log(arr) */
    return (
      <div>
        {arr.map((url) => {
          return <img src={url} alt={url} key={url} />;
        })}
      </div>
    );
  };
  console.log(showChart);
  return (
    <Grid container justify='center'>
      <form
        id='surveyForm'
        className={formClass}
        onSubmit={handleSubmit(onSubmit)}
      >
        {textItems ? getTextInputs(textItems) : null}
        {radioItems ? getRadioButtons(radioItems) : null}
        <Button className={buttonClass} variant='contained' type='submit'>
          Submit Survey
        </Button>

        {showChart ? showCharts(showChart) : null}
      </form>
      {containerStyle}
      {cardContainerStyle}
      {formStyle}
      {buttonStyle}
    </Grid>
  );
};
export default SurveyForm;
