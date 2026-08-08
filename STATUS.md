# Estado operativo — Robot LinkedIn: Antimétricas

Actualizado: 2026-08-08

## Objetivo

Publicar una antimétrica aprobada al día alrededor de las 10:20 de Europa/París, mediante la API oficial de LinkedIn.

## Estado actual

- El repositorio privado `aiwebnart/linkedin-robot` está sincronizado con este ordenador.
- Node.js 24 está instalado y los tres tests pasan.
- El workflow recibe sus valores sensibles exclusivamente mediante GitHub Secrets; `.env` permanece fuera de Git.
- LinkedIn aceptó la creación de la antimétrica 01 el 2026-08-07 y devolvió un URN de post.
- Rodrigo confirmó el 2026-08-08 que la publicación 01 es visible en LinkedIn.
- El primer comentario automático falló con `403 ACCESS_DENIED` por falta de permiso para `partnerApiSocialActions.CREATE`.
- El registro conserva la pieza 01 con estado `post_created`, por lo que el robot bloquea la pieza 02 para evitar duplicados.
- La imagen asociada a la pieza 01 está `AVAILABLE` y pertenece al mismo miembro autenticado.

## Horario

GitHub Actions se programa una sola vez al día a las 10:20 con `timezone: Europe/Paris`. Se evita el minuto 00, donde GitHub documenta mayor congestión, y se admite que la ejecución comience algunos minutos después. El script mantiene el límite de la hora 10 para impedir publicaciones demasiado tardías.

## Siguiente acción

Resolver el estado de la pieza 01 y el comentario antes de permitir la publicación de la pieza 02. No debe eliminarse el registro `post_created` sin confirmar primero cómo se gestionará el comentario faltante.