import type { MetadataRoute } from "next";
import redirectsData from "@/redirects.json";
import { TOOLS_LIST } from "@/lib/tools/registry";

const BASE_URL = "https://www.reeteshsudhakar.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes = ["/", "/experience", "/projects", "/press", "/quote", "/resume", "/tools"];
    const redirectRoutes = Object.keys(redirectsData).map((slug) => `/${slug}`);
    const toolRoutes = TOOLS_LIST.map((tool) => tool.href);

    return [...staticRoutes, ...redirectRoutes, ...toolRoutes].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
    }));
}
