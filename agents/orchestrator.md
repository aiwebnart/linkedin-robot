# Contrato del orquestador

Entrada: configuracion de campana, registro de publicaciones y los dos archivos requeridos de la siguiente pieza: post.md e image.png. comment.md es material manual opcional.

Orden obligatorio: catalogo -> preflight -> cargar imagen -> crear post -> persistir URN como published -> auditoria.

Solo publica si la campana esta habilitada, existe autorizacion de API aprobada y el token esta vigente. Nunca crea comentarios ni reintenta un post con resultado ambiguo.
