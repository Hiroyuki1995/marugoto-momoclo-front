const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/core",
  "@fullcalendar/daygrid",
  "@fullcalendar/google-calendar",
  "@fullcalendar/list",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
]);

// module.exports = withTM({});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withTM({
  /* config options here */
  reactStrictMode: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },
  images: {
    domains: ["images.marugoto-momoclo.com"],
  },
});

module.exports = nextConfig;
