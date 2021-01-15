import React from 'react'
import css from 'styled-jsx/css'
import Grid from '@material-ui/core/Grid'
import Image from './Image'

const BackdropSite = ({ href, alt = '' }) => {
  const { className: containerClass, styles: containerStyle } = css.resolve`
    * {
      /* background-color: #282e78; */
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
        <Grid item>
          <div className={imageClass}>
            <Image href={href} alt={alt} />
          </div>
        </Grid>
      </Grid>
      {containerStyle}
      {imageStyle}
    </div>
  )
}

export default BackdropSite
