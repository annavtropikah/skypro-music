
import { trackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlayListStateType = {
    currentTrack: null | trackType,
    currentTrackIndex: null | number,
    playlist: trackType[],
    shuffledPlaylist: trackType[],
    isShuffle: boolean,
    isPlaying: boolean,
    isEnd: boolean,
    filretOptions: {
        author: string[],
        genre: string[],
        order: string,


        searchValue: string,

    },
    filteredTracks: trackType[],
    initialTracks: trackType[],
}

//первоначальное состояние
const initialState: PlayListStateType = {
    currentTrack: null,
    currentTrackIndex: null,
    playlist: [],
    shuffledPlaylist: [],
    isShuffle: false,
    isPlaying: false,
    isEnd: false,
    filretOptions: {
        author: [],
        genre: [],
        order: "по умолчанию",

        searchValue: "",

    },
    filteredTracks: [], // трэки по выбранному фильтру
    initialTracks: [], // все трэки
};

const playListSlice = createSlice({
    name: "playList",
    initialState,
    reducers: {
        setInitialTracks: (state, action: PayloadAction<{ initialTracks: trackType[] }>) => {
            state.initialTracks = action.payload.initialTracks
            state.filteredTracks = action.payload.initialTracks
            state.playlist = action.payload.initialTracks
        },
        setCurrentTrack: (state, action: PayloadAction<{ trackData: trackType, tracksData: trackType[] }>) => {
            state.currentTrack = action.payload.trackData;
            const currentTrackIndex = state.playlist.findIndex((track) => track.id === action.payload.trackData?.id)

            console.log('setCurrentTrack index', currentTrackIndex)
            state.currentTrackIndex = currentTrackIndex
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
                state.currentTrackIndex = currentTrackIndex
            }
        },

        //предидущий трэк
        setPrevTrack: (state) => {
            const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist
            const currentTrackIndex = playlist.findIndex((track) => track.id === state.currentTrack?.id)
            const newTrack = playlist[currentTrackIndex - 1]
            if (newTrack) {
                state.currentTrack = newTrack
                state.currentTrackIndex = currentTrackIndex
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
        setCurrentTrackIndex: (state, action: PayloadAction<number>) => {
            state.currentTrackIndex = action.payload;
            state.currentTrack = state.playlist[action.payload];
        },
        setFilters: (state, action: PayloadAction<{ author?: string[], genre?: string[], order?: string, searchValue?: string }>) => {
            state.filretOptions = {
                author: action.payload.author || state.filretOptions.author,
                genre: action.payload.genre || state.filretOptions.genre,
                order: action.payload.order || state.filretOptions.order,


                searchValue: typeof action.payload.searchValue === "string"
                    ? action.payload.searchValue : state.filretOptions.searchValue,
            }

            const filteredArr = state.initialTracks.filter((track) => {
                const hasAuthors = state.filretOptions.author.length !== 0
                const isAuthors = hasAuthors ? state.filretOptions.author.includes(track.author) : true
                const hasGenres = state.filretOptions.genre.length !== 0
                const isGenre = hasGenres ? state.filretOptions.genre.includes(track.genre) : true

                const hasSearchValue = 
                track.name.toLowerCase().includes(state.filretOptions.searchValue.toLowerCase()) || 
                track.author.toLowerCase().includes(state.filretOptions.searchValue.toLowerCase())
                return isAuthors && isGenre && hasSearchValue
            })

            switch (state.filretOptions.order) {
                case "сначала новые":
                  filteredArr.sort(
                    (a, b) =>
                      new Date(b.release_date).getTime() -
                      new Date(a.release_date).getTime()
                  );
                  break;
                case "сначала старые":
                  filteredArr.sort(
                    (a, b) =>
                      new Date(a.release_date).getTime() -
                      new Date(b.release_date).getTime()
                  );
                  break;
                default:
                  filteredArr;
                  break;
              }
              state.filteredTracks = filteredArr;
            },
          },
        });

        export const { setCurrentTrack } = playListSlice.actions;
        export const { setNextTrack } = playListSlice.actions;
        export const { setPrevTrack } = playListSlice.actions;
        export const { setIsShuffle } = playListSlice.actions;

        export const { setIsTrackPlaying } = playListSlice.actions;
        export const { setIsTrackEnd } = playListSlice.actions;
        export const { setFilters } = playListSlice.actions;
        export const { setInitialTracks } = playListSlice.actions;
        export const { setCurrentTrackIndex } = playListSlice.actions;








        export const playListReducer = playListSlice.reducer;
