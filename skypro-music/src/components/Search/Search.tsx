
import styles from "./Search.module.css"
import classNames from 'classnames'


export default function Search() {
  return (
    <div className={styles.centerblockSearch}>
    <svg className={styles.searchSvg}>
      <use xlinkHref="img/icon/sprite.svg#icon-search" />
    </svg>
    <input
      className={styles.searchText}
      type="search"
      placeholder="Поиск"
      name="search"
    />
  </div>
  )
}