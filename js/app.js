(function(){
  'use strict';

  const expectedPrompt = '₦10,000 Airtime + 20GB Data';
  const response = window.prompt('SMS: Congratulations, your Mobile Number is eligible to receive  ₦10,000 Airtime + 20GB Data, click OK to Activate now', expectedPrompt);

  // Original page return URL retained as an editable local placeholder instead of redirecting away.
  const pageReturnUrl = '#PASTE_PAGE_RETURN_URL_HERE';
  if (response !== expectedPrompt) {
    window.location.hash = pageReturnUrl;
  }

  // Editable URL slots preserved from the source structure.
  const adUrl = 'PASTE_YOUR_AD_URL_HERE';
  const businessPlanUrl = 'PASTE_BUSINESS_PLAN_URL_HERE';

  // The original WhatsApp message structure is preserved, but real contact distribution
  // remains disabled in this reconstruction preview. Replace the placeholder later only
  // after the campaign and destination have been reviewed.
  const whatsappCampaignUrl = 'PASTE_BUSINESS_PLAN_URL_HERE';
  const text1 = "*Peller and Jarvis' 2026 Wedding Celebration Offer*%0A%0APeller and Jarvis in Collaboration with MTN, Airtel, Glo and 9-Mobile to Provide 20GB Free Data and ₦10,000 Airtime to everyone in Celebration of Their Wedding%0A%0A*POWERED BY:*%0A_Peller and Jarvis_ %0A%0A*For MTN*👇%0A" + whatsappCampaignUrl + "%0A%0A*For Airtel*👇%0A" + whatsappCampaignUrl + "%0A%0A*For Glo*👇%0A" + whatsappCampaignUrl + "%0A%0A*For 9-Mobile*👇%0A" + whatsappCampaignUrl;
  const whatsappShareUrl = 'whatsapp://send?text=' + text1;
  void whatsappShareUrl;

  let timeleft = 4548;
  window.setInterval(function(){
    timeleft += Math.floor(Math.random() * 600);
    document.getElementById('countdowntimer').textContent = String(timeleft);
  }, 1000);

  const $ = (selector) => document.querySelector(selector);
  const show = (selector) => { $(selector).style.display = 'block'; };
  const hide = (selector) => { $(selector).style.display = 'none'; };
  const delay = (ms) => new Promise(resolve => window.setTimeout(resolve, ms));

  async function animateNumber(element, onStep, pauseAtFifty){
    for(let i=0;i<=99;i++){
      element.textContent = i + '%';
      if(onStep) onStep(i);
      if(pauseAtFifty && i === 49) await delay(1000);
      await delay(50);
    }
    element.textContent = '100%';
    if(onStep) onStep(100);
  }

  $('#go').addEventListener('click', async function(){
    hide('#intro');
    show('#loader');
    await animateNumber($('#num'));
    hide('#loader');
    show('#info');
  });

  $('#name').addEventListener('keypress', function(event){
    if(!/[0-9]/.test(event.key)) event.preventDefault();
  });

  $('#name').addEventListener('focus', function(){ $('.error').style.display='none'; });

  $('#confirm').addEventListener('click', async function(){
    if($('#name').value.length < 4){
      $('.error').style.display='block';
      return;
    }
    hide('#info');
    show('#checking');
    await animateNumber($('#percentage'), function(i){ $('#fill').style.width=i+'%'; }, true);
    $('#load').style.display='none';
    $('#check').style.display='inline';
    await delay(500);
    hide('#checking');
    show('#share');
    $('#getname').textContent=$('#name').value;
  });

  const progressKey = 'peller-preview-share-progress';
  const stages = [0,50,65,70,80,85,87,88,90,91,92,93,94,95,96,98];
  const alertStages = new Set([50,70,80]);
  const error = 'Something is wrong!\nPosts are not calculated. You may have shared it with the same friend or group more than once, please re-share';
  let width = Number(localStorage.getItem(progressKey));
  if(!stages.includes(width)) width = 0;

  function renderShareProgress(){
    $('#fill2').style.width=width+'%';
    $('#percentage2').textContent=width+'%';
  }

  if(localStorage.getItem(progressKey) !== null){
    hide('#intro');
    $('.comments').style.display='none';
    show('#share');
    renderShareProgress();
  }

  $('#whatsapp').addEventListener('click', function(event){
    event.preventDefault();
    // WhatsApp structure is restored, but real message sending remains disabled in preview.
    if(width >= 98){
      hide('#share');
      show('#claim');
      return;
    }
    if(alertStages.has(width)) window.alert(error);
    const currentIndex = stages.indexOf(width);
    width = stages[currentIndex + 1];
    localStorage.setItem(progressKey, String(width));
    window.setTimeout(renderShareProgress, 2000);
  });

  $('#offer').addEventListener('click', function(event){
    event.preventDefault();
    // Original HAI8G destination slot preserved as an editable placeholder.
    void adUrl;
  });

  document.querySelectorAll('.ad-placeholder-link').forEach(function(element){
    element.addEventListener('click', function(event){
      event.preventDefault();
      // Original direct ad destination replaced by PASTE_YOUR_AD_URL_HERE
      // or PASTE_BUSINESS_PLAN_URL_HERE in the element's href.
      void businessPlanUrl;
    });
  });

  // Original hash and Back-button trigger positions are retained conceptually,
  // but automatic external redirection remains disabled in this preview.
  function hh(){
    window.history.pushState(window.history.length + 1, 'message', '#' + Date.now());
  }
  window.setTimeout(hh, 500);

  window.addEventListener('hashchange', function(){
    // URL slot preserved without navigating to the removed direct ad destination.
    void adUrl;
  });
})();