import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import Questionnaire from './pages/Questionnaire'
import ResultPage from './pages/ResultPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [formData, setFormData] = useState({
    education: {},
    skills: {},
    social: {},
    wealth: {}
  })

  const handleStartQuiz = () => {
    setCurrentPage('questionnaire')
  }

  const handleFormSubmit = (data) => {
    setFormData(data)
    setCurrentPage('result')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onStart={handleStartQuiz} />
      case 'questionnaire':
        return <Questionnaire onSubmit={handleFormSubmit} />
      case 'result':
        return <ResultPage data={formData} />
      default:
        return <LandingPage onStart={handleStartQuiz} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  )
}

export default App
