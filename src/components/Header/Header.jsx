import { useState } from 'react'
import styles from './Header.module.css'

/**
 * STEP 2: Adding useState Hook
 * 
 * WHAT IS useState?
 * - useState is a React Hook that lets you add state to functional components
 * - State = data that can change and cause the component to re-render
 * 
 * SYNTAX:
 * const [stateVariable, setStateFunction] = useState(initialValue)
 * 
 * - stateVariable: current value of state
 * - setStateFunction: function to update the state
 * - initialValue: starting value (false = closed, true = open)
 */

const Header = () => {
    // State to track if accordion is open or closed
    // false = closed (default), true = open
    const [isOpen, setIsOpen] = useState(false)
    
    const today = new Date()
    const todayDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    const dayOfWeek = today.toLocaleDateString('en-US', {
        weekday: 'long'
    })
    
    /**
     * STEP 3: Creating Click Handler
     * 
     * WHAT IS THIS?
     * - A function that runs when user clicks the header
     * - It toggles (switches) the isOpen state
     * 
     * HOW IT WORKS:
     * - If isOpen is false, set it to true (open)
     * - If isOpen is true, set it to false (close)
     * - !isOpen means "not isOpen" (opposite value)
     */
    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }
    
    return (
        <header className={styles.header}>
            {/* STEP 4: Making Header Clickable */}
            {/* 
                onClick={toggleAccordion} - runs toggleAccordion when clicked
                className with conditional - adds 'open' class when isOpen is true
            */}
            <div 
                className={`${styles.headerTop} ${isOpen ? styles.open : ''}`}
                onClick={toggleAccordion}
            >
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>💪 Gym Tracker</h1>
                    <p className={styles.subtitle}>Track your workouts and progress!</p>
                    <p className={styles.description}>An Ultimate Gym Tracker App that wants you to get stronger!</p>
                    <div className={styles.date}>📅 {todayDate} - {dayOfWeek}</div>
                </div>
                {/* Arrow indicator - rotates when open */}
                <div className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
                    ▼
                </div>
            </div>
            
            {/* STEP 5: Conditional Rendering - Show Details Only When Open */}
            {/*
                WHAT IS THIS?
                - Conditional rendering using && operator
                - If isOpen is true, show the details div
                - If isOpen is false, show nothing (null)
                
                SYNTAX: condition && <JSX>
                - If condition is true, render JSX
                - If condition is false, render nothing
            */}
            {isOpen && (
                <div className={styles.details}>
                    <div className={styles.detailsContent}>
                        <h3>📊 Quick Stats</h3>
                        <p>Welcome to your personal gym tracking companion!</p>
                        <ul className={styles.detailsList}>
                            <li>✅ Track your daily workouts</li>
                            <li>📈 Monitor your progress</li>
                            <li>💪 Set personal records</li>
                            <li>🎯 Achieve your fitness goals</li>
                        </ul>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header

