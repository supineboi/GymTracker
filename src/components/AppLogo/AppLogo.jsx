import styles from './AppLogo.module.css'

const AppLogo = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <span className={styles.t1}>T</span>
                <span className={styles.t2}>T</span>
                <span className={styles.f}>F</span>
            </div>
        </div>
    )
}

export default AppLogo;