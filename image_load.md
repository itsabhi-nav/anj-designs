# ANJ DESIGNS — EXTREME PERFORMANCE, CDN, IMAGE AND VIDEO OPTIMIZATION MASTER ADDENDUM

## 1. PRIMARY OBJECTIVE

Build the complete ANJ Designs website with cinematic animations, high-resolution interior photography, project galleries, and selected videos while maintaining an exceptionally fast loading experience.

Website:

https://anjdesigns.in/

The website must feel visually rich without forcing visitors to download every image, video, animation library, or gallery asset when they first arrive.

**The first screen must become visible as quickly as possible. The website must not display a full-screen loading animation while waiting for every media file to download.**

Prioritize real performance over the appearance of performance.

Do not sacrifice the quality of the original photographs unnecessarily. Optimize how assets are stored, transformed, delivered, cached, and loaded.

## 2. REQUIRED MEDIA ARCHITECTURE

Use the following architecture:

- Next.js for the website and routing.
- Next.js Image for responsive image rendering and layout stability.
- Cloudinary as the preferred image and video delivery platform, provided an appropriate account and configuration are available.
- A CDN-backed delivery path for public media.
- GSAP and ScrollTrigger for selected cinematic animations.
- Motion or CSS for smaller interactions.
- Proper caching and compression for static assets.
- Server rendering for content that does not need client-side interaction.

Do not introduce multiple media optimization systems without a clear reason.

### Important architecture rule

Choose one primary image optimization and delivery strategy.

**Preferred option:** Use Cloudinary to store and deliver optimized image variants through its CDN, with an appropriate Cloudinary loader or carefully constructed, documented transformation URLs.

Alternatively, if Cloudinary is unavailable, use Next.js Image optimization with a suitable production host, or another verified image CDN with equivalent responsive image capabilities.

Do not unnecessarily pass already optimized Cloudinary images through a second image-proxy service. Avoid duplicated transformations, extra network requests, and needless server processing.

If the site is deployed as a static export, verify the selected image-delivery strategy works with that deployment mode.

Do not assume a CDN or media account exists. Inspect the available environment, document requirements, and provide a clear setup process.

## 3. ORIGINAL ASSET PRESERVATION

Retrieve the actual images and videos from the existing ANJ Designs website.

Preserve the original master files wherever possible.

The media pipeline should distinguish between:

1. Original master assets.
2. Optimized delivery variants.
3. Small preview or placeholder images.
4. Video poster images.
5. Responsive mobile and desktop crops where necessary.

Do not overwrite the original master files with aggressively compressed versions.

Generate delivery variants from the original assets.

Do not substitute stock photography or generated imagery for the company's actual work.

If an original asset is missing, inaccessible, or cannot legally be reused, report the issue instead of pretending it has been retrieved.

## 4. IMAGE OPTIMIZATION

Implement a complete image optimization strategy.

### Responsive image sizes

Never deliver a full-resolution desktop image to a small mobile device when a smaller image is sufficient.

Use responsive image widths appropriate to the displayed layout.

Use the `sizes` property correctly with Next.js Image so the browser can select a suitable source from the generated responsive image set.

Account for:

- Compact mobile devices.
- Large mobile devices.
- Tablets.
- Laptops.
- Desktop monitors.
- Large and ultrawide displays.

Avoid downloading unnecessarily large images.

### Modern image formats

Prefer AVIF or WebP when supported and appropriate.

Use a sensible fallback strategy where necessary.

Use a quality level that preserves the appearance of interior materials, textures, fine details, and architectural lines.

Do not blindly apply the same quality setting to every image.

### Cloudinary transformations

When using Cloudinary, use its supported transformation features to deliver:

- Automatic format selection where supported.
- Automatic quality optimization.
- Width-specific image variants.
- Appropriate responsive crops.
- Correct aspect ratios.
- Optimized preview images.
- Poster images for videos.

Avoid generating excessive variants without a reason.

Use stable, predictable asset URLs and ensure that transformations are compatible with the selected account and delivery configuration.

### Next.js Image requirements

Use Next.js Image for project photographs and other image content where appropriate.

Set:

- Appropriate image dimensions or `fill` layouts.
- Correct responsive `sizes`.
- Meaningful alt text.
- Explicit aspect ratios.
- Appropriate loading priorities.
- `object-position` for art-directed crops.

Use `preload` for the true above-the-fold hero image only when justified by the installed Next.js version.

Do not preload every project photograph.

### Image quality and visual stability

Reserve image space before files load.

Avoid layout shifts when images appear.

Use lightweight blur placeholders or small preview images when useful.

Do not introduce large base64-encoded image placeholders that unnecessarily inflate HTML responses.

Use placeholders as a brief visual enhancement, not as an excuse to delay the real image.

## 5. CRITICAL LOADING PRIORITIES

The browser must download the most important resources first.

### First priority: initial viewport

Prioritize only the assets needed to render the initial screen:

- Essential HTML.
- Critical CSS.
- Required fonts, where appropriate.
- The main hero image or video poster.
- Essential navigation resources.
- Minimal JavaScript required for initial interaction.

Do not preload every image, video, font, or animation file.

Do not start downloading the entire project gallery when the homepage opens.

### Hero image

Identify the actual largest visible content element.

If the hero uses a photograph, ensure that the image is correctly sized, prioritized, and not lazy-loaded.

If the hero uses a video, use a suitable poster image that can render immediately while the video remains unloaded or loads separately according to the intended experience.

Avoid allowing the hero media to compete with numerous other high-priority downloads.

### Below-the-fold images

Lazy-load images that are not initially visible.

Allow nearby images to load as they approach the viewport so they are ready when the visitor scrolls.

Do not lazy-load the main hero image.

Do not wait until a visitor has already scrolled past an image before requesting it.

Use appropriate browser-native lazy loading or a verified media-loading implementation.

## 6. VIDEO OPTIMIZATION

Videos can be significantly heavier than photographs.

Do not load every video on the page when the homepage opens.

### Background hero video

If the original website contains a suitable hero video:

- Use a short, compressed, web-optimized version.
- Provide a high-quality static poster image.
- Keep the poster visible while the video loads.
- Use muted playback if autoplay is necessary.
- Use `playsInline` for mobile compatibility.
- Avoid audio autoplay.
- Consider a mobile-specific video variant only if it materially improves performance.
- Respect reduced-motion preferences.
- Fall back to the original photograph if video playback is unsupported or unnecessary.

The initial page must not depend on the full video downloading before it can display the hero.

### Other videos

For videos lower on the page:

- Use a poster image.
- Avoid unnecessary autoplay.
- Use `preload="none"` when playback is user-initiated.
- Lazy-load video resources when appropriate.
- Begin downloading the actual video only when it is reasonably needed.
- Use an appropriate player or media-delivery platform if adaptive streaming is required.

Do not embed multiple full YouTube or other third-party players on initial page load.

If external video embeds are used, consider a lightweight poster-based facade that loads the player only when the user interacts.

### Video compression

Inspect the actual source videos before choosing settings.

Use an appropriate web delivery format such as MP4 with H.264 or WebM where supported by the selected delivery pipeline.

Choose resolution, bitrate, duration, and compression based on the visual requirements.

Do not deliver a 4K video to every mobile visitor when a smaller version will provide a better experience.

Do not convert all videos to an unnecessarily high resolution.

## 7. NO GLOBAL LOADING SCREEN

Do not implement a full-screen loader that waits for all images, videos, fonts, animations, and page sections to finish downloading.

The initial background, navigation, heading, and available page content should render as soon as practical.

If an individual image is still loading, show a lightweight placeholder in that image's reserved space.

If a video is loading, display its poster image.

If a below-the-fold gallery is still loading, show a lightweight preview or reserved image frame.

Never prevent a visitor from scrolling through already available content because another media file is still loading.

Avoid fake loading percentages and unnecessary animated preloader sequences.

The goal is to make the page useful immediately and allow noncritical content to load progressively.

## 8. CDN AND CACHING

Use CDN delivery for public images, videos, and static assets wherever practical.

Configure caching appropriately.

### Cacheable resources

Cache:

- Optimized images.
- Video files and posters.
- Fonts.
- Versioned JavaScript.
- Versioned CSS.
- Other immutable static assets.

For versioned assets, use long-lived cache headers where the hosting and CDN configuration supports them.

Use `Cache-Control: public, max-age=31536000, immutable` only for versioned or content-hashed resources that will not change at the same URL.

For mutable files, configure a suitable revalidation or expiration policy.

Do not cache contact form responses or sensitive data as public static assets.

Avoid serving huge media files directly through a slow application server when a suitable CDN-backed storage and delivery service is available.

Verify actual cache headers rather than assuming the CDN is configured correctly.

## 9. FONTS AND ICONS

Typography is important to the ANJ Designs identity, but font loading must not delay the website.

Use a small, carefully selected font family set.

Prefer appropriately licensed WOFF2 files where local font hosting is practical.

Use font subsets and only the weights actually needed.

Preload only the critical font files required for the first viewport.

Use `font-display: swap` or another suitable strategy to keep text visible during font loading.

Do not import entire icon libraries into the initial bundle when only a few icons are used.

Use tree-shakable icon imports or lightweight SVG icons.

Do not load multiple large icon packages.

## 10. ANIMATION PERFORMANCE

The website must feel cinematic while remaining responsive.

### Animation implementation

Use:

- GSAP and ScrollTrigger for selected complex sequences.
- CSS transforms and opacity for simple effects.
- Motion for appropriate component interactions.
- Intersection Observer or browser-native lazy loading where appropriate.

Avoid continuously animating layout properties such as width, height, or large positional changes when transforms can achieve the effect more efficiently.

Avoid excessive blur filters, enormous animated masks, large WebGL scenes, and unnecessary background effects.

### Lazy-load animation code

Load complex animation code only for sections that require it.

Do not load every animation module on the initial route.

Keep the hero's initial rendering independent of animation initialization.

If JavaScript is delayed or disabled, essential content must still be visible and usable.

### Scroll behaviour

Use a limited number of carefully selected pinned sections.

Avoid excessive scroll event handlers.

Do not cause scroll jank through heavy JavaScript calculations.

Ensure image loading and dynamic content do not break ScrollTrigger measurements.

Respect reduced-motion preferences and simplify effects on low-capability mobile devices where appropriate.

## 11. NEXT.JS AND JAVASCRIPT OPTIMIZATION

Use server components for static content wherever appropriate.

Avoid turning the entire website into one large client-rendered component.

Keep interactive components small and focused.

Dynamically import noncritical components when this materially improves initial loading.

Potential candidates include:

- Heavy lightbox functionality.
- Complex project-gallery interactions.
- Advanced cursor effects.
- Optional 3D visualizations.
- Secondary animation modules.

Do not dynamically import essential content in a way that makes it appear late.

Avoid unnecessary third-party scripts.

Keep dependencies minimal and inspect the production bundle.

Remove unused libraries and code.

## 12. PRELOADING AND NETWORK REQUESTS

Use resource priorities deliberately.

- Prioritize the true hero image.
- Preload critical fonts only when justified.
- Avoid preloading every image.
- Avoid downloading all project-gallery images on the homepage.
- Avoid loading below-the-fold videos immediately.
- Avoid loading heavy third-party scripts before they are required.
- Use `preconnect` only for genuinely important external origins.
- Avoid duplicate requests for the same image.
- Avoid repeatedly transforming the same image into unnecessarily different variants.
- Verify that the selected CDN supports suitable caching and content delivery.

Do not add resource hints indiscriminately.

## 13. PERFORMANCE BUDGETS

Establish a measurable performance budget.

Use these as initial targets for the first visit on a representative mobile connection:

- Initial critical HTML, CSS, JavaScript, and font transfer: aim for approximately 200–300 KB compressed or less, excluding media.
- Initial hero image: aim for approximately 200–350 KB or less where visual quality allows.
- Above-the-fold media requests: keep to the minimum necessary.
- Initial JavaScript: minimize the amount required before the page becomes usable.
- Below-the-fold media: load progressively.
- Noncritical videos: do not download automatically.
- Cumulative Layout Shift: target 0.1 or less.
- Interaction to Next Paint: target 200 ms or less.
- Largest Contentful Paint: target 2.5 seconds or less under the applicable Core Web Vitals measurement conditions.

These are engineering budgets and targets, not guarantees.

Adjust them if the actual photography requires different settings, but document the reason.

Do not degrade important interior photographs simply to satisfy an arbitrary file-size threshold.

## 14. PERFORMANCE TESTING

Do not assume that adding a CDN automatically makes the website fast.

Measure the real implementation.

### Before and after comparisons

Run performance tests on the production build.

Test:

- Homepage.
- About Us.
- Services.
- Projects.
- Individual project pages.
- Contact page.

Measure representative mobile and desktop viewports.

### Use these tools

- Lighthouse.
- Chrome DevTools Network panel.
- Chrome Performance panel.
- PageSpeed Insights.
- WebPageTest where available.
- Core Web Vitals reporting when sufficient real-user data becomes available.

Official resources:

https://nextjs.org/docs/app/api-reference/components/image

https://web.dev/learn/performance/

https://pagespeed.web.dev/

### Verify the network

Inspect:

- Total bytes transferred on initial load.
- Number of requests.
- Image sizes delivered.
- Video requests.
- Font requests.
- JavaScript bundle sizes.
- Cache hit behaviour.
- Time to first render.
- Largest Contentful Paint.
- Layout shifts.
- Main-thread activity.
- Scroll performance.

Test both cold-cache and warm-cache visits.

Test a throttled mobile connection, not just a fast desktop connection.

Identify and fix the largest bottlenecks before adding more visual effects.

## 15. IMPLEMENTATION REQUIREMENTS

Before declaring the work complete:

1. Inventory the original media.
2. Configure the chosen image-delivery strategy.
3. Generate optimized image variants.
4. Implement responsive images.
5. Prioritize the true hero asset.
6. Lazy-load appropriate below-the-fold media.
7. Configure video posters and deferred playback.
8. Optimize fonts.
9. Reduce initial JavaScript.
10. Implement caching.
11. Verify CDN behaviour.
12. Test all pages.
13. Run production performance audits.
14. Fix the largest performance issues.
15. Document the media service, account requirements, and deployment configuration.

Do not hardcode private credentials.

Do not assume a Cloudinary account, paid plan, or CDN configuration exists.

Provide an `.env.example` with the required variable names if environment configuration is needed, without including actual secrets.

If the selected architecture requires account setup, explain precisely what the client must configure.

## FINAL ACCEPTANCE CRITERIA

The ANJ Designs website must combine premium visual design with practical loading performance.

The first viewport must appear quickly.

The website must not wait for every media file to download.

Original images and videos must be preserved.

Responsive image delivery must be implemented.

The hero must have appropriate loading priority.

Below-the-fold images must load progressively.

Noncritical videos must not download unnecessarily.

Animations must not block the initial rendering of essential content.

CDN delivery and caching must be verified.

The website must be tested on real browser layouts and representative mobile network conditions.

**The final result must feel cinematic, polished, and visually exceptional while remaining fast, stable, responsive, and usable.**