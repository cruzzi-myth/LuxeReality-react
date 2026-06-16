import { useState } from 'react'
import Reveal from './Reveal'

const TEAM = [
  {
    name: 'Sarah Mitchell',
    title: 'Luxury Property Specialist',
    desc: 'With 14 years specializing in Beverly Hills and Malibu estates, Sarah has closed over $480M in transactions. Her market intuition and white-glove service set her apart.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    initials: 'SM',
    sold: '340+',
    years: '14 yrs',
    rating: '5.0 ⭐',
    email: 'sarah@luxerealty.com',
    phone: '+13105550192',
  },
  {
    name: 'James Carter',
    title: 'Commercial & Investment Lead',
    desc: 'James brings Wall Street rigor to real estate investment. Specializing in Manhattan penthouses and multi-unit properties, he maximizes ROI for buyers and sellers alike.',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
    initials: 'JC',
    sold: '520+',
    years: '19 yrs',
    rating: '4.9 ⭐',
    email: 'james@luxerealty.com',
    phone: '+13105550193',
  },
  {
    name: 'Maria Santos',
    title: 'Residential & Relocation Expert',
    desc: 'Fluent in English, Spanish, and Portuguese, Maria specializes in helping families relocate with ease. Her warmth and local expertise have earned her a 100% client referral rate.',
    photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=256&q=80',
    initials: 'MS',
    sold: '280+',
    years: '10 yrs',
    rating: '5.0 ⭐',
    email: 'maria@luxerealty.com',
    phone: '+13105550194',
  },
]

function RealtorPhoto({ photo, initials, name }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="realtor-photo-wrap">
      {!failed ? (
        <img
          src={photo}
          alt={name}
          className="realtor-photo"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="realtor-photo-fallback" style={{ display: 'flex' }}>{initials}</div>
      )}
      <div className="realtor-verified" title="Verified Agent">
        <i className="fa-solid fa-check" />
      </div>
    </div>
  )
}

export default function Realtors() {
  return (
    <section id="realtors">
      <div className="container">
        <div className="realtors-head">
          <Reveal as="span" className="section-label">
            <i className="fa-solid fa-user-tie" /> Our Team
          </Reveal>
          <Reveal as="h2" className="section-title" delay={1}>
            Meet Our <span>Expert Realtors</span>
          </Reveal>
          <Reveal as="p" className="section-subtitle" delay={2}>
            Award-winning agents with decades of combined experience — dedicated to finding you
            the perfect property.
          </Reveal>
        </div>

        <div className="realtors-flex">
          {TEAM.map((agent, i) => (
            <Reveal key={agent.name} className="realtor-card" delay={i + 1}>
              <RealtorPhoto photo={agent.photo} initials={agent.initials} name={agent.name} />
              <div className="realtor-name">{agent.name}</div>
              <div className="realtor-title">{agent.title}</div>
              <p className="realtor-desc">{agent.desc}</p>

              <div className="realtor-stats">
                <div className="realtor-stat">
                  <div className="realtor-stat-val">{agent.sold}</div>
                  <div className="realtor-stat-lbl">Homes Sold</div>
                </div>
                <div className="realtor-stat">
                  <div className="realtor-stat-val">{agent.years}</div>
                  <div className="realtor-stat-lbl">Experience</div>
                </div>
                <div className="realtor-stat">
                  <div className="realtor-stat-val">{agent.rating}</div>
                  <div className="realtor-stat-lbl">Rating</div>
                </div>
              </div>

              <div className="realtor-socials">
                <a href={`mailto:${agent.email}`} className="r-social" title="Email">
                  <i className="fa-solid fa-envelope" />
                </a>
                <a href={`tel:${agent.phone}`} className="r-social" title="Phone">
                  <i className="fa-solid fa-phone" />
                </a>
                <a href="#" className="r-social" title="LinkedIn">
                  <i className="fa-brands fa-linkedin-in" />
                </a>
                <a href="#" className="r-social" title="Instagram">
                  <i className="fa-brands fa-instagram" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
