Разработка: Проект реализован на основе макета "Музыкальный сервис".

В проекте была созданы следующие страницы: -главная, -страница любимых треков (для авторизованного пользователя), -авторизация, -регистрация.

Реализовано получение всех треков из API.

В проект добавлена возможность управления треками: -реализовано воспроизведение, -повтор, -перемешивание, -изменение текущего времени в воиспреведении трека, -изменение громкости.

В проект добавлена возможность фильтровать треки: -по названию, -по году выпуска -от старых к новым, от новых к старым и по умолчанию. Совместно с фильтрами работает поисковая строка.

Добавлены страницы тематических подборок с треками.

Добавлены тесты(немного:).

В проект добавлена регистрация и авторизация пользователя.

Добавлена возможность лайкать и убирать лайки трекам (только для авторизованных пользователей).

Как разрабатывать: Установите зависимости командой npm install Запустите dev сервер npm start Откройте адрес в браузере Стек и инструменты: Для стилей в коде используются css modules.

Настроены eslint и prettier. Закомитить код, который не проходит проверку eslint не получится.

Доступные команды npm start Запускает приложение в режиме разработки.

Откройте http://localhost:3000 чтобы посмотреть его в браузере.