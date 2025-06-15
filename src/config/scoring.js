// Category weights (must sum to 1)
export const CATEGORY_WEIGHTS = {
  education: 0.25,
  social: 0.30,
  skills: 0.25,
  wealth: 0.20
}

// Education scoring factors
export const EDUCATION_SCORES = {
  degrees: {
    'High School': 40,
    'Associate': 60,
    'Bachelor': 80,
    'Master': 90,
    'PhD': 100,
    'Other': 50
  },
  degreeWeight: 0.4,
  schoolWeight: 0.3,
  majorWeight: 0.2,
  certificationWeight: 0.1,
  certificationPointsPerCert: 10,
  maxCertificationPoints: 30,
  prestigiousSchools: ['Stanford', 'MIT', 'Harvard', 'Yale', 'Princeton'],
  prestigiousSchoolBonus: 30,
  regularSchoolPoints: 20
}

// Social scoring factors
export const SOCIAL_SCORES = {
  linkedinProfilePoints: 20,
  linkedinConnectionPoints: {
    pointsPerConnection: 0.4, // 0.4 points per connection
    maxPoints: 20
  },
  instagramProfilePoints: 10,
  instagramFollowerPoints: {
    pointsPerFollower: 0.02, // 0.02 points per follower
    maxPoints: 20
  },
  closeConnectionPoints: {
    pointsPerConnection: 2,
    maxPoints: 30
  }
}

// Skills scoring factors
export const SKILLS_SCORES = {
  hardSkills: {
    pointsPerSkill: 10,
    maxPoints: 30
  },
  softSkills: {
    pointsPerSkill: 10,
    maxPoints: 20
  },
  languages: {
    pointsPerLanguage: 10,
    maxPoints: 20
  },
  experience: {
    pointsPerYear: 6,
    maxPoints: 30
  }
}

// Wealth scoring factors
export const WEALTH_SCORES = {
  hasSavingsPoints: 20,
  savingsAmount: {
    '$0 - $1,000': 10,
    '$1,000 - $5,000': 20,
    '$5,000 - $10,000': 30,
    '$10,000 - $50,000': 40,
    '$50,000+': 50
  },
  savingsWeight: 0.3,
  parentIncome: {
    '< $50k': 20,
    '$50k - $100k': 40,
    '$100k - $200k': 60,
    '$200k - $500k': 80,
    '> $500k': 100
  },
  parentIncomeWeight: 0.3,
  familyAssetsPoints: 20
}

// Suggestion thresholds
export const SUGGESTION_THRESHOLDS = {
  lowScoreThreshold: 70,
  linkedinConnectionsThreshold: 100,
  closeConnectionsThreshold: 10,
  hardSkillsThreshold: 3,
  softSkillsThreshold: 2,
  experienceThreshold: 2
}

// Score multipliers
export const SCORE_MULTIPLIERS = {
  finalScoreMultiplier: 1000, // Multiply final score by this to get dollar amount
  animationDuration: 2000, // Duration of score animation in milliseconds
  animationInterval: 20 // Update interval for score animation in milliseconds
} 