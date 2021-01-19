import React from 'react'
import css from 'styled-jsx/css'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Image from './Image'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const NaviBar = ({ title, href, alt = '' }) => {
  const { className: containerClass, styles: containerStyle } = css.resolve`
    * {
      background-color: #282e78;
      color: #fff;
    }
  `
  const { className: buttonClass, styles: buttonStyle } = css.resolve`
    * {
      color: #fff;
    }
  `
  const { className: imageClass, styles: imageStyle } = css.resolve`
    * {
      width: 50%;
      height: 50%;
    }
  `

  return (
    <div className={containerClass}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={buttonClass}
            color='inherit'
            aria-label='menu'
          >
            <Grid item>
              <div className={imageClass}>
                <Image href={href} alt={alt} />
              </div>
            </Grid>
          </IconButton>
          {/* <Typography variant='h6' className={containerStyle}>
            {title}
          </Typography> */}
        </Toolbar>
      </AppBar>
      {containerStyle}
      {buttonStyle}
      {imageStyle}
    </div>
  )
}

export default NaviBar
