# ReguLens implementation plan

## Implementation approach

ReguLens is a responsive React + Vite single-page application with client-side routing and a shared demo data model. The cinematic treatment now combines the existing CSS architectural fallback with a lazy-loaded, procedural Three.js scene: real document meshes, metallic scale geometry, particles, lighting, camera parallax, scroll influence, and raycast hover/click states. The product workspace remains a serious operational UI on warm ivory surfaces with dark navy navigation, antique-gold rules, teal verification accents, and explicit demo labels.

The build uses semantic HTML, lucide-style inline icon treatments using the existing dependency-free SVG pattern, responsive CSS, lazy loading for the 3D chunk, and reduced-motion fallbacks. The landing experience includes a 4.8-second cinematic intro with a visible Skip intro action, stored in session storage so it does not replay on every internal navigation. The scene is reused through dedicated profile and vault modes on login, dashboard, Applicability, What-If Simulator, the document observatory, and ProofPath. No backend authentication or legal monitoring is implied: the login offers a clearly labeled local demo path, and all records/statistics are marked demonstration data.

## Design

### Alternative styles considered

- **Cinematic Legal Modernism** (0.07): Monumental architecture, editorial typography, gold linework, and slow light movement make legal intelligence feel authoritative and contemporary.
- **Archive Instrument** (0.06): Light research surfaces, monospaced record metadata, and red/green document evidence evoke a forensic legal archive.
- **Quiet Operations** (0.05): Restrained color, generous whitespace, and utilitarian controls prioritize calm operational decision-making.

### Chosen direction: Cinematic Legal Modernism

**Design Movement:** Editorial luxury product design fused with architectural visualization and forensic document interfaces.

**Core Principles:** Authority without intimidation; evidence over ornament; deliberate motion; clarity under pressure.

**Color Philosophy:** Midnight navy and deep blue-black create a chamber-like sense of focus. Warm ivory makes legal text feel physical and legible. Antique gold signals verified importance and human judgment, while restrained teal marks checked evidence and muted red/green preserve document-diff semantics without turning the product into a traffic light.

**Layout Paradigm:** Asymmetrical compositions with a strong left-to-right narrative: cinematic visual mass on one side, precise copy or action on the other. Workspace pages use a persistent rail and offset content columns rather than centered card grids.

**Signature Elements:** Architectural corner lines and pillar contours; a geometric balance-scale mark; proof strips with verification ticks and monospaced record identifiers.

**Interaction Philosophy:** Interactions should feel like handling a research instrument: direct, reversible, and explicit. Search/filter/sort state is visible. Rule changes state which input changed and why. Buttons use quiet lift and gold edge light, not bounce.

**Animation:** Slow parallax in the hero, 8–16 second ambient light sweeps, gentle scale movement, 180–260ms control transitions, and scroll reveals that never block access. Under `prefers-reduced-motion`, disable transforms and ambient movement while preserving contrast and hierarchy.

**Typography System:** A serif display face for high-impact headlines (`DM Serif Display`, with Georgia fallback) paired with a clean sans body (`Manrope`, with Arial fallback). Small caps metadata uses increased tracking; monospaced text is reserved for hashes, IDs, and legal paragraph markers.

**Brand Essence:** Evidence-driven regulatory intelligence for Indian SMEs that turns legal change into an operational next step. Personality: assured, exacting, humane.

**Brand Voice:** Headlines are concise and consequential; CTAs are verbs with a point of view; microcopy discloses what is demo data and what is verified. Example lines: “See the difference, not just the document.” “Know what changed. Know where you stand. Know what to do next.”

**Wordmark & Logo:** The wordmark is set in a high-contrast serif paired with a small geometric lens mark: two intersecting arches form a viewing aperture over a gold evidence point.

**Signature Brand Color:** Antique gold `#C8A96E`, used sparingly as the ownable proof-and-focus accent.

## Product structure

- `src/main.tsx`: React entry and route-aware application shell.
- `src/LegalScene3D.tsx`: Lazy-loaded Three.js scene with procedural architecture, scale, documents, particles, camera motion, and raycast interactions.
- `src/styles.css`: Global tokens, cinematic hero, workspace, responsive, and motion styles.
- `src/data.ts`: Shared mock regulatory records, assessments, document comparison content, and simulator rules.
- `public/manus-routes.json`: Complete route manifest for the managed preview.
- `public/regulens-mark.svg`: Local logo mark and project favicon source.
- `app.config.ts`: Project logo metadata.

## Workflow

1. Establish project files, route manifest, plan, and outcome TODO.
2. Implement shared components and route-specific views with local demo state.
3. Run diagnostics and production build, then fix confirmed errors.
4. Start the managed Preview, verify route reachability and key interactions with source/build checks and targeted screenshots when needed.
5. Commit the accepted implementation to the canonical remote so it becomes a checkpoint.

## Final immersive object pass
The next increment extends the existing lazy Three.js scene without changing routes or demo legal rules. It adds shadow-enabled lighting, purposeful Indian-state globe connectivity, small business-sector silhouettes, an opening evidence-vault door state, and a particle-assembling verification shield. Login documents will orbit the scale during the valid-entry transition, while dedicated comparison/profile/vault modes remain lightweight for integrated graphics.

## Landing intelligence console
The landing page now includes a reference-inspired product rail between the editorial introduction and the deeper story sections. It groups Dashboard, Regulatory Updates, Legal Diff, Business Profiles, What-If Simulator, Action Checklist, ProofPath Audit Record, Sources & Evidence, and Business Impact into one animated intelligence environment. Each option has a meaningful active state, signal metric, route-connected CTA, animated network/orbit treatment, and a responsive horizontal rail on mobile. These are views into the existing working routes rather than invented backend modules.
