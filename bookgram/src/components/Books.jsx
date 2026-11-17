import { useState } from 'react'
import { FiBookmark, FiStar } from 'react-icons/fi'
import books from '../data/books.json'

export const GENRES = ['Todos', ...new Set(books.map((b) => b.genre))]

function Books({ list, onToggle }) {
  const [genre, setGenre] = useState('Todos')
  const shown = books.filter((b) => genre === 'Todos' || b.genre === genre)
  return (
    <section aria-label="Para sua próxima leitura">
      <h2 className="title">Para sua próxima leitura</h2>
      <div className="chips">{GENRES.map((g) => <button key={g} type="button" className={`chip ${g === genre ? 'is-on' : ''}`} onClick={() => setGenre(g)}>{g}</button>)}</div>
      <div className="books">
        {shown.map((b) => (
          <article className="book" key={b.id}>
            <div className="book__cover"><img src={b.cover} alt={`Capa de ${b.title}`} onError={(e) => { e.currentTarget.style.display = 'none' }} /><span>{b.title}</span></div>
            <div><h3>{b.title}</h3><p className="muted">{b.author}</p><span className="tag">{b.genre}</span>
              <p>{b.description}</p><p className="rating"><FiStar /> {b.rating.toFixed(1)}</p>
              <button type="button" className={`chip ${list.includes(b.id) ? 'is-on' : ''}`} onClick={() => onToggle(b.id)}><FiBookmark /> {list.includes(b.id) ? 'Na sua lista' : 'Salvar na lista de leitura'}</button></div>
          </article>
        ))}
      </div>
    </section>
  )
}
export default Books
