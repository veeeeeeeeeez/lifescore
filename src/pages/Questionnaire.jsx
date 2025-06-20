import { useState } from 'react'

const CATEGORIES = [
  {
    id: 'education',
    title: 'Education',
    weight: 0.25,
    questions: [
      {
        id: 'degree',
        question: "What's your highest degree?",
        type: 'select',
        options: ['High School', 'Associate', 'Bachelor', 'Master', 'PhD', 'Other'],
        weight: 0.4
      },
      {
        id: 'school',
        question: 'What school did you attend?',
        type: 'text',
        weight: 0.3
      },
      {
        id: 'major',
        question: 'What was your major?',
        type: 'text',
        weight: 0.3
      },
      {
        id: 'certifications',
        question: 'List any professional certifications (comma-separated)',
        type: 'tags',
        weight: 0.2
      }
    ]
  },
  {
    id: 'social',
    title: 'Social Capital',
    weight: 0.30,
    questions: [
      {
        id: 'linkedin',
        question: 'Do you have a LinkedIn profile?',
        type: 'boolean',
        weight: 0.2
      },
      {
        id: 'linkedinConnections',
        question: 'How many LinkedIn connections do you have?',
        type: 'number',
        weight: 0.2
      },
      {
        id: 'instagram',
        question: 'Do you have an Instagram account?',
        type: 'boolean',
        weight: 0.2
      },
      {
        id: 'instagramFollowers',
        question: 'How many Instagram followers do you have?',
        type: 'number',
        weight: 0.2
      },
      {
        id: 'closeConnections',
        question: 'How many close professional connections do you have?',
        type: 'number',
        weight: 0.2
      }
    ]
  },
  {
    id: 'skills',
    title: 'Skills & Experience',
    weight: 0.25,
    questions: [
      {
        id: 'hardSkills',
        question: 'What are your top 5 hard skills? (comma-separated)',
        type: 'tags',
        weight: 0.3
      },
      {
        id: 'softSkills',
        question: 'What are your top 3 soft skills? (comma-separated)',
        type: 'tags',
        weight: 0.2
      },
      {
        id: 'languages',
        question: 'What languages do you speak? (comma-separated)',
        type: 'tags',
        weight: 0.2
      },
      {
        id: 'yearsExperience',
        question: 'Years of professional experience?',
        type: 'number',
        weight: 0.3
      }
    ]
  },
  {
    id: 'wealth',
    title: 'Financial Profile',
    weight: 0.20,
    questions: [
      {
        id: 'savings',
        question: 'Do you have savings?',
        type: 'boolean',
        weight: 0.3
      },
      {
        id: 'savingsAmount',
        question: 'Approximate amount in savings?',
        type: 'select',
        options: ['$0 - $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $50,000', '$50,000+'],
        weight: 0.3
      },
      {
        id: 'parentIncome',
        question: 'Estimate of parent\'s household income?',
        type: 'select',
        options: ['< $50k', '$50k - $100k', '$100k - $200k', '$200k - $500k', '> $500k'],
        weight: 0.2
      },
      {
        id: 'familyAssets',
        question: 'Any significant family assets?',
        type: 'boolean',
        weight: 0.2
      }
    ]
  }
]

export default function Questionnaire({ onSubmit }) {
  const [currentCategory, setCurrentCategory] = useState(0)
  const [formData, setFormData] = useState({})
  const [currentAnswers, setCurrentAnswers] = useState({})

  const handleAnswer = (questionId, value) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleNext = () => {
    const category = CATEGORIES[currentCategory]
    setFormData(prev => ({
      ...prev,
      [category.id]: currentAnswers
    }))
    setCurrentAnswers({})
    
    if (currentCategory === CATEGORIES.length - 1) {
      onSubmit(formData)
    } else {
      setCurrentCategory(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentCategory > 0) {
      setCurrentCategory(prev => prev - 1)
      setCurrentAnswers(formData[CATEGORIES[currentCategory - 1].id] || {})
    }
  }

  const currentCategoryData = CATEGORIES[currentCategory]

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'select':
        return (
          <select
            className="form-input"
            value={currentAnswers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
          >
            <option value="">Select an option</option>
            {question.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )
      case 'text':
        return (
          <input
            type="text"
            className="form-input"
            value={currentAnswers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
          />
        )
      case 'number':
        return (
          <input
            type="number"
            className="form-input"
            value={currentAnswers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
          />
        )
      case 'boolean':
        return (
          <div className="flex gap-4">
            <button
              className={`btn-secondary ${currentAnswers[question.id] === true ? 'bg-blue-600 text-white' : ''}`}
              onClick={() => handleAnswer(question.id, true)}
            >
              Yes
            </button>
            <button
              className={`btn-secondary ${currentAnswers[question.id] === false ? 'bg-blue-600 text-white' : ''}`}
              onClick={() => handleAnswer(question.id, false)}
            >
              No
            </button>
          </div>
        )
      case 'tags':
        return (
          <input
            type="text"
            className="form-input"
            placeholder="Enter comma-separated values"
            value={currentAnswers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value.split(',').map(tag => tag.trim()))}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {currentCategoryData.title}
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentCategory + 1) / CATEGORIES.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {currentCategoryData.questions.map((question) => (
            <div key={question.id} className="bg-white p-6 rounded-xl shadow-sm">
              <label className="form-label">{question.question}</label>
              {renderQuestion(question)}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            className="btn-secondary"
            disabled={currentCategory === 0}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="btn-primary"
          >
            {currentCategory === CATEGORIES.length - 1 ? 'Get Your Score' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
} 