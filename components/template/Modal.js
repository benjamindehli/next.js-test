// Dependencies
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Stylesheets
import style from "components/template/Modal.module.scss";

const Modal = ({
    maxWidth = "none",
    selectedLanguageKey = "no",
    onClickOutside,
    arrowLeftLink,
    arrowRightLink,
    children
}) => {
    const router = useRouter();

    // Refs
    const wrapperRef = useRef();
    const hiddenInputWrapperRef = useRef();
    const arrowLeftButtonRef = useRef();
    const arrowRightButtonRef = useRef();

    useEffect(() => {
        hiddenInputWrapperRef.current.tabIndex = -1;
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isArrowLeftButtonClick = arrowLeftButtonRef?.current?.contains(event.target);
            const isArrowRightButtonClick = arrowRightButtonRef?.current?.contains(event.target);
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target) &&
                !isArrowLeftButtonClick &&
                !isArrowRightButtonClick
            ) {
                onClickOutside();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClickOutside]);

    useEffect(() => {
        const onClickArrowLeft = arrowLeftLink
            ? () => {
                  router.push(arrowLeftLink);
              }
            : null;
        const onClickArrowRight = arrowRightLink
            ? () => {
                  router.push(arrowRightLink);
              }
            : null;

        const keyDownFunction = (event) => {
            switch (event.keyCode) {
                case 27: // Escape
                    if (onClickOutside) onClickOutside();
                    break;
                case 37: // ArrowLeft
                    if (onClickArrowLeft) onClickArrowLeft();
                    break;
                case 38: // ArrowUp
                    if (onClickArrowLeft) onClickArrowLeft();
                    break;
                case 39: // ArrowRight
                    if (onClickArrowRight) onClickArrowRight();
                    break;
                case 40: // ArrowDown
                    if (onClickArrowRight) onClickArrowRight();
                    break;
                default:
                    return null;
            }
        };
        document.addEventListener("keydown", keyDownFunction, false);
        return () => {
            document.removeEventListener("keydown", keyDownFunction, false);
        };
    }, [onClickOutside, arrowLeftLink, arrowRightLink, router]);

    const renderArrowLeftButton = (link) => {
        return link?.length ? (
            <Link href={link}>
                <a
                    ref={arrowLeftButtonRef}
                    aria-label={selectedLanguageKey === "en" ? "Previous" : "Forrige"}
                    className={style.arrowLeftButton}
                    rel="prev"
                >
                    <FontAwesomeIcon icon={["fas", "chevron-left"]} size="2x" />
                </a>
            </Link>
        ) : (
            <div className={style.arrowPlaceholderButton}></div>
        );
    };

    const renderArrowRightButton = (link) => {
        return link?.length ? (
            <Link href={link}>
                <a
                    ref={arrowRightButtonRef}
                    aria-label={selectedLanguageKey === "en" ? "Next" : "Neste"}
                    className={style.arrowRightButton}
                    rel="next"
                >
                    <FontAwesomeIcon icon={["fas", "chevron-right"]} size="2x" />
                </a>
            </Link>
        ) : (
            <div className={style.arrowPlaceholderButton}></div>
        );
    };

    return (
        <div className={style.postModalOverlay}>
            {renderArrowLeftButton(arrowLeftLink)}
            <div ref={wrapperRef} className={style.postModalContent} style={{ maxWidth: maxWidth }}>
                <input type="button" ref={hiddenInputWrapperRef} className={style.hidden} autoFocus />
                {children}
            </div>
            {renderArrowRightButton(arrowRightLink)}
        </div>
    );
};

export default Modal;
