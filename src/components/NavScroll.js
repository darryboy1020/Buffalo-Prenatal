import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'
import css from 'styled-jsx/css'
import Typography from '@material-ui/core/Typography'

const NavScroll = ({ items, variant }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 128) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const { className: containerClass, styles: containerStyle } = css.resolve`
    * {
      border: blue solid 0.2rem;
      position: sticky;
      top: 4rem;
      float: right;
      max-width: 14rem;
      display: ${scrolled ? 'initial' : 'none'};
    }

    @media only screen and (max-width: 600px) {
      display: none;
    }
  `

  const {
    className: itemContainerClass,
    styles: itemContainerStyle,
  } = css.resolve`
    * {
      border-bottom: blue solid 0.2rem;
      min-height: 2rem;
      text-align: right;
      cursor: pointer;
    }

    *:last-child {
      border-bottom: none;
    }
  `

  return (
    <Fade in={scrolled} timeout={1000}>
      <Grid className={containerClass} container>
        {items.map(({ text, executeScroll = () => {} }, index) => {
          return (
            <Grid key={`${text}-${index}`} className={itemContainerClass} item>
              <div onClick={executeScroll}>
                <Typography variant={variant}>{text}</Typography>
              </div>
            </Grid>
          )
        })}
        {containerStyle}
        {itemContainerStyle}
      </Grid>
    </Fade>
  )
}

export default NavScroll
