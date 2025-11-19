import { useState, useMemo } from 'react'
import styles from './ExerciseCard.module.css'
import ExerciseHeader from './ExerciseHeader/ExerciseHeader'
import ExerciseDetails from './ExerciseDetails/ExerciseDetails'
import { convertExercise, formattedDate } from '../../utils/unitConverter'

const ExerciseCard = ({ entry, currentUnit = 'kg' }) => {
    const [isOpen, setIsOpen] = useState(false)
    const {
        workoutDate, 
        dayOfWeek
    } = formattedDate(entry.dateOfExercise);

    const exercises = useMemo(() => {
        return convertExercise(entry.exercises, currentUnit)
    }, [currentUnit, entry.exercises])
    
    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }
    
    return (
        <div className={styles.card}>
            <ExerciseHeader 
                workoutDate={workoutDate}
                dayOfWeek={dayOfWeek}
                totalExercises={entry.exercises.length}
                timeSpent={entry.timeTaken}
                isOpen={isOpen}
                onToggle={toggleAccordion}
            />
            
            {isOpen && (
                <ExerciseDetails exercises={exercises} />
            )}
        </div>
    )
}

export default ExerciseCard

