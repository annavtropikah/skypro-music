"use client"
import classNames from "classnames"
import styles from "./Track.module.css"
import { useAppDispatch, useAppSelector } from "@/components/hooks";
import { trackType } from "@/types";
import { setCurrentTrack, setIsTrackPlaying, setLikedTracks } from "@/store/features/playListSlice";
import { formatSecondsToMMSS } from "@/app/lib/formatSecondsToMMSS";
import { useMemo } from "react";
import { addFavoriteTracks, deleteFavoriteTracks, refreshToken } from "@/api/tracks";
import { DEFAULT_USER, setToken, setUser } from "@/store/features/userSlice";
import { useRouter } from 'next/navigation';

export type TrackType = {
  trackData: trackType,
}


export default function Track({ trackData }: TrackType) {
  const dispatch = useAppDispatch()
  //получаем текущий трек из store
  const { currentTrack, isPlaying } = useAppSelector((state) => state.playlist)
  const tracksData = useAppSelector((state) => state.playlist.initialTracks)


  const tokens = useAppSelector((state) => state.user.tokens)
  const likedTracks = useAppSelector(state => state.playlist.likedTrackes)
  const router = useRouter()

  const { name, author, album, duration_in_seconds, id } = trackData


  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ trackData, tracksData }))
    dispatch(setIsTrackPlaying((true)));
  }


  
  const isAlreadyLicked = useMemo(() => {
    return currentTrack ? likedTracks.filter((track) => track.id === currentTrack.id).length : false;
  }, [currentTrack, likedTracks])

  const handleLikeTrack = () => {
    if (!currentTrack?.id) {
      return;
    }
    if (!tokens.access) {
      alert("необходимо авторизоватся");
    }

    if (isAlreadyLicked) {
      deleteFavoriteTracks(currentTrack.id, tokens.access).then(() => {
        const newLickedTracks = likedTracks.filter((track) => track.id !== currentTrack.id);
        dispatch(setLikedTracks({ likedTracks: newLickedTracks }))
      }).catch((error) => {
        if (error.message === '401') {
          refreshToken(tokens.refresh).then((data) => {
            dispatch(setToken({
              refresh: tokens.refresh,
              access: data.access,
            }))
          }).catch(() => {
            dispatch(setUser(DEFAULT_USER))
            dispatch(setToken({
              access: '',
              refresh: '',
            }))
            router.push('/signin');
          })
        }
      })
    }


    if (!isAlreadyLicked) {
      addFavoriteTracks(currentTrack.id, tokens.access).then(() => {
        dispatch(setLikedTracks({ likedTracks: [...likedTracks, currentTrack] }))
      }).catch((error) => {
        if (error.message === '401') {
          refreshToken(tokens.refresh).then((data) => {
            dispatch(setToken({
              refresh: tokens.refresh,
              access: data.access,
            }))
          }).catch(() => {
            dispatch(setUser(DEFAULT_USER))
            dispatch(setToken({
              access: '',
              refresh: '',
            }))
            router.push('/signin');
          })
        }
      })
    }
  }


  return (
    <div
      className={styles.playlistItem}>


      <div className={styles.playlistTrack}>


        <div onClick={handleTrackClick} className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
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
                  <use xlinkHref="/img/icon/sprite.svg#icon-note" />
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



        <div onClick={handleTrackClick} className={styles.trackAuthor}>
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

          <svg onClick={handleLikeTrack} className={styles.trackTimeSvg}>
            <use xlinkHref={`/img/icon/sprite.svg#${isAlreadyLicked ? "icon-like-active" : "icon-like"}`} />
          </svg>
          <span className={styles.trackTimeText}>{formatSecondsToMMSS(duration_in_seconds)}</span>
        </div>
      </div>
    </div>


  )
}
