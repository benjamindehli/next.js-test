// Dependencies
import { Fragment } from "react";

import Head from "next/head";

// Components
import Container from "components/template/Container";
import List from "components/template/List";
import ListItem from "components/template/List/ListItem";
import AmpPostItem from "./AmpPostItem";

const AmpPostList = (props) => {
    const renderPosts = () => {
        return props.posts?.length
            ? props.posts.map((post) => {
                  return <div key={post.id} style={{width: "350px"}}><AmpPostItem post={post} /></div>
              })
            : null;
    };

    return (
        <Fragment>
            <Head>
                <script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"></script>
            </Head>
            <amp-list width="350" layout="responsive">{renderPosts()}</amp-list>
        </Fragment>
    );
};

export default AmpPostList;
