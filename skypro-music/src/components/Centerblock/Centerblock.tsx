"use client"
import Track from "@/components/Track/Track";
import styles from "./Centerblock.module.css"
import classNames from 'classnames'
import Filters from "../Filters/Filters";
import Search from "../Search/Search";
import { getTracks } from "@/api/track";
import { trackType } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setInitialTracks } from "@/store/features/playListSlice";
import { useEffect, useState } from "react";



export default function Centerblock() {

  const dispatch = useAppDispatch()
  const [tracks, setTracks] = useState<trackType[]>([])
  const filteredTracks=useAppSelector((state) => state.playlist.filteredTracks);

  useEffect( () => {
     getTracks().then((data)=>{
      setTracks(data)
      dispatch(setInitialTracks({ initialTracks: data }))
     })
  }, [dispatch])

  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filters tracksData={tracks} />
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
          {filteredTracks.map((trackData) => (
            <Track
              key={trackData.id}
              trackData={trackData}
            />
          ))}

        </div>

      </div>
    </div>
  )
}


