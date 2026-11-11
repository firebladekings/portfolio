import { useState } from 'react'
import { profile } from '../data'

const field =
  'w-full bg-transparent border-b border-zinc-800 px-1 py-4 text-base text-white placeholder:text-zinc-600 focus:outline-none focus:border-accent transition-colors'

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
    <section id="contact" className="py-24 md:py-36 px-6 md:px-24 bg-black">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-5 text-white">
          Let&apos;s build something together.
        </h2>
        <p className="text-zinc-400 mb-14">Projects, collaborations, or just to say hello.</p>

        <form onSubmit={submit} className="space-y-2 text-left">
          <input name="name" required placeholder="Your name" value={form.name} onChange={update} className={field} />
          <input name="email" type="email" required placeholder="Your email" value={form.email} onChange={update} className={field} />
          <textarea name="message" required rows={5} placeholder="Tell me about the project" value={form.message} onChange={update} className={`${field} resize-y`} />
          <button
            type="submit"
            className="mt-6 rounded-full bg-accent text-black font-medium px-8 py-4 hover:opacity-80 transition-colors"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  )
}
