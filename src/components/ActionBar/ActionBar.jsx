import { useState } from 'react';
import styles from './ActionBar.module.css'

const ActionBar = ({ onAddExercise, currentUnit, onToggleUnit }) => {
    return (
        <div className={styles.actionBar}>
            <div className={styles.toggler}>
                <div 
                    onClick={() => onToggleUnit("kg")} 
                    className={
                        currentUnit === "kg" ? styles.togglerActiveBtn : styles.togglerInactiveBtn
                    }>kg
                </div>
                <div className={`${styles.togglerRotater} ${
                    currentUnit === "kg" 
                    ? styles.togglerRotaterLeft
                    : styles.togglerRotaterRight
                }`}>🏋</div>
                <div 
                    onClick={() => onToggleUnit("lbs")}
                     className={
                        currentUnit === "lbs" ? styles.togglerActiveBtn : styles.togglerInactiveBtn
                     }>lbs
                    </div>
            </div>
            <div 
                className={styles.addButton}
                onClick={onAddExercise}
            >
                ➕ Add Exercise
            </div>
        </div>
    )
}

export default ActionBar

