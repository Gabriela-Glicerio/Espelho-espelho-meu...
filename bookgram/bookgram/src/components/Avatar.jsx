function Avatar({ src, name, className = 'post__avatar' }) {
  return (
    <span className={`avatar ${className}`} aria-label={`Foto de ${name}`}>
      {name[0]}
      <img src={src} alt="" onError={(e) => { e.currentTarget.style.display = 'none' }} />
    </span>
  )
}
export default Avatar
