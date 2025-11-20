import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Optic Care
            </h1>
            <p className="text-blue-200/90 mt-4">
              Le hub e-santé visuelle en Algérie: produits optiques, ordonnances, rendez-vous et plus.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="#catalog" className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium">Voir le catalogue</a>
              <a href="#services" className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium">Services</a>
            </div>
          </div>
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-500/20 via-sky-400/10 to-transparent border border-blue-400/20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
