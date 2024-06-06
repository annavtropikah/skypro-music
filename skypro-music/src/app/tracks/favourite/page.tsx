"use client"

import { useRouter } from 'next/navigation';

import Centerblock from "@/components/Centerblock/Centerblock"

import { useAppDispatch, useAppSelector } from "@/components/hooks";
import { useEffect, useState } from "react";
import { getFavoriteTracks, getTracks, refreshToken } from "@/api/tracks";
import { setInitialTracks, setLikedTracks } from "@/store/features/playListSlice";
import styles from "../layout.module.css";
import {DEFAULT_USER, setToken, setUser} from "@/store/features/userSlice";

export default function FavouriteTrackspage() {
    const dispatch = useAppDispatch()
    const router = useRouter();
    const tokens = useAppSelector((state) => state.user.tokens);
    const userId = useAppSelector((state) => state.user.user.id);
    const likedTracks = useAppSelector((state) => state.playlist.likedTrackes);

    useEffect(() => {
        getFavoriteTracks(tokens.access).then((data) => {
            dispatch(setLikedTracks({ likedTracks: data }))
        }).catch((error) => {
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
                    //  TODO: navigate на логин или на общий плейлист
                })
            }
        })
    }, [dispatch])

    if (!userId) {
        router.push('/signin');
    }

    return (
        <>
        <h2 className={styles.centerblockH2}>Любимые треки</h2>

        <Centerblock tracks={likedTracks} isLoading={false} />
      </>
    )
}
