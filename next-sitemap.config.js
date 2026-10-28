/* eslint-disable @typescript-eslint/no-require-imports -- next-sitemap loads this file with require() */
const company = require("./data/company.json");

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: company.siteUrl,
  output: "export",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: "./out",
  exclude: ["/404", "/_not-found"],
};
