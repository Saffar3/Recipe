declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        MainButton: {
          text: string;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        BackButton: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        onEvent: (eventType: string, callback: () => void) => void;
        offEvent: (eventType: string, callback: () => void) => void;
        sendData: (data: any) => void;
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
          };
        };
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
      };
    };
  }
}

export const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : null;

// Инициализация WebApp
export const initTelegramApp = () => {
  if (tg) {
    tg.ready();
    // Добавляем небольшую задержку для гарантии, что WebApp полностью загружен
    setTimeout(() => {
      tg.expand();
    }, 50);
  }
};

// Получение данных пользователя
export const getUserData = () => {
  if (tg?.initDataUnsafe?.user) {
    return tg.initDataUnsafe.user;
  }
  return null;
};

// Настройка главной кнопки
export const setupMainButton = (text: string, callback: () => void) => {
  if (tg?.MainButton) {
    tg.MainButton.text = text;
    tg.MainButton.onClick(callback);
    tg.MainButton.show();
  }
};

// Настройка кнопки "Назад"
export const setupBackButton = (callback: () => void) => {
  if (tg?.BackButton) {
    tg.BackButton.onClick(callback);
    tg.BackButton.show();
  }
};

// Отправка данных в бот
export const sendDataToBot = (data: any) => {
  if (tg?.sendData) {
    tg.sendData(JSON.stringify(data));
  }
}; 