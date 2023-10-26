# Blog-2
Frontend: React, Redux, React-Router 6, styled-components.

Backend: Node.js, Express.js, MongoDB.

The application includes authentication and registration with validation using "react-hook-form." on front and "validator" on back
Passwords are hashed using the "bcrypt" library. Additionally, JSON Web Tokens (JWT) are implemented using the "jsonwebtoken" library and "cookie-parser".
There are three user roles: Admin, Moderator, and User. 
All roles, including users without roles, have the ability to read posts and comments. 
Upon registration, users are assigned the default role of User.

Admin can: 
Create, edit, and delete posts. 
Modify roles of registered users and delete users.
Add and delete comments on posts.

Moderator can:
Add and delete comments on posts.

User can: 
Comment on posts.

Присутствует авторизация и регистрация с валидацией с использованием "react-hook-form" на фронте и "validator" на бэке. 
Пароли хешируются с использованием библиотеки "bcrypt". 
Так же приложение работает с JSON Web Tokens (JWT)  используя библиотеки "jsonwebtoken" и "cookie-parser".

Существуют роли Admin, Moderator, User. 
Всем ролям и без ролей доступно читать посты и комментрии. 
При регистрации по дефолту становишься User.

Admin способен: 
Cоздавать, редактировать, удалять посты. 
Менять роли зарегистрированным пользователям, а так же удалять их. 
Добавлять комментарии к посту и удалять их.

Moderator способен: 
Добавлять комментарии к посту и удалять их.

User способен: 
Комментировать посты.
