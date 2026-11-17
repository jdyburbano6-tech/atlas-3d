# Atlas ETM V61 · Neuroanatomía 3D

1. Descomprime el ZIP completo.
2. Abre la carpeta `Atlas_ETM_V61` en Visual Studio Code.
3. Abre `index.html` con la extensión **Live Server**.

## Recorrido didáctico

1. El recorrido inicial es lineal hasta la corteza temporal posterolateral del hemisferio de inicio. Dentro de la etapa temporal se muestran amígdala, giro parahipocampal, polo temporal y corteza posterolateral en ese orden.
2. El primer destino tras el cruce es la corteza temporal posterolateral contralateral. Después se reclutan otras regiones temporales del mismo lado.
3. La llegada a la corteza orbitofrontal marca la transición a una extensión de red. Circuito talámico, ínsula y cíngulo medio/precúneo tienen activaciones superpuestas, con la posibilidad de inspeccionar cada etapa por separado. La rama orbitofrontal del modelo usa el uncinado del hemisferio de inicio.

La temporización es ilustrativa. Las cápsulas para la rama insular son referencias del esquema y su trayecto queda indeterminado en el visor.

## Animación de crisis

El visor abre con el cerebro completo. Durante la reproducción, la corteza de contexto se atenúa y la cámara se orienta hacia las estructuras incorporadas y amplía la vista al empezar la extensión de red. En cada conexión la cámara encuadra el origen, pasa al destino y sostiene el enfoque. Las regiones previas mantienen su color con menor intensidad.

**Ver origen de la rama** pausa la animación en el origen del tramo actual. **Reproducir** continúa desde allí. La línea de tiempo permite abrir cada etapa. Los fascículos uncinado y fórnix tienen filamentos ilustrativos trazados sobre las mallas del atlas. En las conexiones cuya vía exacta queda indeterminada se señalan las regiones, sin animar un pulso sobre un fascículo específico.

## Propagación

La opción predeterminada es **Ruta completa de crisis**. La vista de nodos usa las nueve etapas y los colores de **Animación de crisis**. Elige el hemisferio de origen y pulsa **Iluminar propagación**, o selecciona un número del 1 al 9 para pausar en esa etapa. Los nodos del uncinado y del fórnix se incorporan al finalizar la ruta. El subículo se indica con puntos de referencia en la superficie hipocampal próxima al marcador del modelo. Los otros patrones siguen disponibles. En **Ir a una estructura**, elige la región y el lado para centrar la cámara y resaltar sus nodos. Pulsa **Vista general** para volver.

Las etapas alcanzadas permanecen iluminadas. El ajuste de brillo permite destacar la etapa nueva o acercar su brillo al de las anteriores. La densidad empieza en **120.000 nodos** y llega hasta **2.000.000**. El ajuste de calidad controla la resolución del visor.

La secuencia de crisis y los nodos son modelos didácticos.

## Cierre y atlas

El uncinado y el fórnix aparecen al terminar el recorrido. Cada fascículo del hemisferio de inicio se dibuja con 1.024 líneas ilustrativas, generadas a partir de 64 trazos de base (16 líneas por trazo). Usa **Ir al cierre** para abrir esa vista directamente. En **Propagación**, los nodos de esos dos tractos también se revelan al terminar la ruta completa.

En **Atlas cerebral**, el interruptor **Áreas corticales** activa el color por región. Todas las capas anatómicas empiezan seleccionadas y puedes activarlas o desactivarlas por separado.
