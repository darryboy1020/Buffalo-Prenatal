import React from 'react'
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

  return (
    <Grid
      direction={getImageStyle(imagePlacement)}
      alignItems='center'
      container
    >
      <Grid item sm={12} md={6}>
        <Typography variant='h5'>{text}</Typography>
      </Grid>
      <Grid item sm={12} md={6}>
        <Image href={href} alt={alt} />
      </Grid>
    </Grid>
  )
}

export default ArticleWithImage
