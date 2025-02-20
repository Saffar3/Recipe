'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import RecipeModal from './components/RecipeModal';
import ArticleModal from './components/ArticleModal';

interface BaseRecipe {
  id: number;
  title: string;
  time: string;
  image: string;
  category: string;
  description?: string;
  ingredients?: {
    name: string;
    quantity: number;
    unit?: string;
  }[];
  proteins?: string;
  carbs?: string;
  fats?: string;
}

interface Article {
  id: number;
  title: string;
  image: string;
  category: string;
  content: string;
}

interface FeaturedRecipe extends BaseRecipe {
  author: string;
  calories?: string;
}

interface PopularRecipe extends BaseRecipe {
  calories: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<(FeaturedRecipe | PopularRecipe)[]>([]);
  const [activeCategory, setActiveCategory] = useState('Все');
  const [filteredPopularRecipes, setFilteredPopularRecipes] = useState<PopularRecipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<PopularRecipe | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const featuredArticles: Article[] = [
    {
      id: 1,
      title: "Как правильно выбирать морепродукты для азиатской кухни",
      image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&auto=format&fit=crop&q=60",
      category: "Советы",
      content: `При выборе морепродуктов для азиатской кухни необходимо учитывать множество аспектов, начиная от свежести продукта и заканчивая его внешним видом. Первое, на что стоит обратить внимание, это запах, так как свежие морепродукты обладают естественным, морским ароматом без чрезмерной рыбной примеси. Цвет мяса должен быть ярким и естественным, без мутных оттенков, а текстура – плотной и эластичной. Региональные особенности приготовления блюд также играют важную роль: в азиатской кухне ценится не только качество продукта, но и искусство его подачи, поэтому качество морепродуктов должно соответствовать высоким стандартам.

Многообразие способов приготовления, таких как варка, запекание, жарка или приготовление на пару, требует особого внимания к выбору продукта. Например, для блюд, таких как суши, сашими или роллы, необходимы исключительно свежие и качественные продукты, в то время как для супов или карри может подойти и слегка замороженный продукт. Важно следить за условиями транспортировки: морепродукты должны храниться при правильной температуре, соблюдаться холодовая цепь от места вылова до конечного потребителя. Проверьте, что упаковка не повреждена, а на этикетке указаны все данные о происхождении и дате добычи.

Кроме того, необходимо обратить внимание на сезонность. Многие виды морепродуктов достигают своего пика в определенные периоды года, когда их вкус, текстура и питательные свойства наиболее оптимальны. Например, некоторые виды креветок, моллюсков или гребешков лучше всего употреблять в сезон, когда они свежайшие и обладают максимальным количеством питательных веществ. Это связано с биологическими ритмами и экологическими условиями водных экосистем, что делает правильный выбор особенно важным для гурманов и профессиональных шеф-поваров.

Не менее важен и вопрос правильного сочетания морепродуктов с другими ингредиентами. Азиатская кухня знаменита своей способностью объединять различные вкусы, где морепродукты часто комбинируются с соевым соусом, имбирем, васаби и сладкими соусами, что позволяет создавать уникальные оттенки вкуса. Использование маринадов и специй, таких как чеснок, лайм, кинза, перец чили и кунжутное масло, значительно обогащает блюдо и помогает раскрыть натуральные вкусовые качества продукта. Правильное соотношение этих элементов помогает сохранить баланс между соленостью, кислинкой и сладостью блюда.

Качественные морепродукты являются источником незаменимых омега-3 жирных кислот, белка и витаминов, способствующих укреплению здоровья сердечно-сосудистой системы и улучшению обмена веществ. Включение свежих морепродуктов в рацион не только придает блюдам изысканный вкус, но и приносит значительные пользы для организма. Дополнительное внимание к мелким деталям, таким как состояние оболочки у ракообразных или прозрачность панцирей у моллюсков, может стать залогом успешного выбора.

Таким образом, правильный выбор морепродуктов для азиатской кухни – это сочетание знаний о продукте, внимания к деталям и глубокое уважение к традициям кулинарии. Постоянное обучение и практика помогут вам выбирать только лучшие продукты, создавая истинные кулинарные шедевры, достойные восторженных отзывов. Следуя этим рекомендациям, вы сможете добиться высокого качества блюд и уверенности в каждом этапе приготовления, от выбора до подачи на стол.`
    },
    {
      id: 2,
      title: "10 принципов здорового завтрака",
      image: "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?w=800&auto=format&fit=crop&q=60",
      category: "Здоровье",
      content: `Эффективное начало дня зависит от правильного выбора завтрака. В этой статье рассмотрены десять основных принципов, которые помогут вам создать сбалансированный рацион на утро. Во-первых, завтрак должен содержать достаточное количество белков, чтобы обеспечить энергией мышцы и поддерживать обмен веществ. Это могут быть яйца, творог или растительные альтернативы. Во-вторых, сложные углеводы играют важную роль, обеспечивая организм энергией длительного действия и способствуя стабильному уровню сахара в крови. Такой подход предотвращает переедание и помогает грамотно распределить калории в течение дня.

В-третьих, не стоит забывать про полезные жиры. Небольшое количество орехов, семян или авокадо поможет поддерживать баланс жирных кислот, необходимых для усвоения витаминов. Четвертым принципом является разнообразие – важно включать в завтрак фрукты, овощи и злаки для получения полного спектра микроэлементов. Пятый принцип подразумевает употребление натуральных, необработанных продуктов без искусственных добавок.

Шестой принцип заключается в контроле порций, ведь даже полезный завтрак может привести к перегрузке, если его количество слишком велико. Седьмой принцип – подготовка завтрака заранее, что помогает избежать утренней спешки и обеспечивает выбор качественных ингредиентов. Восьмой принцип предполагает умеренность в употреблении кофе и чая, чтобы избежать негативного влияния на организм.

Девятый принцип – учет индивидуальных предпочтений, ведь завтрак должен приносить удовольствие и быть эстетически приятным. И, наконец, десятый принцип – регулярность приема пищи, так как пропуски могут негативно сказываться на обмене веществ.

Следуя этим принципам, вы сможете создать завтрак, который удовлетворяет потребности организма и радует вкусом, становясь основой продуктивного дня. Эксперты рекомендуют употреблять завтрак в течение первого часа после пробуждения, чтобы запустить метаболизм и зарядить организм энергией на весь день.`
    },
    {
      id: 3,
      title: "Секреты приготовления идеального стейка",
      image: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&auto=format&fit=crop&q=60",
      category: "Техники",
      content: `Приготовление идеального стейка – это искусство, которое требует внимания к деталям и уважения к качеству мяса. Первым секретом является выбор самого лучшего куска: мясо должно быть свежим и правильно выдержанным. Обратите внимание на структуру жировой прослойки – мраморность, то есть равномерное распределение жира, является показателем высококачественного мяса и влияет на его сочность и вкус. Не менее важно правильно подготовить мясо перед жаркой – дайте ему достичь комнатной температуры и оботрите бумажным полотенцем, чтобы удалить лишнюю влагу.

Второй секрет – использование правильных специй и соли. Мясо, приправленное непосредственно перед приготовлением, насыщается ароматами, сохраняя свою натуральную сочность. Классическая комбинация соли и черного перца прекрасно работает, а добавление чеснока, розмарина или тимьяна придаёт блюду особую глубину.

Третий секрет заключается в соблюдении температуры – идеально разогретая сковорода или гриль создают корочку, которая запечатывает соки внутри мяса. Четвертый секрет – оптимальное время приготовления, зависящее от толщины стейка и желаемой степени прожарки. Использование термометра позволяет добиться идеальной температуры.

Пятый секрет – отдых мяса после жарки. Дайте стейку постоять несколько минут, чтобы соки равномерно распределились, и блюдо стало еще более сочным.

Кроме того, идеальный стейк достигается умелым сочетанием с правильными гарнирами и соусами, которые подчеркивают вкус мяса. Легкий овощной салат или картофельное пюре, а также соусы на основе красного вина, грибов или сливок способны дополнить блюдо.

Наконец, настоящий секрет кроется в любви к кулинарии и желании экспериментировать. Творческий подход, постоянное совершенствование техники и внимание к деталям помогут превратить процесс приготовления стейка в настоящее искусство, которое будет радовать вас и ваших гостей.`
    },
    {
      id: 4,
      title: "Основы ферментации овощей",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=60",
      category: "Заготовки",
      content: `Ферментация овощей – это древний и проверенный способ сохранить свежесть, витамины и питательные вещества, а также придать овощам уникальный вкус. Основываясь на естественной переработке сахаров с помощью молочнокислых бактерий, этот процесс не только продлевает срок хранения, но и обогащает овощи пробиотиками, полезными для пищеварения и иммунной системы.

Первый шаг – выбор качественных овощей. Свежие, органические продукты, такие как капуста, морковь, огурцы или свекла, станут отличной основой для ферментации. Второй этап – тщательная подготовка: овощи необходимо вымыть, очистить и нарезать, чтобы увеличить площадь контакта с солевым раствором, который используется в процессе.

Подготовка солевого раствора – ключевой этап. Раствор с концентрацией соли 2-3% создает оптимальные условия для развития полезных бактерий, одновременно подавляя рост патогенных микроорганизмов. Овощи укладываются в стерильные банки и заливаются раствором, при этом важно обеспечить отвод углекислого газа, используя неплотно закрывающуюся крышку.

Процесс ферментации требует терпения: в первые дни необходимо следить за образующейся пеной и менять раствор при необходимости. С течением времени овощи начинают менять вкус и приобретать легкую кислинку, свидетельствующую о нормальном процессе брожения.

Также можно экспериментировать с добавлением специй и трав, таких как укроп, чеснок или лавровый лист, чтобы усилить аромат и придать блюду дополнительные вкусовые оттенки.

Регулярное употребление ферментированных овощей приносит многочисленные пользы: улучшает пищеварение, нормализует микрофлору кишечника и укрепляет иммунную систему. Таким образом, ферментация – это не только способ консервирования, но и целый кулинарный ритуал, позволяющий сохранить максимум полезных веществ и раскрыть новые грани вкуса овощей.`
    },
    {
      id: 5,
      title: "Кухонные гаджеты, которые действительно нужны",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=60",
      category: "Инвентарь",
      content: `Современная кухня – это пространство, где технологии и кулинарное мастерство встречаются, чтобы сделать процесс приготовления пищи более удобным и эффективным. В данной статье рассматриваются кухонные гаджеты, которые действительно необходимы в современном доме. Во-первых, универсальные устройства, способные выполнять несколько функций одновременно, такие как многофункциональные комбайны, значительно упрощают подготовку ингредиентов, экономят время и силы.

Во-вторых, высококачественная техника для приготовления кофе и чая, включая автоматические кофемашины и фильтровальные аппараты, позволяет получить напитки высокого качества дома, обеспечивая точный контроль над температурой и временем.

В-третьих, эргономика и функциональность современных гаджетов играют немаловажную роль. Компактные приборы с сенсорными панелями, автоматическими режимами и возможностью подключения к смартфону позволяют не только сэкономить место, но и значительно оптимизировать процесс приготовления пищи.

Четвертый аспект – энергетическая эффективность и экологичность. Современные устройства обычно имеют энергосберегающие функции, что способствует снижению затрат и бережному использованию ресурсов.

Наконец, важно помнить, что хорошая кухня – это не только практичность, но и вдохновение. Гаджеты, которые действительно нужны, способны стать источником кулинарного творчества, позволяя экспериментировать с новыми рецептами и техниками, создавая уникальную атмосферу, которая превращает готовку в настоящее удовольствие.

Таким образом, современные кухонные гаджеты объединяют технологии, эстетику и практичность, превращая процесс приготовления пищи в искусство. Выбирайте устройства, соответствующие вашим потребностям, и они станут надежными помощниками на вашей кухне.`
    },
    {
      id: 6,
      title: "Искусство приготовления соусов",
      image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=800&auto=format&fit=crop&q=60",
      category: "Техники",
      content: `Приготовление соусов – это один из ключевых аспектов кулинарного мастерства, способный преобразить любое блюдо, добавив ему глубину вкуса и аромат. Настоящее искусство соусов заключается в умении правильно сочетать ингредиенты и создавать гармоничные композиции, способные подчеркнуть вкус основных компонентов блюда.

Первый принцип – выбор качественных ингредиентов. Использование свежих трав, специй, высококачественных масел и уксусов позволяет создавать соусы, которые не только вкусны, но и полезны. Второй принцип – правильное соотношение компонентов: каждый ингредиент должен присутствовать в оптимальной пропорции, чтобы не заглушать друг друга.

Третий принцип – контроль температуры. Медленное нагревание соуса помогает раскрыть ароматы ингредиентов, сохраняя его насыщенную текстуру без резкого кипения. Четвертый принцип – постепенное добавление ингредиентов с постоянной дегустацией для достижения идеального баланса вкуса.

Пятый принцип – экспериментирование и индивидуальный подход. Пробуя различные комбинации масел, уксусов, специй и даже фруктовых эссенций, вы можете создать уникальную рецептуру, которая станет вашей фирменной.

Шестой принцип – правильное хранение и подача. Многие соусы раскрывают свой вкус полностью после того, как немного настоятся, поэтому их часто рекомендуется подавать охлажденными или слегка подогретыми.

В заключение, искусство приготовления соусов – это синтез кулинарных знаний, внимания к деталям и творческого подхода. Экспериментируя с ингредиентами и соблюдая основные принципы, вы сможете создавать соусы, способные преобразить любое блюдо, даря ему богатый вкус и аромат. Каждая новая рецептура открывает новые горизонты в мире гастрономии и превращает процесс приготовления в настоящее произведение искусства.`
    }
    
  ];

  const categories = [
    { id: 0, name: "Все", active: true },
    { id: 1, name: "Завтрак", active: false },
    { id: 2, name: "Обед", active: false },
    { id: 3, name: "Ужин", active: false },
    { id: 4, name: "Десерты", active: false }
  ];

  const popularRecipes = [
    {
      id: 2,
      title: "Японские панкейки",
      calories: "64 Ккал",
      time: "12 мин",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop&q=60",
      category: "Завтрак"
    },
    {
      id: 3,
      title: "Средиземноморский боул с киноа",
      calories: "320 Ккал",
      time: "25 мин",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60",
      category: "Обед"
    },
    {
      id: 4,
      title: "Острое тайское зеленое карри",
      calories: "410 Ккал",
      time: "35 мин",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&auto=format&fit=crop&q=60",
      category: "Ужин"
    },
    {
      id: 5,
      title: "Классический греческий салат",
      calories: "180 Ккал",
      time: "15 мин",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop&q=60",
      category: "Обед"
    },
    {
      id: 6,
      title: "Домашние суши роллы",
      calories: "280 Ккал",
      time: "45 мин",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60",
      category: "Ужин"
    },
    {
      id: 7,
      title: "Вегетарианский боул",
      calories: "290 Ккал",
      time: "20 мин",
      image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&auto=format&fit=crop&q=60",
      category: "Обед"
    },
    {
      id: 8,
      title: "Паста с грибным соусом",
      calories: "380 Ккал",
      time: "25 мин",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&auto=format&fit=crop&q=60",
      category: "Ужин"
    },
    {
      id: 9,
      title: "Ягодный смузи боул",
      calories: "210 Ккал",
      time: "10 мин",
      image: "https://images.unsplash.com/photo-1626790680787-de5e9a07bcf2?w=800&auto=format&fit=crop&q=60",
      category: "Завтрак"
    },
    {
      id: 10,
      title: "Лосось на гриле со спаржей",
      calories: "350 Ккал",
      time: "30 мин",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=60",
      category: "Ужин"
    },
    {
      id: 11,
      title: "Мексиканская кукуруза",
      calories: "220 Ккал",
      time: "15 мин",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=60",
      category: "Обед"
    },
    {
      id: 12,
      title: "Вьетнамский суп Фо",
      calories: "290 Ккал",
      time: "40 мин",
      image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=60",
      category: "Ужин"
    }
  ];

  // Функция поиска
  const handleSearch = (query: string) => {
    const filtered = popularRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
    setShowResults(query.length > 0);
  };

  // Обработчик изменения поискового запроса
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  // Обработчик выбора категории
  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  // Фильтрация рецептов по активной категории
  useEffect(() => {
    const filtered = activeCategory === 'Все' 
      ? popularRecipes 
      : popularRecipes.filter(recipe => recipe.category === activeCategory);
    setFilteredPopularRecipes(filtered);
  }, [activeCategory]);

  // Закрытие результатов поиска при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="relative search-container">
        <div className="relative">
          <input
            type="search"
            placeholder="Поиск рецептов..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-white rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 placeholder-gray-400"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Выпадающий список результатов */}
        {showResults && searchResults.length > 0 && (
          <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg overflow-hidden z-10 max-h-[60vh] overflow-y-auto">
            {searchResults.map((recipe) => (
              <div
                key={recipe.id}
                className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3"
                onClick={() => {
                  setSearchQuery(recipe.title);
                  setShowResults(false);
                }}
              >
                <div className="w-12 h-12 rounded-lg bg-gray-200 flex-none overflow-hidden">
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{recipe.title}</h4>
                  <p className="text-sm text-gray-500">
                    {recipe.calories ? `${recipe.calories} • ` : ''}{recipe.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Сообщение, если ничего не найдено */}
        {showResults && searchResults.length === 0 && (
          <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg p-4 text-center text-gray-500">
            Рецепты не найдены
          </div>
        )}
      </div>

      {/* Articles Section */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Статьи по тематике рецепты</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
          {featuredArticles.map((article) => (
            <div 
              key={article.id} 
              className="flex-none w-[400px] bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border border-gray-100"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="relative h-[200px]">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-900">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{article.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Категории</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                category.name === activeCategory
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Популярные рецепты</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
          {filteredPopularRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className="flex-none w-[280px] bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="relative h-[180px]">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                <button 
                  className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    // Handle favorite toggle
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div className="p-4 h-[120px] flex flex-col justify-between">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{recipe.title}</h3>
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M3 21C3 16.0294 7.02944 12 12 12C16.9706 12 21 16.0294 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    {recipe.calories}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                      <path d="M12 6V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    {recipe.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={{
            title: selectedRecipe.title,
            time: selectedRecipe.time,
            calories: selectedRecipe.calories,
            image: selectedRecipe.image,
            description: selectedRecipe.description,
            ingredients: selectedRecipe.ingredients,
            proteins: selectedRecipe.proteins,
            carbs: selectedRecipe.carbs,
            fats: selectedRecipe.fats
          }}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
