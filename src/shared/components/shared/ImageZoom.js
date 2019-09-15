import s from 'styled-components'

export const ImageZoom = s.img`
transition-duration: 0.7s;
&:hover{
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    z-index: 0;
}

`
