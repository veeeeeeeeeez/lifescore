export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Discover Your Life Score
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Unlock your potential by understanding your current life metrics across education, skills, social connections, and wealth.
        </p>
        <button
          onClick={onStart}
          className="btn-primary text-lg"
        >
          Get Your Life Score
        </button>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Comprehensive Analysis</h3>
            <p className="text-gray-600">Get insights across four key life categories</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Actionable Insights</h3>
            <p className="text-gray-600">Receive personalized improvement suggestions</p>
          </div>
        </div>
      </div>
    </div>
  )
} 