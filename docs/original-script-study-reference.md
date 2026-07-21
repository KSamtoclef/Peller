# Original Peller & Jarvis Script — Study Reference

This document records the full structure of the uploaded original HTML so the project can be rebuilt deliberately from a known baseline without executing unsafe or misleading behavior on visitors.

## Original visible flow

1. Initial browser prompt claiming eligibility.
2. Hero image.
3. Scrolling wedding-offer headline.
4. Public counter claiming many Nigerians had received the reward.
5. Offer introduction.
6. Network dropdown.
7. `GET OFFER` button.
8. Loading percentage.
9. Phone-number form.
10. Activation progress bar.
11. WhatsApp sharing screen.
12. Repeated-share progress bar.
13. Activation screen.
14. Multiple external activation buttons.
15. Public reaction counts and comments.

## Original code areas removed from the live page

### 1. Eligibility prompt and redirect

The original script opened a prompt before the page loaded and redirected visitors when the prompt result did not match the expected text.

Original behavior:

```text
prompt eligibility message
→ compare entered value
→ redirect to another site when it does not match
```

### 2. External verification script

The original head referenced an external script named `peter-verify`.

### 3. Cookie helper code

The original contained `set_Cookie` and `get_Cookie` helpers and an unfinished commented block intended to restore steps.

### 4. Blogger and advertising metadata

The original contained several Blogger profile links and repeated AdSense platform metadata declarations.

### 5. Animated public-recipient counter

The original displayed a number starting at `4548` and increased it randomly every second while claiming that Nigerians had received the reward.

### 6. Network dropdown and original copy

The original opening copy was:

> Peller and Jarvis in Collaboration with MTN, Airtel, Glo and 9-Mobile to Provide 20GB Free Data and ₦10,000 Airtime to everyone in Celebration of Their Wedding.

It then displayed the four networks inside a dropdown and used a `GET OFFER` button.

### 7. Loading and phone flow

The original used jQuery fades and a percentage from 0% to 100%, then opened the phone-number screen.

### 8. Activation progress

The original phone confirmation moved to an `Activating 20GB + ₦10,000 Airtime...` screen with a green bar. At 50%, the timer paused briefly before continuing.

### 9. Sharing requirements

The original sharing screen instructed visitors to:

- Share with 5 groups or 15 friends on WhatsApp.
- Wait for the green verification bar to fill.
- Continue automatically to an activation page.

### 10. Repeated-click sharing progression

The original did not verify delivered messages or qualified referrals. Instead, it increased local progress after repeated button taps using this sequence:

```text
0 → 50 → 65 → 70 → 80 → 85 → 87 → 88 → 90 → 91 → 92 → 93 → 94 → 95 → 96 → 98 → activation
```

Some steps also displayed an error asking the visitor to share again.

### 11. Activation screen

The original final screen included these buttons:

- ACTIVATE
- ACTIVATE 20GB
- ACTIVATE AIRTIME
- GET ₦10,000 AIRTIME
- CLAIM ₦10,000 AIRTIME

These buttons opened third-party advertising URLs.

### 12. Public reactions and comments

The original displayed static public metrics:

- 134K reactions
- 23K comments
- 12K shares

It also displayed comments claiming people had already received airtime or data.

### 13. Back-button redirect

The original changed browser history and redirected visitors to an advertising URL when the hash or back navigation changed.

### 14. Third-party scripts and counters

The original loaded:

- jQuery from a CDN
- two local styling scripts
- Supercounters online visitor widget
- external ad destinations

## Exact uploaded source

The complete original source remains available in the ChatGPT conversation upload named:

`peller-jarvis-wedding-celebration-2026.earnonline.pro(3).html`

Use that uploaded file as the authoritative reference when comparing wording, order, CSS classes, and original scripts.

## Safe rebuild order

When editing from this reference, rebuild one section at a time:

1. Preserve the original visual layout.
2. Preserve the network → loading → phone → verification → sharing → final-screen order.
3. Replace fake public counters with real analytics or remove them.
4. Replace repeated-click sharing progress with a published, verifiable rule.
5. Replace hidden redirects with explicit sponsored links.
6. Replace fake delivery comments with real, consented testimonials.
7. Replace automatic reward claims with accurate statuses.
8. Add any new registration or payout fields only after the original flow is stable.
