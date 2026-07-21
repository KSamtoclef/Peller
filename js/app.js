(function(){
'use strict';

const CONFIG=window.CELEBRATION_CONFIG;
const STORAGE_KEY='pellerCelebrationV2';
const SESSION_KEY='pellerCelebrationSession';
const $=(s)=>document.querySelector(s);
const $$=(s)=>[...document.querySelectorAll(s)];
const money=(n)=>'₦'+Number(n||0).toLocaleString('en-NG');
const placeholder=(url)=>!url||url.includes('PASTE_');
const previewMode=new URLSearchParams(location.search).get('preview')==='1';

const defaultState={
  onboarded:false,firstName:'',email:'',phone:'',network:'',
  day:1,earned:0,dailyEarned:{1:0,2:0,3:0},
  completed:{},pending:{},answers:{},referrals:0,assigned:{},
  sharedDays:{1:false,2:false,3:false},
  streak:1,eligibilitySubmitted:false,referralCode:'',referredBy:'',
  history:[],nextDayAt:null,activeView:'home'
};

function loadState(){
  try{return Object.assign({},defaultState,JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'));}
  catch{return structuredClone(defaultState);}
}

let state=loadState();
state.dailyEarned=Object.assign({1:0,2:0,3:0},state.dailyEarned||{});
state.sharedDays=Object.assign({1:false,2:false,3:false},state.sharedDays||{});
state.completed=state.completed||{};
state.pending=state.pending||{};
state.answers=state.answers||{};
state.assigned=state.assigned||{};
state.history=Array.isArray(state.history)?state.history:[];

const incomingRef=new URLSearchParams(location.search).get('ref');
if(incomingRef&&!state.referredBy)state.referredBy=incomingRef.slice(0,40);

const save=()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
function log(type,details={}){
  state.history.push({type,details,at:new Date().toISOString()});
  state.history=state.history.slice(-150);
  save();
}

function taskDay(task){
  for(let d=1;d<=3;d++){
    if((CONFIG.tasks['day'+d]||[]).some(item=>item.id===task.id))return d;
  }
  return state.day;
}

function dayTasks(day=state.day){
  const key='day'+day;
  const tasks=(CONFIG.tasks[key]||[]).filter(task=>task.active);
  const ids=tasks.map(task=>task.id);
  const stored=state.assigned[key]||[];
  const valid=stored.length===ids.length&&stored.every(id=>ids.includes(id));
  if(!valid){
    state.assigned[key]=ids;
    save();
  }
  return state.assigned[key].map(id=>tasks.find(task=>task.id===id)).filter(Boolean);
}

function findTask(id){
  for(let d=1;d<=3;d++){
    const task=(CONFIG.tasks['day'+d]||[]).find(item=>item.id===id);
    if(task)return task;
  }
  return null;
}

function referralTask(day=state.day){
  return dayTasks(day).find(task=>task.category==='referral');
}

function openingTasks(day=state.day){
  return dayTasks(day).filter(task=>task.stage==='opening');
}

function afterShareTasks(day=state.day){
  return dayTasks(day).filter(task=>task.stage==='after_share');
}

function openingComplete(day=state.day){
  return openingTasks(day).every(task=>state.completed[task.id]);
}

function dayActivitiesFinished(day=state.day){
  return openingComplete(day)&&Boolean(state.sharedDays[day])&&afterShareTasks(day).every(task=>state.completed[task.id]);
}

function currentLevel(){
  const levels=[
    {name:'Celebration Guest',min:0},
    {name:'Official Fan',min:1},
    {name:'Gold Fan',min:4},
    {name:'VIP Wedding Fan',min:8},
    {name:'Wedding Legend',min:12}
  ];
  const count=Object.keys(state.completed).length;
  return [...levels].reverse().find(level=>count>=level.min)||levels[0];
}

function nextLevelHint(){
  const levels=[
    {name:'Celebration Guest',min:0},
    {name:'Official Fan',min:1},
    {name:'Gold Fan',min:4},
    {name:'VIP Wedding Fan',min:8},
    {name:'Wedding Legend',min:12}
  ];
  const count=Object.keys(state.completed).length;
  const next=levels.find(level=>level.min>count);
  if(!next)return 'You reached Wedding Legend level.';
  const left=next.min-count;
  return `Complete ${left} more ${left===1?'activity':'activities'} to become a ${next.name}.`;
}

function referralReady(task){
  const day=taskDay(task);
  return Boolean(state.sharedDays[day])&&state.referrals>=(task.requiredReferrals||1);
}

function syncReferralCredits(){
  for(let day=1;day<=3;day++){
    const task=referralTask(day);
    if(task&&!state.completed[task.id]&&referralReady(task)){
      creditActivity(task,{silent:true});
    }
  }
}

function rawStatus(task){
  if(state.completed[task.id])return 'completed';
  if(task.category==='referral'){
    const day=taskDay(task);
    if(!openingComplete(day))return 'locked';
    if(!state.sharedDays[day])return 'available';
    if(state.referrals<(task.requiredReferrals||1))return 'fans_pending';
    return 'available';
  }
  if(task.stage==='after_share'&&!state.sharedDays[taskDay(task)])return 'locked';
  if(state.pending[task.id])return 'pending';
  if(placeholder(task.url)&&['return_and_quiz','approved_callback'].includes(task.verificationType))return 'config';
  return 'available';
}

function statusFor(task){
  const status=rawStatus(task);
  return {
    completed:'Activity Complete 🎉',
    pending:'Under Review',
    config:'Opens Soon',
    locked:'Locked',
    fans_pending:'Fans Pending',
    available:'Ready'
  }[status]||'Ready';
}

function taskIcon(task){
  return {peller:'🔥',jarvis:'💍',couple:'❤️',creative:'✨',referral:'👥',sponsored:'🎁',review:'🏆'}[task.category]||'🎉';
}

function allRequiredCompleted(){
  return [1,2,3].every(day=>dayTasks(day).filter(task=>task.required).every(task=>state.completed[task.id]));
}

function nextAvailable(){
  const opening=openingTasks().find(task=>rawStatus(task)==='available');
  if(opening)return opening;
  const referral=referralTask();
  if(referral&&!state.sharedDays[state.day])return referral;
  return afterShareTasks().find(task=>rawStatus(task)==='available')||null;
}

function journeyPhase(){
  if(!openingComplete())return 'earn';
  if(!state.sharedDays[state.day])return 'invite';
  if(!dayActivitiesFinished())return 'bonus';
  return 'goal';
}

function setJourneySteps(){
  const order=['joined','earn','invite','bonus','goal'];
  const phase=journeyPhase();
  const current=order.indexOf(phase);
  $$('.journey-step').forEach(element=>{
    const index=order.indexOf(element.dataset.step);
    element.classList.toggle('done',index<current||element.dataset.step==='joined');
    element.classList.toggle('current',index===current);
  });
  $('#journeyStepText').textContent={
    earn:'Earn Today',
    invite:'Invite Fans',
    bonus:'Complete Activities',
    goal:'Daily Journey Complete'
  }[phase]||'Earn Today';
}

function maybeAdvanceDay(){
  if(state.nextDayAt&&Date.now()>=state.nextDayAt&&state.day<3){
    state.day+=1;
    state.streak=Math.max(state.streak,state.day);
    state.nextDayAt=null;
    state.activeView='home';
    log('day_opened',{day:state.day});
  }
}

function setNextDayCountdown(){
  if(dayActivitiesFinished()&&state.day<3&&!state.nextDayAt){
    const next=new Date();
    next.setHours(24,0,0,0);
    state.nextDayAt=next.getTime();
    save();
  }
}

function renderCountdown(){
  const element=$('#nextSession span');
  if(!element||!state.nextDayAt)return;
  const diff=Math.max(0,state.nextDayAt-Date.now());
  const hours=String(Math.floor(diff/3600000)).padStart(2,'0');
  const minutes=String(Math.floor(diff%3600000/60000)).padStart(2,'0');
  const seconds=String(Math.floor(diff%60000/1000)).padStart(2,'0');
  element.textContent=`Day ${state.day+1} opens in ${hours}:${minutes}:${seconds}`;
  if(diff===0){maybeAdvanceDay();render();}
}

function prefillIdentity(){
  if(state.firstName)$('#firstName').value=state.firstName;
  if(state.email)$('#email').value=state.email;
  if(state.phone)$('#phone').value=state.phone;
  if(state.network)$('#network').value=state.network;
}

function escapeText(value){
  return String(value||'').replace(/[&<>'"]/g,char=>({
    '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'
  }[char]));
}

function render(){
  maybeAdvanceDay();
  syncReferralCredits();
  setNextDayCountdown();

  const needsIdentity=!state.onboarded||!state.firstName||!state.email;
  if(needsIdentity){
    $('#onboarding').classList.remove('hidden');
    $('#dashboard').classList.add('hidden');
    $('#bottomNav').classList.add('hidden');
    prefillIdentity();
    return;
  }

  $('#onboarding').classList.add('hidden');
  $('#dashboard').classList.remove('hidden');
  $('#bottomNav').classList.remove('hidden');

  const cap=CONFIG.campaign.dailyCaps[state.day];
  const today=state.dailyEarned[state.day];
  const reached=today>=cap;
  const level=currentLevel();
  const ref=referralTask();
  const referralRequired=ref?.requiredReferrals||3;
  const referralPending=ref&&!state.completed[ref.id]&&state.sharedDays[state.day];

  $('#currentDay').textContent=state.day;
  $('#dayPill').textContent=state.day;
  $('#activityDay').textContent=state.day;
  $('#welcomeName').textContent=`Welcome${state.day>1?' back':''}, ${state.firstName} ${state.day>1?'🔥':'🎉'}`;
  $('#dayMessage').textContent=`Earn up to ${money(cap)} today and keep your 3-day journey moving.`;

  $('#cashEarned').textContent=money(state.earned);
  $('#cashBar').style.width=Math.min(100,state.earned/CONFIG.campaign.cashTarget*100)+'%';
  $('#dailyProgress').textContent=`${money(today)} of ${money(cap)}`;
  $('#dailyBar').style.width=Math.min(100,today/cap*100)+'%';

  if(reached){
    $('#dailyHint').textContent='Today’s earning goal complete 🎉';
  }else if(dayActivitiesFinished()&&referralPending){
    $('#dailyHint').textContent=`Activities complete. ${money(ref.reward)} fan reward is still pending.`;
  }else{
    $('#dailyHint').textContent=`${money(cap-today)} remains in today’s published goal.`;
  }

  $('#supporterLevel').textContent=level.name;
  $('#levelHint').textContent=nextLevelHint();
  $('#referralProgress').textContent=`${state.referrals} of ${referralRequired}`;
  $('#airtimeStatus').textContent=state.eligibilitySubmitted?'Submitted':'In Progress';
  $('#dataStatus').textContent=state.eligibilitySubmitted?'Submitted':'In Progress';

  renderFanIcons();
  setJourneySteps();
  renderActivities();
  renderNextMove();

  const finished=dayActivitiesFinished();
  $('#nextSession').classList.toggle('hidden',!finished||state.day===3);
  if(finished&&state.day<3){
    $('#goalCompleteText').textContent=reached
      ?`You reached ${money(cap)} today.`
      :`Today’s activities are complete. Your qualified-fan reward remains pending.`;
  }

  const eligible=state.day===3&&allRequiredCompleted()&&state.earned>=CONFIG.campaign.cashTarget;
  $('#eligibility').classList.toggle('hidden',!eligible);
  applyView(state.activeView||'home',false);

  if(previewMode)$('#adminPreview').classList.remove('hidden');
  else $('#adminPreview').classList.add('hidden');
}

function renderFanIcons(){
  const task=referralTask();
  const required=task?.requiredReferrals||3;
  $('#fanIcons').innerHTML=Array.from({length:required},(_,index)=>
    `<span class="fan-icon ${index<state.referrals?'joined':''}">${index<state.referrals?'✅':'○'} Fan ${index+1}</span>`
  ).join('');

  const remaining=Math.max(0,required-state.referrals);
  if(!state.sharedDays[state.day]){
    $('#inviteHint').textContent='Share today’s invitation to unlock the remaining activities. Qualified fans can join later.';
  }else if(remaining===0){
    $('#inviteHint').textContent=`FAN MILESTONE COMPLETE 🎉 ${money(task?.reward||0)} has been added after verification.`;
  }else{
    $('#inviteHint').textContent=`Invitation step complete. ${remaining} more qualified ${remaining===1?'fan':'fans'} needed for ${money(task?.reward||0)}.`;
  }
}

function renderNextMove(){
  const phase=journeyPhase();
  const task=nextAvailable();

  if(phase==='invite'){
    const ref=referralTask();
    $('#nextMoveIcon').textContent='👥';
    $('#nextMoveTitle').textContent=ref?.title||'Bring More Fans Into the Celebration';
    $('#nextMoveDescription').textContent='Share today’s invitation now. Your remaining activities unlock immediately; qualified fans may join later.';
    $('#nextMoveMeta').textContent=`${state.referrals} of ${ref?.requiredReferrals||3} qualified fans`;
    $('#nextMoveReward').textContent=`Pending reward ${money(ref?.reward||0)}`;
    $('#continueEarning').textContent='INVITE FANS';
    $('#continueEarning').dataset.action='invite';
    delete $('#continueEarning').dataset.task;
    return;
  }

  if(phase==='goal'){
    const ref=referralTask();
    const pending=ref&&!state.completed[ref.id];
    $('#nextMoveIcon').textContent=pending?'⏳':'🎉';
    $('#nextMoveTitle').textContent=pending?'Today’s Activities Complete':'Today’s Goal Complete';
    $('#nextMoveDescription').textContent=pending
      ?`Your ${money(ref.reward)} fan reward will be added when ${ref.requiredReferrals} cumulative qualified fans are confirmed.`
      :`You reached today’s published earning goal.`;
    $('#nextMoveMeta').textContent=state.day<3?'Your next celebration day opens automatically.':'Review your final reward journey.';
    $('#nextMoveReward').textContent=pending?`${state.referrals} of ${ref.requiredReferrals} fans`:'You did it';
    $('#continueEarning').textContent='VIEW MY PROGRESS';
    $('#continueEarning').dataset.action='progress';
    delete $('#continueEarning').dataset.task;
    return;
  }

  if(task){
    $('#nextMoveIcon').textContent=taskIcon(task);
    $('#nextMoveTitle').textContent=task.title.replace(/Task/gi,'Opportunity');
    $('#nextMoveDescription').textContent=task.description;
    $('#nextMoveMeta').textContent=`About ${task.estimatedMinutes} minutes`;
    $('#nextMoveReward').textContent=`Earn ${money(task.reward)}`;
    $('#continueEarning').textContent=task.category==='sponsored'?'VIEW OPPORTUNITY':'START CHALLENGE';
    $('#continueEarning').dataset.action='activity';
    $('#continueEarning').dataset.task=task.id;
    return;
  }

  $('#nextMoveIcon').textContent='⏳';
  $('#nextMoveTitle').textContent='You’re All Caught Up';
  $('#nextMoveDescription').textContent='Your progress is saved.';
  $('#nextMoveMeta').textContent='Keep checking your fan progress';
  $('#nextMoveReward').textContent='You’re getting closer';
  $('#continueEarning').textContent='VIEW MY PROGRESS';
  $('#continueEarning').dataset.action='progress';
  delete $('#continueEarning').dataset.task;
}

function friendlyType(type){
  return ({
    quiz_completed:'Quick quiz',
    prediction:'Fan prediction',
    prediction_submitted:'Fan prediction',
    return_and_quiz:'Approved action + follow-up',
    verified_referral:'Qualified fan milestone',
    manual_review:'Review required',
    message_submitted:'Fan caption',
    supporter_card_created:'Supporter card',
    approved_callback:'Verified opportunity'
  })[type]||'Celebration activity';
}

function renderActivities(){
  $('#taskList').innerHTML=dayTasks().map(task=>{
    const raw=rawStatus(task);
    const status=statusFor(task);
    const disabled=['completed','pending','config','locked'].includes(raw);
    const statusClass=raw==='completed'?'completed':(raw==='pending'||raw==='fans_pending')?'pending':'';
    let action='LET’S GO';
    if(raw==='completed')action='COMPLETED';
    else if(raw==='pending')action='UNDER REVIEW';
    else if(raw==='config')action='OPENS SOON';
    else if(raw==='locked')action='LOCKED';
    else if(raw==='fans_pending')action='VIEW FAN PROGRESS';
    else if(task.category==='referral')action='INVITE FANS';
    else if(task.category==='sponsored')action='VIEW OPPORTUNITY';

    const rewardLabel=raw==='fans_pending'?`${money(task.reward)} pending`:`Earn ${money(task.reward)}`;
    return `<article class="task-card">
      <div class="activity-icon">${taskIcon(task)}</div>
      <div>
        <span class="status-pill ${statusClass}">${status}</span>
        <h3>${escapeText(task.title.replace(/Task/gi,'Opportunity'))}</h3>
        <p>${escapeText(task.description)}</p>
        <div class="activity-meta"><span>⏱ ${task.estimatedMinutes} min</span><span>${friendlyType(task.verificationType)}</span></div>
        ${raw==='config'?'<div class="config-warning">The approved destination will be added before launch.</div>':''}
      </div>
      <div class="activity-side">
        <strong>${rewardLabel}</strong>
        <button class="task-action" data-task="${task.id}" ${disabled?'disabled':''}>${action}</button>
      </div>
    </article>`;
  }).join('');

  $$('[data-task]').forEach(button=>{
    const task=findTask(button.dataset.task);
    if(!task)return;
    if(rawStatus(task)==='fans_pending'){
      button.disabled=false;
      button.onclick=()=>applyView('invite');
    }else if(task.category==='referral'&&rawStatus(task)==='available'){
      button.onclick=()=>applyView('invite');
    }else{
      button.onclick=()=>openActivity(task.id);
    }
  });
}

function openActivity(id){
  const task=findTask(id);
  if(!task||['locked','completed','config'].includes(rawStatus(task)))return;
  if(task.category==='referral'){applyView('invite');return;}

  let body=`<span class="eyebrow">${escapeText((task.label||task.category).replace(/task/gi,'opportunity').toUpperCase())}</span>
    <h2>${escapeText(task.title.replace(/Task/gi,'Opportunity'))}</h2>
    <p>${escapeText(task.description)}</p>
    <div class="activity-meta"><span>About ${task.estimatedMinutes} minutes</span><span>Earn ${money(task.reward)}</span></div>`;

  if(task.url&&!placeholder(task.url)){
    body+=`<div class="question-block"><strong>Before you leave</strong><p>Complete the published action on the approved page, return here, then finish the follow-up. Opening the page alone does not complete this activity.</p></div>
      <button class="secondary-btn" id="externalActivityOpen">OPEN APPROVED OPPORTUNITY</button>`;
  }

  if(task.verificationType==='prediction')body+=predictionForm(task);
  else if(task.verificationType.includes('quiz'))body+=quizForm(task);
  else if(task.verificationType==='message_submitted')body+=`<label>Your wedding caption</label><textarea id="activityMessage" rows="5" minlength="${task.minimumLength||35}" placeholder="Write a lively and respectful caption..."></textarea>`;
  else if(task.verificationType==='supporter_card_created')body+=`<label>Name on supporter card</label><input id="cardName" value="${escapeText(state.firstName)}"/><label>Your final prediction</label><input id="cardPrediction" placeholder="Your wedding prediction"/>`;
  else if(task.verificationType==='manual_review')body+=`<div class="question-block"><p>Review your journey and submit it for administrator review.</p></div>`;

  body+=`<button id="completeActivity" class="primary-btn">COMPLETE ACTIVITY</button>`;
  $('#taskModalBody').innerHTML=body;
  $('#taskModal').classList.remove('hidden');

  const external=$('#externalActivityOpen');
  if(external){
    external.onclick=()=>{
      window.open(task.url,'_blank','noopener');
      sessionStorage.setItem('returned:'+task.id,'opened');
      log('external_activity_open',{activityId:task.id});
    };
  }
  $('#completeActivity').onclick=()=>completeActivity(task);
}

function predictionForm(task){
  return `<div class="question-block"><strong>${escapeText(task.question)}</strong>${
    (task.options||[]).map(option=>`<label><input type="radio" name="prediction" value="${escapeText(option)}"> ${escapeText(option)}</label>`).join('')
  }</div>`;
}

function quizForm(task){
  const count=task.requiredAnswers||3;
  return Array.from({length:count},(_,index)=>`<div class="question-block">
    <strong>Question ${index+1}</strong>
    <p>${quizQuestion(task.category,index)}</p>
    <label><input type="radio" name="q${index}" value="a"> Option A</label>
    <label><input type="radio" name="q${index}" value="b"> Option B</label>
  </div>`).join('');
}

function quizQuestion(category,index){
  const sets={
    peller:['Which featured moment stood out most?','What quality best describes the featured story?','Which celebration detail was highlighted?','Which fan value was most visible?','Which moment would you share?'],
    jarvis:['Which style option was featured?','Which colour best matches the theme?','What detail made the look distinctive?'],
    couple:['Which colour is central to the campaign?','What year is the celebration?','Which activity is part of the fan journey?','What is the data reward shown?','Which couple is being celebrated?','What is the cash goal?','What is the airtime amount?','How many celebration days are included?']
  };
  const group=sets[category]||sets.couple;
  return group[index%group.length];
}

function completeActivity(task){
  if(state.completed[task.id])return;

  if(task.verificationType==='prediction'){
    const selected=document.querySelector('input[name=prediction]:checked');
    if(!selected)return alert('Make one prediction first.');
    state.answers[task.id]=selected.value;
  }

  if(task.verificationType.includes('quiz')){
    for(let index=0;index<(task.requiredAnswers||3);index++){
      if(!document.querySelector(`input[name=q${index}]:checked`))return alert('Answer every question before continuing.');
    }
    if(task.url&&!placeholder(task.url)&&!sessionStorage.getItem('returned:'+task.id)){
      return alert('Open the approved opportunity first, then return to finish the follow-up.');
    }
  }

  if(task.verificationType==='message_submitted'){
    const value=$('#activityMessage').value.trim();
    if(value.length<(task.minimumLength||35))return alert('Please write a slightly longer caption.');
    state.answers[task.id]=value;
  }

  if(task.verificationType==='supporter_card_created'){
    if(!$('#cardName').value.trim()||!$('#cardPrediction').value.trim())return alert('Complete both supporter-card fields.');
    state.answers[task.id]={name:$('#cardName').value.trim(),prediction:$('#cardPrediction').value.trim()};
  }

  if(task.verificationType==='manual_review'){
    state.pending[task.id]=true;
    log('activity_pending',{activityId:task.id,reason:'manual_review'});
    closeActivity();
    render();
    return alert('Submitted for review.');
  }

  creditActivity(task);
}

function creditActivity(task,{silent=false}={}){
  if(state.completed[task.id])return;
  const day=taskDay(task);
  const cap=CONFIG.campaign.dailyCaps[day];
  const remaining=Math.max(0,cap-state.dailyEarned[day]);
  const credit=Math.min(task.reward,remaining);
  state.completed[task.id]={completedAt:new Date().toISOString(),credit};
  delete state.pending[task.id];
  state.dailyEarned[day]+=credit;
  state.earned=Math.min(CONFIG.campaign.cashTarget,state.earned+credit);
  log('activity_completed',{activityId:task.id,day,credit});
  closeActivity();
  if(!silent)setTimeout(()=>alert(`Activity Complete 🎉\n${money(credit)} added to your celebration progress.`),50);
}

function closeActivity(){$('#taskModal').classList.add('hidden');}

function applyView(view,scroll=true){
  state.activeView=view;
  save();
  $$('[data-view]').forEach(element=>{
    const views=element.dataset.view.split(' ');
    element.classList.toggle('hidden',!views.includes(view));
  });
  $$('[data-nav]').forEach(button=>button.classList.toggle('active',button.dataset.nav===view));
  if(scroll){
    const target=document.querySelector(`[data-view~="${view}"]`);
    window.scrollTo({top:view==='home'?0:Math.max(0,(target?.offsetTop||0)-15),behavior:'smooth'});
  }
}

function referralLink(){
  if(!state.referralCode){
    state.referralCode='PJ-'+(state.firstName||'FAN').slice(0,5).toUpperCase()+'-'+Math.floor(1000+Math.random()*9000);
    save();
  }
  return location.origin+location.pathname+'?ref='+encodeURIComponent(state.referralCode);
}

function markShared(method){
  if(!state.sharedDays[state.day]){
    state.sharedDays[state.day]=true;
    log('daily_invitation_shared',{day:state.day,method});
    render();
    setTimeout(()=>alert('Invitation step complete 🎉\nYour remaining activities are now unlocked. Qualified-fan rewards stay pending until verified.'),150);
  }else{
    log('daily_invitation_reopened',{day:state.day,method});
  }
}

$('#joinForm').onsubmit=(event)=>{
  event.preventDefault();
  const firstName=$('#firstName').value.trim();
  const email=$('#email').value.trim().toLowerCase();
  const phone=$('#phone').value.replace(/\D/g,'');
  const network=$('#network').value;
  const validEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if(firstName.length<2||!validEmail||phone.length<10||!network){
    $('#joinError').classList.remove('hidden');
    return;
  }

  Object.assign(state,{firstName,email,phone,network,onboarded:true});
  if(!state.referralCode){
    state.referralCode='PJ-'+firstName.replace(/[^a-z0-9]/gi,'').slice(0,5).toUpperCase()+'-'+Math.floor(1000+Math.random()*9000);
  }
  log('joined_celebration',{network,referredBy:state.referredBy||null});
  render();
  setTimeout(()=>{
    const next=nextAvailable();
    if(next&&next.category!=='referral')openActivity(next.id);
  },450);
};

$$('#joinForm input,#joinForm select').forEach(element=>{
  element.oninput=()=>$('#joinError').classList.add('hidden');
});

$('#continueEarning').onclick=()=>{
  const action=$('#continueEarning').dataset.action;
  if(action==='invite')return applyView('invite');
  if(action==='progress')return applyView('rewards');
  const id=$('#continueEarning').dataset.task;
  if(id)openActivity(id);
};

$('#copyReferral').onclick=async()=>{
  const link=referralLink();
  try{
    await navigator.clipboard.writeText(link);
    alert('Your celebration link has been copied. Send it to fans you know.');
  }catch{
    alert('Your link: '+link);
  }
};

$('#shareWhatsapp').onclick=()=>{
  const message=`I joined the Peller & Jarvis 3-Day Wedding Celebration 🎉
My Day ${state.day} journey is already moving.

Published reward journey:
₦25,000 Cash
₦10,000 Airtime
20GB Data

Eligibility and delivery are subject to campaign verification.
Join through my link:
${referralLink()}`;
  markShared('whatsapp');
  location.href='https://wa.me/?text='+encodeURIComponent(message);
};

$('#howRewardsWork').onclick=()=>$('#infoModal').classList.remove('hidden');
$$('[data-close-info]').forEach(button=>button.onclick=()=>$('#infoModal').classList.add('hidden'));
$$('[data-close-modal]').forEach(button=>button.onclick=closeActivity);
$$('[data-close-sponsored]').forEach(button=>button.onclick=()=>$('#sponsoredPanel').classList.add('hidden'));
$$('[data-nav]').forEach(button=>button.onclick=()=>applyView(button.dataset.nav));
$('#viewProgress').onclick=()=>applyView('rewards');

$('#submitEligibility').onclick=()=>{
  if(!(state.day===3&&allRequiredCompleted()&&state.earned>=CONFIG.campaign.cashTarget)){
    return alert('Complete every required activity, all qualified-fan milestones and the full journey goal first.');
  }
  state.eligibilitySubmitted=true;
  log('eligibility_submitted');
  render();
  alert('Submitted for administrator review. No reward has been marked delivered yet.');
};

if(previewMode){
  $('#closeAdminPreview').onclick=()=>$('#adminPreview').classList.add('hidden');
  $$('[data-admin]').forEach(button=>button.onclick=()=>{
    const action=button.dataset.admin;
    if(action==='approve-referral'){
      state.referrals+=1;
      log('preview_referral_approved',{count:state.referrals});
      syncReferralCredits();
      render();
    }
    if(action==='approve-pending'){
      for(const id of Object.keys(state.pending)){
        const task=findTask(id);
        if(task)creditActivity(task,{silent:true});
      }
      render();
    }
    if(action==='next-day'){
      if(state.day>=3)return alert('Already on Day 3.');
      state.day+=1;
      state.streak=Math.max(state.streak,state.day);
      state.nextDayAt=null;
      state.activeView='home';
      log('preview_day_advanced',{day:state.day});
      render();
    }
    if(action==='reset'){
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.clear();
      location.href=location.pathname+'?preview=1';
    }
  });
}else{
  $('#adminPreview').remove();
}

setInterval(renderCountdown,1000);
save();
render();
})();