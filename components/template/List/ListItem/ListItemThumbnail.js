// Dependencies
import Link from "next/link";

// Stylesheets
import style from 'components/template/List/ListItem/ListItemThumbnail.module.scss';

const ListItemThumbnail = ({ fullscreen, compact, link, children }) => {

  const childElements = (
    <figure className={`${style.listItemThumbnail} ${fullscreen ? style.fullscreen : ''} ${compact ? style.compact : ''}`}>
      <picture>{children}</picture>
    </figure>
  );

  return link && !fullscreen
    ? <Link href={link.to} title={link.title} tabIndex="-1"><a>{childElements}</a></Link>
    : childElements;

};


export default ListItemThumbnail;
