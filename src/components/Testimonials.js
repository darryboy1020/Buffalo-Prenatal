import React from 'react'
import css from 'styled-jsx/css'
import Grid from '@material-ui/core/Grid'
import Image from './Image'
import Box from '@material-ui/core/Box'
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
      padding: 100px 190px;
    }
  `
  //   const { className: paragraphClass, styles: paragraphStyle } = css.resolve`
  //   * {
  //
  //     color: #fff;
  //   }
  // `
  const { className: imageClass, styles: imageStyle } = css.resolve`
    * {
      width: 100%;
      height: 100%;
      justify: 'center';
    }
  `

  return (
    <div className={containerClass}>
      <Grid container justify='center' spacing={4}>
        <Grid item xs={12} />
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant='h2' className={containerStyle.title}>
            {quote_1}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <div className={imageClass}>
            <Image href={href} alt={alt} />
          </div>
        </Grid>
        <Grid
          item
          container
          direction='row'
          justify='center'
          alignItems='center'
          xs={9}
        >
          <Typography paragraph variant='h3' className={containerStyle.title}>
            {quote}
          </Typography>
          <Typography variant='h5' className={containerStyle.title}>
            {author}
          </Typography>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
      <Grid item container xs={12}>
        <Typography paragraph variant='h5' className={containerStyle.title}>
          {credit}
        </Typography>
      </Grid>
      <Grid item container spacing={4} xs={3}>
        <br />
        <div className={imageClass}>
          <Image href={href_2} alt={alt_2} />
        </div>
      </Grid>

      {containerStyle}
      {imageStyle}
    </div>
  )
}

export default Testimonials
