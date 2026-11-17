// Atlas ETM · Fichas anatómicas. Las referencias de revisión se muestran en Créditos.
(() => {
  "use strict";

  const legacy = {
  "Posterior transverse collateral sulcus": {
    "region": "Superficie inferior temporal y occipital",
    "relations": "Surco transversal variable de la región colateral posterior, próximo al giro fusiforme.",
    "function": "Sirve de referencia para distinguir pliegues de la superficie ventral temporooccipital.",
    "limits": "Cruza o se relaciona con el extremo posterior del sistema colateral. Su continuidad y forma varían."
  },
  "Angular gyrus": {
    "region": "Lobulillo parietal inferior, cara lateral",
    "relations": "Rodea la terminación posterior del surco temporal superior. Queda detrás del giro supramarginal.",
    "function": "Integra información semántica y de varias modalidades. En el hemisferio dominante contribuye a la lectura y al procesamiento de significados.",
    "limits": "Por debajo del intraparietal, detrás de la región supramarginal y delante de la transición occipital. El surco de Jensen puede separar los dos giros parietales inferiores."
  },
  "Anterior occipital sulcus": {
    "region": "Unión parietooccipital lateral",
    "relations": "Surco variable cerca del borde anterior de la superficie occipital lateral.",
    "function": "Es un reparo topográfico para ubicar la transición parietooccipital.",
    "limits": "Su identificación y extensión son variables. La línea entre el surco parietooccipital y la incisura preoccipital es el límite lobar convencional."
  },
  "Calcarine sulcus": {
    "region": "Cara medial del lóbulo occipital",
    "relations": "Separa la cuña, por arriba, del giro lingual, por abajo. Se une al surco parietooccipital anteriormente.",
    "function": "Sus bancos alojan corteza visual primaria. El banco superior representa el campo visual inferior y el inferior, el superior, en ambos casos del hemicampo contralateral.",
    "limits": "Se extiende hacia el polo occipital. La representación central del campo visual se aproxima al polo."
  },
  "Central sulcus": {
    "region": "Límite frontal–parietal, cara superolateral",
    "relations": "Separa el giro precentral del poscentral. Su extremo superior puede alcanzar el lobulillo paracentral.",
    "function": "Es el reparo principal entre la corteza motora primaria anterior y la somatosensorial primaria posterior.",
    "limits": "Desciende oblicuamente desde el borde superomedial hacia el surco lateral y normalmente termina antes de alcanzarlo."
  },
  "Cingulate gyrus (Posteroventral part)": {
    "region": "Corteza cingulada posterior ventral, cara medial",
    "relations": "Sector ventral del cíngulo posterior cercano al esplenio y a la corteza retrosplenial.",
    "function": "Participa en redes de memoria episódica y contextual y en el procesamiento de información autorreferencial.",
    "limits": "Se sitúa sobre o alrededor del extremo posterior del cuerpo calloso, por debajo del sector posterodorsal y próxima al istmo."
  },
  "Cingulate gyrus and sulcus (Middle anterior part)": {
    "region": "Cíngulo medio anterior, cara medial frontal",
    "relations": "Sector situado por encima del cuerpo calloso y en continuidad con el cíngulo anterior.",
    "function": "Participa en selección de acciones, esfuerzo y ajustes conductuales ante demandas relevantes, incluido el dolor.",
    "limits": "Lo separa del cuerpo calloso el surco calloso. Superiormente se relaciona con el surco del cíngulo y medialmente con la pared hemisférica."
  },
  "Cingulate gyrus and sulcus (Middle posterior part)": {
    "region": "Cíngulo medio posterior, cara medial",
    "relations": "Sector posterior del cíngulo medio, próximo al lobulillo paracentral, por delante del cíngulo posterior.",
    "function": "Interviene en circuitos cingulomotores y en la orientación de respuestas corporales ante estímulos relevantes.",
    "limits": "Se relaciona inferiormente con el surco calloso y superiormente con el surco cingulado y su rama marginal."
  },
  "Cingulate gyrus and sulcus (Posterior dorsal part)": {
    "region": "Cíngulo posterior dorsal, cara medial parietal",
    "relations": "Está sobre el esplenio, vecino al precúneo y al cíngulo posterior ventral.",
    "function": "Integra procesos de atención interna y memoria en redes que incluyen el precúneo y la corteza medial temporal.",
    "limits": "El surco subparietal ayuda a separarlo del precúneo y el surco calloso separa el giro del cuerpo calloso."
  },
  "Cingulate sulcus (Marginal part)": {
    "region": "Cara medial frontoparietal",
    "relations": "Es la rama ascendente posterior del surco cingulado. Está entre el lobulillo paracentral y el precúneo.",
    "function": "Sirve de reparo para distinguir la región sensoriomotora medial de la corteza parietal medial posterior.",
    "limits": "Nace del surco cingulado y asciende hacia el borde superomedial del hemisferio."
  },
  "Circular sulcus of insula": {
    "region": "Profundidad del surco lateral",
    "relations": "Rodea la ínsula por delante, arriba y atrás. Sus bancos contactan con los opérculos vecinos.",
    "function": "Delimita la corteza insular y sirve de referencia para encontrarla bajo los opérculos.",
    "limits": "Tiene porciones anterior, superior y posterior. Inferiormente su contorno se interrumpe en el limen insular."
  },
  "Collateral sulcus": {
    "region": "Cara inferior temporooccipital",
    "relations": "Separa el giro fusiforme lateralmente de los giros parahipocampal y lingual medialmente, según el nivel.",
    "function": "Es un reparo de la transición entre corteza visual ventral lateral y región temporooccipital medial.",
    "limits": "Discurre longitudinalmente en la cara basal. Su extremo anterior puede aproximarse o continuar con el surco rinal."
  },
  "Cuneus": {
    "region": "Cara medial del lóbulo occipital",
    "relations": "Cuña triangular situada sobre el giro lingual, detrás del precúneo.",
    "function": "Sus zonas visuales participan en el procesamiento del hemicampo contralateral. Cerca del banco superior calcarino se representa el campo visual inferior.",
    "limits": "Surco parietooccipital por delante, calcarino por abajo y borde superomedial por arriba."
  },
  "Hippocampus": {
    "region": "Lóbulo temporal medial, formación hipocampal",
    "relations": "Ocupa parte del piso del asta temporal del ventrículo lateral. La fimbria discurre por su borde medial y continúa con el fórnix.",
    "function": "Organiza la codificación y consolidación de recuerdos episódicos y aporta información espacial y contextual.",
    "limits": "Cabeza próxima a la amígdala, cuerpo a lo largo del asta temporal y cola hacia el esplenio. La malla representa el hipocampo en conjunto.",
    "note": "La selección corresponde a la malla general del hipocampo. Los campos CA, el giro dentado y el subículo no se distinguen como piezas independientes aquí.",
    "summary": "Estructura alargada del temporal medial que forma parte del sistema de memoria."
  },
  "Inferior occipital gyrus and sulcus": {
    "region": "Cara lateral e inferior del lóbulo occipital",
    "relations": "Complejo del giro occipital inferior y su surco, vecino al giro occipital lateral y a la cara ventral occipitotemporal.",
    "function": "Las zonas corticales vecinas intervienen en el análisis visual de forma y en el reconocimiento de estímulos; la función se distribuye entre varias áreas.",
    "limits": "Los surcos occipitales inferiores son variables. Superiormente se aproxima al giro occipital lateral y basalmente a la transición hacia el fusiforme."
  },
  "Inferior temporal gyrus": {
    "region": "Cara inferolateral del lóbulo temporal",
    "relations": "Debajo del giro temporal medio y lateral al fusiforme en la cara ventral.",
    "function": "Participa en el reconocimiento visual de objetos y en el acceso a su significado como parte de la vía visual ventral.",
    "limits": "Surco temporal inferior hacia el giro temporal medio y surco occipitotemporal hacia el fusiforme, con límites posteriores variables."
  },
  "Insula (Subcentral gyrus and ant. and post. sulci)": {
    "region": "Región perirolándica inferior, junto al surco lateral",
    "relations": "El giro subcentral une por abajo los giros precentral y poscentral en el opérculo. El rótulo original de esta malla también menciona la ínsula.",
    "function": "Los sectores perirolándicos vecinos intervienen en control y sensibilidad de la cara y la boca. La función específica de la superficie combinada requiere identificar sus componentes.",
    "limits": "Giro adyacente al extremo inferior del surco central entre los surcos subcentrales. Su geometría requiere revisión antes de usarla como límite insular.",
    "note": "Esta superficie tiene un rótulo ambiguo en el modelo. La parcela insular de resonancia se puede buscar como «Corteza insular»."
  },
  "Lat Fis-ant-Horizont": {
    "region": "Opérculo frontal, fosa lateral",
    "relations": "Rama anterior horizontal del surco lateral, entre las porciones triangular y orbitaria del giro frontal inferior.",
    "function": "Funciona como reparo para reconocer las subdivisiones del giro frontal inferior.",
    "limits": "Parte del extremo anterior del surco lateral y avanza hacia delante en la superficie frontal inferior."
  },
  "Lat Fis-ant-Vertical": {
    "region": "Opérculo frontal, fosa lateral",
    "relations": "Rama anterior ascendente del surco lateral. La porción opercular queda detrás y la triangular delante.",
    "function": "Es el reparo macroscópico para separar las porciones opercular y triangular.",
    "limits": "Nace en la región anterior del surco lateral y asciende hacia el surco frontal inferior con extensión variable."
  },
  "Lat Fis-post": {
    "region": "Cara lateral del hemisferio",
    "relations": "Separa frontal y parietal por arriba del temporal por abajo. En profundidad aloja la ínsula bajo los opérculos.",
    "function": "Organiza la topografía perisilviana y contiene en su profundidad ramas de la arteria cerebral media.",
    "limits": "Se dirige hacia atrás desde la región del limen e insinúa su extremo posterior junto al giro supramarginal."
  },
  "Lateral occipital gyrus (Middle occipital gyrus)": {
    "region": "Cara lateral del lóbulo occipital",
    "relations": "Giro asociativo entre la convexidad occipital superior e inferior, detrás de la unión parietooccipital.",
    "function": "Participa en análisis visual de forma y objetos como parte de la corteza visual extraestriada lateral.",
    "limits": "Los surcos occipitales laterales separan porciones superiores e inferiores con una disposición variable."
  },
  "Lateral occipitotemporal gyrus": {
    "region": "Cara inferior temporooccipital",
    "relations": "El fusiforme se encuentra medial al giro temporal inferior y lateral a los giros parahipocampal y lingual.",
    "function": "Participa en reconocimiento visual de alta complejidad. Hay zonas con selectividad para caras y, en el hemisferio dominante, para formas ortográficas.",
    "limits": "Entre el surco colateral, medial, y el occipitotemporal, lateral. El surco fusiforme medio puede subdividir su superficie.",
    "summary": "También llamado giro fusiforme por su forma de huso en la cara inferior cerebral."
  },
  "Lingual gyrus": {
    "region": "Cara medial e inferior del lóbulo occipital",
    "relations": "Debajo del surco calcarino, medial al fusiforme, con continuidad anterior hacia la región parahipocampal.",
    "function": "Participa en análisis visual de patrones y escenas. Su banco calcarino inferior incluye corteza que representa el campo visual superior contralateral.",
    "limits": "Calcarino por arriba y colateral por abajo o lateralmente. Se prolonga hacia el polo occipital."
  },
  "Lunate sulcus": {
    "region": "Cara occipital lateral",
    "relations": "Surco arqueado inconstante cerca del polo y de los giros occipitales laterales.",
    "function": "Es un reparo morfológico variable. Su posición por sí sola ofrece información limitada sobre las fronteras entre áreas visuales.",
    "limits": "Puede presentarse fragmentado o ausente, con orientación y extensión variables entre hemisferios."
  },
  "Medial occipitotemporal gyrus (Parahippocampal)": {
    "region": "Superficie inferior del lóbulo temporal medial",
    "relations": "Giro cortical por debajo de la formación hipocampal y medial al fusiforme. Su extremo anterior se curva en el uncus.",
    "function": "Contribuye a la memoria de contextos y escenas. Su porción anterior participa en el intercambio de información con la formación hipocampal.",
    "limits": "Surco colateral por fuera; surco hipocampal y región del subículo por dentro. Se continúa posteriormente con el giro lingual."
  },
  "Middle frontal gyrus": {
    "region": "Cara lateral del lóbulo frontal",
    "relations": "Giro longitudinal entre los giros frontal superior e inferior, anterior al precentral.",
    "function": "La región anterior contribuye a memoria de trabajo y control ejecutivo. Los sectores caudales se relacionan con atención, preparación y control de acciones.",
    "limits": "Surco frontal superior por arriba, frontal inferior por abajo y región precentral por detrás. La división rostral–caudal depende de la parcelación."
  },
  "Middle temporal gyrus": {
    "region": "Cara lateral del lóbulo temporal",
    "relations": "Está entre los giros temporal superior e inferior y se aproxima por detrás a la unión temporoparietal.",
    "function": "Participa en redes de acceso semántico y comprensión. En sectores posteriores también integra información visual, auditiva y contextual.",
    "limits": "Entre los surcos temporales superior e inferior. Se continúa hacia el polo temporal delante y hacia la transición occipital detrás."
  },
  "Occipital pole": {
    "region": "Extremo posterior del lóbulo occipital",
    "relations": "Punto posterior del hemisferio donde convergen las caras lateral, medial e inferior del occipital.",
    "function": "En la corteza visual primaria próxima al polo se representan la fóvea y la visión central con alta resolución.",
    "limits": "Se relaciona con la terminación posterior del surco calcarino y con los giros occipitales y lingual."
  },
  "Occipitotemporal sulcus (Lateral part)": {
    "region": "Cara inferior temporooccipital",
    "relations": "Surco longitudinal lateral al fusiforme, entre este giro y la corteza temporal inferior en su sector temporal.",
    "function": "Permite localizar el borde lateral del fusiforme dentro de la vía visual ventral.",
    "limits": "Discurre en dirección anteroposterior por la cara basal; el surco colateral recorre el lado medial del fusiforme."
  },
  "Orbital gyri (Frontomarginal gyrus and sulcus)": {
    "region": "Borde anterior orbitofrontal",
    "relations": "Complejo de giro y surco frontomarginal en la transición entre la cara orbitaria y el polo frontal.",
    "function": "Es un reparo de la superficie frontal. La corteza vecina participa en redes prefrontales de evaluación y decisión.",
    "limits": "Se dispone transversalmente cerca del borde anterior de los giros orbitarios. Su patrón de ramificación es variable."
  },
  "Orbital gyri": {
    "region": "Cara inferior del lóbulo frontal, sobre las órbitas",
    "relations": "Giros alrededor del surco orbitario en H, laterales al surco olfatorio y al giro recto.",
    "function": "La corteza orbitofrontal integra señales sensoriales y aprendizajes previos para estimar el valor esperado de resultados y guiar decisiones.",
    "limits": "Surco olfatorio medialmente, borde orbitario lateralmente y región del limen hacia atrás. El patrón en H distingue giros orbitarios."
  },
  "Orbital part of inferior frontal gyrus": {
    "region": "Giro frontal inferior, porción ventral",
    "relations": "Porción anterior e inferior del giro frontal inferior, contigua a la corteza orbitofrontal lateral.",
    "function": "Puede contribuir al acceso y selección de información semántica en el hemisferio dominante. Sus conexiones también la vinculan con redes frontotemporales.",
    "limits": "La rama horizontal anterior del surco lateral la separa de la porción triangular que queda por encima."
  },
  "Orbital sulci (H-shaped orbital sulci)": {
    "region": "Cara orbitaria del lóbulo frontal",
    "relations": "Conjunto variable de surcos que dibujan una H, lateral al surco olfatorio.",
    "function": "Distingue los giros orbitarios anterior, posterior, medial y lateral en la inspección de la base frontal.",
    "limits": "Ramas medial y lateral aproximadamente longitudinales, unidas por un tramo transversal de conexión."
  },
  "Orbital sulci (Lateral Orbital sulcus)": {
    "region": "Superficie orbitofrontal lateral",
    "relations": "Rama longitudinal lateral del sistema de surcos orbitarios en H.",
    "function": "Sirve de reparo para localizar el giro orbitario lateral y la transición hacia el frontal inferior.",
    "limits": "Corre en la cara orbitaria al lado lateral de la rama transversal; puede presentar interrupciones."
  },
  "Paracentral gyrus and sulcus": {
    "region": "Lobulillo paracentral, cara medial frontoparietal",
    "relations": "La región rodea la prolongación medial del surco central. Es continua con los extremos de los giros precentral y poscentral.",
    "function": "Aloja componentes motores y somatosensoriales de la pierna y el pie contralaterales, a lados opuestos del surco central.",
    "limits": "Surco paracentral por delante, rama marginal del cíngulo por detrás y surco cingulado por debajo."
  },
  "Postcentral gyrus": {
    "region": "Lóbulo parietal anterior, cara lateral",
    "relations": "Relieve situado inmediatamente detrás del surco central, opuesto al giro precentral.",
    "function": "Contiene gran parte de la corteza somatosensorial primaria. Analiza tacto, presión y propiocepción del lado contralateral en un mapa corporal.",
    "limits": "Entre los surcos central y poscentral; termina cerca del surco lateral por abajo y se continúa medialmente en el lobulillo paracentral."
  },
  "Precentral gyrus": {
    "region": "Lóbulo frontal posterior, cara lateral",
    "relations": "Relieve situado justo delante del surco central, frente al giro poscentral.",
    "function": "Contiene gran parte de la corteza motora primaria. Sus neuronas contribuyen a ejecutar movimientos voluntarios, especialmente movimientos finos, del lado opuesto.",
    "limits": "Surco precentral por delante y central por detrás. Continúa medialmente con el sector anterior del lobulillo paracentral."
  },
  "Precuneus": {
    "region": "Lóbulo parietal medial",
    "relations": "Está entre el lobulillo paracentral y la cuña, por encima del cíngulo posterior.",
    "function": "Participa en orientación visuoespacial, representación interna de escenas y recuperación de recuerdos episódicos en redes mediales.",
    "limits": "Rama marginal cingulada por delante, surco parietooccipital por detrás y subparietal por debajo."
  },
  "Inferior frontal sulcus": {
    "region": "Cara lateral del lóbulo frontal",
    "relations": "Separa los giros frontal medio e inferior. Su extremo posterior se aproxima al surco precentral inferior.",
    "function": "Sirve de límite topográfico para orientar la transición entre corteza frontal lateral media y frontal inferior.",
    "limits": "Trayecto longitudinal habitualmente discontinuo. Puede confluir con el surco precentral."
  },
  "Inferior temporal sulcus": {
    "region": "Cara lateral e inferior del lóbulo temporal",
    "relations": "Separa el giro temporal medio del inferior en la convexidad temporal.",
    "function": "Referencia anatómica para distinguir dos giros que aportan, respectivamente, a redes temporales semánticas y visuales de asociación.",
    "limits": "Longitudinal, a menudo formado por segmentos discontinuos que varían entre hemisferios."
  },
  "Intraparietal sulcus": {
    "region": "Cara lateral del lóbulo parietal",
    "relations": "Discurre hacia atrás desde la región poscentral, entre lobulillos parietales superior e inferior.",
    "function": "Es el reparo de varias áreas parietales involucradas en atención espacial, orientación de la mirada y coordinación ojo–mano.",
    "limits": "Delimita ambos lobulillos. Su extremo posterior puede continuar con el surco occipital transverso."
  },
  "Olfactory sulcus": {
    "region": "Cara orbitaria medial del lóbulo frontal",
    "relations": "Entre el giro recto medial y los giros orbitarios laterales. Aloja el bulbo y el tracto olfatorios.",
    "function": "Es un reparo del trayecto olfatorio basal y de la separación entre giro recto y superficie orbitaria.",
    "limits": "Se extiende longitudinalmente cerca de la fisura interhemisférica, hacia la sustancia perforada anterior."
  },
  "Opercular part of inferior frontal gyrus": {
    "region": "Giro frontal inferior, porción posterior",
    "relations": "Sector opercular adyacente a la región precentral ventral y a la ínsula subyacente.",
    "function": "En el hemisferio dominante contribuye a circuitos de procesamiento fonológico y planificación articulatoria. Otras redes incluyen control de acciones.",
    "limits": "Entre el surco precentral inferior hacia caudal y la rama anterior ascendente del surco lateral hacia rostral."
  },
  "Paracentral sulcus": {
    "region": "Cara medial posterior del lóbulo frontal",
    "relations": "Surco próximo al extremo medial del giro precentral. Marca el borde anterior del lobulillo paracentral.",
    "function": "Sirve para ubicar la transición entre frontal medial anterior y territorio sensoriomotor medial.",
    "limits": "Se desprende habitualmente del surco cingulado y asciende hacia el borde superior medial."
  },
  "Parieto-occipital sulcus": {
    "region": "Cara medial, unión parietooccipital",
    "relations": "Separa el precúneo anterior de la cuña posterior. Su extremo inferior suele confluir con el surco calcarino.",
    "function": "Es la referencia anatómica principal para distinguir parietal medial de occipital medial.",
    "limits": "Desciende desde el borde superomedial y se dirige hacia el surco calcarino, con una pequeña proyección lateral variable."
  },
  "Postcentral sulcus": {
    "region": "Lóbulo parietal anterior, cara lateral",
    "relations": "Está detrás del giro poscentral y por delante de los lobulillos parietales. Se aproxima al surco intraparietal.",
    "function": "Delimita posteriormente el giro que aloja gran parte de la corteza somatosensorial primaria.",
    "limits": "Suele ser segmentado, aproximadamente paralelo al central. Puede unirse con el intraparietal."
  },
  "Precentral sulcus (inferior part)": {
    "region": "Lóbulo frontal posterior, cara lateral inferior",
    "relations": "Segmento inferior del surco precentral, detrás del frontal inferior y delante del precentral.",
    "function": "Referencia para localizar la corteza premotora ventrolateral y el precentral inferior.",
    "limits": "Suele quedar cerca del extremo posterior del surco frontal inferior, superior al surco lateral."
  },
  "Precentral sulcus (Superior part)": {
    "region": "Lóbulo frontal posterior, cara lateral superior",
    "relations": "Segmento superior del surco precentral, por delante del precentral dorsal y detrás del frontal superior o medio.",
    "function": "Referencia útil para ubicar la transición entre zonas premotoras dorsales y la corteza del giro precentral.",
    "limits": "Se relaciona con la terminación posterior del surco frontal superior; puede separarse del segmento inferior."
  },
  "Straight gyrus (Gyrus rectus)": {
    "region": "Cara basal medial del lóbulo frontal",
    "relations": "Giro longitudinal entre el surco olfatorio, lateral, y el borde medial hemisférico.",
    "function": "Es parte de la región orbitofrontal medial, asociada a redes de valoración y regulación de la conducta. El bulbo olfatorio está en el surco vecino.",
    "limits": "Fisura interhemisférica por dentro y surco olfatorio por fuera, con prolongación posterior hacia la base frontal medial."
  },
  "Subparietal sulcus": {
    "region": "Cara medial parietal y cingulada posterior",
    "relations": "Surco entre el precúneo superior y el giro cingulado posterior inferior.",
    "function": "Distingue dos territorios de asociación medial, más vinculados respectivamente a integración parietal y redes cinguladas de memoria.",
    "limits": "Se dirige hacia el entorno del surco parietooccipital y puede presentar ramas o interrupciones."
  },
  "Sulcus interm prim-Jensen": {
    "region": "Lobulillo parietal inferior, cara lateral",
    "relations": "Surco intermedio primario de Jensen, frecuente entre las regiones supramarginal y angular.",
    "function": "Sirve para distinguir sectores anterior y posterior del lobulillo parietal inferior.",
    "limits": "Parte del intraparietal o de su vecindad, desciende casi perpendicular y suele terminar antes de alcanzar el temporal."
  },
  "Superior frontal gyrus": {
    "region": "Lóbulo frontal superior, caras lateral y medial",
    "relations": "Giro situado por encima del frontal medio y prolongado a la cara medial sobre el cíngulo.",
    "function": "Sus regiones anteriores participan en control cognitivo. Los sectores mediales posteriores incluyen áreas premotoras relacionadas con la organización de secuencias.",
    "limits": "Surco frontal superior lateralmente, cingulado en la cara medial y región precentral por detrás."
  },
  "Superior frontal sulcus": {
    "region": "Lóbulo frontal, cara lateral superior",
    "relations": "Separa el giro frontal superior del medio y se acerca al precentral superior por detrás.",
    "function": "Sirve de reparo para distinguir sectores de corteza frontal lateral relacionados con el control de la conducta y la acción.",
    "limits": "Trayecto longitudinal de continuidad variable, con un extremo posterior cerca del surco precentral superior."
  },
  "Superior occipital gyri": {
    "region": "Cara lateral superior del lóbulo occipital",
    "relations": "Giros de la convexidad alta occipital, contiguos al parietal posterior y al occipital lateral.",
    "function": "Sus zonas extraestriadas dorsales contribuyen a analizar la localización y el movimiento de estímulos visuales.",
    "limits": "Se relacionan con el surco occipital transverso y los surcos occipitales laterales; la nomenclatura y límites varían."
  },
  "Superior parietal lobule": {
    "region": "Corteza parietal lateral dorsal",
    "relations": "Detrás del giro poscentral y por encima del lobulillo inferior. Se continúa por el borde medial con el precúneo.",
    "function": "Integra visión y propiocepción para dirigir los ojos y las manos y para representar el cuerpo en el espacio.",
    "limits": "Surco poscentral anterior, intraparietal inferior y transición parietooccipital posterior."
  },
  "Superior temporal gyrus (Lateral part)": {
    "region": "Cara lateral superior del lóbulo temporal",
    "relations": "Porción externa del giro temporal superior, inferior a la fisura lateral y dorsal al giro temporal medio.",
    "function": "Interviene en análisis auditivo de asociación. Las regiones posteriores del hemisferio dominante participan en el procesamiento de sonidos del habla.",
    "limits": "Entre el surco lateral arriba y el temporal superior abajo. Los giros de Heschl se ubican medialmente en el plano supratemporal."
  },
  "Superior temporal sulcus": {
    "region": "Cara lateral del lóbulo temporal",
    "relations": "Surco longitudinal entre el giro temporal superior y el medio, con ramas cerca de la unión temporoparietal.",
    "function": "Sus bancos de asociación participan en integrar señales auditivas y visuales, habla y, según el segmento, mirada y movimiento biológico.",
    "limits": "Desde cerca del polo temporal hacia el lobulillo parietal inferior, con ramificación posterior variable."
  },
  "Supramarginal gyrus": {
    "region": "Lobulillo parietal inferior, sector anterior",
    "relations": "Rodea el final posterior del surco lateral, delante del giro angular.",
    "function": "En el hemisferio dominante contribuye a la integración fonológica y a mantener sonidos del habla en memoria de trabajo. También participa en redes de praxis y atención.",
    "limits": "Poscentral por delante, intraparietal por arriba y transición hacia el giro angular por detrás, a veces marcada por Jensen."
  },
  "Temporal plane": {
    "region": "Plano supratemporal posterior, profundidad del surco lateral",
    "relations": "El planum temporale está detrás del último giro temporal transverso y por encima de la superficie lateral temporal.",
    "function": "Corteza auditiva de asociación que analiza secuencias de sonidos y patrones acústicos complejos, incluidos componentes del habla.",
    "limits": "Giros o surcos transversos de Heschl por delante; extremo posterior del plano supratemporal y rama posterior del surco lateral por detrás."
  },
  "Temporal pole": {
    "region": "Extremo anterior del lóbulo temporal",
    "relations": "Región donde convergen las caras lateral, medial y basal del temporal. Vecina a la amígdala y próxima a la corteza orbitofrontal.",
    "function": "Integra conocimiento semántico de personas, objetos y conceptos. Sus conexiones límbicas contribuyen a asociar significado y emoción.",
    "limits": "Es el extremo anterior de los giros temporales. El comienzo de los surcos temporales ofrece referencias aproximadas del borde posterior."
  },
  "Transverse frontopolar gyrus and sulcus": {
    "region": "Polo frontal y borde orbitofrontal",
    "relations": "Pequeño complejo transversal del extremo frontal, cercano al giro frontomarginal y al inicio de los surcos frontales longitudinales.",
    "function": "Es un reparo de la corteza frontopolar. El pliegue aislado carece de una función específica demostrada.",
    "limits": "Se sitúa junto al extremo rostral del frontal. Su extensión y separación de pliegues vecinos son variables."
  },
  "Transverse occipital sulcus": {
    "region": "Cara dorsolateral occipital",
    "relations": "Surco transversal posterior al intraparietal, con el que puede confluir.",
    "function": "Sirve de referencia entre el parietal posterior y los giros occipitales superiores.",
    "limits": "Cruza el occipital lateral superior cerca de la transición parietooccipital. Su continuidad con el intraparietal es variable."
  },
  "Transverse temporal gyri": {
    "region": "Plano supratemporal, dentro del surco lateral",
    "relations": "Giros de Heschl que cruzan la cara superior temporal. El plano temporal posterior queda detrás.",
    "function": "La porción medial incluye corteza auditiva primaria. Sus mapas tonotópicos ordenan el sonido por frecuencia.",
    "limits": "Giro o giros transversos de número variable, entre el plano polar anterior y el planum temporale posterior."
  },
  "Triangular part of inferior frontal gyrus": {
    "region": "Giro frontal inferior, porción intermedia",
    "relations": "Porción triangular entre la opercular posterior y la orbitaria inferior, bajo el surco frontal inferior.",
    "function": "En el hemisferio dominante contribuye a seleccionar y combinar información lingüística y semántica dentro de una red distribuida.",
    "limits": "Rama ascendente anterior del surco lateral por detrás, rama horizontal anterior por abajo y surco frontal inferior por arriba."
  },
  "Abducens nerve (VI)": {
    "region": "Puente caudal, seno cavernoso y órbita",
    "relations": "El VI emerge cerca de la línea media en la unión pontobulbar, asciende por el clivus y atraviesa el canal de Dorello. En el seno cavernoso va junto a la carótida interna.",
    "function": "Inerva el recto lateral y abduce el ojo, alejándolo de la línea media.",
    "limits": "Desde la unión pontobulbar hasta el recto lateral, tras pasar por la fisura orbitaria superior dentro del anillo tendinoso común."
  },
  "Accessory nerve (XI)": {
    "region": "Médula cervical superior, base del cráneo y cuello",
    "relations": "Las raíces espinales ascienden lateralmente a la médula, entran al cráneo por el agujero magno y salen por el foramen yugular.",
    "function": "Activa el esternocleidomastoideo y el trapecio. Participa en girar la cabeza, elevar el hombro y rotar la escápula.",
    "limits": "Desde raíces cervicales superiores hasta los músculos del cuello y hombro. Cruza el triángulo posterior del cuello rumbo al trapecio."
  },
  "Anterior division of mandibular nerve": {
    "region": "Fosa infratemporal, división anterior de V3",
    "relations": "Rama anterior del nervio mandibular tras su salida por el foramen oval. Sus ramas se distribuyen entre músculos masticadores.",
    "function": "Conduce principalmente fibras motoras a temporal, masetero y pterigoideo lateral. El nervio bucal es su rama cutaneomucosa sensitiva.",
    "limits": "Del tronco de V3 a sus ramas temporales profundas, masetérica, pterigoidea lateral y bucal."
  },
  "Buccal nerve": {
    "region": "Fosa infratemporal y mejilla, rama de V3",
    "relations": "Rama sensitiva de la división anterior mandibular. A menudo pasa entre las cabezas del pterigoideo lateral y se dirige a la cara lateral del buccinador.",
    "function": "Lleva sensibilidad de la mucosa de la mejilla, piel vecina y encía vestibular de los molares inferiores. La motricidad del buccinador depende del facial.",
    "limits": "Se extiende desde V3 hacia la región retromolar y la mejilla, con ramificación terminal variable."
  },
  "Facial nerve (VII)": {
    "region": "Ángulo pontocerebeloso, temporal y cara",
    "relations": "El VII pasa por el conducto auditivo interno con el VIII, recorre el canal facial y sale por el foramen estilomastoideo. Se ramifica dentro de la parótida.",
    "function": "Mueve la musculatura de la expresión facial y el estapedio. También transporta gusto de los dos tercios anteriores de la lengua y fibras secretomotoras lagrimales y salivales.",
    "limits": "Desde la unión pontobulbar hasta sus ramas de la cara. En el canal facial se desprenden, entre otras, el petroso mayor y la cuerda del tímpano."
  },
  "Hypoglossal nerve (XII)": {
    "region": "Bulbo ventral, conducto hipogloso y lengua",
    "relations": "El XII emerge por el surco preolivar, entre la pirámide y la oliva, y alcanza la lengua cerca del hiogloso.",
    "function": "Inerva los músculos intrínsecos y casi todos los extrínsecos de la lengua para hablar y deglutir. El palatogloso recibe inervación vagal.",
    "limits": "Desde las raicillas preolivares hasta la musculatura lingual, tras atravesar el conducto hipogloso."
  },
  "Inferior alveolar nerve": {
    "region": "Fosa infratemporal y conducto mandibular, rama de V3",
    "relations": "Desciende junto al nervio lingual y entra por el foramen mandibular con los vasos alveolares inferiores. Antes de entrar emite el ramo milohioideo.",
    "function": "Recoge sensibilidad dentaria inferior. Su ramo milohioideo inerva el milohioideo y el vientre anterior del digástrico.",
    "limits": "Desde V3 hasta las ramas incisiva y mentoniana en el interior de la mandíbula."
  },
  "Lingual nerve": {
    "region": "Fosa infratemporal y piso de la boca, rama de V3",
    "relations": "Pasa medial al tercer molar inferior. Recibe la cuerda del tímpano y cambia de lado respecto al conducto submandibular al rodearlo.",
    "function": "Conduce sensibilidad general de los dos tercios anteriores de la lengua. Por la cuerda del tímpano viajan también gusto y fibras secretomotoras.",
    "limits": "Desde la división posterior de V3 hasta la lengua anterior, el piso bucal y la encía lingual."
  },
  "Maxillary nerve": {
    "region": "Seno cavernoso, fosa pterigopalatina y cara media",
    "relations": "V2 pasa por la pared lateral del seno cavernoso y por el foramen redondo. Su continuación infraorbitaria cruza el piso orbitario.",
    "function": "Recoge sensibilidad de la cara media, dientes superiores, seno maxilar, cavidad nasal, paladar y parte de la duramadre.",
    "limits": "Desde el ganglio trigeminal hasta sus ramas pterigopalatinas, cigomática, alveolares e infraorbitaria."
  },
  "Meningeal branch of maxillary nerve": {
    "region": "Fosa craneal media, ramo meníngeo de V2",
    "relations": "Pequeño ramo que nace del maxilar en su trayecto intracraneal, cerca del foramen redondo.",
    "function": "Conduce sensibilidad de un territorio de la duramadre de la fosa craneal media.",
    "limits": "Se extiende desde V2 hasta la duramadre vecina. Su extensión y trayecto finos son variables."
  },
  "Mental nerve": {
    "region": "Foramen mentoniano y región labiomental",
    "relations": "Ramo terminal del alveolar inferior que emerge de la mandíbula, comúnmente cerca de los premolares inferiores.",
    "function": "Da sensibilidad a la piel del mentón y labio inferior y a la mucosa y encía vestibular anterior vecina.",
    "limits": "Desde el conducto mandibular, sale por el foramen mentoniano y se abre en ramos cutáneos y labiales."
  },
  "Motor root of trigeminal nerve": {
    "region": "Puente lateral y región del ganglio trigeminal",
    "relations": "Raíz pequeña que sale del puente junto a la raíz sensitiva. Pasa bajo el ganglio trigeminal y se une al mandibular.",
    "function": "Lleva las fibras motoras branquiales de V3 hacia los músculos masticadores y otros derivados del primer arco faríngeo.",
    "limits": "Desde el núcleo motor pontino hasta V3. Las fibras atraviesan la región del foramen oval."
  },
  "Oculomotor nerve (III)": {
    "region": "Mesencéfalo ventral, seno cavernoso y órbita",
    "relations": "Emerge en la fosa interpeduncular y pasa entre las arterias cerebral posterior y cerebelosa superior. Entra en la órbita por la fisura orbitaria superior.",
    "function": "Mueve el ojo con los rectos medial, superior e inferior y el oblicuo inferior. Eleva el párpado y conduce fibras para constricción pupilar y acomodación.",
    "limits": "Desde el mesencéfalo hasta sus divisiones orbitarias superior e inferior, incluida la conexión con el ganglio ciliar."
  },
  "Olfactory nerve (I)": {
    "region": "Techo de la cavidad nasal, lámina cribosa y base frontal",
    "relations": "Los filetes de neuronas olfatorias atraviesan la lámina cribosa del etmoides hacia el bulbo, situado en el surco olfatorio.",
    "function": "Conduce señales olfatorias desde el epitelio nasal. El bulbo las organiza antes de enviarlas por el tracto olfatorio.",
    "limits": "Desde el epitelio olfatorio superior hasta el bulbo. El tracto continúa posterior al bulbo por la cara inferior frontal."
  },
  "Ophthalmic nerve": {
    "region": "Seno cavernoso, órbita y frente",
    "relations": "V1 recorre la pared lateral del seno cavernoso y entra por la fisura orbitaria superior. Se divide en frontal, lagrimal y nasociliar.",
    "function": "Lleva sensibilidad corneal, frontal, nasodorsal y del párpado superior. Constituye la vía aferente del reflejo corneal.",
    "limits": "Desde el ganglio trigeminal hasta las ramas orbitarias y cutáneas de la frente y dorso de la nariz."
  },
  "Optic nerve (II)": {
    "region": "Retina, órbita, conducto óptico y región supraselar",
    "relations": "Está formado por axones de células ganglionares retinianas. Viaja por el conducto óptico con la arteria oftálmica hacia el quiasma.",
    "function": "Conduce la visión del ojo correspondiente y aporta la vía aferente para el reflejo fotomotor.",
    "limits": "Desde el disco óptico hasta el quiasma. Allí cruzan axones de las hemirretinas nasales y continúan los tractos ópticos."
  },
  "Posterior division of mandibular nerve": {
    "region": "Fosa infratemporal, división posterior de V3",
    "relations": "Porción principalmente sensitiva de V3. Da origen al auriculotemporal, lingual y alveolar inferior.",
    "function": "Distribuye sensibilidad mandibular, temporal, auricular y oral. El ramo milohioideo transporta fibras motoras para milohioideo y digástrico anterior.",
    "limits": "Desde la división de V3 debajo del foramen oval hasta las ramas mandibulares, linguales y auriculotemporales."
  },
  "Sensory root of trigeminal nerve": {
    "region": "Puente lateral y cueva trigeminal",
    "relations": "Raíz voluminosa que une la cara anterolateral del puente con el ganglio trigeminal en la cueva de Meckel.",
    "function": "Transporta sensibilidad de cara, córnea, cavidades oral y nasal, dientes y parte de las meninges. La propiocepción mandibular tiene neuronas primarias en el núcleo mesencefálico.",
    "limits": "Entre el puente y el ganglio, del que parten las divisiones oftálmica, maxilar y mandibular."
  },
  "Trigeminal nerve (V)": {
    "region": "Puente lateral, cueva de Meckel y base del cráneo",
    "relations": "El trigémino tiene una raíz sensitiva mayor y otra motora menor. Se divide en V1 oftálmico, V2 maxilar y V3 mandibular.",
    "function": "Es el principal nervio de sensibilidad somática de la cara y conduce la motricidad masticadora por V3.",
    "limits": "Desde el puente hasta la fisura orbitaria superior, el foramen redondo y el foramen oval, que transmiten V1, V2 y V3."
  },
  "Trochlear nerve (IV)": {
    "region": "Mesencéfalo dorsal, seno cavernoso y órbita",
    "relations": "Sus fibras se cruzan y el IV emerge dorsalmente bajo el colículo inferior. Rodea el mesencéfalo y entra en la órbita por la fisura superior.",
    "function": "Inerva el oblicuo superior, que intorsiona el ojo y ayuda a deprimirlo cuando está aducido.",
    "limits": "Desde la cara dorsal mesencefálica hasta el oblicuo superior, fuera del anillo tendinoso común."
  },
  "Vagus nerve (X)": {
    "region": "Bulbo lateral, foramen yugular, cuello y tórax",
    "relations": "El X sale por el surco retroolivar y el foramen yugular. En el cuello desciende en la vaina carotídea, entre vasos arteriales y venosos.",
    "function": "Coordina funciones motoras de faringe y laringe, conduce sensibilidad visceral y aporta regulación parasimpática a vísceras torácicas y abdominales.",
    "limits": "Desde raicillas bulbares hasta ramas faríngeas, laríngeas y viscerales. Parte de su trayecto periférico queda fuera del atlas."
  },
  "Vestibular nerve": {
    "region": "Oído interno, meato acústico interno y ángulo pontocerebeloso",
    "relations": "Componente vestibular del VIII. El ganglio de Scarpa recibe fibras de los canales semicirculares, el utrículo y el sáculo.",
    "function": "Conduce información sobre aceleraciones angulares y lineales y posición de la cabeza. Alimenta respuestas de equilibrio y estabilización de la mirada.",
    "limits": "Desde los receptores del laberinto hasta los núcleos vestibulares y el cerebelo."
  },
  "Accessory nucleus of oculomotor nerve": {
    "region": "Mesencéfalo rostral periacueductal",
    "relations": "Complejo accesorio del oculomotor junto al núcleo motor del III, al nivel del colículo superior.",
    "function": "Su componente parasimpático preganglionar proyecta al ganglio ciliar para la miosis y la acomodación. La región también contiene poblaciones de otras funciones.",
    "limits": "Dorsal o dorsomedial al núcleo motor del III y próxima a la sustancia gris periacueductal."
  },
  "Aqueduct of midbrain": {
    "region": "Mesencéfalo, sistema ventricular",
    "relations": "Conducto de LCR entre el tercer y cuarto ventrículo, rodeado por sustancia gris periacueductal.",
    "function": "Permite el paso de LCR hacia el cuarto ventrículo. Su estrechez lo hace un punto susceptible de obstrucción.",
    "limits": "Por detrás del tegmento mesencefálico y delante de la lámina tectal. Comunica diencéfalo y techo rostral del cuarto ventrículo."
  },
  "Inferior colliculus": {
    "region": "Tectum del mesencéfalo caudal",
    "relations": "Está debajo del colículo superior. Recibe gran parte de las vías auditivas ascendentes del lemnisco lateral.",
    "function": "Integra localización y características del sonido. Envía información al geniculado medial por el brazo del colículo inferior.",
    "limits": "Relieve dorsal caudal, por encima del velo medular superior y cerca de la emergencia dorsal del IV."
  },
  "Interpeduncular fossa": {
    "region": "Base ventral mesencefálica",
    "relations": "Depresión entre los pedúnculos cerebrales. En su piso está la sustancia perforada posterior y a sus lados emergen los III.",
    "function": "Es un reparo de la emergencia del oculomotor y de la entrada de arterias perforantes al mesencéfalo.",
    "limits": "Entre los pedúnculos; por delante se aproxima a los cuerpos mamilares y por detrás a la unión pontomesencefálica."
  },
  "Medulla oblongata": {
    "region": "Bulbo raquídeo, segmento inferior del tronco",
    "relations": "Se sitúa entre puente y médula espinal. Ventralmente se ven pirámides y olivas; dorsalmente participa en el piso ventricular abierto.",
    "function": "Conduce vías ascendentes y descendentes. Integra respiración, control cardiovascular, deglución, tos y otras respuestas mediante redes bulbares.",
    "limits": "Surco pontobulbar rostral y transición cervicobulbar, cercana a la decusación piramidal, caudalmente. La malla disponible es parcial.",
    "note": "La representación del bulbo en el modelo es parcial."
  },
  "Midbrain": {
    "region": "Mesencéfalo, segmento superior del tronco",
    "relations": "Entre diencéfalo y puente. Contiene pedúnculos ventrales, tegmento y techo con los colículos alrededor del acueducto.",
    "function": "Participa en control oculomotor, orientación visual y auditiva y modulación del movimiento a través de la sustancia negra y el núcleo rojo.",
    "limits": "Puente por abajo, diencéfalo por arriba, tectum dorsal y pedúnculos cerebrales ventrales."
  },
  "Motor nucleus of facial nerve": {
    "region": "Tegmento del puente caudal",
    "relations": "El núcleo facial motor queda ventrolateral al núcleo del VI. Sus fibras rodean al VI antes de dirigirse hacia la salida del VII.",
    "function": "Inerva musculatura de la expresión facial, estapedio, estilohioideo y vientre posterior del digástrico.",
    "limits": "En el puente caudal, profundo al piso del cuarto ventrículo. Su rodilla interna contribuye al colículo facial."
  },
  "Nucleus of abducens nerve": {
    "region": "Tegmento del puente caudal, región medial",
    "relations": "El núcleo del VI se sitúa bajo el colículo facial, rodeado por fibras del facial. Se conecta con el III contralateral por el fascículo longitudinal medial.",
    "function": "Activa la abducción ipsilateral y coordina la mirada horizontal conjugada mediante interneuronas.",
    "limits": "Profundo al piso del cuarto ventrículo, próximo a la línea media y a la formación reticular pontina."
  },
  "Nucleus of oculomotor nerve": {
    "region": "Mesencéfalo rostral, tegmento medial",
    "relations": "Complejo somatomotor del III, ventral a la sustancia gris periacueductal, al nivel del colículo superior.",
    "function": "Sus subnúcleos controlan cuatro músculos extraoculares y el elevador del párpado superior. El control parasimpático se asocia al complejo accesorio vecino.",
    "limits": "Próximo a la línea media y dorsal al fascículo longitudinal medial. Sus fibras atraviesan el tegmento hacia la fosa interpeduncular."
  },
  "Olive": {
    "region": "Superficie anterolateral del bulbo",
    "relations": "Prominencia lateral a la pirámide, producida principalmente por el complejo olivar inferior subyacente.",
    "function": "El complejo olivar inferior envía fibras trepadoras al cerebelo contralateral y aporta señales relevantes para el aprendizaje y la coordinación motora.",
    "limits": "Entre el surco preolivar, salida de XII, y el retroolivar, salida de IX y X y raicillas relacionadas."
  },
  "Red nucleus": {
    "region": "Tegmento del mesencéfalo rostral",
    "relations": "Situado anterior a la sustancia gris periacueductal y dorsal a la sustancia negra. Recibe aferencias cerebelosas y corticales.",
    "function": "Participa en circuitos de coordinación motora y conexión cerebelo–tronco. La vía rubroespinal es menos dominante en humanos que la corticospinal.",
    "limits": "Profundo al nivel del colículo superior. Se relaciona con la decusación de los pedúnculos cerebelosos superiores hacia caudal."
  },
  "Pons": {
    "region": "Puente, segmento medio del tronco",
    "relations": "Ventral al cuarto ventrículo y anterior al cerebelo. La base contiene núcleos pontinos y fibras transversas hacia los pedúnculos medios.",
    "function": "Sus núcleos retransmiten señales corticales al cerebelo. El tegmento participa en funciones de pares craneales, sueño y control respiratorio.",
    "limits": "Surcos pontomesencefálico y pontobulbar. Base ventral y tegmento dorsal hacia el piso ventricular."
  },
  "Pyramid of medulla oblongata": {
    "region": "Cara ventromedial del bulbo",
    "relations": "Relieve longitudinal a cada lado de la fisura mediana anterior, medial a la oliva.",
    "function": "Contiene gran parte de los axones del tracto corticoespinal. La mayoría cruzan en el bulbo caudal para formar el corticoespinal lateral.",
    "limits": "Desde la unión pontobulbar hasta la decusación piramidal. El surco preolivar la separa lateralmente de la oliva."
  },
  "Superior colliculus": {
    "region": "Tectum del mesencéfalo rostral",
    "relations": "Relieve dorsal por encima del colículo inferior, bajo el tálamo posterior. Recibe entradas retinianas y corticales.",
    "function": "Organiza la orientación de los ojos y la cabeza hacia estímulos relevantes. Sus capas profundas integran información de varias modalidades.",
    "limits": "Posterior al acueducto y la sustancia gris periacueductal, con conexión lateral por su brazo hacia la región geniculada."
  },
  "Superior salivatory nucleus": {
    "region": "Tegmento del puente caudal",
    "relations": "Grupo parasimpático vinculado con el nervio facial, en la formación reticular pontina caudal.",
    "function": "Envía fibras preganglionares por el VII hacia los ganglios pterigopalatino y submandibular para secreción lagrimal, nasopalatina y salival.",
    "limits": "Se sitúa cerca del núcleo motor facial. Sus límites son nucleares, no visibles como surcos en la superficie."
  },
  "Vestibular nuclei": {
    "region": "Puente caudal y bulbo rostral, piso ventricular lateral",
    "relations": "Complejo de núcleos superior, medial, lateral e inferior bajo el área vestibular, vecino al pedúnculo cerebeloso inferior.",
    "function": "Integra señales del laberinto, cerebelo y propiocepción para estabilizar la mirada, mantener la postura y orientar el cuerpo.",
    "limits": "Se extiende alrededor de la unión pontobulbar, lateral al eje medial del piso del cuarto ventrículo."
  },
  "Anterior cerebral artery": {
    "region": "Circulación anterior, cisterna interhemisférica",
    "relations": "Rama terminal de la carótida interna que avanza hacia la fisura interhemisférica. Su trayecto distal se curva por encima del cuerpo calloso.",
    "function": "Irriga gran parte de la cara medial frontal y parietal, incluida la representación sensoriomotora de la pierna. Las perforantes alcanzan regiones profundas anteriores.",
    "limits": "A1 va desde la bifurcación carotídea a la comunicante anterior. Desde A2 continúa por la región pericallosa con ramas corticales variables."
  },
  "Anterior communicating artery": {
    "region": "Polígono de Willis, base frontal medial",
    "relations": "Puente corto entre ambas arterias cerebrales anteriores frente al quiasma, cerca de la lámina terminal.",
    "function": "Permite circulación colateral entre ambos territorios anteriores. Sus perforantes irrigan estructuras cercanas como el hipotálamo anterior y la región subcallosa.",
    "limits": "Entre las uniones A1–A2 derecha e izquierda. Su número y calibre son variables."
  },
  "Anterior inferior cerebellar artery": {
    "region": "Circulación posterior, ángulo pontocerebeloso",
    "relations": "Suele nacer de la basilar y rodear el puente caudal hacia el ángulo pontocerebeloso cerca de VII y VIII.",
    "function": "Irriga el cerebelo anteroinferior, áreas del puente lateral caudal y parte del pedúnculo medio. Con frecuencia emite la arteria laberíntica.",
    "limits": "Desde la basilar hacia la cisterna pontocerebelosa y la cara petrosa cerebelosa. El territorio se superpone de forma variable con PICA."
  },
  "Anterior spinal artery": {
    "region": "Bulbo ventral y médula espinal anterior",
    "relations": "Suele formarse por la unión de ramas de las vertebrales y desciende por la fisura mediana anterior de la médula.",
    "function": "Irriga el territorio medular anterior y porciones mediales bulbares. Recibe refuerzos segmentarios a lo largo de la médula.",
    "limits": "Desde la unión vertebral anterior hasta la región medular caudal, con aportes radiculomedulares variables."
  },
  "Basilar artery": {
    "region": "Circulación posterior, surco basilar del puente",
    "relations": "Se forma por la unión de las vertebrales y asciende sobre la cara ventral pontina.",
    "function": "Sus perforantes irrigan el puente. Sus ramas cerebelosas y terminales participan en la irrigación del cerebelo, mesencéfalo y territorios posteriores.",
    "limits": "Desde la unión vertebral a nivel pontobulbar hasta la bifurcación en cerebrales posteriores en la cisterna interpeduncular."
  },
  "Callosomarginal artery": {
    "region": "Cara medial frontoparietal, sistema de la cerebral anterior",
    "relations": "Rama cortical variable de la cerebral anterior que suele seguir el surco cingulado y corre por encima de la pericallosa.",
    "function": "Irriga territorios mediales frontales y, según su desarrollo, el lobulillo paracentral y áreas parietales mediales.",
    "limits": "Desde su nacimiento en el trayecto distal de la cerebral anterior hasta sus ramos mediales corticales. Puede ser pequeña o estar ausente."
  },
  "Distal lateral striate branches": {
    "region": "Sustancia perforada anterior, sistema de ACM",
    "relations": "Grupo distal de perforantes lenticuloestriadas laterales, habitualmente asociado al trayecto M1 o a ramas tempranas de la cerebral media.",
    "function": "Irriga porciones del putamen, caudado y cápsula interna. El reparto entre ramas individuales es variable.",
    "limits": "Del origen en la cerebral media a la entrada por la sustancia perforada anterior y la distribución estriatocapsular."
  },
  "Frontal branches of callosomarginal artery": {
    "region": "Cara medial del lóbulo frontal",
    "relations": "Ramas corticales que parten del eje callosomarginal y ascienden desde la región del surco cingulado.",
    "function": "Aportan irrigación a la corteza frontal medial y a sectores de la convexidad superior, según su distribución.",
    "limits": "Desde la callosomarginal a los territorios frontal anterior, medio o posterior. El patrón de bifurcación es variable."
  },
  "Insular branches of middle cerebral artery (M2)": {
    "region": "Profundidad del surco lateral, segmento insular de ACM",
    "relations": "Troncos o ramas de la cerebral media recorren la superficie insular entre el limen y el surco circular.",
    "function": "Irrigan la corteza insular y contribuyen al aporte de estructuras profundas por ramas insulares. Conducen flujo a sus continuaciones operculares.",
    "limits": "El trayecto M2 va típicamente desde el limen insular al surco circular. La nomenclatura puede variar entre clasificaciones."
  },
  "Internal carotid artery": {
    "region": "Cuello, base craneal y circulación anterior",
    "relations": "Asciende por el cuello, atraviesa el conducto carotídeo y el seno cavernoso, y emerge en la región supraclinoidea.",
    "function": "Aporta flujo a la órbita y a gran parte del encéfalo anterior por la oftálmica, cerebral anterior y cerebral media, entre otras ramas.",
    "limits": "Desde la bifurcación carotídea cervical hasta la bifurcación intracraneal en ACA y ACM. Se describen tramos petroso, cavernoso y supraclinoideo."
  },
  "Lateral pontine branches of basilar artery": {
    "region": "Cara lateral pontina, circulación basilar",
    "relations": "Ramas circunferenciales de la basilar que rodean la convexidad del puente. Su territorio se relaciona con ramas cerebelosas.",
    "function": "Irrigan el puente lateral y parte del tegmento pontino. El aporte específico varía con el nivel y la longitud de la rama.",
    "limits": "Desde la cara ventral del puente hacia territorios anterolaterales o dorsolaterales, según la rama."
  },
  "Medial pontine branches of basilar artery": {
    "region": "Puente medial, circulación basilar",
    "relations": "Perforantes paramedianas que nacen de la basilar y penetran la cara ventral pontina cerca de la línea media.",
    "function": "Irrigan sectores mediales de la base pontina y, según alcance, del tegmento. Incluyen territorios de vías motoras descendentes.",
    "limits": "Desde el surco basilar al interior del puente. Su territorio depende del nivel de origen y profundidad de penetración."
  },
  "Middle cerebral artery (M1-segment)": {
    "region": "Cisterna silviana, segmento esfenoidal de ACM",
    "relations": "Tramo proximal de la cerebral media que corre lateralmente desde la carótida interna hacia el limen insular. Origina perforantes lenticuloestriadas.",
    "function": "Transporta flujo a los territorios laterales corticales y emite perforantes para ganglios basales y cápsula interna.",
    "limits": "Desde la bifurcación carotídea hasta el giro hacia la superficie de la ínsula. La división en troncos puede ocurrir antes o cerca del limen."
  },
  "Middle cerebral artery (M3 segment)": {
    "region": "Surco lateral, segmento opercular de ACM",
    "relations": "Continuación de M2 al salir del surco circular insular. Recorre la cara profunda de los opérculos frontal, parietal o temporal.",
    "function": "Lleva flujo a los opérculos y a las ramas que se distribuyen por la superficie lateral del hemisferio.",
    "limits": "Desde el surco circular hasta la salida al borde externo del surco lateral, donde continúan las ramas corticales M4."
  },
  "Ophthalmic artery": {
    "region": "Órbita y circulación carotídea interna",
    "relations": "Suele originarse de la carótida supraclinoidea. Entra por el conducto óptico con el nervio II y se ramifica en la órbita.",
    "function": "Irriga estructuras orbitarias y, mediante la central de la retina y ramas ciliares, territorios retinianos y oculares.",
    "limits": "Desde la carótida interna al conducto óptico y a sus ramas orbitarias y terminales frontonasales. El trayecto respecto al II varía."
  },
  "Orbitofrontal branches of anterior cerebral artery": {
    "region": "Cara orbitaria medial frontal, sistema de ACA",
    "relations": "Ramas orbitofrontales de la cerebral anterior que se dirigen a la base frontal, cerca del giro recto y surco olfatorio.",
    "function": "Irrigan sectores orbitofrontales mediales y giros basales anteriores. El territorio lateral se solapa con ramas de la cerebral media.",
    "limits": "Desde el segmento proximal distal a la comunicante anterior, con variaciones, hacia la cara orbitaria frontal."
  },
  "Parietal branches of middle cerebral artery": {
    "region": "Convexidad parietal lateral, sistema de ACM",
    "relations": "Ramas que emergen del surco lateral y se distribuyen hacia giros parietales por la superficie de la convexidad.",
    "function": "Irrigan sectores parietales laterales, incluidos territorios sensoriomotores o de asociación según la rama.",
    "limits": "Desde troncos insulares u operculares hacia ramas como poscentral, parietal posterior y angular, con variantes."
  },
  "Pericallosal artery": {
    "region": "Cara medial del hemisferio, surco calloso",
    "relations": "Continuación habitual de la cerebral anterior que acompaña la curvatura del cuerpo calloso y queda bajo la callosomarginal cuando ambas están presentes.",
    "function": "Aporta flujo a partes del cuerpo calloso y emite ramas mediales frontoparietales. El esplenio también puede recibir ramas posteriores.",
    "limits": "Desde el trayecto distal de la cerebral anterior, alrededor de la rodilla y sobre el cuerpo calloso, hacia la región parietal medial."
  },
  "Posterior cerebral artery": {
    "region": "Circulación posterior, cisternas perimesencefálicas y occipital",
    "relations": "Generalmente nace de la basilar, rodea el mesencéfalo y alcanza la cara inferior temporal y medial occipital.",
    "function": "Irriga gran parte del occipital visual, temporal inferomedial y, a través de perforantes, zonas talámicas y mesencefálicas.",
    "limits": "P1 se extiende hasta la unión con la comunicante posterior, seguido del trayecto perimesencefálico y ramas distales como la calcarina."
  },
  "Posterior communicating artery": {
    "region": "Base cerebral, conexión carotídea–posterior",
    "relations": "Une la carótida interna con la cerebral posterior cerca del mesencéfalo y del nervio oculomotor.",
    "function": "Permite flujo colateral por el polígono de Willis. Emite perforantes para regiones diencefálicas y vecinas.",
    "limits": "Entre la carótida supraclinoidea y la unión P1–P2. Puede ser dominante y aportar gran parte del flujo de la cerebral posterior."
  },
  "Posterior inferior cerebellar artery": {
    "region": "Circulación posterior, bulbo lateral y cerebelo inferior",
    "relations": "Suele nacer de la vertebral y rodear el bulbo próxima a raíces de pares craneales bajos.",
    "function": "Irriga gran parte de la cara inferior del cerebelo, vermis inferior y territorios bulbares laterales variables.",
    "limits": "Desde la vertebral a cisternas bulbares, región tonsilar y ramas corticales cerebelosas."
  },
  "Proximal lateral striate branches": {
    "region": "Sustancia perforada anterior, sistema de ACM proximal",
    "relations": "Perforantes lenticuloestriadas laterales de origen proximal, por lo general en M1.",
    "function": "Irrigan parte del estriado y de la cápsula interna. Su pequeño calibre y escasas colaterales delimitan territorios perforantes.",
    "limits": "Desde M1 hacia el plano estriatocapsular tras penetrar la sustancia perforada anterior."
  },
  "Superior cerebellar artery": {
    "region": "Circulación posterior, cisterna pontomesencefálica",
    "relations": "Nace cerca de la terminación basilar, por debajo de la cerebral posterior, y rodea el tronco bajo el trayecto cisternal del III.",
    "function": "Irriga la superficie superior cerebelosa, vermis superior y partes de los núcleos profundos y pedúnculo superior.",
    "limits": "Desde la basilar distal hacia el margen tentorial y las ramas de la cara superior cerebelosa."
  },
  "Temporal branches of middle cerebral artery": {
    "region": "Convexidad temporal lateral, sistema de ACM",
    "relations": "Ramas temporales que salen del surco lateral hacia la cara lateral del temporal.",
    "function": "Irrigan el polo y sectores temporales laterales, incluidos territorios auditivos o de asociación según la rama y sus anastomosis.",
    "limits": "Desde los troncos de la cerebral media hasta ramas temporopolar, temporal anterior, media o posterior, con variantes."
  },
  "Vertebral artery": {
    "region": "Cuello, agujero magno y bulbo ventrolateral",
    "relations": "Rama de la subclavia que asciende por forámenes transversos cervicales y entra al cráneo por el agujero magno.",
    "function": "Aporta flujo a la circulación posterior y da ramas para bulbo, cerebelo inferior y médula. Ambas vertebrales forman la basilar.",
    "limits": "Tramos cervicales y segmento intracraneal V4 hasta la unión vertebrobasilar. La PICA suele originarse en V4."
  },
  "Anterior intercavernous sinus": {
    "region": "Duramadre selar anterior",
    "relations": "Puente venoso entre los senos cavernosos situado por delante de la hipófisis.",
    "function": "Comunica el drenaje cavernoso de ambos lados y forma parte del anillo venoso periselar cuando está desarrollado.",
    "limits": "Entre las paredes mediales de los senos cavernosos, en el borde anterior de la región hipofisaria. El calibre y la presencia varían."
  },
  "Basilar venous plexus": {
    "region": "Clivus, plexo venoso dural",
    "relations": "Red venosa de la duramadre clival, anterior al tronco encefálico y próxima al agujero magno.",
    "function": "Comunica los senos petrosos inferiores y conecta el drenaje de la base del cráneo con plexos venosos vertebrales.",
    "limits": "En la superficie del clivus, entre las regiones petrosas inferiores y el agujero magno."
  },
  "Cavernous sinus": {
    "region": "Fosa craneal media, a cada lado de la silla turca",
    "relations": "La carótida interna y el VI pasan por el interior. III, IV, V1 y V2 se relacionan con la pared lateral.",
    "function": "Recibe drenaje orbitario y cerebral superficial variable y lo deriva a senos petrosos y conexiones extracraneales.",
    "limits": "Desde la fisura orbitaria superior hacia el ápice petroso, lateral a hipófisis y esfenoides. Conectado al otro lado por senos intercavernosos."
  },
  "Inferior petrosal sinus": {
    "region": "Surco petrooccipital, base del cráneo",
    "relations": "Corre entre la porción petrosa del temporal y el clivus, próximo al foramen yugular.",
    "function": "Drena el seno cavernoso hacia el bulbo yugular o la yugular interna. Se comunica con el plexo basilar.",
    "limits": "Del seno cavernoso a la región del foramen yugular, con variaciones en sus terminaciones."
  },
  "Inferior sagittal sinus": {
    "region": "Borde libre inferior de la hoz cerebral",
    "relations": "Seno medial suspendido sobre el cuerpo calloso, dentro del margen libre inferior de la hoz.",
    "function": "Recoge drenaje venoso de la hoz y de parte de las superficies hemisféricas mediales. Confluye con la vena cerebral magna en el seno recto.",
    "limits": "Discurre por la porción posterior del borde inferior libre de la hoz hacia su unión con el tentorio."
  },
  "Occipital sinus": {
    "region": "Duramadre occipital posterior y región del agujero magno",
    "relations": "Seno medio variable asociado a la hoz del cerebelo entre la confluencia venosa y el borde del agujero magno.",
    "function": "Proporciona una vía de comunicación entre el drenaje dural posterior y canales venosos marginales o vertebrales.",
    "limits": "Puede recorrer la cresta occipital interna hacia el seno marginal. El número y el calibre son variables."
  },
  "Posterior intercavernous sinus": {
    "region": "Duramadre selar posterior",
    "relations": "Puente venoso entre los senos cavernosos por detrás de la hipófisis.",
    "function": "Comunica ambos lados del drenaje cavernoso y contribuye al anillo venoso periselar en los casos en que está desarrollado.",
    "limits": "Entre los senos cavernosos a nivel del borde posterior de la hipófisis, con continuidad variable con venas clivales."
  },
  "Sigmoid sinus": {
    "region": "Surco sigmoideo temporal y occipital",
    "relations": "Continuación en S del seno transverso, posterior a la región mastoidea y próxima al foramen yugular.",
    "function": "Conduce sangre venosa intracraneal hacia el bulbo yugular y la vena yugular interna.",
    "limits": "Desde la curva que sigue al seno transverso hasta el foramen yugular, donde continúa como bulbo de la yugular interna."
  },
  "Straight sinus": {
    "region": "Unión de la hoz cerebral y la tienda del cerebelo",
    "relations": "Seno medial oblicuo que suele formarse por unión del sagital inferior y la vena cerebral magna.",
    "function": "Drena territorios cerebrales profundos hacia la confluencia venosa o hacia un seno transverso.",
    "limits": "A lo largo de la línea de inserción de la hoz sobre el tentorio, desde la región de Galeno hacia occipital."
  },
  "Superior petrosal sinus": {
    "region": "Borde superior de la porción petrosa del temporal",
    "relations": "Seno en la inserción del tentorio sobre la cresta petrosa. Recibe venas de la fosa posterior, entre ellas tributarias petrosas.",
    "function": "Comunica el seno cavernoso con la región transversosigmoidea y drena parte del tronco y cerebelo.",
    "limits": "Desde el cavernoso a lo largo de la cresta petrosa hasta la unión transversa–sigmoidea."
  },
  "Superior sagittal sinus": {
    "region": "Borde fijo superior de la hoz cerebral",
    "relations": "Recorre la línea media de la bóveda, entre hojas de duramadre. Recibe venas puente y se relaciona con granulaciones aracnoideas.",
    "function": "Drena amplias regiones de la convexidad cerebral y es un sitio de reabsorción de LCR a través de granulaciones aracnoideas.",
    "limits": "Desde la región de la cresta frontal hasta la confluencia de los senos cerca de la protuberancia occipital interna."
  },
  "Transverse sinus": {
    "region": "Surco transverso occipital, borde fijo del tentorio",
    "relations": "Seno dural par que se dirige lateralmente desde la región de la confluencia. Puede ser asimétrico.",
    "function": "Drena sangre venosa dural, cerebral y cerebelosa hacia el seno sigmoideo.",
    "limits": "Desde la confluencia o seno recto/sagital según el patrón hasta la curva sigmoidea."
  },
  "Falx cerebri": {
    "region": "Duramadre interhemisférica, línea media supratentorial",
    "relations": "Pliegue vertical que desciende entre ambos hemisferios. Su borde fijo contiene el sagital superior y su borde libre se relaciona con el sagital inferior.",
    "function": "Sostiene y separa parcialmente los hemisferios y aloja vías principales de drenaje venoso dural.",
    "limits": "Se extiende desde la cresta galli hacia la protuberancia occipital interna y se une posteriormente a la tienda cerebelosa."
  },
  "Tentorium cerebelli": {
    "region": "Pliegue dural entre encéfalo supratentorial y cerebelo",
    "relations": "Lámina que cubre el cerebelo y sostiene los lóbulos occipitales. Su borde libre rodea al mesencéfalo en la incisura tentorial.",
    "function": "Separa compartimentos craneales y da soporte. Sus inserciones alojan senos transversos y petrosos superiores.",
    "limits": "Se fija al occipital y a bordes petrosos. El borde libre se dirige a las apófisis clinoides y delimita la incisura."
  },
  "Adenohypophysis": {
    "region": "Silla turca, lóbulo anterior de la hipófisis",
    "relations": "Tejido glandular anterior a la neurohipófisis. Recibe señales hipotalámicas por vasos del sistema porta hipofisario.",
    "function": "Secreta GH, prolactina, ACTH, TSH, FSH y LH. Estas hormonas regulan crecimiento, lactancia, eje suprarrenal, función tiroidea y reproducción.",
    "limits": "En la fosa hipofisaria del esfenoides; limitada por la región posterior hipofisaria y cubierta superiormente por el diafragma selar."
  },
  "Neurohypophysis": {
    "region": "Silla turca e infundíbulo, lóbulo posterior de la hipófisis",
    "relations": "Contiene terminaciones axonales procedentes de núcleos hipotalámicos, principalmente supraóptico y paraventricular.",
    "function": "Almacena y libera vasopresina y oxitocina sintetizadas en el hipotálamo. Participa en el balance hídrico, el parto y la eyección de leche.",
    "limits": "Posterior a la adenohipófisis, en continuidad con el tallo infundibular. El quiasma óptico queda por encima de la región selar."
  },
  "Choroid plexus": {
    "region": "Ventrículos cerebrales, tejido vascular intraventricular",
    "relations": "Está formado por estroma vascular cubierto por epitelio coroideo. En el ventrículo lateral se relaciona con la fisura coroidea.",
    "function": "Produce gran parte del líquido cefalorraquídeo y regula su composición mediante la barrera sangre–LCR.",
    "limits": "Se distribuye en el cuerpo, atrio y asta temporal de los ventrículos laterales y en el tercero y el cuarto."
  },
  "Fourth ventricle": {
    "region": "Entre puente, bulbo rostral y cerebelo",
    "relations": "Cavidad de LCR con piso romboidal en la cara dorsal pontobulbar y techo relacionado con los velos medulares y el cerebelo.",
    "function": "Recibe LCR del acueducto y lo dirige al espacio subaracnoideo por la abertura media y las laterales.",
    "limits": "Entre el acueducto rostral y el óbex caudal. Se prolonga lateralmente en recesos hacia las aberturas de Luschka."
  },
  "Lateral ventricle": {
    "region": "Interior de cada hemisferio cerebral",
    "relations": "Cavidad en C relacionada con cuerpo calloso, caudado y tálamo. Su asta temporal se relaciona con el hipocampo.",
    "function": "Contiene LCR. El plexo coroideo contribuye a producirlo y el foramen interventricular conduce el líquido al tercer ventrículo.",
    "limits": "Incluye asta frontal, cuerpo, atrio y astas occipital y temporal. Las paredes cambian según el segmento."
  },
  "Septum pellucidum": {
    "region": "Línea media telencefálica, entre ventrículos laterales",
    "relations": "Dos láminas delgadas entre el cuerpo calloso por arriba y el fórnix por abajo. Pueden conservar un espacio llamado cavum del septo pelúcido.",
    "function": "Forma un tabique que separa los cuernos frontales y parte del cuerpo de los ventrículos laterales.",
    "limits": "Desde la región de la rodilla y cuerpo calloso hacia las columnas y el cuerpo del fórnix."
  },
  "Third ventricle": {
    "region": "Línea media del diencéfalo",
    "relations": "Cavidad estrecha entre ambas mitades del tálamo e hipotálamo. El surco hipotalámico marca la transición en su pared lateral.",
    "function": "Recibe LCR de ambos ventrículos laterales por los forámenes de Monro y lo dirige al acueducto.",
    "limits": "Laterales talámicos superiormente e hipotalámicos inferiormente. Lámina terminal anterior y región del acueducto posterior."
  },
  "Acoustic radiation": {
    "region": "Sustancia blanca sublenticular y temporal superior",
    "relations": "Fibras talamocorticales entre el geniculado medial y la corteza de los giros temporales transversos.",
    "function": "Transporta información auditiva organizada por frecuencias hacia la corteza auditiva. Incluye circuitos de retroalimentación corticotalámica.",
    "limits": "Del tálamo posterior al plano supratemporal mediante la región sublenticular de la cápsula interna y sustancia blanca temporal."
  },
  "Anterior thalamic radiation": {
    "region": "Tálamo anterior, cápsula interna y lóbulo frontal",
    "relations": "Fibras recíprocas entre núcleos talámicos anteriores o mediales y corteza frontal, a través del brazo anterior capsular.",
    "function": "Sostiene intercambios talamofrontales que intervienen en atención, control ejecutivo y memoria según los núcleos conectados.",
    "limits": "Desde el tálamo anterior y medial a la corona radiada frontal y regiones prefrontales y cinguladas."
  },
  "Arcuate fasciculus": {
    "region": "Sustancia blanca perisilviana frontotemporal",
    "relations": "Haz arqueado que recorre sustancia blanca lateral, rodea la cisura lateral posterior y conecta temporal posterior con regiones frontales por un trayecto dorsal.",
    "function": "En el hemisferio dominante, parte de las redes que vinculan sonidos del habla con articulación, repetición y memoria fonológica.",
    "limits": "Sus extremos temporales y frontales varían. Algunos esquemas incluyen segmentos indirectos con relevo parietal."
  },
  "Corticobulbar tract": {
    "region": "Corona radiada, cápsula interna y tronco encefálico",
    "relations": "Proyecciones desde áreas motoras corticales hacia los núcleos motores de los pares craneales. Descienden cerca de la rodilla capsular.",
    "function": "Regula movimientos voluntarios de cara, mandíbula, lengua, faringe y laringe. Muchos núcleos reciben entrada bilateral con asimetrías.",
    "limits": "Desde corteza motora y premotora, por cápsula interna y pedúnculos cerebrales, hasta núcleos motores en el tronco."
  },
  "Corticopontine tract (frontal)": {
    "region": "Lóbulo frontal, cápsula interna y base pontina",
    "relations": "Proyecciones frontal–pontinas que descienden por regiones anteriores de la cápsula y sectores mediales del pedúnculo cerebral.",
    "function": "Entrega información frontal a núcleos pontinos. Sus neuronas proyectan al cerebelo contralateral para participar en control y planificación.",
    "limits": "Corteza frontal a núcleos de la base pontina ipsilateral. El cruce principal ocurre en la vía pontocerebelosa posterior."
  },
  "Corticopontine tract (occipital)": {
    "region": "Lóbulo occipital, cápsula interna posterior y base pontina",
    "relations": "Fibras desde corteza occipital que descienden hacia el puente, asociadas al sector lateral del pedúnculo cerebral.",
    "function": "Transmite señales visuales corticales a circuitos pontocerebelosos involucrados en coordinación visuomotora.",
    "limits": "Desde la sustancia blanca occipital, por regiones capsulares posteriores, hasta núcleos pontinos ipsilaterales."
  },
  "Corticopontine tract (parietal)": {
    "region": "Lóbulo parietal, cápsula interna posterior y base pontina",
    "relations": "Proyecciones desde corteza parietal hacia núcleos de la base del puente, en el sistema corticopontino posterior.",
    "function": "Permite que información somatosensorial y espacial alcance redes cerebelosas que ajustan postura y acciones dirigidas.",
    "limits": "Desde la corteza parietal hasta el puente ipsilateral. La conexión pontocerebelosa posterior cruza al otro lado."
  },
  "Corticospinal tract": {
    "region": "Vía motora descendente desde corteza hasta médula",
    "relations": "Pasa por corona radiada, brazo posterior de la cápsula interna, pedúnculo cerebral, puente y pirámides bulbares.",
    "function": "Transmite control motor voluntario. Contribuye en particular a movimientos finos y fraccionados de extremidades.",
    "limits": "La mayoría de las fibras cruza en la decusación piramidal y desciende en el tracto corticoespinal lateral."
  },
  "Corticostriatal tract (anterior)": {
    "region": "Sustancia blanca telencefálica, proyecciones corticostriatales anteriores",
    "relations": "Fibras de la región frontal anterior hacia sectores anteriores del caudado y del putamen según la topografía cortical.",
    "function": "Aporta información de objetivos y acciones posibles a circuitos frontoestriatales implicados en decisión y control de la conducta.",
    "limits": "Desde corteza frontal hasta estriado anterior. El reparto exacto cortical y estriatal depende de la reconstrucción del haz."
  },
  "Corticostriatal tract (posterior)": {
    "region": "Sustancia blanca telencefálica, proyecciones corticostriatales posteriores",
    "relations": "Agrupación tractográfica de fibras corticales que alcanzan zonas posteriores o dorsales del estriado.",
    "function": "Aporta información sensorial y motora a circuitos estriatales que participan en la selección y automatización de acciones.",
    "limits": "Extremos en corteza y estriado posterior. Su delimitación como fascículo separado depende de la plantilla tractográfica."
  },
  "Corticostriatal tract (superior)": {
    "region": "Sustancia blanca telencefálica, proyecciones corticostriatales superiores",
    "relations": "Agrupación de proyecciones desde la convexidad cerebral dorsal hacia sectores del estriado.",
    "function": "Aporta señales de áreas sensoriomotoras y de asociación dorsal a circuitos de los ganglios basales.",
    "limits": "Une corteza dorsal y estriado, con terminaciones topográficas. El rótulo describe un grupo de fibras de la plantilla."
  },
  "Dentatorubrothalamic tract": {
    "region": "Cerebelo, mesencéfalo y tálamo motor",
    "relations": "Eferencias del dentado ascienden por el pedúnculo cerebeloso superior, cruzan en su mayoría en el mesencéfalo y se relacionan con el núcleo rojo.",
    "function": "Lleva información de coordinación y corrección motora hacia el tálamo motor y, mediante este, a la corteza.",
    "limits": "Del núcleo dentado al tegmento mesencefálico y región ventrolateral talámica. Existen componentes de trayecto y cruce distintos."
  },
  "Frontal aslant tract": {
    "region": "Sustancia blanca del lóbulo frontal",
    "relations": "Fascículo frontal oblicuo entre regiones medial superior, como pre-SMA/SMA, y giro frontal inferior.",
    "function": "Participa en el inicio y secuenciación de acciones. En el hemisferio dominante se vincula a fluidez y programación del habla.",
    "limits": "Trayecto oblicuo intrafrontal desde medial y superior hacia el opérculo frontal lateral e inferior."
  },
  "Inferior cerebellar peduncle": {
    "region": "Bulbo dorsolateral y entrada inferior al cerebelo",
    "relations": "Une bulbo y cerebelo cerca del receso lateral del cuarto ventrículo. Contiene el cuerpo restiforme y el juxtarrestiforme.",
    "function": "Conduce entrada propioceptiva, vestibular y olivar para equilibrio y aprendizaje motor. También incluye conexiones cerebelovestibulares de salida.",
    "limits": "Desde la región dorsolateral bulbar hacia el cerebelo. Lateral al cuarto ventrículo y caudal al pedúnculo medio."
  },
  "Inferior fronto-occipital fasciculus": {
    "region": "Sustancia blanca profunda ventral, entre frontal y occipital",
    "relations": "Haz largo que atraviesa el corredor de cápsulas cercana a la ínsula y se prolonga hacia zonas occipitales y temporoparietales posteriores.",
    "function": "Contribuye a integrar información visual con procesos semánticos y de control frontales. Sus contribuciones dependen del subcomponente.",
    "limits": "Extremos frontales y posteriores, pasando por el tallo temporal y la región profunda periinsular. Los extremos varían según la técnica."
  },
  "Inferior longitudinal fasciculus": {
    "region": "Sustancia blanca ventral occipitotemporal",
    "relations": "Haz de asociación que comunica corteza occipital con regiones temporales anteriores, por debajo de vías dorsales.",
    "function": "Transmite información de la vía visual ventral utilizada en reconocimiento de objetos y caras y en asociaciones visuales de memoria.",
    "limits": "Desde occipital hacia temporal anterior a través de la sustancia blanca lateral y ventral al asta temporal. Se relaciona con radiación óptica e IFOF."
  },
  "Medial lemniscus": {
    "region": "Bulbo, puente, mesencéfalo y tálamo",
    "relations": "Se forma después del cruce de fibras arcuatas internas de los núcleos grácil y cuneado. Asciende por el tronco y cambia de orientación.",
    "function": "Conduce tacto discriminativo, vibración y propiocepción consciente del cuerpo contralateral hacia el tálamo.",
    "limits": "Desde la decusación sensitiva bulbar hasta el núcleo ventral posterolateral del tálamo."
  },
  "Middle cerebellar peduncle": {
    "region": "Puente lateral y cerebelo",
    "relations": "Gran puente de fibras entre la base pontina y el hemisferio cerebeloso. Sus fibras proceden predominantemente de núcleos pontinos contralaterales.",
    "function": "Es la principal entrada pontocerebelosa de información cortical para coordinación, ajuste y aprendizaje.",
    "limits": "Desde fibras pontinas transversas que cruzan la línea media hasta la sustancia blanca del hemisferio cerebeloso."
  },
  "Middle longitudinal fasciculus": {
    "region": "Sustancia blanca de la región temporal superior",
    "relations": "Haz de asociación que discurre longitudinalmente en profundidad del giro temporal superior hacia territorios parietales u occipitales posteriores.",
    "function": "Su conectividad sugiere participación en integración auditiva, lingüística y multisensorial. La contribución funcional específica se sigue estudiando.",
    "limits": "Desde temporal superior y polo temporal hacia regiones posteriores. Las terminaciones descritas varían según método y subdivisión."
  },
  "Optic radiation": {
    "region": "Sustancia blanca temporal y parietal profunda, vía visual",
    "relations": "Fibras geniculocalcarinas desde el cuerpo geniculado lateral. La porción inferior hace el asa de Meyer por delante del asta temporal.",
    "function": "Lleva información del hemicampo contralateral a la corteza visual primaria. El asa de Meyer transmite principalmente el campo visual superior.",
    "limits": "Desde el geniculado lateral a los bancos calcarinos, por rutas temporal inferior y parietal o dorsal, entre otras subdivisiones."
  },
  "Posterior thalamic radiation": {
    "region": "Tálamo posterior y sustancia blanca retrolenticular",
    "relations": "Conecta sectores posteriores del tálamo con cortezas occipitales y parietales posteriores. La radiación óptica forma parte de este sistema posterior.",
    "function": "Sostiene intercambios visuales y de atención entre tálamo y corteza posterior, según el núcleo de origen.",
    "limits": "Del tálamo posterior por el corredor retrolenticular hacia la convexidad parietooccipital y el occipital medial."
  },
  "Reticulospinal tract": {
    "region": "Formación reticular pontobulbar y médula espinal",
    "relations": "Vías descendentes que parten de la formación reticular del puente y bulbo y se distribuyen por cordones anteriores y laterales.",
    "function": "Regula tono, postura y ajustes de movimiento y marcha. Actúa junto con vías vestibuloespinales y corticoespinales.",
    "limits": "Desde núcleos reticulares pontinos y bulbares hasta interneuronas y circuitos motores medulares bilaterales."
  },
  "Superior cerebellar peduncle": {
    "region": "Cerebelo superior, cuarto ventrículo y mesencéfalo caudal",
    "relations": "Haz que emerge del cerebelo y converge hacia el mesencéfalo junto al velo medular superior.",
    "function": "Es la salida principal de los núcleos cerebelosos profundos hacia núcleo rojo y tálamo. Incluye también aferencias como las espinocerebelosas ventrales.",
    "limits": "Desde núcleos profundos y región cerebelosa superior hacia la decusación mesencefálica. Forma parte de la pared superolateral del cuarto ventrículo."
  },
  "Superior longitudinal fasciculus I": {
    "region": "Sistema longitudinal superior dorsal, frontal–parietal",
    "relations": "Componente dorsal que comunica el lobulillo parietal superior y regiones frontales superiores o premotoras mediales.",
    "function": "Contribuye a redes dorsales de atención espacial y coordinación de acciones guiadas por información corporal y visual.",
    "limits": "Recorre el techo de la sustancia blanca hemisférica por encima de SLF II. Sus terminaciones varían por atlas."
  },
  "Superior longitudinal fasciculus II": {
    "region": "Sistema longitudinal superior medio, frontal–parietal",
    "relations": "Componente entre parietal inferior posterior, especialmente región angular, y corteza frontal lateral media.",
    "function": "Participa en orientación espacial, control atencional y transferencia de información parietal a redes ejecutivas frontales.",
    "limits": "Trayecto lateral de sustancia blanca, entre el componente dorsal I y el componente ventral III."
  },
  "Superior longitudinal fasciculus III": {
    "region": "Sistema longitudinal superior ventral, frontal–parietal",
    "relations": "Conecta el parietal inferior anterior, cercano al giro supramarginal, con áreas premotoras ventrales y frontal inferior.",
    "function": "Interviene en circuitos de integración sensoriomotora y, en el hemisferio dominante, en procesamiento fonológico y articulación.",
    "limits": "Segmento más ventral del SLF, profundo al opérculo frontoparietal. Se diferencia del fascículo arqueado por sus conexiones parietales."
  },
  "Superior thalamic radiation": {
    "region": "Tálamo lateral, cápsula interna y región perirolándica",
    "relations": "Proyecciones recíprocas del tálamo lateral hacia corteza central y parietal, por cápsula interna y corona radiada.",
    "function": "Transmite señales somatosensoriales a la corteza y participa en circuitos talamocorticales motores según el grupo de fibras.",
    "limits": "Desde núcleos laterales del tálamo hacia giros precentral y poscentral y regiones parietales."
  },
  "Uncinate fasciculus": {
    "region": "Sustancia blanca frontotemporal anterior",
    "relations": "Fascículo en gancho que cruza el tallo temporal cerca del limen insular y conecta temporal anterior con frontal orbitario y ventral.",
    "function": "Facilita el intercambio entre información semántica o mnésica temporal y valoración emocional y conductual orbitofrontal.",
    "limits": "Desde el polo temporal y regiones anteriores temporales hacia corteza orbitofrontal y frontal inferior, rodeando la cisura lateral proximal.",
    "summary": "También llamado fascículo uncinado. Une el temporal anterior con la corteza frontal ventral."
  },
  "Anterior commissure": {
    "region": "Línea media del telencéfalo, pared anterior del tercer ventrículo",
    "relations": "Pequeño haz transversal anterior a las columnas del fórnix, cerca de la lámina terminal.",
    "function": "Conecta entre hemisferios regiones temporales anteriores y circuitos olfatorios o límbicos mediante componentes distintos.",
    "limits": "Cruza la línea media por delante del tercer ventrículo y se abre lateralmente hacia telencéfalo basal y temporal."
  },
  "Corpus callosum": {
    "region": "Línea media telencefálica, techo ventricular",
    "relations": "Comisura gruesa arqueada sobre los ventrículos laterales, por debajo del giro cingulado.",
    "function": "Transfiere información entre cortezas de ambos hemisferios. Sus porciones conectan territorios frontales, centrales, parietales, temporales y occipitales.",
    "limits": "De delante a atrás: rostro, rodilla, cuerpo y esplenio. Superiormente lo sigue el surco calloso."
  },
  "Fornix": {
    "region": "Sustancia blanca límbica, bajo el cuerpo calloso",
    "relations": "Las fimbrias hipocampales continúan como pilares posteriores que convergen en el cuerpo y se separan anterior y ventralmente en columnas.",
    "function": "Principal vía de salida hipocampal hacia estructuras septales, hipotalámicas y cuerpos mamilares. Participa en circuitos de memoria.",
    "limits": "Desde el hipocampo por fimbria, pilares, cuerpo y columnas. La comisura anterior distingue fibras precomisurales y poscomisurales.",
    "summary": "Haz de proyección curvo de la formación hipocampal."
  },
  "Hippocampal commissure": {
    "region": "Línea media límbica, unión de pilares del fórnix",
    "relations": "Comisura entre los pilares posteriores del fórnix bajo el esplenio del cuerpo calloso.",
    "function": "Conecta componentes de ambos sistemas hipocampales. Su alcance funcional en humanos no se deduce del calibre ni de la forma de la malla.",
    "limits": "Pequeño cruce transversal entre pilares, cerca de la transición al cuerpo del fórnix."
  },
  "Stria terminalis": {
    "region": "Sistema límbico telencefálico, surco talamoestriado",
    "relations": "Haz en C que sigue el contorno del ventrículo lateral, cerca de la cola y cuerpo del caudado y de la vena talamoestriada.",
    "function": "Conecta la amígdala con el núcleo del lecho de la estría terminal y regiones hipotalámicas y septales involucradas en respuestas autonómicas y conductuales.",
    "limits": "Desde la región amigdalina temporal, por el surco entre caudado y tálamo, hacia el prosencéfalo basal."
  },
  "White matter of telencephalon": {
    "region": "Interior de los hemisferios cerebrales",
    "relations": "Masa subcortical profunda entre la corteza, los núcleos basales y los ventrículos.",
    "function": "Alberga fibras de asociación, comisurales y de proyección que distribuyen señales dentro y entre hemisferios y con regiones subcorticales.",
    "limits": "Transición gris–blanca superficial; por dentro bordea los ventrículos y núcleos profundos. La malla agrupa múltiples haces."
  },
  "Anterior hypothalamus": {
    "region": "Hipotálamo anterior, por encima del quiasma",
    "relations": "Región supraóptica vecina a la pared del tercer ventrículo. Contiene varios núcleos, entre ellos grupos supraópticos y paraventriculares.",
    "function": "Integra funciones neuroendocrinas y autonómicas. Sus núcleos contribuyen a ritmos circadianos, balance de agua y respuestas térmicas.",
    "limits": "Sector anterior alrededor del quiasma, caudal a la región preóptica y rostral al sector tuberal. La malla agrupa núcleos."
  },
  "Anterior nuclei of thalamus": {
    "region": "Polo anterior del tálamo, diencéfalo",
    "relations": "Grupo vecino al tubérculo anterior talámico. Recibe aferencias de cuerpos mamilares por el tracto mamilotalámico y se conecta con el cíngulo.",
    "function": "Participa en memoria episódica, orientación espacial y circuitos hipocampo–mamilar–talámico–cingulado.",
    "limits": "Ocupa el sector anterior delimitado en parte por la bifurcación anterior de la lámina medular interna."
  },
  "Habenula": {
    "region": "Epitálamo dorsal, región posterior del tercer ventrículo",
    "relations": "Pequeño complejo medial y lateral próximo a la pineal. Recibe fibras por la estría medular del tálamo y proyecta por el fascículo retroflejo.",
    "function": "Modula circuitos monoaminérgicos relacionados con motivación, aprendizaje por resultados desfavorables y adaptación conductual.",
    "limits": "En el trígono habenular, junto al extremo posterior de la estría medular y cerca de su comisura."
  },
  "Intralaminar and lateral posterior nuclei": {
    "region": "Tálamo dorsal y lámina medular interna",
    "relations": "Etiqueta compuesta: los núcleos intralaminares están en la lámina medular interna y el lateral posterior ocupa un sector de asociación dorsal.",
    "function": "Los intralaminares apoyan alerta y modulación corticoestriatal. El lateral posterior contribuye a integración parietal y atencional.",
    "limits": "Las dos regiones tienen ubicaciones y límites distintos. Aquí se muestran agrupadas por la parcelación del atlas."
  },
  "Lateral geniculate body": {
    "region": "Tálamo posterolateral, metatálamo visual",
    "relations": "Relieve lateral al geniculado medial, cerca del pulvinar. Recibe fibras retinianas por el tracto óptico.",
    "function": "Relevo principal de la vía visual hacia la corteza calcarina. Procesa información del hemicampo contralateral con organización retinotópica.",
    "limits": "Entre el tracto óptico y el origen de la radiación óptica en la región posterior talámica."
  },
  "Lateral hypothalamus": {
    "region": "Zona lateral del hipotálamo",
    "relations": "Región lateral a los núcleos hipotalámicos mediales, atravesada por el fascículo prosencefálico medial.",
    "function": "Contiene poblaciones que intervienen en vigilia, motivación alimentaria y regulación del balance energético, entre ellas neuronas orexinérgicas.",
    "limits": "Zona lateral de extensión anteroposterior amplia. Sus límites son internos y aproximados en la parcelación."
  },
  "Mamillary body": {
    "region": "Base del hipotálamo posterior",
    "relations": "Prominencia par próxima a la fosa interpeduncular. Recibe fibras hipocampales por el fórnix poscomisural.",
    "function": "Integra circuitos para memoria episódica y orientación. Envía proyecciones al tálamo anterior por el tracto mamilotalámico.",
    "limits": "Posterior al túber cinéreo y anterior a la sustancia perforada posterior. Incluye núcleos mamilares."
  },
  "Medial geniculate body": {
    "region": "Tálamo posteromedial, metatálamo auditivo",
    "relations": "Relieve medial al geniculado lateral. Recibe proyecciones del colículo inferior a través de su brazo.",
    "function": "Releva y modula señales auditivas para la corteza temporal, incluyendo información de frecuencia y contexto.",
    "limits": "Entre el brazo del colículo inferior y las radiaciones acústicas hacia el plano supratemporal."
  },
  "Mediodorsal nucleus": {
    "region": "Tálamo medial, junto al tercer ventrículo",
    "relations": "Núcleo mediodorsal vecino a la lámina medular interna, con conexiones recíprocas prefrontales y conexiones límbicas.",
    "function": "Participa en redes de memoria de trabajo, toma de decisiones y regulación de la conducta según sus subdivisiones.",
    "limits": "Medial a la lámina medular interna, próximo a la pared ventricular y rostral a regiones talámicas posteriores."
  },
  "Optic chiasm": {
    "region": "Base diencefálica, región supraselar",
    "relations": "Cruce parcial de nervios ópticos. Se sitúa superior a la hipófisis y anterior al infundíbulo, bajo el hipotálamo anterior.",
    "function": "Las fibras de hemirretinas nasales cruzan. Cada tracto óptico lleva información del hemicampo visual contralateral de ambos ojos.",
    "limits": "Entre nervios ópticos por delante y tractos ópticos por detrás. La relación exacta con el diafragma selar varía."
  },
  "Optic tract": {
    "region": "Cara inferolateral del diencéfalo",
    "relations": "Continúa el quiasma hacia la región geniculada, rodeando el pedúnculo cerebral, con colaterales al pretecto y colículo superior.",
    "function": "Lleva señales del hemicampo visual contralateral. Sus ramas complementarias participan en reflejos pupilares y orientación visual.",
    "limits": "Desde la parte posterior del quiasma hasta el geniculado lateral y otros destinos visuales subcorticales."
  },
  "Posterior commissure": {
    "region": "Diencéfalo posterior, región pretectal",
    "relations": "Pequeña comisura dorsal a la entrada del acueducto y cercana a la pineal.",
    "function": "Conduce cruces de circuitos pretectales y oculomotores que participan en respuestas pupilares bilaterales y control de la mirada vertical.",
    "limits": "Cruza la línea media en la pared posterior del tercer ventrículo, en el entorno caudal del receso pineal."
  },
  "Posterior hypothalamus": {
    "region": "Hipotálamo posterior, región mamilar y supramamilar",
    "relations": "Sector detrás del hipotálamo tuberal y delante del tegmento mesencefálico. Incluye grupos posteriores próximos a cuerpos mamilares.",
    "function": "Sus diferentes núcleos participan en respuestas autonómicas, conservación del calor, vigilia y circuitos de memoria.",
    "limits": "Se extiende entre el sector tuberal y la transición al mesencéfalo. La malla agrupa poblaciones con funciones distintas."
  },
  "Preoptic hypothalamus": {
    "region": "Hipotálamo preóptico, región anterior a la supraóptica",
    "relations": "Junto a la lámina terminal y anterior o superior al quiasma. Vecino a la comisura anterior y al tercer ventrículo.",
    "function": "Integra señales térmicas y participa en sueño y control reproductivo. Las poblaciones neuronales preópticas desempeñan papeles diferentes.",
    "limits": "Sector rostral del hipotálamo, anterior a la región supraóptica y junto al receso óptico del tercer ventrículo."
  },
  "Pulvinar": {
    "region": "Tálamo posterior, pulvinar",
    "relations": "Gran prominencia talámica posterior que cubre parcialmente la región geniculada. Conecta con corteza parietal, temporal y occipital.",
    "function": "Participa en atención visual, selección de estímulos e integración entre áreas de asociación. Tiene subdivisiones con conexiones diferentes.",
    "limits": "Extremo posterior del tálamo, dorsal a los cuerpos geniculados y próximo a la cisterna cuadrigémina."
  },
  "Pineal gland": {
    "region": "Epitálamo, techo posterior del tercer ventrículo",
    "relations": "Órgano endocrino medio por encima del tectum, entre regiones talámicas posteriores, unido por un tallo a la pared ventricular.",
    "function": "Secreta melatonina con un ritmo nocturno y transmite información sobre el ciclo luz–oscuridad al organismo.",
    "limits": "Se proyecta hacia la cisterna cuadrigémina, cerca de las comisuras habenular y posterior."
  },
  "Stria medullaris thalami": {
    "region": "Borde dorsomedial del tálamo",
    "relations": "Haz del epitálamo que recorre el borde superior medial del tálamo hacia los núcleos habenulares.",
    "function": "Conduce entradas del prosencéfalo basal y regiones límbicas a la habénula. Contribuye a la modulación de circuitos motivacionales.",
    "limits": "Desde la región anterior del diencéfalo por su borde medial hasta el trígono habenular."
  },
  "Tuberal hypothalamus": {
    "region": "Hipotálamo medio, región tuberal",
    "relations": "Rodea al tercer ventrículo a nivel del túber cinéreo y la eminencia media. Incluye regiones arcuata, ventromedial y dorsomedial.",
    "function": "Integra señales de estado energético y control neuroendocrino. El arcuato y la eminencia media participan en la regulación de la hipófisis anterior.",
    "limits": "Entre el sector supraóptico rostral y el mamilar caudal, en relación inferior con el infundíbulo."
  },
  "Ventral anterior nucleus": {
    "region": "Tálamo motor, sector ventral anterior",
    "relations": "Parte rostral del grupo ventral talámico, con conexiones con ganglios basales y cortezas premotoras.",
    "function": "Retransmite señales implicadas en selección y preparación motora. Sus territorios de aferencia son heterogéneos.",
    "limits": "Rostral al grupo ventrolateral, medial a la cápsula interna. Es un límite nuclear, no un surco cortical."
  },
  "Ventral laterodorsal nucleus": {
    "region": "Tálamo motor, sector ventrolateral dorsal",
    "relations": "División dorsal del complejo ventrolateral en nomenclaturas de atlas talámicos, lateral al grupo medial.",
    "function": "Participa en circuitos talamocorticales motores. Recibe entradas subcorticales que integran señales cerebelosas y, según la subregión, de ganglios basales.",
    "limits": "Sector dorsal del grupo ventrolateral. Las fronteras entre modelos nucleares se establecen por atlas o histología."
  },
  "Ventral lateroventral nucleus": {
    "region": "Tálamo motor, sector ventrolateral ventral",
    "relations": "División ventral del complejo ventrolateral, próxima a otros núcleos ventrales y lateral al grupo medial.",
    "function": "Participa en el relevo motor hacia áreas corticales de movimiento, con aporte cerebeloso importante en parte del territorio.",
    "limits": "Sector inferior o ventral del grupo ventrolateral. La parcelación probabilística aproxima sus fronteras internas."
  },
  "Basolateral complex": {
    "region": "Amígdala, sector basolateral temporal anterior",
    "relations": "Conjunto de núcleos amigdalinos asociados con aferencias corticales y talámicas y con proyecciones hacia otras divisiones amigdalinas.",
    "function": "Asocia estímulos con su valor emocional y con resultados aprendidos. Interactúa con hipocampo y corteza prefrontal en memoria y conducta.",
    "limits": "En el campo basolateral de la amígdala. Su extensión y separación del núcleo lateral dependen de la nomenclatura del atlas."
  },
  "Caudate nucleus": {
    "region": "Estriado dorsal, alrededor del ventrículo lateral",
    "relations": "La cabeza abulta en el asta frontal, el cuerpo sigue el ventrículo y la cola curva hacia el temporal, cerca de la amígdala.",
    "function": "Integra señales corticales y dopaminérgicas en circuitos de selección de acciones, aprendizaje y funciones ejecutivas.",
    "limits": "Entre la pared ventricular y la cápsula interna en sus porciones anteriores. Se distinguen cabeza, cuerpo y cola."
  },
  "Central nucleus": {
    "region": "Amígdala centromedial, temporal anterior profundo",
    "relations": "Núcleo cercano a zonas dorsomediales del complejo amigdalino. Recibe señales de otras regiones de la amígdala.",
    "function": "Es una salida importante hacia hipotálamo y tronco para respuestas autonómicas, endocrinas y conductuales a estímulos relevantes.",
    "limits": "Límite nuclear interno en la amígdala superior. Su borde depende de la resolución del atlas."
  },
  "Corticomedial group": {
    "region": "Amígdala superficial y medial, temporal anterior profundo",
    "relations": "Grupo que reúne regiones corticales y mediales amigdalinas, cercanas a la superficie del uncus y al prosencéfalo basal.",
    "function": "Participa en la integración de señales olfatorias y límbicas con respuestas autonómicas y sociales. La función varía entre núcleos.",
    "limits": "Se distingue topográficamente de grupos basolaterales más profundos. Sus componentes tienen límites microscópicos."
  },
  "Globus pallidus external": {
    "region": "Núcleo lenticular, ganglios basales",
    "relations": "Segmento lateral del globo pálido entre el putamen y el segmento interno.",
    "function": "Modula la actividad de circuitos de ganglios basales, incluido el circuito indirecto. Sus proyecciones inhibitorias influyen en el subtálamo.",
    "limits": "Separado del putamen por una lámina medular y del segmento interno por la lámina medular medial."
  },
  "Globus pallidus internal": {
    "region": "Núcleo lenticular medial, ganglios basales",
    "relations": "Segmento medial del globo pálido, adyacente al externo y próximo a la cápsula interna.",
    "function": "Es una salida inhibitoria principal de los ganglios basales hacia tálamo y tronco. Regula cuándo y cómo se expresan acciones.",
    "limits": "Medial al globo pálido externo y lateral a la cápsula interna, con separación por láminas de sustancia blanca."
  },
  "Lateral nucleus": {
    "region": "Amígdala lateral, temporal anterior profundo",
    "relations": "Núcleo próximo al sector lateral del complejo amigdalino, vecino a otros núcleos basolaterales.",
    "function": "Recibe señales sensoriales del tálamo y de la corteza. Participa en el aprendizaje asociativo de la relevancia afectiva de los estímulos.",
    "limits": "Territorio nuclear lateral de la amígdala. La frontera con núcleos basales depende de la parcelación."
  },
  "Nucleus accumbens": {
    "region": "Estriado ventral, prosencéfalo basal",
    "relations": "Cerca de la continuidad ventral entre la cabeza del caudado y el putamen. Recibe entradas corticales, límbicas y dopaminérgicas.",
    "function": "Convierte información de valor e incentivo en motivación para acciones y contribuye al aprendizaje por recompensa.",
    "limits": "Ventral al estriado dorsal y anterior al pálido ventral. Las divisiones de núcleo y cubierta son microscópicas."
  },
  "Septal nuclei": {
    "region": "Región septal, prosencéfalo basal medial",
    "relations": "Grupos neuronales bajo el cuerpo calloso anterior, próximos a la comisura anterior y a las columnas del fórnix.",
    "function": "Se conectan con la formación hipocampal e influyen en ritmos hipocampales y circuitos de memoria y motivación.",
    "limits": "Se sitúan junto a la línea media, por delante del hipotálamo. Se distinguen grupos mediales y laterales."
  },
  "Putamen": {
    "region": "Estriado dorsal lateral, núcleo lenticular",
    "relations": "El putamen está lateral al globo pálido y medial al claustro; la cápsula externa lo separa del claustro.",
    "function": "Recibe aferencias corticales, especialmente sensoriomotoras. Participa en selección, ajuste y aprendizaje de movimientos y hábitos.",
    "limits": "Su borde medial contacta el globo pálido a través de una lámina medular. Lateralmente sigue la cápsula externa."
  },
  "Substantia nigra": {
    "region": "Mesencéfalo ventral, entre tegmento y pedúnculo",
    "relations": "Contiene una parte compacta dopaminérgica dorsal y una reticulada principalmente GABAérgica hacia ventral.",
    "function": "La compacta modula el estriado, el aprendizaje y el movimiento. La reticulada es una vía de salida de ganglios basales, incluida la regulación de la mirada.",
    "limits": "Se sitúa dorsal al pie del pedúnculo y ventral al tegmento. La malla general agrupa ambos componentes."
  },
  "Subthalamic nucleus": {
    "region": "Subtálamo, diencéfalo ventral",
    "relations": "Núcleo entre tálamo y mesencéfalo, cerca de la zona incierta, la cápsula interna y la sustancia negra.",
    "function": "Proyecta de forma excitatoria al globo pálido interno y contribuye a regular la selección e inhibición de acciones en circuitos motores.",
    "limits": "Ventral a la zona incierta y dorsal a la sustancia negra, medial a la cápsula interna."
  },
  "Anterior quadrangular lobule": {
    "region": "Hemisferio cerebeloso, lóbulo anterior",
    "relations": "Porción hemisférica del lobulillo IV–V, correspondiente lateralmente a la región del culmen.",
    "function": "Forma parte de territorios cerebelosos sensoriomotores implicados en el ajuste de movimientos de extremidades y postura.",
    "limits": "Anterior a la fisura primaria, que lo separa del lóbulo posterior."
  },
  "Biventral lobule": {
    "region": "Cara inferior del hemisferio cerebeloso, lobulillo VIII",
    "relations": "Lobulillo posterior hemisférico, vecino a la amígdala cerebelosa y lateral al vermis inferior.",
    "function": "Contiene una representación sensoriomotora posterior relacionada con coordinación y corrección de movimientos.",
    "limits": "Entre las fisuras prepiramidal y secundaria en la clasificación lobular del sector VIII, con límites superficiales variables."
  },
  "Central lobule": {
    "region": "Vermis cerebeloso superior, lobulillos II–III",
    "relations": "Relieve medio posterior a la língula y anterior al culmen. Se prolonga a los lados en sus alas.",
    "function": "Contribuye a redes mediales del lóbulo anterior que coordinan postura, marcha y control axial.",
    "limits": "Entre las fisuras precentral y preculminar, en la cara superior anterior del vermis."
  },
  "Culmen": {
    "region": "Vermis superior, lobulillos IV–V",
    "relations": "Prominencia alta del vermis, posterior al lobulillo central y anterior al declive.",
    "function": "Participa en circuitos espinocerebelosos que ajustan la postura, la marcha y la sincronización motora.",
    "limits": "Fisura preculminar por delante y primaria por detrás. Se continúa lateralmente con el cuadrangular anterior."
  },
  "Declive": {
    "region": "Vermis superior, lobulillo VI",
    "relations": "Porción de la pendiente posterior del vermis, detrás del culmen y delante del folium.",
    "function": "Integra circuitos que participan en coordinación motora y oculomotora. El lobulillo VI también muestra conectividad con redes cognitivas.",
    "limits": "Entre la fisura primaria y la región de la fisura posclival. Continúa lateralmente con el cuadrangular posterior."
  },
  "Flocculus": {
    "region": "Cerebelo anteroinferior, lóbulo floculonodular",
    "relations": "Lobulillo par vecino al ángulo pontocerebeloso y al receso lateral del cuarto ventrículo.",
    "function": "Recibe información vestibular y contribuye a estabilizar la mirada y adaptar el reflejo vestibuloocular.",
    "limits": "Se une por un pedúnculo al territorio nodular y se distingue de lobulillos contiguos en la superficie inferior."
  },
  "Folium of vermis": {
    "region": "Vermis posterior superior, sector VIIA",
    "relations": "Pliegue en la vecindad posterior del declive y superior al túber, próximo a la fisura horizontal.",
    "function": "Pertenece al sector posterior del vermis, asociado con integración de redes oculomotoras y motoras. La contribución de un folio individual es variable.",
    "limits": "Entre el declive y la región del túber, sobre la transición horizontal del cerebelo posterior."
  },
  "Gracile lobule": {
    "region": "Superficie inferior del hemisferio cerebeloso, lóbulo posterior",
    "relations": "Denominación clásica de un lobulillo fino en el sector hemisférico inferior posterior, próximo al biventral y a sectores semilunares.",
    "function": "Forma parte de redes hemisféricas posteriores que ajustan acciones y se conectan con regiones de asociación.",
    "limits": "Su equivalencia exacta con subdivisiones modernas depende de la nomenclatura. Se orienta por las fisuras vecinas del lóbulo posterior."
  },
  "Inferior semilunar lobule": {
    "region": "Mitad posterior e inferior del hemisferio cerebeloso",
    "relations": "Lobulillo semilunar inferior, en la cara inferior, relacionado con el sistema hemisférico del lobulillo VII.",
    "function": "Participa en circuitos de asociación cerebelocorticales. Los sectores posteriores muestran conexiones con redes ejecutivas y lingüísticas.",
    "limits": "Queda inferior a la fisura horizontal, que lo separa del semilunar superior. El límite caudal depende de la clasificación."
  },
  "Lingula of cerebellum": {
    "region": "Vermis rostral, lobulillo I",
    "relations": "Laminitas estrechas del vermis en contacto con el velo medular superior, por delante del lobulillo central.",
    "function": "Contribuye a circuitos mediales del cerebelo anterior que ajustan postura y movimiento. Su función aislada es difícil de delimitar.",
    "limits": "En el extremo rostral del vermis, anterior a la fisura precentral."
  },
  "Nodule of vermis": {
    "region": "Vermis inferior, lobulillo X",
    "relations": "Componente medial del lóbulo floculonodular, cerca del techo caudal del cuarto ventrículo y anterior a la úvula.",
    "function": "Integra señales vestibulares para estimar la orientación de la cabeza respecto a la gravedad y regular equilibrio y mirada.",
    "limits": "Separado de la úvula por la fisura posterolateral y conectado lateralmente con los flóculos."
  },
  "Peduncle of flocculus": {
    "region": "Lóbulo floculonodular, cara anterior inferior",
    "relations": "Banda de conexión del flóculo con el resto del cerebelo, próxima al velo medular inferior y al receso lateral.",
    "function": "Conduce conexiones de la región flocular que contribuyen al reflejo vestibuloocular y al equilibrio.",
    "limits": "Desde la base del flóculo hacia su unión medial con estructuras del lóbulo floculonodular."
  },
  "Posterior quadrangular lobule": {
    "region": "Cara superior hemisférica, lobulillo VI",
    "relations": "Parte hemisférica lateral al declive y posterior al cuadrangular anterior.",
    "function": "Participa en coordinación motora y, en sus diferentes sectores, en tareas que reclutan redes oculomotoras, articulatorias y cognitivas.",
    "limits": "Fisura primaria hacia delante y región de la fisura superior posterior hacia los lobulillos semilunares."
  },
  "Pyramis of vermis": {
    "region": "Vermis inferior, lobulillo VIII",
    "relations": "Relieve del vermis posteroinferior, situado entre el túber y la úvula. Continúa lateralmente con el biventral.",
    "function": "Apoya el ajuste de postura, marcha y coordinación a través de circuitos sensoriomotores del vermis.",
    "limits": "Separado del túber por la fisura prepiramidal y de la úvula por la fisura secundaria."
  },
  "Base of peduncle": {
    "region": "Base cerebelosa del pedúnculo superior",
    "relations": "Porción proximal unida a la sustancia blanca cerebelosa, cerca de la región rostral del cuarto ventrículo.",
    "function": "Conduce principalmente eferencias de núcleos profundos hacia el tronco y el tálamo e incluye algunas aferencias.",
    "limits": "Corresponde al arranque cerebeloso del pedúnculo, antes de que ascienda hacia la decusación mesencefálica."
  },
  "Superior semilunar lobule": {
    "region": "Cara superior posterior del hemisferio cerebeloso",
    "relations": "Lobulillo semilunar superior, sobre la fisura horizontal y vecino a sectores de asociación del lobulillo VII.",
    "function": "Sus redes cerebelocorticales contribuyen a tareas de lenguaje, memoria de trabajo y control cognitivo según la región.",
    "limits": "Por encima de la fisura horizontal y detrás del sector cuadrangular posterior. Se corresponde con una subdivisión hemisférica clásica."
  },
  "Tonsil of cerebellum": {
    "region": "Cara inferior medial del hemisferio cerebeloso",
    "relations": "Prominencia redondeada lateral a la úvula y posterior al bulbo, próxima al agujero magno.",
    "function": "Forma parte del cerebelo lobular posterior y se incorpora a redes de coordinación. Su relación con el agujero magno es el reparo anatómico principal.",
    "limits": "En el hemisferio inferomedial, próxima a la cisterna magna, al borde medial de lobulillos inferiores y a la úvula."
  },
  "Tuber of vermis": {
    "region": "Vermis posterior inferior, sector VIIB",
    "relations": "Porción entre el folium posterior superior y la pirámide inferior, cercana a la transición de la fisura horizontal.",
    "function": "Se integra en circuitos del vermis posterior que modulan orientación y coordinación. El comportamiento funcional depende del territorio conectado.",
    "limits": "Cerca de la fisura horizontal por arriba y limitado hacia la pirámide por la prepiramidal."
  },
  "Uvula of vermis": {
    "region": "Vermis inferior, lobulillo IX",
    "relations": "Relieve medial entre las amígdalas cerebelosas, posterior al nódulo y anterior a la pirámide en la cara inferior.",
    "function": "Contribuye a circuitos vestibulocerebelosos y de integración postural y oculomotora.",
    "limits": "Entre la fisura secundaria que la separa de la pirámide y la posterolateral que la separa del nódulo."
  },
  "Wing of central lobule": {
    "region": "Hemisferio cerebeloso anterior, ala del lobulillo central",
    "relations": "Extensión lateral del lobulillo central del vermis en el límite rostral del hemisferio.",
    "function": "Participa en redes cerebelosas anteriores de coordinación sensoriomotora y ajuste postural.",
    "limits": "Continua medialmente con el lobulillo central y vecina a la língula y al cuadrangular anterior."
  }
};
  legacy["Insular branches of middle cerebral artery (M2-segment)"] = legacy["Insular branches of middle cerebral artery (M2)"];
  legacy["Middle cerebral artery (M3-segment)"] = legacy["Middle cerebral artery (M3 segment)"];

  const corticalDetails = {
  "unknown": {
    "region": "Superficie pial sin asignación a un giro",
    "relations": "Conjunto de vértices que la parcelación deja sin una etiqueta anatómica específica, en particular en regiones de transición o de la pared medial.",
    "function": "La etiqueta agrupa superficies sin clasificación. Para interpretar su función se requiere identificar la región concreta y su continuidad con las parcelas vecinas.",
    "limits": "El contorno sigue la asignación del algoritmo y puede tener varias partes. No corresponde a los límites de un giro ni de un surco único.",
    "note": "Esta etiqueta del atlas no identifica una estructura anatómica única."
  },
  "caudalmiddlefrontal": {
    "region": "Lóbulo frontal, sector posterior del giro frontal medio",
    "relations": "Parcela adyacente al giro precentral por detrás. Queda entre las regiones frontal superior e inferior y detrás del sector frontal medio rostral.",
    "function": "Contribuye a sostener la atención orientada a metas, preparar acciones y seleccionar respuestas en redes frontoparietales. En su vecindad caudal hay circuitos de control de la mirada.",
    "limits": "Entre los surcos frontales superior e inferior. Por detrás se aproxima a la región precentral. El borde rostral se define por la parcelación y no por un surco constante.",
    "summary": "«Caudal» indica el sector posterior del giro frontal medio."
  },
  "entorhinal": {
    "region": "Lóbulo temporal medial anterior, corteza parahipocampal",
    "relations": "Ocupa la región anterior del giro parahipocampal, junto al uncus y medial a la corteza perirrinal. Se conecta con hipocampo y subículo.",
    "function": "Las capas superficiales envían información al hipocampo por la vía perforante y las profundas reciben parte de su salida. Integra información de objetos, lugares y contexto para la memoria episódica.",
    "limits": "El surco colateral o rinal ofrece el reparo lateral según el patrón. Los límites con el subículo y las regiones vecinas son histológicos y la parcela de RM los aproxima."
  },
  "insula": {
    "region": "Lóbulo insular, profundidad del surco lateral",
    "relations": "Corteza profunda bajo los opérculos. Está lateral a cápsula extrema y claustro, y separada del frontal, parietal y temporal por el surco circular.",
    "function": "Integra señales viscerales y corporales, gusto y dolor. Sus regiones anteriores y posteriores contribuyen de manera distinta a la interocepción y a reconocer estímulos relevantes.",
    "limits": "El surco circular delimita el contorno, con el limen insular en la parte anteroinferior. El surco central insular separa giros cortos anteriores y largos posteriores."
  },
  "bankssts": {
    "region": "Temporal lateral posterior, bancos del surco temporal superior",
    "relations": "Parcela profunda de los bancos superior e inferior del surco temporal superior, entre giros temporal superior y medio.",
    "function": "Integra señales auditivas y visuales del habla y, según el sector, información de mirada y movimiento biológico en redes de percepción social.",
    "limits": "La parcela sigue las paredes del surco en su sector posterior, cerca de la transición temporoparietal."
  },
  "lateralorbitofrontal": {
    "region": "Base frontal, corteza orbitofrontal lateral",
    "relations": "Sector orbitario lateral a la región medial orbitofrontal e inferior al giro frontal inferior. Se relaciona con los surcos orbitarios y el limen insular por detrás.",
    "function": "Integra características sensoriales con resultados esperados. Contribuye a actualizar la conducta cuando cambian las consecuencias de una elección.",
    "limits": "Surcos orbitarios, transición a la porción orbitaria frontal inferior y límite con la parcela medial. El contorno combina reparos de superficie y parcelación."
  },
  "pericalcarine": {
    "region": "Cara medial occipital, corteza alrededor de la cisura calcarina",
    "relations": "Incluye corteza en los bancos del surco calcarino, entre cuña y giro lingual.",
    "function": "Abarca buena parte de V1, donde se procesa el hemicampo visual contralateral. El campo superior se representa en el banco inferior y el inferior en el superior.",
    "limits": "Se centra en el surco calcarino hacia el polo occipital. El borde de V1 identificado por función o histología puede diferir del de la parcela."
  },
  "medialorbitofrontal": {
    "region": "Base frontal medial, corteza orbitofrontal medial",
    "relations": "Corteza sobre la órbita, cercana al giro recto y al surco olfatorio. Se continúa hacia la corteza frontal ventromedial.",
    "function": "Participa en estimar valor subjetivo e integrar señales de recompensa con el estado corporal y las metas para guiar decisiones.",
    "limits": "Próxima a la fisura interhemisférica y al surco olfatorio. La frontera lateral con la parcela orbitofrontal lateral sigue convenciones del atlas."
  },
  "frontalpole": {
    "region": "Lóbulo frontal, polo o extremo anterior",
    "relations": "Zona de convergencia de las caras medial, lateral y basal frontales, por delante de las parcelas frontales longitudinales.",
    "function": "La corteza frontopolar contribuye a coordinar objetivos a largo plazo, explorar alternativas y mantener tareas pendientes mientras se completa otra.",
    "limits": "El atlas define una porción apical en relación con el comienzo de los surcos frontales. Su borde posterior es convencional y puede variar según la parcelación."
  },
  "rostralmiddlefrontal": {
    "region": "Lóbulo frontal, cara dorsolateral, porción anterior del giro frontal medio",
    "relations": "Delante del giro frontal medio caudal y detrás del polo frontal. Se sitúa entre el giro frontal superior por arriba y el frontal inferior por abajo.",
    "function": "Participa en la memoria de trabajo y el control ejecutivo: ayuda a mantener y reorganizar información, sostener reglas de una tarea y dirigir la atención según una meta. Actúa con otras regiones frontoparietales.",
    "limits": "El surco frontal superior la separa del giro frontal superior y el frontal inferior, del giro frontal inferior. El borde rostral se orienta por el extremo anterior del surco frontal superior; el corte hacia la porción caudal depende de la parcelación.",
    "summary": "«Rostral» indica que es la parte anterior del giro frontal medio."
  },
  "rostralanteriorcingulate": {
    "region": "Frontal medial, cíngulo anterior rostral",
    "relations": "Rodea la rodilla del cuerpo calloso y es vecino de la corteza prefrontal medial y de la región cingulada caudal.",
    "function": "Integra significado afectivo con decisiones y regulación autonómica. Participa en la valoración de estímulos y en respuestas emocionales.",
    "limits": "Surco calloso por debajo y surco cingulado hacia el borde externo. El límite con la porción anterior caudal es convencional."
  },
  "isthmuscingulate": {
    "region": "Unión cingulada posterior y parahipocampal, cara medial",
    "relations": "Estrechamiento que rodea el esplenio y une el cíngulo posterior con la región parahipocampal, cerca de la corteza retrosplenial.",
    "function": "Participa en redes que relacionan escenas, orientación y recuperación de memoria contextual.",
    "limits": "Próximo al surco calloso y a la confluencia calcarina, en la transición entre el cíngulo posterior y el parahipocampal."
  },
  "lateraloccipital": {
    "region": "Lóbulo occipital, corteza de asociación lateral",
    "relations": "Zona extraestriada de la convexidad occipital que se continúa hacia los complejos occipitotemporales y parietooccipitales.",
    "function": "Participa en reconocer formas y objetos a través de cambios de tamaño o perspectiva, en conexión con otras regiones de la vía visual ventral.",
    "limits": "Se orienta por surcos occipitales laterales variables y por los límites con temporal inferior, parietal posterior y occipital medial."
  },
  "caudalanteriorcingulate": {
    "region": "Cara medial frontal, cíngulo anterior caudal",
    "relations": "Parcela sobre el cuerpo calloso, detrás del cíngulo rostral y próxima al cíngulo medio anterior.",
    "function": "Contribuye a monitorear demandas de una tarea, ajustar esfuerzo y conducta y seleccionar respuestas, especialmente cuando compiten opciones.",
    "limits": "Surco calloso inferior y cingulado superior. La transición hacia las parcelas cinguladas vecinas se define mediante reglas del atlas."
  },
  "inferiorparietal": {
    "region": "Cara lateral parietal, región inferior posterior",
    "relations": "Parcela por debajo del intraparietal que incluye el territorio angular y se sitúa por detrás de la parcela supramarginal.",
    "function": "Integra modalidades sensoriales y contribuye a atención, representación espacial y cognición semántica. La participación varía según subregión y hemisferio.",
    "limits": "Intraparietal hacia dorsal, supramarginal hacia anterior y transición temporooccipital hacia posterior. La parcela de FreeSurfer separa el supramarginal con una etiqueta propia."
  },
  "posteriorcingulate": {
    "region": "Cara medial parietal, corteza cingulada posterior",
    "relations": "Está sobre el cuerpo calloso posterior, vecino al precúneo y en continuidad con el istmo cingulado.",
    "function": "Integra redes de memoria episódica y procesos autorreferenciales. Presenta conexiones con el precúneo y regiones de la formación hipocampal.",
    "limits": "Surco calloso inferior, vecindad del surco subparietal hacia el precúneo e istmo del cíngulo hacia caudal."
  }
};

  const cortex = {
    ...corticalDetails,
  "postcentral": legacy["Postcentral gyrus"],
  "parstriangularis": legacy["Triangular part of inferior frontal gyrus"],
  "supramarginal": legacy["Supramarginal gyrus"],
  "parsorbitalis": legacy["Orbital part of inferior frontal gyrus"],
  "middletemporal": legacy["Middle temporal gyrus"],
  "parahippocampal": legacy["Medial occipitotemporal gyrus (Parahippocampal)"],
  "paracentral": legacy["Paracentral gyrus and sulcus"],
  "cuneus": legacy["Cuneus"],
  "inferiortemporal": legacy["Inferior temporal gyrus"],
  "lingual": legacy["Lingual gyrus"],
  "superiorparietal": legacy["Superior parietal lobule"],
  "parsopercularis": legacy["Opercular part of inferior frontal gyrus"],
  "fusiform": legacy["Lateral occipitotemporal gyrus"],
  "superiorfrontal": legacy["Superior frontal gyrus"],
  "temporalpole": legacy["Temporal pole"],
  "precuneus": legacy["Precuneus"],
  "transversetemporal": legacy["Transverse temporal gyri"],
  "precentral": legacy["Precentral gyrus"],
  "superiortemporal": legacy["Superior temporal gyrus (Lateral part)"],
  };

  const groupDetails = {
  "temporal_mesial": {
    "region": "Cara medial y basal del lóbulo temporal",
    "relations": "Agrupa formación hipocampal, amígdala y corteza parahipocampal. La cabeza hipocampal se sitúa posteroinferior a la amígdala.",
    "function": "Integra memoria episódica y contextual con valor afectivo. Las estructuras agrupadas tienen contribuciones diferentes y se comunican con redes corticales y subcorticales.",
    "limits": "Se orienta por el uncus, el asta temporal del ventrículo lateral y los surcos hipocampal y colateral. La agrupación reúne varias estructuras sin una frontera común única.",
    "summary": "Conjunto de estructuras del lóbulo temporal medial."
  },
  "amygdala": {
    "region": "Temporal anteromedial, profundidad del uncus",
    "relations": "Complejo de núcleos anterior y superior a la cabeza hipocampal, cerca del extremo rostral del asta temporal.",
    "function": "Evalúa la relevancia biológica y emocional de estímulos y contribuye al aprendizaje asociativo. Sus núcleos coordinan respuestas autonómicas y conductuales.",
    "limits": "Se orienta por el uncus y el asta temporal anterior. Las fronteras entre sus núcleos son internas y se aproximan con atlas de RM.",
    "summary": "Conjunto de núcleos que el atlas agrupa en el temporal anterior."
  },
  "orbitofrontal": {
    "region": "Cara basal del lóbulo frontal",
    "relations": "Región que cubre las órbitas, próxima al giro recto, el surco olfatorio y la porción orbitaria del frontal inferior.",
    "function": "Integra señales sensoriales y experiencias previas para estimar valor y ajustar decisiones cuando cambian los resultados esperados.",
    "limits": "Surcos orbitarios en H y surco olfatorio como referencias; lateralmente se continúa con el frontal inferior y por detrás se aproxima al limen."
  },
  "subiculum": {
    "region": "Formación hipocampal, transición temporal medial",
    "relations": "Sector entre CA1 y la corteza parahipocampal. Recibe información de CA1 y se conecta con la corteza entorrinal y estructuras subcorticales.",
    "function": "Es una vía importante de salida de la formación hipocampal. Contribuye a memoria contextual y espacial y a circuitos hipocampo–diencéfalo.",
    "limits": "Las transiciones con CA1 y presubículo se reconocen histológicamente. El marcador del programa indica la posición aproximada.",
    "note": "El visor lo ubica mediante un marcador orientativo."
  },
  "temporal_posterolateral": {
    "region": "Cara lateral posterior del lóbulo temporal",
    "relations": "Conjunto de sectores posteriores de los giros temporales superior, medio e inferior, vecino a la unión temporoparietal y temporooccipital.",
    "function": "Integra información auditiva, visual y semántica según la subregión. En el hemisferio dominante, sectores posteriores participan en la comprensión del habla.",
    "limits": "Los surcos temporales superior e inferior separan sus giros. Hacia posterior se continúa con regiones parietales y occipitales."
  },
  "middle_cingulate": {
    "region": "Giro cingulado medio, cara hemisférica medial",
    "relations": "Se sitúa sobre el cuerpo calloso, entre el cíngulo anterior y el posterior, cerca del lobulillo paracentral.",
    "function": "Contribuye a seleccionar acciones, movilizar esfuerzo y ajustar respuestas motoras y atencionales ante demandas relevantes.",
    "limits": "Surco calloso hacia inferior, surco cingulado hacia superior y transición hacia la rama marginal en sectores caudales."
  },
  "thalamus": {
    "region": "Polo anterior del tálamo, diencéfalo",
    "relations": "Grupo vecino al tubérculo anterior talámico. Recibe aferencias de cuerpos mamilares por el tracto mamilotalámico y se conecta con el cíngulo.",
    "function": "Participa en memoria episódica, orientación espacial y circuitos hipocampo–mamilar–talámico–cingulado.",
    "limits": "Ocupa el sector anterior delimitado en parte por la bifurcación anterior de la lámina medular interna.",
    "title": "Núcleos anteriores del tálamo"
  }
};

  const groups = {
    ...groupDetails,
  "hippocampus": legacy["Hippocampus"],
  "parahippocampal": legacy["Medial occipitotemporal gyrus (Parahippocampal)"],
  "temporal_pole": legacy["Temporal pole"],
  "fusiform": legacy["Lateral occipitotemporal gyrus"],
  "fornix": legacy["Fornix"],
  "hippocampal_commissure": legacy["Hippocampal commissure"],
  "anterior_commissure": legacy["Anterior commissure"],
  "stria_terminalis": legacy["Stria terminalis"],
  "uncinate": legacy["Uncinate fasciculus"],
  "ilf": legacy["Inferior longitudinal fasciculus"],
  "ifof": legacy["Inferior fronto-occipital fasciculus"],
  "corpus_callosum": legacy["Corpus callosum"],
  "mammillary": legacy["Mamillary body"],
  "precuneus": legacy["Precuneus"],
  "insula": cortex["insula"],
  "entorhinal": cortex["entorhinal"],
  };

  const modelNotes = {
  "134": "La extensión de las dos mallas de este haz es asimétrica en el modelo.",
  "135": "La extensión de las dos mallas de este haz es asimétrica en el modelo.",
  "419": "Las mallas del vago tienen extensiones diferentes en la reconstrucción.",
  "420": "La malla del vago derecho tiene una discrepancia de posición y longitud en la reconstrucción."
};

  window.AtlasAnatomy = Object.freeze({legacy, cortex, groups, modelNotes});
})();
