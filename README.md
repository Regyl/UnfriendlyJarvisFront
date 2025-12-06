- [Google PieCharts](https://www.react-google-charts.com/examples/pie-chart)
- [Recharts](https://github.com/recharts/recharts)

## Настройка авторизации

Приложение поддерживает два способа авторизации:
- **OAuth2.0 через GitHub** - авторизация через GitHub аккаунт
- **Базовая авторизация** - авторизация через email и пароль

### Настройка OAuth2.0 с GitHub

Для работы авторизации через GitHub необходимо:

1. Создать OAuth App на GitHub:
   - Перейдите в [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
   - Нажмите "New OAuth App"
   - Заполните форму:
     - **Application name**: Unfriendly Jarvis
     - **Homepage URL**: `http://localhost:3000`
     - **Authorization callback URL**: `http://localhost:3000/auth/callback`
   - Сохраните **Client ID**

2. Создайте файл `.env` в корне проекта:
   ```
   REACT_APP_GITHUB_CLIENT_ID=your_github_client_id_here
   ```

3. Убедитесь, что бэкенд настроен для обработки OAuth2.0:
   - Эндпоинт `/auth/github/callback` должен принимать `code` и `state`
   - Эндпоинт `/auth/verify` должен проверять валидность токена

### Настройка базовой авторизации

Для работы базовой авторизации убедитесь, что бэкенд настроен для обработки:
- **POST** `/auth/signin` - вход в систему (принимает `email` и `password`)
- **POST** `/auth/signup` - регистрация (принимает `email`, `password`, `name`)

Оба эндпоинта должны возвращать:
```json
{
  "access_token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "avatar_url": "string (optional)"
  }
}
```

[Source](https://www.weave.works/blog/deploy-react-app-to-kubernetes-cluster)
From the root of project:
```bash
docker build --tag unfriendly-jarvis-front .
docker tag unfriendly-jarvis-front regyl/unfriendly-jarvis-front
docker push regyl/unfriendly-jarvis-front
```

$env:NODE_OPTIONS = "--openssl-legacy-provider"