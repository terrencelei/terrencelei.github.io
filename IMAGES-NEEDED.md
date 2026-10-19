# Images needed

Every image slot on the site, what to shoot, and where the file goes. Placeholders live in
`assets/placeholders/` as labeled SVGs. To swap one, add your photo under `assets/` and change the
`src` (and `width`/`height`) on the matching `<img>` in `index.html`.

| File (placeholder) | Section | Suggested shot | Aspect ratio |
|---|---|---|---|
| `assets/placeholders/og.svg` | Social share preview (Open Graph / Twitter card) | Name + "Mechanical Engineer" over a project photo. Save as **`assets/og.jpg`** and point the `og:image` and `twitter:image` tags at it; many sites ignore SVG previews. | 1200x630 |

Already real: `assets/amat-fab.jpg` is a public-domain U.S. State Department photo of an Applied Materials cleanroom (Maydan Technology Center, 2022, via Wikimedia Commons), cropped to 4:3. `assets/cygnus-berth.jpg` is a NASA photo of Cygnus being installed on the ISS (iss065e238807; NASA imagery is public domain, credited in the captions).
Also real: `assets/halo-render.jpg`, `assets/halo-tvc.jpg`, `assets/halo-leg-fea.jpg` are the team's own HALO CAD render and design-review material (supplied by Terrence 2026-10-18).
Also real: `assets/headshot.jpg` is his headshot (from a 674x496 screenshot, so it is soft at large sizes; a higher-resolution original would help).
Also real: `assets/about-mitty.jpg` is Terrence in his high school robotics lab (Mitty Robotics).
Also real: `assets/moveit-rviz.jpg` is a generic MoveIt/RViz screenshot from the MoveIt 2 tutorials repository (BSD-3, PickNik/Willow Garage), stand-in until a real xArm 6 simulation screenshot exists.
Also real: `assets/begley-test.mp4` (+ poster) is Terrence's own early Begley Lab test footage, cropped square.
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
- **Begley Lab:** the test footage is Terrence's own; ask the lab before posting anything else from the rig.
- Get permission from anyone else who appears in a photo.
