import { arrow } from '../../../utils/emojis'
import styles from './ExerciseHeader.module.css'

const ExerciseHeader = ({ workoutDate, dayOfWeek, totalExercises, timeSpent, isOpen, onToggle }) => {
    return (
        <div 
            className={`${styles.cardHeader} ${isOpen ? styles.open : ''}`}
            onClick={onToggle}
        >
            <div className={styles.headerContent}>
                <div className={styles.dateSection}>
                    <span className={styles.dateIcon}>📅</span>
                    <div>
                        <div className={styles.date}>{workoutDate}</div>
                        <div className={styles.day}>{dayOfWeek}</div>
                    </div>
                </div>
                <div className={styles.statsSection}>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Total Exercises</span>
                        <span className={styles.statNumber}>{totalExercises}</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Time at Gym</span>
                        <span className={styles.statNumber}>{timeSpent}</span>
                    </div>
                </div>
            </div>
            <div className={`emojis ${isOpen ? 'arrowOpen' : ''}`}>
                {arrow}
            </div>
        </div>
    )
}

export default ExerciseHeader

