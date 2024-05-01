import Layout from "@/components/Layout/Layout";
import SeoHead from "@/components/SeoHead";
import ScrollTop from "@/components/scrolltop";
import ButtonPrimary from "@/components/misc/ButtonPrimary";
import { ArrowUp20Filled } from "@fluentui/react-icons";
import CalegDetail from "@/components/CalegDetail";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { noValue } from "@/utils/validateInput";
import { useDispatch, useSelector } from "react-redux";
import toastAlert from "@/utils/alert";
import { getCaleg } from "@/redux/caleg";
import * as fbq from '@/lib/fpixel'

function CalegDetailDirect() {
    const router = useRouter();
    const dispatch = useDispatch()
    const store = useSelector((state) => state.aspirasi);

    const { username } = router.query;

    async function getDataCaleg(username) {
        let params = {
            username: username
        }
        await dispatch(getCaleg(params)).then((res) => {
            // setIsLoading(false);
            var temp = res.payload.data
            // console.log("ini get data caleg", temp)
        })
            .catch((err) => {
                // setIsLoading(false);
                toastAlert("error", "Proses mendapatkan data caleg sedang gangguan");
                console.error(err);
            });
    }

    useEffect(() => {
        if (!noValue(username)) {
            getDataCaleg(username)
            // console.log("ini username", username)
            fbq.event('ViewContent', {
                content_name: `Caleg ${username}`,
                content_category: 'Aspirasi > Detail Caleg',
                content_type: 'caleg',
                // content_ids: ['1234'],
                // currency: 'USD', 
                // value: 10
            })
        }
    }, [username])

    return (
        <>
            <SeoHead title='Aspirasi Detail Caleg' />
            <Layout>
                <CalegDetail />
                {!store?.isAspirasiModal &&
                    <div className='scroll-to-top'>
                        <ScrollTop showOffset={300} className='scroll-top block'>
                            <ButtonPrimary addClass={"py-3 px-5 lg:px-4"}>
                                <ArrowUp20Filled size={14} />
                            </ButtonPrimary>
                        </ScrollTop>
                    </div>
                }
            </Layout>
        </>
    );
}

export default CalegDetailDirect
