// Dependencies
import { useRef, Fragment } from "react";

// Helpers
import { convertToUrlFriendlyString } from "helpers/urlFormatter";
import {
  getGeneratedIdByDate,
  getOrderNumberString,
} from "helpers/objectHelpers";
import { timestampToDateInputValue } from "helpers/timeFormatter";

// Stylesheets
import style from "components/admin/postForm.module.scss";
import formStyle from "styles/forms.module.scss";

const NewPostForm = (props) => {
  const idInputRef = useRef();
  const orderNumberInputRef = useRef();
  const copyrightInputRef = useRef();
  const timestampInputRef = useRef();
  const slugNoInputRef = useRef();
  const slugEnInputRef = useRef();
  const titleNoInputRef = useRef();
  const titleEnInputRef = useRef();
  const contentNoInputRef = useRef();
  const contentEnInputRef = useRef();
  const thumbnailDescriptionInputRef = useRef();
  const thumbnailFilenameInputRef = useRef();
  const linkInternalInputRef = useRef();
  const linkUrlNoInputRef = useRef();
  const linkUrlEnInputRef = useRef();
  const linkUrlInputRef = useRef();
  const linkTextNoInputRef = useRef();
  const linkTextEnInputRef = useRef();

  const handleUpdateId = () => {
    const date = new Date(timestampInputRef.current.value);
    const orderNumberString = getOrderNumberString(
      orderNumberInputRef.current.value
    );
    idInputRef.current.value = getGeneratedIdByDate(date, orderNumberString);
  };

  const handleUpdateNorwegianSlug = () => {
    slugNoInputRef.current.value = convertToUrlFriendlyString(
      titleNoInputRef.current.value
    );
  };

  const handleUpdateEnglishSlug = () => {
    slugEnInputRef.current.value = convertToUrlFriendlyString(
      titleEnInputRef.current.value
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const postData = {
      _id: props.post._id,
      id: idInputRef.current.value,
      orderNumber: orderNumberInputRef.current.value || 0,
      copyright: copyrightInputRef.current.checked || false,
      timestamp: timestampInputRef.current.value,
      slug: {
        no: slugNoInputRef.current.value,
        en: slugEnInputRef.current.value,
      },
      title: {
        no: titleNoInputRef.current.value,
        en: titleEnInputRef.current.value,
      },
      content: {
        no: contentNoInputRef.current.value,
        en: contentEnInputRef.current.value,
      },
      thumbnailDescription: thumbnailDescriptionInputRef.current.value,
      thumbnailFilename: thumbnailFilenameInputRef.current.value,
      link:
        !!linkInternalInputRef?.current?.checked ||
        !!linkInternalInputRef?.current?.value
          ? {
              internal: linkInternalInputRef.current.checked || false,
              url: linkInternalInputRef.current.value
                ? {
                    no: linkUrlNoInputRef.current.value,
                    en: linkUrlEnInputRef.current.value,
                  }
                : linkUrlInputRef.current.value,
              text: {
                no: linkTextNoInputRef.current.value,
                en: linkTextEnInputRef.current.value,
              },
            }
          : null,
    };

    props.onUpdatePost(postData);
  };

  return (
    <form onSubmit={handleSubmit} className={formStyle.formListElement}>
      <span className={formStyle.formElementGroupTitle}>Identifiers</span>
      <div className={formStyle.formElement}>
        <label htmlFor="post-timestamp">
          Date
          <input
            id="post-timestamp"
            type="date"
            ref={timestampInputRef}
            required
            defaultValue={timestampToDateInputValue(props.post.timestamp)}
          />
        </label>

        <label htmlFor="post-orderNumber">
          orderNumber
          <input
            id="post-orderNumber"
            type="number"
            min="0"
            ref={orderNumberInputRef}
            onChange={handleUpdateId}
            defaultValue={props.post.orderNumber}
          />
        </label>
        <label htmlFor="post-id">
          ID
          <input
            id="post-id"
            type="text"
            ref={idInputRef}
            readOnly
            defaultValue={props.post.id}
          />
        </label>
        <label htmlFor="post-thumbnailFilename">
          Thumbnail filename
          <input
            id="post-thumbnailFilename"
            type="text"
            ref={thumbnailFilenameInputRef}
            required
            defaultValue={props.post.thumbnailFilename}
          />
        </label>
      </div>

      <div className={formStyle.formElement}>
        <label htmlFor="post-slug-no">
          Norwegian slug
          <input
            id="post-slug-no"
            type="text"
            ref={slugNoInputRef}
            required
            defaultValue={props.post.slug?.no}
            readOnly
          />
        </label>

        <label htmlFor="post-slug-en">
          English slug
          <input
            id="post-slug-en"
            type="text"
            ref={slugEnInputRef}
            required
            defaultValue={props.post.slug?.en}
            readOnly
          />
        </label>
      </div>

      <span className={formStyle.formElementGroupTitle}>Title</span>
      <div className={formStyle.formElement}>
        <label htmlFor="post-title-no">
          Norwegian
          <input
            id="post-title-no"
            type="text"
            ref={titleNoInputRef}
            required
            onChange={handleUpdateNorwegianSlug}
            defaultValue={props.post.title.no}
          />
        </label>

        <label htmlFor="post-title-en">
          English
          <input
            id="post-title-en"
            type="text"
            ref={titleEnInputRef}
            required
            onChange={handleUpdateEnglishSlug}
            defaultValue={props.post.title.en}
          />
        </label>
      </div>

      <span className={formStyle.formElementGroupTitle}>Content</span>
      <div className={formStyle.formElement}>
        <label htmlFor="post-content-no">
          Norwegian
          <textarea
            id="post-content-no"
            type="text"
            ref={contentNoInputRef}
            required
            defaultValue={props.post.content.no}
          />
        </label>

        <label htmlFor="post-content-en">
          English
          <textarea
            id="post-content-en"
            type="text"
            ref={contentEnInputRef}
            required
            defaultValue={props.post.content.en}
          />
        </label>
      </div>

      <span className={formStyle.formElementGroupTitle}>Image</span>
      <div className={formStyle.formElement}>
        <label htmlFor="post-thumbnailDescription">
          Image description
          <input
            id="post-thumbnailDescription"
            type="text"
            ref={thumbnailDescriptionInputRef}
            defaultValue={props.post.thumbnailDescription}
          />
        </label>
        <label htmlFor="post-copyright">
          Image copyright
          <input
            id="post-copyright"
            type="checkbox"
            ref={copyrightInputRef}
            defaultChecked={props.post.copyright}
          />
        </label>
      </div>
      {props.post.link && Object.keys(props.post.link).length ? (
        <Fragment>
          <span className={formStyle.formElementGroupTitle}>Link</span>
          <div className={formStyle.formElement}>
            <label htmlFor="post-link-internal" style={{ width: "100px" }}>
              Internal
              <input
                id="post-link-internal"
                type="checkbox"
                ref={linkInternalInputRef}
                defaultChecked={props.post.link?.internal || false}
              />
            </label>
            {props.post.link.internal ? (
              <Fragment>
                <label htmlFor="post-link-url-no">
                  Norwegian
                  <input
                    id="post-link-url-no"
                    type="text"
                    ref={linkUrlNoInputRef}
                    required
                    defaultValue={props.post.link?.url?.no}
                  />
                </label>

                <label htmlFor="post-link-url-en">
                  English
                  <input
                    id="post-link-url-en"
                    type="text"
                    ref={linkUrlEnInputRef}
                    required
                    defaultValue={props.post.link?.url?.en}
                  />
                </label>
              </Fragment>
            ) : (
              <Fragment>
                <label htmlFor="post-link-url">
                  English
                  <input
                    id="post-link-url"
                    type="text"
                    ref={linkUrlInputRef}
                    required
                    defaultValue={props.post.link?.url}
                  />
                </label>
              </Fragment>
            )}
          </div>

          <div className={formStyle.formElement}>
            <label htmlFor="post-link-text-no">
              Norwegian link text
              <input
                id="post-link-text-no"
                type="text"
                ref={linkTextNoInputRef}
                required
                defaultValue={props.post.link?.text?.no}
              />
            </label>

            <label htmlFor="post-link-text-en">
              English link text
              <input
                id="post-link-text-en"
                type="text"
                ref={linkTextEnInputRef}
                required
                defaultValue={props.post.link?.text?.en}
              />
            </label>
          </div>
        </Fragment>
      ) : (
        ""
      )}

      <button type="submit">add post</button>
    </form>
  );
};

export default NewPostForm;
