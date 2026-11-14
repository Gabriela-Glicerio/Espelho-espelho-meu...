import Avatar from './Avatar'
import Post from './Post'
import books from '../data/books.json'

function Profile({ me, posts, saved }) {
  const mine = posts.filter((p) => p.handle === me.handle)
  const favs = books.filter((b) => saved.includes(b.id))
  return (
    <section className="profile" aria-label="Perfil">
      <div className="profile__top">
        <Avatar src={me.avatar} name={me.user} className="profile__avatar" />
        <div><h2>{me.user}</h2><p className="muted">@{me.handle}</p><p>{me.bio}</p>
          <p><strong>{mine.length}</strong> publicações</p></div>
      </div>
      <h3>Livros favoritos</h3>
      <ul className="chips">{(favs.length ? favs : books.slice(0, 1)).map((b) => <li className="tag" key={b.id}>{b.title}</li>)}</ul>
      <p className="muted">{favs.length ? 'Sua lista de leitura aparece aqui.' : 'Salve livros em “Para sua próxima leitura” para vê-los aqui.'}</p>
      <h3>Gêneros preferidos</h3>
      <ul className="chips">{me.genres.map((g) => <li className="tag" key={g}>{g}</li>)}</ul>
      <h3>Publicações</h3>
      <div className="feed feed--inner">{mine.map((p) => <Post key={p.id} post={p} />)}</div>
    </section>
  )
}
export default Profile
