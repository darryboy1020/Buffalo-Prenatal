import React from 'react'
import Grid from '@material-ui/core/Grid'
import css from 'styled-jsx/css'

const ArticleWithImage = ({ href, alt, text, video }) => {
  const { className: videoClass, styles: videoStyle } = css.resolve`
    * {
      position: 'absolute';
      width: 100%;
      left: 50%;
      top: 50%;
      height: 100%;
      object-fit: cover;
      /* transform: translate(-50%, -50%); */
      justify: 'center';
    }
  `

  return (
    <div className={videoClass}>
      <Grid
        // direction={getImageStyle(imagePlacement)}
        alignItems='center'
        container
      >
        <Grid item sm={12} md={6}>
          <video autoPlay loop muted>
            <source src={video} type='video/mp4' />
          </video>
        </Grid>
        {/* <Grid item sm={12} md={6}>
          <Typography variant='h5'>{text}</Typography>
        </Grid>
        <Grid item sm={12} md={6}>
          <Image href={href} alt={alt} />
        </Grid> */}
      </Grid>
      {videoStyle}
    </div>
  )
}

export default ArticleWithImage
