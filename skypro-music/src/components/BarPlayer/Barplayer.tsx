'use client'
import {ChangeEvent, useCallback, useEffect, useRef, useState} from "react"
import styles from "./BarPlayer.module.css"
import classNames from 'classnames'

import ProgressBar from "../ProgressBar/ProgressBar"
import Volume from "../Volume/Volume"
import { useAppDispatch, useAppSelector } from "@/hooks"

import { setIsShuffle, setNextTrack, setPrevTrack, setIsTrackPlaying, setCurrentTrackIndex } from "@/store/features/playListSlice";
import { formatSecondsToMMSS} from "@/utils";


export default function BarPlayer() {

    const dispatch = useAppDispatch()

    const currentTrack = useAppSelector((state) => state.playlist.currentTrack);

    const currentTrackIndex = useAppSelector((state) => state.playlist.currentTrackIndex);
    const isShuffle = useAppSelector((state) => state.playlist.isShuffle);
    const isTrackPlaying = useAppSelector((state) => state.playlist.isPlaying);


    const isEnd= useAppSelector((state) => state.playlist.isEnd);
    const playlist = useAppSelector((state)=> state.playlist.playlist)

    // использование useRef для доступа а audio
    const audioRef = useRef<null | HTMLAudioElement>(null)

    const [currentTime, setCurrentTime] = useState(0);

    const duration = audioRef.current?.duration;
    //функция для воспроизведения и паузы
    const togglePlay = () => {
        if (audioRef.current) {
            if (isTrackPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            dispatch(setIsTrackPlaying(!isTrackPlaying));
        }
    };
//обернула диспатчи соответствующих функций в функции hendle
    const handleNextTrack = () => {
        dispatch(setNextTrack());
    }
//обернула диспатчи соответствующих функций в функции hendle
    const handlePrevTrack = () => {
        dispatch(setPrevTrack());
    }

    const [isLoop, setIsLoop] = useState<boolean>(false);
    const toggleLoop = () => {
        setIsLoop((prev) => !prev)
    }

    const [volume, setVolume] = useState<number>(0.1);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume])


    useEffect(() => {
        audioRef.current?.addEventListener("timeupdate", () => {
            if (audioRef.current?.currentTime) {
                setCurrentTime(audioRef.current?.currentTime)
            }
        })
    }, [audioRef.current?.currentTime, currentTrack?.id])


    const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            setCurrentTime(Number(event.target.value))
            audioRef.current.currentTime = Number(event.target.value);
        }
    }

    //чтобы плэй срабатывал при плике на трэк
    useEffect(() => {
        if (isTrackPlaying) {
            audioRef.current?.play();
        }
    }, [currentTrack?.id, isTrackPlaying])

    //обнуление currenttime (value) чтобы прогресс бар обнулялся при клике на трек
    useEffect(() => {
        setCurrentTime(0);
    }, [currentTrack?.id])

    const handleEnded = useCallback(() => {
        if (currentTrackIndex || currentTrackIndex === 0) {
            // Проверяем, не является ли текущий трек последним в плейлисте
            if (currentTrackIndex < playlist.length - 1) {
                // Переход к следующему треку
                dispatch(setCurrentTrackIndex(currentTrackIndex + 1));
            } else {
                // Или начинаем плейлист с начала
                dispatch(setCurrentTrackIndex(0));
            }
        }
    }, [currentTrackIndex, playlist, dispatch]);

    //     // Устанавливаем источник аудио и обработчик события `ended` при изменении трека
        useEffect(() => {
            audioRef.current?.addEventListener("ended", handleEnded)

            return () => {
                audioRef.current?.removeEventListener('ended', handleEnded);
            };
        }, [currentTrackIndex, handleEnded]);

    // //NEW

    return (
        <>
            {currentTrack && (
                <div className={styles.bar}>
                    <div className={styles.barContent}>
                        {/* добавила id для аудио для обращения к этому элементу в другом компоненте */}
                        <audio id="audio-id" ref={audioRef} src={currentTrack.track_file} loop={isLoop}></audio>

                        {duration && (
                            <div className={styles.timeBlock}>
                                {/* `${formatDuration([currentTime,0])}/${formatDuration([duration,0])}` */}
                                {/* `${duration(currentTime).format('mm:ss')}/${duration}` */}
                                {formatSecondsToMMSS(currentTime)}/{formatSecondsToMMSS(Number(duration))}
                            </div>
                        )}

                        <ProgressBar max={duration} value={currentTime} step={0.01} onChange={handleSeek} />

                        <div className={styles.barPlayerBlock}>
                            <div className={styles.barPlayer}>
                                <div className={styles.playerControls}>
                                    <div onClick={handlePrevTrack}
                                     className={classNames(styles.playerBtnPrev, styles.btn)}>
                                        <svg className={styles.playerBtnPrevSvg}>
                                            <use xlinkHref="img/icon/sprite.svg#icon-prev" />
                                        </svg>
                                    </div>
                                    <div onClick={togglePlay} className={classNames(styles.playerBtnPlay, styles.btn)}>
                                        <svg className={styles.playerBtnPlaySvg}>
                                            <use xlinkHref={`img/icon/sprite.svg#${isTrackPlaying ? "icon-pause" : "icon-play"}`} />
                                        </svg>
                                    </div>
                                    <div onClick={handleNextTrack}
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

                                    <div onClick={()=> dispatch(setIsShuffle(!isShuffle))} className={classNames(styles.playerBtnShuffle, styles.btnIcon)}>
                                        <svg className={styles.playerBtnShuffleSvg}>
                                            {/*<use xlinkHref="img/icon/sprite.svg#icon-shuffle" />*/}

                                            <use xlinkHref={`img/icon/sprite.svg#${isShuffle ? "icon-shuffle-active" : "icon-shuffle"}`}/>
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
