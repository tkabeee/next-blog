import Link from 'next/link'
import styled from 'styled-components'

const NavBar = styled.nav`
  position: sticky;
  top: 0;
  z-index: var(--zindex-sticky);
  padding: var(--navbar-padding-vertical) var(--navbar-padding-horizontal);
  width: 100%;
  height: var(--navbar-height);
  background-color: var(--navbar-background-color);
`

const NavBarInner = styled.div``
const NavBarItems = styled.div``
const NavBarTitle = styled.strong``

export const Header = () => {
  return (
    <header>
      <NavBar>
        <NavBarInner>
          <NavBarItems>
            <Link href={'/'} as={'/'} key={1}>
              <a className='flex items-center mr-12'>
                <NavBarTitle>Next Blog</NavBarTitle>
              </a>
            </Link>
          </NavBarItems>
        </NavBarInner>
      </NavBar>
    </header>
  )
}
