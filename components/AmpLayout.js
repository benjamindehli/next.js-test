// Dependencies
import { Fragment } from "react";
import Head from "next/head";

const Layout = ({ children }) => {
    return (
        <Fragment>
            <Head>
                <style amp-custom>
                    {`
                    body {
                        background-color: #fff;
                        color: #333435;
                        font-family: sans-serif;
                    }
                    h1, p, a, amp-timeago {
                        margin: 1rem;
                    }
                    h1 {
                        font-size: 1.8em;
                    }
                    a {
                        color: #C32A22;
                    }
                    `}
                </style>
            </Head>
            <div className="amp-layout">{children}</div>
        </Fragment>
    );
};

export default Layout;
