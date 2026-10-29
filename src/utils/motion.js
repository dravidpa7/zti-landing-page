// Shared motion tokens. Only opacity/transform are animated, so it stays cheap on weak devices.
export const ease = [0.22, 1, 0.36, 1]
export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease },
}
// Divider line that draws itself in from the left.
export const line = {
  initial: { scaleX: 0 },
  whileInView: { scaleX: 1 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 1, ease },
}
