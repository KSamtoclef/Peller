(function(){
'use strict';
const KEYS=['pellerJourneyV4AdminOverrides','pellerJourneyV3AdminOverrides'];
const clone=value=>JSON.parse(JSON.stringify(value));
function merge(base,override){
  const result=clone(base);
  if(!override||![3,4].includes(Number(override.schemaVersion)))return result;
  if(override.campaign)result.campaign=Object.assign({},result.campaign,override.campaign);
  if(override.days){for(const day of [1,2,3])if(override.days[day])result.days[day]=Object.assign({},result.days[day],override.days[day]);}
  if(override.chat){for(const day of [1,2,3])if(Array.isArray(override.chat[day]))result.chat[day]=clone(override.chat[day]);}
  if(override.challenges){for(const day of [1,2,3])if(Array.isArray(override.challenges[day]))result.challenges[day]=clone(override.challenges[day]);}
  if(override.ads){for(const day of [1,2,3])if(Array.isArray(override.ads['day'+day]))result.ads['day'+day]=clone(override.ads['day'+day]);}
  if(override.sponsored&&!override.ads)result.sponsored=Object.assign({},result.sponsored||{},clone(override.sponsored));
  return result;
}
try{
  const base=clone(window.CELEBRATION_CONFIG||{});window.CELEBRATION_BASE_CONFIG=base;
  let override=null;for(const key of KEYS){const raw=localStorage.getItem(key);if(raw){override=JSON.parse(raw);break;}}
  window.CELEBRATION_CONFIG=merge(base,override);
}catch(error){console.warn('Could not apply campaign overrides.',error);}
})();