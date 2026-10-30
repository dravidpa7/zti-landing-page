// Colours live here and in src/index.css (:root variables). Dark theme.
const v = (n) => `rgb(var(--${n}) / <alpha-value>)`
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { ground: v('ground'), surface: v('surface'), deep: v('deep'), ink: v('ink'), tint: v('surface'),
      brand:{ blue:'#4F74F0', red:'#E0425C', yellow:'#F2B705', orange:'#EE8338' } },
    fontFamily: { sans:['"DM Sans"','system-ui','sans-serif'] },
  } },
}
