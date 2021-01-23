import React, { Fragment } from 'react'
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

const SurverForm = ({ textItems }) => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data) => {
    console.log(data)
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
        {textItems.map(({ question, name, required, placeholder }, index) => {
          return (
            <Card className={cardContainerClass} key={question}>
              <CardContent>
                <Grid item>
                  <div style={{ wordBreak: 'break-word' }}>{`${
                    index + 1
                  }. ${question}`}</div>
                  {required ? <Typography color='error'>*</Typography> : null}
                </Grid>
                <Grid item md={6}>
                  <TextField
                    name={name}
                    fullWidth
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

  return (
    <Grid container justify='center'>
      <form className={formClass} onSubmit={handleSubmit(onSubmit)}>
        {textItems ? getTextInputs(textItems) : null}
        <Button className={buttonClass} variant='contained' type='submit'>
          Sumbit
        </Button>
      </form>
      {containerStyle}
      {cardContainerStyle}
      {formStyle}
      {buttonStyle}
    </Grid>
  )
}
export default SurverForm
