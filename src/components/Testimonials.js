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
      padding: 8rem;
    }
  `

  const { className: quoteClass, styles: quoteStyle } = css.resolve`
    * {
      word-break: break-word;
    }
  `

  const { className: top_textClass, styles: top_textStyle } = css.resolve`
    * {
      background-color: #4854a8;
      color: #fff;
      margin: 5rem 0rem 0rem 0rem;
      padding: 2rem;
      word-break: break-word;
    }
  `

  const { className: logoClass, styles: logoStyle } = css.resolve`
    * {
      background-color: #4854a8;
      color: #fff;
      margin: 2rem;
      padding: 2rem;
      word-break: break-word;
      height: 1%;
      width: 10%;
    }
  `

  const { className: logo_imageClass, styles: logo_imageStyle } = css.resolve`
    * {
      height: 10%;
      width: 10%;
    }
  `

  return (
    <div className={containerClass}>
      <Grid container justify='center' spacing={3}>
        <Grid item className={top_textClass} xs={12}>
          <Typography align='center' variant='h2'>
            {quote_1}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid xs={12} sm={2} item>
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
        <Grid
          item
          container
          className={logoClass}
          direction='column'
          justify='center'
          alignItems='flex-end'
          xs={6}
          sm={12}
        >
          <Grid item xs={3}>
            <Typography variant='h6'>{credit}</Typography>
          </Grid>
          <Grid item className={logo_imageClass} xs={6} sm={3}>
            <Image href={href_2} alt={alt_2} />
          </Grid>
        </Grid>
        {containerStyle}
        {quoteStyle}
        {top_textStyle}
        {logoStyle}
        {logo_imageStyle}
      </Grid>
    </div>
  )
}

export default Testimonials
