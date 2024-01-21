import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://manuelfessen.de/", // replace this with your deployed domain
  author: "Manuel Fessen",
  desc: "Manuels blog",
  title: "Manuel Fessen",
  ogImage: "social.png",
  lightAndDarkMode: true,
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/manuelfessen/manuelfessen.de",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://github.com/in/manuelfessen",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  }
];
