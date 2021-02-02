import React from 'react'
import css from 'styled-jsx/css'
import Grid from '@material-ui/core/Grid'
import Image from './Image'
import Typography from '@material-ui/core/Typography'

const ArticleWithImage = ({ href, alt, text, imagePlacement = 'right' }) => {
  const getImageStyle = (imagePlacement) => {
    switch (imagePlacement) {
      case 'left':
        return 'row-reverse'
      case 'top':
        return 'column-reverse'
      case 'bottom':
        return 'column'
      default:
        return 'row'
    }
  }
  const { className: quoteClass, styles: quoteStyle } = css.resolve`
    * {
      font-family: Helvetica;
      color: #000000;
      padding: 2rem;
    }
  `

  return (
    <Grid
      direction={getImageStyle(imagePlacement)}
      alignItems='center'
      container
    >
      <Grid item sm={12} md={6} className={quoteClass}>
        <Typography variant='h2'>{text}</Typography>
      </Grid>
      <Grid item sm={12} md={6}>
        <Image href={href} alt={alt} />
      </Grid>
      {quoteStyle}
    </Grid>
  )
}

export default ArticleWithImage
