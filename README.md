# Ai36's some code

## Debug Snipet

Небольшой снипет подсвечивающий некоторые ошибки в html.
Ограничено может быть применен не только к статическим сайтам, но к реактивным. Никакого глубокого анализа, проверяется исключительно html, который уже в браузере.

### Установка

Создать в избранном браузера закладку, в поле ссылки которой добавить следующую строчку:

```
javascript:(function()%7Bconst%20ct%3Ddocument.createElement(%27link%27)%3Bct.rel%3D%27stylesheet%27%3Bct.href%3D%27https%3A%2F%2Fai36.github.io%2Fdebug.css%3Ft%3D%27%2BDate.now()%3Bct.classList.add(%27ct%27)%3Bdocument.head.appendChild(ct)%3B%7D)()%3B
```

### Использование

1. Открыть в браузере сайт, который подлежит исследованию.
2. Выбрать закладку, которая была создана на этапе **Установка**.

### Как работает

При выборе закладки запускается небольшой js-код, который выкачивает с моего хостинга на GitHub и вставляет на исследуемый сайт CSS-файл. Ошибки подствечиваются исключительно средставами CSS, никакой js-код не используется. Вся магия происходит исключительно на клиенте. Поэтому при обновлении страницы или переходе по ссылке, CSS-код не сохраняется. Можно лишь запустить повторный анализ с помощью закладки.

### Благодарности

**Александру Ламкову** за идею подстветки ошибкок с помощью CSS\
**Garry Roberts** за идею механизма запуска дебага\
**Вадиму Маличу** из интересный проект стажировки https://preax.ru



### Release notice

v.0.0.3

+ Изменена строка, которую необходимо добавлять в закладки браузера (не забудьте поменять). Добавлен get-параметр, чтобы CSS снипета не кэшировался браузером
+ Исправлены ошибки в README.md

v.0.0.2

+ Добавлен подcчет и вывод количества обнаруженных ошибок

v.0.0.1

+ Реакции на ошибки:

1. В секции head подключены ресурсы блокирующие рендеринг, рекомендуется использовать атрибут defer
2. В документе остутсвует favicon
3. Добавьте к ссылке на внешний документ атрибут rel='noopener noreferrer'
4. В документе остутсвует favicon
5. Секция не имеет заголовка h2
6. Кнопка не имеет текстового содержимого или доступного описания
7. Документ не имеет тега h1
8. Кнопка не имеет атрибута type
9. Атрибут html lang содержит значение отличное от ru
10. Использование тега time без атрибута datatime
11. Есть изображения без атрибута height
12. Есть изображения без атрибута height
13. Есть изображения без атрибута alt

<br><br>
---
## Flair.js

My flair on Stack Overflow
