import "@/styles/tailwind.css";
import "@/styles/slick.css";
import "@/styles/react-datepicker.css"
import "@/styles/ReactToastify.css"
import "@/styles/custom-modal.css"
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import * as fbq from '../lib/fpixel'
import { CheckSession } from "@/lib/checkSession";
import { usePathname } from "next/navigation";

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbq.pageview()

    const handleRouteChange = () => {
      fbq.pageview()
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    if (pathname && !pathname.includes("/admin")) {
      CheckSession(pathname);
    }
  }, [pathname]);

  if (process.env.NODE_ENV !== 'development') {
    console.log = () => { };
    console.warn = () => { };
    console.error = () => { };
  }

  return (
    <>
      {/* Global Site Code Pixel - Facebook Pixel */}
      {/* <Script
        id="fb-pixel"
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
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
        }}
      /> */}
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )

}

export default MyApp;
