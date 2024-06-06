"use client"


import Centerblock from "@/components/Centerblock/Centerblock"

import { useAppDispatch, useAppSelector } from "@/components/hooks";
import { useEffect, useState } from "react";
import { getFavoriteTracks, getTracks, refreshToken } from "@/api/tracks";
import { setInitialTracks, setLikedTracks } from "@/store/features/playListSlice";
import { trackType } from "@/types";
import styles from "./layout.module.css";

export default function FavouriteTrackspage() {
    const dispatch = useAppDispatch()
   

//     const [tracks, setTracks] = useState<trackType[]>([]);

   
//     const  token = useAppSelector((state) => state.user.tokens.access);

const likedTracks = useAppSelector((state) => state.playlist.likedTrackes);
    
// useEffect(() => {
    
      
//       getFavoriteTracks(token).then((data) => {
//         setTracks(data)
//         dispatch(setLikedTracks({ likedTracks: data }))
//         console.log(data)
//         .catch((error) => {
//             if (error.message === "401") {
//               refreshToken(token).then((data) => {
//                 getFavoriteTracks(data).then((newData) => {
//                   setTracks(newData);
//                 });
//               });
//             } else {
//               alert("Пожалуйста авторизуйтесь");
//               //нужно на страницу авторизации чтоб перекидывало
//             }
        
//       })
  
//     }, [dispatch])


    return (
        <>
        <h2 className={styles.centerblockH2}>Любимые треки</h2>
      
      <Centerblock tracks={likedTracks} isLoading={false} />
      </>)
}
