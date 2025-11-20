import { useEffect, useMemo, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL

export default function Checkout() {
  const [cart, setCart] = useState([]) // [{product_id, title, price, qty, image}]
  const [address, setAddress] = useState({label:'Maison', full_name:'', phone:'', wilaya:'Alger', commune:'', street:'', postal_code:''})
  const [fee, setFee] = useState(0)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('optic_cart')
    if (saved) setCart(JSON.parse(saved))
  }, [])

  useEffect(() => {
    fetch(`${BACKEND}/shipping/fee?wilaya=${encodeURIComponent(address.wilaya||'Alger')}`)
      .then(r=>r.json()).then(d=>setFee(d.fee||0)).catch(()=>setFee(0))
  }, [address.wilaya])

  const subtotal = useMemo(()=>cart.reduce((s,i)=>s + i.price * i.qty,0),[cart])
  const total = subtotal + fee

  const placeOrder = async () => {
    const payload = {
      user_id: 'guest',
      items: cart.map(i => ({ product_id: i.product_id, quantity: i.qty })),
      address
    }
    const res = await fetch(`${BACKEND}/orders`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
    const data = await res.json()
    setOrder(data)
    localStorage.removeItem('optic_cart')
  }

  return (
    <section id="checkout" className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-white">Panier & Paiement</h2>

      <div className="grid md:grid-cols-3 gap-8 mt-6">
        <div className="md:col-span-2 bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-white font-medium mb-4">Adresse de livraison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white" placeholder="Nom complet" value={address.full_name} onChange={e=>setAddress(a=>({...a, full_name:e.target.value}))} />
            <input className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white" placeholder="Téléphone" value={address.phone} onChange={e=>setAddress(a=>({...a, phone:e.target.value}))} />
            <input className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white" placeholder="Wilaya" value={address.wilaya} onChange={e=>setAddress(a=>({...a, wilaya:e.target.value}))} />
            <input className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white" placeholder="Commune" value={address.commune} onChange={e=>setAddress(a=>({...a, commune:e.target.value}))} />
            <input className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white md:col-span-2" placeholder="Adresse" value={address.street} onChange={e=>setAddress(a=>({...a, street:e.target.value}))} />
          </div>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-white font-medium mb-4">Résumé</h3>
          <div className="flex justify-between text-blue-200"><span>Sous-total</span><span>{subtotal.toFixed(2)} DZD</span></div>
          <div className="flex justify-between text-blue-200 mt-2"><span>Livraison</span><span>{fee.toFixed(2)} DZD</span></div>
          <div className="border-t border-slate-700 my-3"></div>
          <div className="flex justify-between text-white font-semibold"><span>Total</span><span>{total.toFixed(2)} DZD</span></div>
          <button onClick={placeOrder} className="mt-4 w-full px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium">Confirmer (Paiement à la livraison)</button>
          {order && <p className="text-green-400 mt-3">Commande créée avec succès. Numéro: {order.id}</p>}
        </div>
      </div>
    </section>
  )
}
