# Contrato del orquestador

Entrada: configuracion de campana, registro de publicaciones y los tres archivos aprobados de la siguiente pieza: post.md, image.png y comment.md.

Orden obligatorio: catalogo -> preflight -> cargar imagen -> crear post -> persistir URN -> crear primer comentario -> auditoria.

Solo publica si la campana esta habilitada, existe autorizacion de API aprobada y el token esta vigente. Si el post se crea pero el comentario falla, conserva el estado `post_created`, bloquea el siguiente ciclo y exige revision humana. Nunca reintenta un post con resultado ambiguo.