import { useReducer, useState, useEffect } from 'react'
import Portal from '../../Portal/Portal'
import styles from './AddExerciseModal.module.css'
import styles2 from "../../UI/FormInput.module.css";
import { formattedDate } from '../../../utils/unitConverter'
import FormInput from '../../UI/FormInput'
import { arrow, cross } from '../../../utils/emojis';
import { nanoid } from "nanoid";
import AppLogo from '../../AppLogo/AppLogo';

const initialEntry = {
    unit: "kg",
    timeTaken: "",
    exercises: [
        {
            id: nanoid(),
            name: "",
            sets: "",
            reps: "",
            highestWeight: "",
            lowestWeight: "",
            isOpen: true,
            invalidFields: []
        }
    ]
};

function entryReducer(state, action) {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };

        case "UPDATE_EXERCISE":
            return {
                ...state,
                exercises: state.exercises.map((ex, i) =>
                    i === action.index ? { ...ex, [action.field]: action.value } : ex
                )
            };

        case "ADD_EXERCISE":
            const newExercises = [
                ...state.exercises.map(e => ({
                    ...e,
                    isOpen: false
                })),
                {
                    id: nanoid(),
                    name: "",
                    sets: "",
                    reps: "",
                    highestWeight: "",
                    lowestWeight: "",
                    isOpen: true
                }
            ];
            return {
                ...state,
                exercises: newExercises
            };

        case "DELETE_EXERCISE":
            return {
                ...state,
                exercises: state.exercises.filter((ex) => ex.id !== action.id)
            };

        case "TOGGLE_EXERCISE_OPEN":
            return {
                ...state,
                exercises: state.exercises.map((ex) => {
                    if (ex.id === action.id) {
                        return { ...ex, isOpen: !ex.isOpen };
                    }

                    return { ...ex };
                })
            };

        case "RESET":
            return { ...initialEntry };

        default:
            return state;
    }
}

const AddExerciseModal = ({ isOpen, onClose, currentUnit, onAddExercise }) => {
    const {
        workoutDate,
        dayOfWeek
    } = formattedDate();

    const [isFromValid, setIsFormValid] = useState(true);
    const [entryState, dispatchEntry] = useReducer(entryReducer, initialEntry);

    useEffect(() => {
        dispatchEntry({
            type: 'SET_FIELD',
            field: 'unit',
            value: currentUnit
        })
    }, [currentUnit])

    const updateEntry = (field, value, index) => {
        const parts = field.split('.');
        const isNested = parts.length > 1;

        dispatchEntry({
            type: isNested ? 'UPDATE_EXERCISE' : 'SET_FIELD',
            field: isNested ? parts[1] : parts[0],
            value,
            ...(isNested && { index })
        });
    };

    const validateForm = () => {
        return entryState.exercises.some(e => {
            return Object.values(e).some(v => !v)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        onAddExercise(entryState);
        onClose();
    };

    if (!isOpen) return null;

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
                        <div className={styles.staticFields}>
                            {/* DATE */}
                            <div className={styles2.formGroup}>
                                <label>Today's Date</label>
                                <div className={styles.readOnlyBox}>
                                    {workoutDate} - {dayOfWeek}
                                </div>
                            </div>

                            {/* UNIT AND TIME SPENT */}
                            <div className={styles.formRow}>
                                <div className={styles2.formGroup}>
                                    <label htmlFor="unit">Unit</label>
                                    <select
                                        id="unit"
                                        className={styles.selectInput}
                                        value={entryState.unit}
                                        onChange={(e) => updateEntry("unit", e.target.value)}
                                    >
                                        <option value="kg">kg</option>
                                        <option value="lbs">lbs</option>
                                    </select>
                                </div>
                                <FormInput
                                    label="Time Spent (in Mins)"
                                    type="text"
                                    id="timeSpent"
                                    value={entryState.timeTaken}
                                    onChange={(val) => updateEntry("timeTaken", val)}
                                    placeholder="e.g., 45 or 120"
                                    allowedType='int'
                                    required
                                />
                            </div>
                        </div>

                        <div className={`${styles.exerciseList} ${entryState.exercises.length === 0 ? styles.noScroll : ''}`}>
                            {
                                entryState.exercises.length === 0 ? (
                                    <div className={styles.emptyState}>
                                        <div className={styles.emptyStateIcon}>
                                            <AppLogo/>
                                        </div>
                                        <div className={styles.emptyStateText}>
                                            Let's Get Moving!
                                        </div>
                                        <div className={styles.emptyStateSubtext}>
                                            Add an exercise to start tracking your gains!
                                        </div>
                                    </div>
                                ) : (
                                    entryState.exercises.map((exercise, idx) => {
                                        return (
                                            <div key={exercise.id}>
                                                <div className={styles.excerciseAccordian}>
                                                    <div>
                                                        {exercise.name || `Exercise ${idx + 1}`}
                                                    </div>
                                                    <div>
                                                        <div
                                                            className={`emojis ${exercise.isOpen ? 'arrowOpen' : ''}`}
                                                            style={{ color: 'white' }}
                                                            onClick={() => dispatchEntry({
                                                                type: 'TOGGLE_EXERCISE_OPEN',
                                                                id: exercise.id
                                                            })}
                                                        >
                                                            {arrow}
                                                        </div>
                                                        <div
                                                            className='emojis'
                                                            style={{ color: 'white' }}
                                                            onClick={() => dispatchEntry({
                                                                type: 'DELETE_EXERCISE',
                                                                id: exercise.id
                                                            })}
                                                        >
                                                            {cross}
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    exercise.isOpen ? (
                                                        <div className={styles.exerciseBox}>
                                                            {/* EXERCISE NAME */}
                                                            <FormInput
                                                                id={`exerciseName-${idx}`}
                                                                type="text"
                                                                classes={styles.fullInput}
                                                                value={exercise.name}
                                                                onChange={(val) => updateEntry("exercises.name", val, idx)}
                                                                label="Exercise Name"
                                                                placeholder={`Exercise - ${idx + 1}`}
                                                                allowedType='text'
                                                                limitRange={[3, 40]}
                                                                required
                                                            />

                                                            {/* SETS + REPS */}
                                                            <div className={styles.formRow}>
                                                                <FormInput
                                                                    label="Sets"
                                                                    type="text"
                                                                    id={`sets-${idx}`}
                                                                    value={exercise.sets}
                                                                    allowedType='int'
                                                                    limitRange={[1, 10]}
                                                                    onChange={(val) => updateEntry("exercises.sets", val, idx)}
                                                                    placeholder="3"
                                                                    required
                                                                />
                                                                <FormInput
                                                                    label="Reps"
                                                                    type="text"
                                                                    id={`reps-${idx}`}
                                                                    value={exercise.reps}
                                                                    allowedType='int'
                                                                    limitRange={[1, 30]}
                                                                    onChange={(val) => updateEntry("exercises.reps", val, idx)}
                                                                    placeholder="10"
                                                                    required
                                                                />
                                                            </div>

                                                            {/* WEIGHTS */}
                                                            <div className={styles.formRow}>
                                                                <FormInput
                                                                    label={`Highest Weight (${entryState.unit})`}
                                                                    type="text"
                                                                    id={`highestWeight-${idx}`}
                                                                    value={exercise.highestWeight}
                                                                    onChange={(val) => updateEntry("exercises.highestWeight", val, idx)}
                                                                    placeholder="80"
                                                                    allowedType='float'
                                                                    limitRange={[1, 999]}
                                                                    required
                                                                />
                                                                <FormInput
                                                                    label={`Lowest Weight  (${entryState.unit})`}
                                                                    type="text"
                                                                    id={`lowestWeight-${idx}`}
                                                                    value={exercise.lowestWeight}
                                                                    allowedType='float'
                                                                    limitRange={[1, 999]}
                                                                    onChange={(val) => updateEntry("exercises.lowestWeight", val, idx)}
                                                                    placeholder="60"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : null
                                                }
                                            </div>
                                        );
                                    })
                                )
                            }
                        </div>

                        <div className={styles.addExerciseRow}>
                            {!isFromValid ? <p className={styles.formError}>
                                {`Please complete the current exercise${entryState.exercises.length > 1 ?
                                    's' : ''
                                    } before adding another.`}
                            </p> : null}
                            <button
                                type="button"
                                className={`${styles.addExerciseButton}
                                     ${!isFromValid ? 'not-allowed' : ''}
                                `}
                                onClick={() => {
                                    if (validateForm()) {
                                        setIsFormValid(true);
                                        dispatchEntry({
                                            type: 'ADD_EXERCISE'
                                        });
                                    } else {
                                        setIsFormValid(false);
                                    }
                                }}
                                disabled={!isFromValid}
                            >
                                + Add Exercise
                            </button>
                        </div>

                        {/* BUTTONS */}
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
                                Done
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Portal>
    )
}

export default AddExerciseModal
