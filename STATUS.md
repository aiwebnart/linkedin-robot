# Estado operativo — Robot LinkedIn: Antimétricas

Actualizado: 2026-07-31

## Objetivo

Publicar una antimétrica aprobada al día, a las 10:00 de Europa/París, en el perfil personal de Rodrigo. La automatización solo puede usar la API oficial de LinkedIn y debe publicar el primer comentario aprobado inmediatamente después del post.

## Principio de activación

GitHub es el entorno de automatización. El archivo `.env` local sirve únicamente para preparación y comprobaciones locales; no sustituye a GitHub Actions ni contiene valores que deban subirse al repositorio.

No se realizará ninguna publicación ni prueba real en LinkedIn hasta completar y validar primero la etapa de GitHub.

## Estado actual

- El proyecto es un repositorio Git local en esta carpeta, pero todavía no tiene remoto configurado; por tanto, aún no está conectado a un repositorio de GitHub.
- Existe un workflow en `.github/workflows/publish-daily.yml`, pero necesita ajuste antes de subirlo: como este repositorio ya es `linkedin-robot`, sus rutas no deben anteponer `linkedin-robot/`.
- El workflow está pensado para recibir los valores sensibles mediante GitHub Secrets. No se registran secretos en este documento ni en Git.
- La campaña está desactivada (`config/campaign.json` tiene `enabled: false`) y el registro de publicaciones está vacío. No se ha publicado ninguna pieza mediante el robot.
- La configuración OAuth se ha preparado localmente y el ensayo local en modo `dry-run` ha funcionado. Esto no realizó llamadas de publicación a LinkedIn.

## Orden obligatorio a partir de ahora

1. Crear o elegir el repositorio privado de GitHub para `linkedin-robot` y conectar el remoto.
2. Corregir y subir el workflow de GitHub Actions.
3. Añadir en GitHub Secrets, sin copiarlos a archivos versionados:
   - `LINKEDIN_AUTOMATION_APPROVED` (mantener `false` durante la validación)
   - `LINKEDIN_ACCESS_TOKEN`
   - `LINKEDIN_PERSON_URN`
   - `LINKEDIN_TOKEN_EXPIRES_AT`
   - `LINKEDIN_API_VERSION`
4. Ejecutar manualmente el workflow con `dry_run=true` y comprobar que finaliza correctamente. Esta ejecución no llama a LinkedIn.
5. Solo con autorización explícita, preparar la prueba controlada de publicación: revisar una pieza, activar temporalmente los bloqueos requeridos y ejecutar el workflow manual con `dry_run=false`.
6. Tras una prueba correcta y autorización explícita, activar `campaign.enabled` para el calendario diario.

## Siguiente acción

Preparar la conexión con GitHub. Antes de modificar LinkedIn o activar la campaña, debe existir un remoto de GitHub y el `dry-run` debe haber pasado dentro de GitHub Actions.
