"use client"


import Centerblock from "@/components/Centerblock/Centerblock"

import { useAppDispatch, useAppSelector } from "@/hooks";
import { useEffect, useState } from "react";
import { getTracks } from "@/api/track";
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
    }, [dispatch])


    return <Centerblock />
}