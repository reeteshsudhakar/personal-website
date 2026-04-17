import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer({
    reactStrictMode: false,
    productionBrowserSourceMaps: true,
    images: {
        formats: ["image/avif", "image/webp"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
});
