import classNames from "classnames"
import styles from "./FilterItem.module.css"
import { trackType } from "@/types"
import { order } from "../data"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { setFilters } from "@/store/features/playListSlice"

type FilterItemType = {
    title: string,
    value: "author" | "genre" | "order",
    handleFilterClick: (newFilter: string) => void,
    isOpen: boolean,
    tracksData: trackType[],
}



export default function FilterItem({ handleFilterClick, title, value, isOpen, tracksData }: FilterItemType) {
    const getFilterList = () => {
        if (value !== "order") {
            const array = new Set(tracksData?.map((track: trackType) => track[value]) || [])
            return Array.from(array)
        }

        return order
    }

    //filter author only
    const authorsList = useAppSelector((state) => state.playlist.filretOptions.author) 
    const dispatch = useAppDispatch()
    const toggleFilter = (item: string) => {
        dispatch(setFilters({ 
            author: authorsList.includes(item) ? authorsList.filter(el => el !== item) : [...authorsList,item]  }))
    }

    getFilterList()
    return (
        <>
            <div className={styles.filterBlock}>
                <div onClick={() => handleFilterClick(title)} className={classNames(styles.filterButton, styles.btnText, {
                    [styles.active]: isOpen,
                })}>
                    {title}
                </div>
                <div className={styles.filterResultBlock}>
                    {isOpen && (
                        <ul className={styles.filterResultUl}>
                            {getFilterList().map((item) => (
                                <li onClick={() => toggleFilter(item)} className={styles.filterResultLi} key={item}>{item}</li>
                            ))}
                        </ul>

                    )}
                </div>
            </div>
        </>
    )
}