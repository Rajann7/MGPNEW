# BATCH_DOCUMENT_13_DESIGN_BATCH_16_PUBLIC_CONTENT_PAGES_FULL_SPEC.md

# My Gujarat Property

## Batch Document 13

## Design Batch 16 — Complete Public Content Pages, Legal Reader, Blog, Support and Cookie Preferences

---

# 1. DOCUMENT PURPOSE

This document is the complete design, functionality, content-rendering, CMS integration, legal-reader, privacy, cookie-consent, support-ticket, blog, SEO, accessibility, responsive behavior, security and live-verification specification for:

**My Gujarat Property · Design Batch 16 — Public Content Pages**

Batch 16 defines the complete reader-facing public content system for:

1. About
2. Contact
3. FAQ / Help Center
4. Safety Guidelines
5. Terms & Conditions
6. Privacy Policy
7. Cookie Policy
8. Refund Policy
9. Cancellation Policy
10. Listing Policy
11. Advertising Policy
12. Verification Policy
13. Payment Policy
14. Disclaimer
15. Grievance Policy
16. Blog Listing
17. Blog Post
18. Guest Support Request
19. My Support Tickets + Read-Only Thread
20. Cookie Preference Manager

Every screen and every defined state must be implemented.

Nothing may be skipped.

Batch 16 is the **public reader-facing side of the Batch 14 CMS / SEO / Legal system**.

The final architecture must be:

**Batch 14 Admin Content Authority → Approved/Published Revision → Batch 16 Public Rendering**

Do not maintain:

* hard-coded public content,
* separate static Blog fixtures,
* preliminary Legal placeholders,
* public content disconnected from Admin publishing,
* fake contact information,
* fake support Tickets,
* fake Blog Authors,
* fake trust statistics.

---

# 2. ABSOLUTE DESIGN AUTHORITY

The actual Batch 16 source design must be used.

Read the real design source from:

`/newdesign/`

Use:

`Batch 16 - Public Content Pages (Standalone).html`

Implement exact:

* screen layout,
* public shell presence,
* typography hierarchy,
* cards,
* legal-reader structure,
* sticky TOC,
* mobile collapsible TOC,
* Blog card hierarchy,
* support Ticket cards,
* Cookie modal,
* mobile Cookie bottom sheet.

Do not redesign these screens from generic website templates.

---

# 3. BATCH 16 SCREEN INVENTORY

Exact screen inventory:

## Public Company and Help

1. About — Desktop
2. Contact — Mobile reference
3. FAQ / Help Center — Desktop
4. Safety Guidelines — Mobile reference

## Shared Legal Reader

5. Terms & Conditions
6. Privacy Policy
7. Cookie Policy
8. Refund Policy
9. Cancellation Policy
10. Listing Policy
11. Advertising Policy
12. Verification Policy
13. Payment Policy
14. Disclaimer
15. Grievance Policy

## Blog

16. Blog Listing
17. Blog Post

## Support

18. Guest Support Form
19. Logged-In My Tickets + Read-Only Thread

## Privacy Controls

20. Cookie Preference Manager

All 20 screen groups are mandatory.

---

# 4. IMPLEMENTATION ORDER

Implement Batch 16 in this order:

1. Public Content route architecture
2. Batch 14 public-content resolver
3. Screen 1 About
4. Screen 2 Contact
5. Screen 3 FAQ
6. Screen 4 Safety
7. shared Legal Reader component
8. Screens 5–15 Legal content pages
9. Screen 20 Cookie Preferences
10. Screen 16 Blog Listing
11. Screen 17 Blog Post
12. Screen 18 Guest Support
13. Screen 19 My Tickets + Thread
14. Footer link reconciliation
15. SEO/Sitemap integration
16. full public responsive regression.

Do not create 11 separate unrelated Legal layouts.

---

# 5. PUBLIC SHELL RULE

Batch 16 uses the Batch 1 Public Shell.

Reference source states:

**Public header/footer per Batch 1 §3A/3B on every page.**

Use:

* approved Public Header,
* approved Public Footer,
* responsive mobile header,
* city/search behavior only where the shell design requires it.

Do not add Dashboard sidebar.

Do not add Admin shell.

---

# 6. CURRENT PUBLIC LAYOUT FOUNDATION

The current repository already has a reusable Public Layout foundation containing:

* Public Header,
* Public Footer,
* City Provider,
* Auth Modal Provider,
* Compare Provider,
* Compare Tray.

Preserve compatible behavior.

Do not unnecessarily duplicate the shell.

Reconcile the Public Header/Footer visually and functionally with Batch 1 and Batch 16.

---

# 7. CURRENT FOOTER ROUTE GAP

Current footer behavior includes fallback links where:

* About Us → `/support`
* Contact → `/support`
* Help Center → `/support`

This is temporary and conflicts with Batch 16.

After Batch 16:

* About Us → real About route
* Contact → real Contact route
* Help Center → real Help route
* Cookie Preferences → real Cookie Preferences trigger
* Grievance → real Grievance Policy route

No Batch 16 footer link may route to a generic substitute page.

---

# 8. FOOTER LEGAL LINK RECONCILIATION

Batch 16 legal routes and Batch 14 route authority must be reconciled.

Do not leave duplicate public copies such as:

* `/terms`
* `/legal/terms`

both indexable with identical content.

Use one canonical route architecture.

Old routes may redirect intentionally.

---

# 9. CONTENT SOURCE RULE

Public content must resolve from Batch 14 published content.

For CMS Pages:

Published CMS revision.

For Blog:

Published Blog revision.

For Legal:

Latest valid Published Legal revision with required Sign-Off.

Drafts must never appear publicly.

---

# 10. CONTENT FALLBACK RULE

If a required production content page has no Published revision:

do not silently publish Draft.

Use an approved safe unavailable state or deployment blocker according to page importance.

For core Legal pages required for production:

missing approved content is a launch blocker.

---

# 11. TRUST COPY RULE

The source explicitly says:

**Trust copy is qualitative — no fake stats or claims.**

Do not publish unsupported statements such as:

* Gujarat's No.1 portal,
* 100% Verified Properties,
* Guaranteed Sale,
* 10 lakh happy customers,

unless real verified evidence and legal approval exist.

---

# 12. PUBLIC ACCESSIBILITY BASELINE

Every Batch 16 page must support:

* semantic heading hierarchy,
* keyboard navigation,
* visible focus,
* sufficient contrast,
* accessible form labels,
* meaningful link text,
* image alt text,
* modal focus trap,
* bottom-sheet focus management,
* Escape close on desktop overlays,
* reduced-motion compatibility.

---

# 13. SCREEN 1 — ABOUT

Reference desktop title:

`Property, done honestly, in Gujarati and in Gujarat`

Intro:

`My Gujarat Property started in Ahmedabad with a simple frustration: owners couldn't list a flat without ten broker calls a day, and buyers couldn't tell a real listing from a stale one. We built a marketplace where owners post directly, brokers and builders work transparently, and every listing goes through human review before it appears.`

---

# 14. ABOUT CONTENT AUTHORITY

About content should come from Batch 14 CMS.

Do not hard-code final marketing copy in JSX.

The public component should render the Published About revision.

---

# 15. ABOUT PUBLIC NAVIGATION

Reference header:

* Home
* About

Use the exact public navigation behavior.

Do not create a second isolated About header.

---

# 16. ABOUT TRUST BLOCK 1

Heading:

`Reviewed before live`

Copy:

`Every listing is checked by our team before publishing.`

This copy must align with the actual moderation workflow.

Do not claim broader verification than the system performs.

---

# 17. ABOUT TRUST BLOCK 2

Heading:

`Your number, your call`

Copy:

`Contact details stay masked until you choose to share them.`

The public claim must remain consistent with actual contact-reveal rules.

If some provider/project contact mode differs:

ensure the final public wording accurately reflects approved policy.

---

# 18. ABOUT TRUST BLOCK 3

Heading:

`Built for Gujarat`

Copy:

`Locality-level knowledge, Gujarati and Hindi language support.`

This statement must remain consistent with localization rollout.

If Hindi is still Coming Soon at a specific launch stage:

do not claim complete Hindi UI availability prematurely.

Use the final released capability truthfully.

---

# 19. ABOUT FOOTER

Reference footer compact links include:

* Terms
* Privacy
* Cookie Preferences
* Grievance

All must work.

---

# 20. ABOUT MOBILE

The design source shows desktop reference, but implementation must be complete on:

* 390px,
* tablet,
* desktop.

Trust blocks stack intentionally.

No horizontal overflow.

---

# 21. ABOUT SEO

Use Batch 14 metadata authority.

Required:

* Meta Title,
* Meta Description,
* canonical route,
* Indexability.

About should be included in Sitemap when Published and Indexable.

---

# 22. SCREEN 2 — CONTACT

Reference mobile screen title:

`Contact us`

This screen is designed mobile-first in source but must also have intentional tablet/desktop behavior.

---

# 23. CONTACT FORM

The source form includes category/subject choices such as:

* Listing question
* Account help
* Billing
* Partnership
* Other

Action:

`Send message`

---

# 24. CONTACT CATEGORY MODEL

Use controlled category values.

Do not store arbitrary category names as unvalidated free text.

Possible canonical keys:

* listing_question
* account_help
* billing
* partnership
* other.

---

# 25. CONTACT FORM REQUIRED DATA

At minimum collect the fields required by the exact design and support routing.

The design source emphasizes Subject/category and Send Message.

Do not add a bloated form unrelated to source.

Any supporting:

* name,
* email/mobile,
* message

must be implemented only as required for actual contact handling.

---

# 26. CONTACT AUTH BEHAVIOR

Contact page is public.

Guest submission must work according to abuse controls.

Logged-in User context may prefill safe identity information.

Do not require login unless the product explicitly changes that rule.

---

# 27. CONTACT MESSAGE DESTINATION

A Contact submission must create a real:

* Contact Request,
* Support/Partnership inquiry,
* or routed Support Ticket

according to category architecture.

Do not fake success without persistence.

---

# 28. CONTACT BILLING ROUTING

Billing category should route to appropriate Support/Billing queue.

Do not expose financial data in the public form.

---

# 29. CONTACT PARTNERSHIP ROUTING

Partnership request should route to approved internal category/queue.

Do not send everything to one unstructured mailbox if the product has a real ticket system.

---

# 30. CONTACT SUCCESS STATE

After successful submission:

show clear success acknowledgment.

Do not leave form active causing accidental duplicate submit.

---

# 31. CONTACT DUPLICATE SUBMISSION

Disable submission while sending.

Server-side rate limiting required.

---

# 32. CONTACT MAP FALLBACK

Exact source:

`Map: Setup Required — provider not configured. Address shown instead.`

This is a real state.

If Maps provider is not configured:

show:

* Setup Required helper,
* text address.

Do not render a broken Map.

---

# 33. CONTACT MAP ACTIVE STATE

If Maps provider is configured and healthy:

show the approved Map experience.

The fallback remains available if loading fails.

---

# 34. CONTACT ADDRESS

Reference:

`802 Mondeal Heights, SG Highway, Ahmedabad 380015`

Use configured business address authority.

Do not duplicate address strings across many components.

---

# 35. CONTACT EMAIL

Reference:

`support@mygujaratproperty.com`

Use configured support email authority.

Ensure consistency across:

* Contact,
* Footer,
* Support,
* Maintenance,
* Legal/Grievance where applicable.

---

# 36. WHATSAPP SUPPORT

Reference:

`WhatsApp support · Mon–Sat, 9 AM – 7 PM`

If WhatsApp support is actually configured:

the action must work.

If external WhatsApp Provider is not configured but native intent mode is approved:

use native WhatsApp intent behavior honestly.

Do not claim live chat availability if the support channel is unavailable.

---

# 37. SUPPORT HOURS

Support hours should come from configuration/content authority.

Do not scatter hard-coded hours.

---

# 38. CONTACT SEO

Use Batch 14 metadata.

Include canonical route and indexability.

---

# 39. SCREEN 3 — FAQ / HELP CENTER

Reference title:

`How can we help?`

Category controls:

* Listings
* Account & login
* Payments
* Verification
* Safety

---

# 40. HELP CATEGORY FUNCTIONALITY

Category selection filters relevant FAQ content.

Do not use decorative chips only.

---

# 41. FAQ DATA AUTHORITY

FAQ content should be managed through approved CMS/content architecture.

Do not hard-code production FAQ answers permanently.

---

# 42. FAQ REFERENCE QUESTION 1

`Why is my listing still pending?`

Reference answer:

`Every listing is reviewed by our team before going live — typically within 24 hours. You'll get a WhatsApp and in-app notification the moment it's approved or if we need changes.`

This answer must remain consistent with:

* moderation SLA,
* notification provider state.

Do not guarantee WhatsApp delivery if WhatsApp Provider is unavailable.

The content may need configuration-aware or legally accurate wording.

---

# 43. FAQ OTHER REFERENCE QUESTIONS

* How do I edit a live listing?
* When is my number visible to others?
* How do refunds work?

Each answer must reflect actual product workflows from:

* Batch 5 editing/reapproval,
* contact-reveal policy,
* Batch 10/12 refund workflow.

---

# 44. FAQ EXPANSION

FAQ items use accessible accordion behavior.

Required:

* keyboard operable,
* `aria-expanded`,
* only appropriate content rendered visually,
* no layout jump bugs.

---

# 45. FAQ DEEP LINKS

Where useful, questions may support anchor links.

Do not create unstable IDs from editable titles without a stable content key.

---

# 46. HELP SEARCH

If the exact design implementation includes search beyond category selection:

connect it to actual FAQ content.

Do not create fake search.

---

# 47. STILL NEED HELP

Exact block:

`Still need help?`

Action:

`Raise a ticket`

Behavior:

### Logged-in User

open logged-in support ticket flow.

### Guest

open Screen 18 Guest Support Request.

No dead CTA.

---

# 48. FAQ SEO

Use FAQ structured data only when actual visible content qualifies and implementation follows approved SEO policy.

Do not add misleading structured data for hidden/nonexistent answers.

---

# 49. SCREEN 4 — SAFETY GUIDELINES

Reference title:

`Safety guidelines`

Intro:

`Deal confidently — a few habits keep almost every transaction safe.`

Use the exact source layout and mobile-first design.

---

# 50. SAFETY RULE 1

Heading:

`Never share your OTP`

Copy:

`Our team will never ask for it — anyone who does is not from My Gujarat Property.`

This is a critical security rule.

---

# 51. SAFETY RULE 2

Heading:

`Verify before any advance`

Copy:

`See the property, check documents and identity before paying tokens or deposits.`

Do not soften this into promotional copy.

---

# 52. SAFETY RULE 3

Heading:

`Meet at the property or public places`

Copy:

`First visits in daylight; take someone along when possible.`

---

# 53. SAFETY RULE 4

Heading:

`Report anything suspicious`

Copy:

`Use the Report button on any listing or profile — our team reviews within 24 hours.`

This statement must be consistent with actual Report Review SLA.

Do not promise a timeframe the operations team cannot support.

---

# 54. SAFETY REPORT ACTION

Where the screen provides report guidance:

link to Help/Report documentation or appropriate authenticated report workflow.

Do not open a fake Report success dialog.

---

# 55. SAFETY CMS CONNECTION

Safety content should be CMS-controlled.

Keep critical security copy protected from unauthorized Content editing through appropriate permissions/review.

---

# 56. LEGAL SCREENS 5–15 — SHARED LAYOUT

The source explicitly requires:

**ONE component reused for legal documents.**

Shared across:

5. Terms & Conditions
6. Privacy Policy
7. Cookie Policy
8. Refund Policy
9. Cancellation Policy
10. Listing Policy
11. Advertising Policy
12. Verification Policy
13. Payment Policy
14. Disclaimer
15. Grievance Policy

Do not create separate visual systems.

---

# 57. SHARED LEGAL DESKTOP LAYOUT

Required:

* Public Header,
* main Legal content,
* sticky Table of Contents,
* consistent title,
* Last Updated,
* effective/context label,
* numbered sections,
* fixed typography,
* fixed spacing,
* Footer.

---

# 58. STICKY TABLE OF CONTENTS

Desktop:

TOC remains sticky while reader scrolls.

Do not overlap the Public Header.

Use correct top offset.

---

# 59. TOC ACTIVE SECTION

Where implemented:

highlight current section based on scroll position.

Do not create a broken active state that lags or loops.

---

# 60. TOC ANCHOR NAVIGATION

Click section:

scrolls to exact section.

Account for sticky Header offset.

---

# 61. MOBILE LEGAL LAYOUT

Exact source:

`Mobile — collapsible TOC`

Example:

`On this page (7 sections)`

Do not keep a wide sticky desktop sidebar on mobile.

---

# 62. MOBILE TOC ACCESSIBILITY

Collapsible TOC must support:

* keyboard/tap,
* expanded/collapsed state,
* clear count,
* correct anchor navigation.

---

# 63. LEGAL TYPOGRAPHY

Use one shared typography system.

Do not create card-per-paragraph legal layout inconsistent with source.

---

# 64. LEGAL CONTENT SOURCE

Every Legal page renders only the latest approved Published revision from Batch 14.

Do not render Draft or Sign-Off Pending revision.

---

# 65. LEGAL VERSION INTEGRITY

Public reader must show content from one coherent Published version.

Do not mix:

Title from v7
Body from v6
Last Updated from v8.

---

# 66. LEGAL LAST UPDATED

Show actual published/legal revision date.

Do not hard-code 15 June 2026 globally.

Reference values are development fixtures.

---

# 67. LEGAL EFFECTIVE TEXT

Terms reference:

`Effective for all users`

Use actual approved content metadata.

---

# 68. LEGAL CONTENT SANITIZATION

Render structured/sanitized content.

Never execute arbitrary HTML/scripts from CMS.

---

# 69. LEGAL LINKING

Internal Legal links must work.

Example Terms section may link to:

`Listing Policy`

Use canonical public route.

---

# 70. LEGAL ROUTE CANONICALIZATION

One canonical route per policy.

Old path variants redirect safely.

No duplicate indexable versions.

---

# 71. SCREEN 5 — TERMS & CONDITIONS

Reference title:

`Terms & Conditions`

TOC:

1. Acceptance of terms
2. Eligibility & accounts
3. Listings & content
4. Fees & payments
5. Prohibited conduct
6. Termination
7. Governing law

---

# 72. TERMS REFERENCE SECTION 1

`Acceptance of terms`

Reference context:

By creating an account or browsing the platform, users agree to Terms.

Business users confirm authorization to act for the business.

Final legal wording must come from approved Legal content.

---

# 73. TERMS REFERENCE SECTION 2

`Eligibility & accounts`

Reference concepts:

* 18 or older,
* working Indian mobile number,
* account/role policy,
* login responsibility,
* never share OTP.

Final wording requires Legal approval.

---

# 74. TERMS REFERENCE SECTION 3

`Listings & content`

Reference concepts:

* ownership or authority to market,
* review before publication,
* rejection/removal under Listing Policy.

---

# 75. TERMS PRODUCTION BLOCKER

Current preliminary Terms placeholder must not remain in production.

Batch 16 completion requires:

* approved Batch 14 Legal revision,
* exact public layout,
* correct indexability policy.

---

# 76. SCREEN 6 — PRIVACY POLICY

Privacy uses the exact shared Legal Reader.

Content authority:

Batch 14 approved Legal revision.

---

# 77. PRIVACY POLICY REQUIRED SCOPE

The final approved policy should accurately explain the implemented data practices, including relevant categories such as:

* account/profile data,
* mobile/email,
* listing data,
* contact-reveal behavior,
* support data,
* security logs,
* payment-provider data,
* cookies/consent,
* retention and rights,

according to actual platform architecture and legal review.

Do not invent legal guarantees.

---

# 78. CONTACT PRIVACY CONSISTENCY

Privacy wording must match actual:

* contact masking,
* reveal approval,
* Admin sensitive-access logging.

---

# 79. SCREEN 7 — COOKIE POLICY

Cookie Policy uses shared Legal Reader.

Reference intro concept:

`We use cookies to keep you signed in, remember your city, and understand what's working…`

Final wording must match actual technologies.

---

# 80. COOKIE POLICY TRIGGER

Exact action:

`Manage Cookie Preferences`

Must open Screen 20.

No page navigation required.

---

# 81. COOKIE FOOTER TRIGGER

Cookie Preferences must also be revisitable from Footer at any time.

The Footer action must open the same preference manager.

---

# 82. COOKIE CONSENT SOURCE OF TRUTH

Use one consent state shared by:

* Cookie Policy trigger,
* Footer trigger,
* initial consent prompt from Batch 17,
* analytics initialization,
* marketing initialization.

Do not maintain separate conflicting stores.

---

# 83. SCREEN 8 — REFUND POLICY

Uses shared Legal Reader.

Content must align with:

* Batch 10 user Refund Request flow,
* Batch 12 Admin Refund processing,
* Payment provider behavior,
* Credit Note behavior.

---

# 84. REFUND POLICY HONESTY

Do not promise:

instant refund

when actual gateway/bank processing is asynchronous.

Do not state:

automatic approval

when manual review exists.

---

# 85. CURRENT REFUND PLACEHOLDER RECONCILIATION

The current public Refund page is a preliminary hard-coded placeholder.

Batch 16 requires replacing it with:

Batch 14 approved Legal content → shared Batch 16 Legal Reader.

---

# 86. SCREEN 9 — CANCELLATION POLICY

Separate from Refund Policy in Batch 16.

Do not combine both into one public page if the final design defines distinct routes.

Cancellation content must align with real:

* Subscription cancellation,
* end-of-cycle access,
* renewal behavior.

---

# 87. SCREEN 10 — LISTING POLICY

Uses shared Legal Reader plus a special:

**Do / Don't strip above the text.**

This special block is mandatory.

---

# 88. LISTING POLICY DO ITEMS

Exact reference:

### DO

* Use real, recent photos
* State the true expected price
* Mark sold promptly

---

# 89. LISTING POLICY DON'T ITEMS

Exact reference:

### DON'T

* Post the same property twice
* Put phone numbers in photos or text
* List property you're not authorised for

---

# 90. LISTING POLICY SYSTEM CONSISTENCY

These policy rules must align with actual:

* moderation checklist,
* duplicate detection,
* contact leakage review,
* listing authorization.

Do not publish rules the system contradicts.

---

# 91. SCREEN 11 — ADVERTISING POLICY

Uses shared Legal Reader.

Content should align with:

* Batch 8 Builder Campaigns,
* Batch 13 Ad moderation,
* creative size requirements,
* targeting restrictions,
* RERA linkage,
* misleading-pricing restrictions.

---

# 92. ADVERTISING POLICY CREATIVE RULES

Where final policy states creative requirements:

keep them consistent with:

* Desktop 1440×250,
* Tablet 768×240,
* Mobile 390×312,

or any formally approved later replacement.

---

# 93. SCREEN 12 — VERIFICATION POLICY

Uses shared Legal Reader.

Content must distinguish accurately:

* Identity Verification,
* Listing moderation,
* Project RERA verification,
* profile badge meaning.

Do not claim Verification guarantees ownership/title legality beyond actual checks.

---

# 94. VERIFICATION BADGE HONESTY

Explain what Verified does and does not mean.

Do not imply:

government guarantee,
legal title guarantee,
transaction guarantee.

---

# 95. SCREEN 13 — PAYMENT POLICY

Uses shared Legal Reader.

Must align with:

* Razorpay/provider flow,
* Payment verification,
* duplicate payment handling,
* Subscription activation,
* Refund processing,
* Manual Activation honesty.

---

# 96. PAYMENT POLICY MANUAL ACTIVATION

If Admin support can manually activate a Plan:

the policy/help content should not falsely imply every active Subscription has a captured gateway Payment.

User billing should still show:

`Activated by support`

where applicable.

---

# 97. SCREEN 14 — DISCLAIMER

The source defines Disclaimer as a shorter page with a prominent callout.

Do not force unnecessary long legal sections.

---

# 98. DISCLAIMER REFERENCE CALLOUT

Reference:

`My Gujarat Property is an online listing and lead marketplace. We are not the owner of listed properties and do not provide legal or financial advice.`

---

# 99. DISCLAIMER REFERENCE BODY

Reference concept:

Users should independently verify:

* ownership documents,
* RERA registration,
* approvals

before transaction.

Listing review reduces but cannot eliminate inaccurate information.

---

# 100. DISCLAIMER DESIGN

Use the exact prominent callout style from Batch 16.

Do not render it as an ordinary small paragraph.

---

# 101. SCREEN 15 — GRIEVANCE POLICY

Uses shared Legal Reader plus:

**Grievance Officer contact block.**

---

# 102. GRIEVANCE OFFICER REFERENCE

Initials:

`HD`

Name:

`Hetal Dave`

Role:

`Grievance Officer`

Email:

`grievance@mygujaratproperty.com`

Address:

`802 Mondeal Heights, SG Highway, Ahmedabad 380015`

SLA reference:

`Acknowledged within 48 hours · resolved within 15 days`

---

# 103. GRIEVANCE CONTACT AUTHORITY

Do not hard-code officer information permanently into component code.

Use approved Legal/Platform configuration.

---

# 104. GRIEVANCE SLA HONESTY

Only publish the SLA that Legal and operations can meet.

Do not retain sample values without approval.

---

# 105. GRIEVANCE EMAIL ACTION

Email link must work.

Use proper accessible `mailto:` behavior where appropriate.

---

# 106. LEGAL PAGES SEO

Each Legal page must have intentional:

* Meta Title,
* Meta Description,
* Canonical,
* Indexability.

Do not leave final approved Legal pages noindex merely because preliminary placeholders were noindex, unless SEO policy intentionally keeps them noindex.

---

# 107. LEGAL SITEMAP INTEGRATION

Published Indexable Legal pages enter Batch 14 Sitemap.

Draft/unapproved Legal pages do not.

---

# 108. SCREEN 20 — COOKIE PREFERENCE MANAGER

The source defines Screen 20 as the same manager opened from:

* Cookie Policy,
* Footer.

Desktop:

Modal.

Mobile:

Bottom sheet.

---

# 109. COOKIE CATEGORIES

Exact categories:

1. Essential
2. Analytics
3. Marketing

---

# 110. ESSENTIAL COOKIES

Reference:

`Login, security and core features. Always on.`

Essential is mandatory.

User cannot disable it through preference UI.

---

# 111. ANALYTICS CONSENT

Reference:

`Anonymous usage data that helps us improve search and listings.`

Analytics should only initialize after consent where consent policy requires.

Do not load Analytics before user choice.

---

# 112. MARKETING CONSENT

Reference:

`Personalised offers and remarketing on other platforms.`

Marketing tracking should remain disabled until consent.

---

# 113. REJECT NON-ESSENTIAL

Action:

`Reject non-essential`

Sets:

* Analytics Off
* Marketing Off
* Essential On

Persist immediately according to consent architecture.

---

# 114. SAVE PREFERENCES

Action:

`Save preferences`

Persists selected values.

Closes modal/sheet on successful save.

Do not close after failed persistence without clear error.

---

# 115. COOKIE PREFERENCE STORAGE

Use an approved consent store.

For guest:

local consent cookie/storage appropriate to legal architecture.

For logged-in user:

optionally synchronize Profile consent while preserving current browser/device requirements.

---

# 116. CONSENT VERSIONING

Consent record should preserve:

* Consent Policy version,
* categories,
* timestamp.

When consent policy materially changes:

the system may need re-consent according to policy.

---

# 117. CONSENT BEFORE TRACKING

Critical:

Analytics/Marketing scripts must not initialize before the applicable consent choice.

Hiding a Cookie Banner after scripts already ran is not compliant behavior.

---

# 118. CONSENT WITHDRAWAL

User can revisit Footer Cookie Preferences at any time.

Turning Analytics/Marketing Off must stop future tracking behavior according to technical ability and approved policy.

---

# 119. COOKIE MANAGER DESKTOP MODAL

Required:

* title,
* category descriptions,
* Essential locked,
* Analytics toggle,
* Marketing toggle,
* Reject Non-Essential,
* Save Preferences.

Use Batch 1 Overlay patterns.

---

# 120. COOKIE MANAGER MOBILE SHEET

Exact mobile behavior:

Bottom sheet.

Content:

* Cookie Preferences
* Essential
* Always On
* Analytics
* Marketing
* Reject Non-Essential
* Save Preferences.

Respect safe area.

---

# 121. COOKIE MANAGER FOCUS

Desktop modal:

* focus trap,
* Escape behavior according to preference-manager policy,
* restore focus to trigger.

Mobile sheet:

* accessible heading,
* focus management,
* no body background scroll.

---

# 122. SCREEN 16 — BLOG LISTING

Reference route context:

Home → Blog.

Heading:

`Blog`

Category tabs:

* All
* Buying guides
* Locality spotlights
* RERA & legal
* Home loans

---

# 123. BLOG DATA AUTHORITY

Blog Listing queries Batch 14 Published Blog Posts.

Do not hard-code Blog card arrays.

---

# 124. PUBLISHED-ONLY RULE

Public Blog Listing must include only:

* Published Posts,
* publicly available Posts,
* current published revisions.

Draft Posts never appear.

---

# 125. BLOG CATEGORY FILTER

Category tabs filter actual Category relationships.

Do not use decorative local-only filters disconnected from database.

---

# 126. BLOG CATEGORY URL STATE

Category filtering should have a stable/shareable URL state where final design/SEO architecture requires it.

Avoid unnecessary indexable duplicate category parameters unless SEO policy approves them.

---

# 127. BLOG CARD 1 REFERENCE

Category:

`Buying guides`

Title:

`Carpet vs built-up vs super built-up: what you actually pay for`

Excerpt:

`The three area terms every Gujarat homebuyer should understand before comparing prices…`

Author initials:

`PT`

Author:

`Priya Trivedi`

Meta:

`6 min read · 1 Jul`

---

# 128. BLOG CARD 2 REFERENCE

Category:

`Locality spotlights`

Title:

`Vesu, Surat: why families keep choosing it`

Excerpt:

`Schools, connectivity and price bands in Surat's most in-demand residential belt…`

Author:

`Arjun Mehta`

Meta:

`8 min read · 26 Jun`

---

# 129. BLOG CARD 3 REFERENCE

Category:

`RERA & legal`

Title:

`How to read a RERA registration before booking`

Excerpt:

`Five things the RERA portal tells you about a project that the brochure won't…`

Author:

`Priya Trivedi`

Meta:

`5 min read · 19 Jun`

---

# 130. BLOG READING TIME

Calculate real estimated reading time from Published body.

Do not hard-code reading minutes.

Use consistent words-per-minute policy.

---

# 131. AUTHOR DATA

Use actual approved Author profile.

Do not use arbitrary Profile private data.

Public Author display includes:

* public Author name,
* initials/avatar.

---

# 132. BLOG PAGINATION

Reference:

1
2
3

Use real paginated query.

Do not load all Posts.

---

# 133. BLOG PAGINATION SEO

Use intentional canonical/prev-next behavior according to SEO architecture.

Do not create duplicate page URLs accidentally.

---

# 134. BLOG CATEGORY EMPTY STATE

Exact reference for Home Loans:

`No posts in "Home loans" yet`

`New guides are published weekly.`

Action:

`Browse all posts`

The weekly statement must be truthful.

If publication cadence is not guaranteed:

use approved CMS copy.

---

# 135. BROWSE ALL POSTS

Resets category filter to All.

No dead CTA.

---

# 136. BLOG IMAGE HANDLING

Use the Featured Image selected in Batch 14.

Validate responsive sizes.

Do not stretch images.

---

# 137. BLOG LIST LOADING STATE

Use Blog-card skeletons.

Do not flash fake reference Posts.

---

# 138. BLOG LIST ERROR STATE

Show safe recoverable error and Retry.

---

# 139. BLOG SEO

Blog Listing:

* Meta Title,
* Meta Description,
* Canonical,
* Sitemap inclusion.

Published Blog Posts:

individual metadata from Batch 14.

---

# 140. CURRENT BLOG GAP

A substantive public Blog route was not found in the inspected current implementation.

Batch 16 requires:

* Blog Listing,
* Categories,
* Pagination,
* Empty state,
* Blog Detail,
* Related Posts,
* reading progress.

---

# 141. SCREEN 17 — BLOG POST

The source shows mobile reference with:

* reading progress,
* Hero Image,
* Category,
* Title,
* Author,
* Reading Time,
* Published Date,
* body,
* Related Posts.

---

# 142. MOBILE READING PROGRESS

Reference:

reading progress at top.

It must reflect actual article scroll progress.

Do not animate fake progress by time.

---

# 143. READING PROGRESS CALCULATION

Calculate based on:

* article content start,
* article content end,
* viewport scroll position.

Clamp 0–100%.

---

# 144. BLOG POST REFERENCE TITLE

`Carpet vs built-up vs super built-up: what you actually pay for`

Use persistent fixture content in Development.

Do not hard-code production component.

---

# 145. BLOG POST CATEGORY

Reference:

`Buying guides`

Use actual Category relationship.

---

# 146. BLOG POST AUTHOR

Reference:

`Priya Trivedi`

Initials:

`PT`

Use public Author data.

---

# 147. BLOG POST META

Reference:

`6 min read · 1 Jul 2026`

Use actual:

* reading estimate,
* Published date.

---

# 148. BLOG BODY

Render Published structured CMS body.

Support:

* headings,
* paragraphs,
* images,
* approved content blocks.

No unsafe raw HTML.

---

# 149. ARTICLE TYPOGRAPHY

Use an intentional narrow reading measure.

Do not stretch paragraphs across full desktop width.

---

# 150. HERO IMAGE

Use actual Featured Image.

Provide responsive image optimization.

---

# 151. RELATED POSTS

Reference:

* How to read a RERA registration
* Vesu, Surat: why families choose it

Use real related-post selection.

Possible basis:

* shared Category,
* tags,
* explicit relation.

Do not hard-code titles.

---

# 152. RELATED POSTS CURRENT POST EXCLUSION

Do not show the current Post as Related.

---

# 153. RELATED POSTS PUBLISHED ONLY

Draft Posts are excluded.

---

# 154. BLOG POST NOT FOUND

Unknown/unpublished Slug:

return proper 404/public unavailable state.

Do not reveal Draft existence.

---

# 155. BLOG POST REVISION CONSISTENCY

Public Post must render one Published revision coherently.

---

# 156. BLOG STRUCTURED DATA

Use Article structured data when accurate:

* headline,
* author,
* published date,
* modified date,
* image.

Do not include nonexistent values.

---

# 157. SCREEN 18 — GUEST SUPPORT REQUEST

Reference title:

`Raise a support request`

The source explicitly states:

**Guest support form — rate-limited**

---

# 158. GUEST SUPPORT CATEGORIES

Reference options:

* Report a problem
* Account help
* Billing
* Other

Use controlled category values.

---

# 159. GUEST SUPPORT FORM

Collect only required contact and issue data.

Likely required:

* subject/category,
* contact method,
* message.

Do not collect unnecessary sensitive documents in the first form unless product explicitly supports attachments.

---

# 160. GUEST SUPPORT RATE LIMIT

Exact source:

`Guests can submit up to 3 requests per hour.`

Enforce server-side.

Do not rely only on local storage.

---

# 161. GUEST RATE LIMIT IDENTITY

Use a privacy-conscious abuse-control combination such as:

* normalized contact,
* session/device token,
* rate-limit infrastructure,
* masked network signal.

Do not expose raw security identifiers in UI.

---

# 162. RATE-LIMIT RESPONSE

When limit exceeded:

show safe clear message.

Do not create fake success.

---

# 163. GUEST SUPPORT PERSISTENCE

Successful submission creates a real:

Support Ticket or Guest Support Request linked to available guest contact identity.

Do not only send a frontend toast.

---

# 164. GUEST TICKET REFERENCE

Generate safe Ticket display ID.

Use the same Support system as:

* Batch 11 Admin Support,
* Screen 19 Logged-In Tickets.

Do not build a disconnected guest inbox system.

---

# 165. GUEST SUPPORT TRACKING

Exact source helper:

`Log in for faster tracking and replies.`

For Guest:

provide approved contact/email reply mechanism.

For Logged-in User:

link Ticket to Profile and Dashboard/My Tickets.

---

# 166. GUEST BILLING REQUEST

Billing category may require later identity/payment-reference verification.

Do not expose payment records based solely on unverified guest input.

---

# 167. GUEST REPORT A PROBLEM

A general Support request is not the same as the entity-specific Report button from Batch 4/15.

Keep workflows distinct.

---

# 168. SUBMIT REQUEST

Action:

`Submit request`

must:

* validate,
* rate-limit,
* persist,
* return Ticket reference,
* create appropriate internal queue item,
* send acknowledgment through available Provider honestly.

---

# 169. PROVIDER HONESTY

If Email Provider is unavailable:

Ticket creation still succeeds if database works.

Do not claim Email acknowledgment sent.

---

# 170. GUEST SUPPORT DUPLICATE SUBMIT

Client disable + server idempotency/rate-limit.

---

# 171. GUEST SUPPORT SECURITY

Sanitize message text.

Protect against:

* spam,
* injection,
* oversized payload.

---

# 172. SCREEN 19 — MY SUPPORT TICKETS

Logged-in title:

`My support tickets`

This is the public/User side of the same Support system used by Batch 11 Admin.

---

# 173. TICKET REFERENCE 1

Title:

`Photos not uploading on listing`

Reference:

`#T-1204 · updated 2 hrs ago`

Status:

`Open`

---

# 174. TICKET REFERENCE 2

Title:

`Invoice email not received`

Reference:

`#T-1122 · resolved 28 Jun`

Status:

`Resolved`

---

# 175. TICKET LIST OWNERSHIP

Logged-in user may only see their own Tickets.

RLS/server authorization required.

Do not trust Profile ID from Client.

---

# 176. TICKET LIST SORT

Most recently updated first.

---

# 177. TICKET STATUS

Support User-visible statuses should map coherently to Admin states.

Examples:

* Open
* Replied
* Waiting on You
* Resolved

Do not expose confusing internal-only workflow names directly if mapping is required.

---

# 178. TICKET LIST PAGINATION

Use pagination when needed.

---

# 179. TICKET LIST LOADING

Use Ticket-card skeletons.

---

# 180. TICKET LIST EMPTY STATE

Reference-style positive state:

No Support Tickets yet.

Provide Help/FAQ action.

---

# 181. TICKET THREAD

Reference:

`#T-1204 — thread`

Status:

`Open`

User message:

`Photos stall at 90% on my 3 BHK listing, tried twice on WiFi.`

Support reply:

`Thanks Rajesh — could you tell us the approximate file size of photo 5? Files over 10 MB are rejected by the uploader.`

Author:

`Support · 2 hrs ago`

---

# 182. READ-ONLY THREAD RULE

The source explicitly describes:

**read-only thread**

Therefore Screen 19 does not become a general chat composer unless a later explicit design changes it.

Do not invent a reply box.

---

# 183. FOLLOW-UP RESPONSE MODEL

If support needs User follow-up but public thread is read-only:

use the approved workflow such as:

* new response form from Ticket detail if a later design exists,
* email reply ingestion,
* status-driven Support request follow-up.

For Batch 16 exact screen:

do not add an unsourced composer.

---

# 184. TICKET THREAD DATA

Use real:

* user messages,
* support replies,
* timestamps,
* authorship.

Do not hard-code sample Thread.

---

# 185. ADMIN SUPPORT CONNECTION

Batch 11 Admin Ticket Detail and Batch 16 My Tickets must use the same:

* Ticket,
* Message,
* Status,
* Assignment

records.

A Support reply sent by Admin must appear to the User.

---

# 186. TICKET RESOLUTION

When Admin resolves a Ticket:

User Ticket list/detail updates.

Do not keep stale Open status.

---

# 187. TICKET PRIVACY

Ticket messages are private.

Only:

* Ticket owner,
* authorized Support Staff

may access.

---

# 188. TICKET ATTACHMENTS

If attachments are later enabled:

use private storage and authorization.

Do not expose public URLs.

---

# 189. TICKET DEEP LINK

Notification for Support reply can open exact Ticket.

---

# 190. CURRENT SUPPORT PUBLIC GAP

Current public Support page is only static:

* Email Support,
* Grievance,
* Response Time.

Batch 16 requires:

* Guest Support Request,
* Rate Limiting,
* My Tickets,
* Ticket Thread.

The static Support information may be integrated into:

* Contact,
* FAQ,
* Support form

where the design allows.

Do not retain the old page as a competing generic Support experience.

---

# 191. CURRENT ADMIN SUPPORT CONNECTION GAP

Batch 11 requires Admin Support Queue/Thread.

Batch 16 must not create a second incompatible public Ticket schema.

One Support system only.

---

# 192. PUBLIC CONTENT ROUTE ARCHITECTURE

Create stable routes for:

* About,
* Contact,
* Help,
* Safety,
* Legal pages,
* Blog,
* Blog Post,
* Support request,
* My Tickets.

Use final route naming consistently.

---

# 193. AUTH-AWARE SUPPORT ROUTING

When Guest opens:

Raise Ticket

→ Guest Support Request.

When logged-in User opens:

Raise Ticket

→ authenticated Ticket flow / same form with Profile linkage.

---

# 194. ROUTE PRIVACY

`My Tickets`

requires Auth.

Unauthenticated direct access:

open Auth flow or redirect safely with return intent.

Do not expose Ticket existence.

---

# 195. PUBLIC CONTENT CACHE

CMS/Blog/Legal public pages can use caching appropriate to content.

Batch 14 Publish must invalidate relevant cache.

Do not leave stale Legal content after approved Publish.

---

# 196. CONTENT REVISION CACHE KEY

Cache by:

* entity,
* Published revision/version

or invalidation mechanism.

Do not serve old content indefinitely.

---

# 197. LEGAL CACHE PRIORITY

Legal Publish changes must propagate reliably.

Do not rely on long stale cache without invalidation.

---

# 198. COOKIE CONSENT CACHE RULE

Cookie preference UI/state should not be statically cached per user globally.

Consent is user/browser-specific.

---

# 199. BLOG CACHE RULE

Blog Listing cache must invalidate after:

* Publish,
* Unpublish,
* Category update,
* Featured Image update.

---

# 200. BLOG PAGINATION CONSISTENCY

Avoid duplicate/missing Post issues during live updates by using stable ordering.

Recommended:

Published date descending + stable ID tie-breaker.

---

# 201. CONTACT FORM DATA MODEL

Support:

* category,
* requester Profile if logged in,
* guest name/contact where applicable,
* subject/message,
* status,
* routing target,
* timestamps.

---

# 202. SUPPORT TICKET DATA MODEL

Use the same shared Ticket model from Batch 11.

Required:

* display ID,
* requester Profile nullable for Guest,
* guest contact relation/snapshot where needed,
* category,
* subject,
* priority,
* status,
* assigned Staff,
* created/updated/resolved timestamps.

---

# 203. SUPPORT MESSAGE DATA MODEL

Support:

* Ticket ID,
* sender type,
* Profile/Staff reference,
* body,
* created time.

---

# 204. GUEST TICKET SECURITY TOKEN

If Guest needs a secure tracking link:

use high-entropy token.

Store hash server-side.

Do not expose Ticket access by predictable `T-1204` alone.

---

# 205. COOKIE CONSENT DATA MODEL

Support:

* anonymous/browser consent ID where needed,
* Profile ID optional,
* Essential = true,
* Analytics bool,
* Marketing bool,
* policy version,
* consent time,
* updated time.

---

# 206. PUBLIC SEO INTEGRATION

Batch 16 public pages connect to Batch 14 SEO.

For every CMS/Legal/Blog page:

resolve:

* Meta Title,
* Meta Description,
* Canonical,
* Indexable,
* Open Graph where approved.

---

# 207. SITEMAP INTEGRATION

Include when Published and Indexable:

* About,
* Contact if policy allows,
* Help,
* Safety,
* Legal pages,
* Blog Listing,
* Blog Posts.

Do not include:

* Guest Support Form if policy is Noindex,
* My Tickets,
* private Ticket Threads,
* Cookie Preferences state URLs.

---

# 208. SUPPORT SEO POLICY

Support forms and private Ticket pages should not be indexable.

FAQ and Safety may be indexable if SEO policy approves.

---

# 209. BLOG DRAFT SEO

Draft Posts:

* inaccessible publicly,
* not in Sitemap,
* no public metadata leak.

---

# 210. LEGAL DRAFT SEO

Unpublished Legal revision does not change public metadata or body.

---

# 211. PUBLIC PAGE ERROR STATES

Every content route needs safe behavior for:

* content load failure,
* Published revision missing,
* media failure.

Do not expose database errors.

---

# 212. ABOUT ERROR STATE

If About content temporarily fails:

render safe retry/unavailable state.

Do not accidentally render Draft.

---

# 213. CONTACT SUBMISSION ERROR

Preserve typed form input where safe.

Show inline/actionable error.

Do not clear form on failed submit.

---

# 214. FAQ ERROR STATE

Show safe Retry.

Do not display empty category and pretend no Questions exist if query failed.

---

# 215. BLOG ERROR STATE

Differentiate:

* no Posts in Category,
* load failure.

---

# 216. SUPPORT ERROR STATE

Failed Ticket submission:

* no fake Ticket ID,
* no false success.

---

# 217. COOKIE SAVE ERROR

Keep dialog open.

Show safe error.

Do not claim Preferences Saved.

---

# 218. FORM VALIDATION RULE

Contact and Support forms require:

* inline field errors,
* top-level error summary where appropriate,
* server validation,
* safe length limits.

---

# 219. SPAM PROTECTION

Protect:

* Contact,
* Guest Support

with:

* rate limits,
* honeypot or approved abuse mechanism,
* duplicate protection.

Do not use invisible fake success.

---

# 220. CAPTCHA PROVIDER HONESTY

If CAPTCHA Provider is configured:

use it appropriately.

If not configured:

do not render fake CAPTCHA badge.

Rate limiting must still exist.

---

# 221. CONTACT/SUPPORT PII

Do not show guest contact details publicly.

Admin display follows permission rules.

---

# 222. MAP PROVIDER CROSS-BATCH INTEGRATION

Batch 13 Provider Status controls Maps availability.

Batch 16 Contact must respond to actual status.

### Active

Map may render.

### Setup Required/Error

Address fallback.

No fake Map.

---

# 223. WHATSAPP PROVIDER CROSS-BATCH INTEGRATION

Batch 13 external WhatsApp Notification provider status must not be confused with native WhatsApp support intent.

Clearly distinguish:

* automated Provider delivery,
* user-initiated WhatsApp support link.

---

# 224. ANALYTICS CONSENT CROSS-BATCH INTEGRATION

Batch 13 Analytics provider Active is not sufficient to track a user.

Batch 16/17 Consent must also permit Analytics.

Required:

Provider Active
AND
Consent Analytics On
→ initialize Analytics.

---

# 225. MARKETING CONSENT CROSS-BATCH INTEGRATION

Marketing tag activation requires:

* Provider/config available,
* Marketing consent On.

---

# 226. COOKIE PREFERENCE SYNCHRONIZATION

The preference manager and Batch 17 initial consent prompt must read/write the same state.

Do not show initial prompt again immediately after the user saves preferences through Cookie Policy.

---

# 227. PUBLIC LANGUAGE INTEGRATION

About/Help/Safety/Legal/Blog UI chrome should respect selected interface language where translations exist.

Content translation availability must be honest.

Do not machine-invent legal translation at runtime without approved content process.

---

# 228. LEGAL TRANSLATION SAFETY

Legal translations require approved Legal/content workflow.

If Gujarati translation is unavailable:

use approved English fallback.

Clearly avoid presenting unreviewed automatic translation as authoritative Legal text.

---

# 229. BLOG LOCALIZATION

Blog content may remain in available Published language.

Do not fake translated body.

---

# 230. ABOUT CONTENT LOCALIZATION

Use Published localized CMS content where available.

Fallback according to localization policy.

---

# 231. RESPONSIVE VERIFICATION MATRIX

Test at minimum:

* 360px
* 390px reference mobile
* 768px tablet
* tablet landscape
* 1280px desktop
* wide desktop

All 20 screen groups must be tested.

---

# 232. ABOUT RESPONSIVE CHECK

Verify:

* title wrapping,
* intro width,
* trust blocks,
* Footer links.

No clipping.

---

# 233. CONTACT RESPONSIVE CHECK

Verify mobile 390 exact reference.

On desktop:

form and Contact information use intentional layout.

Map fallback remains readable.

---

# 234. FAQ RESPONSIVE CHECK

Desktop category navigation and accordion.

Mobile category controls must not overflow.

---

# 235. SAFETY RESPONSIVE CHECK

Mobile-first Safety cards/sections.

44px touch targets.

---

# 236. LEGAL DESKTOP RESPONSIVE CHECK

Verify:

* sticky TOC,
* body column,
* header offset,
* readable line length.

---

# 237. LEGAL MOBILE RESPONSIVE CHECK

Verify:

* collapsible TOC,
* no sticky sidebar,
* anchor behavior,
* section spacing,
* long Legal words/URLs.

---

# 238. COOKIE MODAL RESPONSIVE CHECK

Desktop:

modal.

Mobile:

bottom sheet.

Do not show desktop modal squeezed at 390px.

---

# 239. BLOG LIST RESPONSIVE CHECK

Desktop cards/grid/list according to exact design.

Mobile stack.

Pagination accessible.

---

# 240. BLOG POST RESPONSIVE CHECK

Reference mobile must match:

* progress bar,
* Hero Image,
* Category,
* Title,
* Author,
* Meta,
* body,
* Related Posts.

Desktop expands intentionally.

---

# 241. SUPPORT FORM RESPONSIVE CHECK

Keyboard must not cover:

* message field,
* Submit Request.

---

# 242. MY TICKETS RESPONSIVE CHECK

Ticket cards remain readable.

Thread messages wrap.

No horizontal overflow.

---

# 243. TEXT WRAPPING VERIFICATION

Inspect:

* About headline,
* Contact categories,
* long FAQ Questions,
* Legal section titles,
* long Legal links,
* Grievance email,
* Blog titles,
* excerpts,
* Support Ticket titles,
* long Support messages.

Fix:

* clipping,
* badge collision,
* accidental two-line buttons,
* hidden text.

Do not randomly shrink typography.

---

# 244. PUBLIC HEADER STICKY OVERLAP TEST

Test anchor navigation and page starts under sticky Public Header.

Legal section anchor must not hide heading.

---

# 245. MOBILE SAFE AREA

Cookie bottom sheet and any sticky mobile actions must respect:

`env(safe-area-inset-bottom)`.

---

# 246. KEYBOARD TEST

Test Contact, Support and Cookie manager with mobile keyboard.

No inaccessible button.

---

# 247. LOADING STATES

Required for dynamic content:

* About CMS content,
* Contact submission,
* FAQ,
* Safety CMS content,
* Legal content,
* Blog Listing,
* Blog Post,
* My Tickets,
* Ticket Thread.

Use appropriate skeleton/loading state.

---

# 248. EMPTY STATES

Required:

### Blog Category

No Posts in selected Category.

### My Tickets

No Tickets yet.

### FAQ Category

No Questions where genuinely empty.

Do not use empty state for query error.

---

# 249. NO DEAD UI RULE

Every visible Batch 16 action must work.

Includes:

* About nav,
* Terms,
* Privacy,
* Cookie Preferences,
* Grievance,
* Contact Subject/category,
* Send Message,
* WhatsApp Support,
* FAQ category tabs,
* FAQ accordions,
* Raise a Ticket,
* Safety Report guidance link,
* Legal TOC links,
* Mobile TOC collapse,
* Listing Policy internal links,
* Cookie Manage button,
* Essential locked state,
* Analytics toggle,
* Marketing toggle,
* Reject Non-Essential,
* Save Preferences,
* Blog categories,
* Blog cards,
* Pagination,
* Browse All Posts,
* Related Posts,
* Submit Support Request,
* My Ticket cards,
* Ticket Thread navigation.

No:

`href="#"`.

No empty click handlers.

---

# 250. SCREEN 1 FINAL CHECKLIST — ABOUT

* [ ] Public Header
* [ ] Home/About nav
* [ ] exact headline
* [ ] intro content
* [ ] Reviewed Before Live block
* [ ] Your Number, Your Call block
* [ ] Built for Gujarat block
* [ ] qualitative trust copy only
* [ ] no fake stats
* [ ] CMS-driven Published content
* [ ] Footer
* [ ] Terms link
* [ ] Privacy link
* [ ] Cookie Preferences trigger
* [ ] Grievance link
* [ ] responsive mobile/tablet/desktop
* [ ] SEO metadata
* [ ] Sitemap eligibility

---

# 251. SCREEN 2 FINAL CHECKLIST — CONTACT

* [ ] Contact Us title
* [ ] Listing Question
* [ ] Account Help
* [ ] Billing
* [ ] Partnership
* [ ] Other
* [ ] real category routing
* [ ] Send Message
* [ ] client validation
* [ ] server validation
* [ ] persistence
* [ ] success state
* [ ] duplicate protection
* [ ] rate limiting
* [ ] Map Active state
* [ ] Map Setup Required fallback
* [ ] physical address
* [ ] Support Email
* [ ] WhatsApp Support
* [ ] support hours
* [ ] configured content authority
* [ ] responsive behavior

---

# 252. SCREEN 3 FINAL CHECKLIST — FAQ

* [ ] How Can We Help title
* [ ] Listings category
* [ ] Account & Login
* [ ] Payments
* [ ] Verification
* [ ] Safety
* [ ] functional category filtering
* [ ] FAQ accordions
* [ ] Pending Listing Question
* [ ] Edit Live Listing Question
* [ ] Contact Visibility Question
* [ ] Refund Question
* [ ] real workflow-consistent answers
* [ ] CMS authority
* [ ] accessible accordion
* [ ] Still Need Help
* [ ] Raise a Ticket
* [ ] guest/auth routing
* [ ] responsive behavior

---

# 253. SCREEN 4 FINAL CHECKLIST — SAFETY

* [ ] Safety Guidelines title
* [ ] intro copy
* [ ] Never Share OTP
* [ ] Verify Before Advance
* [ ] Meet Safely
* [ ] Report Suspicious Activity
* [ ] no false promises
* [ ] Report system consistency
* [ ] CMS-managed content
* [ ] mobile exact design
* [ ] tablet/desktop behavior
* [ ] accessibility

---

# 254. SHARED LEGAL LAYOUT FINAL CHECKLIST

* [ ] one shared component
* [ ] Public Header
* [ ] title
* [ ] Last Updated
* [ ] effective/context label
* [ ] desktop sticky TOC
* [ ] numbered sections
* [ ] anchor scrolling
* [ ] active section where designed
* [ ] mobile collapsible TOC
* [ ] TOC section count
* [ ] consistent typography
* [ ] consistent spacing
* [ ] Published Legal revision only
* [ ] sanitized rendering
* [ ] canonical route
* [ ] SEO metadata
* [ ] Sitemap integration
* [ ] Footer

---

# 255. SCREEN 5 FINAL CHECKLIST — TERMS

* [ ] Terms & Conditions title
* [ ] Acceptance of Terms
* [ ] Eligibility & Accounts
* [ ] Listings & Content
* [ ] Fees & Payments
* [ ] Prohibited Conduct
* [ ] Termination
* [ ] Governing Law
* [ ] actual Last Updated date
* [ ] approved Legal content
* [ ] Listing Policy internal link
* [ ] no preliminary placeholder text
* [ ] Legal version integrity

---

# 256. SCREEN 6 FINAL CHECKLIST — PRIVACY

* [ ] shared layout
* [ ] approved Privacy revision
* [ ] data-practice accuracy
* [ ] contact masking explanation
* [ ] contact reveal consistency
* [ ] Support data coverage
* [ ] Security logging explanation where approved
* [ ] Payment Provider data explanation
* [ ] Cookie/consent connection
* [ ] metadata/index policy

---

# 257. SCREEN 7 FINAL CHECKLIST — COOKIE POLICY

* [ ] shared Legal layout
* [ ] actual Cookie Policy content
* [ ] Manage Cookie Preferences action
* [ ] opens Screen 20
* [ ] Footer trigger opens same manager
* [ ] no separate preference state
* [ ] consent version connection

---

# 258. SCREEN 8 FINAL CHECKLIST — REFUND POLICY

* [ ] shared layout
* [ ] Batch 10 refund-flow consistency
* [ ] Batch 12 Admin Refund consistency
* [ ] provider processing honesty
* [ ] Credit Note consistency
* [ ] no preliminary placeholder
* [ ] approved Published revision

---

# 259. SCREEN 9 FINAL CHECKLIST — CANCELLATION POLICY

* [ ] separate public page
* [ ] shared Legal layout
* [ ] Subscription cancellation behavior
* [ ] billing-period access wording
* [ ] renewal behavior
* [ ] approved Legal content
* [ ] no conflicting Refund content

---

# 260. SCREEN 10 FINAL CHECKLIST — LISTING POLICY

* [ ] shared layout
* [ ] DO strip
* [ ] real recent photos
* [ ] true expected price
* [ ] mark sold promptly
* [ ] DON'T strip
* [ ] no duplicate property
* [ ] no phone number in photos/text
* [ ] no unauthorized property
* [ ] moderation consistency
* [ ] duplicate-detection consistency

---

# 261. SCREEN 11 FINAL CHECKLIST — ADVERTISING POLICY

* [ ] shared layout
* [ ] Builder Campaign consistency
* [ ] Ad moderation consistency
* [ ] creative requirements
* [ ] targeting restrictions
* [ ] RERA linkage
* [ ] misleading pricing prohibition
* [ ] approved Legal content

---

# 262. SCREEN 12 FINAL CHECKLIST — VERIFICATION POLICY

* [ ] shared layout
* [ ] Identity Verification explanation
* [ ] Listing Review explanation
* [ ] Project/RERA explanation
* [ ] Badge meaning
* [ ] Badge limitation
* [ ] no guarantee claims
* [ ] approved Legal content

---

# 263. SCREEN 13 FINAL CHECKLIST — PAYMENT POLICY

* [ ] shared layout
* [ ] Payment verification
* [ ] provider flow
* [ ] duplicate-payment handling
* [ ] Subscription activation
* [ ] Refund processing
* [ ] Manual Activation honesty
* [ ] no unsupported payment claims

---

# 264. SCREEN 14 FINAL CHECKLIST — DISCLAIMER

* [ ] short-page design
* [ ] prominent callout
* [ ] marketplace role statement
* [ ] no legal-advice statement
* [ ] no financial-advice statement
* [ ] independent document verification
* [ ] RERA verification advice
* [ ] review limitation
* [ ] approved content

---

# 265. SCREEN 15 FINAL CHECKLIST — GRIEVANCE

* [ ] shared Legal layout
* [ ] Grievance Officer block
* [ ] initials/avatar
* [ ] officer name
* [ ] role
* [ ] grievance email
* [ ] address
* [ ] acknowledgment SLA
* [ ] resolution SLA
* [ ] configuration/content authority
* [ ] working contact action
* [ ] approved Legal content

---

# 266. SCREEN 20 FINAL CHECKLIST — COOKIE PREFERENCES

* [ ] Desktop Modal
* [ ] Mobile Bottom Sheet
* [ ] Cookie Preferences title
* [ ] Essential category
* [ ] Essential Always On
* [ ] Essential cannot disable
* [ ] Analytics category
* [ ] Analytics toggle
* [ ] Marketing category
* [ ] Marketing toggle
* [ ] Reject Non-Essential
* [ ] Save Preferences
* [ ] persistent consent
* [ ] consent version
* [ ] Cookie Policy trigger
* [ ] Footer trigger
* [ ] same shared state as Batch 17 prompt
* [ ] no Analytics before consent
* [ ] no Marketing before consent
* [ ] withdrawal supported
* [ ] save-error state
* [ ] focus management
* [ ] safe-area support

---

# 267. SCREEN 16 FINAL CHECKLIST — BLOG LISTING

* [ ] Blog title
* [ ] All category
* [ ] Buying Guides
* [ ] Locality Spotlights
* [ ] RERA & Legal
* [ ] Home Loans
* [ ] real Category filters
* [ ] Published Posts only
* [ ] Featured Image
* [ ] Category label
* [ ] Title
* [ ] Excerpt
* [ ] Author initials/avatar
* [ ] Author name
* [ ] real reading time
* [ ] Published date
* [ ] pagination
* [ ] page 1/2/3 state according to data
* [ ] Category Empty state
* [ ] Browse All Posts
* [ ] loading skeleton
* [ ] error/retry
* [ ] Batch 14 authority
* [ ] SEO/Sitemap integration

---

# 268. SCREEN 17 FINAL CHECKLIST — BLOG POST

* [ ] Reading Progress
* [ ] real scroll calculation
* [ ] Hero Image
* [ ] Category
* [ ] Post Title
* [ ] Author
* [ ] reading time
* [ ] Published Date
* [ ] structured body rendering
* [ ] safe CMS blocks
* [ ] readable content width
* [ ] Related Posts
* [ ] current Post excluded
* [ ] Draft Posts excluded
* [ ] public 404 for unpublished Slug
* [ ] Article metadata
* [ ] responsive exact mobile behavior

---

# 269. SCREEN 18 FINAL CHECKLIST — GUEST SUPPORT

* [ ] Raise Support Request title
* [ ] Report a Problem
* [ ] Account Help
* [ ] Billing
* [ ] Other
* [ ] real message fields
* [ ] client validation
* [ ] server validation
* [ ] maximum 3 requests/hour
* [ ] server-side rate limit
* [ ] rate-limit error
* [ ] real Ticket persistence
* [ ] safe Ticket reference
* [ ] internal Support queue connection
* [ ] guest contact handling
* [ ] login tracking helper
* [ ] Submit Request
* [ ] duplicate protection
* [ ] acknowledgment honesty
* [ ] no fake success
* [ ] responsive keyboard-safe form

---

# 270. SCREEN 19 FINAL CHECKLIST — MY TICKETS

* [ ] authenticated access
* [ ] My Support Tickets title
* [ ] own Tickets only
* [ ] Ticket title
* [ ] display ID
* [ ] updated date/time
* [ ] Open status
* [ ] Resolved status
* [ ] most-recently-updated order
* [ ] pagination
* [ ] loading state
* [ ] Empty state
* [ ] Ticket Detail
* [ ] read-only Thread
* [ ] User Message
* [ ] Support Reply
* [ ] Staff author label
* [ ] timestamps
* [ ] Admin Support shared schema
* [ ] status synchronization
* [ ] private authorization
* [ ] no unsourced composer

---

# 271. CURRENT REPOSITORY RECONCILIATION — PUBLIC LAYOUT

Preserve current shared Public Layout foundations where compatible.

However, verify exact Batch 1 shell rules.

Do not use current shell as excuse to skip pixel matching.

---

# 272. CURRENT REPOSITORY RECONCILIATION — FOOTER

Current Footer routes unfinished Company links to `/support`.

Replace temporary fallbacks.

Add exact Batch 16 public routes and Cookie Preferences trigger.

---

# 273. CURRENT REPOSITORY RECONCILIATION — LEGAL

Current Terms and Refund pages are preliminary hard-coded placeholders with lawyer-review notices.

Replace with:

* Batch 14 Legal revisions,
* Batch 16 shared Legal Reader,
* final approved content.

---

# 274. CURRENT REPOSITORY RECONCILIATION — SUPPORT

Current public Support route is static information only.

Replace/reconcile with:

* Contact,
* FAQ,
* Guest Support Request,
* My Tickets.

Do not create duplicate competing Support entry points.

---

# 275. CURRENT REPOSITORY RECONCILIATION — BLOG

No substantive public Blog implementation was confirmed in the inspected current route architecture.

Build Screens 16–17 using Batch 14 Blog authority.

---

# 276. CURRENT REPOSITORY RECONCILIATION — COOKIE MANAGER

No complete shared Cookie Preference manager was confirmed.

Build Screen 20 and use it from:

* Cookie Policy,
* Footer,
* Batch 17 initial Consent prompt.

---

# 277. CURRENT REPOSITORY RECONCILIATION — SITEMAP

Extend Batch 14 Sitemap architecture for Published Batch 16 routes.

Do not add:

* My Tickets,
* Ticket Threads,
* private support tracking links.

---

# 278. CURRENT REPOSITORY RECONCILIATION — SUPPORT EMAIL

Current public Support and design reference use support email consistently.

Centralize configuration.

Do not duplicate values across components.

---

# 279. DEVELOPMENT REFERENCE DATA REQUIREMENT

Create persistent real development/reference fixtures.

Do not hard-code Batch sample data into components.

---

# 280. ABOUT REFERENCE FIXTURE

Create Published CMS Page containing Batch About reference copy and trust blocks.

---

# 281. FAQ REFERENCE FIXTURES

Create categories:

* Listings
* Account & Login
* Payments
* Verification
* Safety

Add reference Questions.

---

# 282. SAFETY REFERENCE FIXTURE

Create Published Safety CMS content with four reference Safety rules.

---

# 283. LEGAL REFERENCE FIXTURES

Create legally marked Development fixtures for all 11 Legal pages.

Important:

Do not confuse sample Development content with final lawyer-approved production content.

Production deployment requires approved revisions.

---

# 284. BLOG REFERENCE FIXTURES

Create Published fixture Posts:

1. Carpet vs built-up vs super built-up
2. Vesu, Surat
3. How to read a RERA registration

Create Authors:

* Priya Trivedi
* Arjun Mehta

Create real Category relations.

---

# 285. BLOG EMPTY CATEGORY FIXTURE

Create:

Home Loans

category with zero Published Posts.

Verify exact empty state.

---

# 286. SUPPORT REFERENCE FIXTURES

Create User fixture:

Rajesh.

Tickets:

### T-1204-style

Photos not uploading.

Status:

Open.

### T-1122-style

Invoice Email not received.

Status:

Resolved.

Create real User/Support messages.

---

# 287. REFERENCE DATA NON-DELETION

Do not automatically delete reference fixtures after verification.

They should remain available in Development for future regression testing.

Sensitive data must remain fake/test-safe.

---

# 288. FULL CONNECTED BATCH 16 REGRESSION FLOW

Execute this complete real flow:

Open public Homepage
→ Footer About Us
→ verify real About route
→ verify Published Batch 14 CMS content
→ inspect trust blocks
→ Footer Contact
→ select Listing Question
→ submit real test Contact message
→ inspect persisted record/internal routing
→ disable Maps Provider in isolated Development state
→ reopen Contact
→ verify Setup Required Map fallback and address
→ open FAQ
→ select Listings
→ expand Pending Listing Question
→ verify real answer
→ select Payments
→ inspect Refund FAQ consistency
→ Raise Ticket as Guest
→ verify Guest Support route
→ submit 3 test requests within allowed window
→ attempt fourth
→ verify server Rate Limit
→ login test Owner
→ open My Tickets
→ verify only own Tickets
→ open T-1204 fixture
→ verify read-only Thread
→ send Admin Support reply from Batch 11 Staff flow
→ refresh public Ticket
→ verify reply appears
→ resolve Admin Ticket
→ verify public status updates
→ open Safety page
→ verify all four rules
→ open Terms
→ verify sticky desktop TOC
→ click section
→ verify Header offset
→ test mobile collapsible TOC
→ open Privacy
→ verify Published approved revision only
→ open Cookie Policy
→ click Manage Cookie Preferences
→ verify desktop Modal
→ Reject Non-Essential
→ inspect stored consent
→ verify Analytics and Marketing do not initialize
→ open Footer Cookie Preferences
→ enable Analytics only
→ save
→ verify Analytics initializes only when Provider Active
→ verify Marketing remains Off
→ test 390px
→ verify Cookie Bottom Sheet
→ open Refund
→ verify shared Legal layout
→ open Cancellation
→ verify distinct content
→ open Listing Policy
→ verify Do/Don't strip
→ open Advertising Policy
→ verify exact shared layout
→ open Verification Policy
→ verify badge limitation language
→ open Payment Policy
→ verify payment-flow consistency
→ open Disclaimer
→ verify short prominent callout
→ open Grievance
→ verify Officer block and contact action
→ open Blog
→ filter Buying Guides
→ open Post
→ verify Featured Image
→ scroll article
→ verify progress reflects scroll
→ verify Related Posts
→ return Blog
→ filter Home Loans
→ verify Category Empty state
→ Browse All Posts
→ verify category reset
→ inspect metadata and canonical for all representative pages
→ regenerate Sitemap from Batch 14
→ verify Published Indexable public pages included
→ verify Ticket/private Support routes excluded
→ run 390px mobile regression
→ tablet regression
→ desktop regression.

Any broken connection means Batch 16 is incomplete.

---

# 289. CMS PUBLISH CONNECTION TEST

Edit About Draft in Batch 14.

Autosave.

Public About must remain old Published version.

Publish Draft.

Refresh About.

New Published content appears.

---

# 290. LEGAL PUBLISH CONNECTION TEST

Legal v6 Published.

Create v7 Draft.

Public still v6.

Request Sign-Off.

Public still v6.

Sign-Off v7.

Public still v6 until Publish.

Publish.

Public becomes v7.

---

# 291. COOKIE CONSENT PRE-LOAD TEST

Fresh browser.

Before consent:

inspect Network.

Expected:

no unauthorized Analytics/Marketing requests.

---

# 292. COOKIE CONSENT WITHDRAWAL TEST

Enable Analytics.

Verify allowed Analytics initialization.

Open Footer preferences.

Disable Analytics.

Save.

Verify future tracking behavior follows withdrawal architecture.

---

# 293. GUEST SUPPORT RATE-LIMIT TEST

Use same approved rate-limit identity.

Requests:

1 → accepted
2 → accepted
3 → accepted
4 within one hour → blocked.

Do not create fourth Ticket.

---

# 294. SUPPORT AUTHORIZATION TEST

User A attempts direct URL/API access to User B Ticket.

Expected:

Forbidden/not found safe response.

No Ticket content leak.

---

# 295. BLOG DRAFT LEAK TEST

Create Draft Blog Post.

Attempt guessed public Slug.

Expected:

404/unavailable.

Not in:

* Blog List,
* Sitemap,
* Related Posts.

---

# 296. LEGAL ROUTE DUPLICATE TEST

Check final canonical Legal route.

Old route:

redirects intentionally.

Verify:

no two indexable copies.

---

# 297. MAP FALLBACK TEST

Maps Provider:

Setup Required.

Expected:

* no broken iframe,
* address visible,
* Setup Required message.

Provider Active:

approved Map experience.

---

# 298. PROVIDER/CONSENT MATRIX TEST

Test:

### Analytics Provider Missing + Consent On

No fake Analytics.

Provider Setup Required behavior.

### Provider Active + Consent Off

No Analytics tracking.

### Provider Active + Consent On

Analytics may initialize.

This matrix is mandatory.

---

# 299. PERMISSION AND CONTENT REGRESSION

Test Batch 14 Admin roles:

### Content Editor

Can edit CMS Draft.

Cannot bypass Publish permission.

### Legal Editor

Can edit Draft.

Cannot publish without Sign-Off.

### Legal Reviewer

Can Sign-Off exact revision.

### Blog Publisher

Can Publish Blog.

Verify Batch 16 public rendering reflects only valid Published content.

---

# 300. LIVE VERIFICATION STANDARD

After each implementation group:

1. run Build,
2. run TypeScript check,
3. run Lint where configured,
4. start actual application,
5. test as Guest,
6. test as Owner,
7. test as Broker,
8. test as Builder where links differ,
9. test as Content Manager,
10. test as Legal Reviewer,
11. test as Support Staff,
12. verify CMS persistence,
13. verify published content,
14. verify Draft privacy,
15. verify Ticket persistence,
16. verify Ticket authorization,
17. verify rate limits,
18. verify consent state,
19. inspect Network before/after consent,
20. verify Provider fallback,
21. verify metadata,
22. verify canonical,
23. verify Sitemap inclusion/exclusion,
24. refresh Browser,
25. verify persistence,
26. test 390px,
27. test tablet,
28. test desktop,
29. inspect Browser console,
30. inspect failed Network requests,
31. inspect sensitive-data leakage.

Static code review is not PASS.

---

# 301. MANUAL VISUAL VERIFICATION

Compare each screen directly with the exact Batch 16 source.

Check:

* About headline,
* About intro measure,
* trust-block spacing,
* Contact mobile layout,
* subject/category field,
* address fallback,
* FAQ category controls,
* accordion spacing,
* Safety mobile layout,
* Legal TOC width,
* sticky behavior,
* Legal typography,
* mobile collapsed TOC,
* Listing Policy Do/Don't strip,
* Disclaimer callout,
* Grievance Officer card,
* Cookie Modal,
* Cookie Bottom Sheet,
* Blog category tabs,
* Blog card content hierarchy,
* Pagination,
* Empty Category state,
* mobile Blog Post progress,
* Author row,
* body typography,
* Related Posts,
* Guest Support form,
* My Ticket cards,
* Thread bubbles/content blocks.

`Almost the same` is not PASS.

---

# 302. COMPLETION BLOCKERS

Batch 16 must not be marked complete while any of these remain:

* About route points to Support,
* Contact route points to Support,
* Help Center route points to Support,
* About content hard-coded and disconnected from Batch 14,
* Contact Send Message has fake success,
* Contact Map shows broken provider frame,
* FAQ category chips decorative only,
* FAQ answers conflict with real workflows,
* Safety Report CTA dead,
* 11 Legal pages use different unrelated layouts,
* desktop Legal TOC not sticky,
* mobile Legal layout keeps desktop sidebar,
* Legal Draft appears publicly,
* Legal body and Last Updated come from different versions,
* current preliminary Legal placeholder notices remain in production,
* duplicate indexable Legal routes,
* Cookie Policy Manage button dead,
* Footer Cookie Preferences missing,
* Cookie manager uses separate state from Batch 17 consent prompt,
* Analytics loads before consent,
* Marketing loads before consent,
* Essential can be disabled,
* consent Save displays success but does not persist,
* Blog Listing missing,
* Blog uses hard-coded cards,
* Draft Blog Post public,
* Category filter local-only and disconnected from real data,
* reading time hard-coded,
* Related Posts hard-coded,
* Blog Post reading progress fake/time-based,
* Guest Support form missing,
* Guest Support rate limit Client-only,
* fourth request still creates Ticket,
* Support submission shows fake success,
* My Tickets missing,
* one user can access another user's Ticket,
* Thread disconnected from Batch 11 Admin Support,
* Admin Support reply does not appear publicly,
* read-only Thread gets unsourced chat composer,
* Footer links still use temporary fallback routes,
* Published CMS updates do not invalidate public cache,
* Sitemap includes private Tickets,
* Draft content appears in Sitemap,
* Map provider fallback decorative only,
* consent/provider matrix ignored,
* hard-coded fake trust stats,
* dead button,
* `href="#"`,
* text clipping,
* mobile Cookie Modal incorrect,
* Legal TOC overlaps Header,
* Blog body too wide/unreadable,
* mobile keyboard covers Support submit,
* console errors,
* private data leakage,
* no full live public regression.

---

# 303. FINAL ACCEPTANCE STATEMENT

**Design Batch 16 — Public Content Pages is complete only when all 20 Batch 16 screen groups are implemented according to the exact source design and every public page is connected to real approved content, real Support records, real consent behavior and real provider fallback states.**

Completion requires:

* exact About page,
* Public Header/Footer,
* approved About CMS content,
* qualitative trust blocks,
* no fake statistics,
* Contact page,
* Listing Question,
* Account Help,
* Billing,
* Partnership,
* Other,
* real Contact submission,
* rate limiting,
* Map Active state,
* Setup Required address fallback,
* configured support email,
* honest WhatsApp support,
* FAQ / Help Center,
* Category filtering,
* accessible accordions,
* workflow-consistent answers,
* Raise Ticket routing,
* Safety Guidelines,
* OTP safety,
* advance-payment safety,
* visit safety,
* Report guidance,
* one shared Legal Reader component,
* Terms & Conditions,
* Privacy Policy,
* Cookie Policy,
* Refund Policy,
* Cancellation Policy,
* Listing Policy,
* Advertising Policy,
* Verification Policy,
* Payment Policy,
* Disclaimer,
* Grievance Policy,
* desktop sticky TOC,
* mobile collapsible TOC,
* correct Last Updated date,
* Published Legal revision only,
* Legal version integrity,
* Listing Policy Do/Don't strip,
* Disclaimer callout,
* Grievance Officer block,
* Cookie Preferences desktop modal,
* Cookie Preferences mobile bottom sheet,
* Essential Always On,
* Analytics consent,
* Marketing consent,
* Reject Non-Essential,
* Save Preferences,
* consent persistence,
* consent versioning,
* no unauthorized pre-consent tracking,
* Footer re-entry,
* Blog Listing,
* real Categories,
* real Published Posts,
* Featured Images,
* Excerpts,
* real Authors,
* real Reading Time,
* Pagination,
* Category Empty state,
* Browse All Posts,
* Blog Post,
* mobile Reading Progress,
* Hero Image,
* Article metadata,
* safe structured body,
* Related Posts,
* Draft protection,
* Guest Support Request,
* maximum 3 Guest requests/hour,
* real Ticket creation,
* internal queue connection,
* honest acknowledgment,
* My Support Tickets,
* own-Ticket authorization,
* Open/Resolved states,
* read-only Thread,
* real User messages,
* real Support replies,
* Batch 11 Support integration,
* Batch 14 CMS integration,
* Batch 14 Blog integration,
* Batch 14 Legal integration,
* Batch 14 SEO integration,
* Batch 14 Sitemap integration,
* Batch 13 Provider fallback integration,
* Batch 17 consent integration,
* no fake data,
* no placeholder content,
* no dead routes,
* no Draft leakage,
* no privacy leakage,
* complete mobile verification,
* complete tablet verification,
* complete desktop verification,
* complete guest/authenticated/content/legal/support regression.

Required implementation sequence:

**Screens 1–4 Public Company/Help → verify → shared Legal Reader → Screens 5–15 Legal Pages → verify → Screen 20 Cookie Preferences → verify → Screen 16 Blog Listing → verify → Screen 17 Blog Post → verify → Screen 18 Guest Support → verify → Screen 19 My Tickets → verify → Footer/SEO/Sitemap reconciliation → complete connected public-content regression test.**

No public content screen passes merely because it renders.

**Exact Design + Published Content Integrity + Legal Version Integrity + Consent Integrity + Provider Honesty + Blog Publishing Integrity + Support Ticket Integrity + User Privacy + SEO Consistency + Accessibility + Responsive Behavior + Live Public Verification must all pass.**
