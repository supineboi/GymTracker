import styles from './ExerciseDetails.module.css'

const ExerciseDetails = ({ exercises }) => {
    return (
        <div className={styles.exercisesSection}>
            <ul className={styles.exercisesList}>
                {exercises.map((exercise, index) => (
                    <li key={index} className={styles.exerciseItem}>
                        <div className={styles.exerciseHeader}>
                            <span className={styles.exerciseName}>{exercise.name}</span>
                        </div>
                        <div className={styles.exerciseDetails}>
                            <div className={styles.detail}>
                                <span className={styles.detailLabel}>Sets:</span>
                                <span className={styles.detailValue}>{exercise.sets}</span>
                            </div>
                            <div className={styles.detail}>
                                <span className={styles.detailLabel}>Reps:</span>
                                <span className={styles.detailValue}>{exercise.reps}</span>
                            </div>
                            <div className={styles.detail}>
                                <span className={styles.detailLabel}>Highest Weight:</span>
                                <span className={styles.detailValue}>{exercise.highestWeight} {exercise.unit}</span>
                            </div>
                            <div className={styles.detail}>
                                <span className={styles.detailLabel}>Lowest Weight:</span>
                                <span className={styles.detailValue}>{exercise.lowestWeight} {exercise.unit}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ExerciseDetails

