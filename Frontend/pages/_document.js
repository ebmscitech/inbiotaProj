import Document, { Html, Head, Main, NextScript } from "next/document";
import { FB_PIXEL_ID } from '../lib/fpixel'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
          <link rel="manifest" href="/site.webmanifest"></link>
          {/* <!-- Google Analytics and gtag manager settings --> */}
          {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-WZBQXEGVM0"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag() {dataLayer.push(arguments) }
                gtag('js', new Date());
                gtag('config', 'G-WZBQXEGVM0');
                gtag('event', 'session_start')
                gtag('event', 'page_view')
                gtag('event', 'page_view')
                gtag('event', 'page_view')
                gtag('event', 'first_visit')
                gtag('event', 'click')
                gtag('event', 'page_location')
                gtag('event', 'page_title')
                gtag('event', 'screen_resolution')
                gtag('event', 'screen_view', {
                  'app_name': 'Aspirasi-web',
                  'screen_name': 'Home'
                })
                gtag("event", "login", {
                  method: "Google"
                })
              `,
            }}
          /> */}
          {/* <!-- End of Google Analytics and gtag manager settings --> */}
          {/* <!-- Facebook Pixel settings --> */}
          {/* <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript> */}
          {/* <!-- End of Facebook Pixel settings --> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
