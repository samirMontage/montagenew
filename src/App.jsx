import { useState, useCallback } from 'react'
import { MouseProvider } from './hooks/useMouse.jsx'
import Background from './components/Background.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Retention from './components/Retention.jsx'
import Works from './components/Works.jsx'
import Podcast from './components/Podcast.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import VideoModal from './components/VideoModal.jsx'

export default function App() {
  // modal = { items: [...видео], index: номер открытого }
  const [modal, setModal] = useState(null)
  const open = useCallback((items, index) => setModal({ items, index }), [])

  return (
    <MouseProvider>
      <Background />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Retention />
        <Works onOpen={open} />
        <Podcast onOpen={open} />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <VideoModal state={modal} onChange={setModal} />
    </MouseProvider>
  )
}
