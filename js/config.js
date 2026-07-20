window.CELEBRATION_CONFIG = {
  campaign: {
    cashTarget: 25000,
    airtimeReward: 10000,
    dataReward: '20GB',
    dailyCaps: {1: 5000, 2: 8000, 3: 12000},
    supporterLevels: [
      {name:'Celebration Guest', min:0},
      {name:'Loyal Supporter', min:3},
      {name:'Gold Supporter', min:7},
      {name:'VIP Supporter', min:12},
      {name:'Wedding Legend', min:17}
    ]
  },
  tasks: {
    day1: [
      {id:'entry_prediction',title:'Celebration Entry Challenge',description:'Confirm your network and choose your first wedding prediction.',category:'couple',estimatedMinutes:3,reward:500,url:'',verificationType:'prediction',question:'Which wedding colour do you expect to dominate?',options:['Burgundy and gold','White and gold','Green and gold','Blue and silver'],required:true,active:true},
      {id:'peller_fan',title:'Peller Fan Challenge',description:'Review today’s featured Peller celebration content and answer three questions.',category:'peller',estimatedMinutes:5,reward:1000,url:'PASTE_PELLER_CONTENT_URL_HERE',verificationType:'return_and_quiz',requiredAnswers:3,required:true,active:true},
      {id:'jarvis_prediction',title:'Jarvis Wedding Style Prediction',description:'Predict the wedding style that best represents Jarvis.',category:'jarvis',estimatedMinutes:4,reward:800,url:'',verificationType:'prediction',question:'Which style best represents Jarvis for the celebration?',options:['Royal traditional look','Modern luxury look','Classic white wedding look','Bold cultural fusion'],required:true,active:true},
      {id:'couple_quiz',title:'Couple Celebration Quiz',description:'Complete five short questions about the wedding celebration campaign.',category:'couple',estimatedMinutes:5,reward:1200,url:'',verificationType:'quiz_completed',requiredAnswers:5,required:true,active:true},
      {id:'referral_unlock_1',title:'First Referral Unlock',description:'Bring 2 verified supporters who complete their first celebration activity.',category:'referral',estimatedMinutes:5,reward:700,url:'',verificationType:'verified_referral',requiredReferrals:2,required:true,active:true},
      {id:'sponsored_1',title:'Sponsored Celebration Task',description:'Open the approved sponsored opportunity, return and complete the follow-up question.',category:'sponsored',estimatedMinutes:4,reward:800,url:'PASTE_SPONSORED_TASK_URL_HERE',verificationType:'return_and_quiz',requiredAnswers:1,required:false,active:true,label:'Sponsored Reward'}
    ],
    day2: [
      {id:'peller_media',title:'Peller Media Challenge',description:'Review a new approved Peller page and complete a deeper quiz.',category:'peller',estimatedMinutes:7,reward:1500,url:'PASTE_PELLER_CONTENT_URL_HERE',verificationType:'return_and_quiz',requiredAnswers:5,required:true,active:true},
      {id:'jarvis_choice',title:'Jarvis Fan Choice Challenge',description:'Compare wedding themes and choose the option that suits Jarvis best.',category:'jarvis',estimatedMinutes:5,reward:1200,url:'PASTE_JARVIS_CONTENT_URL_HERE',verificationType:'prediction',question:'Which wedding theme should Jarvis lead?',options:['Royal burgundy','Elegant white and gold','Emerald celebration','Midnight blue'],required:true,active:true},
      {id:'couple_timeline',title:'Couple Timeline Activity',description:'Arrange approved celebration moments in the correct sequence.',category:'couple',estimatedMinutes:5,reward:1000,url:'',verificationType:'quiz_completed',requiredAnswers:4,required:true,active:true},
      {id:'referral_unlock_2',title:'Verified Supporter Milestone',description:'Reach 3 verified supporters or help previous invitees finish their first activity.',category:'referral',estimatedMinutes:6,reward:1800,url:'',verificationType:'verified_referral',requiredReferrals:3,required:true,active:true},
      {id:'premium_sponsored_2',title:'Premium Sponsored Task',description:'Complete today’s approved sponsored activity and return for the follow-up.',category:'sponsored',estimatedMinutes:5,reward:1500,url:'PASTE_SPONSORED_TASK_URL_HERE',verificationType:'return_and_quiz',requiredAnswers:2,required:false,active:true,label:'Sponsored Reward'},
      {id:'fan_message',title:'Fan Message Submission',description:'Submit a respectful congratulatory message of at least 40 characters.',category:'creative',estimatedMinutes:4,reward:1000,url:'',verificationType:'message_submitted',minimumLength:40,required:true,active:true}
    ],
    day3: [
      {id:'final_quiz',title:'Final Peller & Jarvis Wedding Quiz',description:'Complete the final campaign quiz using approved celebration information.',category:'couple',estimatedMinutes:10,reward:3500,url:'PASTE_COUPLE_CONTENT_URL_HERE',verificationType:'quiz_completed',requiredAnswers:8,required:true,active:true},
      {id:'final_prediction',title:'Final Wedding Prediction',description:'Submit your final predictions before the celebration deadline.',category:'couple',estimatedMinutes:5,reward:1800,url:'',verificationType:'prediction',question:'Which moment will become the biggest wedding trend?',options:['Traditional entrance','First dance','Couple outfit reveal','Family celebration'],required:true,active:true},
      {id:'supporter_card',title:'Premium Fan Contribution',description:'Create your personalized supporter card with a prediction and badge.',category:'creative',estimatedMinutes:6,reward:1800,url:'',verificationType:'supporter_card_created',required:true,active:true},
      {id:'referral_final',title:'Final Referral Milestone',description:'Complete the final milestone of 5 verified supporters.',category:'referral',estimatedMinutes:8,reward:2500,url:'',verificationType:'verified_referral',requiredReferrals:5,required:true,active:true},
      {id:'final_sponsored',title:'Final Sponsored Reward Task',description:'Open the approved premium sponsored opportunity, return and complete the local follow-up.',category:'sponsored',estimatedMinutes:6,reward:1400,url:'PASTE_SPONSORED_TASK_URL_HERE',verificationType:'return_and_quiz',requiredAnswers:2,required:false,active:true,label:'Sponsored Reward'},
      {id:'journey_review',title:'Final Journey Review',description:'Review your completed tasks, streak, supporter level and remaining requirements.',category:'review',estimatedMinutes:3,reward:1000,url:'',verificationType:'manual_review',required:true,active:true}
    ]
  },
  ads: {
    native: [],
    inline: [],
    halfScreen: [],
    sponsoredTask: [
      {id:'sponsored_demo',name:'Today’s Sponsored Reward',label:'Sponsored Reward',url:'PASTE_AD_URL_HERE',placement:'sponsoredTask',active:true,minimumDay:1,maximumShowsPerSession:1,cooldownMinutes:30}
    ],
    celebrationFeed: []
  }
};
