// Dependencies
import Link from "next/link";

// Stylesheets
import style from "components/template/Button.module.scss";

const Button = ({ buttontype = "default", href, title, children }) => {
    return href ? (
        <Link href={href} title={title} className={`${style.button} ${style[buttontype]}`}>
            <a className={style.content}>{children}</a>
        </Link>
    ) : (
        <span className={`${style.button} ${style[buttontype]}`}>
            <span className={style.content}>{children}</span>
        </span>
    );
};

export default Button;
