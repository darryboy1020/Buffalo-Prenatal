import React, { useState } from 'react'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import css from 'styled-jsx/css'
import Image from './Image'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import useBreakpoint from '../hooks/useBreakpoint'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import Slide from '@material-ui/core/Slide'
import AppBar from '@material-ui/core/AppBar'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import MailIcon from '@material-ui/icons/Mail'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListAltIcon from '@material-ui/icons/ListAlt'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'
import HomeIcon from '@material-ui/icons/Home'
const NaviBar = ({ title, href, alt = '', buttonText, drawerItems }) => {
  const breakpoint = useBreakpoint()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const trigger = useScrollTrigger()

  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  const renderDrawer = () => {
    return (
      <Drawer
        variant='temporary'
        open={drawerOpen}
        anchor='bottom'
        onEscapeKeyDown={closeDrawer}
        onBackdropClick={closeDrawer}
      >
        <List>
          {drawerItems.map(({ text, href, icon }) => {
            const getIcon = (icon) => {
              const arrIcon = {
                survey: <ListAltIcon />,
                home: <HomeIcon />,
                contact: <ContactSupportIcon />,
              }

              return arrIcon[icon]
            }
            return (
              <ListItem button component={Link} to={href} key={text}>
                <ListItemIcon>{getIcon(icon)}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          })}
        </List>
      </Drawer>
    )
  }
  const renderButton = () => {
    return (
      <Grid className={buttonClass} item sm={4}>
        <Button variant='contained' component={Link} to='/survey'>
          {buttonText}
        </Button>
      </Grid>
    )
  }

  const renderHamburger = () => {
    return (
      <Grid item sm={4}>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={() => {
            setDrawerOpen(!drawerOpen)
          }}
          edge='start'
        >
          <MenuIcon />
        </IconButton>
        {renderDrawer()}
      </Grid>
    )
  }

  const { className: containerClass, styles: containerStyle } = css.resolve`
    * {
      background-color: #4854a8;
      min-height: 5rem;
    }
  `
  const { className: textClass, styles: textStyle } = css.resolve`
    * {
      color: #fff;
      font-size: 18.75px;
      font-weight: 400;
      padding-left: 15%;
    }
  `
  const { className: imageClass, styles: imageStyle } = css.resolve`
    * {
      height: 4rem;
      padding-left: 1rem;
    }

    @media only screen and (min-width: 600px) {
      padding-left: 2rem;
    }
  `
  const { className: buttonClass, styles: buttonStyle } = css.resolve`
    * {
      display: initial;
      text-align: center;
    }
  `

  return (
    <Slide direction='down' in={!trigger}>
      <AppBar
        position={breakpoint !== 'xs' ? 'static' : 'sticky'}
        className={containerClass}
      >
        <Grid container alignItems='center' className={containerClass}>
          <Grid className={imageClass} xs={3} sm={4} item>
            <Link className={imageClass} to='/'>
              <Image inherit href={href} alt={alt} />
            </Link>
          </Grid>
          <Grid item xs={9} sm={8}>
            <Grid
              container
              direction={breakpoint === 'xs' ? 'row-reverse' : 'row'}
            >
              {breakpoint === 'xs' ? null : (
                <Grid item sm={8}>
                  <Typography variant='h6' className={textClass}>
                    {title}
                  </Typography>
                </Grid>
              )}

              {buttonText && !(breakpoint === 'xs')
                ? renderButton()
                : renderHamburger()}
              {containerStyle}
              {textStyle}
              {imageStyle}
              {buttonStyle}
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
    </Slide>
  )
}

export default NaviBar
