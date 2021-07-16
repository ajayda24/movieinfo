import styled from 'styled-components'
import Link from 'next/link'

const Navbar = (props) => {
  return (
    <Container>
      <Nav>
        <div className='left'>
          <li>
            <StyledLink href='/'>
              <a>AJ</a>
            </StyledLink>
          </li>
        </div>
        <div className='right'>
          <li>
            <StyledLink href='https://github.com/ajayda24'>
              <img
                src='https://img.icons8.com/ios-glyphs/35/ffffff/github.png'
                alt=''
              />
            </StyledLink>
          </li>
          <li>
            <StyledLink href='https://www.linkedin.com/in/ajay-daniel-trevor-1bb7951b1/'>
              <img
                src='https://img.icons8.com/fluent/35/000000/linkedin.png'
                alt=''
              />
            </StyledLink>
          </li>
        </div>
      </Nav>
    </Container>
  )
}

export default Navbar

const Container = styled.div`
  width: 100%;
  height: 10vh;
  background-color: #344e76;
  color: aliceblue;
  /* position:fixed; */
`
const Nav = styled.nav`
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  padding: 1em 2em;
  & li {
    list-style: none;
    margin: 0 1.5rem;
  }
  & .right {
    display: flex;
    & li:focus,
    li:hover,
    .activeLink {
      outline: none;
      border-bottom: 2px solid aliceblue;
    }
  }
`

const StyledLink = styled(Link)`
  outline: none;
`
