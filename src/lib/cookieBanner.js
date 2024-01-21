export default function initCookieBanner() {
  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.cookie-banner');
    if (!banner) {
      console.error('Cookie banner element not found');
      return;
    }

    const acceptButton = document.getElementById('acceptCookies');
    const declineButton = document.getElementById('declineCookies');
    const closeButton = document.getElementById('closeBanner');

    // Function to activate Microsoft Clarity
    const activateClarity = () => {
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "i1pofmk4j8");
    };

    const checkConsent = () => {
      const userChoice = localStorage.getItem('cookieConsent');
      if (!userChoice) {
        banner.classList.remove('hidden');
      } else {
        banner.classList.add('hidden');
      }
    };

    const setUserChoice = (choice) => {
      localStorage.setItem('cookieConsent', choice);
      document.cookie = `cookieConsent=${choice}; path=/; max-age=31536000`; // 1 year expiration
      banner.classList.add('hidden');

      // Activate Microsoft Clarity if user accepts
      if (choice === 'accepted') {
        activateClarity();
      }
    };

    if (acceptButton) {
      acceptButton.addEventListener('click', () => setUserChoice('accepted'));
    } else {
      console.error('Accept button not found');
    }

    if (declineButton) {
      declineButton.addEventListener('click', () => setUserChoice('declined'));
    } else {
      console.error('Decline button not found');
    }

    if (closeButton) {
      closeButton.addEventListener('click', () => banner.classList.add('hidden'));
    } else {
      console.error('Close button not found');
    }

    checkConsent();
  });
  }