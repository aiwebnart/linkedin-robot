# Contrato del orquestador

Entrada: campaña, registro de publicaciones y par de archivos de la siguiente pieza aprobada.

Orden obligatorio: catálogo → preflight → comentario → publicación de imagen y post → comentario → auditoría.

Salidas: registro `published` con URNs de post, comentario e imagen, o fallo explícito sin publicación duplicada.

Detener el flujo si faltan archivos, autorización, enlace maestro, comentario válido o ID de post. Nunca sustituir contenido aprobado ni continuar tras una respuesta ambigua.
