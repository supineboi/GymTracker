import './App.css'
import DailyMotivate from './components/DailyMotivate/DailyMotivate'
import Header from './components/Header/Header'
import Summary from './components/Summary/Summary'
import Main from './components/Main/Main'

function App() {
  const funnyNames = [
    "Muscle McFlex",
    "Iron Biceps",
    "Captain Crunch",
    "Swole Patrol",
    "The Hulkster",
    "Beast Mode",
    "Gym Rat Supreme",
    "Pump Master",
    "Flex Appeal",
    "Tank Top Tim",
    "Barbell Bob",
    "Squat Squad Leader",
    "Deadlift Dan",
    "Bench Press Ben",
    "Protein Power"
  ]
  
  const randomNameIndex = Math.floor(Math.random() * funnyNames.length)
  const randomUserName = funnyNames[randomNameIndex]
  
  return (
    <div className="app-container">
      <Header/>
      <DailyMotivate userName={randomUserName}/>
      <Summary/>
      <Main />
    </div>
  )
}

export default App
