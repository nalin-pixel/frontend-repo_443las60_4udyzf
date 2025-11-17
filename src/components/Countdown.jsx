import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Countdown({ config, onLaunch }) {
  const [t, setT] = useState(10);
  useEffect(() => {
    const id = setInterval(() => setT(v => Math.max(0, v-1)), 900);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (t === 0) onLaunch();
  }, [t, onLaunch]);

  return (
    <section className="bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold">Countdown</h2>
        <p className="text-slate-300 mt-2">Tuning guidance for your configured vehicle.</p>
        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {[
              {k:'Fuel', v: config.fuel_type},
              {k:'Thrust', v: `${Math.round(config.thrust_kN)} kN`},
              {k:'Payload', v: `${Math.round(config.payload_kg)} kg`},
              {k:'Weather', v: config.weather},
            ].map((i)=> (
              <div key={i.k} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-slate-400 text-xs">{i.k}</div>
                <div className="font-semibold">{i.v}</div>
              </div>
            ))}
          </div>
          <div className="relative h-48 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={t}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-8xl font-extrabold tracking-tighter"
              >
                {t}
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.div initial={{ width: 0 }} animate={{ width: `${(10-t)*10}%` }} className="h-2 bg-blue-500 rounded-full w-full max-w-2xl" />
        </div>
      </div>
    </section>
  );
}
