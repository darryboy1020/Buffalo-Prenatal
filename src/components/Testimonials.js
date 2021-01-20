import React from 'react'
import css from 'styled-jsx/css'
import Grid from '@material-ui/core/Grid'
import Image from './Image'
import Typography from '@material-ui/core/Typography'

const Testimonials = ({
  href,
  alt = '',
  href_2,
  alt_2 = '',
  quote,
  quote_1,
  author,
  credit,
}) => {
  const { className: containerClass, styles: containerStyle } = css.resolve`
    * {
      background-color: #4854a8;
      color: #fff;
      padding: 2rem;
    }
  `

  const { className: quoteClass, styles: quoteStyle } = css.resolve`
    * {
      word-break: break-word;
    }
  `

  return (
    <div className={containerClass}>
      <Grid container justify='center' spacing={4}>
        <Grid className={quoteClass} item xs={12}>
          <Typography align='center' variant='h2'>
            {quote_1}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={4} item>
              <Image href={href} alt={alt} />
            </Grid>

            <Grid className={quoteClass} item xs={12} sm={8}>
              <Typography paragraph variant='h3'>
                {quote}
              </Typography>
              <Typography variant='h5'>{author}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item xs={12}>
              <Typography paragraph variant='h5'>
                {credit}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Image href={href_2} alt={alt_2} />
            </Grid>
          </Grid>
        </Grid>
        {containerStyle}
        {quoteStyle}
      </Grid>
    </div>
  )
}

export default Testimonials
