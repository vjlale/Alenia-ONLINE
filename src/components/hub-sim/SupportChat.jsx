// Chat de soporte con el asistente IA, dentro de la pantalla del cliente.
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, CheckCircle2, RefreshCw, Send } from 'lucide-react'
import { TapHint } from './DeviceFrames'

function TypingDots() {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2.5 w-fit">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-white/70"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

function Message({ message }) {
  const [ready, setReady] = useState(!message.delay)

  useEffect(() => {
    if (!message.delay) return undefined
    const id = setTimeout(() => setReady(true), message.delay)
    return () => clearTimeout(id)
  }, [message.delay])

  if (message.from === 'system') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[9.5px] font-semibold text-amber-200"
      >
        <RefreshCw className="h-3 w-3 animate-spin" />
        {message.text}
      </motion.div>
    )
  }

  const mine = message.from === 'user'
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${mine ? 'justify-end' : 'justify-start'}`}
    >
      {!ready ? (
        <TypingDots />
      ) : (
        <motion.p
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`max-w-[86%] rounded-2xl px-3 py-2 text-[11px] leading-snug ${
            mine ? 'rounded-br-sm bg-emerald-500 text-slate-950 font-medium' : 'rounded-bl-sm bg-white/10 text-white/90'
          }`}
        >
          {message.text}
        </motion.p>
      )}
    </motion.div>
  )
}

const SUGGESTIONS = (productName) => [`No me salió el ${productName}`, 'Quiero mi reintegro']

export default function SupportChat({ chat, phaseId, productName, onSend, hint }) {
  const [text, setText] = useState('')
  const canWrite = phaseId === 'chat'

  const submit = (value) => {
    if (!canWrite || !value.trim()) return
    onSend(value)
    setText('')
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-white/10 bg-slate-900/80 px-3 py-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 text-slate-950">
          <Bot className="h-4 w-4" />
        </div>
        <div className="leading-tight">
          <p className="text-[12px] font-bold text-white">Soporte 24/7</p>
          <p className="flex items-center gap-1 text-[9.5px] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Asistente IA en línea
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3">
        {chat.map((m) => (
          <Message key={m.id} message={m} />
        ))}
        <AnimatePresence>
          {phaseId === 'resolved' || phaseId === 'summary' ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[9.5px] font-semibold text-emerald-200"
            >
              <CheckCircle2 className="h-3 w-3" />
              Problema resuelto · caso cerrado
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {canWrite && (
        <div className="flex flex-wrap gap-1.5 px-3 pb-2">
          {SUGGESTIONS(productName).map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => submit(s)}
              className="relative rounded-full border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-semibold text-cyan-100 hover:bg-cyan-400/20"
            >
              {s}
              <TapHint show={hint?.name === `suggestion:${i}`} delay={hint?.delay} auto={hint?.auto} />
            </button>
          ))}
        </div>
      )}

      <form
        className="flex items-center gap-2 border-t border-white/10 px-3 py-2"
        onSubmit={(e) => {
          e.preventDefault()
          submit(text)
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!canWrite}
          placeholder={canWrite ? 'Escribí tu consulta…' : 'El asistente está respondiendo…'}
          aria-label="Mensaje para soporte"
          className="min-w-0 flex-1 rounded-full bg-white/10 px-3 py-1.5 text-[11px] text-white placeholder:text-white/40 outline-none focus:ring-1 focus:ring-cyan-400 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!canWrite}
          aria-label="Enviar"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-slate-950 disabled:opacity-40"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  )
}
