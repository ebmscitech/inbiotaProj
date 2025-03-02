import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";
import ScrollTop from "../components/scrolltop";
import ButtonPrimary from "../components/misc/ButtonPrimary";
import { ArrowUp20Filled } from "@fluentui/react-icons";
import PlantSearch from "@/components/PlantSearch";

function Search() {
    return (
        <>
            <SeoHead title='Inbiota Search Engine' />
            <Layout>
                <PlantSearch />
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

export default Search
