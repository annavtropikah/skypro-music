type CategoryType = {
    params: {
        id: string
    }
}

export default function CategotyPage({ params }: CategoryType) {
    return (
        <>
            <div> category {params.id}</div>
        </>
    )
}