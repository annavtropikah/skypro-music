import Track from "@/components/Track/Track";
import styles from "./Centerblock.module.css"
import classNames from 'classnames'
import Filters from "../Filters/Filters";
import Search from "../Search/Search";
import { getTracks } from "@/api/track";
import { trackType } from "@/types";
import { useEffect, useState } from "react";
type PlayListType = {
  setTrack: (param: trackType) => void,
}

export default function Centerblock({ setTrack }: PlayListType) {
  //нужно вернуть со следующей домашкой redux
  // let tracksData: trackType[]
  // try {
  //   tracksData = await getTracks()
  // } catch (error: any) {
  //   throw new Error(error.message)
  // }
 const [tracksData,setTracksData]=useState<trackType[]>([])
 useEffect(()=>{
  getTracks().then((data:trackType[])=>setTracksData(data))
 .catch((error:any)=>{
throw new Error(error.message);
 })
},[])
  return (
    <div className={styles.mainCenterblock}>

      <Search />

      <h2 className={styles.centerblockH2}>Треки</h2>

      <Filters />

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
          {tracksData.map((trackData) => (
            <Track
            onClick={()=>setTrack(trackData)}
              key={trackData.id}
              name={trackData.name}
              author={trackData.author}
              album={trackData.album}
            />
          ))}

        </div>

      </div>
    </div>
  )
}


