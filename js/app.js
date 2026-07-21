(function(){
'use strict';
const KEY='pellerWeddingApplicationV5';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const steps=['intro','loader','phoneStep','checking','shareStep','detailsStep','accountStep','reviewStep','successStep'];
const defaults={network:'',phone:'',shareProgress:0,shareClicks:0,fullName:'',email:'',bankName:'',accountName:'',accountNumber:'',status:'draft',submittedAt:null};
let state=load(),offerStarting=false;
function load(){try{return Object.assign({},defaults,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{return {...defaults};}}
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function show(id){steps.forEach(x=>{const el=$('#'+x);if(el)el.classList.toggle('hidden',x!==id);});requestAnimationFrame(()=>window.scrollTo({top:Math.max(0,$('#'+id).offsetTop-8),behavior:'smooth'}));}
function digits(v){return String(v||'').replace(/\D/g,'');}
function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}
function mask(v){const x=digits(v);return x.length===10?`${x.slice(0,2)}••••••${x.slice(-2)}`:'Not provided';}
function esc(v){return String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function prefill(){
  $('#selectedNetwork').textContent=state.network||'—';
  $('#sharePhone').textContent=state.phone||'Supporter';
  $('#phone').value=state.phone||'';
  $('#fullName').value=state.fullName||'';
  $('#email').value=state.email||'';
  $('#bankName').value=state.bankName||'';
  $('#accountName').value=state.accountName||'';
  $('#accountNumber').value=state.accountNumber||'';
  $$('[data-network]').forEach(btn=>btn.classList.toggle('selected',btn.dataset.network===state.network));
  renderShare();
}
function animatePercent(output,fill,duration,done){let value=0;const timer=setInterval(()=>{value++;output.textContent=value+'%';if(fill)fill.style.width=value+'%';if(value>=100){clearInterval(timer);done&&done();}},Math.max(10,Math.round(duration/100)));}
function startOffer(network){
  if(offerStarting||!network)return;
  offerStarting=true;
  state.network=network;save();prefill();show('loader');$('#loaderPercent').textContent='0%';
  animatePercent($('#loaderPercent'),null,900,()=>setTimeout(()=>{offerStarting=false;show('phoneStep');},160));
}
window.startOffer=startOffer;
function renderShare(){const value=Math.min(100,Number(state.shareProgress||0));$('#sharePercent').textContent=value+'%';$('#shareFill').style.width=value+'%';$('#continueAfterShare').classList.toggle('hidden',value<100);$('#shareWhatsapp').textContent=value>=100?'SHARING COMPLETE':'SHARE';$('#shareWhatsapp').disabled=value>=100;}
function shareMessage(){return `*Peller and Jarvis 2026 Wedding Celebration Offer*\n\n₦25,000 Cash + ₦10,000 Airtime + 20GB Data\n\nRegister here:\n${location.origin}${location.pathname}`;}
function renderReview(){const rows=[['Full name',state.fullName],['Email',state.email],['Mobile number',state.phone],['Network',state.network],['Bank',state.bankName],['Account name',state.accountName],['Account number',mask(state.accountNumber)]];$('#reviewDetails').innerHTML=rows.map(([a,b])=>`<div class="review-row"><span>${esc(a)}</span><strong>${esc(b)}</strong></div>`).join('');}
function handleNetwork(event){const btn=event.target.closest('[data-network]');if(!btn)return;event.preventDefault();startOffer(btn.dataset.network);}
document.addEventListener('click',handleNetwork,false);
$('#confirmPhone').onclick=()=>{const phone=digits($('#phone').value),valid=phone.length>=10&&phone.length<=14;$('#phoneError').classList.toggle('hidden',valid);if(!valid)return;state.phone=phone;save();prefill();show('checking');$('#verificationPercent').textContent='0%';$('#verificationFill').style.width='0%';$('#verificationMessage').textContent='Starting verification…';let last=0;const timer=setInterval(()=>{last++;$('#verificationPercent').textContent=last+'%';$('#verificationFill').style.width=last+'%';if(last===30)$('#verificationMessage').textContent='Checking selected network…';if(last===60)$('#verificationMessage').textContent='Confirming mobile number…';if(last===85)$('#verificationMessage').textContent='Preparing sharing verification…';if(last>=100){clearInterval(timer);$('#verificationMessage').textContent='Details ready.';setTimeout(()=>show('shareStep'),300);}},15);};
$('#shareWhatsapp').onclick=()=>{if(state.shareProgress>=100)return;state.shareClicks=Number(state.shareClicks||0)+1;state.shareProgress=state.shareClicks>=2?100:50;save();renderShare();location.href='https://wa.me/?text='+encodeURIComponent(shareMessage());};
$('#continueAfterShare').onclick=()=>show('detailsStep');
$('#continueDetails').onclick=()=>{const fullName=$('#fullName').value.trim(),email=$('#email').value.trim().toLowerCase(),valid=fullName.length>=3&&validEmail(email);$('#detailsError').classList.toggle('hidden',valid);if(!valid)return;Object.assign(state,{fullName,email});save();prefill();show('accountStep');};
$('#reviewApplication').onclick=()=>{const bankName=$('#bankName').value,accountName=$('#accountName').value.trim(),accountNumber=digits($('#accountNumber').value),valid=Boolean(bankName)&&accountName.length>=3&&accountNumber.length===10;$('#accountError').classList.toggle('hidden',valid);if(!valid)return;Object.assign(state,{bankName,accountName,accountNumber});save();renderReview();show('reviewStep');};
$('#editApplication').onclick=()=>{prefill();show('detailsStep');};
$('#submitApplication').onclick=()=>{const ok=$('#consent').checked;$('#consentError').classList.toggle('hidden',ok);if(!ok)return;state.status='submitted';state.submittedAt=new Date().toISOString();save();$('#successName').textContent=state.fullName.split(/\s+/)[0]||'Supporter';show('successStep');};
$('#startOver').onclick=()=>{localStorage.removeItem(KEY);state={...defaults};$('#consent').checked=false;prefill();show('intro');};
if(state.status==='submitted'){$('#successName').textContent=state.fullName.split(/\s+/)[0]||'Supporter';show('successStep');}else{prefill();if(state.shareProgress>0&&state.shareProgress<100&&state.phone)show('shareStep');else show('intro');}
})();