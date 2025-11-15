import { DUMMY_QUOTES } from '../../data/dummy-quotes'
import styles from './DailyMotivate.module.css'

const DailyMotivate = ({ userName }) => {
    const randomIndex = Math.floor(Math.random() * DUMMY_QUOTES.length)
    const selectedQuote = DUMMY_QUOTES[randomIndex]
    
    return (
        <div className={styles.motivateContainer}>
            <div className={styles.greeting}>
                <span className={styles.emoji}>👋</span>
                <span>Hey! {userName}, today's your day to get stronger!</span>
            </div>
            <div className={styles.message}>
                <span className={styles.quoteEmoji}>{selectedQuote.emoji}</span>
                <span>{selectedQuote.text}</span>
            </div>
        </div>
    )
}

export default DailyMotivate

