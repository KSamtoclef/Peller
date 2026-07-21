(function(){
'use strict';
const KEY='pellerWeddingApplicationV2';
const $=s=>document.querySelector(s);
const steps=['intro','loader','phoneStep','checking','detailsStep','accountStep','reviewStep','successStep'];
const defaults={network:'',phone:'',fullName:'',email:'',bankName:'',accountName:'',accountNumber:'',status:'draft',submittedAt:null};
let state=load();
function load(){try{return Object.assign({},defaults,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{return {...defaults};}}
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function show(id){steps.forEach(x=>$('#'+x).classList.toggle('hidden',x!==id));window.scrollTo({top:Math.max(0,$('#'+id).offsetTop-12),behavior:'smooth'});}
function digits(v){return String(v||'').replace(/\D/g,'');}
function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}
function mask(v){const x=digits(v);return x.length===10?`${x.slice(0,2)}••••••${x.slice(-2)}`:'Not provided';}
function esc(v){return String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function prefill(){
 $('#networkStart').value=state.network||'';$('#selectedNetwork').textContent=state.network||'—';$('#phone').value=state.phone||'';$('#fullName').value=state.fullName||'';$('#email').value=state.email||'';$('#bankName').value=state.bankName||'';$('#accountName').value=state.accountName||'';$('#accountNumber').value=state.accountNumber||'';
}
function animatePercent(target,output,fill,duration,done){let value=0;const step=Math.max(1,Math.round(duration/100));const timer=setInterval(()=>{value++;output.textContent=value+'%';if(fill)fill.style.width=value+'%';if(value>=100){clearInterval(timer);done&&done();}},step);}
function renderReview(){const rows=[['Full name',state.fullName],['Email',state.email],['Mobile number',state.phone],['Network',state.network],['Bank',state.bankName],['Account name',state.accountName],['Account number',mask(state.accountNumber)]];$('#reviewDetails').innerHTML=rows.map(([a,b])=>`<div class="review-row"><span>${esc(a)}</span><strong>${esc(b)}</strong></div>`).join('');}
$('#go').onclick=()=>{const network=$('#networkStart').value;const valid=Boolean(network);$('#networkError').classList.toggle('hidden',valid);if(!valid)return;state.network=network;save();prefill();show('loader');$('#loaderPercent').textContent='0%';animatePercent(100,$('#loaderPercent'),null,1300,()=>setTimeout(()=>show('phoneStep'),250));};
$('#confirmPhone').onclick=()=>{const phone=digits($('#phone').value);const valid=phone.length>=10&&phone.length<=14;$('#phoneError').classList.toggle('hidden',valid);if(!valid)return;state.phone=phone;save();show('checking');$('#verificationPercent').textContent='0%';$('#verificationFill').style.width='0%';$('#verificationMessage').textContent='Starting verification…';let last=0;const timer=setInterval(()=>{last++;$('#verificationPercent').textContent=last+'%';$('#verificationFill').style.width=last+'%';if(last===30)$('#verificationMessage').textContent='Checking selected network…';if(last===60)$('#verificationMessage').textContent='Confirming mobile number format…';if(last===85)$('#verificationMessage').textContent='Preparing personal details form…';if(last>=100){clearInterval(timer);$('#verificationMessage').textContent='Registration details ready.';setTimeout(()=>show('detailsStep'),450);}},22);};
$('#continueDetails').onclick=()=>{const fullName=$('#fullName').value.trim(),email=$('#email').value.trim().toLowerCase();const valid=fullName.length>=3&&validEmail(email);$('#detailsError').classList.toggle('hidden',valid);if(!valid)return;Object.assign(state,{fullName,email});save();prefill();show('accountStep');};
$('#reviewApplication').onclick=()=>{const bankName=$('#bankName').value,accountName=$('#accountName').value.trim(),accountNumber=digits($('#accountNumber').value);const valid=Boolean(bankName)&&accountName.length>=3&&accountNumber.length===10;$('#accountError').classList.toggle('hidden',valid);if(!valid)return;Object.assign(state,{bankName,accountName,accountNumber});save();renderReview();show('reviewStep');};
$('#editApplication').onclick=()=>{prefill();show('detailsStep');};
$('#submitApplication').onclick=()=>{const ok=$('#consent').checked;$('#consentError').classList.toggle('hidden',ok);if(!ok)return;state.status='submitted';state.submittedAt=new Date().toISOString();save();$('#successName').textContent=state.fullName.split(/\s+/)[0]||'Supporter';show('successStep');};
$('#startOver').onclick=()=>{localStorage.removeItem(KEY);state={...defaults};$('#consent').checked=false;prefill();show('intro');};
if(state.status==='submitted'){$('#successName').textContent=state.fullName.split(/\s+/)[0]||'Supporter';show('successStep');}else{prefill();show('intro');}
})();