export const sortByDateDesc = (list) => [...list].sort((a, b) => new Date(b.date) - new Date(a.date))
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
