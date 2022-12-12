const crypto = require("crypto");
const nonce = crypto.randomBytes(16).toString("base64");

const generateCSP = ({ nonce }) => {
  const policy = {};

  const add = (directive, value, options = {}) => {
    if (options.devOnly && process.env.NODE_ENV === "development") return;
    const curr = policy[directive];
    policy[directive] = curr ? [...curr, value] : [value];
  };
  add("default-src", `'self'`);
  add("frame-ancestors", `'self'`);
  add("block-all-mixed-content", "");
  add("manifest-src", `'self'`);
  add("base-uri", `'self'`);
  add("form-action", `'self'`);
  add("media-src", `'self'`);
  add("prefetch-src", `'self'`);
  add("worker-src", `'self'`);
  add("object-src", `'none'`);
  add("frame-src", `'self' www.googletagmanager.com https://www.google.com`);
  add("child-src", `'self' www.googletagmanager.com`);
  add(
    "img-src",
    `'self' data: blob: https://i.ytimg.com https://avatars.dicebear.com *.google.com *.google-analytics.com fonts.gstatic.com https://images.unsplash.com res.cloudinary.com www.googletagmanager.com`
  );
  add("font-src", `'self' data: fonts.googleapis.com fonts.gstatic.com`);
  add(
    "connect-src",
    `'self' https://avatars.dicebear.com https://api.unisvg.com https://api.simplesvg.com https://code.iconify.design https://api.iconify.design *.google.com api.iconify.design https://www.gstatic.com https://*.googleapis.com fonts.googleapis.com fonts.gstatic.com stats.g.doubleclick.net www.google-analytics.com www.googletagmanager.com https://images.unsplash.com`
  );
  add(
    "script-src",
    `'unsafe-inline' 'self' 'nonce-${nonce}' 'report-sample' https://apis.google.com https://www.google.com https://google-analytics.com https://googletagmanager.com https://ssl.google-analytics.com https://tagmanager.google.com https://www.gstatic.com https://www.google-analytics.com https://www.googletagmanager.com 'sha256-eMuh8xiwcX72rRYNAGENurQBAcH7kLlAUQcoOri3BIo=' 'sha256-8IwZQhsoLvPk8d767djtD7zkDqQ8YtQ9CBADCs6bp2c=' 'sha256-vr0dQJehJI+xv5F+B4vws+bepDq8DKREHjeIv4CHiYo='`
  );
  add("script-src", `'unsafe-eval'`, { devOnly: false });
  add(
    "style-src",
    `'unsafe-inline' 'report-sample' 'self' fonts.googleapis.com tagmanager.google.com www.googletagmanager.com`
  );

  return Object.entries(policy)
    .map(([key, value]) => `${key} ${value.join(" ")}`)
    .join("; ");
};

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: generateCSP({ nonce }),
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value: "geolocation=(), payment=()",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
];

const settings = {
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true,
    formats: ["image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ["images.unsplash.com", "avatars.dicebear.com"],
  },

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = settings;
