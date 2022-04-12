// Components
import NavigationBar from "components/partials/NavigationBar";

// Stylesheets
import style from "components/Layout.module.scss";

const Layout = ({ children }) => {
    return (
        <div className={style.layout}>
            <NavigationBar />

            <div className={style.layoutBody}>{children}</div>
        </div>
    );
};

export default Layout;
