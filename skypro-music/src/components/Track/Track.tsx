"use client"
import classNames from "classnames"
import styles from "./Track.module.css"
import { useAppDispatch, useAppSelector } from "@/hooks";
import { trackType } from "@/types";
import { setCurrentTrack } from "@/store/features/playListSlice";

type TrackType = {
  trackData: trackType,
  tracksData: trackType[]
}


export default function Track({ trackData, tracksData }: TrackType) {
  //получаем текущий трек из store
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack)
  const { name, author, album, duration_in_seconds, id } = trackData
  const isPlaying = currentTrack ? currentTrack.id === id : false
  //вывести сиреневую точечку и стилизовать оносительно изплэинг или можно класс добавить и стилизовать
  const dispatch = useAppDispatch()
  const handleTrackKlick = () => {
    dispatch(setCurrentTrack({ trackData, tracksData }))
  }
  return (
    <div onClick={handleTrackKlick}
      className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>

            {isPlaying &&
              (<div className={styles.playingDot}>
                {/* <svg className={classNames(styles.trackTitleSvg, styles.trackTitleIsPlaying)}>
                  <use xlinkHref="img/icon/sprite.svg#this-is-playing" />
                </svg> */}
              </div>
              )}
            {!isPlaying &&
              (<div><svg className={styles.trackTitleSvg}>
                <use xlinkHref="img/icon/sprite.svg#icon-note" />
              </svg>
              </div>
              )}

          </div>
          <div className={styles.trackTitleText}>
            <span className={styles.trackTitleLink} >
              {name} <span className={styles.trackTitleSpan} />
            </span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink} >
            {author}
          </span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink} >
            {album}
          </span>
        </div>
        <div className={classNames(styles.trackTime, styles.btnIcon)}>
          <svg className={styles.trackTimeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-like" />
          </svg>
          <span className={styles.trackTimeText}>4:44</span>
        </div>
      </div>
    </div>
  )
}