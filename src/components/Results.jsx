import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export default function Results({ config, onRestart }) {
  const API = import.meta.env.VITE_BACKEND_URL || "";
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/api/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    }).then(r => r.json()).then(setRes).finally(()=> setLoading(false));
  }, [JSON.stringify(config)]);

  return (
    <section className="bg-slate-950 text-white">
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold">Launch Result</h2>
        {loading && <div className="mt-8 text-slate-400">Running simulation...</div>}
        {!loading && res && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y:0, opacity:1 }} className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3">
                {res.success ? <CheckCircle2 className="h-8 w-8 text-emerald-400" /> : <XCircle className="h-8 w-8 text-rose-400"/>}
                <div>
                  <div className="text-slate-300 text-xs">Outcome</div>
                  <div className="font-semibold text-xl">{res.success ? 'Successful Launch' : 'Launch Failure'}</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  {k: 'Success Probability', v: `${Math.round(res.probability*100)}%`},
                  {k: 'Burn Time', v: `${res.burn_time_s}s`},
                  {k: 'Max Altitude', v: `${res.max_altitude_km} km`},
                  {k: 'Delta-v', v: `${res.delta_v_ms} m/s`},
                ].map(it => (
                  <div key={it.k} className="bg-black/30 rounded-lg p-4 border border-white/10">
                    <div className="text-slate-400 text-xs">{it.k}</div>
                    <div className="font-semibold">{it.v}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y:0, opacity:1 }} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="text-slate-300 text-xs">Notes</div>
              <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                {res.reasons.map((r,i)=>(<li key={i}>{r}</li>))}
              </ul>
              <button onClick={onRestart} className="mt-6 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium">Start Over</button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
