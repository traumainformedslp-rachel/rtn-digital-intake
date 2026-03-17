# Contributing to RTN Student Intake App

Thank you for your interest in contributing! This tool serves clinicians and students with learning differences, so contributions that improve accessibility, usability, and clinical accuracy are especially valued.

## How to Contribute

1. **Fork** the repository
2. **Create a branch** for your feature or fix (`git checkout -b feature/my-improvement`)
3. **Make your changes** and test them locally
4. **Submit a pull request** with a clear description of what you changed and why

## Guidelines

### Clinical Content
- All question wording should be **neurodiversity-affirming** — avoid deficit language
- Maintain **strengths-based framing** throughout
- Use **trauma-informed** principles (opt-out friendly, no forced responses, warm tone)
- If proposing new questions or modifying existing ones, please cite relevant research or clinical frameworks

### Code Quality
- Keep the app as a **single-file React component** for portability
- No external dependencies beyond what's currently used (React, Google Fonts)
- Maintain **print-friendly** layout
- Ensure **keyboard accessibility**
- Test both age versions (6–13 and 14+)

### Privacy
- **Never** add analytics, tracking, or data transmission of any kind
- **Never** add localStorage, sessionStorage, cookies, or any persistent browser storage
- The app must remain **fully client-side** with zero data leaving the browser

### Accessibility
- Maintain sufficient color contrast (WCAG AA minimum)
- Ensure all interactive elements are keyboard-navigable
- Use semantic HTML where possible

## Reporting Issues

If you find a bug, accessibility issue, or have a suggestion, please open a GitHub Issue with:
- A clear description of the problem or suggestion
- Steps to reproduce (for bugs)
- The browser and device you were using

## Questions?

Reach out to Rachel Norton at [rachelslp.org](https://rachelslp.org).
