import { useEffect, useState } from 'react'

function Hero() {
  const heroImages = [
    '/pics/hero1.png',
    '/pics/hero2.png',
    '/pics/hero3.png',
  ]

  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 15, 15, 0.5), rgba(15, 15, 15, 0.5)), url(${heroImages[currentImage]})`,
      }}
    >
      <div className="container hero-content">
        <h2>Professional Legal & Notary Services</h2>
        <p>
          Trusted legal guidance, professional representation, and reliable
          notarial support tailored to your needs.
        </p>
      </div>
    </section>
  )
}

export default Hero