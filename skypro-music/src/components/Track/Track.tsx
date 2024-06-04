"use client"
import classNames from "classnames"
import styles from "./Track.module.css"
import { useAppDispatch, useAppSelector } from "@/hooks";
import { trackType } from "@/types";
import { setCurrentTrack, setIsTrackPlaying } from "@/store/features/playListSlice";
import { formatSecondsToMMSS } from "@/utils";

type TrackType = {
  trackData: trackType,
}


export default function Track({ trackData }: TrackType) {
  //получаем текущий трек из store
  const {currentTrack, isPlaying} = useAppSelector((state) => state.playlist)
  const tracksData = useAppSelector((state) => state.playlist.initialTracks);

  const { name, author, album, duration_in_seconds, id } = trackData

  //вывести сиреневую точечку и стилизовать оносительно изплэинг или можно класс добавить и стилизовать
  const dispatch = useAppDispatch()
  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ trackData, tracksData }))

    //обращение к элементу аудио по id чтобы вызвать у него play чтобы трэк заиграл при клике
    dispatch(setIsTrackPlaying(true));
  }



  return (
    <div onClick={handleTrackClick}
      className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>

            {/* {isPlaying ?
              (<div className={styles.playingDot}>
        
              </div>
              ) : (
                  <div>
                    <svg className={styles.trackTitleSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-note" />
                    </svg>
                  </div>
                )} */}

            {currentTrack?.id === id ? (
              isPlaying ? (
                <div className={styles.playingDot}>
                </div>
              ) : (
                <div className={styles.pauseDot}>
                </div>
              )
            ) : (
              <div>
                <svg className={styles.trackTitleSvg}>
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
          <span className={styles.trackTimeText}>{formatSecondsToMMSS(duration_in_seconds)}</span>
        </div>
      </div>
    </div>
  )
}
