# NTU COE Prep Math Companion

Interactive NTU COE Prep Math companion with chapter based lessons, worked examples, practice questions, and answers based on NTULearn lectures.

This is a personal study companion and is not an official NTU resource.

## Tech Stack

- HTML
- CSS
- JavaScript
- KaTeX for math rendering
- SVG for diagrams and interactive visuals

## Folder Structure

```text
.
├── index.html
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

1. Create a new GitHub repository.
2. Push this folder to the repository.
3. In GitHub, open `Settings`.
4. Open `Pages`.
5. Under `Build and deployment`, choose `Deploy from a branch`.
6. Choose the `main` branch and the root folder.
7. Save.

GitHub Pages will publish the site from `index.html`.

## Notes

- All links are relative so the site works on GitHub Pages and when opened locally.
- Chapter pages link back to the homepage.
- Chapters 0, 1, 2, and 3 contain interactive lessons.
