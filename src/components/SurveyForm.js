import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import css from 'styled-jsx/css'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Button from '@material-ui/core/Button'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import emailjs from 'emailjs-com'
import axios from 'axios'
import useDatabase from '../hooks/useDatabase'
import { Link, Redirect } from 'react-router-dom'

const SurverForm = ({ textItems, radioItems, surveySubmit }) => {
  const SERVICE_ID = 'contact_service'
  const TEMPLATE_ID = 'contact_form'
  const USER_ID = 'user_axPgJ0ZCW7NtK2twyMIHZ'

  const { register, handleSubmit, errors } = useForm()

  const { getDataFromDb, putDataToDB, deleteFromDB, updateDB } = useDatabase()
  const [redirect, setRedirect] = useState(false)
  const [data, setData] = useState({})
  console.log(data)
  const onSubmit = (submitData) => {
    // emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, '#surveyForm', USER_ID).then(
    //   (result) => {
    //     console.log(result.text)
    //     console.log('Success...')
    //   },
    //   (error) => {
    //     console.log(error.text)
    //     console.log('Failed...')
    //   }
    // )
    // putDataToDB(data)
    console.log('in submit')
    // console.log(data)
    if (surveySubmit) {
      console.log('cool')
      var test = { ...data, ...submitData }
      console.log(test)
    } else {
      setData(data)
      setRedirect(true)
    }
  }

  const { className: containerClass, styles: containerStyle } = css.resolve`
    * {
      max-width: 35rem;
    }

    @media only screen and (max-width: 600px) {
      margin: 0 auto;
    }
  `

  const {
    className: cardContainerClass,
    styles: cardContainerStyle,
  } = css.resolve`
    * {
      margin-top: 1rem;
    }
  `

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
  `
  const { className: buttonClass, styles: buttonStyle } = css.resolve`
    * {
      margin: 1rem auto;
    }

    @media only screen and (max-width: 600px) {
      min-width: 1px;
      width: 100%;
    }
  `

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
          )
        })}
      </Grid>
    )
  }

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
                    'Stronly Disagree',
                    'Extremely Disagree',
                  ]
                : [
                    'Strongly disagree',
                    'Disagree',
                    'Neutral',
                    'Agree',
                    'Strongly agree',
                  ]

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
                        )
                      })}
                    </RadioGroup>
                  </Grid>
                </CardContent>
              </Card>
            )
          }
        )}
      </Grid>
    )
  }
  const nextSurveyButton = (
    <Button
      className={buttonClass}
      component={Link}
      to='/surveyS'
      variant='contained'
    >
      Continue to the next survey
    </Button>
  )

  const submitButton = (
    <Button className={buttonClass} variant='contained' type='submit'>
      {surveySubmit ? 'Submit Survey' : 'Continue to the next survey'}
    </Button>
  )

  return (
    <Grid container justify='center'>
      {redirect ? (
        <Redirect
          to={{
            pathname: '/surveyS',
            data,
          }}
        />
      ) : null}
      <form
        id='surveyForm'
        className={formClass}
        onSubmit={handleSubmit(onSubmit)}
      >
        {textItems ? getTextInputs(textItems) : null}
        {radioItems ? getRadioButtons(radioItems) : null}
        {submitButton}
      </form>
      {containerStyle}
      {cardContainerStyle}
      {formStyle}
      {buttonStyle}
    </Grid>
  )
}
export default SurverForm
