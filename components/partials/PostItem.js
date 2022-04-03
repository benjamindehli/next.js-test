// Dependencies
import { Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// Helpers
import { convertToUrlFriendlyString } from "helpers/urlFormatter";


const PostItem = (props) => {
  const router = useRouter();

  const locale = router.locale;

  const postSlug = convertToUrlFriendlyString(props.post.title[locale]);

  return (
    <Fragment>
      <h2> {props.post.title[locale]}</h2>
      <Link href={`/posts/${postSlug}`}>{props.post.title[locale]}</Link>
    </Fragment>
  );
};

export default PostItem;
