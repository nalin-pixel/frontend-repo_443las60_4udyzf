import { useMemo, useState } from 'react'
import Hero from './components/Hero'
import Configurator from './components/Configurator'
import Countdown from './components/Countdown'
import Results from './components/Results'

function App() {
  const [stage, setStage] = useState('hero')
  const [config, setConfig] = useState(null)

  const goConfig = () => setStage('config')
  const goCountdown = (cfg) => { setConfig(cfg); setStage('countdown') }
  const onLaunch = () => setStage('results')
  const restart = () => { setConfig(null); setStage('hero') }

  const Content = useMemo(() => {
    if (stage === 'hero') return <Hero onStart={goConfig} />
    if (stage === 'config') return <Configurator onConfigured={goCountdown} />
    if (stage === 'countdown') return <Countdown config={config} onLaunch={onLaunch} />
    if (stage === 'results') return <Results config={config} onRestart={restart} />
    return null
  }, [stage, config])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-20 bg-slate-950/70 backdrop-blur border-b border-white/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-extrabold tracking-tight text-xl">
            <span className="text-blue-400">LaunchPad</span> Live
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <button className={`hover:text-white ${stage==='hero'?'text-white':''}`} onClick={()=>setStage('hero')}>Home</button>
            <button className={`hover:text-white ${stage==='config'?'text-white':''}`} onClick={()=>setStage('config')}>Dashboard</button>
            <button className={`hover:text-white ${stage==='countdown'?'text-white':''}`} onClick={()=> config? setStage('countdown') : null}>Countdown</button>
            <button className={`hover:text-white ${stage==='results'?'text-white':''}`} onClick={()=> config? setStage('results') : null}>Results</button>
          </nav>
        </div>
      </header>
      <main>
        {Content}
      </main>
      <footer className="border-t border-white/10 bg-slate-950/70">
        <div className="container mx-auto px-6 py-8 text-center text-slate-400 text-sm">
          Built for exploration. One interactive 3D rocket, everything else 2D.
        </div>
      </footer>
    </div>
  )
}

export default App
