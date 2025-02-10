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
      href: getPermalink('/conversionrate'),
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
