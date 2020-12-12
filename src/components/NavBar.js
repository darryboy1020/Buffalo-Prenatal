import React from 'react'
import Grid from '@material-ui/core'

const NavBar = ({ items }) => {
  return (
    <Grid container>
      {items.map(({ text, link }) => {
        return (
          <Grid item>
            <a href={link}>{text}</a>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default NavBar
