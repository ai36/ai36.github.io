# Ai36's some code


- [Debug Snippet](https://github.com/ai36/ai36.github.io?tab=readme-ov-file#debug-snippet)
- [Debug Pixel-Perfect](https://github.com/ai36/ai36.github.io?tab=readme-ov-file#debug-pixel-perfect-debug-ppjs)


## Debug Snippet

Небольшой сниппет подсвечивающий некоторые ошибки в html.
Ограничено может быть применен не только к статическим сайтам, но к реактивным. Никакого глубокого анализа, проверяется исключительно html, который уже в браузере.

### Установка

Создать в избранном браузера закладку, в поле ссылки которой добавить следующую строчку:

```javascript
javascript:(function()%7Bconst%20ct%3Ddocument.createElement(%27link%27)%3Bct.rel%3D%27stylesheet%27%3Bct.href%3D%27https%3A%2F%2Fai36.github.io%2Fdebug.css%3Ft%3D%27%2BDate.now()%3Bct.classList.add(%27ct%27)%3Bdocument.head.appendChild(ct)%3B%7D)()%3B
```

### Использование

1. Открыть в браузере сайт, который подлежит исследованию.
2. Выбрать закладку, которая была создана на этапе **Установка**.

### Как работает

При выборе закладки запускается небольшой js-код, который выкачивает с моего хостинга на GitHub и вставляет на исследуемый сайт CSS-файл. Ошибки подсвечиваются исключительно средствами CSS, никакой js-код не используется. Вся магия происходит исключительно на клиенте. Поэтому при обновлении страницы или переходе по ссылке, CSS-код не сохраняется. Можно лишь запустить повторный анализ с помощью закладки.

Кликнув на сообщение об ошибке правой кнопкой мыши, вы можете в контекстном меню выбрать пункт "Исследовать" или "Посмотреть код" или что-то аналогичное в вашем браузере, чтобы перейти к проблемному элементу (или в некоторых случаях к его родителю) в dev tools вашего браузера.

### Возможности

1. В секции head подключены ресурсы блокирующие рендеринг, рекомендуется использовать атрибут defer

При подключении js-скриптов секции head, рендеринг страницы останавливается, пока js-скрипт не будет полностью выполнен. Если это не то поведение, которое вы рассматриваете как базовый сценарий, рекомендуется отложить выполнений js-скрипта до момента полной загрузки html с помощью атрибута defer:
```html
<script defer src="some.js"></script>
```

2. В документе отсутствует favicon

Предполагаем, что хотя бы базовая иконка у html-документа должна быть всегда. Это хороший тон, показывает, что разработчик не забывает нюансах и стремиться улучшить пользовательский опыт.
```html
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
```

3. Добавьте к ссылке на внешний документ атрибут rel='noopener noreferrer'

На данном этапе сниппет не может определить, является ли ссылка на документ действительно ссылкой на внешний ресурс. Всего лишь предположение, что ссылки имеющие атрибут `target="_blank"` являются внешними. И если у них нет атрибута rel с указанными параметрами, это потенциальная угроза безопасности, которая может позволить стороннему ресурсу определить, с какого сайта, пользователь перешел. Пример верного кода:
```html
<a href="https://outside.com" target="_blank" rel="noopener noreferrer">
```

4. Секция не имеет заголовка h2

Семантический тег `<section>` должен содержать заголовок `<h2>`. Строго говоря, спецификация html этого не требует. Более того, она даже допускает применение тега `<h1>` внутри каждой секции, т.е. можно иметь несколько `<h1>` на странице. Однако в целях лучшего взаимодействия с роботами поисковых систем, рекомендуется всю же использовать тег `<h2>`:
```html
<section>
    <h2>Title</h2>
</section>
```

5. Кнопка не имеет текстового содержимого или доступного описания

Нередко встречаются ситуации, когда кнопка `<button>` не имеет текстового содержимого, например, ее внутреннее содержимое - это изображение, иконка. В этом случае пользователи, которые воспринимают сайты на слух, не имеют возможности определить, что делает кнопка. Необходимо задавать таким кнопкам текстовое содержимое с помощью атрибутов доступности - aria-label, например:
```html
<button type="button" aria-label="Закрыть меню">
    <svg>...</svg>
</button>
```

6. Документ не имеет тега h1

В документе должен быть явно обозначен тег `<h1>`. Это важный элемент обеспечивающий поисковыми роботами назначения страницы сайта:
```html
<body>
    <h1>Title</h1>
</body>
```

7. Кнопка не имеет атрибута type

В html поведение кнопок `<button>` может меняться в зависимости от указанного типа. Например, кнопка с типом `submit` отправляет форму, а с типом `reset` - очищает ее. Указание `type="button"` для кнопки внутри формы, даст понять браузеру, что это кнопка иного назначения и не служит для отправки формы.
```html
<button type="button"></button>
```

8. Атрибут html lang содержит значение отличное от ru

Язык документа указанный в атрибуте `lang` для тега `<html>` крайне важен. Он позволяет браузеру использовать общепринятые стандарты конкретного языка при отображении страниц. Тут речь не о текстовой составляющей, а о таких вещах как например направление письма, существуют языки, в которых пишут справа налево или сверху вниз. Для русскоязычных пользователей необходимо указывать значение `ru`:
```html
<html lang="ru">
```

9. Использование тега time без атрибута datatime

Тег `<time>` предназначен для семантического выделения указаний времени на сайте. Он имеет атрибут `datetime`, в котором время должно быть указано в стандартизированном формате, тогда как внутри тега, вы можете написать любой текст - например вместо разделителя часов и минут использовать эмодзи и это не будет считаться невалидным значением, если атрибут `datetime` указан корректно:
```html
<time datetime="2025-04-18T10:30:00Z">10-30</time>
```

Обратите внимание, что спецификация не требует указывать полное время в формате UTC, можно ограничится только датой или только временем, но разделители и порядок элементов в строке должны быть валидными. К сожалению debug-сниппет может проверить только наличие атрибута, но корректность его заполнения.

10. Есть изображения без атрибута width

Проверяется наличие у тегов `<img>` атрибута `width`, которых отвечает за размер изображения в ширину. Это позволяет браузеру сразу выделить место для изображения, не дожидаясь обработки CSS. Это нужно, чтобы предотвратить или снизить сдвиг элементов, после того, как CSS обработается браузером. Наличие/отсутствие сдвига -  одна из важных метрик Core Web Vitals, подробнее [в этой статье](https://web.dev/articles/cls).
```html
<img src="bird.jpg" width="100" height="200" alt="Птица сидящая на ветке">
```

11. Есть изображения без атрибута height

Смотри пункт 10.

12. Есть изображения без атрибута alt

Важный параметр для индексации изображений поисковыми системами и так же для доступности. Он должен содержать текст описывающий содержание изображения. Это позвонил людям с особыми потребностями понять, что изображено и так же позволит поисковым роботам верно ранжировать ваше изображение в поиске.
```html
<img src="bird.jpg" width="100" height="200" alt="Птица сидящая на ветке">
```

По вышеуказанным причинам использовать атрибута `alt` без значения, с пробелами вместо значения или бессмысленным значением лишает ваш html-документ каких-либо преимуществ.

13. Предложение использовать современные форматы изображений webp и/или avif

Определяем какие форматы изображений указаны html-коде. Если современные форматы webp или avif не найдены, а есть только jpg или png, предлагается внедрить такие оптимизации. Пример кода:
```html
<picture>
    <source srcset="pizza.avif" type="image/avif">
    <source srcset="pizza.webp" type="image/webp">
    <img src="pizza.jpg" width="300" height="300" alt="Пицца">
</picture>
```

14. Предложение использовать фолбэки на старые форматы изображений, если в документе используются исключительно современные webp и/или avif

Возможно на странице используются только современные форматы изображений, тогда возможна ситуация, когда старый браузер не сможет показать эти изображения в силу отсутствия поддержки. Рекомендуется использовать фолбеки - специальный код, который отработает в случае, если основной файл изображения не может быть показан. Смотри пример кода из пункт 13.

15. Необходимо проверить alt у изображений, т.к. предположительно он содержит только пробелы

Иногда в качестве заглушки или воспользовавшись код-генератором разработчик забывает об оставленных `alt=" "`. Это правило помогает отловить такую ситуацию. К сожалению, невозможно средствами CSS определить когда alt есть, но содержит пустое значение - `alt=""` или ситуацию когда alt содержит текст экранированный пробелами `alt=" Какой-то текст "`, поэтому сообщении об ошибке указано - предположительно.

16. В коде используется тег &lt;a&gt; не имеющий атрибута "href

Тег &lt;a&gt; предназначен для описания ссылки, адрес которой задается в атрибуте href. Использование &lt;a&gt; без этого атрибута не противоречит спецификации html, но тег становится inline-элементом без интерактивных функций. Рекомендуется замена на более семантически подходящий, например span.

17. Обнаружен класс undefined у элемента

Иногда после сборки проекта, вместо названия класса в html попадает строка undefined, т.к. в объекте, в который импортируются стили компонента нет селектора с указанным названием. Это может произойти, если CSS-файл компонента не существует по указанному пути, либо указанный селектор отсутствует в CSS-файле компонента. Очень многое зависит от сборщика, и возможен случай, когда несуществующий класс указан, но сборщик не прописывает даже атрибут class для такого элемента, т.к. undefined-класс единственный у элемента. Debug-сниппет сообщит об ошибке в случае обнаружения например такого кода:

```html
<span class="text_3q857 undefined"></span>
```
Такой код может быть сформирован при обработке такого исходника, если CSS-файл не содержит селектора `.colorRed`
```jsx
import styles from "./component.module.css";

export function Component() {
    return <span className={`${styles.text} ${styles.colorRed}`}></span>
}
```

18. Ошибка вложенности интерактивных html-элементов

- Обычно такая ошибка возникает когда один интерактивный элемент вложен в другой, но так же ошибкой считается, когда элемент, которому с помощью атрибутов доступности или иных придан смысл интерактивного элемента - например элемент с tabindex содержит внутри себя ссылку.  
    ```html
    <!-- ❌ Ошибка! -->
    <a href="/">
        <button type="button">Click me!</button>
    </a>
    ```
- Ошибка вложенности элементов header и footer
    ```html
    <!-- ❌ Ошибка! -->
    <header>
        <header></header>
    </header>
    ```
    или
    ```html
    <!-- ❌ Ошибка! -->
    <footer>
        <footer></footer>
    </footer>
    ```
    Даже если вложенный `header` (`footer`) не является непосредственным потомком `header` (`footer`), это считается ошибкой.

19. Обнаружен класс object у элемента
20. Обнаружен класс true у элемента
21. Обнаружен класс false у элемента
22. Обнаружен класс null у элемента

Смотри описание к реакции #17.

23. Обнаружено использование inline CSS

Использование атрибута style у тегов html хоть и является валидным, но имеет коннотацию антипаттерна, как средства латания дыр или лечение симптомов, а не и причин.

```html
<!-- ❌ Ошибка! -->
<div style="color: red"></div>
```


<br>

### Благодарности

**Александру Ламкову** за идею подсветки ошибок с помощью CSS\
**Garry Roberts** за идею механизма запуска сниппета\
**Вадиму Малычу** из интересный проект стажировки https://preax.ru



<br><br><br><br>


## Debug Pixel-Perfect (debug-pp.js)

Совсем микроскопический js-сниппет подсвечивающий возможные проблемы с pixel-perfect версткой.
В основе его лежит следующий постулат (возможно спорный, но тем не менее) - дизайн, как правило, разрабатывается на основе целых пикселей и любой дробный размер (а особенно дробная высота) свидетельствует об ошибке в верстке.

### Установка

Можно использовать без установки. Для этого, после полной загрузки тестируемого сайта, можно запустить скрипт в консоли браузера:

```javascript
document.querySelectorAll("*").forEach((el) => {
  const { width, height } = el.getBoundingClientRect();
  if ((width % 1 !== 0 || height % 1 !== 0) && el.childElementCount === 0 && !el.closest("svg")) {
    console.log(el, { width, height });
  }
});
```

Для удобства можно создать закладку в избранном браузера, в поле ссылки которой добавить следующую строчку:

```javascript
javascript:document.querySelectorAll("*").forEach((el)%20=>%20{%0A%20%20const%20{%20width,%20height%20}%20=%20el.getBoundingClientRect();%0A%20%20if%20((width%20%%201%20!==%200%20||%20height%20%%201%20!==%200)%20&&%20el.childElementCount%20===%200%20&&%20!el.closest(%22svg%22))%20{%0A%20%20%20%20console.log(el,%20{%20width,%20height%20});%0A%20%20}%0A});
```

### Использование

Запустив так или иначе код, вы получите в консоли, что-то подобное этому:
```
<h3 class="_title_srkvi_31">                                debugger eval code:4:13
Object { width: 526, height: 31.916671752929688 }
```
Рядом с html-тегом размещена ссылка, клик по которой перемещает вас к нужному элементу в инспекторе кода в Dev tools браузера.

### Возможности и ограничения

Не уверен, что дробная ширина, на которую так же реагирует сниппет имеет значение, т.к. в основном, это ширина textNode, а рендеринг шрифтов выполняется каждым браузером по своему. Пока только план на будущее, подумать о том как добавить ценности расчету ширин.

Если на странице присутствуют анимированные элементы, то активная анимация будет так же тригерить сниппет.

Поскольку невозможно достучаться из js до псевдоэлементов, таких как `::before` и `::after`, то их размеры не учитываются, однако они так же могут быть причиной несоответствия макету.




<br><br><br><br>


## flair.js

My flair on Stack Overflow
