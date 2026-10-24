import { site } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.siteUrl,
      lastModified: "2026-10-15",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
