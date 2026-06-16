import { useState } from 'react'
import axios from 'axios'
import { buildTitle } from '../utils/format'

export default function Advisor({ listings }) {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function ask() {
    if (!query.trim()) return

    setLoading(true)
    setResponse('')

    const summary = listings
      .slice(0, 20)
      .map(
        (p) =>
          `- ${buildTitle(p)} at ${p.formattedAddress}: $${p.price?.toLocaleString()}, ${p.bedrooms}bd/${p.bathrooms}ba, ${p.squareFootage || '?'} sqft`
      )
      .join('\n')

    const systemPrompt = `You are a concise, friendly real estate advisor for LuxeRealty.
You have access to our current listings and help clients find the right property.
Answer in 2-4 sentences max. Be specific and reference actual listings when relevant.
Do not use markdown formatting — plain text only.

Current listings:
${summary}`

    try {
      const res = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: 'user', content: query }],
        },
        { headers: { 'Content-Type': 'application/json' } }
      )

      setResponse(res.data?.content?.[0]?.text || "Sorry, I couldn't generate a response. Try again.")
    } catch (err) {
      setResponse('Something went wrong reaching the advisor. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="ai-advisor">
      <div className="container">
        <div className="advisor-wrap reveal visible">
          <div className="advisor-header">
            <div className="advisor-icon-wrap">
              <i className="fa-solid fa-wand-magic-sparkles" />
            </div>
            <div>
              <h2 className="advisor-title">AI Property Advisor</h2>
              <p className="advisor-sub">
                Describe what you're looking for and get personalized recommendations from our
                listings.
              </p>
            </div>
          </div>

          <div className="advisor-input-row">
            <input
              type="text"
              className="advisor-input"
              placeholder="e.g. I want a 3-bed home under $1M near the coast with a pool…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && ask()}
            />
            <button className="advisor-btn" onClick={ask} disabled={loading}>
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" /> Thinking…
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane" /> Ask
                </>
              )}
            </button>
          </div>

          {(loading || response) && (
            <div className="advisor-response">
              {loading ? (
                <div className="typing-dots">
                  <span></span><span></span><span></span>
                </div>
              ) : (
                response
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
