# terrencelei.github.io

Personal mechanical-engineering portfolio for Terrence Lei, served by GitHub Pages at
https://terrencelei.github.io/.

A single static page with no build step and no JavaScript libraries:

| File | What it holds |
|---|---|
| `index.html` | All content: hero, six featured projects (01–06) with inline-SVG explainers, about, experience, skills, interests, contact |
| `styles.css` | Design tokens (light "warm machine shop" + dark theme), layout, components, explainer animations |
| `main.js` | Theme toggle (saved in localStorage), mobile menu, scroll reveals, explainers that animate only in view, counters, cart video autoplay in view |
| `resume.pdf` | The resume linked from the nav, hero and contact section |
| `assets/` | Cart project media (real) and `assets/placeholders/*.svg` (labeled placeholders) |
| `IMAGES-NEEDED.md` | Every image slot, what to shoot, aspect ratio, confidentiality notes |
| `.nojekyll` | Serve files as-is (no Jekyll processing) |

## Edit content

- **Text:** edit `index.html` directly. Each project is an `<article class="chapter">` with an id
  (`rocket`, `applied-materials` (State Dept. cleanroom photo), `northrop-grumman` (hinge diagram + NASA Cygnus photo), `begley-lab` (own test footage), `genentech` (generic MoveIt screenshot), `shopping-cart`).
- **Interests:** replace `[Interest 1]` … `[Interest 4]` and their one-line descriptions in the
  `#interests` section.
- **About me:** the bio in `#about` is a draft written from the resume; rewrite it in your own voice.
- **Resume:** replace `resume.pdf` with the new file (keep the name).
- **Colors / fonts:** change the custom properties at the top of `styles.css`. Light tokens are on
  `:root`; dark tokens are repeated under the `prefers-color-scheme: dark` block and `[data-theme="dark"]`.

## Swap a placeholder image

1. Put the photo in `assets/` (JPG or WebP, around 1600 px on the long side, under ~300 KB).
2. In `index.html`, change the `<img src>` from `assets/placeholders/<name>.svg` to your file and update
   `width`, `height` and `alt`.
3. For the social preview, save a 1200x630 `assets/og.jpg` and point the `og:image` and
   `twitter:image` meta tags at `https://terrencelei.github.io/assets/og.jpg`.

See `IMAGES-NEEDED.md` for the full list and what must not be photographed.

## Preview locally

```sh
python3 -m http.server 8000
# open http://localhost:8000/
# ?theme=dark or ?theme=light forces a theme; ?shot shows every section and explainer in its static state
```

Animations respect `prefers-reduced-motion`; with it on, every explainer shows its resting state and
the video gets controls instead of autoplaying.
