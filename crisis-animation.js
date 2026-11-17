/* Atlas ETM · Secuencia didáctica de propagación temporal mesial. */
(function (root) {
  'use strict';
  const DATA = root.CrisisRouteData;
  const $ = id => document.getElementById(id);
  const setText = (id,value) => {
    const element=$(id);
    if(element&&element.textContent!==value)element.textContent=value;
  };
  const clamp = (n,a,b) => Math.min(b,Math.max(a,n));
  const otherSide = s => s==='left'?'right':'left';
  const sideName = s => s==='left'?'Izq.':'Der.';
  const ease = t => t*t*(3-2*t);
  const APPROACH_END=.65;
  const SOURCE_HOLD=.32;
  const SOURCE_ARRIVAL=.14;
  const BRANCH_REVEAL_END=.46;
  const STRANDS_PER_SEED=16;
  const VISIT_SECONDS=[5.8,4.2,4.2,4.6,4.8,5.2,4.6,4.6,4.5];
  const TRACT_COLORS={
    5:[0x39d4eb,0x74e9ff,0x76f9db,0x4c9fec,0xcfffea],
    6:[0xa99bf6,0xcbacff,0xe8c4ff,0x9679ef,0xded0ff]
  };
  const originPhase=({visit,local})=>{
    if(!visit.origin||local>=APPROACH_END)return 'arrival';
    return local<SOURCE_HOLD?'source':'travel';
  };
  const FIBER_VERTEX_SHADER=`
    attribute vec3 aTangent;
    attribute vec3 aTint;
    attribute float aEdge;
    attribute float aWidth;
    varying vec3 vTint;
    varying float vEdge;
    void main(){
      vec4 point=modelViewMatrix*vec4(position,1.0);
      vec3 tangent=(modelViewMatrix*vec4(aTangent,0.0)).xyz;
      vec3 perpendicular=cross(tangent,normalize(-point.xyz));
      vec3 across=perpendicular/max(.0001,length(perpendicular));
      point.xyz+=across*aWidth*aEdge;
      vTint=aTint;
      vEdge=aEdge;
      gl_Position=projectionMatrix*point;
    }
  `;
  const FIBER_FRAGMENT_SHADER=`
    varying vec3 vTint;
    varying float vEdge;
    void main(){
      float across=abs(vEdge);
      float core=1.0-smoothstep(.22,.62,across);
      float halo=1.0-smoothstep(.42,1.0,across);
      gl_FragColor=vec4(mix(vTint,vec3(1.0,.97,.90),.12*core),.58*core+.08*halo);
    }
  `;
  const REVEAL=.32;
  const OUTER_REGIONS=new Set(['cerebellum','brainstem']);
  const MRI_PARCELS={
    entorhinal:['entorhinal'],
    parahippocampal:['parahippocampal'],
    temporal_pole:['temporalpole'],
    temporal_posterolateral:['middletemporal','superiortemporal','inferiortemporal'],
    orbitofrontal:['lateralorbitofrontal','medialorbitofrontal','parsorbitalis'],
    insula:['insula'],
    precuneus:['precuneus']
  };
  const MRI_DETAILS={
    entorhinal:{description:'Se ilumina la parcela entorrinal del hemisferio de inicio.',evidence:'Superficie cortical de resonancia'},
    insula:{description:'Se ilumina la parcela insular del hemisferio de inicio.',evidence:'Superficie cortical de resonancia; enlace ilustrativo'}
  };
  const REFERENCE_CONTEXT={subiculum:'hippocampus',entorhinal:'parahippocampal',insula:'insula_reference'};

  class CrisisAnimation {
    constructor(opts) {
      this.opts=opts;
      this.THREE=opts.THREE;
      this.cortexMeshes=new Map();
      this.cortexOverlay=new this.THREE.Group();
      this.cortexOverlay.name='Corteza de resonancia · animación de crisis';
      this.cortexOverlay.visible=false;
      this.modelFailed=false;
      this.activationOpacity=0;
      this.contextOpacity=.04;
      this.active=false;
      this.ready=false;
      this.playing=false;
      this.progress=0;
      this.speed=1;
      this.startSide='left';
      this.showConnections=$('crisisShowConnections')?.checked??true;
      this.orbitCamera=$('crisisOrbit')?.checked??true;
      this.showTracts=true;
      this.showBrain=false;
      this.sceneView='brain';
      this.sceneIds=new Set();
      this.referenceIds=new Set();
      this.referenceColor=new this.THREE.Color(0x98aabb);
      this.stageColors=DATA.STEPS.map(step=>new this.THREE.Color(step.color));
      this.originalMinDistance=null;
      this.followCamera=true;
      this.cameraGoal=null;
      this.labels=[];
      this.overview=false;
      this.markerButtons=[];
      this.routeButtons=[];
      this.cameraInput=false;
      this.manualCamera=false;
      this.stopKey='';
      this.timelineKey='';
      this.nodeTexture=null;
      this.brainRadius=1.7;
      this.brainCenter=new this.THREE.Vector3();
      this.stageSegments=[];
      this.focusPart=null;
      this.focusSide=null;
      this.focusIds=new Set();
      this.focusCaption='';
      this.recruitment=0;
      this.cameraDistance='close';
      this.originalAutoRotate=null;
      this.parts={};
      this.stageIds=[];
      this.proxyMap={};
      this.meshStage=new Map();
      this.tractStage=new Map();
      this.edgeVisuals=[];
      this.branchSourceIds=new Set();
      this.branchPulse=null;
      this.sourceRing=null;
      this.tractFibers=new Map();
      this.visitedIds=new Set();
      this.branchActivation=new Map();
      this.visitedAnchors=new Set();
      this.overlay=new this.THREE.Group();
      this.overlay.name='Secuencia ilustrativa de crisis ETM';
      this.overlay.visible=false;
      this.opts.scene.add(this.overlay);
      this.tick=0;
      this.bindUI();
    }
    side(which) { return which==='ipsi'?this.startSide:which==='contra'?otherSide(this.startSide):which; }
    useCortex(root,entries){
      for(const [id,mesh] of entries){
        const copy=new this.THREE.Mesh(mesh.userData.v41AdaptedGeometry,mesh.material.clone());
        copy.userData.__atlas={id,cat:'mri_cortex',base:mesh.material.color.clone()};
        this.cortexMeshes.set(id,[copy]);
        this.cortexOverlay.add(copy);
      }
      root.add(this.cortexOverlay);
      this.cortexOverlay.updateWorldMatrix(true,true);
      this.build();
    }
    meshesFor(id){
      return this.cortexMeshes.get(id)||this.opts.meshesById.get(id)||[];
    }
    idsFor(part,side) {
      const s=this.side(side);
      if(s==='both')return [...this.idsFor(part,'left'),...this.idsFor(part,'right')];
      const hemi=s==='left'?'lh':'rh';
      const cortical=MRI_PARCELS[part]?.map(parcel=>`C_${hemi}_${parcel}`);
      if(cortical?.length&&cortical.every(id=>this.cortexMeshes.has(id)))return cortical;
      return DATA.namesFor(part,s).flatMap(name=>{
        const n=this.opts.nodeByName.get(name);return n?[n.id]:[];
      });
    }
    isReference(part,side){return DATA.PROXIES.has(part)&&!this.idsFor(part,side).length;}
    center(part,side) {
      const ids=this.idsFor(part,side),box=new this.THREE.Box3(); let exists=false;
      ids.forEach(id=>this.meshesFor(id).forEach(m=>{box.expandByObject(m);exists=true;}));
      return exists?box.getCenter(new this.THREE.Vector3()):null;
    }
    anchor(part,which) {
      const s=this.side(which),name=part+':'+s;
      if(this.isReference(part,s))return this.proxyMap[name]?.position.clone()||null;
      return this.center(part,s);
    }
    build() {
      this.clearGeometry();
      this.cortexOverlay.updateWorldMatrix?.(true,true);
      this.meshStage.clear();this.tractStage.clear();this.stageIds=[];
      DATA.STEPS.forEach((step,i)=>{
        const ids=[];
        step.parts.forEach(([part,which])=>{
          this.idsFor(part,which).forEach(id=>{ids.push(id);this.meshStage.set(id,Math.min(i,this.meshStage.get(id)??i));});
        });
        (step.tracts||[]).forEach(([part,which])=>this.idsFor(part,which).forEach(id=>this.tractStage.set(id,i)));
        this.stageIds.push([...new Set(ids)]);
      });
      for(const side of ['left','right']) {
        const hippo=this.center('hippocampus',side);
        const para=this.center('parahippocampal',side);
        const pole=this.center('temporal_pole',side);
        if(!hippo||!para||!pole)continue;
        // El subículo se representa mediante una referencia aproximada.
        this.addProxy('subiculum',side,hippo.clone().lerp(para,.38),'Subículo · orientación');
        if(this.isReference('entorhinal',side))this.addProxy('entorhinal',side,para.clone().lerp(pole,.48),'Entorrinal · orientación');
        const sulcus=this.isReference('insula',side)?this.center('insula_reference',side):null;
        if(sulcus)this.addProxy('insula',side,sulcus,'Ínsula: localización aproximada según surco circular, no malla cortical');
      }
      this.buildBranchMarkers();
      DATA.EDGES.forEach((edge,index)=>this.addEdge(edge,index));
      this.buildGuideSegments();
      this.buildTractFibers();
      this.measureScene();
      if(this.THREE.Points)this.buildActivationNodes();
      this.ready=true;
      this.cortexOverlay.visible=this.active;
      this.visualize();this.updateUI();
      const missing=this.describeMissing();
      if($('crisisAvailability'))$('crisisAvailability').textContent=missing;
    }
    describeMissing() {
      const required=['hippocampus','amygdala','parahippocampal','temporal_pole','temporal_posterolateral','orbitofrontal','mammillary','thalamus','insula_reference','middle_cingulate','precuneus','uncinate','fornix'];
      const absent=required.filter(k=>!this.idsFor(k,'ipsi').length||!this.idsFor(k,'contra').length);
      if(absent.length)return 'Mallas sin coincidencia: '+absent.join(', ');
      if(this.cortexMeshes.size)return 'Corteza MRI para la superficie y las regiones corticales correspondientes. Mallas detalladas del atlas para regiones profundas. El subículo se indica con una referencia aproximada.';
      return 'Modelo anatómico original del atlas.';
    }
    addProxy(part,side,pos,label) {
      const T=this.THREE;
      const material=new T.MeshBasicMaterial({color:0xffdf8b,transparent:false,depthTest:false,depthWrite:false});
      const sphere=new T.Mesh(new T.SphereGeometry(.014,16,12),material);
      sphere.position.copy(pos);sphere.renderOrder=44;this.overlay.add(sphere);
      const ring=new T.Mesh(new T.TorusGeometry(.040,.0025,8,32),new T.MeshBasicMaterial({color:0xffdf8b,transparent:false,depthTest:false,depthWrite:false}));
      ring.position.copy(pos);ring.renderOrder=43;this.overlay.add(ring);
      this.proxyMap[part+':'+side]={sphere,ring,position:pos,label};
    }
    buildBranchMarkers(){
      const T=this.THREE;
      const pulseMaterial=new T.MeshBasicMaterial({color:0xfff3ca,depthTest:false,depthWrite:false});
      this.branchPulse=new T.Mesh(new T.SphereGeometry(.014,16,12),pulseMaterial);
      this.branchPulse.renderOrder=50;
      this.branchPulse.visible=false;
      this.overlay.add(this.branchPulse);
      const ringMaterial=new T.MeshBasicMaterial({color:0xffdd92,transparent:true,depthTest:false,depthWrite:false});
      this.sourceRing=new T.Mesh(new T.TorusGeometry(1,.032,8,48),ringMaterial);
      this.sourceRing.renderOrder=49;
      this.sourceRing.visible=false;
      this.overlay.add(this.sourceRing);
    }

    addEdge(edge,index) {
      const from=this.anchor(edge.anchorPart||edge.from,edge.fromSide);
      const to=this.anchor(edge.to,edge.toSide);
      if(!from||!to)return;
      const T=this.THREE;
      const length=to.clone().sub(from).length();
      if(length<.001)return;
      const mid=from.clone().lerp(to,.5).add(new T.Vector3(0,Math.min(.12,length*.15),0));
      const curve=new T.CatmullRomCurve3([from,mid,to]);
      const visual={edge,index,from,curve,dashes:null};
      if(T.LineDashedMaterial&&(edge.kind==='local'||edge.kind==='schematic')){
        const geometry=new T.BufferGeometry().setFromPoints(curve.getPoints(40));
        const material=new T.LineDashedMaterial({color:0xffd493,dashSize:.023,gapSize:.014,
          transparent:true,opacity:.80,depthTest:false,depthWrite:false});
        visual.dashes=new T.Line(geometry,material).computeLineDistances();
        visual.dashes.visible=false;
        visual.dashes.renderOrder=40;
        this.overlay.add(visual.dashes);
      }
      this.edgeVisuals.push(visual);
    }

    buildGuideSegments() {
      const T=this.THREE;
      this.stageSegments=[];
      let previousVisit=null;
      const visitsByRegion=new Map();
      DATA.STEPS.forEach((step,stageIndex)=>{
        const targets=[];
        step.parts.forEach(([part,which])=>{
          const sides=which==='both'?['left','right']:[this.side(which)];
          sides.forEach(side=>{const target=this.anchor(part,side);if(target)targets.push({part,side,target});});
        });
        const visits=[];
        targets.forEach(target=>{
          const link=this.edgeVisuals.find(v=>v.edge.stage===stageIndex&&
            v.edge.to===target.part&&this.side(v.edge.toSide)===target.side);
          const origin=link?{part:link.edge.from,side:this.side(link.edge.fromSide)}:null;
          const sourceVisit=origin?visitsByRegion.get(origin.part+':'+origin.side):null;
          const from=link?.from.clone()||target.target.clone();
          const ids=this.idsFor(target.part,target.side);
          const referencePart=this.isReference(target.part,target.side)?REFERENCE_CONTEXT[target.part]:null;
          const referenceIds=referencePart?this.idsFor(referencePart,target.side):[];
          const originIds=origin?this.idsFor(origin.part,origin.side):[];
          const visit={part:target.part,side:target.side,from,to:target.target.clone(),curve:link?.curve,
            link,ids,referenceIds,originIds,name:this.labelFor(target.part),origin,sourceVisit,previous:previousVisit,stage:stageIndex,visitIndex:visits.length};
          visits.push(visit);
          visitsByRegion.set(target.part+':'+target.side,visit);
          previousVisit=visit;
        });
        this.stageSegments.push(visits);
      });
    }
    labelFor(part){
      const labels={hippocampus:'Hipocampo',subiculum:'Subículo (referencia)',entorhinal:'Corteza entorrinal',
        amygdala:'Amígdala',parahippocampal:'Giro parahipocampal',temporal_pole:'Polo temporal',
        temporal_posterolateral:'Corteza temporal posterolateral',orbitofrontal:'Corteza orbitofrontal',
        mammillary:'Cuerpos mamilares',thalamus:'Tálamo',insula:'Ínsula',
        middle_cingulate:'Cíngulo medio',precuneus:'Precúneo',uncinate:'Fascículo uncinado',fornix:'Fórnix'};
      return (labels[part]||part)+(['entorhinal','insula'].includes(part)&&this.isReference(part,this.startSide)?' (referencia)':'');
    }
    // No se presentan todos los destinos en el centro del cerebro: cada uno tendrá
    // un subtítulo bajo el visor, y un enfoque individual de cámara y material.
    guideState(progress=this.progress){
      const idx=clamp(Math.floor(progress),0,DATA.STEPS.length-1);
      const stops=this.stageSegments[idx]||[];
      if(!stops.length)return null;
      const fraction=clamp(progress-idx,0,1);
      const scaled=Math.min(stops.length-.0000001,fraction*stops.length);
      const visitIndex=Math.min(stops.length-1,Math.floor(scaled));
      const local=clamp(scaled-visitIndex,0,1);
      const visit=stops[visitIndex];
      const eased=local*local*(3-2*local);
      const point=visit.curve?visit.curve.getPointAt(eased):visit.to.clone();
      return {idx,visitIndex,local,eased,point,visit,stops};
    }
    measureScene(){
      const T=this.THREE;
      if(!T.Sphere)return;
      const boundsFor=ids=>{
        const box=new T.Box3();
        for(const id of ids){
          for(const mesh of this.meshesFor(id))box.expandByObject(mesh);
        }
        return box;
      };
      const outerIds=[...this.cortexMeshes.keys()];
      for(const [id,meshes] of this.opts.meshesById){
        if(meshes.some(mesh=>this.isOuter(mesh.userData.__atlas)))outerIds.push(id);
      }
      const brain=boundsFor(outerIds).getBoundingSphere(new T.Sphere());
      if(brain.radius>0){
        this.brainRadius=brain.radius;
        this.brainCenter.copy(brain.center);
      }
      const route=boundsFor(this.meshStage.keys()).getBoundingSphere(new T.Sphere());
      this.routeRadius=route.radius>0?route.radius:this.brainRadius;
      this.routeCenter=route.radius>0?route.center:this.brainCenter.clone();
      const bundleBox=new T.Box3();
      for(const {fibers} of this.tractFibers.values())bundleBox.expandByObject(fibers);
      this.tractBounds=bundleBox.isEmpty()?null:bundleBox.getBoundingSphere(new T.Sphere());
      for(const visit of this.stageSegments.flat()){
        const box=boundsFor([...visit.ids,...visit.referenceIds]);
        visit.radius=box.isEmpty()?0:box.getBoundingSphere(new T.Sphere()).radius;
        box.expandByPoint(visit.from);
        visit.travelRadius=box.getBoundingSphere(new T.Sphere()).radius;
        const source=boundsFor(visit.originIds);
        visit.sourceRadius=source.isEmpty()?.075:source.getBoundingSphere(new T.Sphere()).radius;
      }
      const left=this.center('temporal_pole','left');
      const right=this.center('temporal_pole','right');
      if(left&&right){
        this.lateralAxis=right.clone().sub(left);
        this.lateralAxis.y=0;
        this.lateralAxis.normalize();
        this.bilateralAxis=new T.Vector3(-this.lateralAxis.z,.36,this.lateralAxis.x);
        if(this.bilateralAxis.z<0){
          this.bilateralAxis.x*=-1;
          this.bilateralAxis.z*=-1;
        }
        this.bilateralAxis.add(this.lateralAxis.clone().multiplyScalar(.24)).normalize();
      }
    }

    frame(position,radius,direction,multiplier=1){
      const camera=this.opts.camera;
      const halfFov=(camera.fov||40)*Math.PI/360;
      const angle=Math.atan(Math.tan(halfFov)*Math.min(1,camera.aspect||1));
      const distance=clamp(radius*multiplier/Math.sin(angle),.32,14.8);
      const target=position.clone();
      target.y-=distance*.068;
      return {target,position:target.clone().add(direction.clone().normalize().multiplyScalar(distance))};
    }

    detailFrame(visit,orbit=0){
      const T=this.THREE;
      const side=visit.side==='left'?1:-1;
      const favorMedial=['parahippocampal','entorhinal','middle_cingulate','precuneus'].includes(visit.part);
      const x=(favorMedial?-side:side)*1.02;
      const y=visit.part==='orbitofrontal'?-.62:favorMedial?.14:.28;
      const forward=new T.Vector3(x+orbit,y,1);
      const radius=Math.max(visit.radius||.10,.09);
      const margin=clamp(1.04+radius*.91,1.17,1.41);
      const zoom=margin*{close:1,medium:1.23,wide:1.53}[this.cameraDistance];
      return this.frame(visit.to,radius,forward,zoom);
    }

    blendFrames(first,last,amount){
      return {
        target:first.target.clone().lerp(last.target,amount),
        position:first.position.clone().lerp(last.position,amount)
      };
    }

    branchProgress(){
      return this.progress-DATA.BRANCH_STAGE;
    }

    updateCameraTarget(){
      if(!this.followCamera||this.manualCamera||!this.ready)return;
      const T=this.THREE;
      const state=this.guideState();if(!state)return;
      const {visit,local}=state;
      const side=visit.side==='left'?1:-1;
      const fullBrainAngle=new T.Vector3(side*1.36,.31,1);
      const frontal=this.bilateralAxis||new T.Vector3(.32,.30,1);
      const overview=this.frame(this.brainCenter,this.brainRadius,fullBrainAngle,1.16);
      if(this.showBrain||this.overview){
        const bundle=this.showTracts?this.tractBounds:null;
        const direction=bundle?new T.Vector3(side*1.05,.34,1):frontal;
        this.cameraGoal=this.showBrain?overview:bundle?
          this.frame(bundle.center,bundle.radius,direction,1.75):
          this.frame(this.routeCenter||this.brainCenter,this.routeRadius||this.brainRadius,frontal,1.18);
        return;
      }
      if(this.playing&&state.idx>=DATA.BRANCH_STAGE){
        const orbitofrontal=this.stageSegments[DATA.EXTENSION_STAGE][0];
        const start=orbitofrontal?this.detailFrame(orbitofrontal):overview;
        const spread=this.frame(this.routeCenter||this.brainCenter,this.routeRadius||this.brainRadius,frontal,1.22);
        this.cameraGoal=this.blendFrames(start,spread,ease(clamp(this.branchProgress()/.18,0,1)));
        return;
      }
      const drift=this.orbitCamera&&this.playing?.15*Math.sin((local-APPROACH_END)*Math.PI*2):0;
      const focus=this.detailFrame(visit,local>APPROACH_END?drift:0);
      if(local>=APPROACH_END){this.cameraGoal=focus;return;}
      const previous=visit.previous;
      const start=previous?this.detailFrame(previous):overview;
      if(!previous){
        const amount=ease(clamp((local-.06)/(APPROACH_END-.06),0,1));
        this.cameraGoal=this.blendFrames(start,focus,amount);
        return;
      }

      if(!visit.link){
        this.cameraGoal=this.blendFrames(start,focus,ease(local/APPROACH_END));
        return;
      }

      const crossing=visit.origin.side!==visit.side;
      const direction=crossing?frontal:new T.Vector3(side*.65,.34,1);
      const source=visit.sourceVisit?this.detailFrame(visit.sourceVisit):
        this.frame(visit.from,Math.max(.12,visit.sourceRadius||.15),direction,1.32);
      if(local<SOURCE_HOLD){
        this.cameraGoal=this.blendFrames(start,source,ease(clamp(local/SOURCE_ARRIVAL,0,1)));
        return;
      }
      const radius=Math.max(visit.radius||.09,visit.travelRadius||.14);
      const waypoint=visit.from.clone().lerp(visit.to,.5);
      const travel=this.frame(waypoint,radius,direction,crossing?1.58:1.27);
      const midpoint=(SOURCE_HOLD+APPROACH_END)*.5;
      if(local<midpoint){
        this.cameraGoal=this.blendFrames(source,travel,ease((local-SOURCE_HOLD)/(midpoint-SOURCE_HOLD)));
      }else{
        this.cameraGoal=this.blendFrames(travel,focus,ease((local-midpoint)/(APPROACH_END-midpoint)));
      }
    }

    buildTractFibers(){
      const T=this.THREE;
      if(!root.CrisisTractFibers||!T.ShaderMaterial)return;
      for(const [id,stage] of this.tractStage){
        const strands=root.CrisisTractFibers[id];
        const anatomicalMesh=this.meshesFor(id)[0];
        if(!strands?.length||!anatomicalMesh)continue;

        // Align each seed to its closest neighbours along the full bundle.
        // Interpolated trajectories add visual detail within the modelled fascicle.
        const seeds=strands.map(strand=>Array.from({length:strand.length/3},(_,i)=>
          new T.Vector3().fromArray(strand,i*3).applyMatrix4(anatomicalMesh.matrixWorld)));
        const samples=seeds[0].length;
        const palette=TRACT_COLORS[stage].map(hex=>new T.Color(hex));
        const strandCount=seeds.length*(seeds.length>1?STRANDS_PER_SEED:1);
        const vertexCount=strandCount*samples*2;
        const positions=new Float32Array(vertexCount*3);
        const tangents=new Float32Array(vertexCount*3);
        const colors=new Float32Array(vertexCount*3);
        const edges=new Int8Array(vertexCount);
        const widths=new Float32Array(vertexCount);
        const indices=new Uint32Array(strandCount*(samples-1)*6);
        const point=new T.Vector3(), previous=new T.Vector3(), next=new T.Vector3();
        let vertex=0, index=0;
        seeds.forEach((seed,i)=>{
          const neighbours=seeds.flatMap((other,j)=>{
            if(i===j)return [];
            let forward=0,backward=0;
            for(let k=0;k<samples;k+=4){
              forward+=seed[k].distanceToSquared(other[k]);
              backward+=seed[k].distanceToSquared(other[samples-1-k]);
            }
            return [{points:other,reversed:backward<forward,distance:Math.min(forward,backward)}];
          }).sort((a,b)=>a.distance-b.distance).slice(0,4);
          const copies=neighbours.length?STRANDS_PER_SEED:1;
          for(let copy=0;copy<copies;copy++){
            const neighbour=neighbours.length?neighbours[copy%neighbours.length]:null;
            const fraction=copy===0?0:.10+.39*(((i*73+copy*31)%101)/100);
            const tint=palette[(i+copy*3)%palette.length];
            const width=.0017+((i*3+copy)%7)*.00019;
            const interpolate=(out,j)=>{
              out.copy(seed[j]);
              if(neighbour&&fraction)out.lerp(neighbour.points[neighbour.reversed?samples-1-j:j],fraction);
            };
            for(let j=0;j<samples;j++){
              interpolate(point,j);
              interpolate(previous,Math.max(j-1,0));
              interpolate(next,Math.min(j+1,samples-1));
              next.sub(previous).normalize();
              if(j<samples-1){
                indices.set([vertex,vertex+1,vertex+2,vertex+1,vertex+3,vertex+2],index);
                index+=6;
              }
              for(const edge of [-1,1]){
                const offset=vertex*3;
                point.toArray(positions,offset);
                next.toArray(tangents,offset);
                tint.toArray(colors,offset);
                edges[vertex]=edge;
                widths[vertex]=width*(.45+.55*Math.sin(Math.PI*j/(samples-1))**.4);
                vertex++;
              }
            }
          }
        });
        const geometry=new T.BufferGeometry();
        for(const [name,values,size] of [
          ['position',positions,3],['aTangent',tangents,3],['aTint',colors,3],
          ['aEdge',edges,1],['aWidth',widths,1]
        ])geometry.setAttribute(name,new T.BufferAttribute(values,size));
        geometry.setIndex(new T.BufferAttribute(indices,1));
        const material=new T.ShaderMaterial({
          vertexShader:FIBER_VERTEX_SHADER,fragmentShader:FIBER_FRAGMENT_SHADER,
          transparent:true,depthTest:false,depthWrite:false,side:T.DoubleSide,toneMapped:false
        });
        const fibers=new T.Mesh(geometry,material);
        fibers.renderOrder=41;
        fibers.visible=false;
        this.overlay.add(fibers);
        this.tractFibers.set(id,{fibers,strandCount});
      }
    }

    updateTractFibers(){
      const show=this.active&&this.showTracts&&this.sceneView==='overview';
      for(const {fibers} of this.tractFibers.values())fibers.visible=show;
    }

    updateSceneView(state){
      this.sceneIds.clear();
      this.referenceIds.clear();
      this.branchSourceIds.clear();
      this.visitedIds.clear();
      this.branchActivation.clear();
      this.visitedAnchors.clear();
      if(!state||this.showBrain||(this.progress===0&&!this.playing&&!this.overview)){
        this.sceneView='brain';
        return;
      }
      if(this.overview){
        this.sceneView='overview';
        for(const id of this.meshStage.keys())this.sceneIds.add(id);
        return;
      }
      const {visit}=state;
      if(state.idx>=DATA.BRANCH_STAGE){
        const progress=this.branchProgress();
        for(const step of DATA.STEPS.slice(DATA.BRANCH_STAGE).keys()){
          const start=.10+step*.075;
          const opacity=ease(clamp((progress-start)/(BRANCH_REVEAL_END-start),0,1));
          if(!opacity)continue;
          for(const id of this.stageIds[DATA.BRANCH_STAGE+step]){
            this.sceneIds.add(id);
            this.branchActivation.set(id,opacity);
          }
        }
      }
      for(let prior=visit.previous;prior;prior=prior.previous){
        this.visitedAnchors.add(prior.part+':'+prior.side);
        for(const id of prior.ids){
          this.visitedIds.add(id);
          this.sceneIds.add(id);
        }
      }
      this.sceneView=state.idx>0&&state.local<APPROACH_END?'travel':'detail';
      const onset=visit.origin?APPROACH_END-.13:.03;
      this.activationOpacity=ease(clamp((state.local-onset)/(APPROACH_END-onset),0,1));
      if(visit.origin&&state.local<APPROACH_END){
        for(const id of visit.originIds)this.branchSourceIds.add(id);
      }
      // Keep the outline legible from the opening wide shot, then reduce
      // overlapping surfaces as the camera enters the temporal region.
      this.contextOpacity=state.idx===0?.065-.033*this.activationOpacity:.032;
      for(const id of visit.ids)this.sceneIds.add(id);
      for(const id of visit.referenceIds){
        this.sceneIds.add(id);
        this.referenceIds.add(id);
      }
      if(this.sceneView==='travel'){
        for(const id of visit.originIds)this.sceneIds.add(id);
      }
    }

    updateGuideCaption(state){
      if(!state)return;
      const stop=state.visit;
      this.focusPart=stop.part;this.focusSide=stop.side;
      this.focusIds=new Set(stop.ids);
      this.focusCaption=stop.name;
      const on=$('crisisFocusCaption');
      const showingBrain=this.sceneView==='brain';
      const phase=originPhase(state);
      if(on){
        on.classList.toggle('hidden',!this.active);
        on.dataset.phase=this.overview||showingBrain?'overview':phase;
      }
      const extending=this.playing&&state.idx>=DATA.BRANCH_STAGE;
      const showFibers=this.overview&&this.showTracts&&!showingBrain;
      setText('crisisFocusStep',this.overview?'Cierre de la animación':extending?'Extensión de red':
        `Etapa ${state.idx+1} de ${DATA.STEPS.length} · ${state.visitIndex+1}/${state.stops.length}`);
      const origin=stop.origin;
      const link=stop.link?.edge;
      const sourceName=origin?(link.sourceLabel||this.labelFor(origin.part))+' '+sideName(origin.side):'';
      const destination=stop.name+' '+sideName(stop.side);
      const title=origin?`${sourceName} → ${destination}`:destination;
      setText('crisisFocusName',this.overview?(showFibers?'Fascículo uncinado y fórnix':'Recorrido completo'):
        extending?'Circuito talámico, ínsula, cíngulo y precúneo':title);
      const hemisphere=side=>side==='left'?'izquierdo':'derecho';
      const phases={
        source:state.idx<DATA.CROSSING_STAGE?'Región de partida':state.local<SOURCE_ARRIVAL?'Volviendo al origen':'Origen de la rama',
        travel:state.idx===DATA.CROSSING_STAGE&&state.visitIndex===0?'Cruce interhemisférico':link?.kind==='network'?'Cambio de región':'En trayecto',
        arrival:origin?'Llegada al destino':'Región de inicio'
      };
      setText('crisisFocusSide',showingBrain?'Vista de orientación':this.overview?(showFibers?'Turquesa · uncinado / Violeta · fórnix':'Selecciona una etapa para revisarla'):
        extending?'Activaciones superpuestas':
        `${phases[phase]} · hemisferio ${hemisphere(phase==='source'?origin.side:stop.side)}`);
      let explanation='Foco de inicio del modelo.';
      if(link){
        explanation=link.kind==='network'?link.label+' · vía indeterminada':link.label;
        if(link.kind==='tract')explanation+=' · vía anatómica ilustrada';
        if(link.kind==='local')explanation+=' · esquema local';
      }else if(state.idx>0)explanation='Región adicional · vía de llegada indeterminada';
      if(this.sceneView==='brain')explanation='Vista de orientación.';
      if(extending)explanation='Selecciona una etapa para explorar su rama de cerca.';
      else if(state.idx===DATA.EXTENSION_STAGE&&state.local>=APPROACH_END)explanation+=' · Comienza la extensión de red.';
      setText('crisisFocusNarration',this.overview?(showFibers?'Fibras ilustrativas sobre la anatomía del atlas.':''):explanation);
      this.updateAnatomy(stop);
      this.updateEvidence(state,title);
      this.updateStopButtons(state);
    }

    updateAnatomy(stop){
      const card=$('crisisAnatomy');
      if(!card)return;
      const facts=root.AtlasAnatomy.groups[stop.part];
      card.hidden=this.overview||!facts;
      if(card.hidden)return;
      const selection=stop.part+':'+stop.side;
      if(card.dataset.selection===selection)return;
      card.dataset.selection=selection;
      setText('crisisAnatomyTitle',(facts.title||stop.name)+' · '+sideName(stop.side));
      setText('crisisAnatomyRegion',facts.region);
      setText('crisisAnatomyRelations',facts.relations);
      setText('crisisAnatomyFunction',facts.function);
      setText('crisisAnatomyLimits',facts.limits);
    }

    updateEvidence(state,title){
      const edge=state.visit.link?.edge;
      const kind=edge?.kind;
      let evidence='Inicio hipocampal elegido para este modelo de esclerosis hipocampal.';
      if(state.idx>0)evidence='La secuencia indica cuándo se muestra esta región. La vía de llegada queda indeterminada.';
      if(state.idx===DATA.STEPS.length-1)evidence='El cíngulo medio y el precúneo se muestran dentro de la extensión bilateral de la red. El modelo deja indeterminada su vía de reclutamiento.';
      if(kind==='local')evidence='Proyección anatómica conocida. La curva punteada ubica el tramo de forma esquemática.';
      if(kind==='tract')evidence='El trayecto anatómico ilustrativo del fascículo se presenta al cierre.';
      if(kind==='schematic')evidence='Relevo anatómico conocido. El punteado señala la conexión mamilotalámica de forma aproximada.';
      if(kind==='network'&&state.idx>=7)evidence='Las fuentes apoyan la participación de estas regiones en la red. El orden pertenece a la secuencia didáctica y la vía exacta queda indeterminada.';
      setText('crisisBranchTitle',this.overview?'Red completa':title);
      setText('crisisBranchEvidence',this.overview?'Selecciona una etapa para revisar su origen y su respaldo.':evidence);
      const list=$('crisisStageSources');
      if(!list)return;
      const key=this.overview?'overview':String(state.idx);
      if(list.dataset.stage===key)return;
      list.dataset.stage=key;
      const refs=this.overview?[]:DATA.STAGE_SOURCES[state.idx];
      list.replaceChildren(...refs.map(id=>{
        const source=DATA.SOURCES[id];
        const anchor=document.createElement('a');
        anchor.href=source.url;anchor.target='_blank';anchor.rel='noopener noreferrer';
        anchor.textContent=source.label;anchor.title=source.contribution;
        return anchor;
      }));
    }

    updateStopButtons(state){
      const list=$('crisisStops');
      if(!list)return;
      const key=`${state.idx}:${this.startSide}:${this.overview}`;
      if(this.stopKey!==key){
        this.stopKey=key;
        list.replaceChildren(...state.stops.map((stop,i)=>{
          const button=document.createElement('button');
          button.type='button';
          button.textContent=stop.name+(state.idx===8?` · ${sideName(stop.side)}`:'');
          button.addEventListener('click',()=>this.stepTo(state.idx,i));
          return button;
        }));
      }
      list.hidden=this.overview||state.stops.length<2;
      if(list.hidden)return;
      for(const [i,button] of [...list.children].entries()){
        if(i===state.visitIndex)button.setAttribute('aria-current','step');
        else button.removeAttribute('aria-current');
      }
    }

    buildActivationNodes(){
      const T=this.THREE;
      const attributesCache=new WeakMap();
      const size=32;
      const texels=new Uint8Array(size*size*4);
      for(let y=0;y<size;y++){
        for(let x=0;x<size;x++){
          const distance=Math.hypot((x+.5)/size*2-1,(y+.5)/size*2-1);
          const offset=(y*size+x)*4;
          texels.set([255,255,255,Math.round(255*(1-ease(clamp((distance-.48)/.52,0,1))))],offset);
        }
      }
      this.nodeTexture=new T.DataTexture(texels,size,size,T.RGBAFormat);
      this.nodeTexture.magFilter=this.nodeTexture.minFilter=T.LinearFilter;
      this.nodeTexture.needsUpdate=true;
      const materialFor=color=>new T.PointsMaterial({
        color,map:this.nodeTexture,size:2.5,sizeAttenuation:false,transparent:true,
        depthTest:true,depthWrite:false,toneMapped:false
      });
      for(const [stage,visits] of this.stageSegments.entries()){
        for(const visit of visits){
          const points=[];
          const point=new T.Vector3();
          const normal=new T.Vector3();
          for(const id of visit.ids){
            for(const mesh of this.meshesFor(id)){
              const attr=mesh.geometry?.attributes?.position;
              if(!attr?.count)continue;
              const count=Math.min(560,Math.ceil(Math.sqrt(attr.count)*11));
              let indices=attributesCache.get(attr);
              if(!indices){
                indices=Array.from({length:count},(_,i)=>Math.floor((i+.54)*attr.count/count));
                attributesCache.set(attr,indices);
              }
              const normals=mesh.geometry.attributes.normal;
              for(const index of indices){
                point.fromBufferAttribute(attr,index).applyMatrix4(mesh.matrixWorld);
                if(normals){
                  normal.fromBufferAttribute(normals,index).transformDirection(mesh.matrixWorld);
                  point.addScaledVector(normal,.0012);
                }
                points.push(point.clone());
              }
            }
          }
          if(!points.length)continue;
          points.sort((a,b)=>a.distanceToSquared(visit.from)-b.distanceToSquared(visit.from));
          const geometry=new T.BufferGeometry();
          const coords=new Float32Array(points.length*3);
          points.forEach((node,i)=>node.toArray(coords,i*3));
          geometry.setAttribute('position',new T.BufferAttribute(coords,3));
          const nodes=new T.Points(geometry,materialFor(DATA.STEPS[stage].color));
          nodes.renderOrder=38;
          nodes.visible=false;
          visit.nodes=nodes;
          visit.nodeCount=points.length;
          this.overlay.add(nodes);
        }
      }
    }

    updateNodes(state){
      const activation=state?ease(clamp((state.local-REVEAL)/(.75-REVEAL),0,1)):0;
      for(const [stage,visits] of this.stageSegments.entries()){
        for(const [i,visit] of visits.entries()){
          if(!visit.nodes)continue;
          const current=stage===state?.idx&&i===state?.visitIndex;
          const spread=stage>=DATA.BRANCH_STAGE?this.branchActivation.get(visit.ids[0])||0:0;
          const reveal=Math.max(current&&this.sceneView==='detail'?activation:0,spread);
          visit.nodes.visible=this.active&&this.sceneView!=='brain'&&reveal>0;
          if(!visit.nodes.visible)continue;
          visit.nodes.geometry.setDrawRange(0,Math.ceil(visit.nodeCount*reveal));
          visit.nodes.material.opacity=.46;
        }
      }
      return activation;
    }
    stageDuration(idx){
      return idx>=DATA.BRANCH_STAGE?2.6:VISIT_SECONDS[idx]*(this.stageSegments[idx]?.length||1);
    }

    clearGeometry() {
      this.tractFibers.clear();
      this.edgeVisuals=[];this.proxyMap={};this.labels=[];this.stageSegments=[];this.stopKey='';
      while(this.overlay.children.length){
        const m=this.overlay.children[0];this.overlay.remove(m);
        m.geometry?.dispose();m.material?.dispose();
      }
      this.nodeTexture?.dispose();
      this.nodeTexture=null;
    }
    currentIndex() {return clamp(Math.floor(this.progress),0,DATA.STEPS.length-1);}
    activation(id) {
      const idx=this.meshStage.get(id);if(idx==null)return null;
      return idx===this.currentIndex()?'current':idx<this.currentIndex()?'past':'future';
    }
    isOuter(a){
      return a&&(a.cat==='mri_cortex'||OUTER_REGIONS.has(a.cat)||(!this.cortexMeshes.size&&a.cat==='cortex'));
    }
    visible(mesh) {
      const a=mesh.userData.__atlas;if(!a||!this.ready)return false;
      if(this.sceneView==='brain')return this.isOuter(a);
      if(this.tractStage.has(a.id))return this.showTracts&&this.sceneView==='overview'&&!this.tractFibers.has(a.id);
      const outline=this.sceneView!=='overview'&&this.isOuter(a);
      return this.sceneIds.has(a.id)||outline;
    }
    style(mesh) {
      const a=mesh.userData.__atlas;if(!a)return;
      const mat=mesh.material;
      const tract=this.tractStage.get(a.id);
      const stage=this.meshStage.get(a.id);
      const onRoute=this.sceneIds.has(a.id);
      const background=this.sceneView!=='brain'&&!onRoute&&tract==null;
      const spread=this.branchActivation.get(a.id);
      const activeRegion=onRoute&&this.focusIds.has(a.id)&&!this.overview;
      const reference=this.referenceIds.has(a.id);
      const visited=this.visitedIds.has(a.id);
      const branchSource=this.branchSourceIds.has(a.id);
      let opacity=1,color=a.base;
      if(this.sceneView!=='brain'){
        if(background){
          opacity=this.contextOpacity;
          color=this.referenceColor;
        }else if(tract!=null){
          color=this.stageColors[tract];
        }else if(spread!==undefined){
          color=this.stageColors[stage]||a.base;
          opacity=.12+.68*spread;
          if(activeRegion)opacity=Math.max(opacity,.10+.90*this.activationOpacity);
        }else if(branchSource&&!activeRegion){
          color=this.stageColors[stage]||a.base;
          opacity=.86-.33*this.activationOpacity;
        }else if(visited&&!activeRegion){
          color=this.stageColors[stage]||a.base;
          opacity=this.sceneView==='travel'?.60:.45;
        }else if(reference||this.sceneView==='travel'&&!activeRegion){
          color=this.referenceColor;
          opacity=reference?.70:.48;
        }else if(stage!=null){
          color=this.stageColors[stage];
          if(activeRegion)opacity=.10+.90*this.activationOpacity;
          else if(this.overview&&this.showTracts)opacity=.36;
        }
      }
      mat.color.copy(color);
      mat.emissive.copy(color);
      mat.emissiveIntensity=activeRegion?.06+.24*this.activationOpacity:branchSource?.36:.035;
      mat.opacity=opacity;mat.transparent=opacity<.999;mat.depthWrite=!mat.transparent;mat.depthTest=true;
      // Draw the transparent cortical shell after other opaque geometry, and the
      // current target after the shell while the target is still becoming opaque.
      mesh.renderOrder=background?3:activeRegion||branchSource?6:visited||spread!==undefined?4:0;
    }
    visualize(){
      if(!this.ready)return;
      const guide=this.guideState();
      this.updateSceneView(guide);
      this.updateGuideCaption(guide);
      this.recruitment=this.updateNodes(guide);
      this.updateTractFibers();
      Object.entries(this.proxyMap).forEach(([key,p])=>{
        const [part,side]=key.split(':');
        const current=this.focusSide===side&&this.focusPart===part;
        const visited=this.visitedAnchors.has(key);
        p.sphere.visible=p.ring.visible=this.active&&(visited||current&&this.activationOpacity>.15)&&!this.overview&&this.sceneView!=='brain';
        const scale=current?.80+.28*this.recruitment:.60;
        p.sphere.scale?.setScalar(scale);
        p.ring.scale?.setScalar(scale);
      });
      this.updateBranchMarkers(guide);
      if(this.active){this.updateCameraTarget();this.opts.refresh();}
    }
    updateBranchMarkers(guide){
      const visit=guide?.visit;
      const link=visit?.link;
      const enabled=this.active&&this.sceneView==='travel'&&!!link&&
        !(this.playing&&guide.idx>=DATA.BRANCH_STAGE);
      for(const visual of this.edgeVisuals){
        if(visual.dashes)visual.dashes.visible=enabled&&this.showConnections&&visual===link&&
          guide.local>=SOURCE_HOLD&&guide.local<APPROACH_END;
      }
      this.branchPulse.visible=false;
      this.sourceRing.visible=enabled&&guide.local>=SOURCE_ARRIVAL&&guide.local<SOURCE_HOLD+.12;
      if(this.sourceRing.visible){
        this.sourceRing.position.copy(visit.from);
        const radius=link.edge.anchorPart ? .085 : (visit.sourceRadius||.12);
        this.sourceRing.scale?.setScalar(clamp(radius*.62,.066,.16));
        this.sourceRing.material.opacity=1-ease(clamp((guide.local-SOURCE_HOLD)/.12,0,1));
      }
      if(!enabled||guide.local<SOURCE_HOLD||guide.local>=APPROACH_END)return;
      const kind=link.edge.kind;
      const path=this.showConnections&&(kind==='local'||kind==='schematic')?link.curve:null;
      if(!path)return;
      const amount=ease(clamp((guide.local-SOURCE_HOLD)/(APPROACH_END-SOURCE_HOLD),0,1));
      this.branchPulse.visible=true;
      this.branchPulse.position.copy(path.getPointAt(amount));
    }

    changeSide(side){
      if(side===this.startSide)return;
      this.startSide=side;
      this.showTracts=true;
      this.showBrain=false;
      this.manualCamera=false;
      this.cameraGoal=null;
      this.playing=false;
      this.progress=0;
      this.overview=false;
      if(this.ready)this.build();
      else this.updateUI();
    }
    seek(stepProgress){
      this.progress=clamp(Number(stepProgress)||0,0,DATA.STEPS.length);
      if(this.overview&&this.progress<DATA.STEPS.length)this.showTracts=true;
      this.overview=this.progress>=DATA.STEPS.length;
      if(this.overview)this.playing=false;
      this.visualize();
      this.updateUI();
    }
    stepTo(idx,visitIndex=0){
      if(!this.ready)return;
      this.playing=false;
      this.showBrain=false;
      const stage=clamp(idx,0,DATA.STEPS.length-1);
      const count=this.stageSegments[stage]?.length||1;
      this.manualCamera=false;
      this.seek(stage+(clamp(visitIndex,0,count-1)+.81)/count);
    }

    showOverview(){
      if(!this.ready)return;
      this.playing=false;
      this.showBrain=false;
      this.manualCamera=false;
      this.seek(DATA.STEPS.length);
      this.recenter();
    }

    play(){
      if(!this.ready)return;
      if(this.overview){this.progress=0;this.overview=false;this.showTracts=true;this.manualCamera=false;this.cameraGoal=null;}
      const returningFromBrain=this.showBrain;
      this.showBrain=false;
      this.playing=!this.playing;
      if(returningFromBrain)this.recenter();
      this.visualize();this.updateUI();
    }
    enter(){
      this.active=true;
      this.manualCamera=false;
      if(this.originalAutoRotate===null) this.originalAutoRotate=this.opts.controls?.autoRotate??false;
      if(this.opts.controls){
        this.opts.controls.autoRotate=false;
        if(this.originalMinDistance===null)this.originalMinDistance=this.opts.controls.minDistance??2.2;
        this.opts.controls.minDistance=.19;
      }
      if(!this.ready&&this.opts.isModelReady())this.build();
      this.overlay.visible=true;
      this.cortexOverlay.visible=this.ready;
      this.visualize();this.updateUI();
    }
    leave(){
      this.active=false;this.playing=false;this.overlay.visible=false;this.cortexOverlay.visible=false;this.cameraGoal=null;this.cameraInput=false;
      if(this.opts.controls&&this.originalAutoRotate!==null)this.opts.controls.autoRotate=this.originalAutoRotate;
      this.originalAutoRotate=null;
      if(this.opts.controls&&this.originalMinDistance!==null)this.opts.controls.minDistance=this.originalMinDistance;
      this.originalMinDistance=null;
      if($('crisisFocusCaption'))$('crisisFocusCaption').classList.add('hidden');
      if($('crisisHemisphereMarkers'))$('crisisHemisphereMarkers').classList.add('hidden');
      if($('crisisOverviewMarkers'))$('crisisOverviewMarkers').classList.add('hidden');
      if($('crisisRoutePanel'))$('crisisRoutePanel').classList.add('hidden');
      this.updateUI();
    }
    update(dt){
      if(!this.active)return;
      this.overlay.visible=true;
      this.tick+=dt;
      if(this.playing){
        const next=Math.min(DATA.STEPS.length,this.progress+Math.min(dt,.10)*this.speed/this.stageDuration(this.currentIndex()));
        this.seek(next);
      }
      if(!this.cameraInput&&this.cameraGoal&&this.opts.controls){
        const tracking=this.playing?10*Math.max(1,this.speed):7;
        const smoothing=1-Math.exp(-Math.min(dt,.10)*tracking);
        this.opts.controls.target.lerp(this.cameraGoal.target,smoothing);
        this.opts.camera.position.lerp(this.cameraGoal.position,smoothing);
        this.opts.camera.lookAt?.(this.opts.controls.target);
        if(!this.playing&&this.opts.camera.position.clone().sub(this.cameraGoal.position).length()<.002&&this.opts.controls.target.clone().sub(this.cameraGoal.target).length()<.002)this.cameraGoal=null;
      }
      this.updateScreenMarkers();
      Object.values(this.proxyMap).forEach(p=>p.ring.quaternion.copy(this.opts.camera.quaternion));
      this.sourceRing?.quaternion.copy(this.opts.camera.quaternion);
    }
    updateScreenMarkers(){
      const hemisphereMarkers=$('crisisHemisphereMarkers');
      const overviewMarkers=$('crisisOverviewMarkers');
      if(!hemisphereMarkers||!overviewMarkers||!this.ready)return;
      const state=this.guideState();
      const crossing=this.active&&this.sceneView==='travel'&&state?.idx===DATA.CROSSING_STAGE&&state.visitIndex===0&&state.local>=SOURCE_HOLD+.12;
      hemisphereMarkers.classList.toggle('hidden',!crossing);
      const showOverviewMarkers=this.active&&this.sceneView==='overview'&&!this.showTracts;
      overviewMarkers.classList.toggle('hidden',!showOverviewMarkers);
      if(!crossing&&!showOverviewMarkers)return;
      const camera=this.opts.camera;
      const viewport=$('viewport');
      if(!viewport?.clientWidth||!viewport.clientHeight)return;
      camera.updateMatrixWorld();
      const position=(element,anchor,offset)=>{
        const p=anchor?.clone().project(camera);
        element.hidden=!p||p.z<=-1||p.z>=1;
        if(element.hidden)return;
        const w=viewport.clientWidth,h=viewport.clientHeight;
        const x=clamp((.5+p.x*.5)*w+offset[0],20,w-20);
        const y=clamp((.5-p.y*.5)*h+offset[1],62,Math.max(62,h-148));
        element.style.left=x+'px';
        element.style.top=y+'px';
      };
      if(crossing){
        const visit=state.visit;
        for(const element of hemisphereMarkers.children){
          const origin=element.dataset.side===this.startSide;
          element.textContent=sideName(element.dataset.side)+(origin?' · origen':' · destino');
          position(element,origin?visit.from:visit.to,[0,-40]);
        }
      }else{
        // Screen-space placement keeps the numbered markers accessible and legible.
        const placed=[];
        const offsets=[[0,0],[-33,0],[35,0],[0,-29],[0,29],[-29,-27],[29,-27],[-29,27],[29,27],
          [0,-55],[55,0],[-55,0],[0,55],[-54,-54],[54,-54],[-54,54],[54,54],[0,-84],[0,84]];
        for(const [i,button] of this.markerButtons.entries()){
          const anchor=this.stageSegments[i]?.[0]?.to;
          if(!anchor){button.hidden=true;continue;}
          for(const offset of offsets){
            position(button,anchor,offset);
            const x=parseFloat(button.style.left),y=parseFloat(button.style.top);
            if(button.hidden||placed.every(p=>Math.hypot(p.x-x,p.y-y)>=28))break;
          }
          if(!button.hidden)placed.push({x:parseFloat(button.style.left),y:parseFloat(button.style.top)});
        }
      }
    }

    releaseCamera(){
      this.manualCamera=true;
      this.cameraGoal=null;
    }

    recenter(){
      this.manualCamera=false;
      this.cameraGoal=null;
      const follow=this.followCamera;
      this.followCamera=true;
      this.updateCameraTarget();
      this.followCamera=follow;
    }

    bindUI(){
      const click=(id,fn)=>{const e=$(id);if(e)e.addEventListener('click',fn);};
      click('crisisPlay',()=>this.play());
      click('crisisViewportPlay',()=>this.play());
      click('crisisReset',()=>{this.playing=false;this.showBrain=false;this.manualCamera=false;this.seek(0);this.recenter();});
      click('crisisOverview',()=>this.showOverview());
      click('crisisRecenter',()=>this.recenter());
      click('crisisShowOrigin',()=>{
        const state=this.guideState();
        if(!this.ready||this.overview||!state?.visit.origin)return;
        this.playing=false;
        this.showBrain=false;
        const local=(SOURCE_ARRIVAL+SOURCE_HOLD)*.5;
        this.seek(state.idx+(state.visitIndex+local)/state.stops.length);
        this.recenter();
      });
      click('crisisBrainView',()=>{
        this.showBrain=!this.showBrain;
        this.playing=false;
        this.recenter();
        this.visualize();
        this.updateUI();
      });
      const controls=this.opts.controls;
      controls?.addEventListener?.('start',()=>{
        if(!this.active)return;
        this.cameraInput=true;
        this.releaseCamera();
      });
      controls?.addEventListener?.('end',()=>{this.cameraInput=false;});
      click('crisisPrev',()=>this.stepTo(this.currentIndex()-1));
      click('crisisNext',()=>this.stepTo(this.currentIndex()+1));
      const seek=$('crisisTimeline');if(seek)seek.addEventListener('input',e=>{this.playing=false;this.showBrain=false;this.manualCamera=false;this.seek(Number(e.target.value)/100);});
      const speed=$('crisisSpeed');if(speed)speed.addEventListener('change',e=>{this.speed=Number(e.target.value)||1;this.updateUI();});
      click('crisisViewportTracts',()=>{
        this.showTracts=!this.showTracts;
        this.visualize();
        this.updateUI();
      });
      const side=$('crisisStartSide');if(side)side.addEventListener('change',e=>this.changeSide(e.target.value));
      const cameraDistance=$('crisisCameraDistance');
      if(cameraDistance)cameraDistance.addEventListener('change',e=>{this.cameraDistance=e.target.value;this.updateCameraTarget();});
      const orbit=$('crisisOrbit');
      if(orbit)orbit.addEventListener('change',e=>{this.orbitCamera=!!e.target.checked;});
      for(const [id,prop] of [['crisisShowConnections','showConnections'],['crisisFollowCamera','followCamera']]){
        const el=$(id);if(el)el.addEventListener('change',e=>{
          this[prop]=e.target.checked;
          if(prop==='followCamera'){this.cameraGoal=null;this.manualCamera=false;}
          this.visualize();
          this.updateUI();
        });
      }
      const list=$('crisisSteps');if(list){
        DATA.STEPS.forEach((s,i)=>{
          const b=document.createElement('button');b.type='button';b.className='crisis-step';b.dataset.crisisStep=String(i);
          const num=document.createElement('span');num.textContent=String(i+1);
          const name=document.createElement('b');name.textContent=s.short;
          b.append(num,name);b.addEventListener('click',()=>this.stepTo(i));list.appendChild(b);
        });
      }
      const route=$('crisisRouteTimeline');
      const markers=$('crisisOverviewMarkers');
      if(route&&markers){
        DATA.STEPS.forEach((step,i)=>{
          const routeButton=document.createElement('button');
          routeButton.type='button';
          routeButton.dataset.routeStage=String(i);
          routeButton.style.setProperty('--stage-color','#'+step.color.toString(16).padStart(6,'0'));
          const number=document.createElement('span');
          number.textContent=String(i+1);
          routeButton.append(number,document.createTextNode(step.parts[0][0]==='insula'?'Ínsula':step.short));
          routeButton.addEventListener('click',()=>this.stepTo(i));
          route.appendChild(routeButton);
          this.routeButtons.push(routeButton);
          const marker=document.createElement('button');
          marker.type='button';
          marker.textContent=String(i+1);
          marker.title=step.parts[0][0]==='insula'?'Ínsula':step.title;
          marker.setAttribute('aria-label',`Etapa ${i+1}: ${marker.title}`);
          marker.style.setProperty('--stage-color','#'+step.color.toString(16).padStart(6,'0'));
          marker.addEventListener('click',()=>this.stepTo(i));
          markers.appendChild(marker);
          this.markerButtons.push(marker);
        });
      }
      this.updateUI();
    }
    updateUI(){
      const ix=this.currentIndex(),s=DATA.STEPS[ix];
      const playLabel=this.playing?'❚❚ Pausar':this.overview?'▶ Repetir':'▶ Reproducir';
      setText('crisisPlay',playLabel);
      setText('crisisViewportPlay',playLabel);
      const tractsButton=$('crisisViewportTracts');
      const pressed=String(this.showTracts);
      if(tractsButton)tractsButton.hidden=this.sceneView!=='overview';
      if(tractsButton&&tractsButton.getAttribute('aria-pressed')!==pressed){
        tractsButton.setAttribute('aria-pressed',pressed);
      }
      const panel=$('crisisRoutePanel');
      if(panel)panel.classList.toggle('hidden',!this.active);
      const originButton=$('crisisShowOrigin');
      if(originButton){
        const available=this.ready&&!this.overview&&!this.showBrain&&!!this.guideState()?.visit.origin;
        if(originButton.hidden===available)originButton.hidden=!available;
      }
      const overviewButton=$('crisisOverview');
      if(overviewButton)overviewButton.setAttribute('aria-pressed',String(this.overview));
      for(const [i,button] of this.routeButtons.entries()){
        button.classList.toggle('passed',this.overview||i<ix);
        if(!this.overview&&i===ix){
          if(button.getAttribute('aria-current')!=='step')button.setAttribute('aria-current','step');
        }else if(button.hasAttribute('aria-current'))button.removeAttribute('aria-current');
      }
      const timelineKey=`${this.active}:${this.overview}:${ix}`;
      if(timelineKey!==this.timelineKey){
        this.timelineKey=timelineKey;
        const current=this.routeButtons[ix];
        const timeline=$('crisisRouteTimeline');
        if(this.active&&!this.overview&&current&&timeline){
          const bounds=timeline.getBoundingClientRect();
          const buttonBounds=current.getBoundingClientRect();
          if(buttonBounds.right>bounds.right||buttonBounds.left<bounds.left){
            timeline.scrollLeft+=(buttonBounds.left+buttonBounds.right-bounds.left-bounds.right)/2;
          }
        }
      }
      const views={brain:'Cerebro completo',travel:'En tránsito entre regiones',detail:'Estructura en activación',overview:'Regiones del recorrido'};
      setText('crisisSceneBadge',views[this.sceneView]);
      setText('crisisBrainView',this.showBrain?'Volver a la ruta':'Ver cerebro completo');
      $('crisisBrainView')?.setAttribute('aria-pressed',String(this.showBrain));
      setText('crisisStageNumber','Etapa '+(ix+1)+' de '+DATA.STEPS.length);
      const part=s.parts[0][0];
      const mriDetails=this.idsFor(part,this.startSide).some(id=>this.cortexMeshes.has(id))?MRI_DETAILS[part]:null;
      setText('crisisStageTitle',this.overview?'Cierre de la ruta':mriDetails&&part==='insula'?'Ínsula':s.title);
      setText('crisisStageDescription',this.overview?'Los fascículos se muestran sobre el recorrido completo.':mriDetails?.description||s.description);
      setText('crisisStageEvidence',mriDetails?.evidence||s.evidence);
      setText('crisisCurrentLabel',mriDetails&&part==='insula'?'Ínsula':s.short);
      setText('crisisTimeText',Math.round(this.progress/DATA.STEPS.length*100)+' % · tiempo ilustrativo');
      setText('crisisSideReadout','Inicio '+(this.startSide==='left'?'izquierdo':'derecho'));
      if($('crisisTimeline'))$('crisisTimeline').value=String(Math.round(this.progress*100));
      if($('crisisStartSide'))$('crisisStartSide').value=this.startSide;
      document.querySelectorAll('[data-crisis-step]').forEach(b=>{
        const i=Number(b.dataset.crisisStep);b.classList.toggle('current',i===ix);b.classList.toggle('passed',i<ix);
        b.setAttribute('aria-current',String(i===ix?'step':'false'));
      });
      for(const id of ['crisisPlay','crisisViewportPlay','crisisBrainView','crisisOverview']){
        const button=$(id);if(button)button.disabled=!this.ready;
      }
      setText('crisisRunningStatus',this.modelFailed?'No se pudo cargar la corteza MRI':this.overview?'Recorrido completo':this.playing?'Animación en curso':this.ready?'En pausa':'Cargando corteza MRI');
    }
  }
  root.CrisisAnimation=CrisisAnimation;
})(window);
