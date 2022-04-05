import Layout from "components/Layout";
import "../styles/globals.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebookF, faInstagram, faTumblr, faTwitter, faVimeoV, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faBullhorn, faChevronDown, faChevronLeft, faChevronRight, faFilm, faFilter, faGripHorizontal, faGuitar, faListUl, faLanguage, faMusic, faPhotoVideo, faRss, faSearch, faShoppingCart, faSlidersH } from "@fortawesome/free-solid-svg-icons";

library.add(faBullhorn, faChevronDown, faChevronLeft, faChevronRight, faFacebookF, faFilm, faFilter, faGripHorizontal, faGuitar, faInstagram, faLanguage, faListUl, faMusic, faPhotoVideo, faRss, faSearch, faShoppingCart, faSlidersH, faTumblr, faTwitter, faVimeoV, faYoutube);

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
