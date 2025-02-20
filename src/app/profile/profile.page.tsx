export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto px-4">
      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
          <p className="text-gray-600">Manage your recipes and preferences</p>
        </div>
      </div>

      {/* Profile Actions */}
      <div className="space-y-4">
        <button className="w-full p-4 bg-white rounded-lg shadow-sm flex items-center justify-between hover:bg-gray-50">
          <span className="font-medium">My Recipes</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        <button className="w-full p-4 bg-white rounded-lg shadow-sm flex items-center justify-between hover:bg-gray-50">
          <span className="font-medium">Saved Recipes</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        <button className="w-full p-4 bg-white rounded-lg shadow-sm flex items-center justify-between hover:bg-gray-50">
          <span className="font-medium">Settings</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Logout Button */}
      <button className="w-full p-4 text-red-600 font-medium bg-white rounded-lg shadow-sm hover:bg-red-50">
        Log Out
      </button>
    </div>
  );
} 