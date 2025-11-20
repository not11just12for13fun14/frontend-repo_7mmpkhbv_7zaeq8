import { useEffect, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL

export default function Catalog() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    fetch(`${BACKEND}/products`)
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]))
  }, [])

  const search = async () => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (category) params.set('category', category)
    const res = await fetch(`${BACKEND}/products?` + params.toString())
    setItems(await res.json())
  }

  return (
    <section id="catalog" className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
        <div className="flex-1">
          <label className="block text-sm text-blue-200 mb-1">Recherche</label>
          <input value={q} onChange={e=>setQ(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white" placeholder="Chercher un produit..." />
        </div>
        <div>
          <label className="block text-sm text-blue-200 mb-1">Catégorie</label>
          <select value={category} onChange={e=>setCategory(e.target.value)} className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white">
            <option value="">Toutes</option>
            <option value="lentilles">Lentilles de contact</option>
            <option value="solutions">Solutions d'entretien</option>
            <option value="lunettes_medicales">Lunettes médicales</option>
            <option value="lunettes_soleil">Lunettes de soleil</option>
          </select>
        </div>
        <button onClick={search} className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium">Rechercher</button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {items.map(p => (
          <div key={p.id} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4">
            <div className="aspect-square bg-slate-700/40 rounded-xl flex items-center justify-center text-blue-200">{p.images?.length ? <img src={p.images[0]} alt={p.title} className="object-cover w-full h-full rounded-xl"/> : 'Image'}</div>
            <div className="mt-3">
              <div className="text-white font-medium truncate">{p.title}</div>
              <div className="text-blue-300">{Number(p.price).toFixed(2)} DZD</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
