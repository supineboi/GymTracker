import { useState } from 'react'
import styles from './Header.module.css'
import { formattedDate } from '../../utils/unitConverter'
import { arrow } from '../../utils/emojis';

const Header = () => {
    const { workoutDate, dayOfWeek } = formattedDate();
    const [isOpen, setIsOpen] = useState(false)

    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }

    return (
        <header className={styles.header}>
            <div
                className={`${styles.headerTop} ${isOpen ? styles.open : ''}`}
                onClick={toggleAccordion}
            >
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>💪 Gym Tracker</h1>
                    <p className={styles.subtitle}>Track your workouts and progress!</p>
                    <p className={styles.description}>An Ultimate Gym Tracker App that wants you to get stronger!</p>
                    <div className={styles.date}>📅 {workoutDate} - {dayOfWeek}</div>
                </div>
                <div className={`emojis ${isOpen ? 'arrowOpen' : ''}`}>
                    {arrow}
                </div>
            </div>

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

