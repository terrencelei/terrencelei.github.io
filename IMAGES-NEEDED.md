# Images needed

Every image slot on the site, what to shoot, and where the file goes. Placeholders live in
`assets/placeholders/` as labeled SVGs. To swap one, add your photo under `assets/` and change the
`src` (and `width`/`height`) on the matching `<img>` in `index.html`.

| File (placeholder) | Section | Suggested shot | Aspect ratio |
|---|---|---|---|
| `assets/placeholders/headshot.svg` | Hero, arched mask | Shoulders-up portrait, plain or outdoor background, soft daylight. Keep your face in the upper-middle; the top is cropped into an arch. | 4:5 (e.g. 800x1000) |
| `assets/placeholders/about.svg` | About me | Candid of you building or testing something: shop, lab bench, launch site. | 1:1 (e.g. 1000x1000) |
| `assets/placeholders/og.svg` | Social share preview (Open Graph / Twitter card) | Name + "Mechanical Engineer" over a project photo. Save as **`assets/og.jpg`** and point the `og:image` and `twitter:image` tags at it; many sites ignore SVG previews. | 1200x630 |
| `assets/placeholders/rocket-flight-hardware.svg` | 01 Gaucho Rocket Project | Assembled vehicle or avionics bay on the bench, or the rocket on the rail at launch. | 4:3 (e.g. 1200x900) |
| `assets/placeholders/rocket-design-review.svg` | 01 Gaucho Rocket Project | You presenting at a design review, or a CAD / FEA screenshot of a part you designed. | 4:3 |
| `assets/placeholders/begley-lab.svg` | 04 Begley Lab, UCSB | Robot arm and camera rig at the workbench (with lab permission), or you at the bench. | 4:3 |
| `assets/placeholders/genentech-capstone.svg` | 05 Genentech capstone | xArm 6 in simulation (RViz / MoveIt screenshot) or a team photo. | 4:3 |

Already real: `assets/amat-fab.jpg` is a public-domain U.S. State Department photo of an Applied Materials cleanroom (Maydan Technology Center, 2022, via Wikimedia Commons), cropped to 4:3. `assets/cygnus-arrays.jpg` is a NASA photo of the Cygnus spacecraft (iss071e329920; NASA imagery is public domain, credited in the captions).
Also real (copied from the Autonomous Shopping Cart site, no action needed):
`assets/cart-photo.jpg`, `assets/cad.jpg`, `assets/vision.jpg`, `assets/follow.mp4`, `assets/follow-poster.jpg`
(chapter 06).

## Confidentiality

- **Applied Materials:** the actuator is patent pending. No photos of hardware, prototypes, CAD,
  drawings, labs or badges with internal info. The site's diagram is deliberately abstract; keep it that way.
- **Northrop Grumman:** the Cygnus photos on the site are NASA's. For the hinge slot, use only a photo
  Northrop has cleared for public release; no drawings, test vehicles or facility interiors.
- **Genentech capstone:** the project is under the sponsor's invention-assignment terms. No sponsor
  data, results, internal hardware or documents; simulation screenshots and team photos only, and
  check with the team/sponsor before posting.
- **Begley Lab:** ask the lab before posting photos of the rig.
- Get permission from anyone else who appears in a photo.
