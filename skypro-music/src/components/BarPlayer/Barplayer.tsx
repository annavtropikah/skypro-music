'use client'
import { ChangeEvent, useEffect, useRef, useState } from "react"
import styles from "./BarPlayer.module.css"
import classNames from 'classnames'

import ProgressBar from "../ProgressBar/ProgressBar"
import Volume from "../Volume/Volume"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { IsShuffle, setIsShuffle, setNextTrack, setPrevTrack } from "@/store/features/playListSlice";


export default function BarPlayer() {

    const dispatch = useAppDispatch()

    const currentTrack = useAppSelector((state) => state.playlist.currentTrack);

    //использование useRef для доступа а audio
    const audioRef = useRef<null | HTMLAudioElement>(null)


    const [currentTime, setCurrentTime] = useState<number>(0);
    //состояние для управления воспроизведением
    const [isPlaying, setIsPlaying] = useState<boolean>(false);


    const duration = audioRef.current?.duration;
    //функция для воспроизведения и паузы
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying((prev) => !prev);
        }
    };


    const [isLoop, setIsLoop] = useState<boolean>(false);
    const toggleLoop = () => {
        setIsLoop((prev) => !prev)
    }



    const [volume, setVolume] = useState<number>(0.5);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume])





    useEffect(() => {
        audioRef.current?.addEventListener("timeupdate", () => setCurrentTime(audioRef.current!.currentTime))
    }, [])

    const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            setCurrentTime(Number(event.target.value))
            audioRef.current.currentTime = Number(event.target.value);
        }

    }





    // //NEW

    // const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    //     const handleEnded = () => {
    //         // Проверяем, не является ли текущий трек последним в плейлисте
    //         if (currentTrackIndex < playlist.length - 1) {
    //             // Переход к следующему треку
    //             setCurrentTrackIndex(currentTrackIndex + 1);
    //         } else {
    //             // Или начинаем плейлист с начала
    //             setCurrentTrackIndex(0);
    //         }
    //     };

    //     // Устанавливаем источник аудио и обработчик события `ended` при изменении трека
    //     useEffect(() => {

    //         audio.src = playlist[currentTrackIndex].url;
    //         audio.addEventListener('ended', handleEnded);

    //         // Воспроизводим новый трек
    //         audio.play();

    //         return () => {
    //             audio.removeEventListener('ended', handleEnded);
    //         };
    //     }, [currentTrackIndex, playlist]);

    // //NEW

 
    return (
        <>
            {currentTrack && (
                <div className={styles.bar}>
                    <div className={styles.barContent}>
                        <audio ref={audioRef} src={currentTrack.track_file} loop={isLoop}></audio>

                        <div className={styles.timeBlock}>
                            {/* `${formatDuration([currentTime,0])}/${formatDuration([duration,0])}` */}
                            {/* `${duration(currentTime).format('mm:ss')}/${duration}` */}
                            {Math.floor(currentTime)}/{Math.floor(Number(duration))}
                        </div>

                        <ProgressBar max={duration} value={currentTime} step={0.01} onChange={handleSeek} />

                        <div className={styles.barPlayerBlock}>
                            <div className={styles.barPlayer}>
                                <div className={styles.playerControls}>
                                    <div onClick={()=>dispatch(setPrevTrack())}
                                     className={classNames(styles.playerBtnPrev, styles.btn)}>
                                        <svg className={styles.playerBtnPrevSvg}>
                                            <use xlinkHref="img/icon/sprite.svg#icon-prev" />
                                        </svg>
                                    </div>
                                    <div onClick={togglePlay} className={classNames(styles.playerBtnPlay, styles.btn)}>
                                        <svg className={styles.playerBtnPlaySvg}>
                                            <use xlinkHref={`img/icon/sprite.svg#${isPlaying ? "icon-pause" : "icon-play"}`} />
                                        </svg>
                                    </div>
                                    <div onClick={()=>dispatch(setNextTrack())} 
                                    className={classNames(styles.playerBtnNext, styles.btn)}>
                                        <svg className={styles.playerBtnNextSvg}>
                                            <use xlinkHref="img/icon/sprite.svg#icon-next" />
                                        </svg>
                                    </div>
                                    <div onClick={toggleLoop} className={classNames(styles.playerBtnRepeat, styles.btnIcon)}>
                                        <svg className={styles.playerBtnRepeatSvg}>
                                            <use xlinkHref={`img/icon/sprite.svg#${isLoop ? "icon-repeat-active" : "icon-repeat"}`} />
                                        </svg>
                                    </div>
                                    <div onClick={()=>dispatch(setIsShuffle(false))} className={classNames(styles.playerBtnShuffle, styles.btnIcon)}>
                                        <svg className={styles.playerBtnShuffleSvg}>
                                            <use xlinkHref="img/icon/sprite.svg#icon-shuffle" />
                                            {/* <use xlinkHref={`img/icon/sprite.svg#${IsShuffle ? "icon-shuffle-active" : "icon-shuffle"}`}/> */}
                                        </svg>
                                    </div>
                                </div>
                                <div className={styles.playerTrackPlay}>
                                    <div className={styles.trackPlayContain}>
                                        <div className={styles.trackPlayImage}>
                                            <svg className={styles.trackPlaySvg}>
                                                <use xlinkHref="img/icon/sprite.svg#icon-note" />
                                            </svg>
                                        </div>
                                        <div className={styles.trackPlayAuthor}>
                                            <a className={styles.trackPlayAuthorLink} href="http://">
                                                {currentTrack.author}
                                            </a>
                                        </div>
                                        <div className={styles.trackPlayAlbum}>
                                            <a className={styles.trackPlayAlbumLink} href="http://">
                                                {currentTrack.name}
                                            </a>
                                        </div>
                                    </div>
                                    <div className={styles.trackPlayLikeDis}>
                                        <div className={classNames(styles.trackPlayLike, styles.btnIcon)}>
                                            <svg className={styles.trackPlayLikeSvg}>
                                                <use xlinkHref="img/icon/sprite.svg#icon-like" />
                                            </svg>
                                        </div>
                                        <div className={classNames(styles.trackPlayDislike, styles.btnIcon)}>
                                            <svg className={styles.trackPlayDislikeSvg}>
                                                <use xlinkHref="img/icon/sprite.svg#icon-dislike" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Volume min={0} max={1} value={volume} step={0.01} onChange={(e) => setVolume(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}