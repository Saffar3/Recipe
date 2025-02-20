import React, { useState } from 'react';
import Image from 'next/image';

interface RecipeModalProps {
  recipe: {
    title: string;
    time: string;
    calories: string;
    image: string;
    description?: string;
    ingredients?: {
      name: string;
      quantity: number;
      unit?: string;
    }[];
    proteins?: string;
    carbs?: string;
    fats?: string;
    instructions?: string[];
  };
  onClose: () => void;
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  const [activeTab, setActiveTab] = useState('ingredients');

  function getProductsText(count: number): string {
    if (count === 1) return 'продукт';
    if (count >= 2 && count <= 4) return 'продукта';
    return 'продуктов';
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Favorite Button */}
        <button 
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Recipe Image */}
        <div className="w-full h-72 relative">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={800}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Recipe Content */}
        <div className="p-6">
          {/* Title and Time */}
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-gray-900">{recipe.title}</h2>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg whitespace-nowrap">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-600 font-medium">{recipe.time}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            {recipe.description || "Этот здоровый тако-салат - идеальное сочетание хрустящих овощей, спелого авокадо и пикантных специй. Блюдо богато белками и полезными жирами, а также содержит множество витаминов. Прекрасно подходит для легкого обеда или ужина."}
          </p>

          {/* Nutritional Info */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Углеводы</span>
              </div>
              <p className="font-semibold text-gray-900">{recipe.carbs || '65g'}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Белки</span>
              </div>
              <p className="font-semibold text-gray-900">{recipe.proteins || '27g'}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Калории</span>
              </div>
              <p className="font-semibold text-gray-900">{recipe.calories}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Жиры</span>
              </div>
              <p className="font-semibold text-gray-900">{recipe.fats || '91g'}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-colors ${
                activeTab === 'ingredients'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('ingredients')}
            >
              Ингредиенты
            </button>
            <button
              className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-colors ${
                activeTab === 'instructions'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('instructions')}
            >
              Инструкция
            </button>
          </div>

          {/* Ingredients Tab */}
          {activeTab === 'ingredients' && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Ингредиенты</h3>
                <span className="text-sm text-gray-500">
                  {recipe.ingredients?.length || 11} {getProductsText(recipe.ingredients?.length || 11)}
                </span>
              </div>
              <div className="space-y-4">
                {(recipe.ingredients || [
                  { name: 'Тортилья чипсы', quantity: 2, unit: 'горсти' },
                  { name: 'Авокадо', quantity: 1, unit: 'шт' },
                  { name: 'Красная капуста', quantity: 150, unit: 'г' },
                  { name: 'Арахис', quantity: 30, unit: 'г' },
                  { name: 'Красный лук', quantity: 0.5, unit: 'шт' },
                  { name: 'Помидоры черри', quantity: 8, unit: 'шт' },
                  { name: 'Листья салата', quantity: 100, unit: 'г' },
                  { name: 'Оливковое масло', quantity: 2, unit: 'ст.л.' },
                  { name: 'Лимонный сок', quantity: 1, unit: 'ст.л.' },
                  { name: 'Соль', quantity: 1, unit: 'щепотка' },
                  { name: 'Черный перец', quantity: 1, unit: 'щепотка' }
                ]).map((ingredient, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        {/* Здесь можно добавить иконки ингредиентов */}
                      </div>
                      <span className="font-medium text-gray-900">{ingredient.name}</span>
                    </div>
                    <span className="text-gray-900 font-medium">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions Tab */}
          {activeTab === 'instructions' && (
            <div className="mb-6">
              <div className="space-y-4">
                {(recipe.instructions || [
                  "Нарежьте все овощи тонкими ломтиками",
                  "Разогрейте сковороду на среднем огне",
                  "Обжарьте тортилью с обеих сторон до золотистого цвета",
                  "Выложите овощи слоями, начиная с капусты",
                  "Добавьте авокадо и измельченный арахис",
                  "Полейте соусом по вкусу"
                ]).map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-none">
                      <span className="text-teal-600 font-medium">{index + 1}</span>
                    </div>
                    <p className="text-gray-600 flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 