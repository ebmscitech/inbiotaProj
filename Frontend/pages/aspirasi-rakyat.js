import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";
import ScrollTop from "../components/scrolltop";
import ButtonPrimary from "../components/misc/ButtonPrimary";
import { ArrowUp20Filled } from "@fluentui/react-icons";
import Aspirasi from "../components/Aspirasi";
import * as fbq from '@/lib/fpixel'
// import PageViewGa from "../config/pageViewGA";

function AspirasiRakyat() {
    useEffect(() => {
        fbq.event('ViewContent', {
            content_name: `Aspirasi Rakyat`,
            content_category: 'Aspirasi > Aspirasi Rakyat',
            content_type: 'dapil',
            // content_ids: ['1234'],
            // currency: 'USD', 
            // value: 10
        })
    }, [])
    return (
        <>
            <SeoHead title='Form Aspirasi Rakyat' />
            <Layout>
                <Aspirasi />
                <div className='scroll-to-top'>
                    <ScrollTop showOffset={300} className='scroll-top block'>
                        <ButtonPrimary addClass={"py-3 px-5 lg:px-4"}>
                            <ArrowUp20Filled size={14} />
                        </ButtonPrimary>
                    </ScrollTop>
                </div>
            </Layout>
        </>
    );
}

export default AspirasiRakyat
