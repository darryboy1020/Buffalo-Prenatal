import React, { Fragment } from 'react'
import css from 'styled-jsx/css'

const Image = ({ href, alt = '', inherit }) => {
  const baseURL = href ? `${window.location.origin}/public/images/` : null

  const image = baseURL ? `${baseURL}${href}` : null

  const { className: imageClass, styles: imageStyle } = css.resolve`
    * {
      max-width: 100%;
      height: ${inherit ? 'inherit' : 'initial'};
    }
  `

  return (
    <Fragment>
      <img className={imageClass} src={image} alt={alt}></img>
      {imageStyle}
    </Fragment>
  )
}

export default Image
