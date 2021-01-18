import React from 'react'
import css from 'styled-jsx/css'
import Grid from '@material-ui/core/Grid'
import Image from './Image'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

const Testimonials = ({ href, alt = '', quote, author }) => {
  const { className: containerClass, styles: containerStyle } = css.resolve`
    * {
      background-color: #282e78;
      color: #fff;
    }
  `
  const { className: imageClass, styles: imageStyle } = css.resolve`
    * {
      width: 100%;
      height: 100%;
      justify: 'center';
    }
  `

  return (
    <div className={containerClass}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant='h6' className={containerStyle.title}>
            {quote}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <div className={imageClass}>
            <Image href={href} alt={alt} />
          </div>
        </Grid>
        <Grid item xs={9}>
          <Typography variant='h6' className={containerStyle.title}>
            {quote}
          </Typography>
          <Typography variant='h5' className={containerStyle.title}>
            {author}
          </Typography>
        </Grid>
      </Grid>
      {containerStyle}
      {imageStyle}
    </div>
  )
}

export default Testimonials
