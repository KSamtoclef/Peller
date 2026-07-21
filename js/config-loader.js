(function(){
'use strict';
const KEY='pellerJourneyV3AdminOverrides';
const clone=v=>JSON.parse(JSON.stringify(v));
function merge(base,override){
  const result=clone(base);
  if(!override||override.schemaVersion!==3)return result;
  if(override.campaign)result.campaign=Object.assign({},result.campaign,override.campaign);
  if(override.days){for(const day of [1,2,3])if(override.days[day])result.days[day]=Object.assign({},result.days[day],override.days[day]);}
  if(override.chat){for(const day of [1,2,3])if(Array.isArray(override.chat[day]))result.chat[day]=clone(override.chat[day]);}
  if(override.sponsored)result.sponsored=Object.assign({},result.sponsored,clone(override.sponsored));
  return result;
}
try{
  const base=clone(window.CELEBRATION_CONFIG||{});
  window.CELEBRATION_BASE_CONFIG=base;
  const raw=localStorage.getItem(KEY);
  window.CELEBRATION_CONFIG=merge(base,raw?JSON.parse(raw):null);
}catch(error){console.warn('Could not apply campaign overrides.',error);}
})();