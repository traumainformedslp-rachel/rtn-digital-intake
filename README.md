# RTN Student Self-Report Intake App

A web-based, interactive intake form for speech-language pathologists, reading specialists, and educators working with students who have literacy-based learning differences (e.g., dyslexia). Built with accessibility, neurodiversity-affirming language, and clinical best practices in mind.

**Created by Rachel Terra Norton, MS, CCC-SLP**
[RTN Communication & Literacy](https://rachelslp.org)

---

## Features

- **Two age-adapted versions** selected at launch:
  - **Ages 6–13**: Simple language, 3-point visual Likert scale with face icons (😕 🤔 😊), kid-friendly wording
  - **Ages 14+**: Clinical language, 5-point Likert scale (Strongly Disagree → Strongly Agree), expanded questions with fields for diagnoses, accommodations, and coping strategies
- **7 sections** covering: personal info, strengths, reading & writing, academic self-concept, learning preferences, media/interest inventory, and goals
- **Print-friendly**: Clean print layout with `@media print` styles; use browser's "Save as PDF" for digital copies
- **Save as JSON**: Export structured data for record-keeping or integration with other systems
- **No data transmitted**: All data stays in the browser — nothing is sent to any server
- **Fully accessible**: Keyboard-navigable, semantic HTML, readable fonts and color contrast

## Privacy & Data Handling

> **This application collects no data.** All responses remain entirely in the user's browser. Nothing is transmitted, stored on a server, or logged. The "Save" feature exports a local JSON file to the user's device. The "Print" feature uses the browser's native print dialog.

This tool is designed for **clinician-administered use** — the clinician fills it out alongside or on behalf of the student during an intake session. It is **not** intended to be distributed directly to minors without clinician supervision.

See [PRIVACY.md](PRIVACY.md) for the full privacy notice.

## Getting Started

### Option 1: Use directly in Claude.ai

This app was built as a React artifact and can be run directly inside [Claude.ai](https://claude.ai) by pasting the `.jsx` file contents.

### Option 2: Run locally with Vite + React

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/rtn-student-intake.git
cd rtn-student-intake

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Option 3: Static HTML deployment

The app can be bundled into a single HTML file for hosting on any static server (GitHub Pages, Netlify, Vercel, etc.) with no backend required.

## Project Structure

```
rtn-intake-app/
├── LICENSE              # MIT License
├── README.md            # This file
├── PRIVACY.md           # Privacy notice for clinicians and parents
├── CODE_OF_CONDUCT.md   # Contributor code of conduct
├── CONTRIBUTING.md      # Contribution guidelines
├── src/
│   └── App.jsx          # Main application component
├── package.json         # Node.js project configuration
└── public/
    └── index.html       # HTML entry point
```

## Clinical Context

This intake tool is grounded in:

- **Strengths-based assessment** — leading with what students *can* do
- **Neurodiversity-affirming language** — no deficit framing; learning differences are acknowledged without stigma
- **Trauma-informed practice** — opt-out language, no forced responses, warm/encouraging tone
- **Evidence-based literacy frameworks** — informed by structured literacy, the Science of Reading, and reading comprehension models (e.g., Simple View of Reading, DIER model)

The questions are **not** standardized assessment items. This is a qualitative intake tool designed to supplement formal evaluation with the student's own voice and perspective.

## Intended Use

- **For**: Speech-language pathologists, reading specialists, special educators, literacy tutors, school psychologists
- **With**: Students ages 6+ who have or are suspected of having reading/writing-based learning differences
- **Setting**: Clinical intake sessions, IEP planning, private practice onboarding, school-based evaluations
- **Not for**: Unsupervised distribution to minors, diagnostic purposes, or replacement of standardized assessment

## License

This project is licensed under the [MIT License](LICENSE).

You are free to use, modify, and distribute this tool. Attribution to Rachel Terra Norton / RTN Communication & Literacy is appreciated but not required.

## Acknowledgments

- Built with [React](https://react.dev)
- Fonts: [Baloo 2](https://fonts.google.com/specimen/Baloo+2) and [Nunito](https://fonts.google.com/specimen/Nunito) (SIL Open Font License)
- No third-party analytics, tracking, or data collection libraries are used

## Contact

**Rachel Terra Norton, MS, CCC-SLP**
RTN Communication & Literacy
[rachelslp.org](https://rachelslp.org)
