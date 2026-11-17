/* Atlas ETM V27. Modelo narrativo suministrado por el usuario, NO una trayectoria
 * electrofisiológica universal ni un tractograma. Las conexiones anatómicas
 * deben contrastarse con los artículos originales del proyecto. */
(function (root) {
  'use strict';
  const SIDE = {left: '.l', right: '.r'};
  const STRUCTURES = {
    hippocampus: ['Hippocampus'],
    amygdala: ['Basolateral complex', 'Central nucleus', 'Corticomedial group', 'Lateral nucleus'],
    parahippocampal: ['Medial occipitotemporal gyrus (Parahippocampal*)'],
    temporal_pole: ['Temporal pole'],
    temporal_posterolateral: ['Middle temporal gyrus', 'Superior temporal gyrus (Lateral part)', 'Inferior temporal gyrus'],
    orbitofrontal: ['Orbital gyri', 'Orbital part of  inferior frontal gyrus'],
    mammillary: ['Mamillary body'],
    thalamus: ['Anterior nuclei of thalamus'],
    insula: [], // No identifica corteza insular inequívoca: se usa referencia orientativa sin iluminar la malla dudosa.
    insula_reference: ['Circular sulcus of insula'],
    middle_cingulate: ['Cingulate gyrus and sulcus (Middle anterior part)', 'Cingulate gyrus and sulcus (Middle posterior part)'],
    precuneus: ['Precuneus'],
    uncinate: ['Uncinate fasciculus'],
    fornix: ['Fornix']
  };
  const PROXIES = new Set(['subiculum','entorhinal','insula']);
  const CROSSING_STAGE = 4;
  const EXTENSION_STAGE = CROSSING_STAGE+1;
  const BRANCH_STAGE = EXTENSION_STAGE+1;
  const STEPS = [
    {title:'Hipocampo', short:'Hipocampo', parts:[['hippocampus','ipsi']], description:'Foco de inicio propuesto en la formación hipocampal. El atlas contiene una malla de hipocampo por hemisferio.', evidence:'Malla anatómica del modelo', color:0x2de3df},
    {title:'Subículo', short:'Subículo', parts:[['subiculum','ipsi']], description:'Región de transición conectada con CA1. Se indica con un marcador aproximado porque el archivo no la separa geométricamente.', evidence:'Posición ilustrativa, no segmentación', color:0x54dfae},
    {title:'Corteza entorrinal', short:'Entorrinal', parts:[['entorhinal','ipsi']], description:'Interfaz entre la formación hipocampal y la corteza del giro parahipocampal. Marcador aproximado sobre la región mesial temporal.', evidence:'Posición ilustrativa, no segmentación', color:0x80caff},
    {title:'Estructuras temporales ipsilaterales', short:'Temporal ipsilateral', ordered:true, parts:[['amygdala','ipsi'],['parahippocampal','ipsi'],['temporal_pole','ipsi'],['temporal_posterolateral','ipsi']], description:'En el modelo se recorren, en orden, amígdala, giro parahipocampal, polo temporal y corteza temporal posterolateral del hemisferio de inicio.', evidence:'Mallas anatómicas agrupadas', color:0x68beff},
    {title:'Propagación temporal contralateral', short:'Temporal contralateral', parts:[['temporal_posterolateral','contra'],['amygdala','contra'],['parahippocampal','contra'],['temporal_pole','contra']], description:'Desde la corteza temporal posterolateral se muestra el cruce al lóbulo temporal opuesto y el reclutamiento de otras regiones temporales de ese lado. Contralateral no equivale necesariamente a una crisis generalizada.', evidence:'Mallas anatómicas; conexión entre hemisferios esquemática', color:0xf1a66e},
    {title:'Corteza orbitofrontal', short:'Orbitofrontal', parts:[['orbitofrontal','ipsi']], tracts:[['uncinate','ipsi']], description:'La llegada a la corteza orbitofrontal marca el comienzo de la extensión de red en el modelo. El fascículo uncinado es un tracto frontotemporal modelado en el atlas. Su resaltado anatómico no demuestra que una crisis concreta haya seguido exactamente ese haz.', evidence:'Región cortical y fascículo uncinado reales del atlas', color:0xffc26b},
    {title:'Circuito talámico', short:'Tálamo', parts:[['mammillary','ipsi'],['thalamus','ipsi']], tracts:[['fornix','ipsi']], description:'Se destaca el fórnix y los cuerpos mamilares como relevo. El tálamo no es el destino directo principal del fórnix: el circuito puede continuar por el tracto mamilotalámico, no modelado aquí.', evidence:'Fórnix, cuerpos mamilares y núcleos talámicos; enlace intermedio esquemático', color:0xc9a4ff},
    {title:'Ínsula (referencia)', short:'Ínsula · orientativa', parts:[['insula','ipsi']], description:'La corteza insular es profunda y está cubierta por los opérculos. Las mallas de la fuente llamadas «Insula (Subcentral gyrus...)» son ambiguas y NO se presentan como ínsula verificada. Se indica una posición orientativa próxima al surco circular. Las cápsulas extrema e interna tampoco están individualizadas.', evidence:'Sin malla insular validada; localizador y conexión esquemáticos', color:0xff91bc},
    {title:'Cíngulo medio y precúneo', short:'Cíngulo y precúneo', parts:[['middle_cingulate','both'],['precuneus','both']], description:'Se muestran regiones del cíngulo medio y del precúneo de ambos hemisferios como extensión ilustrativa hacia redes corticales distribuidas.', evidence:'Regiones corticales del atlas; enlaces esquemáticos', color:0xa6ee77}
  ];
  const SOURCES = {
    yoo: {label:'Yoo et al., 2014',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC4103687/',contribution:'EEG intracraneal y participación de la corteza temporal posterolateral.'},
    polar: {label:'Schulze-Bonhage y San Antonio-Arce, 2025',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC12065117/',contribution:'Conexiones del polo temporal y patrones de propagación.'},
    morgan: {label:'Morgan et al., 2017',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC5498250/',contribution:'Red de regiones evaluada con RM de difusión y RM funcional en reposo.'},
    networks: {label:'San-Juan y Rodríguez-Méndez, 2023',url:'https://doi.org/10.1016/j.nrl.2020.06.010',contribution:'Marco neurofisiológico de la epilepsia como enfermedad de redes.'},
    ca1: {label:'The Role of the Subiculum in Epilepsy and Epileptogenesis',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC1198740/',contribution:'Proyecciones de CA1 al subículo y de este a la corteza entorrinal.'},
    fornix: {label:'Suplemento anatómico del fórnix',url:'https://doi.org/10.1136/jnnp-2019-322375',contribution:'Proyecciones por el fórnix poscomisural a cuerpos mamilares.'},
    papez: {label:'Vattoth y Mariya, 2023',url:'https://doi.org/10.1177/19714009221122250',contribution:'Relevo mamilar y tracto mamilotalámico.'},
    cross: {label:'Revisión de la propagación intertemporal',url:'https://pubmed.ncbi.nlm.nih.gov/17028541/',contribution:'Diversas vías propuestas para el cruce temporal.'},
    insula: {label:'Ghaziri et al., 2017',url:'https://pubmed.ncbi.nlm.nih.gov/26683170/',contribution:'Conectividad estructural de la ínsula con el giro parahipocampal y el cíngulo.'}
  };
  const STAGE_SOURCES = [
    ['yoo','networks'], ['ca1'], ['ca1'], ['yoo','polar'], ['cross','morgan'],
    ['polar'], ['fornix','papez','morgan'], ['polar','morgan','insula'], ['morgan','networks']
  ];
  // El índice fija cuándo se muestra la rama. El origen se declara por separado.
  // Solo las conexiones con una vía identificada reciben una curva de transmisión.
  const EDGES = [
    {stage:1, from:'hippocampus',to:'subiculum',fromSide:'ipsi',toSide:'ipsi',label:'Proyecciones locales de CA1',kind:'local',sourceLabel:'Hipocampo (CA1)'},
    {stage:2, from:'subiculum',to:'entorhinal',fromSide:'ipsi',toSide:'ipsi',label:'Capas profundas de la corteza entorrinal',kind:'local'},
    {stage:3, from:'entorhinal',to:'amygdala',fromSide:'ipsi',toSide:'ipsi',label:'Reclutamiento temporal ipsilateral',kind:'network'},
    {stage:3, from:'amygdala',to:'parahippocampal',fromSide:'ipsi',toSide:'ipsi',label:'Reclutamiento temporal ipsilateral',kind:'network'},
    {stage:3, from:'parahippocampal',to:'temporal_pole',fromSide:'ipsi',toSide:'ipsi',label:'Reclutamiento temporal ipsilateral',kind:'network'},
    {stage:3, from:'temporal_pole',to:'temporal_posterolateral',fromSide:'ipsi',toSide:'ipsi',label:'Reclutamiento temporal ipsilateral',kind:'network'},
    {stage:4, from:'temporal_posterolateral',to:'temporal_posterolateral',fromSide:'ipsi',toSide:'contra',label:'Cruce al temporal contralateral',kind:'network'},
    {stage:4, from:'temporal_posterolateral',to:'amygdala',fromSide:'contra',toSide:'contra',label:'Reclutamiento del temporal opuesto',kind:'network'},
    {stage:4, from:'temporal_posterolateral',to:'parahippocampal',fromSide:'contra',toSide:'contra',label:'Reclutamiento del temporal opuesto',kind:'network'},
    {stage:4, from:'temporal_posterolateral',to:'temporal_pole',fromSide:'contra',toSide:'contra',label:'Reclutamiento del temporal opuesto',kind:'network'},
    {stage:5, from:'temporal_pole',to:'orbitofrontal',fromSide:'ipsi',toSide:'ipsi',label:'Fascículo uncinado',kind:'tract',tract:'uncinate'},
    {stage:6, from:'subiculum',to:'mammillary',fromSide:'ipsi',toSide:'ipsi',anchorPart:'subiculum',label:'Fórnix poscomisural',kind:'tract',tract:'fornix',sourceLabel:'Subículo / formación hipocampal'},
    {stage:6, from:'mammillary',to:'thalamus',fromSide:'ipsi',toSide:'ipsi',label:'Tracto mamilotalámico · esquema',kind:'schematic'},
    {stage:7, from:'parahippocampal',to:'insula',fromSide:'ipsi',toSide:'ipsi',label:'Reclutamiento temporoinsular',kind:'network'}
  ];
  // Diagrama de relaciones para explicar las ramas de la secuencia didáctica.
  // No representa un tractograma ni demuestra el flujo electrofisiológico individual.
  function namesFor(part,side){
    return (STRUCTURES[part]||[]).flatMap(prefix=>side==='both'?[prefix+'.l',prefix+'.r']:[prefix+SIDE[side]]);
  }
  root.CrisisRouteData = Object.freeze({STRUCTURES,STEPS,EDGES,PROXIES,SOURCES,STAGE_SOURCES,CROSSING_STAGE,EXTENSION_STAGE,BRANCH_STAGE,namesFor});
})(window);
