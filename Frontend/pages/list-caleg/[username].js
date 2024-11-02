import Layout from "@/components/Layout/Layout";
import SeoHead from "@/components/SeoHead";
import ScrollTop from "@/components/scrolltop";
import ButtonPrimary from "@/components/misc/ButtonPrimary";
import { ArrowUp20Filled } from "@fluentui/react-icons";
import CalegDetail from "@/components/CalegDetail";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { noValue } from "@/utils/validateInput";
import { useDispatch, useSelector } from "react-redux";
import toastAlert from "@/utils/alert";
import { getCaleg } from "@/redux/caleg";

function ListCalegDetail() {
    const router = useRouter();
    const dispatch = useDispatch()
    const store = useSelector((state) => state.aspirasi);
    const [isLoading, setIsLoading] = useState(false)

    const { username } = router.query;

    async function getDataCaleg(username) {
        setIsLoading(true)
        let params = {
            username: username
        }
        await dispatch(getCaleg(params)).then((res) => {
            setIsLoading(false);
            var temp = res.payload.data
            // console.log("ini get data caleg", temp)
        })
            .catch((err) => {
                setIsLoading(false);
                toastAlert("error", "Proses mendapatkan data caleg sedang gangguan");
                console.error(err);
            });
    }

    useEffect(() => {
        if (!noValue(username)) {
            getDataCaleg(username)
        }
    }, [username])

    return (
        <>
            <SeoHead title='Aspirasi Detail Caleg' />
            <Layout>
                <CalegDetail isLoading={isLoading} />
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

export default ListCalegDetail
