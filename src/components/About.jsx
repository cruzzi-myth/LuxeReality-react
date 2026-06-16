import { useState } from 'react'
import Counter from './Counter'
import Reveal from './Reveal'

const FEATURES = [
  {
    icon: 'fa-shield-halved',
    title: 'Trusted & Verified',
    text: 'Every listing is thoroughly verified by our in-house team before it goes live.',
  },
  {
    icon: 'fa-chart-line',
    title: 'Market Insights',
    text: 'Access real-time data and trends to make smarter buying and selling decisions.',
  },
  {
    icon: 'fa-headset',
    title: 'Expert Support',
    text: 'Our agents are available 7 days a week to answer your questions.',
  },
  {
    icon: 'fa-key',
    title: 'Smooth Closing',
    text: "We handle the paperwork so you can focus on what matters — moving in.",
  },
]

function AboutPhoto() {
  const [failed, setFailed] = useState(false)
  return (
    <div className="about-img-wrap">
      {!failed ? (
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
          alt="Luxury home exterior"
          className="about-real-img"
          onError={() => setFailed(true)}
        />
      ) : (
        <i className="fa-solid fa-city about-img-icon" />
      )}
    </div>
  )
}

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-visual">
            <AboutPhoto />

            <div className="about-float-card fc-1">
              <div className="afc-icon">
                <i className="fa-solid fa-house" />
              </div>
              <div>
                <Counter target={2400} className="afc-val" />
                <div className="afc-label">Homes Sold</div>
              </div>
            </div>

            <div className="about-float-card fc-2">
              <div className="afc-icon green">
                <i className="fa-solid fa-star" />
              </div>
              <div>
                <div className="afc-val">4.9</div>
                <div className="afc-label">Avg. Rating</div>
              </div>
            </div>
          </Reveal>

          <div className="about-text">
            <Reveal as="span" className="section-label">
              <i className="fa-solid fa-circle-info" /> About Us
            </Reveal>

            <Reveal as="h2" className="section-title" delay={1}>
              We Turn <span>House Hunting</span><br />Into Home Finding
            </Reveal>

            <Reveal as="p" className="section-subtitle" delay={2}>
              Since 2006, LuxeRealty has helped thousands of buyers, sellers, and
              investors navigate the real estate market with confidence. Our team
              of 80+ certified agents is dedicated to providing personalized,
              data-driven guidance every step of the way.
            </Reveal>

            <div className="features-grid" style={{ marginTop: '2.5rem' }}>
              {FEATURES.map((f, i) => (
                <Reveal key={f.title} className="feat-card" delay={i + 1}>
                  <div className="feat-icon">
                    <i className={`fa-solid ${f.icon}`} />
                  </div>
                  <h4>{f.title}</h4>
                  <p>{f.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
