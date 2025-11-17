import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";

export default function Configurator({ onConfigured }) {
  const API = import.meta.env.VITE_BACKEND_URL || "";
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({
    fuel_type: "RP-1",
    thrust_kN: 1500,
    payload_kg: 2000,
    weather: "Clear",
  });

  useEffect(() => {
    fetch(`${API}/api/options`).then(r => r.json()).then(setOptions).finally(() => setLoading(false));
  }, []);

  const update = (k, v) => setConfig(p => ({ ...p, [k]: v }));

  if (loading) return <div className="p-8 text-center text-slate-400">Loading...</div>;

  return (
    <section className="bg-slate-950 text-white">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><SlidersHorizontal className="h-6 w-6 text-blue-400"/> Configure</h2>
          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-sm text-slate-300">Fuel Type</label>
              <select value={config.fuel_type} onChange={e => update('fuel_type', e.target.value)} className="mt-2 w-full bg-white/5 border border-white/10 rounded p-3">
                {options.fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300">Thrust: {Math.round(config.thrust_kN)} kN</label>
              <input type="range" min={options.thrustRange.min} max={options.thrustRange.max} value={config.thrust_kN}
                onChange={e => update('thrust_kN', Number(e.target.value))}
                className="w-full"/>
            </div>
            <div>
              <label className="block text-sm text-slate-300">Payload: {Math.round(config.payload_kg)} kg</label>
              <input type="range" min={options.payloadRange.min} max={options.payloadRange.max} value={config.payload_kg}
                onChange={e => update('payload_kg', Number(e.target.value))}
                className="w-full"/>
            </div>
            <div>
              <label className="block text-sm text-slate-300">Weather</label>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                {options.weatherOptions.map(w => (
                  <button key={w}
                    className={`rounded px-3 py-2 border ${config.weather===w? 'bg-blue-500/20 border-blue-400' : 'border-white/10 bg-white/5'}`}
                    onClick={() => update('weather', w)}
                  >{w}</button>
                ))}
              </div>
            </div>
            <div className="pt-4">
              <button onClick={() => onConfigured(config)} className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-lg font-medium">Proceed to Countdown</button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">3D Rocket</h2>
          <p className="text-slate-300 text-sm mt-1">Rotate and zoom. The rest of the interface remains 2D.</p>
          <div className="mt-4 aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-black">
            {/* Single 3D Element using Spline */}
            <iframe title="3D Rocket" src="https://my.spline.design/untitled-5a9a3b9a8f7b1f2f32c2a0f0f6a1e8b8/" className="w-full h-full"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
