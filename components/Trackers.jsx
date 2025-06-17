import Head from "next/head";
import Script from "next/script";

// Common GTM Tracker (GTM-MKLLPZV)
const gtmTracker = () => (
  <>
    <Script id="gtm-script" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-MKLLPZV');`}
    </Script>
  </>
);

// Alternate GTM Tracker (GTM-MX2KFGVM)
const gtmAlternateTracker = () => (
  <>
    <Script id="gtm-alternate-script" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-MX2KFGVM');`}
    </Script>
  </>
);

// Facebook Domain Verification
const facebookDomainVerification = () => (
  <Head>
    <meta
      name="facebook-domain-verification"
      content="uvvbdeqdbj046v74x0oqaxhl9tyq26"
    />
  </Head>
);

// Microsoft Clarity
const clarityTracker = () => (
  <Script
    id="clarity-script"
    strategy="afterInteractive"
    src="https://www.clarity.ms/tag/uet/355025998"
  />
);

// Google Analytics & Google Ads
const googleAnalyticsTracker = () => (
  <>
    <Script
      id="google-analytics-script"
      strategy="afterInteractive"
      src="https://www.googletagmanager.com/gtag/js?id=AW-10925478122"
    />
    <Script id="google-analytics-config" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-10925478122');`}
    </Script>
  </>
);

// RunConverge Pixel
const runConvergeTracker = () => (
  <>
    <Script
      id="runconverge-script"
      strategy="afterInteractive"
      src="https://static.runconverge.com/pixels/ax7JiB.js"
    />
    <Script id="runconverge-config" strategy="afterInteractive">
      {`window.cvg||(cvg=function(){cvg.process?cvg.process.apply(cvg,arguments):cvg.queue.push(arguments)},cvg.queue=[]);
        cvg({method:"track",eventName:"$page_load"});`}
    </Script>
  </>
);

// Convert Experiences
const convertExperiencesTracker = () => (
  <Script
    id="convert-experiences-script"
    strategy="afterInteractive"
    src="//cdn-4.convertexperiments.com/v1/js/10045956-10046753.js?environment=production"
  />
);

// AWIN Advertiser MasterTag
const awinTracker = () => (
  <Script
    id="awin-script"
    strategy="lazyOnload"
    src="https://www.dwin1.com/101159.js"
  />
);

// GTM4WP Configuration (Adapted for Next.js)
const gtm4wpTracker = () => (
  <Script id="gtm4wp-script" strategy="afterInteractive">
    {`var gtm4wp_datalayer_name = "dataLayer";
      var dataLayer = dataLayer || [];
      const gtm4wp_scrollerscript_debugmode = false;
      const gtm4wp_scrollerscript_callbacktime = 100;
      const gtm4wp_scrollerscript_readerlocation = 150;
      const gtm4wp_scrollerscript_contentelementid = "content";
      const gtm4wp_scrollerscript_scannertime = 60;`}
  </Script>
);

// Facebook Pixel (Parameterized by ID)
const facebookPixelTracker = (pixelId) => (
  <>
    <Script id={`facebook-pixel-${pixelId}`} strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');`}
    </Script>
  </>
);

// VisiSmart Tracker (Parameterized by visi_pid)
const visiSmartTracker = (visi_pid) => (
  <Script id={`visismart-${visi_pid}`} strategy="afterInteractive">
    {`window.visiopt_code=window.visiopt_code||(function(){var visi_wid=937,visi_pid=${visi_pid},visi_flicker_time=4000,visi_flicker_element='html',c=false,d=document,visi_fn={begin:function(){var a=d.getElementById('visi_flicker');if(!a){var a=d.createElement('style'),b=visi_flicker_element?visi_flicker_element+'{opacity:0!important;background:none!important;}':'',h=d.getElementsByTagName('head')[0];a.setAttribute('id','visi_flicker');a.setAttribute('type','text/css');if(a.styleSheet){a.styleSheet.cssText=b;}else{a.appendChild(d.createTextNode(b));}h.appendChild(a);}},complete:function(){c=true;var a=d.getElementById('visi_flicker');if(a){a.parentNode.removeChild(a);}},completed:function(){return c;},pack:function(a){var b=d.createElement('script');b.src=a;b.type='text/javascript';b.innerText;b.onerror=function(){visi_fn.complete();};d.getElementsByTagName('head')[0].appendChild(b);},init:function(){visi_fn.begin();setTimeout(function(){visi_fn.complete()},visi_flicker_time);this.pack('https://visiopt.com/client/js_test/test.'+visi_wid+'.'+visi_pid+'.js');return true;}};window.visiopt_code_status=visi_fn.init();return visi_fn;}());`}
  </Script>
);

// Mapping of pages to trackers
const pageTrackers = (page) => {
  const commonTrackers = [
    gtmTracker(),
    facebookDomainVerification(),
    clarityTracker(),
    googleAnalyticsTracker(),
    runConvergeTracker(),
    convertExperiencesTracker(),
    awinTracker(),
  ];

  const gtm4wpPages = [
    "blog",
    "single-blog",
    "ed-flow",
    "hair-flow",
    "how-it-works",
    "faqs",
    "product-faq",
    "about-us",
    "podcast",
    "contact-us",
    "terms-conditions",
    "privacy-policy",
    "service-across-canada",
    "cart",
    "checkout",
    "login",
    "register",
  ];

  const facebookPixel522677764108011Pages = [
    "pre-ed1",
    "pre-ed2",
    "pre-ed3",
    "pre-ed4",
  ];
  const facebookPixel1451450365779499Pages = [
    "pre-wl1",
    "pre-wl2",
    "pre-wl3",
    "pre-wl4",
  ];
  const gtmAlternatePages = ["pre-ed1", "pre-ed2", "pre-ed3", "pre-ed4"];

  const visiSmartPages = {
    "order-received": 15,
    "wl-pre-consultation": 17,
    "ed-flow": 18,
    "zonnic-product": 25,
    bo2: 29,
    "pre-ed2": 32,
    "pre-ed3": 34,
    "pre-ed4": 35,
    "ed-pre-consultation": 36,
    "ed-5": 37,
  };

  const trackers = [...commonTrackers];

  // Add GTM4WP for specific pages
  if (gtm4wpPages.includes(page)) {
    trackers.push(gtm4wpTracker());
  }

  // Add alternate GTM for specific pages
  if (gtmAlternatePages.includes(page)) {
    trackers.push(gtmAlternateTracker());
  }

  // Add Facebook Pixel for specific pages
  if (facebookPixel522677764108011Pages.includes(page)) {
    trackers.push(facebookPixelTracker("522677764108011"));
  }
  if (facebookPixel1451450365779499Pages.includes(page)) {
    trackers.push(facebookPixelTracker("1451450365779499"));
  }

  // Add VisiSmart for specific pages
  if (visiSmartPages[page]) {
    trackers.push(visiSmartTracker(visiSmartPages[page]));
  }

  return trackers;
};

// Main Tracker Component
const Trackers = ({ page }) => {
  const trackers = pageTrackers(page);
  return (
    <>
      {trackers.map((tracker, index) => (
        <div key={index}>{tracker}</div>
      ))}
    </>
  );
};

export default Trackers;
