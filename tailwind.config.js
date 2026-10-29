// Brand colours live here only. Replace with the Aaryan logo hex values when ready.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { ink:'#111111', tint:'#F5F6F8',
      brand:{ blue:'#3B63E0', red:'#D6334F', yellow:'#F2B705', orange:'#E8762B' } },
    fontFamily: { sans:['"DM Sans"','system-ui','sans-serif'] },
  } },
}
