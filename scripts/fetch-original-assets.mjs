#!/usr/bin/env node
/**
 * ANJ Designs — original asset fetcher.
 *
 * Downloads the ORIGINAL ANJ Designs media (photography, logo, videos, portfolio PDFs)
 * from the live site into ./public/assets, preserving the master files untouched.
 *
 * Usage:  node scripts/fetch-original-assets.mjs
 *
 * The site is the source of truth. Nothing here is generated or substituted.
 */
import { mkdir, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ORIGIN = "https://anjdesigns.in/wp-content/uploads";
const ROOT = path.resolve(process.cwd(), "public/assets");

/** [urlPath, localPath] */
const ASSETS = [
  // ---------------------------------------------------------------- brand
  ["2024/07/Anj_Logo___-copy-2.webp", "brand/anj-logo.webp"],
  ["2024/07/ANJ-Designs-by-Decorinn-Logo.png", "brand/anj-designs-by-decorinn-logo.png"],
  ["2024/07/Header_ANJ_Final_2-1.jpg", "brand/anj-header-master.jpg"],
  ["2024/07/Header_ANJ_Final_2-e1747462188672.webp", "brand/anj-header-alt.webp"],
  ["2024/07/Header_ANJ_Final_2__1_-removebg-preview.png", "brand/anj-header-removebg.png"],
  ["2024/08/ANJ-Favicon.png", "brand/anj-favicon.png"],
  ["2024/08/cropped-ANJ-Favicon.png", "brand/anj-favicon-cropped.png"],
  ["2024/08/BG-COLOR.webp", "brand/bg-color.webp"],
  ["2024/07/BG-2.png", "brand/bg-2.png"],

  // ---------------------------------------------------------------- home
  ["2025/07/anjwebsitebg-scaled.webp", "home/anj-website-bg.webp"],
  ["2025/07/bg_home.webp", "home/bg-home.webp"],
  ["2025/07/home_bg.webp", "home/home-bg.webp"],
  ["2025/07/bgtexanj.webp", "home/bg-texture.webp"],
  ["2025/07/aboutus_bg.webp", "home/aboutus-bg.webp"],
  ["2025/07/aboutus_anj.webp", "home/aboutus-anj.webp"],
  ["2025/07/Rectangle-2232.webp", "home/rectangle-2232.webp"],
  ["2025/07/ANJDESIGNS.webp", "home/anjdesigns-wordmark.webp"],
  ["2025/07/ANJfounder.webp", "founder/annie-nagpal-jain.webp"],
  ["2025/07/whychoose1.webp", "home/why-choose-1.webp"],
  ["2025/07/whychoose2.webp", "home/why-choose-2.webp"],
  ["2025/07/whychoose3.webp", "home/why-choose-3.webp"],
  ["2025/07/whychoose4.webp", "home/why-choose-4.webp"],
  ["2025/07/anjproject.webp", "home/anjproject.webp"],
  ["2025/07/anjprojectphoto.webp", "home/anjproject-photo.webp"],
  ["2025/07/anjprojectdisplay.webp", "home/anjproject-display.webp"],
  ["2025/07/anjprojectdisplay1.webp", "home/anjproject-display-wide.webp"],
  ["2025/07/anjdesigns5.webp", "home/anjdesigns-5.webp"],
  ["2025/07/anjdesigns6.webp", "home/anjdesigns-6.webp"],
  ["2025/07/anjdesigns7.webp", "home/anjdesigns-7.webp"],
  ["2025/07/anjservices1.webp", "services/anjservices-1.webp"],
  ["2025/07/anjservices2.webp", "services/anjservices-2.webp"],
  ["2025/07/anjservices3.webp", "services/anjservices-3.webp"],

  // ---------------------------------------------------------------- about
  ["2025/09/1.png", "about/about-1.png"],
  ["2025/09/2.png", "about/about-2.png"],
  ["2025/09/Group-47814.png", "about/group-47814.png"],
  ["2025/09/Frame-36929.png", "about/frame-36929.png"],

  // ---------------------------------------------------------------- services
  ["2025/07/serviceanjdesigns.webp", "services/service-anj-designs.webp"],
  ["2025/07/servicebganj.webp", "services/service-bg.webp"],
  ["2025/07/anjbcaboutus.webp", "services/anj-bc-aboutus.webp"],
  ["2025/07/anjtestimonials.webp", "services/anj-testimonials.webp"],
  ["2025/07/anjservice1.webp", "services/anjservice-1.webp"],
  ["2025/07/anjservice2.webp", "services/anjservice-2.webp"],
  ["2025/07/anjservice3.webp", "services/anjservice-3.webp"],
  ["2025/07/anjservice4.webp", "services/anjservice-4.webp"],
  ["2025/07/anjservice5.webp", "services/anjservice-5.webp"],
  ["2025/07/anjservice6.webp", "services/anjservice-6.webp"],
  ["2025/07/anjservice7.webp", "services/anjservice-7.webp"],
  ["2025/07/anjservice8.webp", "services/anjservice-8.webp"],
  ["2025/07/anjservice9.webp", "services/anjservice-9.webp"],
  ["2025/07/anjservice10.webp", "services/anjservice-10.webp"],
  ["2025/07/anjinterior1.webp", "services/anjinterior-1.webp"],
  ["2025/07/anjinterior2.webp", "services/anjinterior-2.webp"],
  ["2025/07/anjinterior3.webp", "services/anjinterior-3.webp"],
  ["2025/07/anjinterior4.webp", "services/anjinterior-4.webp"],
  ["2025/07/anjdesigs12.webp", "services/anjdesigns-12-alt.webp"],
  ["2025/07/anjdesigns12.webp", "services/anjdesigns-12.webp"],
  ["2025/07/anjdesigns13.webp", "services/anjdesigns-13.webp"],

  // ---------------------------------------------------------------- projects (13 portfolios)
  // 01 Apartment
  ["2025/07/anjdesign1sample.webp", "projects/apartment/01.webp"],
  ["2025/07/anjdesignsample2.webp", "projects/apartment/02.webp"],
  ["2025/07/sample1anj.webp", "projects/apartment/03.webp"],
  ["2025/07/anjdesignsample3.webp", "projects/apartment/04.webp"],
  // 02 GK 2 House
  ["2025/07/gk2anj1.webp", "projects/gk-2-house/01.webp"],
  ["2025/07/gk2anj.webp", "projects/gk-2-house/02.webp"],
  ["2025/07/gk2anj2.webp", "projects/gk-2-house/03.webp"],
  ["2025/07/gk2anj3.webp", "projects/gk-2-house/04.webp"],
  // 03 DLF Phase-1 Gurugram
  ["2025/07/dlgphaseanj4.png", "projects/dlf-phase-1-gurugram/01.png"],
  ["2025/07/dlfphaseanj4.webp", "projects/dlf-phase-1-gurugram/02.webp"],
  ["2025/07/dlfphaseanj2.webp", "projects/dlf-phase-1-gurugram/03.webp"],
  ["2025/07/dlfphaseanj3.webp", "projects/dlf-phase-1-gurugram/04.webp"],
  // 04 Farm House, Chandigarh
  ["2025/07/chandigarhfarmhouse1.webp", "projects/farmhouse-chandigarh/01.webp"],
  ["2025/07/chandigarhfarmhouse2.webp", "projects/farmhouse-chandigarh/02.webp"],
  ["2025/07/chandigarhfarmhouse4.webp", "projects/farmhouse-chandigarh/03.webp"],
  ["2025/07/chandigarhfarmhouse3.webp", "projects/farmhouse-chandigarh/04.webp"],
  // 05 Commercial Space, Nainital
  ["2025/07/nainitalanj1.webp", "projects/commercial-space-nainital/01.webp"],
  ["2025/07/nainitalanj3.png", "projects/commercial-space-nainital/02.png"],
  ["2025/07/nainitalanj4.webp", "projects/commercial-space-nainital/03.webp"],
  ["2025/07/nainitalanj2.webp", "projects/commercial-space-nainital/04.webp"],
  // 06 Villa, Golf Course Extension Road
  ["2025/07/golfcourseanj1.webp", "projects/villa-golf-course-extension/01.webp"],
  ["2025/07/golfcourseanj2.webp", "projects/villa-golf-course-extension/02.webp"],
  ["2025/07/golfcourseanj4.webp", "projects/villa-golf-course-extension/03.webp"],
  ["2025/07/golfcourseanj3.webp", "projects/villa-golf-course-extension/04.webp"],
  // 07 USA, Baltimore
  ["2025/07/usaanj1.webp", "projects/baltimore-usa/01.webp"],
  ["2025/07/usaanj3.webp", "projects/baltimore-usa/02.webp"],
  ["2025/07/usaanj2.webp", "projects/baltimore-usa/03.webp"],
  ["2025/07/usaanj4.webp", "projects/baltimore-usa/04.webp"],
  // 08 Apartment, Golf Course Road, Gurugram
  ["2025/07/golfcourseroadanj1.webp", "projects/apartment-golf-course-road/01.webp"],
  ["2025/07/golfcourseroadanj2.webp", "projects/apartment-golf-course-road/02.webp"],
  ["2025/07/golfcourseroadanj3.webp", "projects/apartment-golf-course-road/03.webp"],
  ["2025/07/golfcourseroadanj4.webp", "projects/apartment-golf-course-road/04.webp"],
  // 09 Contemporary Theme based Bedroom
  ["2025/07/contemporarybasedbedroomanj1sample.png", "projects/contemporary-bedroom/01.png"],
  ["2025/07/contemporarybasedbedroomanj2sample.webp", "projects/contemporary-bedroom/02.webp"],
  ["2025/07/contemporarybasedbedroomanj1.webp", "projects/contemporary-bedroom/03.webp"],
  ["2025/07/contemporarybasedbedroomanj2.webp", "projects/contemporary-bedroom/04.webp"],
  // 10 Living Room
  ["2025/07/livingroomanj1.webp", "projects/living-room/01.webp"],
  ["2025/07/livingroomanj2.webp", "projects/living-room/02.webp"],
  ["2025/07/livingroomanj3.webp", "projects/living-room/03.webp"],
  ["2025/07/livingroomanj4.webp", "projects/living-room/04.webp"],
  // 11 Contemporary Living Room
  ["2025/07/Contemporary-living-Room-1.webp", "projects/contemporary-living-room/01.webp"],
  ["2025/07/Contemporary-living-Room-2.webp", "projects/contemporary-living-room/02.webp"],
  ["2025/07/Contemporary-living-Room-3.webp", "projects/contemporary-living-room/03.webp"],
  ["2025/07/Contemporary-living-Room-4.webp", "projects/contemporary-living-room/04.webp"],
  // 12 Vasant Vihar, Residential Project
  ["2025/07/vasantvihar1.webp", "projects/vasant-vihar/01.webp"],
  ["2025/07/vasantvihar2.webp", "projects/vasant-vihar/02.webp"],
  ["2025/07/vasantvihar3.webp", "projects/vasant-vihar/03.webp"],
  ["2025/07/vasantvihar4.webp", "projects/vasant-vihar/04.webp"],
  // 13 Standalone House, Vikaspuri, New Delhi
  ["2025/07/Frame-36968.webp", "projects/standalone-house-vikaspuri/01.webp"],
  ["2025/07/Frame-36969.webp", "projects/standalone-house-vikaspuri/02.webp"],
  ["2025/07/Frame-36968-1.webp", "projects/standalone-house-vikaspuri/03.webp"],
  ["2025/07/Frame-36968-2.webp", "projects/standalone-house-vikaspuri/04.webp"],
  ["2025/07/Frame-36969-2.webp", "projects/standalone-house-vikaspuri/05.webp"],

  // ---------------------------------------------------------------- homepage project tiles
  ["2025/07/anjproject1.webp", "home/tile-01.webp"],
  ["2025/07/anjproject2.webp", "home/tile-02.webp"],
  ["2025/07/anjproject3.webp", "home/tile-03.webp"],
  ["2025/07/anjproject4.webp", "home/tile-04.webp"],
  ["2025/07/anjproject5.webp", "home/tile-05.webp"],
  ["2025/07/anjproject6.webp", "home/tile-06.webp"],
  ["2025/07/anjproject7.webp", "home/tile-07.webp"],
  ["2025/07/anjproject8.webp", "home/tile-08.webp"],
  ["2025/07/anjproject9.webp", "home/tile-09.webp"],
  ["2025/07/anjproject10.webp", "home/tile-10.webp"],
  ["2025/07/anjproject11.webp", "home/tile-11.webp"],
  ["2025/07/anjproject12.webp", "home/tile-12.webp"],

  // ---------------------------------------------------------------- videos
  ["2025/07/0_Luxury_Apartment_Modern_Interior_1280x720.mp4", "videos/luxury-apartment.mp4"],
  ["2025/07/2143343_Furniture_Modern_1920x1080.mp4", "videos/modern-furniture.mp4"],
  ["2025/07/0_Home_Office_Desk_1280x720.mp4", "videos/home-office.mp4"],

  // ---------------------------------------------------------------- portfolio PDFs
  ["2024/08/DECORINN-GALLERY-3-min.pdf", "pdf/decorinn-gallery-3.pdf"],
  ["2024/08/DECOR-INN-LATEST-GALLERY-2-min.pdf", "pdf/decor-inn-latest-gallery-2.pdf"],
  ["2024/08/Portfolio-2-min.pdf", "pdf/portfolio-2.pdf"],
  ["2024/08/DECORINN-GALLERY-2022-2023-min.pdf", "pdf/decorinn-gallery-2022-2023.pdf"],
];

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

const results = [];
for (const [remote, local] of ASSETS) {
  const dest = path.join(ROOT, local);
  if (await exists(dest)) {
    console.log(`skip   ${local}`);
    results.push({ remote, local, status: "cached" });
    continue;
  }
  await mkdir(path.dirname(dest), { recursive: true });
  const url = `${ORIGIN}/${remote}`;
  const res = await fetch(url, { headers: { "user-agent": UA } });
  if (!res.ok) {
    console.log(`FAIL   ${local} -> ${res.status}`);
    results.push({ remote, local, status: "failed", code: res.status });
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`ok     ${local} (${(buf.length / 1024).toFixed(0)} KB)`);
  results.push({ remote, local, status: "ok", bytes: buf.length });
}

await writeFile(
  path.join(ROOT, "manifest.json"),
  JSON.stringify({ origin: ORIGIN, fetchedAt: new Date().toISOString(), assets: results }, null, 2)
);
console.log(`\nDone. ${results.filter((r) => r.status === "ok").length} downloaded, ` +
  `${results.filter((r) => r.status === "failed").length} failed.`);
