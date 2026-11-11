// All page content lives here so it can be edited without touching components.

export const profile = {
  name: 'Akul Sanjeev Rao',
  // TODO: replace with a real address — the contact form opens a mail draft to it.
  email: 'hello@example.com',
}

export const about = [
  'As far back as I can remember, creating music was something that felt entirely natural to me. It didn’t take long to realize exactly where my passion lay, or to notice how easily I would lose track of time—spending countless quiet hours and sleepless nights simply building and refining sound.',
  'It can feel a bit strange trying to put my relationship with art into words because, at the end of the day, music is about action rather than conversation. I’ve always believed in putting in the work and actively pushing a project forward, rather than just staring at an idea and over-analyzing it.',
  'With a formal background in Sound Engineering and hands-on experience in studio environments, I focus on the technical details that bring a track to life. For me, it’s about finding that balance between composition, clean production, and sound design.',
]

// Sections reachable from the bubbles around "OXY" in the hero.
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'arsenal', label: 'Studio' },
  { id: 'music', label: 'Music' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

// Phrase from the bio that gets picked out in the About section.
export const aboutHighlight = 'music is about action rather than conversation'

export const aboutPhoto = {
  src: '/images/akul-studio.jpg',
  alt: 'Akul Sanjeev Rao in the studio, arms crossed beside the mixing desk',
  width: 937,
  height: 1171,
}

export const aboutFacts = [
  { label: 'Education', value: 'B.Sc Sound Engineering' },
  { label: 'Award', value: '1st Place, Ableton Producer Challenge' },
  { label: 'Most recent', value: 'Music Programmer, Ravi Basrur Music & Movies' },
]

export const software = [
  'Ableton Live',
  'Logic Pro X',
  'FL Studio',
  'Cubase Pro',
  'Reason Studios',
  'Studio One',
]

export const tracks = [
  {
    title: 'Ignorant',
    note: 'Ableton Music Producer Challenge Award',
    badge: '1st Place',
    // TODO: replace with the track's SoundCloud URL
    url: 'https://soundcloud.com',
  },
  {
    title: 'Bingo!',
    note: 'ITC South Music Challenge Entry',
    url: 'https://soundcloud.com',
  },
]

export const experience = [
  { org: 'Ravi Basrur Music & Movies', role: 'Music Programmer', when: 'Jan 25 — May 25', current: true },
  { org: 'Music Cloud Studio & Technology', role: 'Recording Session Assistant & Studio Operations', when: 'Internship' },
  { org: 'Bacardi NH7 Weekender', role: 'Music Event Volunteer', when: '2023 — 2024' },
]
