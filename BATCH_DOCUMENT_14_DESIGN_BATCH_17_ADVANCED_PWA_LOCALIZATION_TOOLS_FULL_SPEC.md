# BATCH_DOCUMENT_14_DESIGN_BATCH_17_ADVANCED_PWA_LOCALIZATION_TOOLS_FULL_SPEC.md

# My Gujarat Property

## Batch Document 14

## Design Batch 17 — Complete Advanced PWA, Localization, Theme, Transliteration Search, Property Tools, Comparison, Analytics Consent and Accessibility Specification

---

# 1. DOCUMENT PURPOSE

This document is the complete design, functionality, frontend, backend, persistence, PWA, offline-state, localization, transliteration, Theme, financial-calculation, Gujarat property-tool, Comparison, Analytics-consent, Service Worker update, accessibility, responsive behavior and final cross-project quality-verification specification for:

**My Gujarat Property · Design Batch 17 — Advanced / PWA / Localization / Tools**

Batch 17 is the final advanced-experience and global-quality Batch.

It contains exactly these 12 screen groups:

1. PWA Install Prompt
2. Offline State Banner
3. Language Selector and Translation Fallback
4. Theme Selector — Light / Dark / System
5. Transliteration and Typo-Tolerant Search
6. EMI Calculator
7. Gujarat Stamp Duty Calculator
8. Gujarat Land Unit Converter
9. Property Comparison Tray + Full Comparison
10. Analytics Consent Prompt
11. PWA Update Available Toast
12. Accessibility Quick Settings

Batch 17 also defines the final cross-Batch QA and responsive locks for the entire My Gujarat Property platform.

Every screen and every state is mandatory.

Nothing may be skipped.

No Batch 17 feature may be:

* placeholder-only,
* fake,
* represented by dead UI,
* implemented with hard-coded sample calculations only,
* implemented without persistence where the source requires persistence,
* implemented with fake Analytics consent,
* implemented with fake offline status,
* implemented with a fake PWA Install button,
* implemented with random language fallback behavior,
* implemented using an unrelated dark-mode redesign,
* implemented with fake finance/Stamp Duty results,
* implemented with Comparison state that disappears during pagination/navigation,
* implemented with accessibility controls that only change labels but not actual UI behavior.

The actual Batch 17 source design must remain the visual authority.

---

# 2. ABSOLUTE DESIGN AUTHORITY

Read the actual design source from:

`/newdesign/`

Use:

`Batch 17 - Advanced PWA Localization Tools (Standalone).html`

Implement the actual:

* layouts,
* cards,
* tool forms,
* result panels,
* banners,
* toasts,
* bottom sheets,
* Comparison Tray,
* full Comparison Table,
* consent UI,
* accessibility controls,
* responsive behavior.

Do not redesign Batch 17 from generic PWA, calculator or accessibility templates.

---

# 3. BATCH 17 ROLE IN THE FULL SYSTEM

Batch 17 is not an isolated tools page.

It connects to:

* Batch 1 Design System,
* Batch 3 Search,
* Batch 4 Detail Pages,
* Batch 6 Owner Dashboard,
* Batch 7 Broker Dashboard,
* Batch 8 Builder Dashboard,
* Batch 13 Provider Management and Feature Flags,
* Batch 14 Locations and Translations,
* Batch 16 Cookie Preferences.

Batch 17 completion requires cross-system behavior.

---

# 4. BATCH 17 SCREEN INVENTORY

## Screen 1

PWA Install Prompt.

## Screen 2

Offline Banner.

## Screen 3

Language Selector.

## Screen 4

Theme Selector.

## Screen 5

Transliteration and Typo-Tolerant Search.

## Screen 6

EMI Calculator.

## Screen 7

Gujarat Stamp Duty Calculator.

## Screen 8

Gujarat Land Unit Converter.

## Screen 9

Compare Tray and Full Comparison.

## Screen 10

Analytics Consent.

## Screen 11

PWA Update Toast.

## Screen 12

Accessibility Quick Settings.

Then:

**Final Batch 17 QA Lock for the whole platform.**

---

# 5. REQUIRED IMPLEMENTATION ORDER

Implement Batch 17 in this order:

1. shared preference infrastructure
2. Screen 3 Language
3. Screen 4 Theme
4. Screen 12 Accessibility
5. PWA manifest and Service Worker foundation
6. Screen 1 Install Prompt
7. Screen 2 Offline Banner
8. Screen 11 Update Toast
9. Screen 10 Consent integration
10. Screen 5 Search transliteration upgrade
11. Screen 6 EMI Calculator
12. Screen 7 Stamp Duty Calculator
13. Screen 8 Land Unit Converter
14. Screen 9 Comparison reconciliation
15. final responsive QA
16. final status/state QA
17. final cross-role regression.

Do not add PWA UI before a real installable PWA foundation exists.

---

# 6. GLOBAL PREFERENCE ARCHITECTURE

Batch 17 introduces global user preferences.

These include:

* Language,
* Theme,
* Accessibility settings,
* Analytics consent,
* Marketing consent where connected to Batch 16.

Use one coherent preference architecture.

Do not create unrelated:

* localStorage key in Header,
* different cookie in Footer,
* different database value in Dashboard Settings.

---

# 7. GUEST PREFERENCE PERSISTENCE

For Guests, appropriate preferences may persist locally through:

* cookie,
* localStorage,

according to preference type and legal architecture.

Examples:

* Language,
* Theme,
* accessibility display settings.

---

# 8. LOGGED-IN PREFERENCE PERSISTENCE

For logged-in users:

preferences may synchronize to Profile/User Settings.

Device-local preference can still take precedence where appropriate.

Define deterministic precedence.

Do not cause Theme to randomly switch after login.

---

# 9. PREFERENCE HYDRATION

Avoid UI flash.

Theme and accessibility-critical preferences should apply before or as early as possible during first render.

Do not:

render Light
→ flash Dark
→ switch back Light.

---

# 10. CURRENT THEME FOUNDATION

The current repository already has:

* CSS design tokens,
* `.dark` class-based token overrides,
* an early script reading `mgp-theme`.

Preserve this useful foundation.

Batch 17 requires extending it to:

* Light,
* Dark,
* System.

Current behavior that only checks exact:

`dark`

is incomplete.

---

# 11. CURRENT COMPARISON FOUNDATION

The current repository already has:

* Compare Provider,
* localStorage persistence,
* maximum 4 item state,
* sticky tray,
* `/compare` page,
* public-safe Compare fields.

Preserve the compatible foundation.

Batch 17 still requires significant correction:

* limit feedback instead of silent ignore,
* exact Compare Tray design,
* mobile position above Dashboard bottom nav,
* pagination/navigation persistence verification,
* richer comparable attributes,
* pinned attribute column,
* proper horizontal-scroll behavior,
* property/project comparison compatibility rules.

---

# 12. CURRENT SEARCH FOUNDATION

The current repository already has static alias support such as:

* amdavad → Ahmedabad,
* baroda → Vadodara,
* misspelling corrections.

Preserve current working behavior during migration.

Batch 17 requires deeper integration with:

Batch 14 canonical Location Alias architecture.

---

# 13. CURRENT PWA GAP

No complete:

* App Manifest,
* Service Worker,
* Install Prompt lifecycle,
* offline banner,
* update toast

was confirmed in the inspected implementation.

Batch 17 requires a real PWA foundation before its PWA UI can pass.

---

# 14. SCREEN 1 — PWA INSTALL PROMPT

The PWA Install Prompt must appear only when:

* installation is supported,
* application is not already installed,
* user meets the Batch 17 engagement threshold.

---

# 15. INSTALL ENGAGEMENT THRESHOLD

Exact Batch 17 rule:

**Show after 2 or more sessions.**

Do not show on the first visit immediately.

---

# 16. SESSION COUNT

Track meaningful sessions.

Do not increment session count on every route navigation.

A new session must follow a defined inactivity/new-visit rule.

---

# 17. INSTALL ELIGIBILITY

Required checks include:

* browser supports install event/flow,
* app is not already installed,
* install prompt event is available where applicable,
* user has 2+ sessions,
* dismissal suppression window has expired.

---

# 18. INSTALL PROMPT UI

Use exact Batch 17 design.

The prompt should clearly identify:

* My Gujarat Property,
* benefit of installing,
* Install action,
* Not Now action.

Do not show a browser-instruction wall unless direct install prompt is unavailable.

---

# 19. INSTALL ACTION

The Install button must invoke the actual browser install flow.

Do not show:

`Installed successfully`

before the browser result confirms acceptance.

---

# 20. INSTALL ACCEPTED STATE

After accepted installation:

* close prompt,
* mark installed/accepted state,
* do not show prompt again unnecessarily.

---

# 21. INSTALL DISMISSED STATE

If user dismisses native prompt:

do not immediately reopen custom prompt.

Follow suppression policy.

---

# 22. NOT NOW RULE

Exact Batch 17 rule:

**Not now is remembered for 30 days.**

Persist actual dismissal expiration.

---

# 23. NOT NOW EXPIRY

Store something equivalent to:

`install_prompt_snooze_until`.

Do not store only a permanent boolean:

`dismissed = true`.

---

# 24. NOT NOW CROSS-SESSION BEHAVIOR

During 30 days:

do not show prompt across normal sessions in the same preference context.

After expiry:

user may become eligible again.

---

# 25. ALREADY INSTALLED DETECTION

Check appropriate platform signals.

Do not show Install Prompt inside:

* standalone display mode,
* already-installed app context.

---

# 26. IOS/PLATFORM DIFFERENCES

Where direct install prompt behavior differs by platform:

use appropriate supported guidance.

Do not present a nonfunctional direct Install button.

Keep exact Batch 17 visual intent while respecting platform capability.

---

# 27. INSTALL PROMPT ACCESSIBILITY

Prompt must support:

* keyboard focus,
* accessible heading,
* Install button label,
* Not Now,
* focus restoration when dismissed.

---

# 28. INSTALL PROMPT ANALYTICS

Do not track install-prompt analytics before Analytics consent.

Functional session-count storage itself must not be misrepresented as behavioral Analytics if used only for local PWA eligibility.

---

# 29. PWA MANIFEST REQUIREMENTS

A real manifest must include appropriate:

* name,
* short name,
* start URL,
* display mode,
* theme color,
* background color,
* icon references.

Do not mark PWA complete with only a fake Install component.

---

# 30. PWA ICON RULE

Use approved brand assets.

Do not invent unrelated app icons.

---

# 31. PWA START URL

Start URL must resolve safely.

Do not hard-code a broken role-specific dashboard route for all users.

---

# 32. PWA SCOPE

Define appropriate scope to cover public and authorised app pages according to platform architecture.

---

# 33. SCREEN 1 FINAL CHECKLIST

* [ ] real PWA Manifest
* [ ] real installability
* [ ] session counting
* [ ] prompt only after 2+ sessions
* [ ] not already installed check
* [ ] Install action
* [ ] native install result handling
* [ ] Not Now
* [ ] 30-day suppression
* [ ] suppression expiry
* [ ] platform-specific fallback
* [ ] keyboard accessibility
* [ ] no fake success
* [ ] no first-session spam

---

# 34. SCREEN 2 — OFFLINE BANNER

Exact Batch 17 behavior:

**Offline Banner appears above the Header.**

This positioning is mandatory.

---

# 35. OFFLINE STATE DETECTION

Use actual connectivity state.

At minimum react to:

* browser online/offline events.

Where critical actions require server availability:

handle network request failure honestly too.

Do not rely solely on one initial `navigator.onLine` check.

---

# 36. OFFLINE BANNER POSITION

The Banner sits:

above Public Header
or above relevant application shell header.

Do not overlap Header.

---

# 37. OFFLINE BANNER MESSAGE

Use exact Batch design copy/intent:

user is offline and may be viewing cached content.

Do not claim every screen is available offline.

---

# 38. OFFLINE CONTENT HONESTY

Only content actually cached can load offline.

Do not display:

`You can continue using everything`

if mutations and fresh Search require server access.

---

# 39. OFFLINE ACTION BEHAVIOR

Actions requiring server access should:

* disable with helper,
* or attempt and show Connection Error.

Do not queue sensitive financial mutations silently unless an explicit offline-sync architecture exists.

---

# 40. OFFLINE POSTING WIZARD SAFETY

Do not pretend final submission succeeded offline.

Local Draft support may retain form progress where intentionally implemented.

Final Submit requires server confirmation.

---

# 41. OFFLINE PAYMENT SAFETY

Never queue:

* Payment,
* Refund,
* manual Billing action

as a blind offline replay.

Show Connection Error.

---

# 42. RECONNECT BEHAVIOR

When connection restores:

* remove/update Offline Banner,
* allow retry.

Do not force full-page reload unless technically required.

---

# 43. CONNECTION FLAPPING

Debounce/safely manage rapid Online/Offline events.

Avoid banner flicker.

---

# 44. SERVICE WORKER CACHE STRATEGY

Use deliberate strategies.

Examples:

### Static assets

cache-first or stale-while-revalidate.

### Public content

network-first/stale-safe according to content type.

### authenticated/private APIs

do not indiscriminately cache.

### financial endpoints

never serve stale mutation responses.

---

# 45. PRIVATE DATA CACHE SAFETY

Do not cache sensitive authenticated API responses in a broadly accessible Cache Storage entry without a safe architecture.

---

# 46. OFFLINE FALLBACK PAGE

Where navigation cannot be served:

provide an approved Offline fallback.

Do not render browser error page if Service Worker can safely provide branded fallback.

---

# 47. OFFLINE BANNER RESPONSIVE CHECK

Verify:

* 390px,
* tablet,
* desktop.

Header moves below Banner correctly.

No sticky overlap.

---

# 48. SCREEN 2 FINAL CHECKLIST

* [ ] actual Offline detection
* [ ] Banner above Header
* [ ] honest cached-content wording
* [ ] no fake offline mutation success
* [ ] reconnect handling
* [ ] retry behavior
* [ ] Service Worker cache rules
* [ ] private-data cache safety
* [ ] financial action safety
* [ ] mobile/tablet/desktop verification

---

# 49. SCREEN 3 — LANGUAGE SELECTOR

Exact Batch 17 language states:

* English — Default
* ગુજરાતી — Available
* हिन्दी — Coming Soon

These states must be honest.

---

# 50. ENGLISH DEFAULT

New users without a language preference use:

English.

Do not auto-switch based solely on IP/location.

---

# 51. GUJARATI OPTION

Gujarati is selectable only when the required application UI translation experience is available according to the Batch 14 Translation architecture.

---

# 52. HINDI COMING SOON

Exact source state:

Hindi is shown as:

`Coming Soon`

Do not allow selection into a half-broken Hindi interface.

---

# 53. COMING SOON CONTROL

Hindi option should be:

* visually clear,
* non-selectable,
* accessible.

Do not create a clickable control that silently does nothing.

---

# 54. LANGUAGE SELECTOR LOCATION

The selector must be accessible from the locations shown in the final design/system, such as:

* Header/Drawer,
* Settings,
* global preference control.

Use one preference authority.

---

# 55. LANGUAGE PERSISTENCE

Selection persists across:

* page navigation,
* refresh,
* future sessions.

---

# 56. HTML LANGUAGE ATTRIBUTE

Update document language appropriately.

Examples:

* `en`
* `gu`

Do not leave `lang="en"` permanently after Gujarati selection.

---

# 57. TRANSLATION FALLBACK RULE

Exact Batch 17 behavior:

When translation is missing:

**fallback to English with a subtle pending state.**

Do not:

* show blank label,
* display translation key,
* fabricate translation.

---

# 58. SUBTLE PENDING STATE

The fallback indicator should be subtle.

Do not show giant warning banners across the site for every missing string.

---

# 59. FALLBACK SOURCE

Use Batch 14 Translation Tracker state.

Do not maintain separate fallback maps.

---

# 60. FALLBACK STRING REGISTRY

Stable translation keys must map to:

* English source,
* Gujarati translation status.

---

# 61. LANGUAGE SWITCH LIVE UPDATE

Changing Language should update application UI consistently.

Do not require inconsistent partial refresh where:

Header Gujarati
but Dashboard English
without fallback explanation.

---

# 62. SERVER AND CLIENT STRINGS

Localization architecture must work across:

* Server Components,
* Client Components,
* form validation messages,
* status labels,
* empty states.

---

# 63. STATUS TRANSLATION CONSISTENCY

Global statuses must use consistent translated vocabulary.

Do not translate:

Approved

differently across three dashboards without reason.

---

# 64. CONTENT VS UI LANGUAGE

Do not confuse:

* UI Translation,
* CMS content translation.

A Gujarati UI does not mean every Blog/Legal body has approved Gujarati content.

---

# 65. LEGAL LANGUAGE SAFETY

When approved Gujarati Legal translation is unavailable:

show English fallback according to policy.

Do not machine-translate Legal text on the fly and present it as authoritative.

---

# 66. LANGUAGE SEARCH INPUT

Transliteration Search should work regardless of UI language.

A user in English UI can still search:

`amdavad`.

---

# 67. LANGUAGE PREFERENCE DATABASE

If synchronized for logged-in users:

store approved locale value.

Validate server-side.

---

# 68. LANGUAGE HYDRATION FLASH

Avoid:

English first render
→ Gujarati late switch

where practical.

---

# 69. SCREEN 3 FINAL CHECKLIST

* [ ] English default
* [ ] Gujarati selectable
* [ ] Hindi Coming Soon
* [ ] Hindi non-selectable
* [ ] preference persistence
* [ ] HTML lang update
* [ ] English fallback
* [ ] subtle pending state
* [ ] Batch 14 translation authority
* [ ] Server Component strings
* [ ] Client Component strings
* [ ] Validation messages
* [ ] Status consistency
* [ ] no blank translation
* [ ] no fake machine-translated Legal content

---

# 70. SCREEN 4 — THEME SELECTOR

Exact choices:

* Light
* Dark
* System

---

# 71. TOKEN-SWAP-ONLY RULE

Exact Batch 17 rule:

**Theme changes use token swaps only.**

Do not:

* redesign layout,
* change component hierarchy,
* change spacing,
* move navigation,
* alter component meaning.

Dark mode is the same product structure with different semantic tokens.

---

# 72. LIGHT MODE

Explicit Light ignores OS dark preference.

---

# 73. DARK MODE

Explicit Dark applies dark Theme tokens.

---

# 74. SYSTEM MODE

System follows:

`prefers-color-scheme`.

It must update when OS preference changes while System is selected.

---

# 75. CURRENT DARK TOKEN FOUNDATION

Preserve current CSS token model.

Current dark tokens already exist.

Batch 17 must verify every component uses semantic tokens correctly.

---

# 76. HARD-CODED COLOR AUDIT

Search for components using hard-coded:

* white backgrounds,
* zinc text,
* fixed light border colors

that break Dark mode.

Replace with approved tokens where needed.

Do not globally recolor brand assets.

---

# 77. THEME PREFERENCE VALUES

Use explicit values:

* light
* dark
* system.

Do not overload missing localStorage value ambiguously.

---

# 78. THEME INITIALIZATION

Apply selected Theme before first visible paint where practical.

No severe flash.

---

# 79. SYSTEM LISTENER

Only attach OS theme listener when:

Theme = System.

Clean up listener.

---

# 80. THEME PERSISTENCE

Guest:

local preference.

Logged-in:

optional server sync.

Ensure deterministic precedence.

---

# 81. THEME ACROSS PUBLIC AND DASHBOARDS

Theme must apply consistently to:

* Public pages,
* Owner Dashboard,
* Broker Dashboard,
* Builder Dashboard.

Admin appearance follows final product authority; do not independently alter graphite Admin design if Batch source keeps Admin fixed.

---

# 82. THEME AND IMAGE ASSETS

Do not invert real property photos.

Logos/icons may use approved variants where required.

---

# 83. THEME AND MAPS

Map Theme may follow selected mode only when provider/API supports it safely.

Do not break Map.

---

# 84. THEME AND CHARTS

Charts must use semantic Theme-aware colors.

Do not make axes unreadable.

---

# 85. THEME AND FORM CONTROLS

Verify:

* Input background,
* Select,
* Placeholder,
* Disabled,
* Error,
* Focus ring.

---

# 86. THEME AND STATUS COLORS

Preserve semantic distinction:

* green success,
* amber warning,
* red error,
* zinc neutral.

Dark variants must remain readable.

---

# 87. SCREEN 4 FINAL CHECKLIST

* [ ] Light
* [ ] Dark
* [ ] System
* [ ] explicit preference persistence
* [ ] OS change listener
* [ ] early initialization
* [ ] token-swap only
* [ ] no layout redesign
* [ ] Public pages
* [ ] Owner Dashboard
* [ ] Broker Dashboard
* [ ] Builder Dashboard
* [ ] Forms
* [ ] Cards
* [ ] Tables
* [ ] Overlays
* [ ] Status colors
* [ ] Charts
* [ ] no inverted property images
* [ ] no severe Theme flash

---

# 88. SCREEN 5 — TRANSLITERATION AND TYPO-TOLERANT SEARCH

Batch 17 requires search that understands common real-world typing variants.

This includes:

* transliteration,
* misspelling correction,
* alias resolution.

---

# 89. CURRENT SEARCH ALIAS FOUNDATION

The current search configuration already supports examples such as:

* amdavad → Ahmedabad
* ahemdabad → Ahmedabad
* baroda → Vadodara
* vadodra → Vadodara
* surrat → Surat
* rajkott → Rajkot.

Preserve this behavior during migration.

---

# 90. BATCH 14 LOCATION ALIAS AUTHORITY

Final search authority should integrate:

Location
→ canonical name
→ Gujarati name
→ Hindi name where available
→ aliases
→ common spellings.

Do not maintain hard-coded city aliases as the only permanent authority.

---

# 91. TRANSLITERATION EXAMPLES

Search should resolve common inputs such as:

* amdavad
* ahemdabad
* baroda
* vadodra

to canonical Locations.

---

# 92. LOCALITY ALIAS EXAMPLE

Batch 14 example:

`Satelite`

must resolve:

`Satellite`

within correct geographic context.

---

# 93. SEARCH SANITIZATION

Normalize safely:

* case,
* spacing,
* supported punctuation.

Do not directly interpolate unsafe raw text into query construction.

---

# 94. ALIAS SCOPE

An Alias may be:

* global when unambiguous,
* parent/city scoped when ambiguous.

Do not map ambiguous locality alias to wrong City.

---

# 95. SCRIPT INPUT

Where approved transliteration support includes native Gujarati input:

search should resolve localized Location names.

Do not restrict canonical search to ASCII only after Batch 14 multilingual Locations are available.

---

# 96. TYPO DISTANCE SAFETY

Do not over-correct unrelated words aggressively.

A fuzzy Search must avoid returning a completely wrong City because edit distance is small.

---

# 97. SEARCH TERM EXPANSION LIMIT

Bound candidate expansion.

Do not create unbounded query explosion.

---

# 98. SEARCH RANKING

Where relevance ranking is implemented:

prefer:

1. exact canonical match
2. exact Alias match
3. localized Name match
4. high-confidence typo correction
5. broader text match.

Do not claim relevance sorting if backend does not implement it.

---

# 99. SEARCH RESULT EXPLANATION

Where UI displays corrected understanding:

show subtle suggestion such as:

Showing results for Ahmedabad

according to exact design behavior.

Do not silently transform a critical ambiguous query.

---

# 100. NO RESULTS STATE

If no result:

preserve original query.

Provide actionable suggestions.

---

# 101. SEARCH PERFORMANCE

Use indexed Alias/location lookup.

Do not scan all Location rows and aliases in application memory on every Search.

---

# 102. SEARCH CACHE INVALIDATION

When Batch 14 Location Alias changes:

update Search behavior promptly.

---

# 103. STATIC ALIAS MIGRATION

Implementation sequence:

1. keep current static aliases active,
2. create Batch 14 Alias records,
3. migrate known aliases,
4. integrate database-backed lookup,
5. test,
6. remove duplicate static authority only after parity.

---

# 104. SCREEN 5 FINAL CHECKLIST

* [ ] transliteration support
* [ ] common typo support
* [ ] amdavad → Ahmedabad
* [ ] baroda → Vadodara
* [ ] Satelite → Satellite
* [ ] canonical Location result
* [ ] Batch 14 Alias integration
* [ ] localized Name search
* [ ] ambiguity handling
* [ ] safe sanitization
* [ ] bounded expansion
* [ ] ranking rules
* [ ] no aggressive wrong correction
* [ ] No Results behavior
* [ ] indexed lookup
* [ ] migration compatibility

---

# 105. SCREEN 6 — EMI CALCULATOR

The EMI Calculator is a public property tool.

Use Batch 1 Public Shell.

It must be functional.

---

# 106. EMI TOOL PURPOSE

Allow user to estimate monthly home-loan EMI.

Do not represent result as:

* guaranteed loan approval,
* bank offer,
* financial advice.

---

# 107. EMI INPUTS

The calculator must support the fields shown in exact Batch 17 design.

At minimum calculation requires:

* Loan Amount,
* Interest Rate,
* Loan Tenure.

Do not add unrelated loan-application fields.

---

# 108. LOAN AMOUNT VALIDATION

Required:

* positive number,
* reasonable upper bound,
* currency-safe parsing.

Reject invalid:

* negative,
* zero where not meaningful,
* NaN.

---

# 109. INTEREST RATE VALIDATION

Required:

* non-negative,
* sensible range.

Do not accept arbitrary 9999%.

---

# 110. TENURE VALIDATION

Support design-defined unit:

* years,
* or months.

Normalize internally.

---

# 111. EMI FORMULA

Use the standard reducing-balance EMI formula:

Monthly Rate:

`annualRate / 12 / 100`

Number of Payments:

`tenureYears × 12`

EMI:

`P × r × (1+r)^n / ((1+r)^n - 1)`

Handle zero-rate case separately.

---

# 112. ZERO INTEREST CASE

If rate = 0:

EMI = Principal / number of months.

Avoid division by zero.

---

# 113. EMI RESULT PANEL

Show exact Batch 17 result layout.

Result data should include only fields shown by source, such as:

* Monthly EMI,
* Total Interest,
* Total Payment

where present in the design.

Do not invent unrelated bank offers.

---

# 114. TOTAL PAYMENT

Calculate:

EMI × number of payments

with sensible financial rounding.

---

# 115. TOTAL INTEREST

Calculate:

Total Payment - Principal.

---

# 116. INDIAN NUMBER FORMATTING

Display currency in Indian grouping.

Example:

₹45,00,000

not only Western:

₹4,500,000.

---

# 117. EMI RESULT UPDATE

Update according to exact source interaction:

* live on field change,
* or Calculate action.

Do not produce result before required fields are valid.

---

# 118. EMI DISCLAIMER

Batch 17 tools require:

**estimate disclaimer.**

State clearly that:

* calculation is indicative,
* actual lender rates/terms may differ,
* taxes/fees/insurance may not be included.

---

# 119. LOAN PARTNER PROVIDER STATE

Exact Batch 17 rule:

If loan-partner integration is missing:

show:

`Setup Required`

for provider-dependent partner action.

The EMI Calculator itself must still work locally.

---

# 120. NO FAKE LOAN OFFER

Do not display fake:

* pre-approved rate,
* bank logo offer,
* eligibility score.

---

# 121. EMI CLIENT/SERVER ARCHITECTURE

Pure calculation may run Client-side.

Do not require database mutation.

Validate calculations with unit tests.

---

# 122. EMI ACCESSIBILITY

Inputs need:

* labels,
* numeric keyboard hints,
* error text association,
* result announcements where appropriate.

---

# 123. EMI SEO

Public tool may have:

* Meta Title,
* Description,
* Canonical

according to Batch 14 SEO architecture.

---

# 124. SCREEN 6 FINAL CHECKLIST

* [ ] Public Shell
* [ ] Loan Amount
* [ ] Interest Rate
* [ ] Loan Tenure
* [ ] validation
* [ ] reducing-balance formula
* [ ] zero-rate handling
* [ ] Monthly EMI
* [ ] Total Interest where designed
* [ ] Total Payment where designed
* [ ] Indian currency formatting
* [ ] estimate disclaimer
* [ ] no fake approval
* [ ] loan partner Setup Required
* [ ] mobile responsive
* [ ] unit tests

---

# 125. SCREEN 7 — GUJARAT STAMP DUTY CALCULATOR

This is a public estimate tool.

Use exact Batch 17 design.

---

# 126. STAMP DUTY PURPOSE

Estimate applicable property transaction charges based on the approved rule data.

Do not present estimate as final government demand.

---

# 127. STAMP DUTY RATE AUTHORITY

Rates and rules can change.

Do not permanently bury all regulatory values in UI component code.

Use:

* configurable versioned rule table,
* approved effective dates.

---

# 128. RULE VERSION

A calculation should know which rule version/effective date was used.

---

# 129. STAMP DUTY INPUTS

Use the exact source fields.

Likely calculation scope may include:

* Property Value / Consideration,
* relevant buyer/property category inputs required by the approved rule engine.

Do not add unsupported demographic discounts.

---

# 130. VALUE VALIDATION

Use positive monetary input.

Apply safe upper limits.

---

# 131. MARKET VALUE RULE

Where regulation uses higher of:

* declared consideration,
* applicable assessed value

the tool must follow the approved rule specification.

Do not guess.

---

# 132. RESULT BREAKDOWN

Show exact source design breakdown.

Potential fields:

* Stamp Duty estimate,
* Registration Fee estimate,
* Total estimated charges.

Only show the values backed by configured rules.

---

# 133. ROUNDING

Use approved financial/regulatory rounding policy.

Do not round inconsistently between breakdown and total.

---

# 134. DISCLAIMER

Prominently state:

* estimate only,
* rates/rules may change,
* user should verify current official requirements or legal professional.

---

# 135. RULE UPDATE WORKFLOW

Because this is regulation-sensitive:

provide a controlled rule-update process through configuration/Admin architecture.

Do not require source-code redeployment for every rate update if product authority expects configurable rules.

---

# 136. HISTORICAL CALCULATION

If user revisits a saved calculation, do not silently recalculate with new rules unless intended.

For a stateless public calculator, current active rule is enough.

---

# 137. STAMP DUTY TOOL NO PERSONAL ADVICE

Do not provide legal advice.

---

# 138. STAMP DUTY TOOL ACCESSIBILITY

Same form requirements as EMI.

---

# 139. STAMP DUTY TESTS

Add unit tests for:

* normal value,
* boundary values,
* zero/invalid value,
* rule version changes,
* rounding.

---

# 140. SCREEN 7 FINAL CHECKLIST

* [ ] Public Shell
* [ ] exact design fields
* [ ] real calculation
* [ ] versioned rule authority
* [ ] effective date
* [ ] value validation
* [ ] breakdown
* [ ] total
* [ ] approved rounding
* [ ] estimate disclaimer
* [ ] no legal guarantee
* [ ] responsive behavior
* [ ] unit tests

---

# 141. SCREEN 8 — GUJARAT LAND UNIT CONVERTER

This is a public conversion tool.

Use exact Batch 17 design.

---

# 142. CONVERTER PURPOSE

Convert common Gujarat/India land-area units accurately.

---

# 143. UNIT AUTHORITY

Use one canonical base unit internally.

Recommended:

square metre or square foot.

Every unit conversion must derive through canonical factors.

---

# 144. SUPPORTED UNITS

Use the exact units in Batch 17 source.

The Gujarat real-estate context may include approved units such as:

* Square Foot,
* Square Metre,
* Square Yard / Var,
* Acre,
* Hectare,
* Bigha where region-specific authority defines it,
* Guntha,
* other approved Gujarat land units.

Do not invent factors.

---

# 145. REGION-SPECIFIC UNIT WARNING

Units like:

Bigha

can vary by region.

If included:

the calculator must clearly identify the exact regional conversion authority.

Do not present one universal Bigha conversion as globally exact.

---

# 146. INPUT VALUE

Accept positive decimal value.

---

# 147. FROM UNIT

Required selector.

---

# 148. TO UNIT

Required selector.

---

# 149. SAME UNIT

If From = To:

return same value.

---

# 150. PRECISION

Use enough precision for land conversion.

Do not produce excessive floating-point noise.

---

# 151. RESULT COPY

If source provides Copy action:

it must copy the actual result.

Do not add dead Copy control.

---

# 152. SWAP ACTION

If exact design shows Swap:

swap From/To and recalculate.

---

# 153. CONVERSION TABLE

Where design shows supporting reference conversions:

derive from same factor authority.

Do not maintain separate inconsistent static values.

---

# 154. LAND CONVERTER DISCLAIMER

Use estimate/reference disclaimer.

For legal land documents:

official recorded units/documents remain authority.

---

# 155. CONVERTER URL

The tool can have stable public route and SEO metadata.

---

# 156. CONVERTER TESTS

Test:

* same-unit identity,
* inverse conversions,
* round-trip tolerance,
* decimal input,
* invalid input.

---

# 157. SCREEN 8 FINAL CHECKLIST

* [ ] Public Shell
* [ ] Value input
* [ ] From Unit
* [ ] To Unit
* [ ] real conversion
* [ ] canonical base factor
* [ ] Gujarat unit support
* [ ] region-specific warning
* [ ] precision rules
* [ ] Same Unit
* [ ] Swap where designed
* [ ] Copy where designed
* [ ] disclaimer
* [ ] responsive behavior
* [ ] unit tests

---

# 158. SCREEN 9 — PROPERTY COMPARISON SYSTEM

Batch 17 Comparison has two connected surfaces:

1. Compare Tray
2. Full Comparison View

They must use one persistent state.

---

# 159. FIRST-ADD RULE

Exact Batch 17 rule:

**Compare Tray appears after the first item is added.**

Do not wait until 2 items.

---

# 160. MAXIMUM ITEM RULE

Exact source:

**maximum 4 items.**

The current Compare Provider already uses max 4.

Preserve this limit.

---

# 161. CURRENT SILENT-LIMIT GAP

Current foundation silently ignores the fifth item.

This is insufficient.

When user attempts item 5:

show clear helper/toast such as:

Maximum 4 items can be compared.

Do not silently fail.

---

# 162. COMPARE STATE PERSISTENCE

Exact Batch 17 rule:

Comparison persists during:

* pagination,
* Search filtering,
* navigation.

Current localStorage foundation helps.

Verify actual card object validity after data changes.

---

# 163. PUBLIC-SAFE COMPARE STATE

Do not persist:

* private contact numbers,
* private Lead data.

Current public-safe summary approach is correct.

---

# 164. STALE COMPARE ITEM

A stored Compare item may become:

* unavailable,
* expired,
* removed.

Full Compare must revalidate current public state where necessary.

Do not permanently trust stale localStorage price.

---

# 165. ITEM IDENTITY

Use:

* entity type,
* stable ID/slug.

Avoid collision between Property and Project sharing same raw ID value.

---

# 166. PROPERTY/PROJECT MIXING

Define exact compatibility.

If Batch 17 permits Property and Project in one Compare:

show common comparable attributes and `—` for non-applicable fields.

If design separates types:

enforce same-kind Compare.

Do not show nonsensical comparisons silently.

---

# 167. COMPARE TRAY CONTENT

Use exact Batch 17 visual layout.

Tray should show selected item context clearly.

---

# 168. ITEM REMOVE

Remove individual item.

State updates immediately and persists.

---

# 169. CLEAR ALL

Clear all selected items.

Tray closes.

Full Compare Empty state updates.

---

# 170. COMPARE CTA

When enough items are selected:

open Full Comparison.

Current implementation disables Compare with fewer than 2.

Preserve if consistent with Batch source.

---

# 171. MOBILE TRAY POSITION

Exact Batch 17 rule:

**Mobile Compare Tray sits above the Dashboard bottom navigation.**

It must never cover:

Home · Search · Post · Leads · Profile.

---

# 172. PUBLIC MOBILE TRAY POSITION

On public pages without Dashboard bottom nav:

use appropriate safe bottom offset.

---

# 173. SAFE AREA

Tray must respect:

`env(safe-area-inset-bottom)`.

---

# 174. COMPARE TRAY HORIZONTAL OVERFLOW

Selected items may scroll inside Tray.

Do not cause full-page horizontal overflow.

---

# 175. FULL COMPARISON VIEW

Exact Batch 17 behavior:

* horizontal scroll,
* pinned attribute column.

---

# 176. PINNED ATTRIBUTE COLUMN

The left attribute labels stay visible while item columns scroll horizontally.

Current Compare View does not pin the first column.

Correct it.

---

# 177. CURRENT GENERIC ROW GAP

Current Compare View only has:

* Price
* Location
* Type
* Details

Batch 17 requires a more meaningful full comparison based on actual source attributes.

Implement exact design attributes.

---

# 178. PROPERTY COMPARISON ATTRIBUTES

Use the exact Batch 17 rows.

Where appropriate, public-safe property comparison may include:

* Price
* Location
* Configuration
* Area
* Property Type
* Furnishing
* Possession/Availability
* Verification
* other source-defined fields.

Do not invent fields absent from source.

---

# 179. PROJECT COMPARISON ATTRIBUTES

Project-specific comparable fields may include:

* Starting Price
* Location
* Configuration Range
* RERA Status
* Possession
* Developer
* Project Type

where source defines them.

---

# 180. MISSING DATA

Display:

`—`

Do not fabricate.

---

# 181. PRICE FRESHNESS

Full Compare should use current public data rather than only stale stored display price where architecture allows.

---

# 182. ITEM HEADER

Each compared item needs:

* Title,
* image/context where source shows it,
* remove action,
* View Details.

---

# 183. VIEW DETAILS

Opens exact Property/Project Detail.

---

# 184. FULL COMPARISON EMPTY STATE

Current foundation has:

`Nothing to compare yet`

This is useful.

Align exact Batch 17 visual design.

Action:

Back/Search.

---

# 185. FULL COMPARISON ONE-ITEM STATE

If only one item remains:

show the designed state.

Do not crash.

---

# 186. COMPARISON NOINDEX

Comparison is personal state.

Current `noindex` behavior is correct.

Preserve it.

---

# 187. COMPARE CARD INTEGRATION

Search and Detail cards/buttons must use the same Compare Provider.

No local independent selection state.

---

# 188. COMPARE HYDRATION

Avoid showing empty Tray briefly then flashing persisted items excessively.

Handle hydration carefully.

---

# 189. CROSS-TAB STORAGE

Optional:

listen to storage changes to synchronize Compare between tabs.

If implemented:

ensure no loops.

---

# 190. SCREEN 9 FINAL CHECKLIST

* [ ] Tray after first add
* [ ] max 4
* [ ] fifth-item feedback
* [ ] persistence across pagination
* [ ] persistence across filters
* [ ] persistence across navigation
* [ ] public-safe stored fields
* [ ] stale item revalidation
* [ ] remove individual
* [ ] Clear All
* [ ] Compare CTA
* [ ] mobile above bottom nav
* [ ] public mobile safe offset
* [ ] safe-area support
* [ ] no page horizontal overflow
* [ ] Full Comparison
* [ ] horizontal item scroll
* [ ] pinned attribute column
* [ ] exact comparison rows
* [ ] `—` missing data
* [ ] View Details
* [ ] Empty state
* [ ] Noindex
* [ ] Search card integration
* [ ] Detail page integration

---

# 191. SCREEN 10 — ANALYTICS CONSENT PROMPT

Batch 17 Analytics Consent is connected directly to Batch 16 Cookie Preferences.

Use one consent state.

---

# 192. CONSENT HARD RULE

Exact Batch 17 rule:

**No tracking before choice.**

This is mandatory.

---

# 193. NO PRE-CONSENT ANALYTICS

Before user consent:

do not initialize Analytics tracking where consent is required.

Do not send:

* page view,
* session replay,
* conversion,
* ad remarketing event.

---

# 194. CONSENT PROMPT POSITION

Exact source behavior:

### Desktop

bottom-left prompt.

### Mobile

bottom sheet.

---

# 195. CONSENT PROMPT CONTENT

Use exact Batch 17 design.

The user must be able to understand:

* why Analytics is requested,
* choice controls/actions.

---

# 196. CONSENT CHOICE RELATIONSHIP

Batch 17 initial Analytics Consent and Batch 16 Cookie Preferences must use the same source of truth.

---

# 197. FIRST CHOICE

After a valid user choice:

store consent.

Do not show the prompt on every navigation.

---

# 198. REVISIT CHOICE

User can later change through:

Footer → Cookie Preferences.

---

# 199. PROVIDER AND CONSENT MATRIX

Analytics tracking is allowed only when:

### Analytics Provider

Active

AND

### User Consent

Analytics On.

Both conditions required.

---

# 200. PROVIDER MISSING + CONSENT ON

If user consents but Provider is Setup Required:

do not fake tracking.

Store consent preference and show Analytics provider status only to Admin where appropriate.

---

# 201. PROVIDER ACTIVE + CONSENT OFF

Do not initialize tracking.

---

# 202. PROVIDER ACTIVE + NO CHOICE

Do not track before choice.

---

# 203. CONSENT PERSISTENCE

Persist:

* choice,
* consent version,
* timestamp.

---

# 204. CONSENT VERSION CHANGE

When policy materially changes:

re-consent may be required.

Do not reset every user for trivial text edit unless policy requires.

---

# 205. CONSENT FAILURE

If consent persistence fails:

do not assume consent.

Keep prompt or show safe error.

---

# 206. ANALYTICS SCRIPT LOADING

Load dynamically/conditionally after valid consent.

Avoid including tracking scripts unconditionally in initial HTML where they begin tracking immediately.

---

# 207. SESSION REPLAY

If future Analytics includes session replay:

requires explicit approved consent category and privacy configuration.

Do not enable automatically because general Analytics is connected unless policy allows it.

---

# 208. MARKETING SEPARATION

Analytics consent is not automatically Marketing consent.

Batch 16 Cookie Preferences has separate:

* Analytics
* Marketing.

Keep separate.

---

# 209. CONSENT ACCESSIBILITY

Desktop prompt and mobile sheet require:

* keyboard accessibility,
* screen-reader labels,
* clear actions,
* no dark patterns.

---

# 210. SCREEN 10 FINAL CHECKLIST

* [ ] no tracking before choice
* [ ] desktop bottom-left prompt
* [ ] mobile bottom sheet
* [ ] same state as Cookie Preferences
* [ ] choice persistence
* [ ] consent version
* [ ] Provider Active requirement
* [ ] Consent On requirement
* [ ] no fake tracking
* [ ] no prompt after saved choice
* [ ] Footer revisit
* [ ] Analytics/Marketing separation
* [ ] persistence failure safety
* [ ] accessible interaction

---

# 211. SCREEN 11 — PWA UPDATE AVAILABLE TOAST

Exact Batch 17 rule:

* non-blocking,
* deferred until idle.

---

# 212. SERVICE WORKER UPDATE DETECTION

Detect when a newer Service Worker is:

* installed,
* waiting.

Do not show update Toast from a hard-coded timer.

---

# 213. UPDATE TOAST TIMING

Do not interrupt critical active interaction.

Defer until the application/browser is reasonably idle.

---

# 214. CRITICAL FLOW SAFETY

Do not force reload during:

* Posting Wizard unsaved work,
* Payment verification,
* Refund action,
* long form submission.

---

# 215. UPDATE TOAST ACTION

Use exact design action such as:

Update / Refresh

according to source.

Action must activate waiting Service Worker and reload safely.

---

# 216. LATER/DISMISS ACTION

If design provides dismissal:

hide non-blockingly.

Do not permanently prevent future important update indication unless intended.

---

# 217. SKIP WAITING

Use a controlled Service Worker message flow where appropriate.

Do not blindly call reload before the new Worker controls the page.

---

# 218. CONTROLLER CHANGE

Reload only after correct Service Worker lifecycle transition.

Protect against reload loop.

---

# 219. UPDATE VERSION

Optional internal app version may be recorded.

Do not expose fake version numbers.

---

# 220. OFFLINE UPDATE

If user is offline:

do not show misleading ready-to-update action requiring unavailable assets.

---

# 221. UPDATE TOAST ACCESSIBILITY

Use:

* appropriate status announcement,
* reachable buttons,
* non-trapping behavior.

---

# 222. SCREEN 11 FINAL CHECKLIST

* [ ] real Service Worker update detection
* [ ] Waiting Worker state
* [ ] non-blocking Toast
* [ ] deferred until idle
* [ ] no forced reload during critical flow
* [ ] Update action
* [ ] controlled activation
* [ ] controller-change handling
* [ ] no reload loop
* [ ] offline safety
* [ ] accessible status

---

# 223. SCREEN 12 — ACCESSIBILITY QUICK SETTINGS

Batch 17 defines a dedicated quick-accessibility settings surface.

Use exact design.

---

# 224. ACCESSIBILITY PRINCIPLE

Accessibility Quick Settings are an enhancement.

The core application must already be accessible without requiring the user to enable special mode.

Do not treat Settings as a substitute for semantic HTML.

---

# 225. SETTINGS SCOPE

Use exact Batch 17 controls.

Possible source-defined settings may include options such as:

* Text Size,
* High Contrast,
* Reduce Motion,
* stronger Focus/reading support

only where shown in the actual design.

Do not invent unrelated medical-accessibility claims.

---

# 226. TEXT SIZE

If Text Size control is present:

use token-based scaling.

Do not use page browser zoom hacks.

---

# 227. TEXT SIZE LAYOUT SAFETY

At increased size:

* buttons must grow/wrap,
* text must not clip,
* cards must expand,
* tables remain usable.

---

# 228. HIGH CONTRAST

If present:

change semantic contrast tokens.

Do not randomly recolor brand identity or images.

---

# 229. REDUCE MOTION

Respect both:

* user Quick Setting,
* `prefers-reduced-motion`.

The stronger reduction preference should win.

---

# 230. MOTION REDUCTION SCOPE

Reduce or remove nonessential:

* animated transitions,
* parallax,
* auto-scrolling behavior,
* decorative motion.

Do not break essential progress indicators.

---

# 231. FOCUS VISIBILITY

Quick Settings must not disable focus outlines.

Global keyboard focus remains visible.

---

# 232. PREFERENCE PERSISTENCE

Accessibility preference persists across:

* navigation,
* refresh,
* future sessions.

---

# 233. ACCESSIBILITY SETTINGS LOCATION

Quick Settings should be reachable from the location defined in Batch 17, with global access where appropriate.

---

# 234. RESET ACTION

If exact design provides Reset:

restore defaults.

Do not clear unrelated:

* Language,
* Theme,
* Cookie consent.

---

# 235. ACCESSIBILITY AND THEME

High Contrast/accessibility tokens must coexist with:

* Light,
* Dark,
* System.

Test combinations.

---

# 236. ACCESSIBILITY AND LANGUAGE

Test Gujarati text at enlarged text size.

Do not test only English.

---

# 237. ACCESSIBILITY AND DASHBOARD TABLES

At enlarged text:

table/card responsive transforms remain usable.

---

# 238. ACCESSIBILITY AND OVERLAYS

Modal/bottom-sheet focus behavior remains correct with settings enabled.

---

# 239. SCREEN 12 FINAL CHECKLIST

* [ ] exact Quick Settings design
* [ ] real preference effects
* [ ] text scaling where designed
* [ ] no clipping at large text
* [ ] high contrast where designed
* [ ] reduce motion where designed
* [ ] OS reduced-motion support
* [ ] visible focus
* [ ] preference persistence
* [ ] reset isolation
* [ ] Light compatibility
* [ ] Dark compatibility
* [ ] Gujarati compatibility
* [ ] mobile/tablet/desktop verification

---

# 240. PWA SERVICE WORKER SECURITY

Service Worker scope and caching must not weaken authorization.

Never use Cache Storage as an authorization source.

---

# 241. AUTHENTICATED PAGE CACHING

Do not blindly cache full private dashboard HTML for cross-user reuse.

---

# 242. LOGOUT CACHE SAFETY

After logout:

private user data must not remain exposed through an offline cached route.

Design a safe cache strategy.

---

# 243. SERVICE WORKER VERSIONING

Use versioned cache names.

Clean obsolete caches on activation.

---

# 244. CACHE MIGRATION

Do not delete required current assets before new Worker activation is stable.

---

# 245. SERVICE WORKER ERROR HANDLING

A Service Worker failure must not prevent normal online application use.

---

# 246. OFFLINE SEARCH

Do not pretend Search has fresh results offline.

Where cached page exists:

label Offline state.

---

# 247. OFFLINE SAVED CONTENT

If future offline Saved Property support exists:

only show actually cached records.

Not required unless exact architecture supports it.

---

# 248. TOOL CALCULATION PRIVACY

EMI, Stamp Duty and Unit Converter can function without storing personal calculations.

Do not collect user financial data unnecessarily.

---

# 249. TOOL ANALYTICS CONSENT

Usage Analytics for tools follows consent.

Calculator functionality itself does not require Analytics consent.

---

# 250. TOOL INPUT LOCAL PERSISTENCE

Do not persist sensitive financial calculator values unless source design explicitly requires it.

---

# 251. CALCULATOR NUMERIC PARSING

Handle Indian formatted user input safely.

Avoid parsing:

`50,00,000`

incorrectly.

---

# 252. CALCULATOR DECIMAL PRECISION

Use consistent calculation precision.

Format only for display after calculation.

---

# 253. CALCULATOR TESTING

Use deterministic unit tests.

Do not verify only through visual browser inspection.

---

# 254. COMPARISON DATA AUTHORITY

Compare selection may persist locally, but full comparison values should resolve from current public records where possible.

---

# 255. COMPARE REMOVED ITEM

If selected Listing is no longer public:

show safe Unavailable state and Remove option.

Do not leak hidden Listing details.

---

# 256. COMPARE AUTH STATE

Comparison should work for Guests according to public design.

Do not require login unless explicit source says so.

---

# 257. COMPARISON AND PAGINATION

Add item on Search page 1.

Go page 2.

Add another.

Return page 1.

Both selections remain.

Mandatory test.

---

# 258. COMPARISON AND FILTER CHANGE

Add item.

Change City/filter.

Tray remains.

---

# 259. COMPARISON AND ENTITY ROUTES

Add from Search.

Open Detail.

Tray remains.

---

# 260. COMPARISON MAX-LIMIT TEST

Add items 1–4.

Attempt item 5.

Expected:

* first 4 unchanged,
* visible limit message,
* no silent failure.

---

# 261. LANGUAGE AND SEARCH CROSS-TEST

Gujarati UI selected.

Search:

`amdavad`.

Expected:

Ahmedabad results.

---

# 262. LANGUAGE FALLBACK CROSS-TEST

Gujarati selected.

One test string missing.

Expected:

English source displayed,
subtle Pending indicator.

No raw key.

---

# 263. THEME AND PWA CROSS-TEST

Dark mode selected.

Install PWA.

Launch standalone.

Expected:

Dark preference preserved.

---

# 264. THEME SYSTEM CROSS-TEST

System selected.

Change OS theme.

Application updates without changing stored preference away from System.

---

# 265. CONSENT AND PWA CROSS-TEST

Install app.

Open standalone fresh consent context.

No Analytics before choice.

PWA installation must not imply Analytics consent.

---

# 266. ACCESSIBILITY AND PWA PROMPT TEST

Increased text size.

Install Prompt remains readable.

No clipped Install/Not Now buttons.

---

# 267. ACCESSIBILITY AND COMPARE TEST

Increased text size.

Compare Tray and Full Comparison remain usable.

Pinned attribute column does not cover content incorrectly.

---

# 268. FINAL BATCH 17 QA LOCK — PUBLIC DESKTOP HEADER

Exact global QA rule:

Public desktop Header must preserve strict 3-zone architecture:

`[Brand + City | Search flex-1 | Auth]`

Do not let Batch 17 controls break this.

---

# 269. PUBLIC MOBILE HEADER QA

Verify:

* compact Header,
* search always available according to Batch 1,
* Hamburger/Menu,
* correct Drawer behavior.

---

# 270. DASHBOARD DESKTOP SHELL QA

Verify:

* canonical Sidebar,
* collapse behavior,
* content width,
* no Compare Tray overlap.

---

# 271. DASHBOARD MOBILE BOTTOM NAV QA

Exact mobile Dashboard bottom nav:

* Home
* Search
* Post
* Leads
* Profile

No role-specific accidental replacement.

---

# 272. MOBILE DRAWER QA

Full role navigation remains in Drawer.

Bottom nav is not expected to include every page.

---

# 273. INNER-PAGE BACK BUTTON QA

Exact Batch 17 QA rule:

mobile inner pages use contextual Header/Back behavior.

Test:

* Lead Detail,
* Invoice Detail,
* Settings subpage,
* Compare,
* Tools where relevant.

---

# 274. LIST STATE QA

Every major list must have:

* Skeleton,
* Empty,
* Error.

Do not use one universal centered spinner only.

---

# 275. TABLE-TO-CARD QA

Exact global rule:

Tables become cards below 768px where Batch designs require it.

Do not horizontally squeeze operational Admin/Dashboard tables into unreadable columns.

---

# 276. MODAL-TO-SHEET QA

Desktop modal patterns become mobile bottom sheets where design specifies.

Verify:

* Cookie Preferences,
* filters,
* edit forms,
* confirmations.

---

# 277. STATUS COLOR LOCK

Exact Batch 17 final QA grammar:

### Green

* Live
* Active
* Approved
* Sent

### Amber

* Pending
* Draft
* Setup Required

### Red

* Rejected
* Error
* Suspended

### Zinc

* Paused
* Expired
* Archived

Use semantic tokens consistently.

---

# 278. STATUS DOMAIN EXCEPTION RULE

Where a domain has separate financial status grammar, preserve its exact domain vocabulary.

Example Batch 12 Gateway Status:

* Captured
* Failed
* Pending
* Refunded.

Do not force every domain into one badge list incorrectly.

---

# 279. WIZARD QA

Exact final QA:

### Desktop

numbered rail/stepper.

### Mobile

progress indicator.

Verify:

* sticky footer,
* Back,
* Save Draft,
* Continue,
* autosave,
* continue Draft.

---

# 280. DUPLICATE SUBMIT QA

Every mutation button must guard against accidental duplicate execution.

Test:

* Posting Submit,
* Proposal Send,
* Payment,
* Refund,
* Manual Extend,
* Campaign Submit,
* Contact,
* Support Ticket.

---

# 281. INLINE VALIDATION QA

Forms must show:

* field-level errors,
* accessible labels.

Long forms/wizards should also provide actionable error summary where design requires.

---

# 282. FAKE DATA PROHIBITION QA

Exact final lock:

No fake:

* counts,
* Analytics,
* metrics,
* Provider connection,
* performance,
* System Health,
* conversion.

Use:

* actual value,
* `—`,
* Setup Required,
* Not Enough Data.

---

# 283. PROVIDER HONESTY QA

For every provider-dependent surface:

Provider missing/error must create real fallback.

Examples:

### Maps

List fallback.

### Analytics

Setup Required.

### WhatsApp Notification

Skipped and logged.

### Loan Partner

Setup Required.

---

# 284. SECRET MASKING QA

Verify all Admin Provider screens:

* secrets write-only,
* masked IDs,
* no full secret in Browser payload.

---

# 285. CONTACT PRIVACY QA

Exact final lock:

contacts remain masked until approved reveal flow.

Batch 17 tools/theme/language changes must not accidentally expose contact fields.

---

# 286. ESTIMATE DISCLAIMER QA

Exact Batch 17 rule:

Calculator estimates must have disclaimers.

Applies to:

* EMI,
* Stamp Duty,
* Land Unit Converter where legal/official unit caution is relevant.

---

# 287. TRANSLATION HONESTY QA

Missing translation:

English fallback + subtle Pending.

Never:

* blank,
* fake auto translation,
* raw translation key.

---

# 288. MOBILE REFERENCE WIDTH

Exact final QA:

**390px mobile first**

Then test:

* 768px,
* 1280px.

Do not test only responsive DevTools default arbitrary width.

---

# 289. HORIZONTAL OVERFLOW QA

Exact rule:

No accidental page-level horizontal scroll.

Exceptions:

intentional internal scrollers such as:

* Comparison Table,
* chip row

must contain overflow internally.

---

# 290. STICKY OVERLAP QA

Verify:

* Public Header,
* Offline Banner,
* Dashboard Header,
* Compare Tray,
* Mobile Bottom Nav,
* sticky CTA,
* keyboard.

No overlapping critical action.

---

# 291. TOUCH TARGET QA

Exact rule:

minimum practical touch targets around:

44px

for mobile interactive controls.

Test:

* icon buttons,
* close buttons,
* checkboxes/toggles,
* pagination,
* Compare remove.

---

# 292. KEYBOARD SAFE-AREA QA

Exact rule:

input bars and bottom actions respect:

* mobile keyboard,
* safe area.

Test:

* Message Thread,
* forms,
* Cookie sheet,
* calculator fields.

---

# 293. REDUCED MOTION GLOBAL QA

With:

`prefers-reduced-motion: reduce`

verify:

* no excessive animation,
* functionality preserved.

---

# 294. KEYBOARD GLOBAL QA

Navigate:

* Header,
* Search,
* menus,
* modals,
* bottom sheets,
* comparison,
* calculators,
* consent prompt

with keyboard.

---

# 295. SCREEN READER LANDMARK QA

Verify:

* Header,
* Main,
* Navigation,
* Footer,
* Dialog.

Avoid duplicate unnamed navigations.

---

# 296. FOCUS TRAP QA

Test:

* Cookie Modal,
* Confirmation Modal,
* bottom sheets.

Focus cannot escape into background while open.

---

# 297. FOCUS RETURN QA

When modal/sheet closes:

focus returns to triggering control.

---

# 298. DARK MODE CONTRAST QA

Test representative:

* Public Home,
* Search,
* Detail,
* Owner Dashboard,
* Broker CRM,
* Builder Unit Inventory,
* Billing,
* Tools,
* Compare.

---

# 299. GUJARATI LARGE-TEXT QA

Gujarati UI

* increased Text Size
  + 390px width.

Verify:

* no clipping,
* no hidden buttons,
* no unreadable badge.

---

# 300. PWA FIRST-SESSION TEST

Fresh storage.

Session 1:

no Install Prompt.

---

# 301. PWA SECOND-SESSION TEST

Start valid second session.

If browser installable:

Prompt eligible.

---

# 302. PWA NOT-NOW TEST

Tap Not Now.

Set future session within 30 days.

No prompt.

Simulate after 30 days.

Prompt may be eligible again.

---

# 303. PWA INSTALLED TEST

Install app.

Launch standalone.

No Install Prompt.

---

# 304. OFFLINE NAVIGATION TEST

Load approved cached page online.

Go offline.

Navigate according to cache coverage.

Verify:

* Offline Banner,
* cached page behavior,
* no fake fresh content.

---

# 305. OFFLINE MUTATION TEST

Go offline.

Attempt server-required mutation.

Expected:

Connection Error / disabled action.

No fake success.

---

# 306. PWA UPDATE TEST

Install current Service Worker.

Deploy/simulate next Service Worker.

Expected:

* Waiting Worker detected,
* Toast deferred/non-blocking,
* Update action activates safely,
* one reload,
* no loop.

---

# 307. EMI FORMULA REGRESSION TEST

Use known deterministic test values.

Verify:

* EMI formula,
* total payment,
* total interest,
* zero-rate case,
* invalid input.

---

# 308. STAMP DUTY RULE VERSION TEST

Create two test effective rule versions.

Verify current date resolves correct active rule.

Do not combine rates.

---

# 309. UNIT CONVERTER ROUND-TRIP TEST

Convert:

A → B → A.

Expected:

original value within defined rounding tolerance.

---

# 310. CONSENT NETWORK TEST

Fresh consent state.

Inspect Network before choice.

Expected:

no Analytics/Marketing tracking.

Choose Analytics On.

Expected:

Analytics may load only if Provider Active.

---

# 311. CONSENT REJECT TEST

Reject Non-Essential.

Expected:

* Essential On,
* Analytics Off,
* Marketing Off.

---

# 312. CONSENT REVISIT TEST

Open Footer Cookie Preferences.

Change selection.

Verify shared state.

---

# 313. LANGUAGE PERSISTENCE TEST

Select Gujarati.

Refresh.

Navigate public → dashboard → public.

Preference remains.

---

# 314. THEME PERSISTENCE TEST

Select Dark.

Refresh and navigate.

Dark remains.

---

# 315. SYSTEM THEME TEST

Set System.

OS Light → app Light.

OS Dark → app Dark.

Stored preference remains System.

---

# 316. ACCESSIBILITY PERSISTENCE TEST

Change accessibility quick setting.

Refresh.

Setting remains.

---

# 317. COMPARISON PERSISTENCE TEST

Add 2 items.

Navigate:

Search page 1
→ page 2
→ Detail
→ Blog
→ Search.

Compare selection remains until cleared.

---

# 318. COMPARISON UNAVAILABLE ITEM TEST

Add test Listing.

Remove/unpublish Listing through Admin.

Open Compare.

Expected:

safe unavailable state.

No hidden Listing private data.

---

# 319. NO DEAD UI RULE

Every Batch 17 visible action must work.

Includes:

* Install,
* Not Now,
* language selector,
* Gujarati,
* Theme Light,
* Theme Dark,
* Theme System,
* tool inputs,
* calculator action,
* converter units,
* Swap/Copy where shown,
* Compare Add,
* Compare Remove,
* Clear,
* Compare CTA,
* View Details,
* Consent choice,
* Cookie Preference route,
* Update action,
* Accessibility controls,
* Reset where shown.

No:

`href="#"`.

No empty handlers.

---

# 320. LOADING STATES

Required where dynamic data exists:

* Compare current record refresh,
* Provider-dependent loan-partner state,
* Location Alias search,
* PWA update/install lifecycle where transient state exists.

Pure calculators do not need fake loading.

---

# 321. EMPTY STATES

Required:

* Compare Empty,
* no Search result,
* provider missing partner state.

Do not use Empty state for errors.

---

# 322. ERROR STATES

Required:

* Service Worker registration failure handled non-fatally,
* Install flow unavailable,
* Compare refresh error,
* Alias search failure fallback,
* Consent save failure,
* provider-dependent partner error.

Do not expose raw stack traces.

---

# 323. DEVELOPMENT REFERENCE DATA

Use persistent Development fixtures for:

* transliteration aliases,
* Comparison Properties/Projects,
* provider Setup Required state,
* missing Gujarati translation,
* Calculator test cases.

Do not hard-code into render components.

---

# 324. CURRENT REPOSITORY RECONCILIATION — COMPARISON

Preserve:

* Compare Provider,
* localStorage state,
* max 4,
* Tray,
* Compare page,
* Noindex.

Correct:

* silent max-limit failure,
* mobile bottom-nav overlap,
* missing pinned attribute column,
* generic limited row set,
* stale localStorage data reliance,
* exact Batch 17 visuals.

---

# 325. CURRENT REPOSITORY RECONCILIATION — SEARCH

Preserve current alias expansion while migrating to Batch 14 canonical Alias data.

Do not remove working:

amdavad/baroda corrections

before replacement passes regression.

---

# 326. CURRENT REPOSITORY RECONCILIATION — THEME

Preserve current:

* semantic CSS tokens,
* Dark token overrides,
* early Theme script.

Extend to:

* Light,
* Dark,
* System,
* correct OS listener,
* preference UI,
* full dark-mode audit.

---

# 327. CURRENT REPOSITORY RECONCILIATION — PWA

Build:

* manifest,
* Service Worker,
* registration,
* install lifecycle,
* offline state,
* update lifecycle.

Do not implement only visual components.

---

# 328. CURRENT REPOSITORY RECONCILIATION — TOOLS

No substantive EMI, Stamp Duty or Land Unit Converter implementation was confirmed.

Build all three as real functional public tools.

---

# 329. CURRENT REPOSITORY RECONCILIATION — CONSENT

Batch 17 Analytics Consent must connect to Batch 16 Cookie Preferences.

One state only.

---

# 330. CURRENT REPOSITORY RECONCILIATION — ACCESSIBILITY

Accessibility Quick Settings must use actual UI preferences and global tokens/classes.

Do not add a static Settings card with no effect.

---

# 331. FULL CONNECTED BATCH 17 REGRESSION FLOW

Execute this complete real test:

open a fresh browser profile
→ verify no Analytics requests before consent
→ verify no Install Prompt on first session
→ choose Analytics preference according to test case
→ close browser/session
→ start valid second session
→ verify PWA Install Prompt eligibility
→ choose Not Now
→ start another session within 30 days
→ verify prompt suppressed
→ simulate expiry
→ verify prompt can reappear
→ install application in supported browser test
→ launch standalone
→ verify no Install Prompt
→ verify Theme and Language preferences persist
→ set Gujarati
→ verify translated UI
→ open known missing-string fixture
→ verify English fallback + subtle Pending state
→ verify Hindi shows Coming Soon and cannot be selected
→ set Theme Dark
→ inspect public pages and dashboards
→ set System
→ change OS preference
→ verify live update
→ go offline
→ verify Offline Banner above Header
→ verify cached page behavior
→ attempt server mutation
→ verify no fake success
→ reconnect
→ verify Banner clears and Retry works
→ Search `amdavad`
→ verify Ahmedabad result
→ Search `baroda`
→ verify Vadodara
→ Search `Satelite` in correct context
→ verify Satellite locality
→ add Property to Compare
→ verify Tray appears immediately
→ paginate Search
→ add second item
→ change filters
→ verify Tray persists
→ add items 3 and 4
→ attempt fifth
→ verify visible max-limit message
→ open Full Compare
→ verify horizontal scroll
→ verify attribute column pinned
→ verify missing values show `—`
→ remove one item
→ verify state persists
→ open EMI Calculator
→ run deterministic test values
→ verify formula and disclaimer
→ verify loan partner Setup Required when provider missing
→ open Stamp Duty Calculator
→ verify active rule version
→ test result breakdown and disclaimer
→ open Land Unit Converter
→ test forward/inverse conversion
→ verify precision/disclaimer
→ open Cookie Preferences
→ reject non-essential
→ inspect Network
→ verify no Analytics
→ enable Analytics only
→ verify Provider + consent matrix
→ simulate new Service Worker version
→ verify non-blocking Update Toast
→ verify no forced reload during active form
→ complete safe Update
→ open Accessibility Quick Settings
→ increase text size
→ enable Reduce Motion/other exact controls
→ verify Gujarati mobile UI
→ verify Theme combinations
→ clear Compare
→ verify Empty state
→ run 390px complete platform pass
→ run 768px complete platform pass
→ run 1280px complete platform pass
→ inspect console
→ inspect horizontal overflow
→ inspect sticky overlap
→ inspect keyboard and safe-area behavior.

Any broken connection means Batch 17 is incomplete.

---

# 332. FINAL CROSS-BATCH ROLE TEST — GUEST

Verify Guest can:

* use Search,
* use tools,
* compare,
* set Language,
* set Theme,
* manage consent,
* install PWA.

Cannot access private Dashboard data.

---

# 333. FINAL CROSS-BATCH ROLE TEST — OWNER

Verify exact mobile bottom nav:

Home · Search · Post · Leads · Profile.

Compare Tray never overlaps it.

---

# 334. FINAL CROSS-BATCH ROLE TEST — BROKER

Verify:

* CRM,
* Requirement Feed,
* Compare/Public Search,
* Theme/Language

remain functional.

---

# 335. FINAL CROSS-BATCH ROLE TEST — BUILDER

Verify:

* Projects,
* Units,
* Leads,
* Campaigns,
* Compare/Public tools,
* preferences.

---

# 336. FINAL CROSS-BATCH ROLE TEST — ADMIN

Verify Admin:

* does not receive public-role bottom nav,
* retains graphite shell,
* Theme behavior follows final Admin design authority,
* System Health does not fake metrics,
* Batch 17 preferences do not break Admin permissions.

---

# 337. LIVE VERIFICATION STANDARD

After each Batch 17 implementation phase:

1. run Build,
2. run TypeScript check,
3. run Lint where configured,
4. run unit tests for calculators,
5. start actual application,
6. test fresh Guest browser,
7. test returning Guest,
8. test installed standalone mode,
9. test Owner,
10. test Broker,
11. test Builder,
12. test Admin,
13. test Online,
14. test Offline,
15. test reconnect,
16. test Light,
17. test Dark,
18. test System,
19. test English,
20. test Gujarati,
21. test missing translation,
22. test PWA Update,
23. test consent Network activity,
24. test Compare persistence,
25. test tool calculations,
26. test 390px,
27. test 768px,
28. test 1280px,
29. inspect Browser console,
30. inspect Service Worker errors,
31. inspect Network,
32. inspect unauthorized tracking,
33. inspect horizontal overflow,
34. inspect sticky overlap,
35. inspect keyboard focus.

Static code review is not PASS.

---

# 338. MANUAL VISUAL VERIFICATION

Compare every Batch 17 screen beside the actual source.

Inspect:

* Install Prompt,
* icon positioning,
* benefit copy,
* Install/Not Now hierarchy,
* Offline Banner,
* language choices,
* Hindi Coming Soon state,
* Theme cards/options,
* Search correction behavior,
* calculator input density,
* result card hierarchy,
* disclaimer treatment,
* Unit Converter controls,
* Compare Tray,
* mobile Compare offset,
* full Comparison table,
* pinned attribute column,
* Analytics Consent position,
* mobile Consent sheet,
* Update Toast,
* Accessibility Quick Settings.

`Almost the same` is not PASS.

---

# 339. COMPLETION BLOCKERS

Batch 17 must not be marked complete while any of these remain:

* Install Prompt appears on first session,
* Install Prompt appears when app is already installed,
* Install action is fake,
* Not Now is permanent instead of 30 days,
* Not Now is forgotten after refresh,
* PWA Manifest missing,
* Service Worker missing,
* Offline Banner based on fake toggle,
* Offline Banner overlaps Header,
* offline mutation shows fake success,
* private dashboard content is unsafely cached across users,
* English is not default,
* Gujarati selection does not persist,
* Hindi Coming Soon is selectable into broken UI,
* missing translation shows blank text,
* missing translation shows raw key,
* legal content auto-translated without approval,
* Theme supports only Dark boolean instead of Light/Dark/System,
* System Theme does not react to OS changes,
* Theme changes layout instead of tokens,
* hard-coded light surfaces break Dark mode,
* transliteration aliases removed before replacement,
* Search alias data disconnected from Batch 14,
* `amdavad` no longer resolves Ahmedabad,
* ambiguous Alias resolves wrong Location,
* EMI formula incorrect,
* EMI zero-rate case breaks,
* fake bank offer shown,
* calculator lacks disclaimer,
* Stamp Duty rates hard-coded without version/effective rule strategy,
* Stamp Duty represented as guaranteed official amount,
* Unit Converter uses inconsistent factors,
* region-specific unit shown as universally exact,
* Compare Tray waits for 2 items instead of first add,
* Compare max 4 silently ignores item 5,
* Compare selection disappears on pagination,
* Compare Tray overlaps mobile bottom nav,
* Full Comparison lacks horizontal scroll,
* attribute column not pinned,
* Compare values are stale/private,
* removed Listing private data remains visible,
* Analytics loads before consent,
* Consent prompt and Cookie Preferences use different state,
* Provider Active causes tracking despite Consent Off,
* Consent On fakes tracking when Provider missing,
* PWA Update Toast driven by timer instead of real Service Worker,
* update forces reload during critical form/payment flow,
* update causes reload loop,
* Accessibility Quick Settings are visual-only,
* text-size preference causes clipping,
* Reduce Motion ignores OS preference,
* focus rings disappear,
* accidental horizontal page scroll,
* sticky overlays cover actions,
* mobile touch targets too small,
* keyboard hides input/action bar,
* fake counts or metrics remain,
* Setup Required surfaces replaced with fake numbers,
* contact privacy regression,
* dead button,
* `href="#"`,
* console errors,
* no full cross-role QA.

---

# 340. FINAL ACCEPTANCE STATEMENT

**Design Batch 17 — Advanced PWA / Localization / Tools is complete only when all 12 screen groups and the final cross-platform QA lock are fully implemented according to the exact source design and verified through real browser behavior.**

Completion requires:

* real installable PWA,
* Manifest,
* Service Worker,
* second-session install eligibility,
* Install action,
* Not Now,
* 30-day suppression,
* installed-app detection,
* Offline Banner above Header,
* real online/offline events,
* reconnect behavior,
* safe cache strategy,
* no private cache leak,
* English default,
* Gujarati available,
* Hindi Coming Soon,
* persistent language preference,
* English fallback,
* subtle Pending translation state,
* no blank translation,
* Light Theme,
* Dark Theme,
* System Theme,
* token-swap-only behavior,
* OS preference listener,
* no Theme flash,
* complete Dark-mode audit,
* transliteration Search,
* typo tolerance,
* canonical Location Alias integration,
* amdavad → Ahmedabad,
* baroda → Vadodara,
* Satelite → Satellite,
* ambiguity handling,
* EMI Calculator,
* correct formula,
* zero-rate handling,
* Indian number formatting,
* estimated Monthly EMI,
* Total Interest/Payment where designed,
* estimate disclaimer,
* loan-partner Setup Required state,
* Gujarat Stamp Duty Calculator,
* versioned rule authority,
* effective-date calculation,
* real breakdown,
* disclaimer,
* Gujarat Land Unit Converter,
* canonical conversion factors,
* region-specific warning,
* precision,
* conversion tests,
* Compare Tray after first add,
* maximum 4 items,
* visible limit feedback,
* persistence across pagination,
* persistence across filters,
* persistence across navigation,
* remove item,
* Clear All,
* mobile Tray above bottom nav,
* Full Comparison,
* horizontal scroll,
* pinned attribute column,
* exact comparable rows,
* `—` for missing values,
* stale/unavailable item handling,
* noindex Compare route,
* Analytics Consent desktop bottom-left prompt,
* mobile Consent bottom sheet,
* no tracking before choice,
* shared Batch 16 Cookie Preference state,
* Provider + Consent matrix,
* consent persistence,
* PWA Update Toast,
* real Service Worker update detection,
* non-blocking behavior,
* deferred-until-idle behavior,
* safe activation and reload,
* Accessibility Quick Settings,
* persistent real effects,
* large-text safety,
* contrast support where designed,
* Reduce Motion,
* visible focus,
* Light/Dark/Gujarati compatibility,
* final Public Header verification,
* mobile Header verification,
* Dashboard Sidebar verification,
* exact mobile bottom navigation,
* contextual mobile Back Header,
* Skeleton/Empty/Error states,
* Table-to-Card transforms,
* Modal-to-Sheet transforms,
* status-color consistency,
* Wizard consistency,
* duplicate-submit prevention,
* inline validation,
* no fake data,
* Provider honesty,
* secret masking,
* contact privacy,
* estimate disclaimers,
* honest translation fallback,
* 390px-first mobile QA,
* 768px tablet QA,
* 1280px desktop QA,
* no accidental horizontal scroll,
* no sticky overlap,
* 44px practical touch targets,
* keyboard and safe-area compliance,
* complete Guest regression,
* complete Owner regression,
* complete Broker regression,
* complete Builder regression,
* complete Admin regression,
* complete Online/Offline regression,
* complete consent Network verification,
* complete PWA lifecycle verification.

Required implementation sequence:

**Global Preferences → Language → Theme → Accessibility → PWA Foundation → Install Prompt → Offline Banner → Update Toast → Analytics Consent → Transliteration Search → EMI Calculator → Stamp Duty Calculator → Land Unit Converter → Comparison → Final 390/768/1280 QA → complete Guest/Owner/Broker/Builder/Admin regression.**

No Batch 17 screen passes merely because it renders.

**Exact Design + Real PWA Lifecycle + Offline Honesty + Localization Integrity + Theme Token Integrity + Search Accuracy + Calculation Accuracy + Estimate Honesty + Comparison Persistence + Consent Enforcement + Update Safety + Accessibility + Responsive Consistency + Cross-Role Live Verification must all pass.**
