import { useState } from 'react'
import Header from './components/Header'
import Post from './components/Post'
import Stories from './components/Stories'
import Books from './components/Books'
import Profile from './components/Profile'
import posts from './data/posts.json'
import './App.css'

const ME = { user: 'Ana Lúcia', handle: 'ana.fantasia', avatar: '/images/avatars/ana.jpg', genres: ['Fantasia', 'Romance', 'HQs e mangás'],
  bio: 'Leitora de fantasia, colecionadora de marcadores e defensora de finais felizes. 🐉📚' }
const users = [...new Map(posts.map((p) => [p.handle, p])).values()]

function App() {
  const [tab, setTab] = useState('feed')
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState([])
  const q = query.trim().toLowerCase()
  const shown = posts.filter((p) => !q || [p.user, p.handle, p.category, p.caption].some((s) => s.toLowerCase().includes(q)))
  const toggleBook = (id) => setSaved(saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id])

  return (
    <div className="app">
      <Header tab={tab} onTab={setTab} query={query} onQuery={setQuery} />
      <main className="layout">
        {tab === 'feed' && (
          <>
            <Stories users={users} />
            <section className="feed" aria-label="Feed de publicações">
              {shown.length ? shown.map((post) => <Post key={post.id} post={post} />) : <p className="empty">Nada encontrado para “{query}”. Tente um gênero, como Fantasia ou Terror.</p>}
            </section>
          </>
        )}
        {tab === 'books' && <Books list={saved} onToggle={toggleBook} />}
        {tab === 'profile' && <Profile me={ME} posts={posts} saved={saved} />}
      </main>
    </div>
  )
}
export default App
