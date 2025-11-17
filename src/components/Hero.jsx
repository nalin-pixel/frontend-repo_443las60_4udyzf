import { Rocket, Settings, Gauge } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute -top-10 -right-10 h-72 w-72 bg-blue-500/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-10 -left-10 h-72 w-72 bg-purple-500/20 blur-3xl rounded-full" />
      <div className="container mx-auto px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          LaunchPad Live
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-slate-300 max-w-2xl"
        >
          Configure your rocket, run a live countdown, and see if you make it to the stars.
        </motion.p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            icon: Rocket,
            title: "Sleek Launch Dashboard",
            text: "Fine-tune fuel, thrust, payload, and weather.",
          },{
            icon: Settings,
            title: "Smart Simulation",
            text: "We estimate success odds with a realistic model.",
          },{
            icon: Gauge,
            title: "Live Countdown",
            text: "Crisp animation from T-10 to ignition.",
          }].map((c, i) => (
            <motion.div key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10"
            >
              <c.icon className="h-8 w-8 text-blue-400" />
              <h3 className="mt-3 font-semibold text-lg">{c.title}</h3>
              <p className="text-slate-300 text-sm mt-1">{c.text}</p>
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="mt-10 inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-medium"
        >
          Begin Configuration
        </motion.button>
      </div>
    </section>
  );
}
