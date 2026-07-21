window.CELEBRATION_CONFIG = {
  campaign: {
    cashTarget: 25000,
    airtimeReward: 10000,
    dataReward: '20GB',
    dailyCaps: {1: 5000, 2: 8000, 3: 12000}
  },
  tasks: {
    day1: [
      {id:'day1_wedding_pick',title:'Wedding Celebration Pick',description:'Choose the wedding colour you believe will lead the celebration.',category:'couple',estimatedMinutes:2,reward:500,url:'',verificationType:'prediction',question:'Which wedding colour will stand out most?',options:['Burgundy and gold','White and gold','Green and gold','Blue and silver'],required:true,active:true,stage:'opening'},
      {id:'day1_fan_invite',title:'Bring 3 Fans Into the Celebration',description:'Share today’s invitation. Your next activities unlock after sharing; the reward is added when 3 qualified fans join.',category:'referral',estimatedMinutes:3,reward:2500,url:'',verificationType:'verified_referral',requiredReferrals:3,required:true,active:true,stage:'sharing'},
      {id:'day1_sponsored_one',title:'Sponsored Celebration Opportunity',description:'Open the approved opportunity, complete the published action, return and finish the follow-up.',category:'sponsored',estimatedMinutes:5,reward:1000,url:'PASTE_DAY1_SPONSORED_URL_ONE_HERE',verificationType:'return_and_quiz',requiredAnswers:1,required:true,active:true,label:'Sponsored Opportunity',stage:'after_share'},
      {id:'day1_sponsored_two',title:'Premium Fan Opportunity',description:'Complete a different approved opportunity and return for the local confirmation step.',category:'sponsored',estimatedMinutes:5,reward:1000,url:'PASTE_DAY1_SPONSORED_URL_TWO_HERE',verificationType:'return_and_quiz',requiredAnswers:1,required:true,active:true,label:'Sponsored Opportunity',stage:'after_share'}
    ],
    day2: [
      {id:'day2_peller_media',title:'New Peller Media Challenge',description:'Explore the new approved Peller celebration content and answer five quick questions.',category:'peller',estimatedMinutes:6,reward:1500,url:'PASTE_DAY2_PELLER_URL_HERE',verificationType:'return_and_quiz',requiredAnswers:5,required:true,active:true,stage:'opening'},
      {id:'day2_fan_team',title:'Grow Your Fan Team',description:'Share today’s invitation. Activities unlock after sharing; the reward is added at 4 cumulative qualified fans.',category:'referral',estimatedMinutes:4,reward:3000,url:'',verificationType:'verified_referral',requiredReferrals:4,required:true,active:true,stage:'sharing'},
      {id:'day2_jarvis_style',title:'Jarvis Wedding Style Challenge',description:'Choose the wedding theme you believe suits Jarvis best.',category:'jarvis',estimatedMinutes:4,reward:1200,url:'',verificationType:'prediction',question:'Which wedding theme should Jarvis lead?',options:['Royal burgundy','Elegant white and gold','Emerald celebration','Midnight blue'],required:true,active:true,stage:'after_share'},
      {id:'day2_sponsored',title:'Day 2 Sponsored Opportunity',description:'Complete today’s approved opportunity and return for the follow-up questions.',category:'sponsored',estimatedMinutes:6,reward:1300,url:'PASTE_DAY2_SPONSORED_URL_HERE',verificationType:'return_and_quiz',requiredAnswers:2,required:true,active:true,label:'Sponsored Opportunity',stage:'after_share'},
      {id:'day2_caption',title:'Wedding Caption Challenge',description:'Write a lively and respectful caption for the Peller and Jarvis celebration.',category:'creative',estimatedMinutes:4,reward:1000,url:'',verificationType:'message_submitted',minimumLength:35,required:true,active:true,stage:'after_share'}
    ],
    day3: [
      {id:'day3_final_quiz',title:'Final Wedding Quiz',description:'Complete the final Peller and Jarvis celebration quiz.',category:'couple',estimatedMinutes:8,reward:2500,url:'',verificationType:'quiz_completed',requiredAnswers:8,required:true,active:true,stage:'opening'},
      {id:'day3_fan_wave',title:'Complete the Final Fan Wave',description:'Share the final invitation. Activities unlock after sharing; the reward is added at 5 cumulative qualified fans.',category:'referral',estimatedMinutes:5,reward:4000,url:'',verificationType:'verified_referral',requiredReferrals:5,required:true,active:true,stage:'sharing'},
      {id:'day3_premium_sponsored',title:'Premium Sponsored Opportunity',description:'Complete the approved premium opportunity and return for verification.',category:'sponsored',estimatedMinutes:7,reward:2000,url:'PASTE_DAY3_SPONSORED_URL_ONE_HERE',verificationType:'return_and_quiz',requiredAnswers:2,required:true,active:true,label:'Sponsored Opportunity',stage:'after_share'},
      {id:'day3_final_sponsored',title:'Final Sponsored Opportunity',description:'Complete the final approved opportunity and return for the local follow-up.',category:'sponsored',estimatedMinutes:7,reward:2000,url:'PASTE_DAY3_SPONSORED_URL_TWO_HERE',verificationType:'return_and_quiz',requiredAnswers:2,required:true,active:true,label:'Sponsored Opportunity',stage:'after_share'},
      {id:'day3_supporter_card',title:'Create Your Wedding Supporter Card',description:'Add your name and final wedding prediction to your supporter card.',category:'creative',estimatedMinutes:5,reward:1500,url:'',verificationType:'supporter_card_created',required:true,active:true,stage:'after_share'}
    ]
  },
  ads: {
    native: [],
    inline: [],
    halfScreen: [],
    sponsoredTask: [
      {id:'sponsored_demo',name:'Today’s Sponsored Opportunity',label:'Sponsored Opportunity',url:'PASTE_AD_URL_HERE',placement:'sponsoredTask',active:true,minimumDay:1,maximumShowsPerSession:1,cooldownMinutes:30}
    ],
    celebrationFeed: []
  }
};