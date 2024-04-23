import Track from "@/components/Track/Track";
import styles from "./Centerblock.module.css"
import classNames from 'classnames'

export default function Centerblock() {
  return (
    <div className={styles.mainCenterblock}>
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
      <h2 className={styles.centerblockH2}>Треки</h2>
      <div className={styles.centerblockFilter}>
        <div className={styles.filterTitle}>Искать по:</div>
        <div className={classNames(styles.filterButton, styles.btnText)}>
          исполнителю
        </div>
        <div className={classNames(styles.filterButton, styles.btnText)}>
          году выпуска
        </div>
        <div className={classNames(styles.filterButton, styles.btnText)}>жанру</div>
      </div>
      <div className={styles.centerblockContent}>
        <div className={styles.contentTitle}>
          <div className={classNames(styles.playlistTitleCol, styles.col01)}>Трек</div>
          <div className={classNames(styles.playlistTitleCol, styles.col02)}>Исполнитель</div>
          <div className={classNames(styles.playlistTitleCol, styles.col03)}>Альбом</div>
          <div className={classNames(styles.playlistTitleCol, styles.col04)}>
            <svg className={styles.playlistTitleSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-watch" />
            </svg>
          </div>
        </div>

        <div className={styles.contentPlaylist}>
          <Track />
        </div>

      </div>
    </div>
  )
}