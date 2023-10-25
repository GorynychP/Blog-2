Область хранения данных:

-   база данных на json-server
-   BFF
-   Redux Store

Сущность приложения:

-   пользовтаель: БД (список пользователей), BFF (сессия текущего), стор (отображение в браузере)
-   роль пользователя: БД (список роле), BFF (сессия пользователей с рольью), стор (использование на клиенте)
-   статья: БД (весь список), Redux Store (отображение в браузере)
-   комментарий: БД (весь список), Redux Store (отображение в браузере)

Таблицы БД:

-   Пользователи - users: id / login / password / registered_at / role_id
-   Роли - roles: / id / name
-   Статьи - posts: / id / title / image_url / content / published_at
-   Комментарии - comments: / id / author_id / post_id / content

Схема состояние на BFF:

-   текущего пользователья: login / password / role

Схема для Redux Store (на клиенте):

-   user:/ id / login / roleId
-   posts: массив post:/ id / title / imageUrl / publishedAt / commentsCount
-   post:/ id / title / imageUrl / content / publishedAt / comments: массив comment: / id / author / content / publishedAt
-   users: массив user:/ id / login / registeredAt / role
