import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "learning.doClima",
    pageTitleSuffix: " | doClima",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "pt-BR",
    baseUrl: "rxon54.github.io/learning.doClima",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Montserrat",
        body: "Inter",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#FAF3DB",       // color-primary-cream — page background
          lightgray: "#DDE390",   // color-primary-yellow-green — borders, dividers
          gray: "#397F94",        // color-primary-teal — secondary text, metadata
          darkgray: "#1E3C42",    // color-primary-dark-teal — body text
          dark: "#1E3C42",        // color-primary-dark-teal — headings
          secondary: "#397F94",   // color-primary-teal — links
          tertiary: "#F38C48",    // color-primary-orange — hover, active links
          highlight: "rgba(221, 227, 144, 0.25)", // yellow-green tint
          textHighlight: "#FAC46188",             // color-primary-yellow
        },
        darkMode: {
          light: "#1E3C42",       // color-primary-dark-teal — page background
          lightgray: "#2d555d",   // slightly lighter teal — borders
          gray: "#397F94",        // color-primary-teal — secondary text
          darkgray: "#FAF3DB",    // color-primary-cream — body text
          dark: "#FAF3DB",        // color-primary-cream — headings
          secondary: "#55C7D2",   // color-comp-2 — links
          tertiary: "#F38C48",    // color-primary-orange — hover, active
          highlight: "rgba(57, 127, 148, 0.25)",  // teal tint
          textHighlight: "#FAC46155",             // color-primary-yellow
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
