export default function RecipesPage() {
  const recipes = [
    {
      id: 1,
      title: "Homemade Pizza",
      description: "Classic Italian pizza with a crispy crust",
      cookTime: "30 mins",
      difficulty: "Medium",
      category: "Italian",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3"
    },
    {
      id: 2,
      title: "Chicken Curry",
      description: "Aromatic Indian curry with tender chicken",
      cookTime: "45 mins",
      difficulty: "Easy",
      category: "Indian",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3"
    },
    {
      id: 3,
      title: "Chocolate Cake",
      description: "Rich and moist chocolate cake",
      cookTime: "1 hour",
      difficulty: "Easy",
      category: "Desserts",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3"
    },
    {
      id: 4,
      title: "Caesar Salad",
      description: "Fresh and crispy classic Caesar salad",
      cookTime: "15 mins",
      difficulty: "Easy",
      category: "Salads",
      image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3"
    },
    {
      id: 5,
      title: "Sushi Rolls",
      description: "Homemade sushi rolls with fresh fish",
      cookTime: "1 hour",
      difficulty: "Hard",
      category: "Japanese",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3"
    },
    {
      id: 6,
      title: "Pasta Carbonara",
      description: "Creamy Italian pasta with bacon",
      cookTime: "25 mins",
      difficulty: "Medium",
      category: "Italian",
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">All Recipes</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <select className="w-full sm:w-auto px-3 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Categories</option>
            <option value="italian">Italian</option>
            <option value="indian">Indian</option>
            <option value="japanese">Japanese</option>
            <option value="desserts">Desserts</option>
            <option value="salads">Salads</option>
          </select>
          <select className="w-full sm:w-auto px-3 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-40 sm:h-48">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-0">
                  {recipe.title}
                </h3>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  {recipe.category}
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{recipe.description}</p>
              <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500">
                <span>⏱️ {recipe.cookTime}</span>
                <span>📊 {recipe.difficulty}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 