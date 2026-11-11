import { useState } from 'react'
import { profile } from '../data'

const field =
  'w-full bg-zinc-950 border border-zinc-800 p-4 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-neon'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // No backend: open the visitor's mail client with the message pre-filled.
  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Project enquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="scroll-mt-20 py-24 md:py-32 px-6 md:px-24 bg-black">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 text-white">
          Let&apos;s build something together.
        </h2>
        <p className="text-xs text-zinc-500 mb-12">GET IN TOUCH FOR PROJECTS &amp; COLLABORATIONS</p>

        <form onSubmit={submit} className="space-y-4 text-left">
          <input name="name" required placeholder="YOUR NAME" value={form.name} onChange={update} className={field} />
          <input name="email" type="email" required placeholder="YOUR EMAIL" value={form.email} onChange={update} className={field} />
          <textarea name="message" required rows={5} placeholder="YOUR MESSAGE" value={form.message} onChange={update} className={`${field} resize-y`} />
          <button
            type="submit"
            className="w-full bg-neon text-black text-xs font-bold py-4 tracking-widest hover:bg-white transition-colors"
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </section>
  )
}
