import { getPlaylistTracks } from "@/api/tracks"




type CategoryType = {
    params: {
        id: string
    }
}

export default async function CategotyPage({ params }: CategoryType) {
    getPlaylistTracks(params.id)
    return (
        <>
            <div> category {params.id}</div>
        </>
    )
}