import { useAmp } from "next/amp";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "components/Layout";
import AmpLayout from "components/AmpLayout";
import "../styles/globals.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebookF, faInstagram, faTumblr, faTwitter, faVimeoV, faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
    faBullhorn,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faFilm,
    faFilter,
    faGripHorizontal,
    faGuitar,
    faListUl,
    faLanguage,
    faMusic,
    faPhotoVideo,
    faRss,
    faSearch,
    faShoppingCart,
    faSlidersH
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faBullhorn,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faFacebookF,
    faFilm,
    faFilter,
    faGripHorizontal,
    faGuitar,
    faInstagram,
    faLanguage,
    faListUl,
    faMusic,
    faPhotoVideo,
    faRss,
    faSearch,
    faShoppingCart,
    faSlidersH,
    faTumblr,
    faTwitter,
    faVimeoV,
    faYoutube
);

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
    const isAmp = useAmp();

    return (
            {isAmp ? (
                <AmpLayout>
                    <Component {...pageProps} />
                </AmpLayout>
            ) : (
        <Layout>
            <Component {...pageProps} />
        </Layout>
            )}
    );
}

export default MyApp;
