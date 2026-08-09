# Reglas del robot LinkedIn

- El copy y la imagen de cada antimetrica son aprobados e inmutables. `comment.md` se conserva solo como comentario manual opcional.
- Solo publica una pieza con estado `approved` y sin registro previo.
- El unico canal de LinkedIn permitido es la API oficial con OAuth de miembro y permisos aprobados para esta aplicacion.
- Quedan prohibidos browser automation, scraping, mensajes, conexiones, reacciones o comentarios a publicaciones de terceros.
- La publicacion se bloquea hasta que `campaign.enabled` y `LINKEDIN_AUTOMATION_APPROVED` sean verdaderos.
- Tras crear el post se registra inmediatamente su URN y el estado `published`. El robot nunca crea comentarios.
- Ningun secreto se guarda, imprime o confirma en Git.
