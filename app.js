(() => {
  'use strict';

  const MODEL_URL = './models/brain.glb';
  const MANIFEST_URL = './models/manifest.json?v=30';
  const TRANSLATIONS_URL = './translations-es.json?v=30';
  const DRACO_PATH = './vendor/draco/';

  const CATEGORY_META = {
    cortex: { es: 'Corteza: giros, surcos y lóbulos', color: 0xb89ba8 },
    deep_grey: { es: 'Núcleos de sustancia gris profunda', color: 0xe598b6 },
    white_matter: { es: 'Sustancia blanca y comisuras', color: 0xd7dde6 },
    tracts: { es: 'Tractos de sustancia blanca', color: 0x55c8e8 },
    diencephalon: { es: 'Diencéfalo', color: 0xd4a3d9 },
    endocrine: { es: 'Hipófisis · glándula endocrina', color: 0xcac1db },
    brainstem: { es: 'Tronco encefálico', color: 0xc09b79 },
    cerebellum: { es: 'Cerebelo', color: 0xbb8f85 },
    ventricles: { es: 'Sistema ventricular', color: 0x5ad0de },
    arteries: { es: 'Arterias', color: 0xe86b76 },
    veins_sinuses: { es: 'Venas y senos venosos', color: 0x6589dd },
    cranial_nerves: { es: 'Nervios craneales', color: 0xf0d06a },
    meninges_dura: { es: 'Meninges y duramadre', color: 0xaad0cd },
    other: { es: 'Otros', color: 0xaaaaaa }
  };

  const REGION_ES = {
    'Telencephalon': 'Telencéfalo', 'Temporal lobe': 'Lóbulo temporal', 'Limbic lobe': 'Lóbulo límbico',
    'Diencephalon': 'Diencéfalo', 'Brainstem': 'Tronco encefálico', 'Cerebellum': 'Cerebelo',
    'Occipital lobe': 'Lóbulo occipital', 'Parietal lobe': 'Lóbulo parietal', 'Frontal lobe': 'Lóbulo frontal',
    'Left cerebral hemisphere': 'Hemisferio cerebral izquierdo', 'Right cerebral hemisphere': 'Hemisferio cerebral derecho',
    'Insula': 'Ínsula', 'arteries': 'Arterias', 'veins_sinuses': 'Venas y senos', 'cranial_nerves': 'Nervios craneales',
    'ventricles': 'Sistema ventricular', 'meninges_dura': 'Meninges y duramadre'
  };

  const GROUPS = {
    temporal_mesial: {
      label: 'Complejo temporal mesial',
      description: 'Agrupación didáctica para mostrar en conjunto hipocampo, amígdala y región parahipocampal del lado seleccionado.',
      left: ['Hippocampus.l','Basolateral complex.l','Central nucleus.l','Corticomedial group.l','Lateral nucleus.l','Medial occipitotemporal gyrus (Parahippocampal*).l'],
      right: ['Hippocampus.r','Basolateral complex.r','Central nucleus.r','Corticomedial group.r','Lateral nucleus.r','Medial occipitotemporal gyrus (Parahippocampal*).r']
    },
    hippocampus: {
      label: 'Hipocampo', description: 'Estructura mesial temporal representada como malla independiente bilateral.',
      left: ['Hippocampus.l'], right: ['Hippocampus.r']
    },
    amygdala: {
      label: 'Amígdala', description: 'En este atlas la amígdala no es una sola malla: se reconstruye agrupando complejo basolateral, núcleo central, grupo corticomedial y núcleo lateral.',
      left: ['Basolateral complex.l','Central nucleus.l','Corticomedial group.l','Lateral nucleus.l'],
      right: ['Basolateral complex.r','Central nucleus.r','Corticomedial group.r','Lateral nucleus.r']
    },
    parahippocampal: {
      label: 'Giro parahipocampal', description: 'Representado en el modelo como giro occipitotemporal medial (parahipocampal).',
      left: ['Medial occipitotemporal gyrus (Parahippocampal*).l'], right: ['Medial occipitotemporal gyrus (Parahippocampal*).r']
    },
    temporal_pole: {
      label: 'Polo temporal', description: 'Extremo anterior del lóbulo temporal, disponible bilateralmente como malla independiente.',
      left: ['Temporal pole.l'], right: ['Temporal pole.r']
    },
    fusiform: {
      label: 'Giro fusiforme', description: 'En la nomenclatura del modelo aparece como giro occipitotemporal lateral.',
      left: ['Lateral occipitotemporal gyrus.l'], right: ['Lateral occipitotemporal gyrus.r']
    },
    fornix: {
      label: 'Fórnix', description: 'Tracto de sustancia blanca bilateral incluido como malla separada.',
      left: ['Fornix.l'], right: ['Fornix.r']
    },
    hippocampal_commissure: {
      label: 'Comisura hipocampal', description: 'Estructura comisural medial que conecta formaciones hipocampales.',
      median: ['Hippocampal commissure']
    },
    anterior_commissure: {
      label: 'Comisura anterior', description: 'Comisura telencefálica medial visible en el atlas.',
      median: ['Anterior commissure']
    },
    stria_terminalis: {
      label: 'Estría terminal', description: 'Haz bilateral relacionado anatómicamente con la amígdala.',
      left: ['Stria terminalis.l'], right: ['Stria terminalis.r']
    },
    uncinate: {
      label: 'Fascículo unciforme', description: 'Tracto de asociación frontotemporal disponible bilateralmente.',
      left: ['Uncinate fasciculus.l'], right: ['Uncinate fasciculus.r']
    },
    ilf: {
      label: 'Fascículo longitudinal inferior', description: 'Tracto de asociación occipitotemporal disponible bilateralmente.',
      left: ['Inferior longitudinal fasciculus.l'], right: ['Inferior longitudinal fasciculus.r']
    },
    ifof: {
      label: 'Fascículo fronto-occipital inferior', description: 'Tracto de asociación largo incluido bilateralmente.',
      left: ['Inferior fronto-occipital fasciculus.l'], right: ['Inferior fronto-occipital fasciculus.r']
    },
    corpus_callosum: {
      label: 'Cuerpo calloso', description: 'Principal comisura interhemisférica del telencéfalo.',
      median: ['Corpus callosum']
    },
    insula: {
      label: 'Ínsula · identificación pendiente', description: 'La ínsula verdadera se encuentra profunda a los opérculos frontal, parietal y temporal. Las dos mallas cuyo nombre incluye «Insula (Subcentral gyrus…)» no están identificadas inequívocamente como corteza insular aislada; no se resaltan como una ínsula confirmada. Para verla de forma anatómica hay que separar o atenuar los opérculos. Referencia: Pró, Anatomía clínica, 2.ª ed., fig. 3-81 y pág. 261.',
      left: [], right: []
    },
    orbitofrontal: {
      label: 'Región orbitofrontal', description: 'Agrupación didáctica de giros orbitarios y porción orbitaria del giro frontal inferior.',
      left: ['Orbital gyri.l','Orbital part of  inferior frontal gyrus.l'],
      right: ['Orbital gyri.r','Orbital part of  inferior frontal gyrus.r']
    }
  };

  const DESCRIPTIONS = {
    'Hipocampo': 'Estructura de la formación hipocampal en el lóbulo temporal mesial. El modelo representa cada hipocampo como una malla general, pero NO individualiza CA1, CA2, CA3, CA4, giro dentado ni subículo; la selección no equivale a estos subcampos.',
    'Complejo basolateral': 'Subdivisión amigdalina del atlas CIT168. Forma parte del grupo de mallas que el visor reúne bajo la etiqueta “Amígdala”.',
    'Núcleo central': 'Subdivisión amigdalina del atlas CIT168.',
    'Grupo corticomedial': 'Subdivisión amigdalina del atlas CIT168.',
    'Núcleo lateral': 'Subdivisión amigdalina del atlas CIT168.',
    'Comisura hipocampal': 'Comisura de sustancia blanca modelada en la línea media.',
    'Fórnix': 'Tracto de sustancia blanca asociado anatómicamente a la formación hipocampal.',
    'Polo temporal': 'Porción más anterior del lóbulo temporal.',
    'Giro occipitotemporal lateral (giro fusiforme)': 'Giro de la superficie inferior temporo-occipital, mostrado bilateralmente.',
    'Giro occipitotemporal medial (parahipocampal)': 'Región cortical medial temporal que el modelo etiqueta como parahipocampal.',
    'Área subcentral y surcos asociados (origen rotulado como ínsula; revisar)': 'La fuente nombra conjuntamente la ínsula y el giro subcentral, pero no demuestra que la superficie corresponda exclusivamente a la corteza insular profunda. Esta malla no se utilizará para delimitar la ínsula hasta verificar sus vértices y relación con los opérculos.',
    'Giros orbitarios': 'Giros de la superficie orbitaria del lóbulo frontal.'
  };

  let manifest, translations, nodes = [], nodeById = new Map(), nodeByName = new Map();
  let renderer, scene, camera, controls, brainRoot, gltfScene;
  let meshes = [], meshesById = new Map();
  let selectedIds = new Set(), currentGroup = null, isolateIds = null;
  // V34: la anatomía ajena a la corteza mantiene las mallas y funciones de V32.
  const hiddenLegacyIds=new Set();
  let scientificRoot=null, scientificReady=false, scientificSelected=null, scientificIsolate=false;
  const scientificMeshes=new Map(), scientificRows=new Map(), scientificHidden=new Set();
  let corticalAreas=false, recentPick=null;
  const CORTEX_SRC='./models/mindboggle_oas1_0368_cortex_v44_medial.glb';
  const CORTEX_META='./models/mindboggle_oas1_0368_v33.json';
  const CORTEX_ALIGN='./models/cortex_alignment_v44.json';
  // Funciones educativas, sin equivalencia automática con áreas funcionales de Brodmann.
  const corticalFacts={
    precentral:['Anterior al surco central; forma parte del lóbulo frontal.','Incluye gran parte de la corteza motora primaria, implicada en la ejecución de movimientos voluntarios contralaterales.','Entre el surco precentral (anterior) y el surco central (posterior).'],
    postcentral:['Posterior al surco central, en el lóbulo parietal.','Incluye gran parte de la corteza somatosensorial primaria, que procesa información somática contralateral.','Entre el surco central (anterior) y el surco poscentral (posterior).'],
    superiorfrontal:['En la cara superolateral y medial del lóbulo frontal.','Participa en redes de planificación, control ejecutivo y funciones premotoras; su función depende de la subregión.','Relacionado lateralmente con el surco frontal superior.'],
    superiortemporal:['En la parte superior de la superficie lateral del lóbulo temporal.','Interviene en procesamiento auditivo y, según hemisferio y región, aspectos de la percepción del lenguaje.','Inferior al surco lateral y superior al surco temporal superior.'],
    transversetemporal:['En la cara superior del lóbulo temporal, oculta dentro del surco lateral.','Incluye regiones de corteza auditiva primaria.','Giros de Heschl, sobre el plano temporal.'],
    pericalcarine:['En la cara medial del lóbulo occipital, alrededor del surco calcarino.','Comprende buena parte de la corteza visual primaria.','A ambos lados del surco calcarino.'],
    cuneus:['En la cara medial del lóbulo occipital, sobre el surco calcarino.','Participa en el procesamiento visual.','Limitada inferiormente por el surco calcarino y anteriormente por el surco parietooccipital.'],
    lingual:['En la cara inferior y medial del lóbulo occipital.','Participa en procesamiento visual de orden superior.','Inferior al surco calcarino; próximo al surco colateral.'],
    precuneus:['En la cara medial del lóbulo parietal, posterior al lobulillo paracentral.','Integra redes relacionadas con procesamiento visuoespacial y memoria autobiográfica.','Entre el surco subparietal, el parietooccipital y la región paracentral.'],
    paracentral:['En la cara medial, a ambos lados de la terminación superior del surco central.','Contiene representaciones sensitivas y motoras de miembros inferiores.','Continuación medial de los giros precentral y poscentral.'],
    parsopercularis:['Porción posterior del giro frontal inferior.','En el hemisferio dominante puede formar parte de la red de producción del lenguaje; no equivale por sí sola a toda el área de Broca.','Adyacente a las porciones triangular y precentral del giro frontal inferior.'],
    parstriangularis:['Porción media del giro frontal inferior.','En el hemisferio dominante participa en redes lingüísticas; la parcelación no define por sí sola una función única.','Entre las porciones opercular y orbitaria del giro frontal inferior.'],
    insula:['Corteza profunda del surco lateral, cubierta por los opérculos frontal, parietal y temporal.','Interviene en interocepción, integración sensorial, funciones viscerales y saliencia.','Rodeada por el surco circular insular.'],
    entorhinal:['Corteza del lóbulo temporal medial, anterior y adyacente a la formación hipocampal.','Interfaz importante de información entre neocorteza y formación hipocampal, relacionada con memoria.','En la porción anterior de la región parahipocampal.'],
    parahippocampal:['En la superficie medial e inferior del lóbulo temporal.','Interviene en memoria contextual y representación de escenas, según subregión.','Relacionado lateralmente con el surco colateral.'],
    fusiform:['En la superficie inferior de los lóbulos temporal y occipital.','Participa en reconocimiento visual de objetos, caras y formas; especialización variable.','Entre los surcos colateral y occipitotemporal.'],
    superiorparietal:['En la superficie superior del lóbulo parietal.','Contribuye a integración visuoespacial, atención y orientación sensoriomotora.','Superior al surco intraparietal.'],
    supramarginal:['Parte del lobulillo parietal inferior, rodeando el extremo del surco lateral.','Se asocia a integración multisensorial, fonológica y atención, según hemisferio.','Alrededor de la terminación posterior del surco lateral.'],
    inferiorparietal:['En el lobulillo parietal inferior, lateral al surco intraparietal.','Relacionada con integración multisensorial y redes de atención y lenguaje.','Bajo el surco intraparietal; incluye regiones supramarginal y angular.'],
    temporalpole:['Extremo anterior del lóbulo temporal.','Integra información semántica y socioemocional, con funciones distribuidas.','Continuación anterior de los giros temporales.'],
    posteriorcingulate:['En la cara medial, por detrás de la región media del giro cingulado.','Forma parte de redes implicadas en procesamiento autorreferencial y memoria.','Superior y posterior al cuerpo calloso.'],
    caudalanteriorcingulate:['En la cara medial del lóbulo frontal, por delante de la región cingulada media.','Interviene en control cognitivo y evaluación de acciones.','En el giro cingulado, superior al cuerpo calloso.']
  };
  let hemisphere = 'both', cortexOpacity = 1, autoRotate = false;
  let raycaster, pointer, hoveredMesh = null;
  let routeGroup = null, routePulse = null, routeCurve = null, routeClock = new THREE.Clock();
  let initialCamera = {pos:new THREE.Vector3(0,0,7.2), target:new THREE.Vector3(0,0,0)};
  let activeTab = 'atlas';
  let crisisAnimation=null;
  let potentialLab=null;
  let tractView = false, contextOpacity = .08, tractSolo = false;
  let connectomeMode=false,connectomeRunning=false,connectomeStarted=false,connectomeSpeed=1,connectomePattern='crisis';
  let connectomeElapsed=0,connectomeDuration=0,connectomeReadoutStage=-1;
  const mainClock=new THREE.Clock();
  const tractColors = new Map();
  const isFiberCategory = cat => cat === 'tracts' || cat === 'white_matter';
  const isTract = a => isFiberCategory(a.cat);

  const $ = id => document.getElementById(id);
  const loading = $('loading'), progressBar = $('progressBar'), loadingText = $('loadingText');

  function stripAccent(s){ return (s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(); }
  function sideLabel(side){ return side==='left'?'Izquierdo':side==='right'?'Derecho':'Medial'; }
  function esRegion(region){ return REGION_ES[region] || region || '—'; }
  function esLabel(node){ return translations[node.label] || node.label; }
  function categoryLabel(cat){ return (CATEGORY_META[cat]||CATEGORY_META.other).es; }


  function pseudoRand(seed){ const x=Math.sin(seed*127.1+311.7)*43758.5453123; return x-Math.floor(x); }
  function connectomeStageAt(time){
    let stage=connectomeStageStarts.length-1;
    while(stage>0&&time<connectomeStageStarts[stage])stage--;
    return Math.max(0,stage);
  }
  function updateConnectomeReadout(){
    const stage=connectomeStageAt(connectomeElapsed);
    const selected=connectomeInspection??stage;
    const extending=connectomePattern==='crisis'&&stage>=window.CrisisRouteData.BRANCH_STAGE;
    connectomeReadoutStage=stage;
    updateConnectomeRegionPicker();
    const status=!connectomePoints?(connectomeLoadError?'Error al cargar la corteza':'Cargando geometría'):!connectomeStarted?'Listo':connectomeRunning?'Propagación activa':connectomeElapsed>=connectomeDuration?'Finalizada':'En pausa';
    $('btnConnectomeStart').disabled=!connectomePoints;
    $('btnConnectomePause').disabled=!connectomeStarted;
    $('connectomeState').textContent=status;
    $('connectomePattern').textContent=CONNECTOME_PATTERN_NAMES[connectomePattern];
    $('connectomeHemisphere').textContent=connectomeSide<0?'Ambos':sideLabel(CONNECTOME_SIDES[connectomeSide]);
    $('btnConnectomePause').textContent=connectomeStarted&&!connectomeRunning?(connectomeElapsed>=connectomeDuration?'Repetir':'Reanudar'):'Pausar';
    const overlay=$('connectomeOverlayText');
    overlay.textContent=!connectomePoints?(connectomeLoadError||'Cargando geometría…'):connectomeStarted?(connectomeElapsed>=connectomeDuration?(connectomePattern==='crisis'?'Cierre · uncinado y fórnix':'Ruta completa · etapas iluminadas'):
      extending&&connectomeInspection===null?'Extensión de red · ramas superpuestas':
      `Etapa ${selected+1} · ${CONNECTOME_PATTERNS[connectomePattern][selected][0]}`):'Nodos ilustrativos sobre las superficies del atlas';
    overlay.style.color=connectomeStarted?`#${connectomeStageColors()[selected].toString(16)}`:'';
    const detail=$('connectomeRouteDetail');
    const detailText=connectomePattern==='crisis'&&connectomeStarted&&connectomeElapsed<connectomeDuration?
      extending&&connectomeInspection===null?'Circuito talámico, ínsula, cíngulo medio y precúneo.':
      describeConnectomeCrisisStage(selected):'';
    detail.hidden=!detailText;
    if(detail.textContent!==detailText)detail.textContent=detailText;
    for(const [i,button] of [...$('connectomeTimeline').children].entries()){
      button.disabled=!connectomePoints;
      button.classList.toggle('visited',connectomeStarted&&(i<stage||connectomeElapsed>=connectomeDuration));
      if(connectomeStarted&&i===selected&&connectomeElapsed<connectomeDuration&&(!extending||connectomeInspection!==null))button.setAttribute('aria-current','step');
      else button.removeAttribute('aria-current');
    }
  }

  function inheritedMeta(obj){
    let p=obj;
    while(p){
      if(p.userData && (p.userData.bx_id != null || p.userData.bx_cat != null)) return p.userData;
      p=p.parent;
    }
    return {};
  }

  function namesToIds(names){
    const out=[];
    (names||[]).forEach(name=>{ const n=nodeByName.get(name); if(n) out.push(n.id); });
    return out;
  }

  function idsForGroup(key, forcedSide=null){
    const g=GROUPS[key]; if(!g) return [];
    const side=forcedSide || hemisphere;
    let names=[];
    if(g.median) names.push(...g.median);
    if(side==='left') names.push(...(g.left||[]));
    else if(side==='right') names.push(...(g.right||[]));
    else { names.push(...(g.left||[]),...(g.right||[])); }
    return namesToIds(names);
  }

  function setupData(){
    nodes=manifest.nodes;
    nodes.forEach(n=>{ nodeById.set(n.id,n); nodeByName.set(n.name,n); });
    const labels=[...new Set(nodes.filter(n=>isTract({cat:n.category})).map(n=>n.label))].sort();
    labels.forEach((label,i)=>tractColors.set(label,new THREE.Color().setHSL((i*.61803398875)%1,.7,.62)));

  }

  function initThree(){
    const canvas=$('brainCanvas');
    renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.25));
    renderer.outputEncoding=THREE.sRGBEncoding;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.0;
    scene=new THREE.Scene();
    camera=new THREE.PerspectiveCamera(40,1,.01,200);
    camera.position.copy(initialCamera.pos);
    controls=new THREE.OrbitControls(camera,canvas);
    controls.enableDamping=true; controls.dampingFactor=.075; controls.minDistance=2.2; controls.maxDistance=15;
    controls.target.copy(initialCamera.target);
    controls.autoRotate=false; controls.autoRotateSpeed=.6;

    scene.add(new THREE.HemisphereLight(0xc9d9ff,0x14171c,.7));
    const key=new THREE.DirectionalLight(0xffffff,1.15); key.position.set(4,6,7); scene.add(key);
    const fill=new THREE.DirectionalLight(0x89bfff,.45); fill.position.set(-6,2,4); scene.add(fill);
    const rim=new THREE.DirectionalLight(0x6bdfff,.7); rim.position.set(-4,4,-7); scene.add(rim);
    const warm=new THREE.DirectionalLight(0xff9eb5,.28); warm.position.set(4,-2,-5); scene.add(warm);

    brainRoot=new THREE.Group(); brainRoot.rotation.y=-.18; scene.add(brainRoot);
    raycaster=new THREE.Raycaster(); pointer=new THREE.Vector2();

    canvas.addEventListener('pointermove',onPointerMove);
    canvas.addEventListener('pointerdown',e=>canvas.dataset.down=`${e.clientX},${e.clientY}`);
    canvas.addEventListener('pointerup',onPointerUp);
    window.addEventListener('resize',resize);
    resize();
  }

  function resize(){
    const vp=$('viewport'); if(!renderer||!vp) return;
    const w=vp.clientWidth,h=vp.clientHeight;
    renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix();
    if(activeTab==='crisis')crisisAnimation?.updateCameraTarget();
  }

  function loadModel(){
    const draco=new THREE.DRACOLoader(); draco.setDecoderPath(DRACO_PATH);
    const loader=new THREE.GLTFLoader(); loader.setDRACOLoader(draco);
    loader.load(MODEL_URL, gltf=>{
      gltfScene=gltf.scene; brainRoot.add(gltfScene);
      const coreBox=new THREE.Box3(); let hasCore=false;
      gltfScene.traverse(obj=>{
        if(!obj.isMesh) return;
        const m=inheritedMeta(obj); const id=Number(m.bx_id); const checked=nodeById.get(id); const cat=checked?.category||m.bx_cat||'other'; const side=checked?.side||m.bx_side||'median';
        const meta=CATEGORY_META[cat]||CATEGORY_META.other;
        const base=new THREE.Color(meta.color);
        const emissive=base.clone().multiplyScalar(cat==='deep_grey'?0.34:cat==='tracts'?0.26:0.07);
        obj.material=new THREE.MeshStandardMaterial({color:base,roughness:cat==='arteries'||cat==='veins_sinuses'||cat==='tracts'?.48:.8,metalness:0,transparent:true,opacity:1,emissive,emissiveIntensity:1,side:cat==='meninges_dura'?THREE.DoubleSide:THREE.FrontSide,depthWrite:true});
        obj.userData.__atlas={id,cat,side,base:base.clone(),emissive:emissive.clone()};
        meshes.push(obj); if(!meshesById.has(id)) meshesById.set(id,[]); meshesById.get(id).push(obj);
        if(m.bx_core===1 || m.bx_core===true){ coreBox.expandByObject(obj); hasCore=true; }
      });
      if(!hasCore) coreBox.setFromObject(gltfScene);
      // Center AFTER accounting for the scale and 180-degree rotation.
      // Previously the raw unscaled center was subtracted, sending the model
      // outside the camera frustum when 'Vista inicial' reset to world origin.
      const c=coreBox.getCenter(new THREE.Vector3());
      const radius=coreBox.getBoundingSphere(new THREE.Sphere()).radius||1;
      const scale=1.75/radius;
      gltfScene.scale.setScalar(scale);
      gltfScene.rotation.y=Math.PI;
      gltfScene.position.copy(c).multiplyScalar(-scale).applyAxisAngle(new THREE.Vector3(0,1,0),Math.PI);
      gltfScene.updateMatrixWorld(true);
      if(window.CrisisAnimation && !crisisAnimation){
        crisisAnimation=new window.CrisisAnimation({THREE,scene,camera,controls,renderer,meshesById,nodeByName,
          isModelReady:()=>scientificReady,refresh:()=>{updateVisibility();updateMaterials();}});
      }
      if(activeTab==='crisis')crisisAnimation?.enter();
      updateVisibility(); updateMaterials();
      loadScientificCortexV34();
      loadingText.textContent=`${nodes.length} estructuras cargadas`;
      progressBar.style.width='100%';
      setTimeout(()=>loading.classList.add('hidden'),350);
    },xhr=>{
      if(xhr.total){ const p=Math.max(8,Math.min(95,(xhr.loaded/xhr.total)*100)); progressBar.style.width=`${p}%`; loadingText.textContent=`Cargando modelo 3D… ${Math.round(p)}%`; }
    },err=>{ console.error(err); loadingText.textContent='No se pudo cargar el modelo 3D. Revisa que models/brain.glb esté junto al proyecto.'; });
  }

  // ----- V34: corteza científica integrada al visor de V32 -----
  function legacyCortexIsInternal(a){
    const n=nodeById.get(a.id);
    // La malla original del hipocampo fue catalogada como «cortex»,
    // pero NO está representada por el modelo pial y se conserva.
    return n&&/^Hippocampus\./i.test(n.name);
  }
  function sciActive(){return scientificReady&&activeTab==='atlas';}
  function sciSideMatch(row){return hemisphere==='both'||!['lh','rh'].includes(row.side)||(row.side==='lh'?'left':'right')===hemisphere;}
  function corticalColor(row){
    if(!corticalAreas)return new THREE.Color(row.side==='lh'?0xc5aba4:0xbca39d);
    return new THREE.Color(row.color||'#a9b7cb').lerp(new THREE.Color(0xffffff),.11);
  }
  function updateScientificCortex(){
    const active=sciActive();
    const cortexCheck=document.querySelector('.category-item input[data-cat="cortex"]');
    scientificMeshes.forEach((m,id)=>{
      const row=scientificRows.get(id),selected=scientificSelected===id;
      const categoryAllowed=!cortexCheck||cortexCheck.checked;
      const canShow=active&&categoryAllowed&&sciSideMatch(row)
        &&!scientificHidden.has(id)&&(!scientificIsolate||selected)&&!isolateIds;
      m.visible=canShow;
      const alpha=Math.max(.04,cortexOpacity);
      m.material.opacity=selected?Math.max(.98,alpha):alpha;
      m.material.transparent=m.material.opacity<.999;
      m.material.depthWrite=m.material.opacity>.93;
      m.material.depthTest=true;
      m.material.color.copy(selected?new THREE.Color(0xffc066):corticalColor(row));
      m.material.emissive.set(selected?0x6b3412:0x000000);
      m.material.emissiveIntensity=selected?.22:0;
      m.renderOrder=selected?3:0;
      m.material.needsUpdate=true;
    });
    const label=$('v34FloatingLabel');
    if(label && (!active||!scientificSelected))label.classList.add('hidden');
  }
  function sciFocus(id){
    const m=scientificMeshes.get(id);if(!m)return;
    m.updateMatrixWorld(true);
    const box=new THREE.Box3().setFromObject(m),center=box.getCenter(new THREE.Vector3());
    const radius=box.getBoundingSphere(new THREE.Sphere()).radius;
    const dir=camera.position.clone().sub(controls.target).normalize();
    controls.target.copy(center);camera.position.copy(center).addScaledVector(dir,Math.max(1.25,Math.min(6.8,radius*4.5)));controls.update();
  }
  function sciSelect(id,{focus=false}={}){
    if(!scientificRows.has(id))return;
    scientificSelected=id;scientificHidden.delete(id);scientificIsolate=false;
    isolateIds=null;selectedIds.clear();currentGroup=null;
    // Asegura que la estructura sea visible pero no cambia la cámara al alternar modos.
    if(!sciSideMatch(scientificRows.get(id)))setHemisphere('both');
    updateVisibility();updateMaterials();updateInfo();
    if(focus)sciFocus(id);
  }
  function loadScientificCortexV34(){
    const reportError=message=>{
      const status=$('v34RegistrationStatus');
      status.textContent=message;
      status.hidden=false;
      connectomeLoadError='Revisa que la carpeta models esté junto a index.html y vuelve a cargar la página.';
      if(connectomeMode)updateConnectomeReadout();
      if(crisisAnimation){
        crisisAnimation.modelFailed=true;
        crisisAnimation.updateUI();
      }
    };
    Promise.all([
      fetch(CORTEX_META).then(r=>{if(!r.ok)throw Error('Catálogo cortical inaccesible');return r.json();}),
      fetch(CORTEX_ALIGN).then(r=>{if(!r.ok)throw Error('Matriz de alineación inaccesible');return r.json();})
    ]).then(([meta,reg])=>{
      meta.structures.filter(r=>r.category==='cortex').forEach(row=>scientificRows.set(row.id,row));
      const a=reg.matrix_mm_to_old;
      const align=new THREE.Matrix4().set(a[0][0],a[1][0],a[2][0],a[3][0], a[0][1],a[1][1],a[2][1],a[3][1], a[0][2],a[1][2],a[2][2],a[3][2], 0,0,0,1);
      const loader=new THREE.GLTFLoader();
      loader.load(CORTEX_SRC,gltf=>{
        scientificRoot=new THREE.Group();scientificRoot.name='V44_Corteza_MRI_Ajustada_Surco_Medio';
        scientificRoot.matrixAutoUpdate=false;scientificRoot.matrix.copy(align);
        gltfScene.add(scientificRoot);
        const selected=[];gltf.scene.traverse(m=>{if(m.isMesh&&scientificRows.has(m.name))selected.push(m);});
        // V39 deliberately discards the previous atlas's duplicate MRI internal display meshes.
        // The internal meshes are loaded from newly reconstructed aseg.mgz (same MRI subject).
        selected.forEach(m=>{
          m.parent.remove(m);scientificRoot.add(m);
          if(!m.geometry.attributes.normal)m.geometry.computeVertexNormals();
          m.userData.v34CortexId=m.name;
          m.userData.v41AdaptedGeometry=m.geometry;
          m.material=new THREE.MeshStandardMaterial({color:0xc0a8a3,roughness:.96,metalness:0,side:THREE.DoubleSide,transparent:false,depthWrite:true});
          scientificMeshes.set(m.name,m);
        });
        scientificReady=scientificMeshes.size===70;
        if(scientificReady)crisisAnimation?.useCortex(scientificRoot,scientificMeshes);
        updateVisibility();updateMaterials();updateInfo();
        if(!scientificReady){
          reportError('Faltan parcelas corticales de la MRI; comprueba el paquete.');
        }else if(connectomeMode){
          buildConnectome();focusConnectome();
        }
      },undefined,err=>reportError('No se pudo cargar la nueva corteza: '+(err.message||err)));
    }).catch(err=>reportError('No se pudo preparar la corteza MRI: '+err.message));
  }
  function corticalDetails(id){
    const row=scientificRows.get(id);if(!row)return;
    const key=id.replace(/^C_(lh|rh)_/,'');
    const facts=corticalFacts[key]||[
      'Región cortical de la parcelación Desikan-Killiany. Los límites detallados deben contrastarse con el atlas de origen.',
      'Esta parcela anatómica no corresponde por sí sola a una función exclusiva o a un área de Brodmann; función específica pendiente de verificación.',
      'El dataset identifica una región de superficie cortical; los surcos limítrofes específicos no están anotados individualmente.'
    ];
    return {row,relations:facts[0],function:facts[1],sulci:facts[2]};
  }
  function fillV34RightPanel(rel,fn,sulci){
    $('v34InfoRelations').textContent=rel;
    $('v34InfoFunction').textContent=fn;
    $('v34InfoSulci').textContent=sulci;
  }
  function updateCortexFloatLabel(){
    const label=$('v34FloatingLabel'),mesh=scientificMeshes.get(scientificSelected);
    if(!label||!mesh||!mesh.visible){label?.classList.add('hidden');return;}
    const box=new THREE.Box3().setFromObject(mesh),pos=box.getCenter(new THREE.Vector3());
    pos.project(camera);
    if(pos.z>1||pos.z< -1){label.classList.add('hidden');return;}
    const rect=$('brainCanvas').getBoundingClientRect();
    label.style.left=((pos.x+1)*.5*rect.width)+'px';label.style.top=((-pos.y+1)*.5*rect.height)+'px';
    label.textContent=scientificRows.get(scientificSelected)?.name||'';label.classList.remove('hidden');
  }
  function hideSelectedV34(){
    if(sciActive()&&scientificSelected){scientificHidden.add(scientificSelected);scientificSelected=null;scientificIsolate=false;}
    else if(selectedIds.size){selectedIds.forEach(id=>hiddenLegacyIds.add(id));selectedIds.clear();currentGroup=null;isolateIds=null;}
    updateVisibility();updateMaterials();updateInfo();
  }
  function setupCortex(){
    $('v34AreasToggle').onchange=e=>{
      corticalAreas=e.target.checked;
      updateScientificCortex();
      updateInfo();
    };
    $('btnHideSelected').onclick=hideSelectedV34;
  }

  function updateVisibility(){
    if(activeTab==='crisis' && crisisAnimation){
      meshes.forEach(mesh=>{if(mesh.userData.__atlas)mesh.visible=crisisAnimation.visible(mesh);});
      scientificMeshes.forEach(mesh=>{mesh.visible=false;});
      for(const [mesh] of crisisAnimation.cortexMeshes.values())mesh.visible=crisisAnimation.visible(mesh);
      return;
    }
    const categoryChecks=[...document.querySelectorAll('.category-item input')];
    const catVisible={}; categoryChecks.forEach(i=>catVisible[i.dataset.cat]=i.checked);
    meshes.forEach(mesh=>{
      const a=mesh.userData.__atlas; if(!a) return;
      const hemOk=hemisphere==='both'||a.side==='median'||a.side===hemisphere;
      const catOk=catVisible[a.cat]!==false;
      const isoOk=!isolateIds || isolateIds.has(a.id);
      const viewOk=!connectomeMode&&(!tractView||isTract(a)||(contextOpacity>0&&['cortex','deep_grey','diencephalon','brainstem','cerebellum'].includes(a.cat)));
      const replacedCortex=sciActive()&&a.cat==='cortex'&&!legacyCortexIsInternal(a);
      mesh.visible=hemOk&&(tractView||catOk)&&isoOk&&viewOk&&!hiddenLegacyIds.has(a.id)&&!replacedCortex&&!scientificIsolate;
    });
    updateScientificCortex();
  }

  function updateMaterials(){
    if(connectomeMode)return;
    if(activeTab==='crisis' && crisisAnimation){
      meshes.forEach(mesh=>{if(mesh.visible&&mesh.userData.__atlas)crisisAnimation.style(mesh);});
      for(const [mesh] of crisisAnimation.cortexMeshes.values()){
        if(mesh.visible)crisisAnimation.style(mesh);
      }
      return;
    }
    meshes.forEach(mesh=>{
      const a=mesh.userData.__atlas; if(!a) return;
      const selected=selectedIds.has(a.id);
      if(!tractView) mesh.renderOrder=0;
      const routeSelected=routeGroup && routeGroup.userData.routeIds && routeGroup.userData.routeIds.has(a.id);
      let opacity=a.cat==='cortex'?cortexOpacity:1;
      if(tractView) opacity=isTract(a)?(tractSolo && selectedIds.size && !selected ? .045 : 1):contextOpacity;
      if(!tractView && a.cat==='meninges_dura') opacity=Math.min(opacity,.28);
      if(routeGroup && !routeSelected && a.cat==='cortex') opacity=Math.min(opacity,.16);
      mesh.material.opacity=opacity;
      mesh.material.transparent=opacity<.999;
      mesh.material.depthWrite=opacity>.45;
      if(tractView){
        const color=isTract(a)?tractColors.get(nodeById.get(a.id)?.label):a.base;
        mesh.material.color.copy(color||a.base);
        mesh.material.emissive.copy(isTract(a)?(color||a.base):a.emissive);
        mesh.material.emissiveIntensity=selected?.7:isTract(a)?.24:.04;
        mesh.renderOrder=isTract(a)?1:2;
        mesh.material.depthWrite=isTract(a)&&opacity>.45;
        if(selected) mesh.material.color.lerp(new THREE.Color(0xffffff),.28);
      } else if(selected){
        mesh.renderOrder=0;
        mesh.material.color.set(0xffc857); mesh.material.emissive.set(0xff9e2f); mesh.material.emissiveIntensity=1.05;
      } else if(routeSelected){
        mesh.material.color.set(0x70e7ff); mesh.material.emissive.set(0x1ba5d6); mesh.material.emissiveIntensity=.8;
      } else {
        mesh.material.color.copy(a.base); mesh.material.emissive.copy(a.emissive); mesh.material.emissiveIntensity=1;
      }
      // V35: guía visual explícita de la corteza original; no se selecciona ni exporta.
      if(false && sciActive()&&compareCortexV35&&a.cat==='cortex'&&!legacyCortexIsInternal(a)){
        mesh.material.color.set(0x43cde5);
        mesh.material.emissive.set(0x0a3947);
        mesh.material.emissiveIntensity=.13;
        mesh.material.opacity=.22;
        mesh.material.transparent=true;
        mesh.material.depthWrite=false;
        mesh.renderOrder=2;
      }
    });
    updateScientificCortex();
  }

  function selectIds(ids,{groupKey=null,focus=true}={}){
    scientificSelected=null;scientificIsolate=false;
    selectedIds=new Set(ids); currentGroup=groupKey; isolateIds=null;
    ids.forEach(id=>hiddenLegacyIds.delete(id));
    const tractSelect=$('tractSelect');
    if(tractSelect)tractSelect.value=ids.length===1?String(ids[0]):'';
    updateVisibility(); updateMaterials(); updateInfo();
    if(focus && ids.length) focusIds(ids);
  }

  function focusIds(ids){
    const box=new THREE.Box3(); let ok=false;
    ids.forEach(id=>(meshesById.get(id)||[]).forEach(m=>{ if(m.visible){ box.expandByObject(m); ok=true; } }));
    if(!ok) return;
    const center=box.getCenter(new THREE.Vector3()); const sphere=box.getBoundingSphere(new THREE.Sphere());
    const dir=camera.position.clone().sub(controls.target).normalize();
    const distance=Math.max(1.8,Math.min(7.5,sphere.radius*4.1));
    controls.target.copy(center); camera.position.copy(center.clone().add(dir.multiplyScalar(distance))); controls.update();
  }

  function isolateSelection(){
    if(sciActive()&&scientificSelected){scientificIsolate=!scientificIsolate;isolateIds=null;updateVisibility();updateMaterials();updateInfo();return;}
    if(!selectedIds.size)return; isolateIds=new Set(selectedIds); scientificIsolate=false;updateVisibility();updateMaterials();focusIds([...selectedIds]);
  }
  function showAll(){
    isolateIds=null;selectedIds.clear();currentGroup=null;scientificSelected=null;scientificIsolate=false;
    scientificHidden.clear();hiddenLegacyIds.clear();
    for(const input of $('categoryList').querySelectorAll('input'))input.checked=true;
    setHemisphere('both');
    clearRoute();
    updateVisibility();updateMaterials();updateInfo();
  }
  function resetView(){
    if(activeTab==='crisis'&&crisisAnimation){$('crisisRecenter').click();return;}
    if(connectomeMode){clearConnectomeRegion();focusConnectome();return;}
    controls.target.set(0,-.05,0); camera.position.set(0.25,.25,7.2); controls.update();
  }

  function updateInfo(){
    const empty=$('infoEmpty'), content=$('infoContent');
    $('crisisInfo')?.classList.toggle('hidden',activeTab!=='crisis');
    if(sciActive()&&scientificSelected){
      const row=scientificRows.get(scientificSelected);
      const {relations, function:purpose, sulci}=corticalDetails(scientificSelected);
      empty.classList.add('hidden');content.classList.remove('hidden');
      $('infoCategory').textContent=corticalAreas?'Parcela cortical · Desikan-Killiany':'Corteza cerebral';
      $('infoTitle').textContent=row.name;
      $('infoDescription').textContent='Superficie cortical reconstruida a partir de resonancia magnética.';
      $('infoRegion').textContent=row.side==='lh'?'Hemisferio izquierdo':'Hemisferio derecho';
      $('infoSource').textContent='Mindboggle-101 · Klein y Tourville (2012).';
      $('infoChips').textContent='';
      $('groupMembers').classList.add('hidden');
      $('anatomyAuditNote').classList.add('hidden');
      fillV34RightPanel(relations,purpose,sulci);
      return;
    }
    if(activeTab==='crisis'){empty.classList.add('hidden');content.classList.add('hidden');crisisAnimation?.updateUI();return;}
    const promptTitle=empty.querySelector('h2');
    const promptText=empty.querySelector('p');
    if(promptTitle)promptTitle.textContent='Selecciona una estructura';
    if(promptText)promptText.textContent='Haz clic sobre el cerebro o usa el buscador.';
    const qcNotice=$('anatomyAuditNote');
    if(qcNotice)qcNotice.classList.add('hidden');
    if(!selectedIds.size && currentGroup==='insula'){
      empty.classList.add('hidden');content.classList.remove('hidden');
      $('infoCategory').textContent='Estructura profunda · verificación pendiente';
      $('infoTitle').textContent='Ínsula';$('infoDescription').textContent=GROUPS.insula.description;
      $('infoRegion').textContent='Profundidad del surco lateral (cisura de Silvio)';
      $('infoSource').textContent='Pró 2.ª ed., figura 3-81; referencia del modelo de origen sin delimitación validada';
      $('infoChips').textContent='Sin segmentación validada';$('groupMembers').classList.add('hidden');
      if(qcNotice){qcNotice.textContent='Se desactivó la falsa identificación visual. La malla llamada «Insula (Subcentral gyrus...)» requiere revisar su relación espacial con el surco circular y los opérculos antes de usarla como ínsula.';qcNotice.classList.remove('hidden');}
      return;
    }
    if(!selectedIds.size){ empty.classList.remove('hidden'); content.classList.add('hidden'); return; }
    empty.classList.add('hidden'); content.classList.remove('hidden');
    const ids=[...selectedIds];
    if(currentGroup && GROUPS[currentGroup]){
      const g=GROUPS[currentGroup]; $('infoCategory').textContent='Agrupación anatómica'; $('infoTitle').textContent=g.label;
      $('infoDescription').textContent=g.description; $('infoRegion').textContent='Varias estructuras'; $('infoSource').textContent='Combinación de mallas existentes del atlas';
      $('infoChips').innerHTML=`<span class="chip">${hemisphere==='both'?'Bilateral':sideLabel(hemisphere)}</span><span class="chip">${ids.length} mallas</span>`;
      const names=ids.map(id=>esLabel(nodeById.get(id))).filter(Boolean);
      $('groupMembers').classList.remove('hidden'); $('groupMembers').innerHTML=`<b>Componentes visibles</b><ul>${names.map(n=>`<li>${n}</li>`).join('')}</ul>`;
    } else {
      const n=nodeById.get(ids[0]); if(!n) return;
      const label=esLabel(n); $('infoCategory').textContent=categoryLabel(n.category); $('infoTitle').textContent=label;
      $('infoDescription').textContent=DESCRIPTIONS[label] || `Estructura anatómica del atlas. Categoría: ${categoryLabel(n.category).toLowerCase()}.`;
      $('infoRegion').textContent=esRegion(n.region); $('infoSource').textContent=n.source||'—';
      $('infoChips').innerHTML=`<span class="chip">${sideLabel(n.side)}</span>${n.parent?`<span class="chip">${n.parent==='Amygdaloid body'?'Cuerpo amigdalino':n.parent}</span>`:''}`;
      $('groupMembers').classList.add('hidden');
    }
    // Panel de todas las estructuras V32: datos originales + límites verificables.
    const n=selectedIds.size===1?nodeById.get([...selectedIds][0]):null;
    const label=n?esLabel(n):'';
    const category=n?.category||'';
    const facts=(/hipocampo/i.test(label)&&category==='cortex')?
      ['Localizado en la región temporal medial, junto al asta temporal del ventrículo lateral.', 'Participa en consolidación de memoria episódica y navegación espacial.', 'Formación hipocampal; subcampos CA y giro dentado no individualizados en la malla V32.']:
      (/tálamo/i.test(label))?['Estructura diencefálica que limita lateralmente el tercer ventrículo.','Relevo e integración de múltiples vías sensoriales, motoras y asociativas.','El catálogo V32 no verifica todos los subnúcleos por separado.']:
      (/arter|carót|cerebral media|basilar/i.test(label)||category==='arteries')?['Vaso de la circulación encefálica; revisar el punto de origen y trayecto propios de la rama.','Irrigación vascular; territorio específico según la arteria.','La exactitud del trayecto de esta malla no ha sido verificada individualmente.']:
      (category==='cranial_nerves')?['Nervio craneal de trayecto intracraneal o extracraneal según la malla.','Inervación específica de acuerdo con el par y su componente funcional.','Comprobar origen aparente, salida craneal y relaciones con vasos y meninges.']:
      (category==='meninges_dura')?['Cubierta y repliegues meníngeos del sistema nervioso central.','Protección mecánica, compartimentación o drenaje venoso según el componente.','Solo se muestran los componentes del archivo V32, no las tres capas meníngeas completas.']:
      ['Relaciones anatómicas particulares pendientes de revisión en la malla V32.','Función específica pendiente de comprobar para esta estructura.','Los límites geométricos del modelo histórico no están validados individualmente.'];
    fillV34RightPanel(...facts);
  }

  function onPointerMove(e){
    if(activeTab==='crisis')return; // la animación tiene controles independientes de selección
    if(activeTab==='neural'||activeTab==='potential')return; // La vista de nodos se explora con los filtros.
    const canvas=$('brainCanvas'); const r=canvas.getBoundingClientRect();
    pointer.x=((e.clientX-r.left)/r.width)*2-1; pointer.y=-((e.clientY-r.top)/r.height)*2+1;
    raycaster.setFromCamera(pointer,camera);
    const targetMeshes=meshes.filter(m=>m.visible&&(!tractView||isTract(m.userData.__atlas)));
    if(sciActive())scientificMeshes.forEach(m=>{if(m.visible)targetMeshes.push(m);});
    const hits=raycaster.intersectObjects(targetMeshes,false);
    const m=hits[0]?.object||null; canvas.style.cursor=m?'pointer':'grab'; hoveredMesh=m;
    const tip=$('tractTooltip'); tip.classList.toggle('hidden',!tractView||!m);
    if(tractView&&m){ const n=nodeById.get(m.userData.__atlas.id); tip.textContent=n?`${esLabel(n)} · ${sideLabel(n.side)}`:''; }
  }
  function onPointerUp(e){
    if(activeTab==='neural'||activeTab==='potential'||activeTab==='crisis')return;
    const down=($('brainCanvas').dataset.down||'').split(',').map(Number); if(down.length!==2) return;
    if(Math.abs(e.clientX-down[0])+Math.abs(e.clientY-down[1])>7) return;
    if(sciActive()){
      const rect=$('brainCanvas').getBoundingClientRect();
      pointer.set(((e.clientX-rect.left)/rect.width)*2-1,-((e.clientY-rect.top)/rect.height)*2+1);
      raycaster.setFromCamera(pointer,camera);
      const hitTargets=meshes.filter(m=>m.visible);scientificMeshes.forEach(m=>{if(m.visible)hitTargets.push(m);});
      const hits=raycaster.intersectObjects(hitTargets,false);
      const unique=[],seen=new Set();
      for(const h of hits){const id=h.object.userData.v34CortexId, legacyId=h.object.userData.__atlas?.id;
        const key=id?'s:'+id:(legacyId==null?null:'l:'+legacyId);
        if(key&&!seen.has(key)){unique.push({key,id,legacyId,isCortex:!!id&&scientificRows.get(id)?.category==='cortex'});seen.add(key);}}
      // Con corteza semitransparente, la selección favorece lo profundo bajo el mismo rayo.
      if(cortexOpacity<.8){unique.sort((a,b)=>Number(a.isCortex)-Number(b.isCortex));}
      if(!unique.length){scientificSelected=null;scientificIsolate=false;selectedIds.clear();currentGroup=null;updateMaterials();updateInfo();return;}
      const previous=recentPick;
      const same=previous&&Math.hypot(previous.x-e.clientX,previous.y-e.clientY)<15
        &&Date.now()-previous.t<3500&&previous.keys===unique.map(x=>x.key).join('|');
      const index=same?(previous.index+1)%unique.length:0,chosen=unique[index];
      recentPick={x:e.clientX,y:e.clientY,t:Date.now(),index,keys:unique.map(x=>x.key).join('|')};
      if(chosen.id)sciSelect(chosen.id);else selectIds([chosen.legacyId],{focus:false});
      return;
    }
    onPointerMove(e);
    if(!hoveredMesh){ selectedIds.clear(); currentGroup=null; updateMaterials(); updateInfo(); return; }
    onPointerMove(e);
    if(!hoveredMesh) return;
    const id=hoveredMesh.userData.__atlas?.id; if(id==null) return;
    selectIds([id],{focus:false});
  }

  function buildCategories(){
    const list=$('categoryList'); list.innerHTML='';
    manifest.categories && Object.entries(manifest.categories).forEach(([cat,info])=>{
      const meta=CATEGORY_META[cat]||CATEGORY_META.other;
      const row=document.createElement('label'); row.className='category-item';
      const count=cat==='cortex'?70:info.count;
      row.innerHTML=`<span class="left"><input type="checkbox" checked data-cat="${cat}"><span>${meta.es}</span></span><small>${count}</small>`;
      row.querySelector('input').addEventListener('change',()=>updateVisibility()); list.appendChild(row);
    });
  }

  function setupSearch(){
    const input=$('searchInput'), box=$('searchResults');
    input.addEventListener('input',()=>{
      const q=stripAccent(input.value.trim()); if(!q){ box.classList.add('hidden'); box.innerHTML=''; return; }
      const groupHits=[];
      Object.entries(GROUPS).forEach(([key,g])=>{
        if(stripAccent(g.label).includes(q))groupHits.push({group:key,label:g.label});
      });
      const hits=nodes.filter(n=>{
        if(hemisphere!=='both'&&n.side!=='median'&&n.side!==hemisphere) return false;
        const hay=[esLabel(n),n.label,n.name,n.region,n.parent||'',...(n.ta2||[])].map(stripAccent).join(' ');
        if(n.parent==='Amygdaloid body') return hay.includes(q)||'amigdala cuerpo amigdalino'.includes(q);
        return hay.includes(q);
      }).slice(0,40);
      box.innerHTML='';
      const sciHits=activeTab==='atlas'?[...scientificRows.values()].filter(row=>{
        const side=row.side==='lh'?'left':'right';
        return (hemisphere==='both'||hemisphere===side)&&stripAccent(row.name).includes(q);
      }).slice(0,35):[];
      sciHits.forEach(row=>{
        const el=document.createElement('div');el.className='result-item';
        const b=document.createElement('b');b.textContent=row.name;
        const small=document.createElement('small');small.textContent='Región cortical';
        el.append(b,small);
        el.onclick=()=>{sciSelect(row.id,{focus:true});input.value='';box.classList.add('hidden');};box.appendChild(el);
      });
      groupHits.slice(0,8).forEach(h=>{
        const el=document.createElement('div'); el.className='result-item'; el.innerHTML=`<b>${h.label}</b><small>Agrupación anatómica</small>`;
        el.onclick=()=>{ selectGroup(h.group); input.value=''; box.classList.add('hidden'); }; box.appendChild(el);
      });
      hits.forEach(n=>{
        const el=document.createElement('div'); el.className='result-item';
        el.innerHTML=`<b>${esLabel(n)}</b><small>${sideLabel(n.side)} · ${categoryLabel(n.category)}</small>`;
        el.onclick=()=>{ selectIds([n.id]); input.value=''; box.classList.add('hidden'); }; box.appendChild(el);
      });
      if(!groupHits.length&&!hits.length&&!sciHits.length) box.innerHTML='<div class="result-item"><b>Sin coincidencias</b><small>Prueba otro término.</small></div>';
      box.classList.remove('hidden');
    });
  }

  function selectGroup(key){
    if(key==='insula'){selectedIds.clear();isolateIds=null;currentGroup='insula';updateVisibility();updateMaterials();updateInfo();return;}
    const ids=idsForGroup(key); if(ids.length) selectIds(ids,{groupKey:key});
  }

  function setHemisphere(side){
    hemisphere=side; document.querySelectorAll('#hemisphereButtons button').forEach(b=>b.classList.toggle('active',b.dataset.side===side));
    if(currentGroup) selectedIds=new Set(idsForGroup(currentGroup));
    updateVisibility(); updateMaterials(); updateInfo(); if(selectedIds.size) focusIds([...selectedIds]);
    updateConnectomeReadout();
  }

  function createRouteLine(stages, title){
    clearRoute();
    const points=[]; const routeIds=new Set();
    stages.forEach(st=>{
      st.ids.forEach(id=>routeIds.add(id));
      const box=new THREE.Box3(); let ok=false;
      st.ids.forEach(id=>(meshesById.get(id)||[]).forEach(m=>{ box.expandByObject(m); ok=true; }));
      if(ok) points.push(box.getCenter(new THREE.Vector3()));
    });
    if(points.length<2) return;
    routeCurve=new THREE.CatmullRomCurve3(points,false,'catmullrom',.25);
    const geo=new THREE.TubeGeometry(routeCurve,80,.018,8,false);
    const mat=new THREE.MeshBasicMaterial({color:0x63dcff,transparent:true,opacity:.82,depthTest:false});
    routeGroup=new THREE.Group(); const tube=new THREE.Mesh(geo,mat); tube.renderOrder=15; routeGroup.add(tube); routeGroup.userData.routeIds=routeIds;
    const pulseGeo=new THREE.SphereGeometry(.055,18,18); const pulseMat=new THREE.MeshBasicMaterial({color:0xffd166,depthTest:false});
    routePulse=new THREE.Mesh(pulseGeo,pulseMat); routePulse.renderOrder=16; routeGroup.add(routePulse);
    scene.add(routeGroup); routeClock.start();
    cortexOpacity=Math.min(cortexOpacity,.18); $('cortexOpacity').value=Math.round(cortexOpacity*100); $('cortexValue').textContent=`${Math.round(cortexOpacity*100)}%`;
    updateMaterials();
    const banner=$('routeBanner'); banner.innerHTML=`<b>${title}</b>${stages.map(s=>s.label).join(' → ')}`; banner.classList.remove('hidden');
    const all=[...routeIds]; if(all.length) focusIds(all);
  }

  function clearRoute(){
    if(routeGroup){ scene.remove(routeGroup); routeGroup.traverse(o=>{ if(o.geometry)o.geometry.dispose(); if(o.material)o.material.dispose(); }); }
    routeGroup=null; routePulse=null; routeCurve=null; $('routeBanner')?.classList.add('hidden'); if(meshes.length) updateMaterials();
  }

  function routeStage(key,side){ return {label:`${GROUPS[key].label}${side?` ${side==='left'?'izquierdo':'derecho'}`:''}`,ids:idsForGroup(key,side)}; }
  function startRoute(type){
    return; // Trayectorias pendientes de definición por el proyecto.

    const start=hemisphere==='left'?'left':'right'; const contra=start==='left'?'right':'left'; let stages=[],title='';
    if(type==='anterior'){
      title='Propagación focal anterior';
      stages=[routeStage('temporal_mesial',start),routeStage('temporal_pole',start),routeStage('orbitofrontal',start)];
    } else if(type==='posterior'){
      title='Propagación focal posterior';
      stages=[routeStage('temporal_mesial',start),routeStage('parahippocampal',start),routeStage('fusiform',start)];
    } else {
      title='Propagación bilateral mesial';
      stages=[routeStage('temporal_mesial',start),{label:'Comisura hipocampal',ids:idsForGroup('hippocampal_commissure')},routeStage('hippocampus',contra),routeStage('amygdala',contra)];
    }
    stages=stages.filter(s=>s.ids.length); createRouteLine(stages,title);
  }


  // Puntos ilustrativos muestreados sobre las mallas de cada región.
  const CONNECTOME_LAYERS = [
    {key:'cortex', label:'Corteza de resonancia', share:.59, color:0x789be4},
    {key:'hippocampus', label:'Hipocampo', share:.03, color:0xe7a969},
    {key:'deep_grey', label:'Núcleos profundos', share:.07, color:0xc690d6},
    {key:'diencephalon', label:'Diencéfalo', share:.07, color:0xb0a1e9},
    {key:'white_matter', label:'Comisuras y fibras profundas', share:.025, color:0xb6ccdb},
    {key:'cerebellum', label:'Cerebelo', share:.16, color:0x57b5a5},
    {key:'brainstem', label:'Tronco encefálico', share:.055, color:0xc3a28e}
  ];
  const CONNECTOME_SIDES = ['median','left','right'];
  const CONNECTOME_STAGE_COLORS = [0xf4b45e,0x53d8f3,0xbf9bf8,0x8fe5a6];
  const CONNECTOME_STAGE_INTERVAL = 2.25;
  const CONNECTOME_RECRUITMENT_TIME = .90;
  const CONNECTOME_CORTICAL_REGIONS = {
    temporal_mesial:['entorhinal'],
    temporal_pole:['temporalpole'],
    orbitofrontal:['lateralorbitofrontal','medialorbitofrontal','parsorbitalis'],
    parahippocampal:['parahippocampal'],
    fusiform:['fusiform']
  };
  const CONNECTOME_PATTERN_NAMES = {
    crisis:'Ruta completa de crisis',anterior:'Anterior',posterior:'Posterior',bilateral:'Bilateral',mixto:'Mixto bilateral'
  };
  const CONNECTOME_PATTERNS = {
    crisis:window.CrisisRouteData.STEPS.map(step=>[step.short,...step.parts,...(step.tracts||[])]),
    anterior:[
      ['Temporal mesial',['temporal_mesial','both']],
      ['Polo temporal',['temporal_pole','both']],
      ['Región orbitofrontal',['orbitofrontal','both']]
    ],
    posterior:[
      ['Temporal mesial',['temporal_mesial','both']],
      ['Giro parahipocampal',['parahippocampal','both']],
      ['Giro fusiforme',['fusiform','both']]
    ],
    bilateral:[
      ['Temporal mesial de origen',['temporal_mesial','origin']],
      ['Comisura hipocampal',['hippocampal_commissure','median']],
      ['Hipocampo contralateral',['hippocampus','opposite']],
      ['Región orbitofrontal contralateral',['orbitofrontal','opposite']]
    ],
    mixto:[
      ['Temporal mesial de origen',['temporal_mesial','origin']],
      ['Polo temporal, giro parahipocampal y comisura',['temporal_pole','origin'],['parahippocampal','origin'],['hippocampal_commissure','median']],
      ['Orbitofrontal, fusiforme e hipocampo contralateral',['orbitofrontal','origin'],['fusiform','origin'],['hippocampus','opposite']],
      ['Región orbitofrontal contralateral',['orbitofrontal','opposite']]
    ]
  };
  const CRISIS_POINT_COLORS=window.CrisisRouteData.STEPS.map(step=>step.color);
  const CONNECTOME_COLOR_COUNT=CRISIS_POINT_COLORS.length;
  const connectomeStageColors=()=>connectomePattern==='crisis'?CRISIS_POINT_COLORS:CONNECTOME_STAGE_COLORS;
  const connectomeSideFor=scope=>scope==='origin'||scope==='ipsi'?connectomeOrigin:
    scope==='opposite'||scope==='contra'?(connectomeOrigin==='left'?'right':'left'):scope;

  function describeConnectomeCrisisStage(stage){
    const side=connectomeOrigin==='left'?'izquierdo':'derecho';
    const other=connectomeOrigin==='left'?'derecho':'izquierdo';
    switch(stage){
      case 0:return `Foco hipocampal ${side}.`;
      case 1:return 'Subículo · puntos de referencia próximos al hipocampo.';
      case 3:return 'Amígdala → giro parahipocampal → polo temporal → corteza temporal posterolateral.';
      case 4:return `Cruce desde la corteza temporal posterolateral al temporal ${other} · vía indeterminada.`;
      case 5:return `Llegada del polo temporal ${side} a la corteza orbitofrontal. Comienza la extensión de red.`;
      case 6:return 'Rama desde el subículo · cuerpos mamilares y relevo hacia el tálamo.';
      case 7:return 'Rama desde el giro parahipocampal · vía exacta indeterminada.';
      case 8:return 'Cíngulo medio y precúneo de ambos hemisferios.';
      default:return '';
    }
  }

  const connectomeSurfaceCache = new WeakMap();
  let connectomePoints=null, connectomeActivePoints=null;
  let connectomeBounds=null,connectomeBuckets=[],connectomeRegions=new Map();
  let connectomeFocusRegion=0;
  let connectomeRebuildTimeout=null,connectomeQuality='auto',connectomeLoadError='';
  let connectomeCount = 120000, connectomeStage = -1, connectomeLayer = -1, connectomeSide = -1;
  let connectomeOrigin='left',connectomeShowMicro=false,connectomeEmphasize=true;
  let connectomeStageEnds=[];
  let connectomeStageStarts=[],connectomeInspection=null;
  const POINT_VERTEX_SHADER = `
    precision highp float;
    attribute vec3 aTint;
    attribute vec3 aGroup;
    attribute float aTime;
    attribute float aRegion;
    uniform float uRegion;
    uniform float uClock;
    uniform float uEndTime;
    uniform mediump float uStarted;
    uniform float uPointScale;
    uniform float uPixelRatio;
    uniform float uLayer;
    uniform float uSide;
    uniform mediump float uStage;
    uniform float uCurrentStage;
    uniform mediump float uEmphasis;
    uniform vec3 uStageColors[${CONNECTOME_COLOR_COUNT}];
    uniform mediump float uActivePass;
    varying mediump vec3 vTint;
    varying mediump float vRise;
    varying mediump float vPulse;
    varying mediump float vCurrent;
    varying mediump float vFocus;
    void main(){
      bool included=(uLayer<0.0 || uLayer==aGroup.x) && (uSide<0.0 || uSide==aGroup.y) && (uStage<0.0 || uStage==aGroup.z);
      float age=uClock-aTime;
      bool closingTract=aTime>=uEndTime-.001;
      bool finished=uStarted>0.5 && uClock>=uEndTime-.001;
      bool lit=aTime>=0.0 && uStarted>0.5 && (closingTract?finished:age>=0.0);
      bool current=lit && (aGroup.z==uCurrentStage || (uCurrentStage<0.0 && aGroup.z>=-uCurrentStage));
      if(!included || (closingTract&&!finished) || (uActivePass>0.5)!=lit){
        gl_Position=vec4(2.0,2.0,2.0,1.0);
        gl_PointSize=1.0;
        return;
      }
      vCurrent=current?1.0:0.0;
      bool focused=uRegion>0.0 && aRegion==uRegion;
      vFocus=focused?1.0:(uRegion>0.0?-1.0:0.0);
      vRise=lit?(closingTract?1.0:smoothstep(0.0,0.13,age)):0.0;
      vPulse=vCurrent*exp(-max(0.0,age-.10)*2.6);
      vTint=aTint;
      if(lit || uStage>0.0){
        for(int i=0;i<${CONNECTOME_COLOR_COUNT};i++){
          if(aGroup.z==float(i+1))vTint=uStageColors[i];
        }
      }
      vec4 mv=modelViewMatrix*vec4(position,1.0);
      float diameter=lit ? mix(2.4,mix(2.8,3.4,uEmphasis),vCurrent)+1.2*vPulse : 2.30;
      if(focused)diameter=max(diameter,3.4);
      float densityScale=focused||(lit&&vCurrent>0.5) ? max(.78,uPointScale) : uPointScale;
      float size=diameter*densityScale*clamp(4.3/max(0.1,-mv.z),.70,1.6);
      gl_PointSize=clamp(size*uPixelRatio,1.25,5.0*uPixelRatio);
      gl_Position=projectionMatrix*mv;
    }
  `;
  const POINT_FRAGMENT_SHADER = `
    precision mediump float;
    uniform float uDim;
    uniform mediump float uStarted;
    uniform mediump float uActivePass;
    uniform mediump float uStage;
    uniform mediump float uEmphasis;
    varying mediump vec3 vTint;
    varying mediump float vRise;
    varying mediump float vPulse;
    varying mediump float vCurrent;
    varying mediump float vFocus;
    void main(){
      float radius=length(gl_PointCoord-vec2(.5));
      if(radius>.49 || (uActivePass>.5 && vRise<.02))discard;
      float disc=1.0-smoothstep(.23,.49,radius);
      float context=uDim*(uStage>0.0?1.7:1.0);
      context*=mix(1.0,.23,uEmphasis*uStarted);
      float history=mix(.86,.70,uEmphasis);
      float alpha=uActivePass>.5 ? mix(history,.97,vCurrent)*vRise : context;
      vec3 tint=mix(vTint,vec3(.99,.98,.93),vPulse*.50);
      if(vFocus>0.0){tint=vec3(1.0,.82,.44);alpha=max(alpha,.90);}
      if(vFocus<0.0)alpha*=.35;
      gl_FragColor=vec4(tint,alpha*disc);
    }
  `;

  function clearConnectome(){
    clearTimeout(connectomeRebuildTimeout);
    connectomeRebuildTimeout=null;
    if(connectomePoints){
      connectomePoints.removeFromParent();
      connectomeActivePoints.removeFromParent();
      connectomePoints.geometry.dispose();
      connectomeActivePoints.geometry.dispose();
      connectomePoints.material.dispose();
      connectomeActivePoints.material.dispose();
    }
    connectomePoints=null;
    connectomeActivePoints=null;
    connectomeBounds=null;
    connectomeBuckets=[];
    connectomeRegions.clear();
    connectomeStageEnds=[];
  }

  function connectomeSurface(geometry){
    if(connectomeSurfaceCache.has(geometry))return connectomeSurfaceCache.get(geometry);
    const attr=geometry.attributes.position,index=geometry.index;
    const triangles=Math.floor((index?.count||attr.count)/3);
    const cumulative=new Float64Array(triangles);
    const a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3();
    let total=0;
    for(let i=0;i<triangles;i++){
      const j=i*3;
      a.fromBufferAttribute(attr,index?index.getX(j):j);
      b.fromBufferAttribute(attr,index?index.getX(j+1):j+1).sub(a);
      c.fromBufferAttribute(attr,index?index.getX(j+2):j+2).sub(a);
      total+=b.cross(c).length()*.5;
      cumulative[i]=total;
    }
    const surface={attr,index,cumulative,total};
    connectomeSurfaceCache.set(geometry,surface);
    return surface;
  }

  function nearestConnectomePatch(mesh,anchor){
    const {attr,index,cumulative}=connectomeSurface(mesh.geometry);
    const center=new THREE.Vector3();
    const point=new THREE.Vector3();
    const patchSize=16;
    const nearest=[];
    for(let i=0;i<cumulative.length;i++){
      const area=cumulative[i]-(i?cumulative[i-1]:0);
      if(!area)continue;
      center.set(0,0,0);
      for(let j=i*3;j<i*3+3;j++){
        center.add(point.fromBufferAttribute(attr,index?index.getX(j):j));
      }
      center.multiplyScalar(1/3).applyMatrix4(mesh.matrixWorld);
      const distance=center.distanceToSquared(anchor);
      if(nearest.length===patchSize&&distance>=nearest.at(-1).distance)continue;
      const before=nearest.findIndex(entry=>entry.distance>distance);
      nearest.splice(before<0?nearest.length:before,0,{triangle:i,area,distance});
      if(nearest.length>patchSize)nearest.pop();
    }
    let total=0;
    const triangleIds=nearest.map(entry=>entry.triangle);
    return {attr,index,triangleIds,cumulative:nearest.map(entry=>total+=entry.area),total};
  }

  function buildConnectomeStages(){
    brainRoot.updateMatrixWorld(true);
    return CONNECTOME_PATTERNS[connectomePattern].map(([label,...regions],i)=>{
      const groups=[];
      const step=window.CrisisRouteData.STEPS[i];
      for(const [order,[key,scope]] of regions.entries()){
        const sides=scope==='both'?['left','right']:[connectomeSideFor(scope)];
        for(const side of sides){
          if(connectomePattern==='crisis'){
            const isReference=crisisAnimation.isReference(key,side);
            const anchor=isReference?crisisAnimation.anchor(key,side):null;
            const meshes=new Set(crisisAnimation.idsFor(isReference?'hippocampus':key,side)
              .flatMap(id=>scientificMeshes.has(id)?[scientificMeshes.get(id)]:meshesById.get(id)||[]));
            if(meshes.size&&(!isReference||anchor))groups.push({
              label:crisisAnimation.labelFor(key),side,meshes,anchor,
              atClose:step.tracts?.some(([part])=>part===key)??false,
              offset:step.ordered?order*.49:i===window.CrisisRouteData.CROSSING_STAGE&&order>0?.45:0
            });
            continue;
          }
          const found=new Set();
          const parcels=CONNECTOME_CORTICAL_REGIONS[key]||[];
          const prefix=side==='left'?'C_lh_':'C_rh_';
          for(const parcel of parcels){
            const mesh=scientificMeshes.get(prefix+parcel);
            if(mesh)found.add(mesh);
          }
          const legacyGroups=key==='temporal_mesial'?['hippocampus','amygdala']:(parcels.length?[]:[key]);
          for(const group of legacyGroups){
            for(const id of idsForGroup(group,side)){
              for(const mesh of meshesById.get(id)||[])found.add(mesh);
            }
          }
          if(found.size)groups.push({label:GROUPS[key].label,side,meshes:found});
        }
      }
      return {id:i+1,label,groups};
    });
  }

  function buildConnectomeSamplers(stages){
    const stagesByMesh=new Map();
    const referenceGroups=[];
    for(const stage of stages){
      for(const group of stage.groups){
        const id=connectomeRegions.size+1;
        const region={id,stage:stage.id,label:group.label,side:CONNECTOME_SIDES.indexOf(group.side),
          bounds:new THREE.Box3(),layers:new Set(),atClose:group.atClose===true};
        connectomeRegions.set(id,region);
        if(group.anchor){
          referenceGroups.push({...group,stage:stage.id,region});
          continue;
        }
        for(const mesh of group.meshes){
          if(!stagesByMesh.has(mesh))stagesByMesh.set(mesh,{stage:stage.id,offset:group.offset||0,region});
        }
      }
    }
    const sources=new Map(CONNECTOME_LAYERS.map(({key})=>[key,[]]));
    for(const mesh of meshes){
      const {id,cat,side}=mesh.userData.__atlas;
      const node=nodeById.get(id);
      const key=legacyCortexIsInternal({id})?'hippocampus':
        stagesByMesh.has(mesh)&&cat==='tracts'?'white_matter':cat;
      if(key==='cortex'||!sources.has(key)||node?.name.startsWith('White matter of telencephalon.'))continue;
      sources.get(key).push({mesh,side});
    }
    for(const [id,mesh] of scientificMeshes){
      const row=scientificRows.get(id);
      if(row?.category==='cortex')sources.get('cortex').push({mesh,side:row.side==='lh'?'left':'right'});
    }
    const layerIndices=new Map(CONNECTOME_LAYERS.map(({key},i)=>[key,i]));
    for(const mesh of stagesByMesh.keys()){
      if(mesh.userData.__atlas?.cat==='cortex'&&!legacyCortexIsInternal(mesh.userData.__atlas)){
        const {side}=mesh.userData.__atlas;
        sources.get('cortex').push({mesh,side});
      }
    }
    const references=referenceGroups.flatMap(group=>[...group.meshes].flatMap(mesh=>{
      const surface=nearestConnectomePatch(mesh,group.anchor);
      return surface.total?[{mesh,surface,stage:group.stage,side:CONNECTOME_SIDES.indexOf(group.side),
        layer:layerIndices.get('hippocampus'),region:group.region}]:[];
    }));
    let cumulativeShare=0;
    const layers=CONNECTOME_LAYERS.map(({key,share,color},layer)=>{
      const entries=[];
      const bounds=new THREE.Box3();
      let weight=0;
      for(const {mesh,side} of sources.get(key)){
        const geometry=mesh.userData.v41AdaptedGeometry||mesh.geometry;
        const surface=connectomeSurface(geometry);
        if(!surface.total)continue;
        const scale=mesh.getWorldScale(new THREE.Vector3());
        weight+=Math.pow(surface.total*(scale.x*scale.y+scale.y*scale.z+scale.z*scale.x)/3,.72);
        if(!geometry.boundingBox)geometry.computeBoundingBox();
        bounds.union(geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld));
        const activation=stagesByMesh.get(mesh);
        entries.push({mesh,surface,side:CONNECTOME_SIDES.indexOf(side),stage:activation?.stage||0,
          offset:activation?.offset||0,region:activation?.region,layer,weight});
      }
      cumulativeShare+=share;
      return {entries,bounds,weight,share:cumulativeShare,color};
    });
    return {layers,references};
  }

  function buildConnectome(){
    if(!scene||!scientificReady)return;
    clearConnectome();
    const stages=buildConnectomeStages();
    const {layers,references}=buildConnectomeSamplers(stages);
    const count=connectomeCount;
    const positions=new Float32Array(count*3);
    const tints=new Uint8Array(count*3);
    const groupNumbers=new Uint8Array(count*3);
    const times=new Float32Array(count);
    const regions=new Uint8Array(count);
    const indicesByStage=stages.map(()=>[]);
    const point=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3();
    let produced=0;
    const buckets=new Map();
    const sample=(entry,number,color,seedBase)=>{
      if(!number)return;
      const {mesh,surface,layer,side,stage,region,offset:stageOffset=0}=entry;
      const {attr,index,cumulative,total,triangleIds}=surface;
      const staggered=connectomePattern==='crisis'&&window.CrisisRouteData.STEPS[stage-1]?.ordered;
      const closingTract=region?.atClose;
      if(region)region.layers.add(layer);
      const key=`${layer}-${side}-${stage}`;
      if(!buckets.has(key))buckets.set(key,{layer,side,stage,count:0});
      buckets.get(key).count+=number;
      for(let i=0;i<number;i++){
        const seed=seedBase+i*43;
        const area=pseudoRand(seed)*total;
        let lo=0,hi=cumulative.length-1;
        while(lo<hi){
          const mid=(lo+hi)>>1;
          if(cumulative[mid]<=area)lo=mid+1;else hi=mid;
        }
        const j=(triangleIds?.[lo]??lo)*3;
        point.fromBufferAttribute(attr,index?index.getX(j):j);
        b.fromBufferAttribute(attr,index?index.getX(j+1):j+1);
        c.fromBufferAttribute(attr,index?index.getX(j+2):j+2);
        let u=pseudoRand(seed+1), v=pseudoRand(seed+2);
        if(u+v>1){u=1-u;v=1-v;}
        point.multiplyScalar(1-u-v).addScaledVector(b,u).addScaledVector(c,v).applyMatrix4(mesh.matrixWorld);
        if(region){
          regions[produced]=region.id;
          region.bounds.expandByPoint(point);
        }
        const offset=produced*3;
        const shade=.82+pseudoRand(seed+3)*.18;
        positions[offset]=point.x;positions[offset+1]=point.y;positions[offset+2]=point.z;
        tints[offset]=((color>>16)&255)*shade;tints[offset+1]=((color>>8)&255)*shade;tints[offset+2]=(color&255)*shade;
        groupNumbers[offset]=layer;groupNumbers[offset+1]=side;groupNumbers[offset+2]=stage;
        times[produced]=closingTract ? connectomeDuration : stage ? connectomeStageStarts[stage-1]+stageOffset+
          pseudoRand(seed+4)*(staggered?.36:CONNECTOME_RECRUITMENT_TIME) : -1;
        if(stage)indicesByStage[stage-1].push(produced);
        produced++;
      }
    };

    const entries=layers.flatMap(layer=>layer.entries);
    const routeEntries=[...entries.filter(e=>e.stage),...references];
    const reserved=routeEntries.length?Math.min(40000,Math.round(count*.08)):0;
    let assigned=0;
    let seedBase=100003;
    layers.forEach(({entries,weight,share,color},i)=>{
      const target=i===layers.length-1?count-reserved:Math.round((count-reserved)*share);
      const n=target-assigned;
      assigned=target;
      let layerAssigned=0;
      entries.forEach((entry,j)=>{
        const upto=j===entries.length-1?n:Math.round(n*entry.weight/weight);
        sample(entry,upto-layerAssigned,color,seedBase);
        layerAssigned=upto;
        seedBase+=15000019;
      });
    });
    routeEntries.forEach((entry,i)=>{
      const n=Math.floor(reserved*(i+1)/routeEntries.length)-Math.floor(reserved*i/routeEntries.length);
      sample(entry,n,CONNECTOME_LAYERS[entry.layer].color,seedBase);
      seedBase+=15000019;
    });

    const geom=new THREE.BufferGeometry();
    geom.setAttribute('position',new THREE.BufferAttribute(positions,3));
    geom.setAttribute('aTint',new THREE.BufferAttribute(tints,3,true));
    geom.setAttribute('aGroup',new THREE.BufferAttribute(groupNumbers,3));
    geom.setAttribute('aTime',new THREE.BufferAttribute(times,1));
    geom.setAttribute('aRegion',new THREE.BufferAttribute(regions,1));
    geom.setDrawRange(0,produced);
    geom.computeBoundingSphere();
    // The activation pass draws only route points in stages already reached.
    const routeGeometry=new THREE.BufferGeometry();
    for(const [name,attribute] of Object.entries(geom.attributes))routeGeometry.setAttribute(name,attribute);
    const indexCount=indicesByStage.reduce((total,indices)=>total+indices.length,0);
    const routeIndex=new Uint32Array(indexCount);
    let offset=0;
    for(const indices of indicesByStage){
      routeIndex.set(indices,offset);
      offset+=indices.length;
      connectomeStageEnds.push(offset);
    }
    routeGeometry.setIndex(new THREE.BufferAttribute(routeIndex,1));
    routeGeometry.boundingSphere=geom.boundingSphere;
    const colors=Array.from({length:CONNECTOME_COLOR_COUNT},(_,i)=>{
      const color=connectomeStageColors()[i]??0xffffff;
      return new THREE.Vector3(((color>>16)&255)/255,((color>>8)&255)/255,(color&255)/255);
    });
    const uniforms={
      uClock:{value:connectomeElapsed},uEndTime:{value:connectomeDuration},uStarted:{value:connectomeStarted?1:0},
      uPointScale:{value:Math.min(1.28,Math.pow(25000/count,.24))},uPixelRatio:{value:renderer.getPixelRatio()},
      uDim:{value:connectomeShowMicro?.46:.24},uLayer:{value:connectomeLayer},uSide:{value:connectomeSide},
      uStage:{value:connectomeStage},uStageColors:{value:colors},uRegion:{value:connectomeFocusRegion},
      uCurrentStage:{value:(connectomeInspection??connectomeStageAt(connectomeElapsed))+1},uEmphasis:{value:connectomeEmphasize?1:0}
    };
    const makePoints=active=>new THREE.Points(active?routeGeometry:geom,new THREE.ShaderMaterial({
      vertexShader:POINT_VERTEX_SHADER,fragmentShader:POINT_FRAGMENT_SHADER,
      uniforms:{...uniforms,uActivePass:{value:active?1:0}},
      transparent:true,depthTest:active,depthWrite:active,toneMapped:false
    }));
    connectomePoints=makePoints(false);
    connectomePoints.renderOrder=20;
    connectomeActivePoints=makePoints(true);
    connectomeActivePoints.renderOrder=21;
    scene.add(connectomePoints,connectomeActivePoints);
    syncConnectomeFrame();
    connectomeBuckets=[...buckets.values()];
    connectomeBounds=layers.reduce((box,layer)=>box.union(layer.bounds),new THREE.Box3());
    fillConnectomeRegionPicker(stages);
    updateConnectomeFilters();
    updateConnectomeReadout();
  }

  function updateConnectomeFilters(){
    if(!connectomePoints)return;
    const uniforms=connectomePoints.material.uniforms;
    uniforms.uLayer.value=connectomeLayer;
    uniforms.uSide.value=connectomeSide;
    uniforms.uStage.value=connectomeStage;
    let count=0;
    for(const item of connectomeBuckets){
      if((connectomeLayer<0||item.layer===connectomeLayer)&&(connectomeSide<0||item.side===connectomeSide)&&(connectomeStage<0||item.stage===connectomeStage))count+=item.count;
    }
    $('connectomeCount').textContent=count.toLocaleString('es-CO');
    $('connectomeEmpty').classList.toggle('hidden',count!==0);
  }

  function fillConnectomeRegionPicker(stages){
    const picker=$('connectomeRegion');
    const sections=[];
    for(const stage of stages){
      const section=document.createElement('optgroup');
      section.label=`${stage.id}. ${stage.label}`;
      for(const region of connectomeRegions.values()){
        if(region.stage!==stage.id||region.bounds.isEmpty())continue;
        const side=region.side===0?'':` · ${sideLabel(CONNECTOME_SIDES[region.side])}`;
        const option=new Option(region.label+side,region.id);
        section.appendChild(option);
      }
      if(section.children.length)sections.push(section);
    }
    picker.replaceChildren(new Option('Vista general',0),...sections);
    if(![...picker.options].some(option=>Number(option.value)===connectomeFocusRegion))connectomeFocusRegion=0;
    picker.value=String(connectomeFocusRegion);
    updateConnectomeRegionPicker();
    if(connectomePoints)connectomePoints.material.uniforms.uRegion.value=connectomeFocusRegion;
  }

  function updateConnectomeRegionPicker(){
    const picker=$('connectomeRegion');
    const finished=connectomeStarted&&connectomeElapsed>=connectomeDuration;
    picker.disabled=!connectomePoints||picker.options.length<2;
    for(const option of picker.options){
      const region=connectomeRegions.get(Number(option.value));
      option.disabled=Boolean(region?.atClose&&!finished);
      if(region?.atClose){
        const label=`${region.label} · ${sideLabel(CONNECTOME_SIDES[region.side])}`;
        const text=finished?label:label+' (al cierre)';
        if(option.text!==text)option.text=text;
      }
    }
  }

  function clearConnectomeRegion(){
    connectomeFocusRegion=0;
    $('connectomeRegion').value='0';
    if(connectomePoints)connectomePoints.material.uniforms.uRegion.value=0;
  }

  function focusConnectomeRegion(id){
    const region=connectomeRegions.get(id);
    if(!region||region.bounds.isEmpty()){
      clearConnectomeRegion();
      focusConnectome();
      return;
    }
    if(region.atClose&&(!connectomeStarted||connectomeElapsed<connectomeDuration))return;
    connectomeFocusRegion=id;
    connectomePoints.material.uniforms.uRegion.value=id;
    if(connectomeSide>=0&&connectomeSide!==region.side){
      connectomeSide=-1;
      $('connectomeSide').value='-1';
    }
    if(connectomeStage>=0&&connectomeStage!==region.stage){
      connectomeStage=-1;
      $('connectomeStage').value='-1';
    }
    if(connectomeLayer>=0&&!region.layers.has(connectomeLayer)){
      connectomeLayer=-1;
      $('connectomeLayer').value='-1';
    }
    updateConnectomeFilters();
    updateConnectomeReadout();
    focusConnectome(region.bounds);
  }

  function applyConnectomeQuality(){
    if(!renderer)return;
    const limit=connectomeQuality==='detalle'?1.35:connectomeQuality==='ahorro'?.8:1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,connectomeMode?limit:1.25));
    if(connectomePoints)connectomePoints.material.uniforms.uPixelRatio.value=renderer.getPixelRatio();
    resize();
  }

  function setConnectomeMode(enabled){
    const wasEnabled=connectomeMode;
    clearConnectomeRegion();
    connectomeMode=enabled;
    connectomeRunning=false;
    connectomeStarted=false;
    connectomeElapsed=0;
    connectomeInspection=null;
    if(!enabled){
      $('connectomeProgress').hidden=true;
      clearConnectome();
      $('connectomeOverlay').classList.add('hidden');
      $('connectomeEmpty').classList.add('hidden');
    }else{
      $('connectomeCount').textContent='—';
      $('connectomeOverlay').classList.remove('hidden');
      $('btnConnectomePause').textContent='Pausar';
    }
    if(enabled||wasEnabled)applyConnectomeQuality();
    updateVisibility();updateMaterials();
    if(enabled){buildConnectome();updateConnectomeReadout();}
  }

  function updateConnectome(dt){
    if(!connectomePoints)return;
    if(connectomeRunning){
      connectomeElapsed=Math.min(connectomeDuration,connectomeElapsed+Math.min(.06,dt)*connectomeSpeed);
      const stage=connectomeStageAt(connectomeElapsed);
      if(stage!==connectomeReadoutStage||connectomeElapsed>=connectomeDuration){
        connectomeRunning=connectomeElapsed<connectomeDuration;
        updateConnectomeReadout();
      }
    }
    syncConnectomeFrame();
  }

  function syncConnectomeFrame(){
    const uniforms=connectomePoints.material.uniforms;
    const stage=connectomeStageAt(connectomeElapsed);
    uniforms.uClock.value=connectomeElapsed;
    uniforms.uStarted.value=connectomeStarted?1:0;
    const branchStage=window.CrisisRouteData.BRANCH_STAGE;
    uniforms.uCurrentStage.value=connectomePattern==='crisis'&&stage>=branchStage&&connectomeInspection===null?
      -(branchStage+1):(connectomeInspection??stage)+1;
    connectomeActivePoints.geometry.setDrawRange(0,connectomeStageEnds[stage]);
    connectomeActivePoints.visible=connectomeStarted;
    const progress=$('connectomeProgress');
    if(connectomeStarted&&progress.hidden)progress.hidden=false;
    if(!connectomeStarted&&!progress.hidden)progress.hidden=true;
    if(connectomeStarted)progress.value=connectomeElapsed;
  }

  function focusConnectome(bounds=connectomeBounds){
    if(!camera||!controls||!bounds||bounds.isEmpty())return;
    const center=bounds.getCenter(new THREE.Vector3());
    const size=bounds.getSize(new THREE.Vector3());
    const tan=Math.tan(THREE.MathUtils.degToRad(camera.fov)/2);
    const aspect=camera.aspect||1;
    const general=bounds===connectomeBounds;
    const padding=general?1.20:1.65;
    const dist=Math.max(controls.minDistance,padding*Math.max(size.y/(2*tan),size.x/(2*tan*aspect),size.z*.85));
    const direction=general?new THREE.Vector3(.045,.02,1):camera.position.clone().sub(controls.target).normalize();
    controls.target.copy(center);
    camera.position.copy(center).addScaledVector(direction,dist);
    controls.update();
  }

  function resetConnectome(){
    clearConnectomeRegion();
    connectomeInspection=null;
    connectomeRunning=false;
    connectomeStarted=false;
    connectomeElapsed=0;
    updateConnectome(0);
    updateConnectomeReadout();
  }

  function syncConnectomePattern(){
    const options=CONNECTOME_PATTERNS[connectomePattern].map(([name],i)=>new Option(`${i+1}. ${name}`,i+1));
    const stagePicker=$('connectomeStage');
    stagePicker.replaceChildren(new Option('Todas las etapas y nodos de contexto',-1),...options);
    connectomeStage=-1;
    $('connectomeOriginRow').classList.toggle('hidden',!['bilateral','mixto','crisis'].includes(connectomePattern));
    const firstBranch=window.CrisisRouteData.BRANCH_STAGE;
    connectomeStageStarts=options.map((_,i)=>connectomePattern==='crisis'&&i>=firstBranch?
      firstBranch*CONNECTOME_STAGE_INTERVAL+(i-firstBranch)*.38:i*CONNECTOME_STAGE_INTERVAL);
    connectomeDuration=connectomeStageStarts.at(-1)+CONNECTOME_STAGE_INTERVAL;
    $('connectomeProgress').max=connectomeDuration;
    const timeline=$('connectomeTimeline');
    timeline.replaceChildren(...CONNECTOME_PATTERNS[connectomePattern].map(([label],i)=>{
      const button=document.createElement('button');
      button.type='button';
      button.textContent=String(i+1);
      button.title=label;
      button.setAttribute('aria-label',`Ver etapa ${i+1}: ${label}`);
      button.style.setProperty('--stage-color',`#${connectomeStageColors()[i].toString(16)}`);
      button.onclick=()=>{
        if(!connectomePoints)return;
        clearConnectomeRegion();
        connectomeStarted=true;
        connectomeRunning=false;
        connectomeInspection=i;
        const route=connectomePattern==='crisis';
        const settle=route&&window.CrisisRouteData.STEPS[i].ordered?1.98:
          route&&i===window.CrisisRouteData.CROSSING_STAGE?1.50:CONNECTOME_RECRUITMENT_TIME+.14;
        connectomeElapsed=route&&i>=firstBranch?
          connectomeStageStarts.at(-1)+settle:connectomeStageStarts[i]+settle;
        const picker=$('connectomeStage');
        if(Number(picker.value)>0&&Number(picker.value)!==i+1){
          picker.value=String(i+1);
          connectomeStage=i+1;
          updateConnectomeFilters();
        }
        syncConnectomeFrame();
        updateConnectomeReadout();
      };
      return button;
    }));
    resetConnectome();
    if(connectomeMode)buildConnectome();
  }

  function setupConnectomeControls(){
    const range=$('connectomeDensity');
    const setDensityText=()=>{$('connectomeDensityValue').textContent=connectomeCount.toLocaleString('es-CO');};
    range.value=String(connectomeCount);
    setDensityText();
    range.oninput=e=>{
      connectomeCount=Number(e.target.value);
      setDensityText();
      clearTimeout(connectomeRebuildTimeout);
      if(connectomeMode)connectomeRebuildTimeout=setTimeout(buildConnectome,180);
    };
    const layerPicker=$('connectomeLayer');
    CONNECTOME_LAYERS.forEach(({label},i)=>layerPicker.add(new Option(label,i)));
    for(const [id,set] of [
      ['connectomeLayer',value=>{connectomeLayer=value;}],
      ['connectomeSide',value=>{connectomeSide=value;}],
      ['connectomeStage',value=>{connectomeStage=value;}]
    ]){
      $(id).onchange=e=>{clearConnectomeRegion();set(Number(e.target.value));updateConnectomeFilters();updateConnectomeReadout();};
    }
    $('connectomeOrigin').onchange=e=>{
      connectomeOrigin=e.target.value;
      resetConnectome();
      if(connectomeMode)buildConnectome();
    };
    $('btnConnectomeStart').onclick=()=>{
      if(!connectomePoints)return;
      clearConnectomeRegion();
      connectomeInspection=null;
      connectomeElapsed=0;connectomeStarted=true;connectomeRunning=true;
      updateConnectomeReadout();
    };
    $('btnConnectomePause').onclick=()=>{
      if(!connectomeStarted)return;
      if(connectomeElapsed>=connectomeDuration){clearConnectomeRegion();connectomeElapsed=0;}
      connectomeRunning=!connectomeRunning;
      if(connectomeRunning)connectomeInspection=null;
      updateConnectomeReadout();
    };
    $('btnConnectomeReset').onclick=resetConnectome;
    $('btnConnectomeFocus').onclick=()=>{clearConnectomeRegion();focusConnectome();};
    $('connectomeRegion').onchange=e=>focusConnectomeRegion(Number(e.target.value));
    $('connectomeSpeed').oninput=e=>{
      connectomeSpeed=Number(e.target.value)/100;
      $('connectomeSpeedValue').textContent=`${connectomeSpeed.toFixed(1).replace('.',',')}×`;
    };
    $('toggleConnectomeMicro').onchange=e=>{
      connectomeShowMicro=e.target.checked;
      if(connectomePoints)connectomePoints.material.uniforms.uDim.value=connectomeShowMicro?.46:.24;
    };
    $('connectomeEmphasize').onchange=e=>{
      connectomeEmphasize=e.target.value==='enfoque';
      if(connectomePoints){
        connectomePoints.material.uniforms.uEmphasis.value=connectomeEmphasize?1:0;
        syncConnectomeFrame();
      }
    };
    $('connectomeQuality').onchange=e=>{connectomeQuality=e.target.value;applyConnectomeQuality();};
    const patternButtons=[...document.querySelectorAll('[data-connectome-pattern]')];
    for(const button of patternButtons)button.onclick=()=>{
      connectomePattern=button.dataset.connectomePattern;
      for(const choice of patternButtons){
        choice.classList.toggle('active',choice===button);
        choice.setAttribute('aria-pressed',String(choice===button));
      }
      syncConnectomePattern();
    };
    for(const button of patternButtons){
      button.setAttribute('aria-pressed',String(button.dataset.connectomePattern===connectomePattern));
    }
    syncConnectomePattern();
  }

  // Siete vistas anatómicas guiadas del atlas externo de cabeza. Las capas 
  function setMainMode(tab){
    const previousTab=activeTab;
    if(previousTab==='crisis'&&tab!=='crisis')crisisAnimation?.leave();
    activeTab=tab;
    if(tab==='atlas'&&tractView)setTractView(false); // no involuntary tract mode on entering atlas
    const neural=tab==='neural'||tab==='potential';
    if(previousTab==='crisis')resetView();
    $('searchInput').placeholder=tab==='atlas'?'Buscar: hipocampo, amígdala, seno sagital…':'Buscar: hipocampo, amígdala, fórnix…';
    $('searchResults').classList.add('hidden');
    $('tractBadge').classList.toggle('hidden',neural||tab==='crisis'||!tractView);
    $('crisisSceneBadge').classList.toggle('hidden',tab!=='crisis');
    document.body.classList.toggle('crisis-mode',tab==='crisis');
    $('tractTooltip').classList.add('hidden');
    document.body.classList.toggle('neural-mode',neural);
    if(neural){
      isolateIds=null;selectedIds.clear();currentGroup=null;
      clearRoute();
      if(tractView) setTractView(false);
      const potential=tab==='potential';
      $('brainCanvas').classList.toggle('hidden',potential);
      showPotentials(potential);
      setConnectomeMode(!potential);
      if(!potential)requestAnimationFrame(()=>{if(activeTab==='neural'){resize();focusConnectome();}});
    } else {
      setConnectomeMode(false);
      $('brainCanvas').classList.remove('hidden');
      showPotentials(false);
      if(tab==='crisis'&&tractView) setTractView(false);
      if(tab==='crisis'){isolateIds=null;selectedIds.clear();currentGroup=null;clearRoute();crisisAnimation?.enter();}
      updateVisibility();updateMaterials();resize();
    }
    updateInfo();
  }

  function showPotentials(active){
    $('potentialsWorkspace').classList.toggle('hidden',!active);
    document.body.classList.toggle('potential-mode',active);
    potentialLab?.setActive(active);
  }

  function setTractView(enabled){
    if(enabled&&activeTab==='atlas')return;
    tractView=enabled; clearRoute(); isolateIds=null;
    $('btnTractView').textContent=enabled?'Volver a vista anatómica':'Activar vista de tractos';
    $('btnTractView').setAttribute('aria-pressed',String(enabled));
    $('tractOptions').classList.toggle('hidden',!enabled);
    $('tractBadge').classList.toggle('hidden',!enabled);
    $('tractTooltip').classList.add('hidden');
    document.body.classList.toggle('tract-view',enabled);
    updateVisibility(); updateMaterials();
  }
  function setupTracts(){
    const select=$('tractSelect');
    nodes.filter(n=>isTract({cat:n.category})).sort((a,b)=>esLabel(a).localeCompare(esLabel(b),'es')||a.side.localeCompare(b.side)).forEach(n=>{
      const option=document.createElement('option'); option.value=n.id; option.textContent=`${esLabel(n)} · ${sideLabel(n.side)}`; select.appendChild(option);
    });
    select.onchange=()=>{
      if(select.value===''){selectedIds.clear();currentGroup=null;isolateIds=null;updateVisibility();updateMaterials();updateInfo();return;}
      const n=nodeById.get(Number(select.value));
      if(hemisphere!=='both'&&n.side!=='median'&&n.side!==hemisphere) setHemisphere(n.side);
      selectIds([n.id]);
    };
    $('btnTractView').onclick=()=>setTractView(!tractView);
    $('contextOpacity').oninput=e=>{contextOpacity=Number(e.target.value)/100;$('contextValue').textContent=`${e.target.value}%`;updateVisibility();updateMaterials();};
    $('tractSolo').onchange=e=>{tractSolo=e.target.checked;updateMaterials();};
    $('tractAll').onclick=()=>{setHemisphere('both');showAll();select.value='';};
    $('tractFocus').onclick=()=>{if(selectedIds.size)focusIds([...selectedIds]);};
    $('tractClear').onclick=()=>{select.value='';select.onchange();};
  }
  function setupUI(){
    setupTracts();setupCortex();
    document.querySelectorAll('.tab').forEach(btn=>btn.onclick=()=>{
      document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
      document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active')); $(`tab-${btn.dataset.tab}`).classList.add('active');
      setMainMode(btn.dataset.tab);
    });
    document.querySelectorAll('#hemisphereButtons button').forEach(b=>b.onclick=()=>setHemisphere(b.dataset.side));
    document.querySelectorAll('[data-group]').forEach(b=>b.onclick=()=>selectGroup(b.dataset.group));
    document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>startRoute(b.dataset.route));
    $('cortexOpacity').oninput=e=>{ cortexOpacity=Number(e.target.value)/100; $('cortexValue').textContent=`${e.target.value}%`; updateMaterials(); };
    $('btnIsolate').onclick=isolateSelection; $('btnShowAll').onclick=showAll; $('btnFocus').onclick=()=>scientificSelected?sciFocus(scientificSelected):focusIds([...selectedIds]);
    $('btnResetView').onclick=resetView; $('btnZoomIn').onclick=()=>{
      if(activeTab==='crisis'&&crisisAnimation)crisisAnimation.releaseCamera();
      camera.position.lerp(controls.target,.12);controls.update();
    };
    $('btnZoomOut').onclick=()=>{
      if(activeTab==='crisis'&&crisisAnimation)crisisAnimation.releaseCamera();
      camera.position.sub(controls.target).multiplyScalar(1.15).add(controls.target);controls.update();
    };
    $('btnAuto').onclick=()=>{ autoRotate=!autoRotate; controls.autoRotate=autoRotate; $('btnAuto').textContent=autoRotate?'Detener rotación':'Rotación automática'; };
    $('btnFullscreen').onclick=()=>{ if(!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.(); };
    $('mobileMenu').onclick=()=>$('sidebar').classList.toggle('open');
    $('btnCredits').onclick=()=>$('creditsModal').classList.remove('hidden'); $('closeCredits').onclick=()=>$('creditsModal').classList.add('hidden');
    $('creditsModal').onclick=e=>{ if(e.target===$('creditsModal')) $('creditsModal').classList.add('hidden'); };
    setupSearch();
    potentialLab=new window.PotentialLab();
    setupConnectomeControls();
  }

  function animate(){
    requestAnimationFrame(animate); const dt=mainClock.getDelta();
    controls.update();
    if(routePulse&&routeCurve){ const t=(routeClock.getElapsedTime()*.16)%1; routePulse.position.copy(routeCurve.getPointAt(t)); }
    if(connectomeMode) updateConnectome(dt);
    if(activeTab==='crisis')crisisAnimation?.update(dt);
    renderer.render(scene,camera);
    if(sciActive())updateCortexFloatLabel();
  }

  async function boot(){
    try{
      const [m,t]=await Promise.all([fetch(MANIFEST_URL).then(r=>r.json()),fetch(TRANSLATIONS_URL).then(r=>r.json())]); manifest=m; translations=t; setupData();
      buildCategories();
      setupUI(); initThree(); loadModel(); animate();
    }catch(err){ console.error('[Inicio del atlas]',err); const detail=String(err?.message||err||'Error desconocido').slice(0,180); loadingText.textContent=/WebGL/i.test(detail)?'No se pudo iniciar WebGL: '+detail:'No fue posible iniciar el atlas: '+detail+'. Abre index.html desde Live Server y verifica los archivos.'; }
  }

  boot();
})();