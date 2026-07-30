# Reglas del robot LinkedIn

- El copy, imagen y comentario de cada antimetrica son aprobados e inmutables.
- Solo publica una pieza con estado `approved` y sin registro previo.
- El unico canal de LinkedIn permitido es la API oficial con OAuth de miembro y permisos aprobados para esta aplicacion.
- Quedan prohibidos browser automation, scraping, mensajes, conexiones, reacciones o comentarios a publicaciones de terceros.
- La publicacion se bloquea hasta que `campaign.enabled` y `LINKEDIN_AUTOMATION_APPROVED` sean verdaderos.
- Tras crear el post se registra su URN antes de crear el comentario. Si el comentario falla, la campana queda bloqueada para impedir duplicados.
- Ningun secreto se guarda, imprime o confirma en Git.