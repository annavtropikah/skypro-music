import classNames from "classnames"
import styles from "./FilterItem.module.css"

type FilterItemType = {
    title: string,
    list: string[],
    handleFilterClick: (newFilter: string) => void,
    isOpen: boolean,
}

export default function FilterItem({ handleFilterClick, title, list, isOpen }: FilterItemType) {
    return (
        <>
            <div onClick={() => handleFilterClick(title)} className={classNames(styles.filterButton, styles.btnText)}>
                {title}
            </div>
            {isOpen && (
                <ul>
                    {list.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

            )}

        </>
    )
}