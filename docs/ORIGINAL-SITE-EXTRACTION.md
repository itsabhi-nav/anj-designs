# ANJ Designs — Original Site Extraction (Phase 1 research)

Source of truth: `https://anjdesigns.in/` (WordPress / Elementor, theme *theratio*).
Extraction date: 2026-10-20.

Everything below is **verbatim or near-verbatim from the original site or the
company's own official portfolio PDFs** hosted on that site. Nothing is invented.

---

## 1. Pages discovered

| URL | Status | Notes |
| --- | --- | --- |
| `/` | 200 | Home |
| `/about-us/` | 200 | About |
| `/services/` | 200 | Services |
| `/contact-us/` | 200 | Contact |
| `/projects/` | **404** | Broken — the real portfolio lives at `/anjproject/` |
| `/anjproject/` | 200 | The real 13-project portfolio index |
| `/portfolio/project-2 … project-24` | 200 | **Theme demo content only** (identical "Project N", Lorem Ipsum biophilia copy, "architect: David Oswald", "client: OceanThemes", date 2020). These are *not* ANJ projects and are **not** carried over. |
| `/lead-from/`, `/about-us-old/` | 200 | Legacy/duplicate pages |
| `/portfolio-category/{residential,commercial,contemporary,fusion}` | 200 | Category archives |

WordPress REST API (`/wp-json/wp/v2/media`) exposes **500 media items** — used for the
complete asset inventory.

## 2. Confirmed inconsistencies (flagged, not silently resolved)

1. **Founding date** — three different dates across company-published sources:
   - `about-us` page: *"Back in 2010, Annie Nagpal Jain turned a simple idea into a design journey…"*
   - Portfolio PDFs (`portfolio-2` p3, `decorinn-gallery-3` p2): *"Decor Inn gallery was started by ANNIE NAGPAL JAIN in 2010"*
   - Home-page founder bio: *"In **2016** she established her own venture DECOR INN now ventured into ANJ DESIGNS BY DECOR INN"*
   - Portfolio PDF `portfolio-2` p5: *"In **2017** she established her own venture DÉCOR INN"*
   - Home-page founder bio also states: *"…since 2006"*

2. **Manufacturing unit size** — two different figures, both company-published:
   - `decorinn-gallery-3` p3: *"22,500 sq feet manufacturing unit"*
   - Home founder bio **and** `portfolio-2` p5: *"210000 sq.ft Production Unit"*

3. **Public e-mail addresses** — the contact page lists `decorinndesigns@gmail.com`,
   `annie@anjdesigns.in`, `kabir@anjdesigns.in`, `info@anjdesigns.in`. Which are
   intended to be public is unconfirmed.

4. **Turnkey scope** — the site says *"We provides a full range of interior design,
   architectural design."* but never defines what turnkey execution includes
   (civil / electrical / plumbing / procurement / installation / project management).

5. **Testimonials** — the three on the website (Radhika Sharma, Rajeev Madaam,
   Pooja Sharma) carry no attribution beyond a name. The portfolio PDFs publish three
   fully attributed testimonials. All six are kept; the unattributed three are
   marked `verified: false`.

6. **Portfolio descriptions** — the 13 projects have **no copy at all** on the site,
   only names, locations and photographs. No square footage, budgets, clients,
   materials or dates exist. The new site therefore uses **image-led** project pages
   and does not invent metadata.

7. **Project galleries** — the site publishes 4 images per project at **344 × 344 px**
   (these are the original upload sizes; WordPress has no larger variant). The
   5-image project (`standalone-house-vikaspuri`) is 632 × 414.
   Full-resolution masters for many of the same interiors survive inside the official
   portfolio PDFs — these were extracted (395 images) and are used for the
   furniture / craftsmanship sections, where the source PDF itself categorises them.

8. **Architectural design** — claimed in the footer of every page, never scoped.
   Presented as a fourth offering with neutral wording.

## 3. Verified content inventory

### Brand
- Name: **ANJ Designs by Decor Inn**
- Tagline: *"Where Designs Become Reality"*
- Belief line: *"Built on Belief ~ Powered by Purpose"*
- Positioning: *"Driven by Vision. Rooted in Purpose."*
- Scope line: *"We provides a full range of interior design, architectural design."*
- YouTube: `youtube.com/@ANJDesigns-s4r`; Facebook / Instagram / LinkedIn icons in footer.

### Contact (verbatim)
- `decorinndesigns@gmail.com` · `annie@anjdesigns.in` · `kabir@anjdesigns.in` · `info@anjdesigns.in`
- `+91 9231100003` · `+91 9958961111`
- Office: *Plot No. 400–401 (2nd floor), 100 Foot Road, Ghitorni, New Delhi – 110030*
  (the site also renders it as *"Kalu Ram Market 100 foot Road Ghitorni"*)
- Corporate office (portfolio PDF): *D-3/12, 1st floor, Vasant Vihar, Opp. Sriram School, New Delhi*
- Production unit (portfolio PDF): *Plot no. 311, Industrial Area Phase 2, Panchkula, Chandigarh*

### Founder — Annie Nagpal Jain
- *"Annie has been in the business of luxurious interior design and luxurious bespoke
  furniture of all kinds in all and finishes since 2006."*
- *"She is a qualified interior designer with a specialization in furniture design and
  masters in enhancing complete design aesthetics from the institute of NIFD,
  Chandigarh, and is a certified vaastu expert from Bhawan Vidyalaya, Chandigarh."*
- *"She has spent 20+ years in the field of design and has worked with various design
  firms in the initial stages of her profession, leading numerous projects ranging
  from houses, restaurants, cafes, schools, banks, hotels, and offices."*
- *"She believes in living her life with zest and color, aspire to meet new people,
  and enjoys socializing. Her dream is to be able to produce better designs each day
  and make ANJ DESIGNS BY DECOR INN the most reliable, reputed, trustworthy, and
  valued interior design company in the design industry of today."*
- PDF-only biography: born in Chandigarh; schooling at Convent of Jesus and Mary,
  Waverly, Mussoorie; higher studies in Chandigarh; married 2007; based in Gurgaon;
  husband **Kabir Jain** (businessman); daughters **Azeera** and **Anaaz**
  (Vasant Valley School, New Delhi).
- Team (PDF): *Annie Nagpal Jain — Creative Head; Rukaiya Bano — Senior Interior Designer;
  Sana — Interior Designer.*

### Vision / Mission (from `about-1.png` / `about-2.png` on the live site)
- **Vision:** *"Our vision is to lead the interior design and fit-out industry as the
  trusted partner of choice. We aim to shape inspiring and sustainable spaces, deliver
  every project with uncompromising quality, and build lasting relationships founded
  on trust, collaboration, and excellence."*
- **Mission:** *"Our purpose is to design spaces that feel personal, timeless, and
  uplifting. Every project is driven by a balance of innovation and functionality,
  with creativity, sustainability, and client care at the heart of our process. By
  listening closely and tailoring every detail, we create environments that celebrate
  individuality and bring our clients' dreams to life."*

### Values
- About page strapline: **EMPATHETIC · VISIONARY · HONEST · CONSCIOUS**
- About page "Design with depth" blocks — *Value / Safety / Commitment / Excellence*
  (full paragraphs carried over verbatim).
- Portfolio PDF values: *"Designing excellence through creativity, client-centricity,
  attention to detail, timelessness, sustainability, and collaboration."*

### Services (verbatim from `/services/`)
1. **Furniture Design** — *"Every space deserves furniture that feels as personal as it
   looks. Our furniture design service focuses on creating signature pieces that add
   character and elegance to your interiors. From modern wall panels and artistic
   accents to custom-built home essentials, each product is crafted with precision in
   our Panchkula facility. Skilled artisans bring innovative designs to life using
   premium materials, ensuring that every item is both beautiful and built to last."*
2. **Interior Design** — *"Great interiors do more than fill a room—they shape the way
   you live, work, and feel. Our interior design service is all about creating spaces
   that inspire comfort, creativity, and connection. From selecting the perfect layout
   and materials to curating colors, textures, and lighting, we design environments
   that reflect your personality and purpose. Whether it's a serene home, a vibrant
   office, or a stylish commercial space, every detail is thoughtfully planned to
   bring harmony and character to your surroundings."*
3. **Turnkey Interior Design** — *"Founded in 2010 by Annie Nagpal Jain, Decor Inn
   began with a vision to craft interiors that blend beauty with purpose. Over the
   years, it has grown into a trusted name for delivering complete décor and space
   solutions that bring elegance and functionality together. With an in-house
   production facility in Panchkula, Haryana, our team of skilled professionals
   designs and manufactures everything from custom wall panels to statement furniture
   and art pieces—each created with quality materials and a passion for innovation."*
4. **Architectural Design** — mentioned in the site-wide scope line; scope unconfirmed.

### Home page sections (verbatim)
- What We Do: **DESIGN / BUILD / FURNITURE**
- About strip: *"At Anj Designs, we believe Design is more than Aesthetics. It's about
  solving problems, evoking emotions, and creating meaningful experiences. Led by
  passionate creatives, our studio specializes in developing memorable brand
  identities, immersive interiors, and strategic design systems that resonate. We
  thrive on storytelling—blending creativity with clarity to help brands, businesses,
  and individuals express their essence across every touchpoint."*
- Three service captions: *"Where style meets comfort" / "Inspired living tailored for You" /
  "Artistery in every Detail"*
- Our Expertise: *Customer focus / Professionalism / Multi Experience / Author's Supervision*
  (with the 4 supervision principles: Innovative Design, Quality Assurance,
  Team Mentorship, Client Engagement)
- ANJ Work Approach: *Creative Expertise / Holistic Approach / Client-Centric Process /
  Detail-Driven Excellence*
- Closing strip: *"Designs your SPACE"* + *"At Anj Designs, we believe every brand has a
  unique story—one that deserves to be told beautifully…"*

### Manufacturing (portfolio PDF, `decorinn-gallery-3` p3)
- *"22,500 sq feet manufacturing unit."*
- *"100+ projects in the last two years alone."*
- *"Production capacity of 8-10 full-sized bedrooms in 30 days."*
- *"Machine manufacturing and expertly handcrafted finishes."*
- *"over 50 polishes and finishes"* (full list captured — see `src/data/services.ts`)

### Furniture ranges (portfolio PDFs)
- **Bedroom** — Beds, Side tables, Study tables, Media unit, Dressing table,
  Chest of Drawers, Wardrobes
- **Entrance Foyers** — Sideboards, Consoles, Accent Chairs, Frame Mirrors, Accent Pieces
- **Dining Room** — Dining table and chairs, Serving trolleys, Consoles, Crockery Cabinets
- **Formal Living Room** — Formal sofa set, Centre table, End/Side table, Accent chair,
  Corner Pedestals, Bar Unit
- **Informal Living Space** — Couches, Coffee table, End tables, Media unit, Corner
  units, Lounge chairs
- **Wall Panels** — Upholstery, POP, Hardwood section clad panels, POP in HDMR
- **LED Profile Lights**
- **Styles** — Contemporary, Neo Classical, Classical, Fusion + Eclectic, Rustic, Vintage, Moroccan
- **Process** — Planning → Execution → Finish

### Testimonials (portfolio PDFs, fully attributed)
- **Mohit Kakkar** — DLF Phase 1, Gurgaon; CEO, Vikas Forgings, Faridabad
- **Dr. Namrata Sethi** — Sector 35, Chandigarh; Nutritionist & Dietician, The House of Diets
- **Col (Retd) H N Handa** — Laburnum, Sushant Lok 1, Gurgaon

### Project inventory (13, verbatim from `/anjproject/`)
Apartment · GK 2 House · DLF Phase-1 Gurugram · Farm House, Chandigarh Punjab ·
Commercial Space, Nainital · Villa, Golf Course Extension Road · USA, Baltimore ·
Apartment, Golf Course Road, Gurugram · Contemporary Theme based Bedroom · Living Room ·
Contemporary living Room · Vasant Vihar, Residential Project · Standalone House,
Vikaspuri, New Delhi

Home-page tiles are **captioned in the original artwork**, which gives the definitive
tile → project mapping (tile-01 = DLF Phase-1 Gurugram, tile-05 = Farm House
Chandigarh, tile-12 = Commercial Space Nainital, …).

## 4. Media extracted

129 files downloaded from the live site (`scripts/fetch-original-assets.mjs`) +
395 full-resolution photographs extracted from the four official portfolio PDFs
(`scripts/extract-pdf-portfolio.py`). See `src/data/assets.ts` for the manifest.
