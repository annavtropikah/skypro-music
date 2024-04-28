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
        <div className={styles.filterBlock}>
            <div onClick={() => handleFilterClick(title)} className={classNames(styles.filterButton, styles.btnText, {
                [styles.active]:isOpen,
            })}>
                {title}
            </div>
            <div className={styles.filterResultBlock}>
                {isOpen && (
                    <ul className={styles.filterResultUl}>
                        {list.map((item) => (
                            <li className={styles.filterResultLi} key={item}>{item}</li>
                        ))}
                    </ul>

                )}
            </div>
        </div>
        </>
    )
}