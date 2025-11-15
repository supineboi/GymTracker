import { useState } from 'react'
import Portal from '../../Portal/Portal'
import styles from './AddExerciseModal.module.css'

const AddExerciseModal = ({ isOpen, onClose, onAddExercise }) => {
    const [exerciseName, setExerciseName] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [highestWeight, setHighestWeight] = useState('')
    const [lowestWeight, setLowestWeight] = useState('')
    const [unit, setUnit] = useState('kg')

    const handleSubmit = (e) => {
        e.preventDefault()

        const newExercise = {
            name: exerciseName,
            sets: parseInt(sets) || 0,
            reps: parseInt(reps) || 0,
            highestWeight: parseFloat(highestWeight) || 0,
            lowestWeight: parseFloat(lowestWeight) || 0,
            unit: unit
        }

        onAddExercise(newExercise)

        setExerciseName('')
        setSets('')
        setReps('')
        setHighestWeight('')
        setLowestWeight('')
        setUnit('kg')

        onClose()
    }

    if (!isOpen) return null

    return (
        <Portal>
            <div className={styles.backdrop} onClick={onClose}>
                <div 
                    className={styles.modal} 
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.modalHeader}>
                        <h2>➕ Add New Exercise</h2>
                        <button 
                            className={styles.closeButton}
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="exerciseName">Exercise Name</label>
                            <input
                                type="text"
                                id="exerciseName"
                                value={exerciseName}
                                onChange={(e) => setExerciseName(e.target.value)}
                                placeholder="e.g., Bench Press"
                                required
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="sets">Sets</label>
                                <input
                                    type="number"
                                    id="sets"
                                    value={sets}
                                    onChange={(e) => setSets(e.target.value)}
                                    placeholder="3"
                                    min="1"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="reps">Reps</label>
                                <input
                                    type="number"
                                    id="reps"
                                    value={reps}
                                    onChange={(e) => setReps(e.target.value)}
                                    placeholder="10"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="highestWeight">Highest Weight</label>
                                <input
                                    type="number"
                                    id="highestWeight"
                                    value={highestWeight}
                                    onChange={(e) => setHighestWeight(e.target.value)}
                                    placeholder="80"
                                    min="0"
                                    step="0.5"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="lowestWeight">Lowest Weight</label>
                                <input
                                    type="number"
                                    id="lowestWeight"
                                    value={lowestWeight}
                                    onChange={(e) => setLowestWeight(e.target.value)}
                                    placeholder="60"
                                    min="0"
                                    step="0.5"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="unit">Unit</label>
                            <select
                                id="unit"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                            >
                                <option value="kg">kg</option>
                                <option value="lbs">lbs</option>
                            </select>
                        </div>

                        <div className={styles.formActions}>
                            <button 
                                type="button" 
                                className={styles.cancelButton}
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className={styles.submitButton}
                            >
                                Add Exercise
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Portal>
    )
}

export default AddExerciseModal

