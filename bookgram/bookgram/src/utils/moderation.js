const BLOCKED = ['idiota','burro','burra','imbecil','lixo','otario','otaria','feio','feia','gordo','gorda','macaco','retardado','ridiculo','cala a boca','odeio voce','vai se ferrar','nojento','nojenta']
export const WARNING = 'Ei, leitor! 💜 Aqui no BookGram, opiniões diferentes são bem-vindas, mas o desrespeito não. Vamos manter nossa comunidade acolhedora!'
const norm = (t) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
export const isOffensive = (text) => { const n = norm(text); return BLOCKED.some((w) => n.includes(w)) }
