(function(){
'use strict';
const KEY='pellerWeddingApplicationV1';
const $=selector=>document.querySelector(selector);
const steps=['offerStep','registrationStep','accountStep','reviewStep','successStep'];
const defaults={network:'',fullName:'',email:'',phone:'',bankName:'',accountName:'',accountNumber:'',status:'draft',submittedAt:null};
let state=load();

function load(){
  try{return Object.assign({},defaults,JSON.parse(localStorage.getItem(KEY)||'{}'));}
  catch{return {...defaults};}
}
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function show(id){
  steps.forEach(step=>$('#'+step).classList.toggle('hidden',step!==id));
  window.scrollTo({top:Math.max(0,$('#'+id).offsetTop-16),behavior:'smooth'});
}
function digits(value){return String(value||'').replace(/\D/g,'');}
function validEmail(value){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);}
function maskAccount(value){
  const clean=digits(value);
  return clean.length===10?`${clean.slice(0,2)}••••••${clean.slice(-2)}`:'Not provided';
}
function escapeHtml(value){
  return String(value||'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function prefill(){
  $('#networkStart').value=state.network||'';
  $('#network').value=state.network||'';
  $('#fullName').value=state.fullName||'';
  $('#email').value=state.email||'';
  $('#phone').value=state.phone||'';
  $('#bankName').value=state.bankName||'';
  $('#accountName').value=state.accountName||'';
  $('#accountNumber').value=state.accountNumber||'';
}
function renderReview(){
  const rows=[
    ['Full name',state.fullName],
    ['Email',state.email],
    ['Mobile number',state.phone],
    ['Network',state.network],
    ['Bank',state.bankName],
    ['Account name',state.accountName],
    ['Account number',maskAccount(state.accountNumber)]
  ];
  $('#reviewDetails').innerHTML=rows.map(([label,value])=>`<div class="review-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join('');
}

$('#startRegistration').addEventListener('click',()=>{
  const network=$('#networkStart').value;
  if(!network){alert('Select your network first.');return;}
  state.network=network;
  save();
  prefill();
  show('registrationStep');
});

$('#registrationForm').addEventListener('submit',event=>{
  event.preventDefault();
  const fullName=$('#fullName').value.trim();
  const email=$('#email').value.trim().toLowerCase();
  const phone=digits($('#phone').value);
  const network=$('#network').value;
  const valid=fullName.length>=3&&validEmail(email)&&phone.length>=10&&phone.length<=14&&network;
  $('#registrationError').classList.toggle('hidden',valid);
  if(!valid)return;
  Object.assign(state,{fullName,email,phone,network,status:'draft'});
  save();
  prefill();
  show('accountStep');
});

$('#accountForm').addEventListener('submit',event=>{
  event.preventDefault();
  const bankName=$('#bankName').value;
  const accountName=$('#accountName').value.trim();
  const accountNumber=digits($('#accountNumber').value);
  const valid=Boolean(bankName)&&accountName.length>=3&&accountNumber.length===10;
  $('#accountError').classList.toggle('hidden',valid);
  if(!valid)return;
  Object.assign(state,{bankName,accountName,accountNumber,status:'draft'});
  save();
  renderReview();
  show('reviewStep');
});

$('#editApplication').addEventListener('click',()=>{
  prefill();
  show('registrationStep');
});

$('#submitApplication').addEventListener('click',()=>{
  const confirmed=$('#consent').checked;
  $('#consentError').classList.toggle('hidden',confirmed);
  if(!confirmed)return;
  state.status='submitted';
  state.submittedAt=new Date().toISOString();
  save();
  $('#successName').textContent=state.fullName.split(/\s+/)[0]||'Supporter';
  show('successStep');
});

$('#startOver').addEventListener('click',()=>{
  localStorage.removeItem(KEY);
  state={...defaults};
  $('#consent').checked=false;
  prefill();
  show('offerStep');
});

if(state.status==='submitted'){
  $('#successName').textContent=state.fullName.split(/\s+/)[0]||'Supporter';
  show('successStep');
}else{
  prefill();
  show('offerStep');
}
})();