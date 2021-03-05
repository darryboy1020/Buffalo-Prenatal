import React from 'react'
import css from 'styled-jsx/css'
import Grid from '@material-ui/core/Grid'
import Image from './Image'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const ContactUs = ({
  top_text,
  youtube_logo,
  alt_y,
  link_y,
  facebook_logo,
  alt_f,
  link_f,
  twitter_logo,
  alt_t,
  link_t,
  insta_logo,
  alt_i,
  link_i,
  email_logo,
  alt_e,
  text_email,
  phone_logo,
  alt_p,
  text_phone,
}) => {
  const { className: containerClass, styles: containerStyle } = css.resolve`
    * {
      background-color: #8bd5ff;
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
      color: #fff;
      margin: 0rem 0rem 5rem 0rem;
      padding: 2rem;
      word-break: break-word;
    }
  `

  const { className: youtubeLogoClass, styles: youtubeLogoStyle } = css.resolve`
    * {
      margin: 2rem;
      padding: 2rem;
      word-break: break-word;
      height: 1%;
      width: 10%;
    }
  `
  const {
    className: facebookLogoClass,
    styles: facebookLogoStyle,
  } = css.resolve`
    * {
      margin: 2rem;
      padding: 2rem;
      word-break: break-word;
      max-height: 200%;
      max-width: 200%;
    }
  `
  const { className: twitterLogoClass, styles: twitterLogoStyle } = css.resolve`
    * {
      margin: 2rem;
      padding: 2rem;
      word-break: break-word;
      height: 1%;
      width: 10%;
    }
  `
  const { className: instaLogoClass, styles: instaLogoStyle } = css.resolve`
    * {
      margin: 2rem;
      padding: 2rem;
      word-break: break-word;
      height: 1%;
      width: 10%;
    }
  `

  const { className: phone_imageClass, styles: phone_imageStyle } = css.resolve`
    * {
      height: 10%;
      width: 10%;
    }
  `
  const { className: email_imageClass, styles: email_imageStyle } = css.resolve`
    * {
      height: 10%;
      width: 10%;
    }
  `

  return (
    <div className={containerClass}>
      <Grid container justify='center' spacing={3}>
        {/* -----Contact Us top text on top row----- */}
        <Grid item className={top_textClass} xs={12}>
          <Typography align='center' variant='h2'>
            {top_text}
          </Typography>
        </Grid>
        {/* -----social media logos with links on 2nd row-----*/}
        <Grid item container xs={12} justify='center'>
          {/* youtube play button logo w/link */}
          <Grid item xs={2} sm={2} spacing={3} className={youtubeLogoClass}>
            <a href={link_y}>
              <Image href={youtube_logo} alt={alt_y} />
            </a>
          </Grid>
          {/* facebook small logo w/link */}
          <Grid item xs={2} sm={2} spacing={3} className={facebookLogoClass}>
            <a href={link_f}>
              <Image href={facebook_logo} alt={alt_f} />
            </a>
          </Grid>
          {/* twitter bird logo w/link */}
          <Grid item xs={2} sm={2} spacing={3} className={twitterLogoClass}>
            <a href={link_t}>
              <Image href={twitter_logo} alt={alt_t} />
            </a>
          </Grid>
          {/* instagram small logo w/link */}
          <Grid item xs={2} sm={2} spacing={3} className={instaLogoClass}>
            <a href={link_i}>
              <Image href={insta_logo} alt={alt_i} />
            </a>
          </Grid>
        </Grid>
        {/* -----email and phone logos on 3rd row----- */}
        <Grid
          item
          container
          xs={6}
          justify='center'
          direction='column'
          alignItems='center'
          className={email_imageClass}
        >
          {/* email image w/bottom address */}
          <Grid item xs={12} sm={2} spacing={3}>
            <Image href={email_logo} alt={alt_e} />
          </Grid>
          <Grid item xs={12} sm={2} spacing={3}>
            <Typography variant='h6'>{text_email}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={6}
          justify='center'
          direction='column'
          alignItems='center'
          className={phone_imageClass}
        >
          {/* smartphone image w/bottom # number */}
          <Grid item xs={12} sm={2} spacing={3}>
            <Image href={phone_logo} alt={alt_p} />
          </Grid>
          <Grid item xs={12} sm={2} spacing={3} alignItems='stretch'>
            <Typography variant='h6'>{text_phone}</Typography>
          </Grid>
        </Grid>
        {containerStyle}
        {quoteStyle}
        {top_textStyle}
        {youtubeLogoStyle}
        {facebookLogoStyle}
        {twitterLogoStyle}
        {instaLogoStyle}
        {phone_imageStyle}
        {email_imageStyle}
      </Grid>
    </div>
  )
}

export default ContactUs
