import Track from "@/components/Track/Track";
import { trackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlayListStateType = {
    currentTrack: null | trackType,
    playlist: trackType[],
    shuffledPlaylist: trackType[],
    isShuffle: boolean,
}

//первоначальное состояние
const initialState: PlayListStateType = {
    currentTrack: null,
    playlist: [],
    shuffledPlaylist: [],
    isShuffle: false,
};

const playListSlice = createSlice({
    name: "playList",
    initialState,
    reducers: {
        setCurrentTrack: (state, action: PayloadAction<{ trackData: trackType, tracksData: trackType[] }>) => {
            state.currentTrack = action.payload.trackData;
            state.playlist = action.payload.tracksData;
            state.shuffledPlaylist = [...action.payload.tracksData].sort(() => 0.5 - Math.random())
        },
        //следующий трэк
        setNextTrack: (state) => {
            const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist
            const currentTrackIndex = playlist.findIndex((track) => track.id === state.currentTrack?.id)
            const newTrack = playlist[currentTrackIndex + 1]
            if (newTrack) {
                state.currentTrack = newTrack
            }
        },

        //предидущий трэк
        setPrevTrack: (state) => {
            const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist
            const currentTrackIndex = playlist.findIndex((track) => track.id === state.currentTrack?.id)
            const newTrack = playlist[currentTrackIndex - 1]
            if (newTrack) {
                state.currentTrack = newTrack
            }
        },

        setIsShuffle: (state, action: PayloadAction<boolean>) => {
            state.isShuffle = action.payload
        }
    }
})

export const { setCurrentTrack } = playListSlice.actions;
export const { setNextTrack } = playListSlice.actions;
export const { setPrevTrack } = playListSlice.actions;
export const { setIsShuffle } = playListSlice.actions;





export const playListReducer = playListSlice.reducer;