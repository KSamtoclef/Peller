window.CELEBRATION_CONFIG = {
  schemaVersion: 4,
  campaign: {
    cashTarget: 25000,
    airtimeTarget: 10000,
    dataTarget: 20,
    dayUnlockHour: 0
  },
  days: {
    1: {
      cash: 8000, airtime: 0, data: 0,
      chatReward: 3000, sponsorReward: 3000, shareReward: 2000, bonusReward: 0,
      chatGoal: 6, referralsRequired: 3,
      sponsorTitle: 'Day 1 Sponsored Earning Opportunity',
      sponsorUrl: 'PASTE_DAY_1_SPONSORED_URL_HERE',
      requirement: 'Open the approved opportunity, complete the published action, return to this page and submit the follow-up for verification.'
    },
    2: {
      cash: 7000, airtime: 5000, data: 0,
      chatReward: 2500, sponsorReward: 2500, shareReward: 1500, bonusReward: 500,
      chatGoal: 6, referralsRequired: 4,
      sponsorTitle: 'Day 2 Sponsored Earning Opportunity',
      sponsorUrl: 'PASTE_DAY_2_SPONSORED_URL_HERE',
      requirement: 'Complete today’s approved activity, return and submit the local follow-up. Administrator or callback verification is required.'
    },
    3: {
      cash: 10000, airtime: 5000, data: 20,
      chatReward: 3000, sponsorReward: 3000, shareReward: 2000, bonusReward: 2000,
      chatGoal: 6, referralsRequired: 5,
      sponsorTitle: 'Final Sponsored Earning Opportunity',
      sponsorUrl: 'PASTE_DAY_3_SPONSORED_URL_HERE',
      requirement: 'Complete the approved premium activity, return and submit the required follow-up for final verification.'
    }
  },
  chat: {
    1: [
      {host:'Celebration Host', text:'Welcome to Day 1, {name} 🎉 How excited are you about the Peller and Jarvis wedding celebration?', replies:['Very excited','I cannot wait','I’m ready to celebrate']},
      {host:'Peller Fan Team', text:'Which wedding moment do you most want to see?', replies:['The traditional entrance','The outfit reveal','The first dance']},
      {host:'Jarvis Fan Team', text:'Which colour combination feels most wedding-ready?', replies:['Burgundy and gold','White and gold','Emerald and gold']},
      {host:'Wedding Countdown Host', text:'What should make the celebration unforgettable for fans?', replies:['The energy','The love story','The fashion']},
      {host:'Celebration Host', text:'Which fan experience would you enjoy most?', replies:['Predictions','Style voting','Quick quizzes']},
      {host:'Peller Fan Team', text:'Choose your final Day 1 message for the couple.', replies:['A beautiful forever','Joy and happiness','Love without limits']}
    ],
    2: [
      {host:'Celebration Host', text:'Welcome back, {name} 🔥 What should trend most on Day 2?', replies:['Traditional style','Fan reactions','The couple’s entrance']},
      {host:'Jarvis Fan Team', text:'Which wedding look deserves today’s fan vote?', replies:['Royal burgundy','Elegant white','Emerald gold']},
      {host:'Peller Fan Team', text:'Which moment deserves the loudest celebration?', replies:['The entrance','The first dance','The outfit reveal']},
      {host:'Wedding Countdown Host', text:'What makes a fan reward journey feel premium?', replies:['Clear progress','Real interaction','Strong rewards']},
      {host:'Celebration Host', text:'How is your excitement compared with yesterday?', replies:['Even higher','Still strong','Ready for more']},
      {host:'Jarvis Fan Team', text:'Choose today’s strongest celebration caption.', replies:['Love takes centre stage','A royal celebration','Forever starts here']}
    ],
    3: [
      {host:'Celebration Host', text:'Final Reward Day, {name}! Which wedding moment will trend most?', replies:['Traditional entrance','Couple reveal','First dance']},
      {host:'Peller Fan Team', text:'What should fans remember most about this journey?', replies:['The celebration','The conversations','The final reward']},
      {host:'Jarvis Fan Team', text:'Choose the final wedding style prediction.', replies:['Royal traditional','Modern luxury','Cultural fusion']},
      {host:'Wedding Countdown Host', text:'Which final fan message fits best?', replies:['You did it','A beautiful forever','Wedding Legend']},
      {host:'Celebration Host', text:'How would you describe your three-day journey?', replies:['Exciting','Rewarding','Memorable']},
      {host:'Peller Fan Team', text:'Ready to complete the final reward day?', replies:['Yes, complete it','I’m ready','Let’s finish']}
    ]
  },
  challenges: {
    1: [
      {id:'d1_colour', afterReply:1, icon:'💍', title:'Wedding Colour Pick', question:'Which colour should lead the celebration?', options:['Burgundy and gold','White and gold','Emerald and gold']},
      {id:'d1_moment', afterReply:3, icon:'🔥', title:'Peller Fan Prediction', question:'Which moment will fans replay most?', options:['Traditional entrance','Outfit reveal','First dance']},
      {id:'d1_message', afterReply:5, icon:'❤️', title:'Couple Message Challenge', question:'Choose the strongest message for the couple.', options:['A beautiful forever','Joy without limits','Love takes centre stage']}
    ],
    2: [
      {id:'d2_style', afterReply:1, icon:'✨', title:'Jarvis Style Vote', question:'Which look should win today’s fan vote?', options:['Royal traditional','Modern luxury','Classic white']},
      {id:'d2_energy', afterReply:3, icon:'🎉', title:'Celebration Energy Pick', question:'What should make Day 2 memorable?', options:['Fan reactions','Wedding fashion','The couple’s entrance']},
      {id:'d2_caption', afterReply:5, icon:'❤️', title:'Celebration Caption Pick', question:'Choose today’s strongest caption.', options:['Forever starts here','Love takes centre stage','A royal celebration']}
    ],
    3: [
      {id:'d3_trend', afterReply:1, icon:'🏆', title:'Final Trend Prediction', question:'Which wedding moment will trend longest?', options:['Couple entrance','First dance','Outfit reveal']},
      {id:'d3_memory', afterReply:3, icon:'💫', title:'Journey Memory Pick', question:'What will you remember most?', options:['The fan chat','The reward journey','The wedding predictions']},
      {id:'d3_badge', afterReply:5, icon:'🎉', title:'Wedding Legend Choice', question:'Choose your final fan badge.', options:['Official Fan','VIP Wedding Fan','Wedding Legend']}
    ]
  },
  ads: {
    day1: [
      {id:'d1_native', placement:'native', title:'Featured Celebration Partner', description:'Explore today’s clearly labelled partner opportunity.', url:'PASTE_DAY_1_NATIVE_AD_URL_HERE', active:true},
      {id:'d1_chat', placement:'in_chat', title:'Sponsored Fan Break', description:'An optional partner feature inside today’s fan conversation.', url:'PASTE_DAY_1_IN_CHAT_AD_URL_HERE', active:true},
      {id:'d1_page', placement:'in_page', title:'More From Today’s Partner', description:'Continue with an approved sponsored experience when ready.', url:'PASTE_DAY_1_IN_PAGE_AD_URL_HERE', active:true},
      {id:'d1_half', placement:'half_screen', title:'Today’s Featured Opportunity', description:'Optional sponsored content shown once per session.', url:'PASTE_DAY_1_HALF_SCREEN_URL_HERE', active:true}
    ],
    day2: [
      {id:'d2_native', placement:'native', title:'Day 2 Celebration Partner', description:'A fresh approved opportunity for returning fans.', url:'PASTE_DAY_2_NATIVE_AD_URL_HERE', active:true},
      {id:'d2_chat', placement:'in_chat', title:'Day 2 Sponsored Fan Break', description:'Clearly labelled sponsored content inside the fan lounge.', url:'PASTE_DAY_2_IN_CHAT_AD_URL_HERE', active:true},
      {id:'d2_page', placement:'in_page', title:'Day 2 Partner Feature', description:'Explore today’s approved partner feature.', url:'PASTE_DAY_2_IN_PAGE_AD_URL_HERE', active:true},
      {id:'d2_half', placement:'half_screen', title:'Day 2 Featured Opportunity', description:'One optional half-screen placement per session.', url:'PASTE_DAY_2_HALF_SCREEN_URL_HERE', active:true}
    ],
    day3: [
      {id:'d3_native', placement:'native', title:'Final Day Celebration Partner', description:'An approved final-day partner opportunity.', url:'PASTE_DAY_3_NATIVE_AD_URL_HERE', active:true},
      {id:'d3_chat', placement:'in_chat', title:'Final Sponsored Fan Break', description:'Clearly labelled sponsored content for the final fan chat.', url:'PASTE_DAY_3_IN_CHAT_AD_URL_HERE', active:true},
      {id:'d3_page', placement:'in_page', title:'Final Partner Feature', description:'Optional sponsored content for final-day fans.', url:'PASTE_DAY_3_IN_PAGE_AD_URL_HERE', active:true},
      {id:'d3_half', placement:'half_screen', title:'Final Featured Opportunity', description:'Shown at most once per session when configured.', url:'PASTE_DAY_3_HALF_SCREEN_URL_HERE', active:true}
    ]
  }
};