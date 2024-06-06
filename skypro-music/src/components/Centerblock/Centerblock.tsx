"use client"
import Track from "@/components/Track/Track";
import styles from "./Centerblock.module.css"
import classNames from 'classnames'
import Filters from "../Filters/Filters";


import { trackType } from "@/types";

import { memo } from "react";


function Centerblock({ tracks, isLoading }: { tracks: trackType[], isLoading: boolean }) {



  return (
    <div >



      <div className={styles.centerblockContent}>
        <div className={styles.contentTitle}>
          <div className={classNames(styles.playlistTitleCol, styles.col01)}>Трек</div>
          <div className={classNames(styles.playlistTitleCol, styles.col02)}>Исполнитель</div>
          <div className={classNames(styles.playlistTitleCol, styles.col03)}>Альбом</div>
          <div className={classNames(styles.playlistTitleCol, styles.col04)}>
            <svg className={styles.playlistTitleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch" />
            </svg>
          </div>
        </div>

        <div className={styles.contentPlaylist}>
          {isLoading ? 'Ожидайте,треки загружаются' : tracks?.length === 0 ? "нет треков, удовлетворяющих условиям слортировки" : ""}
          {tracks?.map((trackData) => (
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




export default memo(Centerblock)
