'use strict';
const guideBase = 'https://github.com/josharghhh/enfusion-actions/blob/main/docs/guide/';
const features = [
  {title:'Edit clips, keep control.',category:'edit',status:'available',text:'Mirror, reverse, trim, retime and remove travel. Reshape a source clip without starting the motion again.',detail:'Open Clip Tools in Workbench or the Clip panel in the editor. Save to a new name, check the export profile, then preview the compiled result on its matching skeleton.',guide:'CLIP_OPS.md',tags:'speed in place turn loop seam TXA'},
  {title:'Put the feet where they belong.',category:'edit',status:'available',text:'Tune gait and posture. Inspect contacts, select trail points and adjust hands or feet at a frame.',detail:'Move controls change stride, cadence and posture. Select 3D trail samples for frame edits; use the current guide for the differences between human curve editing and animal viewport edits.',guide:'TRAILS.md',tags:'foot paws IK footprints motion trails locomotion'},
  {title:'Keys, curves & layers.',category:'edit',status:'available',text:'Edit position and rotation curves, smooth selected points and combine clips by body region.',detail:'Use Curves, Keys and Layers in the editor. Layer strips support moving, trimming, stretching and blending. Current layers replace/blend a region; additive strips are still a proposed extension.',guide:'TIMELINE_LAYERS.md',tags:'timeline smoothing NLA pose keyframe'},
  {title:'Events that travel with motion.',category:'pipeline',status:'available',text:'Edit event frames and payloads. Generate footfalls and carry their timing through reverse and layer edits.',detail:'Open Events to change timing and payloads. Configure footfall names for the target graph, preserve existing Sound payloads, then check the rebuilt ANM in Animation Editor.',guide:'TIMELINE_LAYERS.md',tags:'footfall audio sound timing markers'},
  {title:'Fit your own creature.',category:'creatures',status:'available',text:'Import a mesh, place joints, bind and preview a test walk. Optional learned suggestions help start the fit.',detail:'Use Rig without TXA for a generic quadruped starting point, or fit to a compatible reference family. Review markers and deformation before exporting the fitted model and matching clips. Gameplay setup remains separate.',guide:'ANIMALS.md',tags:'animal rig weights skinning FBX GLB GLTF OBJ mech export'},
  {title:'A prompt can start a clip.',category:'creatures',status:'available',text:'Use the optional local Kimodo integration to generate motion, then refine it with the editor’s tools.',detail:'Set up Kimodo in the Generate tab. It uses a separately installed local server and retargets the generated motion for preview. Existing clips remain the starting point when Kimodo is not installed.',guide:'GENERATE.md',tags:'text AI generation prompt GPU'},
  {title:'Build a first animation graph.',category:'pipeline',status:'testing',text:'Choose a biped, quadruped or custom preset and connect four clips to a forward speed blend.',detail:'The graph generator is experimental. Resource search and presets are implemented; repeated native reopening after a crash-trigger fix still needs verification. Test in a separate workspace. Steering, AI and gameplay controllers are not generated.',guide:'GRAPH_GENERATOR.md',tags:'idle walk trot jog run speed ASI AGR experimental'},
  {title:'Save it. Reopen it. Refine it.',category:'pipeline',status:'available',text:'Save TXA with an editable recipe, review the read-back check, and hand the animation to Workbench.',detail:'The recipe preserves editable settings. Use Import saved clips, inspect resource compilation, and play the ANM on the intended XOB. A successful file save alone does not confirm native playback or gameplay integration.',guide:'WORKBENCH.md',tags:'ANM export import recipe round trip native'},
  {title:'Learn the tool in the tool.',category:'pipeline',status:'available',text:'Search the built-in help, follow guided tours and use Setup check to resolve missing components.',detail:'Open Help or press F1. Start with the Windows first-test guide; the model runtime, Blender export and Kimodo are optional additions to the core clip-editing workflow.',guide:'FIRST_TEST.md',tags:'setup install help tutorials documentation'}
];
const roadmap = [
  {status:'available',title:'A more hands-on motion editor',text:'Selectable 3D trails, per-frame paw IK, position and rotation edits, multi-point smoothing and transform guides are implemented.'},
  {status:'available',title:'Animal fitting through export',text:'Fit and bind a mesh, test motion, then export a matching model and animation package. Engine materials and gameplay still need a separate pass.'},
  {status:'available',title:'Events and graph presets',text:'Event editing and footfall naming are available. Biped, quadruped and custom presets organize the experimental four-clip graph workflow.'},
  {status:'testing',title:'Graph stability in native Workbench',text:'The temporary test-resource indexing trigger was removed. Repeated opening, playback, stopping and reopening still need a fresh native acceptance check.'},
  {status:'testing',title:'Motion quality across different bodies',text:'Fitting and retargeting need continued checks on real meshes: paw contact, limb reach, shoulder deformation and loop seams.'},
  {status:'proposed',title:'Additive animation layers',text:'Add smaller motion on top of a base clip—for example, a gesture over a walk. Current layers blend or replace body regions.'},
  {status:'proposed',title:'More reliable native handoff',text:'Make import outcomes easier to understand, retain failed entries for retry, and expand checks from file export through native playback.'},
  {status:'proposed',title:'Broader rigs and stronger examples',text:'Expand validated skeleton profiles, improve learned fitting from qualified samples, and add short tutorials for complete creature workflows.'}
];
const statusName = {available:'Available',testing:'Experimental / testing',proposed:'Proposed next'};
const featureGrid=document.querySelector('#feature-grid');
features.forEach((feature,index)=>{
  const card=document.createElement('article');card.className='feature-card';
  card.innerHTML=`<div class="feature-top"><span class="feature-number">${String(index+1).padStart(2,'0')} / TOOL</span><span class="badge ${feature.status==='testing'?'testing':''}">${feature.status==='testing'?'Experimental':'Available'}</span></div><h3>${feature.title}</h3><p>${feature.text}</p><details><summary>How to use it</summary><p>${feature.detail}</p><a href="${guideBase+feature.guide}">Guide (private access) ↗</a></details>`;
  featureGrid.append(card);
});
let category='all';
function filterFeatures(){
  const query=document.querySelector('#feature-search').value.trim().toLowerCase();let count=0;
  [...featureGrid.children].forEach((card,index)=>{const f=features[index];const match=(category==='all'||f.category===category)&&`${f.title} ${f.text} ${f.detail} ${f.tags}`.toLowerCase().includes(query);card.hidden=!match;if(match)count++;});
  document.querySelector('#feature-count').textContent=`${count} ${count===1?'feature':'features'} shown`;
  document.querySelector('#no-results').hidden=count!==0;
}
function activateFilter(group,selected){group.querySelectorAll('button').forEach(button=>{const active=button===selected;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});}
document.querySelector('#feature-filters').addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;category=button.dataset.category;activateFilter(event.currentTarget,button);filterFeatures();});
document.querySelector('#feature-search').addEventListener('input',filterFeatures);filterFeatures();
const roadmapList=document.querySelector('#roadmap-list');
roadmap.forEach(item=>{const row=document.createElement('article');row.className='roadmap-item';row.dataset.status=item.status;row.innerHTML=`<span class="badge ${item.status==='available'?'':'testing'}">${statusName[item.status]}</span><h3>${item.title}</h3><p>${item.text}</p>`;roadmapList.append(row);});
document.querySelector('#roadmap-filters').addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;activateFilter(event.currentTarget,button);[...roadmapList.children].forEach(row=>{row.hidden=button.dataset.status!=='all'&&row.dataset.status!==button.dataset.status;});});
const steps=[...document.querySelectorAll('[data-step]')];const storageKey='enfusion-actions.site.setup.v1';
try{const saved=JSON.parse(localStorage.getItem(storageKey)||'[]');if(Array.isArray(saved))steps.forEach(step=>step.checked=saved.includes(step.dataset.step));}catch{document.querySelector('#storage-note').textContent='Progress is available for this visit.';}
function updateSetup(save=false){const checked=steps.filter(step=>step.checked);document.querySelector('#setup-progress').textContent=`${checked.length} / ${steps.length}`;document.querySelector('#setup-meter').value=checked.length;if(save){try{localStorage.setItem(storageKey,JSON.stringify(checked.map(step=>step.dataset.step)));}catch{document.querySelector('#storage-note').textContent='Progress is available for this visit.';}}}
steps.forEach(step=>step.addEventListener('change',()=>updateSetup(true)));
document.querySelector('#reset-checklist').addEventListener('click',()=>{steps.forEach(step=>step.checked=false);updateSetup(true);});updateSetup();
