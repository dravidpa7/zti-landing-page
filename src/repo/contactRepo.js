// Sends an enquiry. Set VITE_CONTACT_ENDPOINT (see .env.example) to POST JSON to your API/form service.
// With no endpoint there is no server to receive it, so the service falls back to the visitor's mail app.
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
export const contactRepo = {
  async send(payload) {
    if (!endpoint) return { mode: 'mailto' }
    const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (!res.ok) throw new Error('Request failed')
    return { mode: 'api' }
  },
}
