import Hero from './components/Hero'
import Catalog from './components/Catalog'
import Checkout from './components/Checkout'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-blue-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <header className="relative border-b border-blue-400/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-500 inline-block"></span>
            <span className="text-white font-semibold">Optic Care</span>
          </div>
          <nav className="hidden md:flex gap-6 text-blue-200">
            <a href="#catalog" className="hover:text-white">Catalogue</a>
            <a href="#checkout" className="hover:text-white">Panier</a>
            <a href="#services" className="hover:text-white">Services</a>
          </nav>
        </div>
      </header>
      <main className="relative">
        <Hero />
        <Catalog />
        <Checkout />
      </main>
      <footer className="relative border-t border-blue-400/10">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-blue-300/80">© {new Date().getFullYear()} Optic Care</div>
      </footer>
    </div>
  )
}

export default App
