# Asistente de publicaciones LinkedIn — Antimétricas

Este repositorio público prepara diariamente una de las 17 piezas aprobadas de la serie Antimétricas: imagen, copy y primer comentario con enlace al ensayo maestro. **No publica en LinkedIn ni usa credenciales de LinkedIn.**

## Por qué es manual

LinkedIn ofrece permisos técnicos para publicar mediante su API, pero sus [API Terms of Use](https://www.linkedin.com/legal/l/api-terms-of-use) prohíben usar las APIs para automatizar publicaciones. LinkedIn también prohíbe bots, extensiones y automatizaciones de navegador. Por ello este proyecto limita su función a preparar contenido y registrar confirmaciones manuales.

Permitido por este proyecto:

- Preparar contenido propio, aprobado y público.
- Publicar manualmente desde la interfaz nativa de LinkedIn.
- Llevar un registro local y público de qué pieza ya fue publicada.

No permitido:

- Llamadas a la API de LinkedIn, browser automation o scraping.
- Publicar, comentar, reaccionar, seguir, conectar o enviar mensajes automáticamente.
- Recoger perfiles, datos de terceros o crear engagement artificial.

Consulta siempre las reglas vigentes: [actividad automatizada](https://www.linkedin.com/help/linkedin/answer/a1341543) y [límites de API](https://learn.microsoft.com/en-us/linkedin/shared/api-guide/concepts/rate-limits).

## Operación diaria

1. El workflow prepara `state/today-preview.md` con la siguiente pieza pendiente.
2. Abre el archivo, sube manualmente la imagen y pega el copy en LinkedIn.
3. Publica el post y pega el contenido de `comment.md` como primer comentario.
4. Copia la URL pública del post y ejecuta:

```powershell
node src/mark-published.js --id 01 --url "https://www.linkedin.com/posts/..."
```

5. Confirma el cambio en GitHub. La siguiente ejecución preparará la pieza siguiente.

## Desarrollo

Requiere Node.js 20 o superior.

```powershell
npm run check
npm run prepare
```

El workflow se ejecuta cada día y no requiere secretos. Las 17 carpetas de `content/antimetricas` contienen `post.md`, `image.png` y `comment.md`.