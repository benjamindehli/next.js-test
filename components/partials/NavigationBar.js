// Dependencies
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Helpers
import { getLocaleName } from "helpers/localesHelper";

// Assets
import menuIcon from "assets/svg/menuIcon.svg";
import dehliMusikkLogo from "assets/svg/DehliMusikkLogoHorizontal.svg";

// Stylesheets
import style from "components/partials/NavigationBar.module.scss";

const NavigationBar = () => {
    const router = useRouter();
    const { locales, locale, pathname } = router;

    // State
    const [showSidebar, setShowSidebar] = useState();
    const [hidingSidebar, setHidingSidebar] = useState(false);
    const [showLanguageSelectorList, setShowLanguageSelectorList] = useState(false);

    // Refs
    const sidebarWrapperRef = useRef();
    const languageSelectorListWrapperRef = useRef();

    const handleShowSidebarClick = () => {
        setShowSidebar(true);
    };

    const hideSidebar = () => {
        setHidingSidebar(true);
        setTimeout(() => {
            setShowSidebar(false);
            setHidingSidebar(false);
        }, 225);
    };

    const handleShowLanguageSelectorList = () => {
        setShowLanguageSelectorList(true);
    };

    const hideLanguageSelectorList = () => {
        setShowLanguageSelectorList(false);
    };

    useEffect(() => {
        const handleClickOutsideSidebar = (event) => {
            if (sidebarWrapperRef.current && !sidebarWrapperRef.current.contains(event.target) && showSidebar) {
                hideSidebar();
            }
        };
        document.addEventListener("mousedown", handleClickOutsideSidebar);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideSidebar);
        };
    }, [sidebarWrapperRef, showSidebar]);

    useEffect(() => {
        const handleClickOutsideLanguageSelectorList = (event) => {
            if (
                languageSelectorListWrapperRef.current &&
                !languageSelectorListWrapperRef.current.contains(event.target) &&
                showLanguageSelectorList
            ) {
                hideLanguageSelectorList();
            }
        };
        document.addEventListener("mousedown", handleClickOutsideLanguageSelectorList);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideLanguageSelectorList);
        };
    }, [languageSelectorListWrapperRef, showLanguageSelectorList]);

    useEffect(() => {
        hideSidebar();
        hideLanguageSelectorList();
    }, [pathname, locale]);

    const renderLanguageSelectorButton = (locales, locale) => {
        const hasAvailableLanguages = locales && Object.keys(locales).length;
        if (hasAvailableLanguages) {
            const localeName = getLocaleName(locale, locale);
            return (
                <span className={style.languageSelectorButton}>
                    <FontAwesomeIcon icon={["fas", "language"]} />
                    <span className={style.languageName}>{localeName}</span>
                    <FontAwesomeIcon icon={["fas", "chevron-down"]} />
                </span>
            );
        } else return "";
    };

    const renderLanguageSelectorList = () => {
        const languageElements = locales.map((availableLocale) => {
            const availableLocaleName = getLocaleName(availableLocale, availableLocale);
            const isActive = availableLocale === locale;
            return (
                <li key={availableLocale}>
                    <Link href={pathname} locale={availableLocale}>
                        <a title={availableLocaleName} className={isActive ? style.activeLink : ""}>
                            {availableLocaleName}
                        </a>
                    </Link>
                </li>
            );
        });
        return <ul>{languageElements}</ul>;
    };

    return (
        <div className={style.navigationBar}>
            <button
                onClick={handleShowSidebarClick}
                className={style.menuButton}
                aria-label={locale === "en" ? "Show menu" : "Vis meny"}
            >
                <div className={style.menuIcon}>
                    <Image src={menuIcon} alt="Menu icon" width={42} height={42} />
                </div>
            </button>

            {/* <SearchField /> */}
            <div className={style.languageSelectorListContainer}>
                <button
                    onClick={handleShowLanguageSelectorList}
                    aria-label={locale === "en" ? "Select language" : "Velg språk"}
                >
                    {renderLanguageSelectorButton(locales, locale)}
                </button>
                {
                    <div
                        ref={languageSelectorListWrapperRef}
                        className={`${style.languageSelectorList} ${showLanguageSelectorList ? style.active : ""}
            `}
                    >
                        {renderLanguageSelectorList()}
                    </div>
                }
            </div>
            <div
                className={`${style.sidebarOverlay} ${showSidebar ? style.active : ""} ${
                    hidingSidebar ? style.hidingSidebar : ""
                } `}
            >
                <div ref={sidebarWrapperRef} className={style.sidebarContent}>
                    <div className={style.sidebarContentHeader}>
                        <Link href="/" locale={locale}>
                            <a
                                className={style.appLogo}
                                aria-label="Link to Dehli Musikk home page"
                                title="Link to Dehli Musikk home page"
                            >
                                <Image src={dehliMusikkLogo} width="216" height="35.57" alt="Dehli Musikk logo" />
                            </a>
                        </Link>
                    </div>
                    <ul className={style.sidebarLinks}>
                        <li>
                            <Link href={`/portfolio`} locale={locale}>
                                <a
                                    className={pathname === "/portfolio" ? style.activeLink : undefined}
                                    title={locale === "en" ? "Portfolio" : "Portefølje"}
                                >
                                    <FontAwesomeIcon icon={["fas", "music"]} />{" "}
                                    {locale === "en" ? "Portfolio" : "Portefølje"}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/posts" locale={locale}>
                                <a
                                    className={pathname === "/posts" ? style.activeLink : undefined}
                                    title={locale === "en" ? "Posts" : "Innlegg"}
                                >
                                    <FontAwesomeIcon icon={["fas", "photo-video"]} />{" "}
                                    {locale === "en" ? "Posts" : "Innlegg"}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/videos"
                                locale={locale}
                                className={pathname === "/videos" ? style.activeLink : undefined}
                                title={locale === "en" ? "Videos" : "Videoer"}
                            >
                                <a>
                                    <FontAwesomeIcon icon={["fas", "film"]} /> {locale === "en" ? "Videos" : "Videoer"}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products"
                                locale={locale}
                                className={pathname === "/products" ? style.activeLink : undefined}
                                title={locale === "en" ? "Products" : "Produkter"}
                            >
                                <a>
                                    <FontAwesomeIcon icon={["fas", "shopping-cart"]} />{" "}
                                    {locale === "en" ? "Products" : "Produkter"}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/equipment"
                                locale={locale}
                                className={pathname === "/equipment" ? style.activeLink : undefined}
                                title={locale === "en" ? "Equipment" : "Utstyr"}
                            >
                                <a>
                                    <FontAwesomeIcon icon={["fas", "guitar"]} />{" "}
                                    {locale === "en" ? "Equipment" : "Utstyr"}
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
