import Layout from "@/components/Layout/Layout";
import SeoHead from "@/components/SeoHead";
import ScrollTop from "@/components/scrolltop";
import ButtonPrimary from "@/components/misc/ButtonPrimary";
import { ArrowUp20Filled } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { isObjEmpty } from "@/utils/index";
import { useDispatch, useSelector } from "react-redux";
import CalegSearch from "@/components/CalegSearch";
import { getListCaleg, getListDapil, getListPartai } from "@/redux/global";

function SearchCaleg() {
    const dispatch = useDispatch()
    const store = useSelector((state) => state.global);

    useEffect(() => {
        if (isObjEmpty(store?.listPartai)) {
            dispatch(getListPartai())
        }
    }, [store?.listPartai])

    useEffect(() => {
        if (isObjEmpty(store?.listDapil)) {
            dispatch(getListDapil())
        }
    }, [store?.listDapil])

    useEffect(() => {
        if (isObjEmpty(store?.listCaleg)) {
            dispatch(getListCaleg())
        }
    }, [store?.listCaleg])

    return (
        <>
            <SeoHead title='Aspirasi Search Page' />
            <Layout>
                <CalegSearch />
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

export default SearchCaleg
