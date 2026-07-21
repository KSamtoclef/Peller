(function(){
  'use strict';
  const KEY='pellerCelebrationAdminOverrides';
  const PROGRESS_KEY='pellerCelebrationV2';
  const VALID_STAGES=new Set(['opening','sharing','after_share']);
  function clone(value){return JSON.parse(JSON.stringify(value));}
  function validTaskDay(tasks){return Array.isArray(tasks)&&tasks.every(task=>task&&VALID_STAGES.has(task.stage));}
  function merge(base,overrides){
    const result=clone(base);
    if(!overrides||typeof overrides!=='object')return result;
    if(overrides.campaign)result.campaign=Object.assign({},result.campaign,overrides.campaign);
    if(overrides.tasks){
      result.tasks=result.tasks||{};
      Object.keys(overrides.tasks).forEach(day=>{
        if(validTaskDay(overrides.tasks[day]))result.tasks[day]=clone(overrides.tasks[day]);
      });
    }
    if(overrides.ads){
      result.ads=result.ads||{};
      Object.keys(overrides.ads).forEach(place=>{
        if(Array.isArray(overrides.ads[place]))result.ads[place]=clone(overrides.ads[place]);
      });
    }
    return result;
  }
  try{
    const raw=localStorage.getItem(KEY);
    const overrides=raw?JSON.parse(raw):null;
    window.CELEBRATION_BASE_CONFIG=clone(window.CELEBRATION_CONFIG||{});
    window.CELEBRATION_CONFIG=merge(window.CELEBRATION_CONFIG||{},overrides);
  }catch(error){
    console.warn('Could not apply admin overrides.',error);
  }
  document.addEventListener('DOMContentLoaded',function(){
    const modal=document.querySelector('#taskModal');
    if(!modal)return;
    let previousEarned=0;
    try{previousEarned=Number(JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}').earned||0);}catch{}
    const observer=new MutationObserver(function(){
      if(!modal.classList.contains('hidden'))return;
      let currentEarned=previousEarned;
      try{currentEarned=Number(JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}').earned||0);}catch{}
      if(currentEarned!==previousEarned){
        previousEarned=currentEarned;
        window.setTimeout(function(){window.location.reload();},300);
      }
    });
    observer.observe(modal,{attributes:true,attributeFilter:['class']});
  });
})();