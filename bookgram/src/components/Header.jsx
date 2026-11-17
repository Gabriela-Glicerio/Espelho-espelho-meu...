import { useState } from 'react'
import { FiBell, FiBookOpen, FiHome, FiSearch, FiUser } from 'react-icons/fi'

const TABS = [['feed', 'Início', FiHome], ['books', 'Para sua próxima leitura', FiBookOpen], ['profile', 'Perfil', FiUser]]
const NOTES = ['Léo Debug curtiu sua publicação 💜', 'Capitu Moderna começou a seguir você', 'Há 3 novas recomendações de fantasia para você']

function Header({ tab, onTab, query, onQuery }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <button className="header__logo" type="button" onClick={() => onTab('feed')}>BookGram</button>
      <label className="header__search">
        <FiSearch aria-hidden />
        <input type="search" value={query} placeholder="Pesquisar pessoas, livros, gêneros"
          aria-label="Pesquisar" onChange={(e) => { onQuery(e.target.value); onTab('feed') }} />
      </label>
      <nav className="header__actions" aria-label="Navegação principal">
        {TABS.map(([id, label, Icon]) => (
          <button key={id} type="button" className={`icon-button ${tab === id ? 'is-active' : ''}`}
            aria-label={label} title={label} aria-current={tab === id} onClick={() => onTab(id)}><Icon /></button>
        ))}
        <div className="notif">
          <button type="button" className="icon-button" aria-label="Notificações" aria-expanded={open} onClick={() => setOpen(!open)}><FiBell /></button>
          {open && <ul className="notif__list">{NOTES.map((n) => <li key={n}>{n}</li>)}</ul>}
        </div>
      </nav>
    </header>
  )
}
export default Header
