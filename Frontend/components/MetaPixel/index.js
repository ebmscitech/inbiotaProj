import { useEffect } from 'react'
import Script from 'next/script'
// import { useRouter } from 'next/router'
import * as fbq from '../../lib/fpixel'
// import Head from "next/head";
import { isObjEmpty } from '@/utils/index';

function MetaPixel({ pixelData, dataCaleg }) {
    // const router = useRouter()

    useEffect(() => {
        // This pageview only triggers the first time (it's important for Pixel to have real information)
        // fbq.pageview()
        // console.log("ini pixel id meta pixel caleg", pixelData.id)
        if (!isObjEmpty(pixelData)) {
            // console.log("ini pixel event meta pixel caleg", pixelData.event)
            var tempPixelEvent = pixelData.event.value
            fbq.event(tempPixelEvent, {
                content_name: `Aspirasi Caleg ${dataCaleg?.account?.full_name}`,
                content_category: 'Aspirasi > Detail Caleg',
                content_type: 'caleg',
            })
        }
    }, [pixelData])

    return (
        <>
            {/* Additional Site Code Pixel Caleg - Facebook Pixel */}
            {/* <Head>
            </Head> */}
            <Script
                id="fb-pixel-caleg"
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
                            fbq('init', '${pixelData.id}');
                        `,
                }}
            />
        </>
    )
}

export default MetaPixel;
