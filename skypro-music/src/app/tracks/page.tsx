"use client"


import Centerblock from "@/components/Centerblock/Centerblock"

import { useAppDispatch, useAppSelector } from "@/components/hooks";
import { useEffect, useState } from "react";
import { getTracks } from "@/api/tracks";
import { setInitialTracks } from "@/store/features/playListSlice";
import { trackType } from "@/types";

export default function MainTrackspage() {
    const dispatch = useAppDispatch()
    const [tracks, setTracks] = useState<trackType[]>([])
    const filteredTracks = useAppSelector((state) => state.playlist.filteredTracks);

    useEffect(() => {
        getTracks().then((data) => {
            setTracks(data)
            dispatch(setInitialTracks({ initialTracks: data }))
        })
            .catch((error: any) => {
                throw new Error(error.message)
            })
    }, [dispatch])


    return <Centerblock tracks={filteredTracks} />
}