import { contactRepo } from '../repo/contactRepo'
export const contactService = {
  async submit(form, toEmail) {
    const payload = { ...form, phone: `${form.dial} ${form.phone}`.trim(), submittedAt: new Date().toISOString() }
    delete payload.dial
    const res = await contactRepo.send(payload)
    if (res.mode === 'mailto') {
      const lines = [`Type: ${payload.type}`, `Name: ${payload.name}`, `Email: ${payload.email}`,
        payload.type === 'Organisation' ? `Position: ${payload.position}` : null, `Mobile: ${payload.phone}`, '', payload.message].filter((l) => l !== null)
      window.location.href = `mailto:${toEmail}?subject=${encodeURIComponent(`Enquiry (${payload.type}) from ${payload.name}`)}&body=${encodeURIComponent(lines.join('\n'))}`
    }
    return res
  },
}
