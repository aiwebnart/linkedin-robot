# Estado operativo — Robot LinkedIn: Antimétricas

Actualizado: 2026-08-09

## Objetivo

Publicar una antimétrica aprobada al día alrededor de las 10:20 de Europa/París, mediante la API oficial de LinkedIn.

## Estado actual

- El robot publica únicamente la imagen y el copy; se eliminaron todos los comentarios automáticos.
- `comment.md` se conserva en cada pieza como comentario manual opcional y no condiciona la publicación.
- LinkedIn aceptó la creación de la antimétrica 01 el 2026-08-07 y devolvió el URN `urn:li:share:7491414102670602240`.
- Rodrigo confirmó el 2026-08-08 que la publicación 01 es visible en LinkedIn.
- La pieza 01 está registrada con estado `published`; el fallo histórico `403 ACCESS_DENIED` del comentario ya no bloquea la campaña.
- El único scope requerido por la campaña es `w_member_social`.
- La siguiente pieza aprobada no publicada es la 02, `tasa-de-delegacion-inversa`.
- El control horario ya no exige la hora 10 exacta: acepta cualquier inicio entre las 10:00 y las 12:59 de Europe/Paris.
- Después de subir una imagen, el robot espera 20 segundos antes de crear el post para permitir su procesamiento en LinkedIn.

## Horario

GitHub Actions se programa una sola vez al día a las 10:20 con `timezone: Europe/Paris`. Si GitHub retrasa el job, puede arrancar hasta las 12:59 sin ser descartado. A partir de las 13:00 no publica automáticamente; una ejecución manual autorizada puede usar `--force`.

## Siguiente acción

La campaña queda lista para que el siguiente ciclo publique la pieza 02. Si se desea añadir su comentario, debe copiarse manualmente desde `content/antimetricas/02-tasa-de-delegacion-inversa/comment.md`.
