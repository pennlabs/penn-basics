import s from 'styled-components'

const Search = s.input`
  background: #fff url(https://static.tumblr.com/ftv85bp/MIXmud4tx/search-icon.png) no-repeat 9px center;
  border: none;
  padding: 9px 10px 9px 32px;
  width: 55px;
	
  -webkit-border-radius: 10em;
  -moz-border-radius: 10em;
  border-radius: 10em;
	
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  transition: all .5s;
  width: 15px;
  padding-left: 30px;
  color: transparent;
  cursor: pointer;
  :hover {
    background-color: #ededed;
  }

  :focus {
    width: 150px;
	padding-left: 32px;
	color: #000;
	background-color: #fff;
	cursor: auto;
  }
`

export default Search
