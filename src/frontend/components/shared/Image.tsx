import React from 'react'
import s from 'styled-components'

export const Image = s.img`
  width: 100%;
  display: block;
  margin-bottom: ${({ marginBottom }) => marginBottom || '1rem'};
`

const ImageZoomImg = s.img`
  transition-duration: 0.7s;
  max-width: 100%;
  &:hover{
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    z-index: 0;
  }
`

export const ImageZoom = props => (
  <div style={{ overflow: 'hidden', width: '100%' }}>
    <ImageZoomImg {...props} />
  </div>
)
