import Script from 'next/script'

/**
 * Analytics Tracker Component
 * 
 * Integrates multiple tracking platforms:
 * - Google Analytics 4
 * - Facebook Pixel
 * - Add your own tracking codes below
 * 
 * Configure with environment variables:
 * NEXT_PUBLIC_GA_ID (Google Analytics 4 ID)
 * NEXT_PUBLIC_FACEBOOK_PIXEL_ID (Facebook Pixel ID)
 */

export function AnalyticsTracker() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const fbPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

  return (
    <>
      {/* Google Analytics 4 */}
      {gaId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                  page_title: document.title,
                  anonymize_ip: true,
                });

                // Track page views
                window.addEventListener('hashchange', () => {
                  gtag('event', 'page_view', {
                    page_path: window.location.pathname,
                    page_title: document.title,
                  });
                });
              `,
            }}
          />
        </>
      )}

      {/* Facebook Pixel */}
      {fbPixelId && (
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${fbPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {/* LinkedIn Insight Tag (Optional - Add your LinkedIn Partner ID) */}
      {/* Uncomment and configure if you use LinkedIn */}
      {/* 
      <Script
        id="linkedin-insight"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            _linkedin_partner_id = "PARTNER_ID";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `,
        }}
      />
      <Script
        src="https://snap.licdn.com/li.lms-analytics/insight.js"
        strategy="afterInteractive"
      />
      */}

      {/* Hotjar (Optional - Add your Hotjar ID) */}
      {/* Uncomment and configure if you use Hotjar for heatmaps and session recording */}
      {/* 
      <Script
        id="hotjar"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:HOTJAR_ID,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
        }}
      />
      */}

      {/* No Fallback Image - Not needed with modern tracking */}
    </>
  )
}
