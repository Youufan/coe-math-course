const sections=window.tutorSections||[
["s1","Sets & Intervals"],["s2","Set Operations"],["s3","Functions"],["s4","Composition"],["s5","Inverses"],["s6","Features"],["s7","Polynomials"],["s8","Inequalities"],["s9","Exponents & Logs"],["s10","Sigma & Series"],["s11","Trig & Inverse Trig"],["s12","Induction"],["s13","Exercises"],["s14","Study Sheet"]
];
let current=0; const done=new Set();
const nav=document.getElementById("nav"), topbar=document.getElementById("topbar");
function renderTutorMath(root=document.body){if(!window.renderMathInElement)return;renderMathInElement(root,{delimiters:[{left:"$$",right:"$$",display:true},{left:"\\[",right:"\\]",display:true},{left:"\\(",right:"\\)",display:false}],ignoredTags:["script","noscript","style","textarea","pre","code","option","svg"],throwOnError:false});}
const hasTutorShell=nav&&topbar&&document.getElementById("prev")&&document.getElementById("next");
if(hasTutorShell){sections.forEach(([id,name],i)=>{const b=document.createElement("button");b.className="navbtn";b.innerHTML=`<span class="n">${i+1}</span><span>${name}</span>`;b.onclick=()=>show(i);nav.appendChild(b);const p=document.createElement("button");p.className="pill";p.textContent=`${i+1}. ${name}`;p.onclick=()=>show(i);topbar.appendChild(p);});}
function show(i){current=Math.max(0,Math.min(sections.length-1,i));done.add(current);document.querySelectorAll("section").forEach((s,j)=>s.classList.toggle("show",j===current));document.querySelectorAll(".navbtn").forEach((b,j)=>{b.classList.toggle("active",j===current);b.classList.toggle("done",done.has(j));});document.querySelectorAll(".pill").forEach((b,j)=>{b.classList.toggle("active",j===current);b.classList.toggle("done",done.has(j));});document.getElementById("prev").disabled=current===0;const nx=document.getElementById("next");nx.textContent=current===sections.length-1?"Mark complete":"Next section";nx.className=current===sections.length-1?"donebtn":"next";const pct=100*done.size/sections.length;document.getElementById("fill").style.width=pct+"%";document.getElementById("plabel").textContent=`${done.size} / ${sections.length} sections opened`;window.scrollTo({top:0,behavior:"smooth"});}
if(hasTutorShell){document.getElementById("prev").onclick=()=>show(current-1);document.getElementById("next").onclick=()=> current===sections.length-1 ? (done.add(current),show(current)) : show(current+1);}
function rv(btn){const sol=btn.nextElementSibling;sol.classList.toggle("open");btn.classList.toggle("open");btn.textContent=sol.classList.contains("open")?"Hide solution":"Reveal solution";renderTutorMath(sol);renderNumberLines();}
function revealFormula(btn){const body=btn.closest(".formula-box")?.querySelector(".formula-body");if(!body)return;body.classList.toggle("open");btn.textContent=body.classList.contains("open")?"Hide formulas":"Reveal formulas";renderTutorMath(body);}
function recall(btn){const card=btn.closest(".recall-card");if(!card)return;card.classList.toggle("open");btn.textContent=card.classList.contains("open")?"Hide answer":"Reveal answer";renderTutorMath(card);}
function setOp(el,on){el.style.opacity=on?1:0}
function venn(mode,btn){document.querySelectorAll(".vbtn").forEach(b=>{if(b.parentElement===btn.parentElement)b.classList.remove("on")});btn.classList.add("on");const va=document.getElementById("va"),vb=document.getElementById("vb"),vl=document.getElementById("vl"),vc=document.getElementById("vc");[va,vb,vl,vc].forEach(e=>setOp(e,false));let text="";if(mode==="union"){setOp(va,1);setOp(vb,1);setOp(vl,1);text="<b>\\(A\\cup B\\)</b>: elements in \\(A\\), in \\(B\\), or in both."}if(mode==="inter"){setOp(vl,1);text="<b>\\(A\\cap B\\)</b>: elements common to both \\(A\\) and \\(B\\)."}if(mode==="amb"){setOp(va,1);text="<b>\\(A\\setminus B\\)</b>: elements in \\(A\\) that are not in \\(B\\)."}if(mode==="bma"){setOp(vb,1);text="<b>\\(B\\setminus A\\)</b>: elements in \\(B\\) that are not in \\(A\\)."}if(mode==="comp"){setOp(vc,1);text="<b>\\(A^c\\)</b>: elements of the universal set \\(S\\) that are not in \\(A\\)."}const readout=document.getElementById("vennread");readout.innerHTML=text;renderTutorMath(readout);}
function renderNumberLines(){document.querySelectorAll(".numline[data-lines]:not([data-rendered])").forEach(el=>{const min=+el.dataset.min,max=+el.dataset.max,lines=JSON.parse(el.dataset.lines);const w=640,h=48+lines.length*44,pad=42;const x=v=>pad+(v-min)/(max-min)*(w-2*pad);let s=`<svg viewBox="0 0 ${w} ${h}" class="axis"><line x1="${pad}" y1="30" x2="${w-pad}" y2="30" stroke="#1c2437"/>`;for(let t=Math.ceil(min);t<=Math.floor(max);t++){s+=`<line x1="${x(t)}" y1="25" x2="${x(t)}" y2="35" stroke="#1c2437"/><text x="${x(t)}" y="50" text-anchor="middle">${t}</text>`}lines.forEach((ln,i)=>{const y=82+i*42,xa=x(Math.max(min,ln.a)),xb=x(Math.min(max,ln.b));s+=`<line x1="${pad}" y1="${y}" x2="${w-pad}" y2="${y}" stroke="#d9d9d0"/><line x1="${xa}" y1="${y}" x2="${xb}" y2="${y}" stroke="#3457c5" stroke-width="7" stroke-linecap="round"/>`;["left","right"].forEach(side=>{const xx=side==="left"?xa:xb,typ=side==="left"?ln.left:ln.right;const fill=typ==="closed"?"#3457c5":"#fff";s+=`<circle cx="${xx}" cy="${y}" r="8" fill="${fill}" stroke="#3457c5" stroke-width="2"/>`});s+=`<text x="${w/2}" y="${y+26}" text-anchor="middle">${ln.label||""}</text>`});s+="</svg>";el.innerHTML=s;el.dataset.rendered="1";});}
const angleData=[["0°",0,"0","1","0"],["30°",30,"\\frac12","\\frac{\\sqrt3}{2}","\\frac{1}{\\sqrt3}"],["45°",45,"\\frac{\\sqrt2}{2}","\\frac{\\sqrt2}{2}","1"],["60°",60,"\\frac{\\sqrt3}{2}","\\frac12","\\sqrt3"],["90°",90,"1","0","\\text{undefined}"],["120°",120,"\\frac{\\sqrt3}{2}","-\\frac12","-\\sqrt3"],["135°",135,"\\frac{\\sqrt2}{2}","-\\frac{\\sqrt2}{2}","-1"],["225°",225,"-\\frac{\\sqrt2}{2}","-\\frac{\\sqrt2}{2}","1"],["300°",300,"-\\frac{\\sqrt3}{2}","\\frac12","-\\sqrt3"]];
const angleBtns=document.getElementById("angleBtns");if(angleBtns){angleData.forEach((a,i)=>{const b=document.createElement("button");b.className="vbtn"+(i===0?" on":"");b.textContent=a[0];b.onclick=()=>unit(a,b);angleBtns.appendChild(b);});}
function unit(a,b){angleBtns.querySelectorAll(".vbtn").forEach(x=>x.classList.remove("on"));b.classList.add("on");const deg=a[1],rad=deg*Math.PI/180,cx=160+112*Math.cos(rad),cy=160-112*Math.sin(rad);document.getElementById("uray").setAttribute("d",`M160 160 L${cx} ${cy}`);document.getElementById("upoint").setAttribute("cx",cx);document.getElementById("upoint").setAttribute("cy",cy);const angle=a[0].replace("°","^\\circ");const readout=document.getElementById("unitread");readout.innerHTML=`\\(\\theta=${angle}:\\ \\sin\\theta=${a[2]},\\ \\cos\\theta=${a[3]},\\ \\tan\\theta=${a[4]}\\)`;renderTutorMath(readout);}
function plainComplexLabel(label){return label.replace(/\\sqrt\{?([0-9]+)\}?/g,"√$1").replace(/\\ldots/g,"...").replace(/\\/g,"").replace(/\+/g," + ").replace(/-/g," - ").replace(/^ - /,"-").replace(/\s+/g," ").trim();}
function argandLabelPos(x,y,sx,sy){if(x<0&&y<0)return{x:sx-58,y:sy+24};if(x<0)return{x:sx-76,y:sy-12};return{x:sx+10,y:sy-10};}
function setArgandSvgLabel(txt,label,x,y,sx,sy){const pos=argandLabelPos(x,y,sx,sy),html=document.getElementById("arg-html-label");txt.style.display="none";if(html){html.style.left=`${pos.x/360*100}%`;html.style.top=`${pos.y/360*100}%`;html.innerHTML=`\\(${label}\\)`;renderTutorMath(html);return;}txt.textContent="";txt.setAttribute("x",pos.x);txt.setAttribute("y",pos.y);txt.setAttribute("font-size","13");txt.setAttribute("fill","#1c2437");txt.textContent=plainComplexLabel(label).replace(/√/g,"sqrt");}
function argandPoint(x,y,label,polar,btn){const sx=180+x*34,sy=180-y*34;const ray=document.getElementById("arg-ray"),pt=document.getElementById("arg-point"),h=document.getElementById("arg-h"),v=document.getElementById("arg-v"),txt=document.getElementById("arg-label"),read=document.getElementById("arg-readout");if(!ray||!pt||!read)return;if(btn){btn.parentElement.querySelectorAll(".vbtn").forEach(b=>b.classList.remove("on"));btn.classList.add("on")}ray.setAttribute("x2",sx);ray.setAttribute("y2",sy);pt.setAttribute("cx",sx);pt.setAttribute("cy",sy);if(h){h.setAttribute("x1",180);h.setAttribute("x2",sx);h.setAttribute("y1",sy);h.setAttribute("y2",sy)}if(v){v.setAttribute("x1",sx);v.setAttribute("x2",sx);v.setAttribute("y1",180);v.setAttribute("y2",sy)}if(txt)setArgandSvgLabel(txt,label,x,y,sx,sy);read.innerHTML=`\\(${label}${polar||""}\\)`;renderTutorMath(read);}
function rootsUnity(n,btn){const host=document.getElementById("roots-unity");if(!host)return;if(btn){btn.parentElement.querySelectorAll(".vbtn").forEach(b=>b.classList.remove("on"));btn.classList.add("on")}const cx=170,cy=170,r=118;let pts="",labels="";for(let k=0;k<n;k++){const a=2*Math.PI*k/n,x=cx+r*Math.cos(a),y=cy-r*Math.sin(a);pts+=`<circle cx="${x}" cy="${y}" r="6" fill="#d94f35"/>`;labels+=`<text x="${cx+(r+22)*Math.cos(a)}" y="${cy-(r+22)*Math.sin(a)+4}" text-anchor="middle" font-size="11">k=${k}</text>`}host.innerHTML=`<svg viewBox="0 0 340 340"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="#1c2437" stroke-width="2"/><line x1="28" y1="${cy}" x2="312" y2="${cy}" stroke="#c9ccc0"/><line x1="${cx}" y1="28" x2="${cx}" y2="312" stroke="#c9ccc0"/>${pts}${labels}<text x="300" y="160" font-size="12" fill="#5a6379">Re</text><text x="178" y="42" font-size="12" fill="#5a6379">Im</text></svg><div class="cap">\\(${n}\\) roots: \\(z_k=\\cos\\frac{2k\\pi}{${n}}+i\\sin\\frac{2k\\pi}{${n}},\\ k=0,\\ldots,${n-1}\\)</div>`;renderTutorMath(host);}
function domino(){const rects=[...document.querySelectorAll("#doms rect")];rects.forEach((r,i)=>{setTimeout(()=>{r.setAttribute("transform",`rotate(24 ${+r.getAttribute("x")+11} 92)`)},i*140)});setTimeout(()=>rects.forEach(r=>r.removeAttribute("transform")),1300)}
document.addEventListener("DOMContentLoaded",()=>{renderTutorMath();if(hasTutorShell){renderNumberLines();show(0);}if(document.getElementById("arg-ray"))argandPoint(3,-3,"3-3i","=3\\sqrt2\\,\\mathrm{cis}(-\\pi/4)");if(document.getElementById("roots-unity"))rootsUnity(5);});

const ALICE_CHAPTERS=[
  {file:"chapter-0.html",title:"Fundamentals",short:"0"},
  {file:"chapter-1.html",title:"Complex Numbers",short:"1"},
  {file:"chapter-2.html",title:"Vectors",short:"2"},
  {file:"chapter-3.html",title:"Matrices",short:"3"}
];
const ALICE_STORE="alice-mathematics-v1";
const ALICE_ACTIVE_ATTEMPTS="alice-active-attempts-v1";
const ALICE_DB="alice-mathematics-ink-v1";
let aliceDbPromise=null;
let aliceDirty=false;

function aliceLoad(){try{return JSON.parse(localStorage.getItem(ALICE_STORE))||{sections:{},questions:{},notes:{},bookmarks:{},settings:{}}}catch{return{sections:{},questions:{},notes:{},bookmarks:{},settings:{}}}}
function aliceSave(state){localStorage.setItem(ALICE_STORE,JSON.stringify(state))}
function aliceState(){if(!window.__aliceState)window.__aliceState=aliceLoad();return window.__aliceState}
function aliceText(el){return (el?.innerText||el?.textContent||"").replace(/\s+/g," ").trim()}
function aliceAttr(text){return String(text||"").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}
function alicePageKey(){return location.pathname.split("/").pop()||"index.html"}
function aliceSectionKey(section){return `${alicePageKey()}#${section?.id||"home"}`}
function aliceQuestionKey(ex){return `${alicePageKey()}#${ex.closest("section")?.id||"section"}:q${[...document.querySelectorAll(".ex")].indexOf(ex)}`}
function aliceIsChapter(){return !!document.querySelector(".app main section")}
function aliceCurrentSection(){return document.querySelector("section.show")||document.querySelector("main section")}
function aliceChapterTitle(){return document.querySelector(".brand h1")?.innerText.replace(/\s+/g," ").trim()||document.title.replace("| Alice's Mathematics","")}
function aliceSetStatus(key,status){const st=aliceState(),cur=st.sections[key]||{},rank={seen:1,practised:2,mastered:3};if(!cur.status||rank[status]>=rank[cur.status])cur.status=status;cur.lastSeen=Date.now();st.sections[key]=cur;aliceSave(st);aliceRenderProgress()}
function aliceSetQuestionStatus(key,patch){const st=aliceState();st.questions[key]={...(st.questions[key]||{}),...patch,lastTouched:Date.now()};aliceSave(st);aliceRenderProgress()}
function aliceQuestionDisplay(body){const clone=body?.cloneNode(true);clone?.querySelector(".btn")?.remove();clone?.querySelector(".sol")?.remove();return{text:aliceText(clone),html:clone?.innerHTML||""}}
function aliceBuildQuestionBank(){return [...document.querySelectorAll(".ex")].map((ex,i)=>{const sec=ex.closest("section"),body=ex.querySelector(".exb"),sol=ex.querySelector(".sol"),q=aliceQuestionDisplay(body),title=aliceText(ex.querySelector(".exh"))||`Question ${i+1}`;return{key:aliceQuestionKey(ex),index:i+1,chapter:aliceChapterTitle(),section:aliceText(sec?.querySelector("h2")),sectionId:sec?.id||"",type:title.toLowerCase().includes("try")||title.toLowerCase().includes("practice")?"Question":"Worked example",title,question:q.text,questionHtml:q.html,solution:aliceText(sol),solutionHtml:sol?.innerHTML||"",el:ex}})}
function aliceBuildFormulaBank(){const out=[];document.querySelectorAll("section").forEach(sec=>{const section=aliceText(sec.querySelector("h2"));sec.querySelectorAll(".key,.card,.formula-item,.big").forEach((el,i)=>{const html=el.innerHTML||"";if(/\\\(|\\\[|\\frac|\\sqrt|\\sum|\\det|\\sin|\\cos|\\mathbf|\\mathbb|\\begin/.test(html))out.push({section,sectionId:sec.id,title:aliceText(el.querySelector("b"))||section,html,idx:i})})});return out}

function aliceOpenDb(){
  if(aliceDbPromise)return aliceDbPromise;
  aliceDbPromise=new Promise((resolve,reject)=>{
    if(!("indexedDB" in window)){reject(new Error("IndexedDB is not available"));return}
    const req=indexedDB.open(ALICE_DB,1);
    req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains("attempts")){const store=db.createObjectStore("attempts",{keyPath:"id"});store.createIndex("questionKey","questionKey",{unique:false});store.createIndex("updated","updated",{unique:false})}};
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
  });
  return aliceDbPromise;
}
async function aliceDbGet(id){const db=await aliceOpenDb();return new Promise((resolve,reject)=>{const tx=db.transaction("attempts","readonly"),req=tx.objectStore("attempts").get(id);req.onsuccess=()=>resolve(req.result||null);req.onerror=()=>reject(req.error)})}
async function aliceDbPut(record){const db=await aliceOpenDb();return new Promise((resolve,reject)=>{const tx=db.transaction("attempts","readwrite"),req=tx.objectStore("attempts").put(record);req.onsuccess=()=>resolve(record);req.onerror=()=>reject(req.error)})}
async function aliceDbByQuestion(questionKey){const db=await aliceOpenDb();return new Promise((resolve,reject)=>{const tx=db.transaction("attempts","readonly"),idx=tx.objectStore("attempts").index("questionKey"),req=idx.getAll(questionKey);req.onsuccess=()=>resolve((req.result||[]).sort((a,b)=>b.created-a.created));req.onerror=()=>reject(req.error)})}
function aliceActiveMap(){try{return JSON.parse(localStorage.getItem(ALICE_ACTIVE_ATTEMPTS))||{}}catch{return{}}}
function aliceSetActiveAttempt(questionKey,id){const map=aliceActiveMap();map[questionKey]=id;localStorage.setItem(ALICE_ACTIVE_ATTEMPTS,JSON.stringify(map))}
function aliceNewAttempt(q){const now=Date.now();return{id:`${q.key}:${now}:${Math.random().toString(36).slice(2,8)}`,questionKey:q.key,chapter:q.chapter,section:q.section,sectionId:q.sectionId,title:q.title,created:now,updated:now,activePage:0,showGrid:true,pages:[{strokes:[],redo:[]}]}}
async function aliceLoadAttempt(q){const active=aliceActiveMap()[q.key];let record=active?await aliceDbGet(active):null;if(record)return record;const list=await aliceDbByQuestion(q.key);if(list[0]){aliceSetActiveAttempt(q.key,list[0].id);return list[0]}record=aliceNewAttempt(q);await aliceDbPut(record);aliceSetActiveAttempt(q.key,record.id);return record}

function aliceInstallShell(){
  if(!aliceIsChapter())return;
  document.body.classList.add("arc-studio","alice-studio");
  const brand=document.querySelector(".brand");
  if(brand){
    const h=brand.querySelector("h1"),text=h?h.innerHTML:"";
    brand.innerHTML=`<a class="arc-brand" href="../index.html" aria-label="Alice's Mathematics home"><span class="arc-mark" aria-hidden="true"></span><span><strong>Alice's Mathematics</strong><small>My mathematical workspace</small></span></a><div class="arc-current">${text}</div><button class="arc-sidebar-toggle" type="button" aria-label="Toggle course navigation">Sections</button>`;
  }
  const mast=document.createElement("header");
  mast.className="arc-top";
  mast.innerHTML=`<a class="arc-wordmark" href="../index.html"><span class="arc-mark"></span><span>Alice's Mathematics</span></a><div class="arc-top-progress"><span>Mastery</span><div class="arc-mini-bar"><i></i></div><b id="arcOverall">0%</b></div><button class="arc-primary" type="button" id="arcContinue">Continue lesson</button>`;
  document.body.prepend(mast);
  const side=document.querySelector(".app>aside");
  const links=document.createElement("nav");
  links.className="arc-tools";
  links.setAttribute("aria-label","Workspace tools");
  links.innerHTML=`<button data-view="overview">Workspace overview</button><button data-view="formulas">Formula sheet</button><button data-view="questions">Question bank</button><button data-view="review">Review queue</button><button data-view="progress">Progress</button><button data-view="notes">Notes</button><button data-view="settings">Settings</button>`;
  side?.appendChild(links);
  aliceRenderCourseMap();
  aliceInstallOverlay();
  document.getElementById("arcContinue")?.addEventListener("click",()=>show(Math.min(current+1,sections.length-1)));
  document.querySelector(".arc-sidebar-toggle")?.addEventListener("click",()=>document.body.classList.toggle("arc-nav-open"));
  document.querySelectorAll(".arc-tools button").forEach(b=>b.addEventListener("click",()=>aliceOpenView(b.dataset.view)));
}
function aliceRenderCourseMap(){
  const side=document.querySelector(".app>aside");if(!side||side.querySelector(".arc-course-map"))return;
  const cur=alicePageKey(),map=document.createElement("div");map.className="arc-course-map";
  map.innerHTML=`<div class="arc-map-title">Course structure</div>${ALICE_CHAPTERS.map(ch=>`<a class="${cur===ch.file?"active":""}" href="${ch.file===cur?ch.file:"../chapters/"+ch.file}"><span>${ch.short}</span><b>${ch.title}</b><i data-chapter="${ch.file}">0%</i></a>`).join("")}`;
  document.getElementById("nav")?.before(map);
}
function aliceInstallOverlay(){
  if(document.getElementById("arcOverlay"))return;
  const overlay=document.createElement("div");
  overlay.className="arc-overlay";overlay.id="arcOverlay";
  overlay.innerHTML=`<div class="arc-modal" role="dialog" aria-modal="true" aria-labelledby="arcModalTitle"><button class="arc-close" type="button" aria-label="Close">×</button><h2 id="arcModalTitle">Workspace</h2><div id="arcModalBody"></div></div>`;
  document.body.appendChild(overlay);
  overlay.querySelector(".arc-close").addEventListener("click",()=>overlay.classList.remove("open"));
  overlay.addEventListener("click",e=>{if(e.target===overlay)overlay.classList.remove("open")});
}
function aliceOpenView(view){
  const overlay=document.getElementById("arcOverlay"),body=document.getElementById("arcModalBody"),title=document.getElementById("arcModalTitle");if(!overlay||!body||!title)return;
  const bank=aliceBuildQuestionBank(),formulas=aliceBuildFormulaBank(),st=aliceState();
  title.textContent={overview:"Workspace overview",formulas:"Formula sheet",questions:"Question bank",review:"Review queue",progress:"Progress",notes:"Notes",settings:"Settings"}[view]||"Workspace";
  if(view==="overview")body.innerHTML=`<p>Alice's Mathematics stores progress, notes, bookmarks, and handwritten attempts locally in this browser.</p><div class="arc-stat-grid"><div><b>${document.querySelectorAll("section").length}</b><span>sections in this chapter</span></div><div><b>${bank.length}</b><span>examples and questions</span></div><div><b>${formulas.length}</b><span>formula blocks found</span></div></div>`;
  if(view==="formulas")body.innerHTML=`<input class="arc-filter" placeholder="Search formulas" aria-label="Search formulas"><div class="arc-list">${formulas.map(f=>`<article data-search="${aliceAttr(f.title+" "+f.section)}"><a href="#${f.sectionId}" data-jump="${f.sectionId}">${f.section}</a><div>${f.html}</div></article>`).join("")}</div>`;
  if(view==="questions")body.innerHTML=`<div class="arc-filters"><select aria-label="Filter by status"><option value="">All statuses</option><option>seen</option><option>practised</option><option>mastered</option></select><input class="arc-filter" placeholder="Search question bank" aria-label="Search question bank"></div><div class="arc-list">${bank.map(q=>{const qs=st.questions[q.key]?.status||"new";return`<article data-status="${qs}" data-search="${aliceAttr(q.title+" "+q.question+" "+q.section)}"><a href="#${q.sectionId}" data-jump="${q.sectionId}">${q.title}</a><small>${q.section} · ${q.type} · ${qs}</small><div class="arc-question-html">${q.questionHtml}</div><details><summary>Original solution</summary><div>${q.solutionHtml}</div></details></article>`}).join("")}</div>`;
  if(view==="review")body.innerHTML=`<div class="arc-list">${aliceReviewQueue(bank,st).map(q=>`<article><a href="#${q.sectionId}" data-jump="${q.sectionId}">${q.title}</a><small>${q.reason}</small><div class="arc-question-html">${q.questionHtml}</div><details><summary>Original solution</summary><div>${q.solutionHtml}</div></details></article>`).join("")||"<p>No review items yet. Try a few questions first.</p>"}</div>`;
  if(view==="progress")body.innerHTML=`<div class="arc-list">${[...document.querySelectorAll("section")].map(sec=>{const s=st.sections[aliceSectionKey(sec)]?.status||"new";return`<article><a href="#${sec.id}" data-jump="${sec.id}">${aliceText(sec.querySelector("h2"))}</a><small>Status: ${s}</small></article>`}).join("")}</div>`;
  if(view==="notes")body.innerHTML=`<div class="arc-list">${Object.entries(st.notes).map(([k,v])=>`<article><b>${k}</b><p>${v}</p></article>`).join("")||"<p>No saved notes yet. Use the note buttons beside sections and examples.</p>"}</div>`;
  if(view==="settings")body.innerHTML=`<p>Handwriting is stored as structured strokes in IndexedDB. Progress and notes are stored locally in this browser.</p><button class="arc-danger" id="arcReset">Clear local study data</button>`;
  overlay.classList.add("open");renderTutorMath(body);
  body.querySelectorAll("[data-jump]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();overlay.classList.remove("open");aliceJumpTo(a.dataset.jump)}));
  body.querySelector(".arc-filter")?.addEventListener("input",e=>aliceFilterList(body,e.target.value));
  body.querySelector("select")?.addEventListener("change",e=>aliceFilterStatus(body,e.target.value));
  body.querySelector("#arcReset")?.addEventListener("click",()=>{localStorage.removeItem(ALICE_STORE);localStorage.removeItem(ALICE_ACTIVE_ATTEMPTS);window.__aliceState=null;aliceRenderProgress();aliceOpenView("settings")});
}
function aliceFilterList(root,q){q=q.toLowerCase();root.querySelectorAll(".arc-list article").forEach(a=>a.hidden=q&&!a.dataset.search?.toLowerCase().includes(q))}
function aliceFilterStatus(root,status){root.querySelectorAll(".arc-list article").forEach(a=>a.hidden=status&&a.dataset.status!==status)}
function aliceReviewQueue(bank,st){return bank.map(q=>{const rec=st.questions[q.key]||{};let score=0,why=[];if(rec.status!=="mastered"){score+=1;why.push(rec.status||"new")}if(rec.confidence==="low"){score+=2;why.push("low confidence")}if(rec.hints>1){score+=1;why.push("used hints")}return{...q,score,reason:why.join(", ")||"review"}}).filter(q=>q.score>0).sort((a,b)=>b.score-a.score).slice(0,20)}
function aliceJumpTo(id){const idx=sections.findIndex(s=>s[0]===id);if(idx>=0)show(idx);setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"}),80)}
function aliceRenderProgress(){
  if(!aliceIsChapter())return;
  const st=aliceState(),secs=[...document.querySelectorAll("section")],bank=aliceBuildQuestionBank(),mastered=Object.values(st.sections).filter(x=>x.status==="mastered").length+Object.values(st.questions).filter(x=>x.status==="mastered").length,total=secs.length+bank.length,pct=total?Math.round(mastered/total*100):0;
  const fill=document.querySelector(".arc-mini-bar i");if(fill)fill.style.width=pct+"%";const overall=document.getElementById("arcOverall");if(overall)overall.textContent=pct+"%";
  document.querySelectorAll(".arc-status-pill").forEach(p=>p.remove());
  secs.forEach(sec=>{const status=st.sections[aliceSectionKey(sec)]?.status||"new",sk=sec.querySelector(".sk");if(sk){const pill=document.createElement("span");pill.className=`arc-status-pill ${status}`;pill.textContent=status;sk.appendChild(pill)}});
}
function aliceEnhanceSections(){
  document.querySelectorAll("section").forEach(sec=>{const key=aliceSectionKey(sec);if(sec.querySelector(".arc-block-tools"))return;const tools=document.createElement("div");tools.className="arc-block-tools";tools.innerHTML=`<button type="button" data-bookmark>Bookmark</button><button type="button" data-note>Add note</button><button type="button" data-confusing>Mark confusing</button>`;sec.insertBefore(tools,sec.children[1]||null);tools.querySelector("[data-bookmark]").addEventListener("click",()=>{const st=aliceState();st.bookmarks[key]=aliceText(sec.querySelector("h2"));aliceSave(st);tools.querySelector("[data-bookmark]").textContent="Bookmarked"});tools.querySelector("[data-note]").addEventListener("click",()=>{const note=prompt("Note for this section");if(note){const st=aliceState();st.notes[key]=note;aliceSave(st)}});tools.querySelector("[data-confusing]").addEventListener("click",()=>{aliceSetStatus(key,"seen");const st=aliceState();st.sections[key]={...(st.sections[key]||{}),confusing:true};aliceSave(st);tools.querySelector("[data-confusing]").textContent="Marked confusing"})});
}
function aliceEnhanceExamples(){
  aliceBuildQuestionBank().forEach(q=>{
    const ex=q.el;if(ex.dataset.aliceEnhanced)return;ex.dataset.aliceEnhanced="1";
    const exb=ex.querySelector(".exb"),sol=ex.querySelector(".sol"),btn=ex.querySelector(".btn");if(!exb||!sol)return;
    const modes=document.createElement("div");modes.className="arc-modebar";modes.innerHTML=`<button class="arc-mode-read on" type="button">Read example</button><button class="arc-mode-try" type="button">Try it yourself</button><button class="arc-mode-compare" type="button">Compare solution</button>`;ex.insertBefore(modes,exb);
    const panel=document.createElement("div");panel.className="arc-try-panel alice-try-panel";
    const qClone=exb.cloneNode(true);qClone.querySelector(".btn")?.remove();qClone.querySelector(".sol")?.remove();
    panel.innerHTML=`<div class="alice-practice-head"><div><h4>Question</h4><div class="arc-question-copy"></div></div><div class="alice-save-status" aria-live="polite">Saved</div></div><div class="alice-canvas-shell"><div class="alice-canvas-toolbar" role="toolbar" aria-label="Handwriting tools"><button type="button" data-tool="pen" class="on">Pen</button><button type="button" data-tool="eraser">Eraser</button><button type="button" data-act="undo">Undo</button><button type="button" data-act="redo">Redo</button><button type="button" data-act="clear">Clear</button><button type="button" data-act="grid" class="on">Graph paper</button><button type="button" data-act="prev-page">Previous page</button><span class="alice-page-label">Page 1 of 1</span><button type="button" data-act="next-page">Next page</button><button type="button" data-act="add-page">Add page</button><button type="button" data-act="fullscreen">Full screen</button></div><div class="alice-canvas-wrap"><canvas class="alice-ink" aria-label="Handwriting canvas"></canvas></div></div><div class="alice-attempt-row"><button type="button" data-act="new-attempt">Start new attempt</button><label>Attempt history <select data-attempt-history aria-label="Attempt history"></select></label><div class="arc-confidence" role="group" aria-label="Confidence"><button type="button" data-confidence="low">Low</button><button type="button" data-confidence="medium">Medium</button><button type="button" data-confidence="high">High</button></div></div><div class="arc-hint" aria-live="polite"></div><div class="arc-compare alice-compare"></div>`;
    panel.querySelector(".arc-question-copy").appendChild(qClone);ex.appendChild(panel);
    const setMode=mode=>{ex.classList.toggle("trying",mode==="try");ex.classList.toggle("comparing",mode==="compare");[...modes.children].forEach(b=>b.classList.remove("on"));modes.querySelector(`.arc-mode-${mode}`)?.classList.add("on");if(mode==="read"){sol.classList.add("open");btn&&btn.classList.add("open");if(btn)btn.textContent="Hide solution"}else{sol.classList.remove("open");btn&&btn.classList.remove("open");if(btn)btn.textContent="Reveal solution";aliceSetQuestionStatus(q.key,{status:"practised"})}if(mode==="try")aliceInitCanvas(q,panel);if(mode==="compare")aliceCompare(q,panel,sol)};
    modes.querySelector(".arc-mode-read").addEventListener("click",()=>setMode("read"));
    modes.querySelector(".arc-mode-try").addEventListener("click",()=>setMode("try"));
    modes.querySelector(".arc-mode-compare").addEventListener("click",()=>setMode("compare"));
    panel.querySelectorAll("[data-confidence]").forEach(b=>b.addEventListener("click",()=>{panel.querySelectorAll("[data-confidence]").forEach(x=>x.classList.remove("on"));b.classList.add("on");const status=b.dataset.confidence==="high"?"mastered":"practised";aliceSetQuestionStatus(q.key,{confidence:b.dataset.confidence,status,lastCorrect:b.dataset.confidence==="high"?Date.now():undefined});const sec=ex.closest("section");if(status==="mastered"&&sec)aliceSetStatus(aliceSectionKey(sec),"mastered")}));
    renderTutorMath(panel);
  });
}

function aliceInitCanvas(q,panel){if(panel.dataset.canvasReady)return;panel.dataset.canvasReady="1";aliceLoadAttempt(q).then(record=>aliceBindCanvas(q,panel,record)).catch(err=>{panel.querySelector(".alice-save-status").textContent="Storage unavailable";console.error(err)})}
function aliceBindCanvas(q,panel,record){
  const canvas=panel.querySelector(".alice-ink"),wrap=panel.querySelector(".alice-canvas-wrap"),status=panel.querySelector(".alice-save-status"),history=panel.querySelector("[data-attempt-history]"),pageLabel=panel.querySelector(".alice-page-label");
  let state=record,tool="pen",drawing=false,currentStroke=null,dirtyTimer=null;
  const ctx=canvas.getContext("2d");
  function page(){state.pages[state.activePage]||(state.pages[state.activePage]={strokes:[],redo:[]});return state.pages[state.activePage]}
  function setStatus(text){status.textContent=text}
  function saveSoon(){aliceDirty=true;setStatus("Saving...");clearTimeout(dirtyTimer);dirtyTimer=setTimeout(async()=>{state.updated=Date.now();await aliceDbPut(state);aliceDirty=false;setStatus("Saved");aliceSetQuestionStatus(q.key,{status:"practised",attemptId:state.id})},250)}
  function resize(){const r=wrap.getBoundingClientRect(),dpr=window.devicePixelRatio||1;canvas.width=Math.max(1,Math.floor(r.width*dpr));canvas.height=Math.max(1,Math.floor(r.height*dpr));canvas.style.width=r.width+"px";canvas.style.height=r.height+"px";ctx.setTransform(dpr,0,0,dpr,0,0);draw()}
  function grid(){const w=canvas.clientWidth,h=canvas.clientHeight;ctx.save();ctx.clearRect(0,0,w,h);if(state.showGrid!==false){ctx.strokeStyle="rgba(11,35,69,.08)";ctx.lineWidth=1;for(let x=0;x<w;x+=24){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let y=0;y<h;y+=24){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}ctx.strokeStyle="rgba(11,35,69,.14)";for(let x=0;x<w;x+=120){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}for(let y=0;y<h;y+=120){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}}ctx.restore()}
  function drawStroke(s){if(!s.points.length)return;ctx.save();ctx.lineCap="round";ctx.lineJoin="round";ctx.strokeStyle=s.tool==="eraser"?"rgba(0,0,0,1)":s.color;ctx.lineWidth=s.width;ctx.globalCompositeOperation=s.tool==="eraser"?"destination-out":"source-over";ctx.beginPath();ctx.moveTo(s.points[0].x,s.points[0].y);for(const p of s.points.slice(1))ctx.lineTo(p.x,p.y);ctx.stroke();ctx.restore()}
  function draw(){grid();page().strokes.forEach(drawStroke);pageLabel.textContent=`Page ${state.activePage+1} of ${state.pages.length}`}
  function point(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top,t:Date.now()}}
  function start(e){e.preventDefault();canvas.setPointerCapture(e.pointerId);drawing=true;currentStroke={tool,color:"#0b2345",width:tool==="eraser"?26:3,points:[point(e)]};page().redo=[];drawStroke(currentStroke)}
  function move(e){if(!drawing)return;e.preventDefault();currentStroke.points.push(point(e));drawStroke(currentStroke)}
  function end(e){if(!drawing)return;e.preventDefault();drawing=false;currentStroke.points.push(point(e));page().strokes.push(currentStroke);currentStroke=null;saveSoon()}
  async function refreshHistory(){const list=await aliceDbByQuestion(q.key);history.innerHTML=list.map(a=>`<option value="${a.id}" ${a.id===state.id?"selected":""}>${new Date(a.created).toLocaleString()}</option>`).join("")}
  canvas.addEventListener("pointerdown",start);canvas.addEventListener("pointermove",move);canvas.addEventListener("pointerup",end);canvas.addEventListener("pointercancel",end);
  window.addEventListener("resize",resize);
  panel.querySelectorAll("[data-tool]").forEach(b=>b.addEventListener("click",()=>{tool=b.dataset.tool;panel.querySelectorAll("[data-tool]").forEach(x=>x.classList.remove("on"));b.classList.add("on")}));
  panel.querySelector("[data-act='undo']").addEventListener("click",()=>{const p=page(),s=p.strokes.pop();if(s){p.redo.push(s);draw();saveSoon()}});
  panel.querySelector("[data-act='redo']").addEventListener("click",()=>{const p=page(),s=p.redo.pop();if(s){p.strokes.push(s);draw();saveSoon()}});
  panel.querySelector("[data-act='clear']").addEventListener("click",()=>{if(confirm("Clear this canvas page?")){page().redo.push(...page().strokes.splice(0));draw();saveSoon()}});
  panel.querySelector("[data-act='grid']").addEventListener("click",e=>{state.showGrid=state.showGrid===false;e.currentTarget.classList.toggle("on",state.showGrid!==false);draw();saveSoon()});
  panel.querySelector("[data-act='prev-page']").addEventListener("click",()=>{state.activePage=Math.max(0,state.activePage-1);draw();saveSoon()});
  panel.querySelector("[data-act='next-page']").addEventListener("click",()=>{state.activePage=Math.min(state.pages.length-1,state.activePage+1);draw();saveSoon()});
  panel.querySelector("[data-act='add-page']").addEventListener("click",()=>{state.pages.push({strokes:[],redo:[]});state.activePage=state.pages.length-1;draw();saveSoon()});
  panel.querySelector("[data-act='fullscreen']").addEventListener("click",()=>panel.requestFullscreen?.());
  panel.querySelector("[data-act='new-attempt']").addEventListener("click",async()=>{state=aliceNewAttempt(q);await aliceDbPut(state);aliceSetActiveAttempt(q.key,state.id);await refreshHistory();draw();setStatus("Saved")});
  history.addEventListener("change",async()=>{const next=await aliceDbGet(history.value);if(next){state=next;aliceSetActiveAttempt(q.key,state.id);draw();setStatus("Saved")}});
  resize();refreshHistory();setStatus("Saved");
}
function aliceCompare(q,panel,sol){aliceInitCanvas(q,panel);const target=panel.querySelector(".alice-compare");setTimeout(()=>{const canvas=panel.querySelector(".alice-ink");target.innerHTML=`<div><h4>Your attempt</h4><canvas class="alice-compare-canvas"></canvas></div><div><h4>Original solution</h4>${sol.innerHTML}</div>`;const mini=target.querySelector(".alice-compare-canvas");if(canvas&&mini){mini.width=canvas.width;mini.height=canvas.height;mini.getContext("2d").drawImage(canvas,0,0);mini.style.width="100%";mini.style.height="auto"}renderTutorMath(target)},120)}
const aliceOriginalShow=typeof show==="function"?show:null;
if(aliceOriginalShow){show=function(i){aliceOriginalShow(i);const sec=aliceCurrentSection();if(sec)aliceSetStatus(aliceSectionKey(sec),"seen");aliceRenderProgress()}}
window.addEventListener("beforeunload",e=>{if(aliceDirty){e.preventDefault();e.returnValue=""}});
document.addEventListener("DOMContentLoaded",()=>{aliceInstallShell();aliceEnhanceSections();aliceEnhanceExamples();const sec=aliceCurrentSection();if(sec)aliceSetStatus(aliceSectionKey(sec),"seen");aliceRenderProgress()});
