export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Discover Your True Value
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Unlock your hidden potential by quantifying your social capital, skills, education, and financial profile. Get a comprehensive analysis of your worth and actionable insights to increase your value.
        </p>
        <button
          onClick={onStart}
          className="btn-primary text-lg"
        >
          Calculate Your Life Score
        </button>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Social Capital Analysis</h3>
            <p className="text-gray-600">Discover the value of your professional network and social connections</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Value Optimization</h3>
            <p className="text-gray-600">Get personalized suggestions to increase your worth and leverage your assets</p>
          </div>
        </div>
      </div>
    </div>
  )
} 