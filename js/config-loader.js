(function(){
  'use strict';
  const KEY='pellerCelebrationAdminOverrides';
  function clone(value){return JSON.parse(JSON.stringify(value));}
  function merge(base, overrides){
    const result=clone(base);
    if(!overrides||typeof overrides!=='object')return result;
    if(overrides.campaign)result.campaign=Object.assign({},result.campaign,overrides.campaign);
    if(overrides.tasks){
      result.tasks=result.tasks||{};
      Object.keys(overrides.tasks).forEach(day=>{
        if(Array.isArray(overrides.tasks[day]))result.tasks[day]=clone(overrides.tasks[day]);
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
})();
