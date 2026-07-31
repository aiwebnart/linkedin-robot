# Estado operativo — Robot LinkedIn: Antimétricas

Actualizado: 2026-07-31

## Objetivo

Publicar una antimétrica aprobada al día, a las 10:00 de Europa/París, en el perfil personal de Rodrigo. La automatización solo puede usar la API oficial de LinkedIn y debe publicar el primer comentario aprobado inmediatamente después del post.

## Principio de activación

GitHub es el entorno de automatización. El archivo `.env` local sirve únicamente para preparación y comprobaciones locales; no sustituye a GitHub Actions ni contiene valores que deban subirse al repositorio.

No se realizará ninguna publicación ni prueba real en LinkedIn sin autorización explícita de Rodrigo después de completar el proceso seguro de GitHub.

## Estado actual

- El repositorio privado `aiwebnart/linkedin-robot` está conectado al remoto `origin` y la rama `main` está subida a GitHub.
- El workflow `.github/workflows/publish-daily.yml` está corregido para la estructura real del repositorio y ya está publicado en GitHub.
- El workflow recibe los valores sensibles exclusivamente mediante GitHub Secrets. No se registran secretos ni valores secretos en este documento ni en Git.
- El workflow manual con `dry_run=true` terminó correctamente en GitHub Actions el 2026-07-31. No realizó llamadas de publicación a LinkedIn.
- La campaña continúa desactivada (`config/campaign.json` tiene `enabled: false`) y el registro de publicaciones está vacío. No se ha publicado ninguna pieza mediante el robot.
- La ejecución mostró una advertencia informativa de GitHub sobre Node.js 20 usado internamente por acciones oficiales. La ejecución fue correcta; no es un error de publicación ni requiere cambiar nada ahora.

## Bloqueos de seguridad activos

Una publicación real permanece bloqueada mientras:

- `config/campaign.json` tenga `enabled: false`.
- El Secret `LINKEDIN_AUTOMATION_APPROVED` no tenga el valor `true`.

Por tanto, las ejecuciones programadas no pueden publicar mientras estos bloqueos sigan activos.

## Siguiente acción

No hay que realizar ninguna acción adicional en LinkedIn ahora. El próximo paso solo se hará con autorización explícita: preparar una prueba controlada de una única publicación mediante el workflow manual con `dry_run=false`. Antes de ello se revisarán de nuevo la pieza elegida y los bloqueos de seguridad.