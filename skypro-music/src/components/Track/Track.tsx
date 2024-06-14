"use client"
import classNames from "classnames"
import styles from "./Track.module.css"
import { useAppDispatch, useAppSelector } from "@/components/hooks";
import { trackType } from "@/types";
import {setCurrentTrack, setInitialTracks, setIsTrackPlaying, setLikedTracks} from "@/store/features/playListSlice";
import { formatSecondsToMMSS } from "@/app/lib/formatSecondsToMMSS";
import {useEffect, useMemo, useState} from "react";
import {addFavoriteTracks, deleteFavoriteTracks, getTracks, refreshToken} from "@/api/tracks";
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
    dispatch(setIsTrackPlaying(!isPlaying));
  }

  const userId = useAppSelector((state) => state.user.user.id)
  const [isLikeTrack, setIsLikeTrack] = useState(false)
  const isLike = Boolean(trackData?.stared_user ? trackData?.stared_user.find((el) => el.id === userId) : [])



  useEffect(() => {
    setIsLikeTrack(isLike)
  }, [trackData]);

  const handleLikeTrack = () => {
 
    if (!tokens.access) {
      alert("необходимо авторизоватся");
      return
    }
    setIsLikeTrack(!isLikeTrack)

    const likeFunc = isLikeTrack ? deleteFavoriteTracks : addFavoriteTracks

    likeFunc(trackData.id, tokens.access).then(() => {
      return getTracks()
    }).then((res) => {
      dispatch(setInitialTracks(res.tracks))
    })
        .catch((error) => {
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
            <use xlinkHref={`/img/icon/sprite.svg#${isLikeTrack ? "icon-like-active" : "icon-like"}`} />
          </svg>
          <span className={styles.trackTimeText}>{formatSecondsToMMSS(duration_in_seconds)}</span>
        </div>
      </div>
    </div>


  )
}
