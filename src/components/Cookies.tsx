import React, { useEffect, useState } from 'react';

const CookieBanner = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    const userChoice = localStorage.getItem('cookieConsent');
    if (!userChoice) {
      setIsBannerVisible(true);
    }
  }, []);

  const activateClarity = () => {
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "i1pofmk4j8");
    window.clarity('consent');
  };

  const blockClarity = () => {
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "i1pofmk4j8");
    window.clarity('decline');
  };

  const setUserChoice = (choice) => {
    localStorage.setItem('cookieConsent', choice);
    sessionStorage.setItem('bannerShown', 'true');
    document.cookie = `cookieConsent=${choice}; path=/; max-age=31536000`; // 1 year expiration
    setIsBannerVisible(false);

    if (choice === 'accepted') {
      activateClarity();
    } else if (choice === 'declined') {
      blockClarity();
    }
  };

  if (!isBannerVisible) { 
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 sm:mb-4 sm:mr-4 m-2 cookie-banner">
      <div className="shadow-lg p-4 border border-[var(--color-border)] bg-skin-fill sm:w-96 w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img src="https://www.svgrepo.com/show/401340/cookie.svg" alt="Cookie" className="h-6 w-6 mr-2" />
            <span className="font-bold text-sm">Cookie Policy</span>
          </div>
        </div>
        <p className="text-sm">
        By accepting cookies, you're helping me experiment and analyze; decline if you prefer less tracking. For details: <a href="/dse">Privacy Policy</a>.
        </p>
        <button onClick={() => setUserChoice('accepted')} className="mt-4 font-bold py-2 px-4 border border-skin-fill border-opacity-40 hover:border-skin-accent">
          Accept
        </button>
        <button onClick={() => setUserChoice('declined')} className="mt-4 py-2 px-4 hover:underline">
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
