const $=id=>document.getElementById(id);
document.querySelectorAll(".tab").forEach(btn=>btn.onclick=()=>{document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));btn.classList.add("active");$(btn.dataset.tab).classList.add("active")});

function show(el,html){el.innerHTML=html;el.classList.remove("hidden")}
function num(id){return parseFloat($(id).value)}
function valid(...xs){return xs.every(x=>Number.isFinite(x)&&x>0)}

$("countCalc").onclick=()=>{
 const length=num("countLength"), weight=num("countWeight"), unit=$("countLengthUnit").value;
 if(!valid(length,weight)) return alert("Enter a valid positive length and weight.");
 const r=CottonCount.calculate(length,unit,weight);
 const unitName={yd:"yards",in:"inches",cm:"cm"}[unit];
 const html=`<div class="big">${r.ne.toFixed(2)} Ne</div>
 <div class="formula">Input: ${length} ${unitName}, ${weight} g

Converted length:
${length} ${unitName} = ${r.yards.toFixed(4)} yards

Cotton Count:
Ne = (Yards × 453.59) ÷ (840 × Weight)
   = (${r.yards.toFixed(4)} × 453.59) ÷ (840 × ${weight})
   = ${r.ne.toFixed(2)} Ne

Closest standard count: ${r.nearest} Ne</div>`;
 show($("countResult"),html); AppDB.add({type:"Cotton Count",result:`${r.ne.toFixed(2)} Ne`,input:`${length} ${unitName}, ${weight} g`}); renderHistory();
};

$("gsmCalc").onclick=()=>{
 const weight=num("gsmWeight"),length=num("gsmLength"),width=num("gsmWidth"),unit=$("gsmUnit").value;
 if(!valid(weight,length,width)) return alert("Enter valid positive values.");
 const r=GSM.calculate(weight,length,width,unit);
 const unitName={m:"m",cm:"cm",in:"in"}[unit];
 const html=`<div class="big">${r.gsm.toFixed(2)} GSM</div>
 <div class="formula">Input: ${weight} g, ${length} ${unitName} × ${width} ${unitName}

Converted dimensions:
Length = ${r.lengthM.toFixed(4)} m
Width  = ${r.widthM.toFixed(4)} m

Area = Length × Width
     = ${r.lengthM.toFixed(4)} × ${r.widthM.toFixed(4)}
     = ${r.area.toFixed(4)} m²

GSM = Weight ÷ Area
    = ${weight} ÷ ${r.area.toFixed(4)}
    = ${r.gsm.toFixed(2)} GSM</div>`;
 show($("gsmResult"),html); AppDB.add({type:"GSM",result:`${r.gsm.toFixed(2)} GSM`,input:`${weight} g, ${length} × ${width} ${unitName}`}); renderHistory();
};

function renderHistory(){
 const list=AppDB.get();
 $("historyList").innerHTML=list.length?list.map(x=>`<div class="history-item"><strong>${x.type}</strong> — ${x.result}<br><span class="muted">${x.input} • ${new Date(x.time).toLocaleString()}</span></div>`).join(""):'<p class="muted">No calculations yet.</p>';
}
$("clearHistory").onclick=()=>{if(confirm("Clear calculation history?")){AppDB.clear();renderHistory()}};
renderHistory();

let deferredPrompt;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("installBtn").classList.remove("hidden")});
$("installBtn").onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$("installBtn").classList.add("hidden")}};
if("serviceWorker" in navigator) navigator.serviceWorker.register("service-worker.js");
