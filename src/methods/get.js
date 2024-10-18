import { validate as uuidValidate } from 'uuid';

export default function Get(req, res) {
    // Извлекаем путь без параметров из запроса
    const pathname = req.query.pathname;

    switch (pathname) {
        case "/users":
            // Проверяем, есть ли параметр id в запросе
            const userId = req.query.searchParams.get("id");
            if (userId) {
                // Проверка валидности UUID
                if (!uuidValidate(userId)) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('userId is invalid');
                    return;
                }

                // Ищем пользователя по id
                const user = req.users.find((user) => user.id === userId);

                if (user) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(user));
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end("record with id === userId doesn't exist");
                }
            } else {
                // Если id не указан, возвращаем всех пользователей
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(req.users));
            }
            break;

        default:
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Route is not found');
    }
}
