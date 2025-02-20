export default function CategoriesPage() {
  const categories = [
    {
      id: 1,
      name: "Italian",
      description: "Classic Italian dishes and pasta recipes",
      image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-4.0.3",
      recipeCount: 12
    },
    {
      id: 2,
      name: "Indian",
      description: "Spicy and aromatic Indian curries",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3",
      recipeCount: 8
    },
    {
      id: 3,
      name: "Japanese",
      description: "Traditional and modern Japanese cuisine",
      image: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?ixlib=rb-4.0.3",
      recipeCount: 10
    },
    {
      id: 4,
      name: "Desserts",
      description: "Sweet treats and baked goods",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3",
      recipeCount: 15
    },
    {
      id: 5,
      name: "Salads",
      description: "Fresh and healthy salad recipes",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3",
      recipeCount: 6
    },
    {
      id: 6,
      name: "Mexican",
      description: "Spicy and flavorful Mexican dishes",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3",
      recipeCount: 9
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recipe Categories</h1>
          <p className="text-gray-600 mt-2">Browse recipes by category</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="relative h-48">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <span className="text-sm">{category.recipeCount} recipes</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600">{category.description}</p>
              <button className="mt-4 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                View Recipes →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 