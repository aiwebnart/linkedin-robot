# Robot LinkedIn - Antimétricas

Publica en el perfil personal una antimétrica diaria alrededor de las 10:20 Europe/Paris: imagen y copy aprobados. Cada `comment.md` se conserva únicamente como comentario manual opcional.

## Límites de uso

El robot usa exclusivamente la API oficial de LinkedIn con autorización OAuth del titular. No usa navegador automatizado, scraping, mensajes, conexiones, reacciones, lectura de perfiles, comentarios ni engagement artificial. La aplicación necesita `w_member_social` para publicar.

## Activación segura

1. Registra la aplicación en el Developer Portal y solicita el permiso de publicación indicado por LinkedIn.
2. Completa OAuth para tu perfil personal y guarda estos valores como GitHub Actions secrets, nunca en archivos:
   - `LINKEDIN_AUTOMATION_APPROVED` = `true`
   - `LINKEDIN_ACCESS_TOKEN`
   - `LINKEDIN_PERSON_URN`
   - `LINKEDIN_TOKEN_EXPIRES_AT`
   - `LINKEDIN_API_VERSION`
3. Ejecuta el workflow manualmente con `dry_run=true`. No realiza llamadas a LinkedIn.
4. Haz una prueba controlada con `dry_run=false` y una única pieza de prueba aprobada.
5. Solo después cambia `config/campaign.json` a `"enabled": true` y confirma ese cambio en GitHub.

## Proceso diario

1. El workflow se programa una vez al día a las 10:20 Europe/Paris. El script acepta ejecuciones retrasadas entre las 10:00 y las 12:59; la ejecución manual puede usar `--force`.
2. Selecciona la primera pieza aprobada no publicada.
3. Valida `post.md` e `image.png`.
4. Sube la imagen y espera 20 segundos para que LinkedIn termine de procesarla antes de crear el post.
5. Crea el post y registra el URN con estado `published`.
6. Si existe, muestra `comment.md` en el dry run como referencia; nunca lo publica automáticamente.

## Desarrollo

```powershell
npm run check
npm run dry-run
```

Las 17 carpetas en `content/antimetricas` contienen `post.md`, `image.png` y, actualmente, `comment.md` para uso manual opcional.
