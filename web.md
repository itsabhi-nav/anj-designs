# ANJ DESIGNS 2.0 — COMPLETE LUXURY CINEMATIC WEBSITE REDESIGN AND DEVELOPMENT MASTER PROMPT

## PROJECT OVERVIEW

You are a world-class creative director, luxury website designer, award-winning digital experience specialist, senior frontend engineer, interaction designer, motion graphics specialist, and full-stack developer.

Your assignment is to completely restructure and rebuild the existing website:

**Existing website:** https://anjdesigns.in/

**Brand:** ANJ Designs by Decor Inn

**Business:** Interior design, architectural design, bespoke furniture design and manufacturing, and turnkey interior projects.

The client wants a completely new digital experience while preserving the original business identity, genuine project photography, videos, founder information, services, project names, contact details, and all other relevant business content from the existing website.

The existing website is the primary source of truth for all original assets and business information.

The new website must have an entirely different level of visual quality.

This is not a request to modernize a few cards, change the font, add a green background, or apply standard animations to an existing template.

**Completely rethink the website's layout, composition, visual hierarchy, navigation, storytelling, interactions, transitions, and overall digital experience.**

The final product should feel like a premium, custom-designed website created by a highly experienced creative agency for a luxury architecture and interior design brand.

The target perceived quality is that of a bespoke website project worth ₹1,00,000 or more. This is a quality benchmark, not a pricing claim.

The website must feel extraordinary, visually rich, architectural, cinematic, sophisticated, and professionally engineered.

When someone opens the website, the immediate reaction should be:

"Wow. This is an exceptionally designed website."

When someone scrolls, the experience should continue to surprise them through beautiful compositions, immersive project photography, elegant transitions, and purposeful motion.

However, the website must never become visually chaotic, difficult to navigate, or excessively animated.

The creative direction is:

**LUXURY CINEMATIC × ARCHITECTURAL EDITORIAL × FUTURISTIC INTERACTION DESIGN**

---

# PHASE 1 — EXTRACT THE EXISTING WEBSITE AND ALL ORIGINAL ASSETS

This phase is mandatory.

Do not begin by creating a generic website with placeholder images.

First, investigate the existing website and retrieve everything that can legitimately be accessed.

Inspect these URLs individually:

1. https://anjdesigns.in/
2. https://anjdesigns.in/about-us/
3. https://anjdesigns.in/services/
4. https://anjdesigns.in/projects/
5. https://anjdesigns.in/contact-us/

Use the live browser, available project files, accessible HTML, existing site resources, internal navigation, and publicly accessible media URLs as appropriate.

Some pages or project links may currently fail to load. Do not immediately conclude that their content does not exist. Try the homepage links, accessible source resources, and available local files.

Do not bypass authentication, access restrictions, or other security controls.

## 1.1 Original asset extraction

Identify and retrieve all accessible original assets, including:

- Official logo.
- Alternate logo versions, if available.
- Hero photographs.
- Background images.
- All project images.
- Project gallery photographs.
- Interior photographs.
- Furniture photographs.
- Founder portraits.
- Workshop and manufacturing photographs.
- Existing videos.
- Video poster images.
- Decorative graphics.
- Icons.
- Existing fonts, if legally reusable.
- Any other original visual material.

Preserve the original assets and their associations with the relevant projects.

Download and organize the assets into the new project's public asset directory whenever access and technical conditions allow.

For example:

public/
  assets/
    brand/
    home/
    founder/
    projects/
      apartment/
      gk-2-house/
      dlf-phase-1-gurugram/
      farmhouse-chandigarh/
      commercial-space-nainital/
      villa-golf-course-extension/
      baltimore-usa/
      apartment-golf-course-road/
      contemporary-bedroom/
      living-room/
      contemporary-living-room/
      vasant-vihar/
      standalone-house-vikaspuri/
    furniture/
    workshop/
    videos/
    icons/
    fonts/

Adapt the folder structure to the actual assets discovered.

Do not create empty folders or pretend missing assets have been retrieved.

## 1.2 Preserve the original visual work

The original project photography is a core requirement.

DO NOT:

- Replace genuine project photographs with random stock images.
- Generate AI interiors and present them as ANJ Designs projects.
- Replace the founder's real portrait with a generated person.
- Invent manufacturing photographs.
- Substitute unrelated photographs simply because they look more attractive.
- Invent videos that were never on the existing website.
- Discard original project imagery because it does not fit a new layout.
- Alter photographs in a way that misrepresents the actual completed work.

You may improve presentation through:

- Responsive image sizing.
- Appropriate compression.
- Modern image formats.
- Intentional crops.
- `object-position`.
- Image masks.
- Image reveals.
- Layered compositions.
- Subtle parallax.
- Transitions and carefully controlled scaling.

Preserve the underlying original media.

If a photograph cannot be downloaded, retain its verified URL only if it is accessible and appropriate for production use. Document the missing asset and provide a graceful fallback.

Do not fabricate image paths.

## 1.3 Logo handling

The client will provide the official logo separately if it cannot be retrieved from the existing website.

Create a reusable logo component that can accept the supplied file.

Do not invent a new logo or change the official brand mark.

The website's design should complement the actual logo and maintain its brand recognition.

## 1.4 Asset manifest

Create a central asset manifest, such as:

src/data/assets.ts

Record, where available:

- Asset path.
- Original filename.
- Asset type.
- Associated page.
- Associated project.
- Dimensions.
- Image aspect ratio.
- Whether it is suitable for hero use.
- Whether it is suitable for a project gallery.
- Whether the asset is missing or unverified.

Verify that every local asset reference points to a real file.

## 1.5 Content extraction

Extract and preserve:

- All accessible page text.
- Page titles and headings.
- Service descriptions.
- Founder information.
- Company history.
- Brand values.
- Project names.
- Contact details.
- Testimonials.
- Social links.
- Address.
- Existing calls to action.
- Footer content.
- Existing links.
- Any relevant metadata.

Do not invent missing business facts.

Where the original website contains conflicting information, record the inconsistency and avoid silently choosing one version.

The existing website must remain the factual source of truth, while the presentation is completely redesigned.

---

# PHASE 2 — BRAND IDENTITY AND VISUAL ART DIRECTION

## 2.1 Core design philosophy

Design the website as if it were an architectural composition.

Interior design is fundamentally about space, balance, rhythm, proportion, materials, light, depth, and visual hierarchy.

The website must demonstrate those same qualities through its own design.

The layout itself should communicate the company's design expertise.

Use:

- Architectural proportions.
- Editorial asymmetry.
- Large visual focal points.
- Layered imagery.
- Intentional negative space.
- Carefully balanced typography.
- Dramatic image scale.
- Strong section transitions.
- A sophisticated colour rhythm.
- Beautifully composed content.

Do not create a dull corporate website.

Do not create a standard interior design template.

Do not make every section look identical.

Do not use the same three-card layout throughout the entire website.

Each major section must have its own art direction while remaining part of one coherent visual system.

## 2.2 Colour palette

Use a sophisticated green-based brand identity.

Primary forest green:

#102820

Dark emerald:

#204C3C

Secondary green:

#315C49

Muted sage:

#849B80

Warm ivory:

#F1F0E8

Soft white:

#FAFAF6

Champagne accent:

#C0A878

Dark text:

#202720

Muted light text:

#A7B2AA

Use forest green for dramatic hero sections, selected project experiences, footer areas, and major visual transitions.

Use ivory for editorial storytelling, selected service sections, founder content, and reading-heavy areas.

Use sage to introduce softer secondary surfaces.

Use champagne sparingly for fine borders, selected labels, and restrained accent details.

The website must not be entirely dark.

Alternate dark and light sections to create a deliberate rhythm between drama and breathing space.

The result should feel premium and sophisticated, not gloomy.

Adjust the palette slightly if required to harmonize with the official logo.

## 2.3 Typography

Use a premium editorial type system.

Recommended display fonts:

- Cormorant Garamond.
- Or another elegant, appropriately licensed editorial serif.

Recommended body fonts:

- Manrope.
- Inter.
- Or an equivalent modern sans-serif.

Use oversized display typography for important headlines.

Use restrained italic serif treatments for selected phrases.

Use smaller uppercase labels for project locations, section numbers, and metadata.

Use fluid typography with CSS `clamp()`.

Ensure that headings, body text, navigation, and buttons remain readable on small screens.

Do not use typography purely as decoration if it makes the content difficult to understand.

## 2.4 Layout system

Build a consistent design system with:

- Responsive containers.
- A 12-column desktop grid where appropriate.
- Fluid spacing.
- Intentional asymmetry.
- Responsive image ratios.
- Consistent button treatments.
- Carefully controlled borders and radii.
- Clear heading hierarchy.
- Reusable layout primitives.

Use full-bleed images where appropriate.

Allow some images to extend beyond the conventional content grid.

Combine oversized images with smaller editorial details.

Use negative space deliberately, but do not leave large empty areas simply to make the page appear minimal.

The website must feel rich, intentional, and complete.

---

# PHASE 3 — COMPLETE WEBSITE STRUCTURE

Create the following pages:

1. Home.
2. About Us.
3. Services / Expertise.
4. Projects.
5. Individual Project Detail pages.
6. Contact Us.

Use reusable components and structured content models.

Do not duplicate the same page manually for every project.

## Main navigation

Desktop navigation should contain:

- Official ANJ Designs logo.
- Home.
- About Us.
- Expertise.
- Projects.
- Contact.
- A prominent "Let's Collaborate" CTA.

The navigation may begin as a transparent overlay over the hero image and transition into a refined solid background as the visitor scrolls.

Use smooth, controlled transitions.

Mobile navigation should have:

- Official logo.
- Elegant menu trigger.
- Spacious overlay menu.
- Clear navigation hierarchy.
- Prominent enquiry CTA.

All links must work.

The website must support direct URLs, browser history, refresh, and normal navigation.

---

# PHASE 4 — HOMEPAGE: AN IMMERSIVE ARCHITECTURAL EXPERIENCE

The homepage is the most important part of the website.

Build it as a cinematic sequence that introduces the brand, showcases original work, explains the company's expertise, and encourages enquiries.

Do not simply stack text and image cards.

## 4.1 Opening hero: make the first screen extraordinary

Create a full-viewport cinematic hero.

Use the strongest suitable original photograph or video retrieved from ANJ Designs.

Do not use unrelated stock imagery.

Design the hero with:

- Full-screen architectural photography.
- Sophisticated dark-green image treatment where necessary.
- Elegant navigation.
- Large editorial typography.
- A restrained brand label.
- Strong visual composition.
- Animated headline reveal.
- Subtle image scale or parallax.
- Carefully positioned CTAs.
- A discreet scroll indicator.

Suggested content:

Brand label:

ANJ DESIGNS BY DECOR INN

Headline:

"Spaces that move you."

Supporting copy:

"Thoughtfully designed interiors, bespoke furniture and considered craftsmanship, shaped around the way you live and work."

Primary CTA:

"Explore Our Work"

Secondary CTA:

"Let's Collaborate"

Treat this as proposed copy and preserve the original business meaning.

### Hero animation

On initial load:

1. Introduce the page background and navigation.
2. Reveal the hero image with a sophisticated mask or clipping transition.
3. Reveal the headline line by line.
4. Introduce supporting text.
5. Reveal the CTA buttons.
6. Finish with a restrained scroll indicator.

Keep the sequence smooth and reasonably short.

Do not make visitors wait through a long loading animation before they can interact with the website.

Do not display a fake loading percentage.

On mobile, simplify the choreography while retaining the same visual quality.

## 4.2 Brand statement section

Transition from the hero into a visually contrasting section.

Use the existing brand statement:

"Built on Belief ~ Powered by Purpose"

Use oversized typography and an editorial composition.

Combine the headline with a genuine original photograph or a detail crop from the company's portfolio.

Use text reveal animations and subtle background transitions.

Explain the brand's design philosophy using existing website information.

## 4.3 Featured project experience

Make project photography the visual centerpiece of the homepage.

Use the actual ANJ Designs portfolio images.

Do not create a generic grid of identical rectangular cards.

Create a curated sequence containing:

- One dominant featured project.
- Large architectural imagery.
- Alternating portrait and landscape compositions.
- Asymmetric image positioning.
- Project names and verified locations.
- Restrained metadata.
- Elegant project navigation.
- Subtle image transitions.
- A clear link to the complete portfolio.

Where the assets support it, use one or two distinctive interaction patterns:

- An image expanding as it enters the viewport.
- A horizontally navigable project sequence.
- A pinned visual with changing project text.
- A large photograph that transitions into the next section.
- A layered image composition with different scroll speeds.

Do not use all these effects simultaneously.

Select the most appropriate interactions based on the actual photographs and page structure.

The result should feel like a carefully curated architecture portfolio.

## 4.4 Services section

Introduce the three principal service categories:

1. Interior Design.
2. Bespoke Furniture Design.
3. Turnkey Interior Design.

Architectural design may be presented as a separate offering if the business confirms its scope.

Use a different layout for each service.

For example:

- An oversized image-and-text composition for interior design.
- A close-up material and furniture composition for bespoke furniture.
- A larger architectural image with a contrasting editorial text panel for turnkey work.

Use genuine project imagery wherever possible.

Use large section headings, controlled reveal animations, and subtle transitions.

Explain each service clearly.

Do not repeat identical cards for every service.

## 4.5 Design philosophy

Introduce the brand's existing values:

- Empathetic.
- Visionary.
- Honest.
- Conscious.

Use expressive typography and a refined editorial layout.

Explain each value using information from the original website.

Selected words may appear through restrained animation.

The purpose is to communicate how the company thinks, not simply display four decorative labels.

## 4.6 Craftsmanship and manufacturing

Create a visually rich section showing the relationship between design, furniture, and craftsmanship.

Use original furniture photographs and genuine manufacturing imagery where available.

Use carefully composed layouts, subtle image transitions, and close-up imagery.

Explain the company's bespoke furniture capabilities using verified information.

If workshop photographs are unavailable, use genuine finished furniture photographs.

Do not fabricate production scenes or manufacturing claims.

## 4.7 Founder section

Introduce Annie Nagpal Jain using the original portrait if available.

Use an elegant editorial layout that combines photography, biography, and design philosophy.

Include relevant information from the original website.

Flag inconsistencies in the company history rather than silently choosing a date.

Provide a clear link to the About Us page.

## 4.8 Closing CTA

Create a memorable full-width forest-green section.

Suggested headline:

"Your space deserves a thoughtful beginning."

Supporting copy:

"Tell us what you're imagining. Let's explore how thoughtful design and craftsmanship can bring it to life."

CTA:

"Start a Conversation"

Use a sophisticated entrance animation and restrained accent details.

The CTA must lead to the real contact experience.

## 4.9 Footer

Create a complete, polished footer containing:

- Official logo.
- Short company introduction.
- Main navigation.
- Services navigation.
- Phone numbers.
- Email address.
- Office address.
- Social links.
- Copyright information.
- Relevant legal links, if those pages exist.

Use the existing business details.

Do not fabricate social URLs or display dead links.

---

# PHASE 5 — ABOUT US PAGE

Create a founder-led, premium editorial storytelling page.

The About page must feel personal, credible, and visually distinct from the homepage.

## Hero

Suggested heading:

"Design with depth. Create with purpose."

Use an original photograph or founder image.

## Company story

Extract the existing company story.

The current website contains references to 2010 and 2016 in connection with the company's history.

Do not silently resolve this inconsistency.

Use a neutral historical introduction until the correct dates are confirmed.

## Founder profile

Introduce Annie Nagpal Jain.

Use the original portrait and biography.

Preserve the stated design education and professional background, subject to approval.

Do not invent awards or qualifications.

## Design philosophy

Present the existing brand values with thoughtful descriptions and an elegant visual composition.

## Approach and craftsmanship

Explain the company's client-centric approach, design thinking, furniture expertise, and production capabilities using verified content.

## Final CTA

Invite visitors to explore the services or discuss a project.

Use a visually strong closing section.

---

# PHASE 6 — SERVICES / EXPERTISE PAGE

Build a complete service presentation.

## Interior Design

Present the company's interior design approach, including relevant aspects of:

- Spatial planning.
- Layouts.
- Material selection.
- Colours and textures.
- Lighting.
- Furniture coordination.
- Residential and commercial interiors.

Only claim services that are actually offered.

## Bespoke Furniture Design

Explain custom furniture, finishes, wall panels, and decorative elements where supported by the existing content.

Use genuine furniture photography.

Show how custom furniture relates to the overall design of a space.

## Turnkey Interior Design

Explain the company's turnkey positioning.

Clarify the actual scope of execution before claiming that civil work, electrical work, plumbing, procurement, installation, or project management are included.

## Architectural Design

Include this as a separate service only after verifying the actual offering.

## Visual presentation

Use large images, varied section layouts, editorial typography, and purposeful scroll animations.

Make the page visually impressive without compromising service clarity.

End each service section with a relevant CTA.

---

# PHASE 7 — PROJECTS PAGE AND ORIGINAL PORTFOLIO

The project portfolio is essential to the website's credibility.

Build a premium editorial project archive using the actual images and project information retrieved from the existing website.

## Initial project inventory

Use these project names identified from the supplied homepage text:

1. Apartment.
2. GK 2 House.
3. DLF Phase-1 Gurugram.
4. Farm House, Chandigarh Punjab.
5. Commercial Space, Nainital.
6. Villa, Golf Course Extension Road.
7. USA, Baltimore.
8. Apartment, Golf Course Road, Gurugram.
9. Contemporary Theme based Bedroom.
10. Living Room.
11. Contemporary Living Room.
12. Vasant Vihar, Residential Project.
13. Standalone House, Vikaspuri, New Delhi.

Reconcile these names with the live website and original assets.

Preserve the original project names unless the business approves corrections.

Do not assume that all projects have a full gallery or a dedicated page.

## Project index design

Create an asymmetrical, editorial project layout.

Use:

- Large original photographs.
- Portrait and landscape imagery.
- Variable image sizes.
- Project titles.
- Verified location labels.
- Verified categories.
- Restrained metadata.
- Elegant hover effects.
- Clear navigation.
- Smooth image reveals.

Avoid a repetitive grid.

## Project filters

Where the available data supports them, add:

- All Projects.
- Residential.
- Commercial.
- Room Interiors.
- International.

Only categorize projects when the available information supports the classification.

Filtering must work correctly and remain touch-friendly.

## Individual project pages

Create reusable project-detail templates.

Support:

- Project title.
- Location.
- Category.
- Introduction.
- Hero image.
- Image gallery.
- Additional verified details.
- Previous and next project navigation.
- Related projects.
- Contact CTA.

Do not invent project descriptions, square footage, completion dates, budgets, clients, or materials.

If only a name and images are available, create an image-led page using the confirmed information.

## Gallery interactions

Implement accessible image galleries with:

- Next and previous navigation.
- Keyboard controls.
- Touch support.
- Optional thumbnails.
- Lightbox.
- Focus management.
- Correct image aspect ratios.
- Meaningful alt text.

Do not hide essential information behind hover states.

---

# PHASE 8 — CONTACT PAGE

Build a premium, practical enquiry experience.

## Hero

Suggested heading:

"Let's create something meaningful."

Supporting copy:

"Tell us about your space, your ideas, and what you would like to create."

## Contact details

Use the existing information:

Email:
decorinndesigns@gmail.com

Phone:
+91 9231100003

Phone:
+91 9958961111

Address:
Plot No. 400–401, 2nd Floor, 100 Foot Road, Ghitorni, New Delhi – 110030.

Other email addresses appearing on the current website:

- annie@anjdesigns.in
- kabir@anjdesigns.in
- info@anjdesigns.in

Confirm which addresses should be displayed publicly.

## Contact form

Include:

- Full name.
- Email.
- Phone, if needed.
- Project type.
- Project location.
- Optional budget.
- Message.
- Optional attachment, only if a secure upload system is implemented.

Implement real validation, error handling, loading states, and submission feedback.

Do not create a fake form that only displays a success message.

If a backend or email provider is not configured, document the missing integration.

Include real phone, email, and map links where their destinations can be verified.

---

# PHASE 9 — EXTRAORDINARY MOTION AND INTERACTION DESIGN

The website must have a sophisticated motion system.

The goal is to make scrolling feel like moving through a carefully art-directed architectural presentation.

It must not feel like a normal website with basic fade-in animations.

## 9.1 Motion design language

Use a deliberate combination of:

- Directional entrance animations.
- Image clipping reveals.
- Oversized typography reveals.
- Staggered text transitions.
- Parallax.
- Image expansion.
- Horizontal project storytelling.
- Background colour transitions.
- Layered content movement.
- Animated navigation.
- Restrained cursor interactions.
- Micro-interactions on buttons and links.

Use different effects in different sections.

Do not animate everything.

## 9.2 Scroll choreography

Examples of appropriate interactions:

- A headline enters from the left while the original project photograph reveals from the right.
- A large image expands as the visitor reaches a project section.
- Supporting text rises into view beneath a stationary headline.
- A project image moves subtly at a different speed from its surrounding text.
- A horizontal project sequence advances while the visitor scrolls through a dedicated section.
- A dark-green section transitions into ivory as the next editorial story begins.
- An oversized project title reveals gradually as the image comes into view.

Use these techniques selectively.

Every interaction must serve the content.

Do not create a separate complex scroll animation for every section merely to increase the number of effects.

## 9.3 Motion libraries

Use:

- GSAP and ScrollTrigger for complex scroll-driven animations.
- Motion for smaller React interactions.
- CSS transitions for simple states.
- Lenis only if smooth scrolling integrates reliably with the selected animation system.

Ensure that scroll triggers are refreshed appropriately after images and layouts load.

Clean up animation instances and event listeners.

Do not create multiple animation systems that conflict with one another.

## 9.4 Reduced motion and usability

Respect `prefers-reduced-motion`.

Ensure that essential content is visible if animation code fails.

Do not trap visitors inside pinned sections.

Do not make ordinary scrolling difficult.

Provide simpler motion alternatives for mobile devices when appropriate.

Keep all essential information available without waiting for an animation.

---

# PHASE 10 — FULL RESPONSIVE DESIGN

The website must work across desktop, laptop, tablet, mobile, and foldable devices.

Do not simply shrink the desktop layout.

Recompose the interface intelligently for each available width.

## Responsive targets

Test at:

- 320px.
- 360px.
- 375px.
- 390px.
- 430px.
- 600px.
- 768px.
- 820px.
- 1024px.
- 1280px.
- 1440px.
- 1920px.

These are representative test widths, not device-specific assumptions.

## Mobile requirements

- Full-width imagery where appropriate.
- Readable headings.
- Correct image focal points.
- No unintended horizontal overflow.
- Comfortable touch targets.
- Accessible navigation.
- Touch-friendly galleries.
- Responsive typography.
- Functional contact forms.
- No hover-only interactions.
- No oversized fixed elements covering content.
- No excessively long pinned animations.
- Smooth scrolling without unnecessary jank.

## Foldable devices

Support narrow cover screens and wider unfolded screens.

Use the available viewport width rather than relying on device names or user-agent detection.

Ensure layouts reflow properly when the viewport changes.

## Tablet requirements

Do not simply stretch the mobile layout.

Use suitable image ratios, navigation, grid layouts, and typography for tablet widths.

## Responsive testing

Inspect the actual browser rendering at the representative widths.

Fix all obvious layout problems before completion.

---

# PHASE 11 — TECHNICAL IMPLEMENTATION

Use a modern, maintainable stack.

Preferred technologies:

- Next.js with App Router.
- React.
- TypeScript.
- Tailwind CSS.
- GSAP and ScrollTrigger.
- Motion for appropriate component interactions.
- Lucide React for icons.

Use compatible stable dependency versions.

Inspect the existing repository before making major architectural changes.

## Suggested structure

src/
  app/
    page.tsx
    about/
      page.tsx
    services/
      page.tsx
    projects/
      page.tsx
      [slug]/
        page.tsx
    contact/
      page.tsx
    api/
      contact/
        route.ts
    layout.tsx
    globals.css
    not-found.tsx
    sitemap.ts
    robots.ts

  components/
    layout/
    home/
    projects/
    contact/
    motion/
    ui/

  data/
    assets.ts
    projects.ts
    services.ts
    site.ts

  lib/
    animations.ts
    validation.ts
    email.ts
    seo.ts

  types/
    project.ts
    service.ts

public/
  assets/

Adjust the structure to the actual implementation.

## Architecture rules

- Keep content separate from presentation.
- Use reusable components.
- Avoid giant monolithic page components.
- Use server rendering for content that does not require client interaction.
- Use client components only when necessary.
- Keep animation code maintainable.
- Use typed data structures.
- Validate all asset paths.
- Do not introduce unnecessary databases or authentication.
- Keep secrets server-side.
- Do not fabricate backend integrations.

Use a lightweight data-driven architecture unless the business explicitly needs a CMS.

---

# PHASE 12 — PERFORMANCE AND MEDIA OPTIMIZATION

A visually extraordinary website must also be fast.

## Images

- Preserve the original assets.
- Use responsive image sizes.
- Use modern image formats where supported.
- Prioritize the main hero image.
- Lazy-load appropriate below-the-fold media.
- Avoid layout shifts.
- Use suitable aspect ratios.
- Avoid loading multiple full-resolution images when they are not needed.

## Videos

- Optimize video size and format.
- Use poster images.
- Avoid unnecessary autoplay.
- Never autoplay audio.
- Avoid loading heavy video assets prematurely.
- Provide responsive fallbacks.

## Runtime

- Avoid excessive JavaScript.
- Avoid unnecessary WebGL.
- Avoid continuously animating expensive properties.
- Prefer transform and opacity for animation.
- Dynamically load heavy features when appropriate.
- Ensure animations remain smooth on ordinary mobile hardware.

## Quality targets

Aim for Lighthouse scores of:

- Performance: 90+.
- Accessibility: 95+.
- Best Practices: 95+.
- SEO: 95+.

These are targets to validate through testing, not guaranteed results.

Assess Core Web Vitals and document remaining problems.

---

# PHASE 13 — ACCESSIBILITY, SEO, AND SECURITY

## Accessibility

Implement:

- Semantic HTML.
- Logical heading hierarchy.
- Keyboard-accessible navigation.
- Visible focus states.
- Accessible forms.
- Meaningful image alt text.
- Sufficient contrast.
- Reduced-motion support.
- Accessible lightboxes.
- Proper focus management.
- Descriptive link labels.

## SEO

Implement:

- Unique page titles.
- Meta descriptions.
- Canonical URLs.
- XML sitemap.
- Robots.txt.
- Open Graph metadata.
- Structured data where accurate.
- Clean project URLs.
- Custom 404 page.
- Appropriate redirects from old URLs.

Preserve existing search visibility as far as practical.

## Security

For the contact form:

- Validate requests on the server.
- Sanitize user input appropriately.
- Apply rate limits.
- Add suitable spam protection.
- Protect credentials.
- Handle failed email delivery.
- Avoid unnecessary storage of personal data.
- Implement secure uploads if file uploads are enabled.

Do not claim that a form is functional until it has been tested.

---

# PHASE 14 — PROJECT DATA AND BUSINESS ACCURACY

Create structured project and service data.

A project record should support:

- Stable slug.
- Title.
- Location, when verified.
- Category, when verified.
- Description, when available.
- Hero image.
- Gallery.
- Featured status.
- Sort order.

Use optional fields for information that is not available.

Do not display empty labels.

Do not fabricate missing project information.

The following items must be flagged for business confirmation:

1. Company history: 2010 versus 2016.
2. Manufacturing facility size and capacity.
3. Current public email addresses.
4. Scope of architectural design services.
5. Scope of turnkey execution.
6. Missing portfolio descriptions.
7. Missing project galleries.
8. Any unverified client testimonials.

Do not silently rewrite or invent factual details.

---

# PHASE 15 — QUALITY ASSURANCE

The website must be tested in a real browser.

## Functional tests

Verify:

- Navigation.
- Page routing.
- Project detail URLs.
- Project filters.
- Galleries.
- Lightboxes.
- Contact links.
- Contact form.
- Error states.
- Loading states.
- Browser back and forward.
- Direct page access.
- Responsive navigation.
- 404 handling.

## Visual tests

Inspect the homepage and every inner page.

Look for:

- Generic layouts.
- Poor image crops.
- Weak typography.
- Repetitive animation.
- Incorrect spacing.
- Text collisions.
- Excessive blank areas.
- Broken images.
- Inconsistent colours.
- Abrupt transitions.
- Unreadable mobile content.

## Animation tests

Verify:

- No stuck scroll sections.
- No inaccessible content.
- No broken animations on route changes.
- No layout shifts.
- No animation-induced horizontal overflow.
- No excessive performance degradation.
- Reduced-motion behaviour.
- Mobile touch interactions.

## Technical checks

Run:

- TypeScript checks.
- Linting.
- Production build.
- Relevant automated tests.
- Browser smoke tests.
- Broken-link checks.
- Lighthouse audits.

Fix the defects rather than merely listing them.

---

# PHASE 16 — DEPLOYMENT AND HANDOVER

Prepare the website for production deployment.

Provide:

- Complete source code.
- Working production build.
- Asset manifest.
- Environment variable example.
- Local setup instructions.
- Deployment instructions.
- URL redirect mapping.
- List of unresolved content questions.
- Contact form integration documentation.
- Testing results.
- List of missing or inaccessible assets.

Do not automatically overwrite the live website.

Develop and test the new website separately before replacing the current one.

Preserve the original site and assets until the new implementation is approved.

Do not claim deployment, testing, or form delivery has succeeded unless it has actually been verified.

---

# FINAL ACCEPTANCE CRITERIA

The project is complete only when:

1. The entire website has been redesigned.
2. All agreed pages exist.
3. Original photographs and videos have been preserved wherever accessible.
4. The original brand identity and logo are respected.
5. The project inventory has been reconciled with available assets.
6. The website looks premium, immersive, cinematic, and distinctive.
7. The design demonstrates architectural composition and visual sophistication.
8. Major sections have purposeful, varied animations.
9. The website remains usable without motion.
10. Desktop, tablet, mobile, and foldable layouts work correctly.
11. All interactive controls work.
12. The contact form is functional or its remaining configuration is documented.
13. SEO and accessibility foundations are implemented.
14. Performance has been measured.
15. The production build succeeds.
16. No obvious placeholder text, broken images, or dead links remain.
17. Missing assets and unverified business facts are documented.
18. The source code is maintainable and ready for handover.

## FINAL CREATIVE DIRECTIVE

Do not create a dull website.

Do not create a generic website.

Do not merely apply animations to a standard layout.

Create a fully art-directed digital experience that feels like the work of a premium international creative agency.

Use the original ANJ Designs photographs and videos as the visual foundation.

Build cinematic transitions, expressive typography, sophisticated green-and-ivory colour compositions, immersive project presentations, varied editorial layouts, elegant navigation, and carefully choreographed scroll interactions.

Make the homepage visually unforgettable.

Make the inner pages equally polished.

Make the portfolio worthy of the work it presents.

Make the mobile experience just as intentional as the desktop experience.

The final website should feel exceptional because of the quality of its design, its original imagery, its movement, its composition, and its engineering.

**Extract the real assets. Preserve the real business. Reimagine the entire experience. Build every page. Test every interaction. Deliver a complete production-ready website.**