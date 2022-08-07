//Dependencies
import Image from "next/image";

// Utils
import { imageKitLoader, imageKitUrl, renderThumbnail } from "utils/imageKit";

// Assets
import DehliMusikkLogo from 'assets/svg/DehliMusikkLogoInverse.svg'

// Stylesheets
import style from "./Header.module.scss";

const Header = () => {
    return (
        <div className={style.header}>
                <picture className={style.backgroundImage}>
                    {renderThumbnail(
                        "template/header_1680.jpg",
                        "header",
                        "A Korg MS-20 with a cassette and tape recorder",
                        "100vw"
                    )}
                </picture>
            <div className={style.overlay}>
                <span className={style.logo}>
                    { <Image src={DehliMusikkLogo} alt='Logo for Dehli Musikk' width="350" height="207" />}
                </span>
            </div>
        </div>
    );
};

export default Header;
