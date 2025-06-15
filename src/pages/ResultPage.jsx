import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
  CATEGORY_WEIGHTS,
  EDUCATION_SCORES,
  SOCIAL_SCORES,
  SKILLS_SCORES,
  WEALTH_SCORES,
  SUGGESTION_THRESHOLDS,
  SCORE_MULTIPLIERS
} from '../config/scoring'

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
          categoryScore += EDUCATION_SCORES.degrees[answers.degree] * EDUCATION_SCORES.degreeWeight
        }
        if (answers.school) {
          if (EDUCATION_SCORES.prestigiousSchools.some(school => 
            answers.school.toLowerCase().includes(school.toLowerCase()))) {
            categoryScore += EDUCATION_SCORES.prestigiousSchoolBonus
          } else {
            categoryScore += EDUCATION_SCORES.regularSchoolPoints
          }
        }
        if (answers.major) categoryScore += 20
        if (answers.certifications?.length) {
          categoryScore += Math.min(
            answers.certifications.length * EDUCATION_SCORES.certificationPointsPerCert,
            EDUCATION_SCORES.maxCertificationPoints
          )
        }
        break

      case 'social':
        if (answers.linkedin) categoryScore += SOCIAL_SCORES.linkedinProfilePoints
        if (answers.linkedinConnections) {
          categoryScore += Math.min(
            answers.linkedinConnections * SOCIAL_SCORES.linkedinConnectionPoints.pointsPerConnection,
            SOCIAL_SCORES.linkedinConnectionPoints.maxPoints
          )
        }
        if (answers.instagram) categoryScore += SOCIAL_SCORES.instagramProfilePoints
        if (answers.instagramFollowers) {
          categoryScore += Math.min(
            answers.instagramFollowers * SOCIAL_SCORES.instagramFollowerPoints.pointsPerFollower,
            SOCIAL_SCORES.instagramFollowerPoints.maxPoints
          )
        }
        if (answers.closeConnections) {
          categoryScore += Math.min(
            answers.closeConnections * SOCIAL_SCORES.closeConnectionPoints.pointsPerConnection,
            SOCIAL_SCORES.closeConnectionPoints.maxPoints
          )
        }
        break

      case 'skills':
        if (answers.hardSkills?.length) {
          categoryScore += Math.min(
            answers.hardSkills.length * SKILLS_SCORES.hardSkills.pointsPerSkill,
            SKILLS_SCORES.hardSkills.maxPoints
          )
        }
        if (answers.softSkills?.length) {
          categoryScore += Math.min(
            answers.softSkills.length * SKILLS_SCORES.softSkills.pointsPerSkill,
            SKILLS_SCORES.softSkills.maxPoints
          )
        }
        if (answers.languages?.length) {
          categoryScore += Math.min(
            answers.languages.length * SKILLS_SCORES.languages.pointsPerLanguage,
            SKILLS_SCORES.languages.maxPoints
          )
        }
        if (answers.yearsExperience) {
          categoryScore += Math.min(
            answers.yearsExperience * SKILLS_SCORES.experience.pointsPerYear,
            SKILLS_SCORES.experience.maxPoints
          )
        }
        break

      case 'wealth':
        if (answers.savings) categoryScore += WEALTH_SCORES.hasSavingsPoints
        if (answers.savingsAmount) {
          categoryScore += WEALTH_SCORES.savingsAmount[answers.savingsAmount] * WEALTH_SCORES.savingsWeight
        }
        if (answers.parentIncome) {
          categoryScore += WEALTH_SCORES.parentIncome[answers.parentIncome] * WEALTH_SCORES.parentIncomeWeight
        }
        if (answers.familyAssets) categoryScore += WEALTH_SCORES.familyAssetsPoints
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
  if (scores.education < SUGGESTION_THRESHOLDS.lowScoreThreshold) {
    if (!data.education.certifications?.length) {
      suggestions.push('Consider obtaining industry certifications to boost your education score')
    }
    if (!data.education.school) {
      suggestions.push('Completing a degree program could significantly increase your education score')
    }
  }

  // Social suggestions
  if (scores.social < SUGGESTION_THRESHOLDS.lowScoreThreshold) {
    if (!data.social.linkedin) {
      suggestions.push('Create a LinkedIn profile to expand your professional network')
    }
    if (data.social.linkedinConnections < SUGGESTION_THRESHOLDS.linkedinConnectionsThreshold) {
      suggestions.push('Grow your LinkedIn network by connecting with industry professionals')
    }
    if (data.social.closeConnections < SUGGESTION_THRESHOLDS.closeConnectionsThreshold) {
      suggestions.push('Focus on building deeper relationships with key professional contacts')
    }
  }

  // Skills suggestions
  if (scores.skills < SUGGESTION_THRESHOLDS.lowScoreThreshold) {
    if (data.skills.hardSkills?.length < SUGGESTION_THRESHOLDS.hardSkillsThreshold) {
      suggestions.push('Develop more technical skills relevant to your industry')
    }
    if (data.skills.softSkills?.length < SUGGESTION_THRESHOLDS.softSkillsThreshold) {
      suggestions.push('Work on developing key soft skills like communication and leadership')
    }
    if (data.skills.yearsExperience < SUGGESTION_THRESHOLDS.experienceThreshold) {
      suggestions.push('Gain more professional experience through internships or entry-level positions')
    }
  }

  // Wealth suggestions
  if (scores.wealth < SUGGESTION_THRESHOLDS.lowScoreThreshold) {
    if (!data.wealth.savings) {
      suggestions.push('Start building your savings to improve your financial profile')
    }
    if (data.wealth.savingsAmount === '$0 - $1,000') {
      suggestions.push('Create a budget and savings plan to build your financial foundation')
    }
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
    const finalScore = Math.round(totalScore * SCORE_MULTIPLIERS.finalScoreMultiplier)
    let currentScore = 0
    const duration = SCORE_MULTIPLIERS.animationDuration
    const interval = SCORE_MULTIPLIERS.animationInterval
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