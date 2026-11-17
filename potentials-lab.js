(() => {
  'use strict';

  const REST = -70;
  const THRESHOLD = -55;
  const END = 180;
  const STEP = .1;
  const PERIOD = 44;
  const COLORS = {A:'#ffd177', B:'#75dcfc', C:'#77e6bc', D:'#a9c9ff', I:'#d2abff'};
  const NAMES = {A:'Entrada excitatoria', B:'Neurona intermedia', C:'Receptora 1', D:'Receptora 2', I:'Entrada inhibitoria'};
  const TARGET_DELAYS = {C:15, D:19};
  const NS = 'http://www.w3.org/2000/svg';
  const $ = id => document.getElementById(id);
  const fmt = value => value.toLocaleString('es-CO',{maximumFractionDigits:1});

  function spike(age){
    const shape=[[0,THRESHOLD],[1.1,30],[3.3,-80],[6,REST]];
    const i=shape.findIndex(([t])=>age<t);
    if(i<=0)return REST;
    const [t0,v0]=shape[i-1], [t1,v1]=shape[i];
    return v0+(v1-v0)*(age-t0)/(t1-t0);
  }

  function response(age,amplitude,decay){
    if(age<0)return 0;
    const rise=2;
    return amplitude*(age<rise?age/rise:Math.exp(-(age-rise)/decay));
  }

  function inhibitionAt(changes,t){
    return changes.findLast(change=>change.time<=t)?.enabled??false;
  }

  function buildCircuit(changes){
    const aSpikes=[], scheduledInhibition=changes.filter(change=>change.enabled&&change.time>0).map(change=>change.time);
    for(let offset=0;offset<4*PERIOD;offset+=PERIOD){
      aSpikes.push(offset+5);
      const t=offset+8;
      if(inhibitionAt(changes,t))scheduledInhibition.push(t);
    }
    const iSpikes=[];
    for(const time of scheduledInhibition.sort((a,b)=>a-b)){
      if(time-(iSpikes.at(-1)??-Infinity)>=14)iSpikes.push(time);
    }
    const input=aSpikes.map(t=>t+14);
    const inhibitory=iSpikes.map(t=>t+7);
    const spikes={A:aSpikes,B:[],C:[],D:[],I:iSpikes};
    const samples={A:[],B:[],C:[],D:[]};
    // An illustrative threshold model with a voltage response and recovery after a spike.
    const signal=(key,t,drive)=>{
      const history=spikes[key];
      const last=history.at(-1)??-Infinity;
      if(t-last<6)return spike(t-last);
      if(t-last>=8&&drive>=THRESHOLD){
        history.push(t);
        return THRESHOLD;
      }
      return drive;
    };
    for(let i=0;i<=Math.round(END/STEP);i++){
      const t=i*STEP;
      const lastA=aSpikes.findLast(time=>time<=t)??-Infinity;
      samples.A.push(spike(t-lastA));
      const bDrive=REST+input.reduce((sum,time)=>sum+response(t-time,19,5),0)
        +inhibitory.reduce((sum,time)=>sum+response(t-time,-22,9),0);
      samples.B.push(signal('B',t,bDrive));
      for(const [key,delay] of Object.entries(TARGET_DELAYS)){
        const drive=REST+spikes.B.reduce((sum,time)=>sum+response(t-time-delay,18,5),0);
        samples[key].push(signal(key,t,drive));
      }
    }
    return {spikes,samples};
  }

  function svgElement(kind,attrs,text){
    const el=document.createElementNS(NS,kind);
    for(const [key,value] of Object.entries(attrs))el.setAttribute(key,value);
    if(text!==undefined)el.textContent=text;
    return el;
  }

  function gradient(defs,id,kind,attrs,stops){
    const element=svgElement(kind,{...attrs,id});
    for(const [offset,color] of stops)element.append(svgElement('stop',{offset,'stop-color':color}));
    defs.append(element);
  }

  function drawCircuit(svg){
    const defs=svgElement('defs',{});
    gradient(defs,'labSoma','radialGradient',{cx:'.29',cy:'.25',r:'.75'},[
      ['0%','#e2f9ff'],['34%','#90cadf'],['72%','#3a759a'],['100%','#203b58']
    ]);
    gradient(defs,'labInhibitorySoma','radialGradient',{cx:'.29',cy:'.25',r:'.75'},[
      ['0%','#f7e8ff'],['35%','#b694d0'],['73%','#734f95'],['100%','#3d2d58']
    ]);
    gradient(defs,'labSheath','linearGradient',{x1:'0',y1:'0',x2:'0',y2:'1'},[
      ['0%','#c6e4f5'],['38%','#6299bd'],['100%','#233e5d']
    ]);
    svg.append(defs);
    const axons={
      AB:{d:'M123 127C176 127 222 132 268 128S301 126 323 127',color:COLORS.A},
      BC:{d:'M441 127C486 127 515 132 574 126C617 121 635 75 695 65S740 64 759 64',color:COLORS.C},
      BD:{d:'M441 127C486 127 515 132 574 126C621 126 643 179 696 190S738 190 759 190',color:COLORS.D},
      IB:{d:'M275 240C325 240 360 225 368 201Q372 185 378 171',color:COLORS.I}
    };
    const points={};
    for(const [key,{d,color}] of Object.entries(axons)){
      const group=svgElement('g',{class:'lab-route',style:`--route-color:${color}`});
      const path=svgElement('path',{d,stroke:color,class:'lab-axon'});
      group.append(path);
      svg.append(group);
      points[key]={group,path};
    }
    for(const [x,y,angle] of [[158,127,2],[206,130,1],[252,129,-4],[479,128,2],[529,129,-1],[618,103,-43],[668,73,-17],[618,146,42],[668,182,21],[303,238,-9],[346,223,-39]]){
      svg.append(svgElement('rect',{x:x-16,y:y-4,width:32,height:8,rx:4,transform:`rotate(${angle} ${x} ${y})`,class:'lab-sheath'}));
    }
    const endings={AB:[323,127,343,127],BC:[759,64,777,64],BD:[759,190,777,190],IB:[378,171,383,155]};
    for(const [key,[x,y,tx,ty]] of Object.entries(endings)){
      const {group,path}=points[key];
      const color=axons[key].color;
      const inhibitory=key==='IB';
      const angle=Math.atan2(ty-y,tx-x)*180/Math.PI;
      const terminal=svgElement('g',{transform:`translate(${x} ${y}) rotate(${angle})`});
      terminal.append(svgElement('path',{d:'M-10 0Q-3 -14 6 -10Q13 0 6 10Q-3 14 -10 0Z',class:'lab-terminal'}));
      terminal.append(svgElement('path',{d:inhibitory?'M17 -9V9':'M14 -5L19 0L14 5',stroke:color,class:'lab-direction'}));
      const signal=svgElement('circle',{r:5.4,fill:color,class:'lab-signal',visibility:'hidden'});
      group.append(terminal,signal);
      svg.append(group);
      points[key]={group,path,signal};
    }
    // A single axon leaves B and branches after the shared segment.
    const branches='M-14 -7C-29 -9 -42 -25 -60 -24M-46 -22Q-51 -33 -66 -38M-17 6Q-36 10 -53 19L-69 16M-49 19L-61 32M-7 -15Q-13 -34 -30 -42L-35 -52M-27 -40L-45 -43M5 -16Q14 -30 28 -37L34 -49M26 -36L43 -38M-9 15Q-17 27 -35 38L-45 49M-32 37L-51 39M9 15Q22 27 36 31L48 42M33 30L48 26';
    const neurons={};
    for(const [key,x,y,scale] of [['A',99,127,.86],['B',417,127,.95],['C',817,64,.64],['D',817,190,.64],['I',252,240,.70]]){
      const group=svgElement('g',{transform:`translate(${x} ${y}) scale(${scale})`,class:`lab-neuron${key==='I'?' is-inhibitory':''}`,style:`--node-color:${COLORS[key]}`});
      const dendrite={B:'M-16 0C-35 6 -49 -3 -77 0M-12 15Q-25 18 -36 30',C:'M-16 0Q-34 5 -56 0',D:'M-16 0Q-34 -5 -56 0'}[key]||'';
      group.append(svgElement('path',{d:branches+dendrite,class:'lab-arbor'}),
        svgElement('path',{d:'M-24 -1C-18 -7 -17 -19 -5 -21C6 -24 13 -15 20 -10C25 -6 26 4 19 9C12 16 8 23 -4 22C-14 21 -18 12 -23 7Z',class:'neuron-soma'}),
        svgElement('circle',{cx:-3,cy:-1,r:7.5,class:'neuron-nucleus'}),
        svgElement('circle',{cx:-5,cy:-3,r:2,class:'neuron-nucleolus'}));
      svg.append(group);
      const labelY = key==='C'?18:key==='D'?146:key==='I'?292:55;
      svg.append(svgElement('text',{x,y:labelY,'text-anchor':'middle',class:'lab-diagram-label'},`${key} · ${NAMES[key]}`));
      neurons[key]=group;
    }
    return {points,neurons};
  }

  function drawDetail(svg){
    const defs=svgElement('defs',{});
    gradient(defs,'labMembrane','linearGradient',{x1:'0',x2:'1',y1:'0',y2:'0'},[
      ['0%','#173652'],['66%','#325f81'],['100%','#6bc3da']
    ]);
    svg.append(defs,
      svgElement('path',{d:'M30 55H128Q156 14 226 24Q278 26 282 54V123Q270 149 222 149Q156 154 128 121H30Z',class:'lab-bouton'}),
      svgElement('path',{d:'M372 26C355 61 353 105 372 149H603V26Z',class:'lab-post-membrane'}),
      svgElement('path',{d:'M384 31C368 66 368 104 384 144',class:'lab-inner-membrane'}));
    for(const [x,y] of [[178,49],[213,53],[249,62],[178,101],[216,100],[250,108]]){
      svg.append(svgElement('circle',{cx:x,cy:y,r:13,class:'lab-vesicle'}));
      for(const [dx,dy] of [[-4,1],[3,-4],[4,4]])svg.append(svgElement('circle',{cx:x+dx,cy:y+dy,r:1.6,class:'lab-vesicle-content'}));
    }
    svg.append(svgElement('path',{d:'M278 43h-10v22h10M278 111h-10v17h10',class:'lab-calcium-channel'}));
    for(const y of [52,82,114])svg.append(svgElement('path',{d:`M365 ${y-8}q-12 1 -16 6v4q4 5 16 6`,class:'lab-detail-receptor'}));
    svg.append(
      svgElement('text',{x:135,y:16,class:'lab-diagram-caption'},'Terminal presináptico'),
      svgElement('text',{x:403,y:16,class:'lab-diagram-caption'},'Membrana postsináptica'),
      svgElement('text',{x:142,y:173,class:'lab-diagram-caption'},'Vesículas'),
      svgElement('text',{x:465,y:172,class:'lab-diagram-caption'},'Receptores'),
      svgElement('text',{x:317,y:171,'text-anchor':'middle',class:'lab-diagram-caption'},'Hendidura'),
      svgElement('path',{d:'M280 147v9h75v-9M178 117l-12 42M366 124l96 39',class:'lab-callout'}));
    const calcium=[];
    for(let i=0;i<4;i++){
      const ion=svgElement('circle',{r:2.7,class:'lab-calcium',visibility:'hidden'});
      svg.append(ion);
      calcium.push(ion);
    }
    const transmitters=[];
    for(let i=0;i<8;i++){
      const transmitter=svgElement('circle',{r:3.1,class:'lab-transmitter',visibility:'hidden'});
      svg.append(transmitter);
      transmitters.push(transmitter);
    }
    return {transmitters,calcium};
  }

  class PotentialPlot {
    constructor(svg){
      this.left=65;
      this.width=703;
      this.rows={};
      svg.setAttribute('viewBox','0 0 880 295');
      const clip=svgElement('clipPath',{id:'labTimeClip'});
      this.reveal=svgElement('rect',{x:this.left,y:0,width:0,height:269});
      clip.append(this.reveal);
      svg.append(clip);
      for(const [i,key] of ['A','B','C','D'].entries()){
        const top=12+i*60;
        const y=v=>top+(35-v)/120*40;
        svg.append(svgElement('text',{x:3,y:top+20,fill:COLORS[key],class:'plot-label'},key));
        for(const value of [30,-55,-70]){
          svg.append(svgElement('line',{x1:this.left,x2:this.left+this.width,y1:y(value),y2:y(value),class:value===THRESHOLD?'plot-threshold':'plot-grid'}));
        }
        svg.append(svgElement('text',{x:20,y:y(30)+4,class:'plot-scale'},'+30'));
        svg.append(svgElement('text',{x:20,y:y(-70)+4,class:'plot-scale'},'−70'));
        const trace=svgElement('path',{class:'plot-trace',stroke:COLORS[key],'clip-path':'url(#labTimeClip)'});
        const dot=svgElement('circle',{r:3.8,fill:COLORS[key]});
        const readout=svgElement('text',{x:865,y:top+22,'text-anchor':'end',class:'plot-scale'});
        svg.append(trace,dot,readout);
        this.rows[key]={y,trace,dot,readout};
      }
      for(let t=0;t<=END;t+=30)svg.append(svgElement('text',{x:this.x(t),y:263,'text-anchor':'middle',class:'plot-scale'},t));
      svg.append(svgElement('text',{x:416,y:286,'text-anchor':'middle',class:'plot-scale'},'Tiempo del modelo (ms)'));
      this.cursor=svgElement('line',{y1:9,y2:243,class:'plot-cursor'});
      svg.append(this.cursor);
    }

    x(time){return this.left+time/END*this.width;}

    setSamples(samples){
      for(const [key,row] of Object.entries(this.rows)){
        const series=samples[key];
        const path=series.map((v,i)=>`${i?'L':'M'}${this.x(i*STEP).toFixed(2)},${row.y(v).toFixed(2)}`).join('');
        row.trace.setAttribute('d',path);
      }
      this.samples=samples;
    }

    draw(time){
      const index=Math.min(Math.round(time/STEP),this.samples.A.length-1);
      const x=this.x(time);
      this.reveal.setAttribute('width',x-this.left);
      this.cursor.setAttribute('x1',x);
      this.cursor.setAttribute('x2',x);
      for(const [key,row] of Object.entries(this.rows)){
        const v=this.samples[key][index];
        row.dot.setAttribute('cx',x);
        row.dot.setAttribute('cy',row.y(v));
        row.readout.textContent=`${fmt(v)} mV`;
      }
    }
  }

  class PotentialLab {
    constructor(){
      this.active=false;
      this.running=false;
      this.time=0;
      this.frame=null;
      this.previous=null;
      this.inhibit=false;
      this.detail='exc';
      this.changes=[];
      this.circuit=drawCircuit($('labSynapseDiagram'));
      this.detailDrawing=drawDetail($('labSynapseDetail'));
      this.plot=new PotentialPlot($('labSynapsePlot'));
      this.refreshModel();
      $('labStimulate').onclick=()=>this.start();
      $('labPause').onclick=()=>this.togglePause();
      $('labReset').onclick=()=>this.reset();
      $('labInhibit').onclick=()=>this.toggleInhibition();
      $('labSynapseTime').oninput=e=>{
        this.stop();
        this.time=Number(e.target.value);
        this.draw();
      };
      document.querySelectorAll('[data-lab-detail]').forEach(button=>{
        button.onclick=()=>{this.detail=button.dataset.labDetail;this.draw();};
      });
    }

    refreshModel(){
      this.model=buildCircuit(this.changes);
      this.plot.setSamples(this.model.samples);
    }

    toggleInhibition(){
      const t=this.time>=END?0:this.time;
      const enabled=!inhibitionAt(this.changes,this.time);
      this.changes=this.changes.filter(change=>change.time<t);
      this.changes.push({time:t,enabled});
      if(this.time>=END)this.time=0;
      this.detail=enabled?'inh':'exc';
      this.refreshModel();
      this.draw();
    }

    reset(){
      this.stop();
      this.time=0;
      this.changes=this.inhibit?[{time:0,enabled:true}]:[];
      this.refreshModel();
      if(this.active)this.draw();
    }

    setActive(active){
      this.stop();
      this.active=active;
      if(active)this.draw();
    }

    start(){
      if(!this.active)return;
      this.reset();
      this.play();
    }

    stop(){
      if(this.frame!==null)cancelAnimationFrame(this.frame);
      this.frame=null;
      this.running=false;
      this.previous=null;
    }

    play(){
      this.running=true;
      const tick=now=>{
        if(this.previous!==null)this.time=Math.min(END,this.time+Math.min(70,now-this.previous)*.014);
        this.previous=now;
        if(this.time>=END)this.stop();
        this.draw();
        if(this.running)this.frame=requestAnimationFrame(tick);
      };
      this.draw();
      this.frame=requestAnimationFrame(tick);
    }

    togglePause(){
      if(!this.active||this.time>=END)return;
      if(this.running){this.stop();this.draw();}
      else this.play();
    }

    draw(){
      const t=this.time;
      const latest=this.model.spikes;
      const age=Object.fromEntries(Object.keys(NAMES).map(key=>[key,t-(latest[key].findLast(time=>time<=t)??-Infinity)]));
      const animateRoute=(key,elapsed,duration)=>{
        const {path,group,signal}=this.circuit.points[key];
        const travelling=elapsed>=0&&elapsed<duration;
        const release=elapsed>=duration&&elapsed<duration+3;
        group.classList.toggle('route-transmitting',travelling||release);
        group.classList.toggle('route-release',release);
        signal.setAttribute('visibility',travelling?'visible':'hidden');
        if(travelling){
          const p=path.getPointAtLength?.(path.getTotalLength()*elapsed/duration);
          if(p){signal.setAttribute('cx',p.x);signal.setAttribute('cy',p.y);}
        }
      };
      animateRoute('AB',age.A,12);
      animateRoute('BC',age.B,TARGET_DELAYS.C-2);
      animateRoute('BD',age.B,TARGET_DELAYS.D-2);
      animateRoute('IB',age.I,5);
      Object.entries(this.circuit.neurons).forEach(([key,node])=>node.classList.toggle('neuron-firing',age[key]<6));
      const b=this.model.samples.B[Math.round(t/STEP)];
      this.circuit.neurons.B.classList.toggle('neuron-inhibited',age.I>=7&&age.I<28&&b<REST);
      const cycle=Math.min(4,1+Math.floor(t/PERIOD));
      $('labCycle').textContent=t===0?'En reposo':t>=END?'Ensayo finalizado':`Estímulo ${cycle} de 4`;
      const step=t-(cycle-1)*PERIOD;
      let status='A enviará una señal excitatoria a B.';
      if(t===0)status='Pulsa Estimular A para iniciar el circuito.';
      else if(step>=20&&age.B<PERIOD&&age.B<=step){
        status=age.C<=step&&age.D<=step?'C y D dispararon tras recibir la señal de B.':'B alcanzó el umbral y envía la señal hacia C y D.';
      }else if(step>=21){
        status='B recibe excitación e inhibición y queda por debajo del umbral. C y D quedan sin un nuevo impulso de B.';
      }else if(age.I<5){
        status='La neurona I envía una señal inhibitoria hacia B.';
      }else if(age.A>=12&&age.A<14){
        status='El terminal de A libera neurotransmisor en la hendidura.';
      }else if(step>=19){
        status='El potencial de B cambia al recibir la entrada de A.';
      }else if(step>=5){
        status='La señal de A viaja hacia la sinapsis con B.';
      }
      this.updateText('labSynapseStatus',status);

      this.inhibit=inhibitionAt(this.changes,t);
      $('labInhibit').setAttribute('aria-pressed',String(this.inhibit));
      $('labInhibit').textContent=this.inhibit?'Desactivar neurona inhibitoria':'Activar neurona inhibitoria';
      const inhibitor=this.inhibit?'Neurona I activada. La inhibición actúa al llegar a B.':'Neurona I inactiva.';
      this.updateText('labInhibitStatus',inhibitor);

      this.drawDetail(age);
      this.plot.draw(t);
      const pause=$('labPause');
      pause.disabled=t>=END||(t===0&&!this.running);
      pause.textContent=this.running||pause.disabled?'Pausar':'Reanudar';
      $('labSynapseTime').value=String(t);
      $('labSynapseTimeValue').textContent=`${fmt(t)} ms`;
    }

    drawDetail(age){
      const exc=this.detail==='exc';
      const releaseAge=exc?age.A-12:age.I-5;
      const release=releaseAge>=0&&releaseAge<4;
      const arrival=releaseAge>=2&&releaseAge<8;
      $('labSynapseDetail').classList.toggle('lab-detail-inh',!exc);
      $('labSynapseDetail').classList.toggle('lab-detail-bound',arrival);
      const calciumIn=releaseAge>=-.8&&releaseAge<1.35;
      this.detailDrawing.calcium.forEach((ion,i)=>{
        ion.setAttribute('visibility',calciumIn?'visible':'hidden');
        if(calciumIn){
          ion.setAttribute('cx',280-(releaseAge+.8)*16+i*2);
          ion.setAttribute('cy',(i<2?49:116)+(i%2)*7);
        }
      });
      this.detailDrawing.transmitters.forEach((dot,i)=>{
        dot.setAttribute('visibility',release?'visible':'hidden');
        if(release){
          dot.setAttribute('cx',282+Math.min(67,releaseAge*24)+(i%3)*3);
          dot.setAttribute('cy',46+i*10+Math.sin(i+releaseAge)*3);
        }
      });
      for(const button of document.querySelectorAll('[data-lab-detail]')){
        button.setAttribute('aria-pressed',String(button.dataset.labDetail===this.detail));
      }
      let caption=exc?'A → B · Sinapsis excitatoria.':'I → B · Sinapsis inhibitoria.';
      if(calciumIn)caption='La llegada del impulso abre canales de Ca²⁺ en el terminal.';
      else if(arrival)caption='El neurotransmisor se une a receptores de B.';
      else if(release)caption='Las vesículas liberan neurotransmisor en la hendidura.';
      this.updateText('labDetailCaption',caption);
    }

    updateText(id,text){
      const el=$(id);
      if(el.textContent!==text)el.textContent=text;
    }
  }

  window.PotentialLab=PotentialLab;
})();
