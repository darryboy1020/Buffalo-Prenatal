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
  const { className: imageClass, styles: imageStyle } = css.resolve`
    * {
      max-height: 100%;
      max-width: 100%;
      /* position: 'absolute'; */
      /* padding: 8rem; */
    }
  `

  return (
    <div>
      {/* //   direction={getImageStyle(imagePlacement)}
    //   alignItems='center'

    //   container
    // >
    //   <Grid item sm={12} md={6} className={quoteClass}>
    //     
    //   </Grid></Grid>{quoteStyle} */}
      <Grid
        item
        sm={12}
        md={6}
        justify='center'
        alignItems='center'
        className={imageClass}
      >
        <Image href={href} alt={alt}>
          <Typography variant='h2'>{text}</Typography>
        </Image>
      </Grid>
      {imageStyle}
    </div>
  )
}

export default ArticleWithImage
