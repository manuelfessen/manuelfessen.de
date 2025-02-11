import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'UX/UI Design',
      href: getPermalink('/userexperience'),
    },
    {
      text: 'Professionelle Websites',
      href: getPermalink('/websites'),
    },
    {
      text: 'Conversion Rate Optimierung',
      href: getPermalink('/conversionrate'),
    },
    {
      text: 'Kontakt',
      href: getPermalink('https://www.linkedin.com/in/manuelfessen/'),
      target: '_blank',
      onClick: () => {
        if (typeof clarity === 'function') {
          clarity("set", "Button", "Kontakt");
        }
      }
    }
  ],
  actions: [
    { 
      text: 'kurz.ai', 
      href: getPermalink('/kurz'),
      onClick: () => {
        if (typeof clarity === 'function') {
          clarity("set", "Button", "kurz.ai");
        }
      }
    }
  ],
};

export const footerData = {
  links: [
    {
      text: 'Impressum',
      href: getPermalink('/impressum'),
    },
    {
      text: 'Datenschutz',
      href: getPermalink('/datenschutz'),
    },
    {
      text: 'AGB',
      href: getPermalink('/agb'),
    }
  ],
  socialLinks: [
    {
      icon: 'tabler:brand-linkedin',
      href: 'https://www.linkedin.com/in/manuelfessen/',
      ariaLabel: 'LinkedIn',
    },
    {
      icon: 'tabler:brand-github',
      href: 'https://github.com/manuelfessen',
      ariaLabel: 'GitHub',
    }
  ],
};
