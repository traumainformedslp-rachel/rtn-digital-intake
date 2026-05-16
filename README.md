# RTN Intake Forms

Trauma-informed, evidence-based intake forms for speech-language pathology evaluation.

**Author:** Rachel Terra Norton, MS, CCC-SLP  
**Practice:** RTN Communication & Literacy  
**Website:** [rachelslp.org](https://www.rachelslp.org)

## Forms

| Form | Audience | Sections | Est. Time |
|------|----------|----------|-----------|
| `parent.html` | Parent / Caregiver | 11 | 15-20 min |
| `teacher.html` | Teacher / Educator | 8 | 10-15 min |

## Features

- **Strengths-first design** — Section 2 always leads with what the child does well
- **Trauma-informed language** — Social-emotional section uses comfort language and opt-in framing
- **Dropdown + notes rating tables** — Matching the RTN SLP Eval Wizard design system
- **Dual signature** — Canvas draw-to-sign or typed name in cursive (Caveat font)
- **Progress bar** — Tracks completion across all inputs
- **Email My Answers** — Generates a mailto: link with all form data
- **Print / Save PDF** — Full print stylesheet with preserved teal headers and callout backgrounds
- **Mobile responsive** — Single-column breakpoints at 600px
- **Zero dependencies** — Self-contained HTML/CSS/JS, no build step, no server required
- **Accessible** — Semantic HTML, proper labels, keyboard-navigable

## Deployment

### GitHub Pages

1. Push this repo to GitHub under your org (`traumainformedslp-rachel/evaluation-intake`)
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch**, select `main` / `root`
4. Your forms will be live at `traumainformedslp-rachel.github.io/evaluation-intake/`

### Link from rachelslp.org

Add to your Wix site navigation or embed via iframe:

```html
<iframe src="https://traumainformedslp-rachel.github.io/evaluation-intake/parent.html" 
        width="100%" height="800" frameborder="0"></iframe>
```

Or link directly from your Clinical Tools page.

## Design System

Matches the RTN SLP Eval Wizard v4 CSS variables:

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#f0f4f4` | Page background |
| `--surface` | `#ffffff` | Card/input background |
| `--teal` | `#1a7a7a` | Primary accent |
| `--tealDeep` | `#0e4a4a` | Header, section headings |
| `--tealFaint` | `#f0faf9` | Hover states, table headers |
| `--gold` | `#b8860b` | Strengths callout, warm accents |
| `--navy` | `#1b3a4b` | Field labels |

## File Structure

```
evaluation-intake/
├── index.html      # Landing page (form selector)
├── parent.html     # Parent/caregiver intake form
├── teacher.html    # Teacher/educator input form
└── README.md
```

## License

© RTN Communication & Literacy 2025-2026. Free for clinical use.
