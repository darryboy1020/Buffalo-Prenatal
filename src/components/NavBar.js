import React from 'react'
import Grid from '@material-ui/core/Grid'

const NavBar = ({ items, ass = 'flex-start' }) => {
  return (
    <Grid container justify={ass}>
      {items.map(({ text, link }) => {
        return (
          <Grid key={`${text}-${link}`} item>
            <a href={link}>{text}</a>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default NavBar
