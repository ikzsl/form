 ## [Форма регистрации](https://ikzsl.github.io/form/)


### Клиентская и серверная валидация данных
- Formik, Yup
- node.js + express + body-parser - для имитации серверной валидации
- Ant Design


Есть клиентская часть (приложение на create-react-app) и серверная (код в папке server). Клиентская запускается как обычно, серверная по npm run server.

На клиенте есть форма.

До отправки форма валидируется на клиенте, после - отправляется запрос на сервер по пути /sign-up.

