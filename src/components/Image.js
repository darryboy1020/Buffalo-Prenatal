import React from 'react'
import css from 'styled-jsx/css'
import Grid from '@material-ui/core/Grid'

const Image = ({ href, alt = '' }) => {
  const baseURL = href ? `${window.location.origin}/public/images/` : null

  const image = baseURL ? `${baseURL}${href}` : null

  const { className: imageClass, styles: imageStyle } = css.resolve`
    * {
      max-width: 100%;
    }
  `

  return (
    <Grid container>
      <img className={imageClass} src={image} alt={alt}></img>
      {imageStyle}
    </Grid>
  )
}

export default Image
