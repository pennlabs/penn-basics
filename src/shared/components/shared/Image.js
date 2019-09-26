import s from 'styled-components'

export const Image = s.img`
  width: 100%;
  display: block;
  margin-bottom: ${({ marginBottom }) => marginBottom || '1rem'};
`

export const ImageZoom = s.img`
transition-duration: 0.7s;
max-width: 100%;
&:hover{
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    z-index: 0;
}
`
