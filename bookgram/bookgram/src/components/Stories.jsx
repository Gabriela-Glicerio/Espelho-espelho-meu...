import { useState } from 'react'
import Avatar from './Avatar'

function Stories({ users }) {
  const [seen, setSeen] = useState([])
  const [active, setActive] = useState(null)
  return (
    <section className="stories" aria-label="Stories">
      {users.map((u) => (
        <button key={u.handle} type="button" className={`story ${seen.includes(u.handle) ? 'is-seen' : ''}`}
          onClick={() => { setActive(u); setSeen([...seen, u.handle]) }}>
          <Avatar src={u.avatar} name={u.user} className="story__ring" />
          <span>{u.handle}</span>
        </button>
      ))}
      {active && (
        <div className="modal" role="dialog" aria-label={`Story de ${active.user}`} onClick={() => setActive(null)}>
          <div className="story-view"><strong>{active.user}</strong><p>{active.caption}</p><small>Toque para fechar</small></div>
        </div>
      )}
    </section>
  )
}
export default Stories
