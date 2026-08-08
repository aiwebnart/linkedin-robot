# Robot LinkedIn - Antimetricas

Publica en el perfil personal una antimetrica diaria alrededor de las 10:20 Europe/Paris: imagen, copy aprobado y primer comentario preaprobado con enlace al ensayo maestro.

## Limites de uso

El robot usa exclusivamente la API oficial de LinkedIn con autorizacion OAuth del titular. No usa navegador automatizado, scraping, mensajes, conexiones, reacciones, lectura de perfiles ni engagement artificial. La aplicacion debe obtener los permisos que LinkedIn apruebe para su caso de uso: `w_member_social` para publicar y `w_member_social_feed` para crear el comentario. La API documenta la gestion de posts y comentarios en perfiles individuales. Consulta [Profile Management](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/community-management-overview?view=li-lms-2026-05) y [Comments API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/comments-api?tabs=http&view=li-lms-2026-01).

## Activacion segura

1. Registra la aplicacion en el Developer Portal y solicita los productos/permisos indicados por LinkedIn.
2. Completa OAuth para tu perfil personal y guarda los valores como GitHub Actions secrets, nunca en archivos:
   - `LINKEDIN_AUTOMATION_APPROVED` = `true`
   - `LINKEDIN_ACCESS_TOKEN`
   - `LINKEDIN_PERSON_URN`
   - `LINKEDIN_TOKEN_EXPIRES_AT`
   - `LINKEDIN_API_VERSION`
3. Ejecuta el workflow manualmente con `dry_run=true`. No realiza llamadas a LinkedIn.
4. Haz una prueba controlada con `dry_run=false` y una unica pieza de prueba aprobada.
5. Solo despues cambia `config/campaign.json` a `"enabled": true` y confirma ese cambio en GitHub.

## Proceso diario

1. El workflow se programa una vez al dia a las 10:20 Europe/Paris. GitHub puede iniciarlo con algunos minutos de retraso.
2. Selecciona la primera pieza aprobada no publicada.
3. Valida `post.md`, `image.png` y `comment.md`.
4. Sube la imagen, crea el post y registra el URN recibido.
5. Crea de inmediato el primer comentario preaprobado usando el URN del post.
6. Guarda el estado en Git. Si el comentario falla, bloquea la serie para revision: nunca repite un post cuya creacion sea ambigua.

No existe en la API publica una operacion documentada para fijar comentarios; ese paso queda manual si deseas fijarlo.

## Desarrollo

```powershell
npm run check
npm run dry-run
```

Las 17 carpetas en `content/antimetricas` contienen `post.md`, `image.png` y `comment.md`.