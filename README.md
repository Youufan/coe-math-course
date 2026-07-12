# Alice's Mathematics

Alice's Mathematics is an independent personal mathematics workspace built as a static HTML, CSS, and JavaScript website. It contains chapter based lessons, preserved worked examples, practice questions, revealable solutions, handwriting attempts, local notes, bookmarks, formula search, and review tools.

This is a personal study tool and is not affiliated with any institution.

## Tech Stack

- HTML
- CSS
- Plain JavaScript
- KaTeX for math rendering
- SVG for diagrams and interactive visuals
- Local storage for progress, notes, bookmarks, confidence, and review status
- IndexedDB for structured handwriting strokes

## Folder Structure

```text
.
├── index.html
├── content-inventory.json
├── assets
│   ├── style.css
│   └── tutor.js
└── chapters
    ├── chapter-0.html
    ├── chapter-1.html
    ├── chapter-2.html
    └── chapter-3.html
```

## Run Locally

Open `index.html` directly in a browser.

For a local server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## GitHub Pages Deployment

1. Create a GitHub repository.
2. Push this folder to the repository.
3. In GitHub, open `Settings`.
4. Open `Pages`.
5. Under `Build and deployment`, choose `Deploy from a branch`.
6. Choose the `main` branch and the root folder.
7. Save.

GitHub Pages will publish the site from `index.html`.

## Content Preservation

`content-inventory.json` records chapter sections, examples, questions, solutions, and hashes from the preserved lesson pages. Use it to check that future interface changes do not delete academic content.
