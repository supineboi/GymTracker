import { useState, useMemo } from 'react'
import styles from './ExerciseCard.module.css'
import ExerciseHeader from './ExerciseHeader/ExerciseHeader'
import ExerciseDetails from './ExerciseDetails/ExerciseDetails'
import { convertExercise } from '../../utils/unitConverter'

const ExerciseCard = ({ entry, currentUnit = 'kg' }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    const today = new Date(entry.dateOfExercise)
    const workoutDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    const dayOfWeek = today.toLocaleDateString('en-US', {
        weekday: 'long'
    })
    const totalExercises = 3
    const timeSpent = "45 minutes"

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

