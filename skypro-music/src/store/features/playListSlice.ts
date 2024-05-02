
import { trackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlayListStateType = {
    currentTrack: null | trackType,
    playlist: trackType[],
    shuffledPlaylist: trackType[],
    isShuffle: boolean,
    isPlaying: boolean,
    isEnd: boolean,
    filretOptions: {
        author: string[],
        searchValue: string,

    },
    filteredTracks: trackType[],
    initialTracks: trackType[],
}

//первоначальное состояние
const initialState: PlayListStateType = {
    currentTrack: null,
    playlist: [],
    shuffledPlaylist: [],
    isShuffle: false,
    isPlaying: false,
    isEnd: false,
    filretOptions: {
        author: [],
        searchValue: "",

    },
    filteredTracks: [],
    initialTracks: [],
};

const playListSlice = createSlice({
    name: "playList",
    initialState,
    reducers: {
        setInitialTracks: (state, action: PayloadAction<{ initialTracks: trackType[] }>) => {
            state.initialTracks = action.payload.initialTracks
            state.filteredTracks=action.payload.initialTracks
        },
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
        },

        setIsTrackPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload
        },
        setIsTrackEnd: (state, action: PayloadAction<boolean>) => {
            state.isEnd = action.payload
        },
        setFilters: (state, action: PayloadAction<{ author?: string[], searchValue?: string }>) => {
            state.filretOptions = {
                author: action.payload.author || state.filretOptions.author,
                searchValue: action.payload.searchValue || state.filretOptions.searchValue,
            }
            state.filteredTracks = state.initialTracks.filter((track) => {
                const hasAuthors = state.filretOptions.author.length !== 0
                const isAuthors = hasAuthors ? state.filretOptions.author.includes(track.author) : true
                const hasSearchValue=track.name.toLowerCase().includes(state.filretOptions.searchValue.toLowerCase())
                return isAuthors && hasSearchValue
            })
        }
    }
})

export const { setCurrentTrack } = playListSlice.actions;
export const { setNextTrack } = playListSlice.actions;
export const { setPrevTrack } = playListSlice.actions;
export const { setIsShuffle } = playListSlice.actions;
export const { setIsTrackPlaying } = playListSlice.actions;
export const { setIsTrackEnd } = playListSlice.actions;
export const { setFilters } = playListSlice.actions;
export const { setInitialTracks } = playListSlice.actions;







export const playListReducer = playListSlice.reducer;
