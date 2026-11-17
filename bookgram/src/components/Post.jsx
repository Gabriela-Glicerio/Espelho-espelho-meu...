import { useState } from 'react'
import { FiBookmark, FiFlag, FiHeart, FiMessageCircle, FiMoreHorizontal, FiSend, FiThumbsDown } from 'react-icons/fi'
import Avatar from './Avatar'
import { WARNING, isOffensive } from '../utils/moderation'

function Post({ post }) {
  const [reaction, setReaction] = useState(null)
  const [saved, setSaved] = useState(false)
  const [comments, setComments] = useState(post.comments || [])
  const [showComments, setShowComments] = useState(false)
  const [text, setText] = useState('')
  const [warning, setWarning] = useState('')
  const [menu, setMenu] = useState(false)
  const [reported, setReported] = useState(false)
  const [copied, setCopied] = useState(false)

  const toggle = (r) => setReaction(reaction === r ? null : r)
  const likes = post.likes + (reaction === 'like' ? 1 : 0)
  const dislikes = post.dislikes + (reaction === 'dislike' ? 1 : 0)

  const submit = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    if (isOffensive(t)) return setWarning(WARNING)
    setWarning(''); setComments([...comments, { user: 'voce', text: t }]); setText('')
  }
  const reportComment = (i) => setComments(comments.map((c, j) => (j === i ? { ...c, reported: true } : c)))
  const share = async () => {
    try { await navigator.clipboard.writeText(`${post.user} no BookGram: ${post.caption}`) } catch { /* sem clipboard */ }
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  if (reported) return <article className="post post--reported"><p>Publicação denunciada. Obrigado por cuidar da comunidade 💜 Nossa equipe vai analisar.</p><button type="button" className="chip" onClick={() => setReported(false)}>Desfazer</button></article>

  return (
    <article className="post">
      <header className="post__header">
        <Avatar src={post.avatar} name={post.user} />
        <div className="post__user"><strong>{post.user}</strong><span>{post.location}</span></div>
        <span className="tag">{post.category}</span>
        <div className="notif">
          <button className="icon-button" type="button" aria-label="Mais opções" aria-expanded={menu} onClick={() => setMenu(!menu)}><FiMoreHorizontal /></button>
          {menu && <ul className="notif__list"><li><button type="button" className="link-button" onClick={() => setReported(true)}><FiFlag /> Denunciar publicação</button></li></ul>}
        </div>
      </header>
      <div className="post__media"><img className="post__image" src={post.image} alt={post.alt} onError={(e) => { e.currentTarget.style.display = 'none' }} /><span aria-hidden>{post.category}</span></div>
      <div className="post__content">
        <div className="post__actions">
          <button className={`icon-button ${reaction === 'like' ? 'is-liked' : ''}`} type="button" aria-label="Curtir" aria-pressed={reaction === 'like'} onClick={() => toggle('like')}><FiHeart /></button>
          <button className={`icon-button ${reaction === 'dislike' ? 'is-disliked' : ''}`} type="button" aria-label="Não curtir" aria-pressed={reaction === 'dislike'} onClick={() => toggle('dislike')}><FiThumbsDown /></button>
          <button className="icon-button" type="button" aria-label="Comentar" onClick={() => setShowComments(!showComments)}><FiMessageCircle /></button>
          <button className="icon-button" type="button" aria-label="Compartilhar" onClick={share}><FiSend /></button>
          <button className={`icon-button ${saved ? 'is-saved' : ''}`} type="button" aria-label="Salvar" aria-pressed={saved} onClick={() => setSaved(!saved)}><FiBookmark /></button>
        </div>
        <p className="post__likes"><strong>{likes} curtidas</strong> · {dislikes} descurtidas {copied && <em className="copied">Texto copiado!</em>}</p>
        <p className="post__caption"><strong>{post.user}</strong>{post.caption}</p>
        <button type="button" className="link-button muted" onClick={() => setShowComments(!showComments)}>
          {showComments ? 'Ocultar comentários' : `Ver ${comments.length} comentário${comments.length === 1 ? '' : 's'}`}
        </button>
        {showComments && (
          <ul className="comments">
            {comments.map((c, i) => (
              <li key={i}>{c.reported ? <em className="muted">Comentário denunciado.</em> : <><span><strong>{c.user}</strong> {c.text}</span>
                <button type="button" className="icon-button small" aria-label="Denunciar comentário" onClick={() => reportComment(i)}><FiFlag /></button></>}</li>
            ))}
          </ul>
        )}
        <form className="comment-form" onSubmit={submit}>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Adicione um comentário gentil..." aria-label="Comentário" />
          <button type="submit" className="chip" disabled={!text.trim()}>Publicar</button>
        </form>
        {warning && <p className="warning" role="alert">{warning}</p>}
      </div>
    </article>
  )
}
export default Post
