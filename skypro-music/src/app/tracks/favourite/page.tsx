"use client"


import Centerblock from "@/components/Centerblock/Centerblock"

import { useAppDispatch, useAppSelector } from "@/components/hooks";
import { useEffect, useState } from "react";
import { getFavoriteTracks, getTracks } from "@/api/tracks";
import { setInitialTracks } from "@/store/features/playListSlice";
import { trackType } from "@/types";

export default function FavouriteTrackspage() {
    const dispatch = useAppDispatch()
    const [tracks, setTracks] = useState<trackType[]>([])
    const filteredTracks = useAppSelector((state) => state.playlist.filteredTracks);
    const [isLoading, setIsLoading] = useState<boolean>(true)


    const  user = useAppSelector((state) => state.playlist.filteredTracks);

    // useEffect(() => {
    //   setIsLoading(true)
      
    //   getFavoriteTracks(token).then((data) => {
    //     setTracks(data)
    //     dispatch(setInitialTracks({ initialTracks: data }))
    //     console.log(data)
    //     setIsLoading(false)
    //   })
  
    // }, [dispatch])


    return <Centerblock tracks={filteredTracks} isLoading={isLoading} />
}