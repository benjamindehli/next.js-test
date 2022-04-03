// Dependencies
import { useState, useRef } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Assets
import menuIcon from "assets/svg/menuIcon.svg";

// Stylesheets
import style from "components/partials/NavigationBar.module.scss";

const NavigationBar = () => {
  const router = useRouter();
  const locale = router.locale;

  // State
  const [showSidebar, setShowSidebar] = useState();
  const [hidingSidebar, setHidingSidebar] = useState(false);
  const [showLanguageSelectorList, setShowLanguageSelectorList] =
    useState(false);

  // Refs
  const sidebarWrapperRef = useRef();
  const languageSelectorListWrapperRef = useRef();

  const handleShowSidebarClick = () => {
    console.log("hoy");
  };

  const handleShowLanguageSelectorList = () => {
    console.log("handleShowLanguageSelectorList");
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
          {/* {renderLanguageSelectorButton(availableLanguages, locale)} */}
        </button>
        {
          <div
            ref={languageSelectorListWrapperRef}
            className={`${style.languageSelectorList} ${
              showLanguageSelectorList ? style.active : ""
            }
            `}
          >
            {/*
            {renderLanguageSelectorList(
              availableLanguages,
              multilingualRoutes,
              selectedLanguageKey
            )} */}
          </div>
        }
      </div>
    </div>
  );
};

export default NavigationBar;
