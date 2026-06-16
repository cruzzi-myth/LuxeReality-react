import { useState } from 'react'
import Reveal from './Reveal'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: 'Buying a Property',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: hook this up to an actual backend / email service once we have one.
    // for now just flip the success state
    setSent(true)
  }

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-grid">
          <Reveal className="contact-info">
            <span className="section-label">
              <i className="fa-solid fa-envelope" /> Contact Us
            </span>
            <h2 className="section-title" style={{ color: 'white', marginTop: '0.5rem' }}>
              Let's Find Your
              <br />
              <span style={{ color: '#7DD3FC', WebkitTextFillColor: '#7DD3FC' }}>
                Perfect Home
              </span>
            </h2>
            <p className="section-subtitle">
              Ready to start your real estate journey? Our expert agents are standing by to help
              you buy, sell, or invest.
            </p>

            <div className="contact-items">
              <div className="c-item">
                <div className="c-item-icon">
                  <i className="fa-solid fa-location-dot" />
                </div>
                <div>
                  <div className="c-item-main">750 Wilshire Blvd, Suite 1200</div>
                  <div className="c-item-sub">Los Angeles, CA 90017</div>
                </div>
              </div>
              <div className="c-item">
                <div className="c-item-icon">
                  <i className="fa-solid fa-phone" />
                </div>
                <div>
                  <div className="c-item-main">+1 (310) 555-0192</div>
                  <div className="c-item-sub">Mon – Sat, 8am – 8pm PT</div>
                </div>
              </div>
              <div className="c-item">
                <div className="c-item-icon">
                  <i className="fa-solid fa-envelope" />
                </div>
                <div>
                  <div className="c-item-main">hello@luxerealty.com</div>
                  <div className="c-item-sub">We reply within 24 hours</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="contact-form-card">
              <h3>Send Us a Message</h3>

              {!sent ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        required
                        value={form.firstName}
                        onChange={update('firstName')}
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        required
                        value={form.lastName}
                        onChange={update('lastName')}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={form.email}
                      onChange={update('email')}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={update('phone')}
                    />
                  </div>

                  <div className="form-group">
                    <label>I'm Interested In</label>
                    <select value={form.interest} onChange={update('interest')}>
                      <option>Buying a Property</option>
                      <option>Selling a Property</option>
                      <option>Property Investment</option>
                      <option>Rental Listings</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      placeholder="Tell us what you're looking for…"
                      value={form.message}
                      onChange={update('message')}
                    />
                  </div>

                  <button type="submit" className="form-submit">
                    <i className="fa-solid fa-paper-plane" /> Send Message
                  </button>
                </form>
              ) : (
                <div className="form-success" style={{ display: 'block' }}>
                  <div className="success-icon">
                    <i className="fa-solid fa-check" />
                  </div>
                  <h4>Message Sent!</h4>
                  <p>
                    Thanks for reaching out. One of our agents will be in touch with you within
                    24 hours.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="footer-bar container">
        <p>
          &copy; 2024 <span>LuxeRealty</span>. All rights reserved.
        </p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </section>
  )
}
