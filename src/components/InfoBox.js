import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import css from 'styled-jsx/css'

const InfoBox = ({ title, body, required }) => {
  const { className: cardClass, styles: cardStyle } = css.resolve`
    * {
      max-width: 35rem;
    }
  `
  const { className: containerClass, styles: containerStyle } = css.resolve`
    * {
      margin-top: 1rem;
    }
  `
  return (
    <Grid container justify='center' className={containerClass}>
      <Grid item>
        <Card className={cardClass}>
          <CardContent>
            <Typography variant='h3' paragraph>
              {title}
            </Typography>
            <Typography style={{ whiteSpace: 'pre-wrap' }} paragraph>
              {body}
            </Typography>
            {required ? (
              <Typography color='error' paragraph>
                (*) Required
              </Typography>
            ) : null}
          </CardContent>
        </Card>
      </Grid>
      {cardStyle}
      {containerStyle}
    </Grid>
  )
}

export default InfoBox
