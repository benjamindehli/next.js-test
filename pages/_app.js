// Dependencies
import Head from "next/head";
import { useAmp } from "next/amp";
import { Fragment } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Components
import Layout from "components/Layout";
import AmpLayout from "components/AmpLayout";

// Stylesheets
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
        <Fragment>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                <link rel="icon" href="/icons/favicon.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />

                <meta name="description" content="Description" />
                <meta name="keywords" content="Keywords" />
                <title>Next.js PWA Example</title>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#C32A22" />

                <meta name="robots" content="max-image-preview:large" />
            </Head>
            {isAmp ? (
                <AmpLayout>
                    <Component {...pageProps} />
                </AmpLayout>
            ) : (
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            )}
        </Fragment>
    );
}

export default MyApp;
