import { Link } from './Link'
import { MenuContainer } from './styled'

export const Menu = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Produto', path: '/product' },
    { name: 'Categoria', path: '/cathegory' },
    { name: 'Images', path: '/images' },
  ]
  return (
    <MenuContainer>
      <h2 style={{ alignSelf: 'center' }}>Imagens Arte</h2>
      {links.map((l) => (
        <Link key={l.path} to={l.path}>
          {l.name}
        </Link>
      ))}
    </MenuContainer>
  )
}
