import { useState } from "react";
import ActionBar from "../ActionBar/ActionBar";
import AddExerciseModal from "../ExerciseCard/ExerciseAdd/AddExerciseModal";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import { DUMMY_ENTRIES } from "../../data/dummy-entries";

const Main = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentUnit, setCurrentUnit] = useState('kg')

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleToggleUnit = (unit) => {
        setCurrentUnit(unit)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleAddExercise = (newExercise) => {
        console.log('New exercise added:', newExercise)
    }

    return <>
        <ActionBar
            onAddExercise={handleOpenModal}
            currentUnit={currentUnit}
            onToggleUnit={handleToggleUnit}
        />
        {
            DUMMY_ENTRIES.map(entry => (
                <ExerciseCard entry={entry} currentUnit={currentUnit} />
            ))
        }
        <AddExerciseModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAddExercise={handleAddExercise}
            currentUnit={currentUnit}
        />
    </>
}

export default Main;