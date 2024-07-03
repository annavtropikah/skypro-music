"use client"


import Centerblock from "@/components/Centerblock/Centerblock"

import { useAppDispatch, useAppSelector } from "@/components/hooks";
import { useEffect, useState } from "react";
import { getTracks } from "@/api/tracks";
import { setInitialTracks } from "@/store/features/playListSlice";

import styles from "./layout.module.css";
import Filters from "@/components/Filters/Filters";

export default function MainTrackspage() {
    const dispatch = useAppDispatch()
    const filteredTracks = useAppSelector((state) => state.playlist.filteredTracks);
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
      setIsLoading(true)
      getTracks().then((data) => {
        dispatch(setInitialTracks({ initialTracks: data }))
        console.log(data)
        setIsLoading(false)
      })
    }, [dispatch])


    return (
      <>
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filters />
    <Centerblock tracks={filteredTracks} isLoading={isLoading} />
    </>)
}
