import Reveal from './Reveal'

const REVIEWS = [
  {
    text: '"LuxeRealty made buying our first home an absolute joy. Our agent Sarah was incredibly patient and found us the perfect place in just three weeks. We couldn\'t be happier!"',
    name: 'James & Mia Carter',
    role: 'First-time Homebuyers · Austin, TX',
    initials: 'JM',
    gradient: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
    stars: 5,
  },
  {
    text: '"I\'ve worked with many agencies over the years, but LuxeRealty is in a class of their own. They sold my Malibu property for $300k above asking price in under two weeks."',
    name: 'Rachel Kim',
    role: 'Property Investor · Malibu, CA',
    initials: 'RK',
    gradient: 'linear-gradient(135deg,#0EA5E9,#10B981)',
    stars: 5,
  },
  {
    text: '"Relocating for work is stressful, but the LuxeRealty team took every worry off my plate. Virtual tours, paperwork, negotiation — they handled everything flawlessly."',
    name: 'Daniel Torres',
    role: 'Relocation Buyer · Chicago, IL',
    initials: 'DT',
    gradient: 'linear-gradient(135deg,#F59E0B,#EF4444)',
    stars: 5,
  },
  {
    text: '"The search filters saved me so much time. I was able to narrow down dozens of listings in minutes and book viewings the same day. Highly recommend!"',
    name: 'Linda Park',
    role: 'Condo Buyer · Miami, FL',
    initials: 'LP',
    gradient: 'linear-gradient(135deg,#10B981,#0284C7)',
    stars: 4.5,
  },
  {
    text: '"Outstanding service from start to finish. The team\'s market knowledge is unmatched — they guided us through a competitive bidding situation and we won our dream home."',
    name: 'Alex & Tina Wu',
    role: 'Luxury Buyers · Boston, MA',
    initials: 'AT',
    gradient: 'linear-gradient(135deg,#1D4ED8,#6366F1)',
    stars: 5,
  },
  {
    text: '"From the first consultation to handing over the keys, every interaction was professional and warm. LuxeRealty truly lives up to its name — pure luxury service."',
    name: 'Nina Belmont',
    role: 'Villa Buyer · Beverly Hills, CA',
    initials: 'NB',
    gradient: 'linear-gradient(135deg,#EC4899,#8B5CF6)',
    stars: 5,
  },
]

function Stars({ count }) {
  const full = Math.floor(count)
  const half = count % 1 !== 0
  return (
    <div className="review-stars">
      {Array.from({ length: full }).map((_, i) => (
        <i key={i} className="fa-solid fa-star" />
      ))}
      {half && <i className="fa-solid fa-star-half-stroke" />}
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews">
      <div className="container">
        <div className="reviews-head">
          <Reveal as="span" className="section-label">
            <i className="fa-solid fa-star" /> Testimonials
          </Reveal>
          <Reveal as="h2" className="section-title" delay={1}>
            What Our <span>Clients Say</span>
          </Reveal>
          <Reveal as="p" className="section-subtitle" delay={2}>
            Real stories from real people who found their dream homes with LuxeRealty.
          </Reveal>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} className="review-card" delay={(i % 3) + 1}>
              <Stars count={r.stars} />
              <p className="review-text">{r.text}</p>
              <div className="review-author">
                <div className="review-avatar" style={{ background: r.gradient }}>
                  {r.initials}
                </div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-role">{r.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
