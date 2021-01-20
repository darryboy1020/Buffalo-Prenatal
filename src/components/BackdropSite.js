import React from 'react'
import css from 'styled-jsx/css'
import Grid from '@material-ui/core/Grid'
import Image from './Image'
import Typography from '@material-ui/core/Typography'

const BackdropSite = ({ href, alt = '', quote }) => {
  const { className: containerClass, styles: containerStyle } = css.resolve`
    * {
      /* background-color: #282e78; */
      color: #fff;
      word-break: break-word;
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
      <Grid container justify='center'>
        <Grid item xs={6}>
          <div className={imageClass}>
            <Image href={href} alt={alt} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <Typography paragraph variant='h6' className={containerStyle.title}>
            {quote}
          </Typography>
        </Grid>
      </Grid>
      {containerStyle}
      {imageStyle}
    </div>
  )
}

export default BackdropSite
