import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CATEGORY_WEIGHTS = {
  education: 0.20,
  skills: 0.25,
  social: 0.30,
  wealth: 0.25
}

const calculateScore = (data) => {
  const scores = {}
  let totalScore = 0

  // Calculate individual category scores
  Object.entries(data).forEach(([category, answers]) => {
    let categoryScore = 0
    const categoryWeight = CATEGORY_WEIGHTS[category]

    // Mock scoring logic for each category
    switch (category) {
      case 'education':
        if (answers.degree) {
          const degreeScores = {
            'High School': 40,
            'Associate': 60,
            'Bachelor': 80,
            'Master': 90,
            'PhD': 100,
            'Other': 50
          }
          categoryScore += degreeScores[answers.degree] * 0.4
        }
        if (answers.school) categoryScore += 30
        if (answers.major) categoryScore += 30
        break

      case 'skills':
        if (answers.hardSkills?.length) categoryScore += Math.min(answers.hardSkills.length * 20, 100) * 0.4
        if (answers.certifications?.length) categoryScore += Math.min(answers.certifications.length * 25, 100) * 0.3
        if (answers.languages?.length) categoryScore += Math.min(answers.languages.length * 25, 100) * 0.3
        break

      case 'social':
        if (answers.connections) categoryScore += Math.min(answers.connections * 2, 100) * 0.4
        if (answers.linkedin) categoryScore += 30
        if (answers.instagram) categoryScore += 30
        break

      case 'wealth':
        if (answers.savings) categoryScore += 40
        if (answers.parentIncome) {
          const incomeScores = {
            '< $50k': 20,
            '$50k - $100k': 40,
            '$100k - $200k': 60,
            '$200k - $500k': 80,
            '> $500k': 100
          }
          categoryScore += incomeScores[answers.parentIncome] * 0.3
        }
        if (answers.familyAssets) categoryScore += 30
        break
    }

    scores[category] = categoryScore
    totalScore += categoryScore * categoryWeight
  })

  return { scores, totalScore }
}

const generateSuggestions = (data, scores) => {
  const suggestions = []

  // Education suggestions
  if (scores.education < 70) {
    suggestions.push('Consider pursuing additional certifications or degrees to boost your education score')
  }

  // Skills suggestions
  if (scores.skills < 70) {
    suggestions.push('Expand your skill set by learning new technologies or getting industry certifications')
  }

  // Social suggestions
  if (scores.social < 70) {
    suggestions.push('Build your professional network by attending industry events and connecting on LinkedIn')
  }

  // Wealth suggestions
  if (scores.wealth < 70) {
    suggestions.push('Start building your savings and explore investment opportunities')
  }

  return suggestions
}

export default function ResultPage({ data }) {
  const [displayScore, setDisplayScore] = useState(0)
  const { scores, totalScore } = calculateScore(data)
  const suggestions = generateSuggestions(data, scores)

  const chartData = Object.entries(scores).map(([category, score]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    score: Math.round(score)
  }))

  useEffect(() => {
    const finalScore = Math.round(totalScore * 1000)
    let currentScore = 0
    const duration = 2000 // 2 seconds
    const interval = 20 // Update every 20ms
    const steps = duration / interval
    const increment = finalScore / steps

    const timer = setInterval(() => {
      currentScore += increment
      if (currentScore >= finalScore) {
        setDisplayScore(finalScore)
        clearInterval(timer)
      } else {
        setDisplayScore(Math.round(currentScore))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [totalScore])

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Your Life Score
          </h1>
          <div className="text-5xl md:text-7xl font-bold text-blue-600">
            ${displayScore.toLocaleString()}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Category Breakdown</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-6">Improvement Suggestions</h2>
          <ul className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
} 