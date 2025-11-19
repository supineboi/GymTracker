import { formattedDate } from '../../utils/unitConverter'
import styles from './Summary.module.css'

const Summary = () => {
    const {
        workoutDate,
        dayOfWeek
    } = formattedDate()

    return (
        <div className={styles.summaryContainer}>
            <h2 className={styles.title}>📊 Your Progress Summary</h2>
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>🔥</div>
                    <div className={styles.statLabel}>Days Streak</div>
                    <div className={styles.statValue}>10</div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>⏱️</div>
                    <div className={styles.statLabel}>Total Time at Gym</div>
                    <div className={styles.statValue}>100 min</div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📅</div>
                    <div className={styles.statLabel}>Total Days</div>
                    <div className={styles.statValue}>10</div>
                </div>
                
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>🎯</div>
                    <div className={styles.statLabel}>Start Date</div>
                    <div className={`${styles.statValue} ${styles.startValueDate}`}>{workoutDate}</div>
                    <div className={`${styles.statValue} ${styles.startValueDate}`}>{dayOfWeek}</div>
                </div>
            </div>
        </div>
    )
}

export default Summary

