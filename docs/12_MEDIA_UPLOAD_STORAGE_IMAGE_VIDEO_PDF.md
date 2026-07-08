# docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md

# My Gujarat Property — Media Upload, Storage, Image, Video, PDF, Private Documents, R2 And CDN Rules

This document defines the complete **Media Upload, Storage, Image, Video, PDF, Private Document, Cloudflare R2, CDN and File Security System** for **My Gujarat Property**.

---

## Design Add-Ons (from finished wireframes — build to match)

> Source of truth: finished design at `C:\Users\RAJAN\Documents\MGP DESIGN` (Batches 5, 8, 11, 16). Replicate 1:1; see `design-prompts/DESIGN_ADDONS_MASTER.md`.

* **Upload widget** (reused across all media steps): tap/drag zone with explicit limits shown in copy ("JPG/PNG · max 10 MB each · min 3 photos"), 3-col gallery grid with a **Cover** badge on the first photo, long-press drag-reorder, tap-scissors crop, per-file upload % state, and a growth-nudge banner ("5+ photos get 2x more views").
* **Brochures are stored as PDF and never converted to image** — the detail page shows "PDF · <size> · stored as PDF, never converted to image" with View + Download.
* Video / 360°-tour: URL/link fields; when empty the public page shows an honest **"Setup Required"** tab, never a broken embed.
* **Private documents** (verification, claim proofs) use a **per-viewer watermarked viewer** (watermark = reviewing staff initials, e.g. "MGP ADMIN · KR"), are **never downloadable**, live in a private bucket with signed access, and sensitive access is audit-logged. The 10 MB upload limit is surfaced to users (e.g. support chat references it).

Claude must read this file before implementing property images, project images, project video, brochures, floor plans, profile images, ad banners, verification documents, RERA proof, support attachments, message attachments, invoice PDFs, CMS/blog images, media storage, Cloudflare R2, CDN, signed URLs, media optimization, EXIF stripping, image conversion, private file access, upload validation, media RLS policies or media-related SQL migrations.

No fake upload success is allowed.

No private document can be public.

No hidden contact can leak through media.

No unsafe file can be accepted without validation.

No project can have more than one video.

No provider-backed upload can be marked complete unless storage is configured or setup-required is honestly shown.

---

## 1. Purpose

This file defines:

* media upload system
* image upload rules
* video upload rules
* PDF upload rules
* private document upload rules
* profile image rules
* property gallery rules
* project gallery rules
* project brochure rules
* project floor plan rules
* project video rules
* ad banner rules
* verification document rules
* RERA proof rules
* support attachment rules
* message attachment rules
* invoice PDF rules
* CMS/blog image rules
* Cloudflare R2 storage strategy
* CDN strategy
* public/private bucket separation
* signed URL strategy
* media metadata
* media variants
* image optimization
* AVIF/WebP conversion
* original backup
* EXIF stripping
* SVG safety
* HEIC/HEIF handling
* GIF handling
* malware scan setup-required rules
* orphan cleanup
* lifecycle cleanup
* drag/reorder/crop UX
* responsive gallery behavior
* storage provider setup-required states
* media RLS policies
* admin media moderation
* media performance rules
* manual verification rules

This is the master media and file safety reference.

---

## 2. Core Media Principles

Media must follow these principles:

1. Uploads must be validated server-side.
2. Client-side validation is only UX, not security.
3. Storage provider missing means setup-required.
4. Upload success must be real.
5. Private files must never be public.
6. Public media must be public-safe only after approval.
7. Verification documents must use private bucket.
8. RERA proof documents must use private bucket.
9. Support/report evidence may require private bucket.
10. Invoice PDFs must be user-scoped and protected.
11. Hidden contact must not leak through image metadata, PDF metadata or public URLs.
12. EXIF/location metadata should be stripped where possible.
13. SVG must be sanitized or disallowed if unsafe.
14. Video must be limited and lazy-loaded.
15. Project can have one video max.
16. Project brochure PDF must be validated.
17. Floor plans must be public-safe and project-owned.
18. Ad banners must be device-specific and safe.
19. Media metadata must be stored in DB.
20. Media access must be RLS/permission protected.
21. Signed URLs must be used for private files.
22. CDN must not expose private documents.
23. No fake image/video/PDF upload.
24. Orphan media must be cleaned up.
25. Manual verification is required before PASS.

---

## 3. Media Entity Types

Media may belong to these entities:

| Entity         | Media Type                                                             |
| -------------- | ---------------------------------------------------------------------- |
| Property       | images, optional brochure where allowed                                |
| Project        | images, one video, brochure PDF, floor plans, progress media, 360 link |
| Requirement    | usually none; optional private attachment where allowed                |
| Profile        | avatar, broker agency logo, builder company logo                       |
| Ad / Promotion | desktop/tablet/mobile banners                                          |
| Verification   | private identity/business/authority/RERA documents                     |
| Message        | private attachments                                                    |
| Support Ticket | private attachments                                                    |
| Report/Fraud   | private evidence attachments                                           |
| CMS Page       | public images                                                          |
| Blog Post      | public images                                                          |
| Invoice        | private invoice PDF                                                    |
| Notification   | rarely media; template image if approved                               |
| Admin/Internal | internal attachments if needed                                         |

Each entity must define whether its media is public or private.

---

## 4. Public Vs Private Media

## 4.1 Public Media

Public media may include:

* approved property images
* approved project images
* approved project brochure if intended public
* approved project floor plans
* approved project video
* approved profile avatar/logo
* approved ad banners
* approved CMS/blog images
* public location/SEO images where implemented

Public media rules:

* must be safe
* must not contain private documents
* must not contain hidden contact if policy disallows
* must not expose private exact location through metadata
* must not expose EXIF GPS
* must not be published before entity approval
* must be cache/CDN safe
* must have metadata and ownership

---

## 4.2 Private Media

Private media includes:

* verification documents
* identity proof
* business proof
* ownership/authority proof
* RERA proof documents
* private support attachments
* report/fraud evidence
* message attachments
* private invoice PDFs
* internal admin attachments
* private legal dispute documents
* private billing documents where restricted

Private media rules:

* private bucket only
* signed URLs only
* access permission required
* access logged for sensitive docs
* no public CDN
* no public direct URL
* no sitemap/SEO
* no raw storage key exposed
* no permanent public link
* no private URL in logs
* no unauthorized preview/download

Private document leak is critical.

---

## 5. Recommended Storage Provider

Recommended provider:

* Cloudflare R2 for object storage
* Cloudflare CDN for public media
* signed URLs or secure proxy for private files
* database metadata in Supabase/PostgreSQL

Storage provider status:

* `SETUP_REQUIRED` until configured
* `CONFIGURED_NOT_TESTED` if env exists but not tested
* `ACTIVE` only after tested upload/read/delete
* `FAILED` if provider failing
* `FALLBACK_ACTIVE` only if real fallback exists

No fake storage success.

---

## 6. Storage Modes

Allowed storage modes:

| Mode                      | Meaning                         |
| ------------------------- | ------------------------------- |
| `setup_required`          | provider missing                |
| `local_dev_only`          | dev-only local/temp storage     |
| `r2_active`               | Cloudflare R2 active            |
| `supabase_storage_active` | Supabase Storage active if used |
| `fallback_active`         | real fallback active            |
| `disabled`                | uploads disabled                |
| `failed`                  | storage configured but failing  |
| `maintenance`             | temporarily disabled            |

Production must not rely on local dev-only storage.

---

## 7. Bucket Strategy

Recommended bucket separation:

```txt id="bucket-strategy"
public-media/
private-documents/
private-messages/
private-support/
private-invoices/
temp-uploads/
quarantine/
```

Implementation may merge some private buckets if access rules remain strong, but public and private must be separated.

---

## 8. Public Bucket Rules

Public bucket can store:

* approved listing images
* approved project images
* approved public brochure/floor plan files
* public profile avatars/logos
* approved ad banners
* public CMS/blog images

Public bucket must not store:

* identity documents
* RERA proof private docs
* ownership proof
* private messages
* support evidence
* report evidence
* invoice PDFs if private
* private billing documents
* hidden contact files
* raw unapproved media if exposure risk exists

---

## 9. Private Bucket Rules

Private bucket stores sensitive files.

Private bucket access:

* authenticated user owns file
* authorized participant can access
* staff/admin with permission can access
* Super Admin where required
* signed URL generated server-side
* signed URL expiry
* access log for sensitive docs

Private bucket must not:

* have public read policy
* be attached to public CDN
* expose permanent URLs
* expose storage keys in browser where unsafe
* allow direct guessable access
* cache publicly

---

## 10. Temporary Upload Rules

Temporary uploads may be used during draft flows.

Rules:

* temp uploads are not public
* temp uploads expire
* temp uploads linked to uploader/session
* temp files cleaned up if draft abandoned
* temp files moved/promoted after entity saved/approved where needed
* temp file access scoped
* upload success only after storage write
* no orphan pileup

Temp upload cleanup needs background job or admin/manual cleanup until cron configured.

---

## 11. Quarantine Rules

Quarantine may be used when:

* file scan pending
* file type suspicious
* malware scan failed
* SVG unsafe
* PDF suspicious
* upload validation uncertain
* admin review required

Quarantined files:

* not public
* not downloadable by normal users
* visible to admin/security staff only if permitted
* status shown to uploader as processing/needs review
* deleted or released after review

Malware/file scanning provider may be setup-required initially.

---

## 12. Supported File Types

## 12.1 Images

Image formats may include:

* JPG
* JPEG
* PNG
* WebP
* AVIF
* GIF
* HEIC
* HEIF
* sanitized SVG if allowed

Rules:

* validate extension
* validate MIME
* validate magic bytes where possible
* enforce size limits
* enforce image dimensions where needed
* strip EXIF where possible
* convert to WebP/AVIF where configured
* keep original backup if policy says yes
* generate responsive variants
* reject unsafe SVG or sanitize strictly
* handle HEIC/HEIF conversion if supported
* do not fake conversion success

---

## 12.2 Videos

Video formats may include:

* MP4
* WebM
* MOV if conversion supported
* M4V if allowed

Rules:

* project video one max
* validate type/MIME
* enforce size and duration technical limits
* generate thumbnail if processing configured
* lazy-load
* no autoplay heavy video by default
* storage/provider required
* public only after project approval
* reject unsafe/unsupported video
* show processing/setup-required state honestly

---

## 12.3 PDFs

PDF is used for:

* project brochure
* property brochure where allowed
* floor plans
* invoice PDF
* verification/support/report attachments where private
* legal/support documents where needed

Rules:

* PDF only where PDF expected
* validate extension/MIME/magic bytes
* size limit
* no fake PDF upload
* scan/sanitize if provider configured
* private/public rules per entity
* lazy preview/download
* signed URL for private PDFs
* no private PDF public URL

---

## 12.4 Documents / Attachments

Private attachments may include:

* PDF
* image
* DOC/DOCX if allowed
* XLS/XLSX if allowed
* TXT if allowed
* ZIP generally discouraged and private-only if ever allowed

Rules:

* keep attachment types restricted
* avoid broad file support unless necessary
* private bucket by default
* malware scan setup-required or implemented
* no executable files
* no scripts
* no unknown binary formats
* no fake attachment upload

---

## 13. Disallowed File Types

Disallow by default:

* EXE
* MSI
* BAT
* CMD
* SH
* PHP
* JS as upload
* HTML as upload
* HTM
* SVG unless sanitized/explicitly allowed
* JAR
* APK
* IPA
* DLL
* DMG
* ISO
* unknown binary
* password-protected ZIP/PDF unless policy supports review
* macro-enabled Office files unless explicitly allowed and scanned

Unsafe file uploads must be blocked server-side.

---

## 14. Upload Validation Rules

Every upload must validate:

* authenticated user where required
* role permission
* entity ownership
* entity status
* provider availability
* file count limit
* file size limit
* MIME type
* extension
* magic bytes where possible
* dimensions where needed
* duration where video
* document type
* bucket type
* public/private classification
* plan/subscription limit
* virus/malware scan status where configured
* duplicate file where useful
* storage write success
* DB metadata write success

Client validation improves UX.

Server validation enforces rules.

---

## 15. File Size And Count Rules

User business requirement may not set public min/max image count, but system must still enforce technical limits for safety.

Rules:

* no visible unnecessary minimum unless product requires it
* allow multiple images where required
* enforce safe maximum count per entity/plan
* enforce maximum file size
* enforce total storage quota
* enforce per-user upload rate limits
* enforce per-entity limits
* show limit reason clearly
* limits must be server-side
* plan limits must be real
* no fake unlimited upload if infra cannot support it

Exact numbers should be configured during implementation based on infra and plan.

---

## 16. Upload UX Rules

Upload UI must support:

* select files
* drag and drop where desktop
* mobile file picker
* upload progress
* preview
* retry failed upload
* remove before submit
* reorder
* set cover/front image
* crop where implemented
* validation errors
* file size/type error
* setup-required state
* disabled state
* processing state
* success state only after real upload
* unsaved changes warning
* draft save
* no accidental drag image behavior

Upload UI must not:

* show success before DB/storage success
* break on mobile
* distort preview
* allow double submit
* lose draft unexpectedly
* expose raw storage keys
* expose private signed URLs permanently

---

## 17. Drag And Interaction Rules

Media UI must prevent bad mobile/desktop interactions.

Rules:

* `draggable=false` for display images where needed
* use reorder handle for drag-sort
* scroll/tap threshold to avoid accidental open
* stop propagation for nested buttons
* gallery swipe should not trigger card click accidentally
* copy action only through explicit copy button
* upload remove button requires clear tap target
* crop modal locks background scroll
* back button closes modal first where implemented
* double-submit prevented
* delete confirmation for uploaded media

---

## 18. Image Processing Rules

Image processing may include:

* resize
* compress
* convert to WebP
* convert to AVIF
* generate thumbnails
* generate responsive sizes
* strip EXIF
* crop
* rotate
* blur placeholder
* dominant color extraction
* watermark if policy approved
* original backup

Rules:

* original file backup policy must be clear
* variants linked to original asset
* failed processing status visible
* public pages use optimized variants
* fallback original only if safe
* no fake processed status
* background job/provider setup-required if processing missing

---

## 19. Image Variant Rules

Recommended variants:

* thumbnail
* card
* gallery small
* gallery medium
* gallery large
* original backup
* avatar small
* avatar medium
* ad desktop
* ad tablet
* ad mobile
* floor plan preview
* PDF thumbnail where generated

Variant metadata:

* width
* height
* format
* storage key
* file size
* public URL if public
* variant type
* created_at

Variants must not expose private files publicly.

---

## 20. EXIF And Metadata Privacy

Images may contain EXIF metadata such as GPS location.

Rules:

* strip EXIF for public images where possible
* strip GPS metadata
* do not expose camera/device info unnecessarily
* PDF metadata should be cleaned where possible
* hidden contact must not be embedded in metadata
* uploader private data must not be embedded in generated filenames/metadata
* original private backup must still be protected
* metadata extraction logs must be safe

EXIF/GPS leak is a privacy bug.

---

## 21. SVG Safety Rules

SVG can contain scripts and external references.

Recommended:

* disallow SVG by default for user uploads unless sanitized
* allow only trusted admin/CMS SVG if sanitization exists
* sanitize SVG strictly
* remove scripts
* remove external references
* remove event handlers
* serve with safe content type
* do not inline unsafe SVG
* do not allow SVG in private document preview without sanitization

Unsafe SVG acceptance is a security bug.

---

## 22. HEIC / HEIF Rules

HEIC/HEIF support may be useful for mobile uploads.

Rules:

* accept only if server/browser processing supports it
* convert to WebP/JPEG/AVIF where configured
* show unsupported error if not supported
* no fake conversion
* preserve orientation correctly
* strip metadata
* generate variants
* track original format

If not supported initially, show clear “unsupported format” or setup-required conversion state.

---

## 23. GIF Rules

GIF may be allowed with caution.

Rules:

* validate type
* enforce size limit
* avoid heavy GIFs on public pages
* generate static thumbnail if possible
* lazy-load
* disallow animated GIF for ads if policy requires
* avoid layout/performance issues
* scan/validate as media

---

## 24. Watermark Rules

Watermark may be used in future.

Possible watermark types:

* platform watermark
* listing ID watermark
* public image watermark
* anti-scraping watermark
* private doc preview watermark

Rules:

* watermark policy must be approved
* watermark must not distort critical media
* watermark must not falsely imply verification
* private doc watermark should include user/staff access info if implemented
* no fake verified/RERA watermark
* original backup retained if needed

Watermark is not required unless future prompt requests implementation.

---

## 25. Property Image Rules

Property image system must support:

* multiple images
* cover/front image
* reorder
* preview
* remove
* replace
* crop where implemented
* optimized variants
* approval workflow
* public gallery after approval
* dashboard draft/pending media
* admin moderation preview

Property image rules:

* Owner/Broker can upload for own property.
* Builder cannot upload property images because builder cannot post property.
* Guest cannot upload.
* Images public only after property approval/publish.
* Pending/draft/rejected images not public.
* Hidden contact must not appear in metadata.
* User-visible min/max not required unless plan/product says, but technical limit required.
* No fake upload success.

---

## 26. Property Brochure Rules

Property brochure may be allowed depending role/plan.

Rules:

* Broker brochure PDF allowed where plan/rule allows.
* Owner brochure optional/future/plan-dependent.
* PDF only.
* Validate PDF.
* Storage provider required.
* Public only if listing approved and brochure intended public.
* Private if contains sensitive info.
* No fake PDF upload.
* No private docs uploaded as brochure.
* Brochure upload may require plan limit.

---

## 27. Project Image Rules

Project image system must support:

* multiple images
* cover/front image
* gallery order
* project progress images
* construction progress images
* optimized variants
* approval workflow
* admin moderation
* public gallery after approval

Rules:

* Builder can upload for own project.
* Owner/Broker cannot upload project images.
* Guest cannot upload.
* Images public only after project approval/publish.
* Project media must not fake progress.
* Media must not include misleading claims.
* No fake upload success.

---

## 28. Project Video Rules

Project video rules are strict.

Rules:

* project can have one video max.
* builder only.
* own project only.
* video type/size/duration validated.
* upload provider required.
* thumbnail generation setup-required/real.
* video public only after project approval.
* video lazy-loaded.
* no autoplay heavy video by default.
* video can be removed/replaced by builder where allowed.
* replace may require reapproval.
* admin can review.
* no fake upload/process success.
* no unsafe video type.

If more than one video is attempted, server rejects.

---

## 29. Project Brochure PDF Rules

Project brochure:

* builder only
* own project only
* PDF only
* validated
* linked to project
* public after approval if brochure public
* lazy-load/download
* replacement may require reapproval
* admin review required
* no private verification/RERA proof uploaded as public brochure
* storage setup-required if missing
* no fake upload

---

## 30. Project Floor Plan Rules

Floor plans may be:

* image
* PDF
* per BHK/unit type
* per floor
* per wing/tower
* master layout
* site plan

Rules:

* builder only
* own project only
* validate type/MIME
* link to unit type/project/wing where needed
* public after approval
* private internal floor notes must not be public
* preview/download lazy
* admin review
* storage setup-required if missing
* no fake floor plan

---

## 31. Project Progress Media Rules

Progress media may include:

* images
* short video only if allowed under one-video rule or separate progress policy
* date-based progress updates
* progress percent
* construction stage
* notes

Rules:

* builder only
* own project only
* progress must be real
* admin review where public
* no fake construction progress
* public only after approval where required
* media optimized
* timeline sorted by date

---

## 32. 360 / Virtual Tour Rules

360/virtual tour may use:

* Matterport link
* provider URL
* iframe embed
* self-hosted tour link where safe

Rules:

* validate URL
* allowlist providers where possible
* no unsafe iframe
* no script injection
* no SSRF
* lazy-load embed
* builder own project only
* public after approval
* setup-required if iframe/provider not enabled
* no fake tour

---

## 33. Profile Image And Logo Rules

Profile media may include:

* user avatar
* broker agency logo
* builder company logo
* builder public profile banner where implemented
* broker cover/banner where implemented

Rules:

* user can upload own profile image.
* broker can upload agency logo for own broker profile.
* builder can upload company logo for own builder profile.
* image crop/remove/change supported.
* fallback initials/avatar.
* optimized avatar variants.
* public only if profile public/allowed.
* storage setup-required if missing.
* no fake upload.
* no stretched/distorted faces/logos.
* unsafe images blocked.

---

## 34. Verification Document Rules

Verification documents are private.

May include:

* identity proof
* business proof
* broker license/registration
* builder business proof
* GST/business docs
* ownership/authority proof
* RERA proof
* co-owner consent proof
* address proof
* call/review proof where stored
* role change proof

Rules:

* private bucket only
* signed URL only
* uploader can access own submitted docs where allowed
* staff can access only with permission
* private doc access logged
* no public URL
* no CDN public
* no sitemap/SEO
* no logs with private URL
* no fake upload
* document type required
* status tracked
* expiry/recheck where applicable

---

## 35. RERA Proof Rules

RERA proof is sensitive/private.

Rules:

* builder/project related
* private bucket
* staff verification permission required
* access log
* public page may show RERA number/status only if approved/real
* proof document itself not public
* RERA badge real only
* RERA proof replacement/review audited
* no fake RERA proof upload
* no public RERA doc leak unless policy/legal explicitly allows a public document link

---

## 36. Support Attachment Rules

Support attachments may include:

* screenshot
* PDF
* document
* proof image
* invoice/payment proof
* issue evidence

Rules:

* private by default
* user sees own ticket attachments
* support staff sees assigned/permitted attachments
* validate files
* signed URLs
* access scoped
* no public exposure
* no fake upload
* no malware/unsafe files

---

## 37. Report / Fraud Evidence Rules

Report/fraud attachments may include:

* screenshot
* document
* image
* message evidence
* listing proof
* payment proof

Rules:

* private bucket
* reporter identity protected
* target user does not automatically see reporter private evidence
* staff/security permission required
* signed URL
* access logged where sensitive
* no public exposure
* no fake upload

---

## 38. Message Attachment Rules

Message attachments are private unless explicitly public-safe.

Rules:

* message participants only
* private bucket
* signed URL
* validate file type/size
* upload progress
* send message only after attachment upload success or safe queued state
* failed attachment not shown as sent
* no public CDN for private attachment
* report/block support
* no fake upload/send success

---

## 39. Invoice PDF Rules

Invoice PDFs are billing documents.

Rules:

* generated only after invoice issued
* user can access own invoice
* admin/billing staff can access with permission
* private/signed URL
* PDF provider setup-required if missing
* storage provider setup-required if missing
* no fake PDF link
* no public invoice URL
* no invoice PDF before verified payment/invoice
* regeneration audited
* email attachment/link only if email provider configured and safe

---

## 40. CMS And Blog Media Rules

CMS/blog media may include:

* public images
* featured images
* inline images
* downloadable public PDF if policy allows
* legal page attachments where public

Rules:

* admin/staff permission required
* images public if page/post published
* drafts private/unlisted until published
* rich text sanitized
* no private docs in CMS public media
* SEO metadata safe
* alt text required/recommended
* optimized variants
* no fake media

---

## 41. Ad Banner Media Rules

Ad banners must support:

* desktop banner
* tablet banner
* mobile banner

Rules:

* builder own ad only
* media validated
* device type required
* preview before submit
* admin review
* public only when ad approved/paid/active/not expired
* sponsored label not part of image only; UI must show it
* no misleading claims
* no fake RERA/verified badge
* no hidden contact leak if policy restricts phone in banners
* no fake upload
* no distortion

---

## 42. Media Metadata Rules

Every uploaded file must have metadata.

Metadata may include:

* ID
* owner profile ID
* uploaded by staff ID
* entity type
* entity ID
* media purpose
* bucket type
* storage provider
* storage key
* original file name safe
* generated file name
* extension
* MIME type
* file size
* width
* height
* duration
* format
* checksum/hash
* status
* visibility
* sort order
* is cover
* alt text
* caption
* processing status
* scan status
* created_at
* updated_at
* deleted_at

Metadata must not expose secrets.

---

## 43. Media Status Values

Media statuses:

| Status        | Meaning                          |
| ------------- | -------------------------------- |
| `uploading`   | upload in progress               |
| `uploaded`    | storage upload done              |
| `processing`  | variants/conversion/scan pending |
| `ready`       | usable                           |
| `failed`      | upload/processing failed         |
| `quarantined` | suspicious/pending review        |
| `rejected`    | rejected by validation/admin     |
| `deleted`     | soft deleted                     |
| `orphaned`    | no longer linked                 |
| `archived`    | retained but inactive            |

Public pages should use only `ready` and approved entity-linked media.

---

## 44. Processing Status Values

Processing statuses:

| Status           | Meaning                |
| ---------------- | ---------------------- |
| `not_required`   | no processing needed   |
| `pending`        | queued                 |
| `processing`     | in progress            |
| `completed`      | done                   |
| `failed`         | failed                 |
| `setup_required` | processor missing      |
| `skipped`        | skipped by rule        |
| `quarantined`    | processing found issue |

---

## 45. Scan Status Values

Scan statuses:

| Status           | Meaning                     |
| ---------------- | --------------------------- |
| `not_configured` | scan provider missing       |
| `not_required`   | scan not required by policy |
| `pending`        | scan queued                 |
| `clean`          | passed                      |
| `suspicious`     | needs review                |
| `infected`       | blocked                     |
| `failed`         | scan failed                 |
| `quarantined`    | file quarantined            |

For sensitive/unknown files, missing scanner may block production PASS depending feature.

---

## 46. Media Database Tables

Suggested tables:

* `media_assets`
* `media_variants`
* `media_links`
* `media_processing_jobs`
* `media_scan_results`
* `media_access_logs`
* `media_moderation_events`
* `media_cleanup_jobs`
* `private_document_access_logs`
* `storage_provider_events`
* `signed_url_events`
* `upload_sessions`

Actual schema may vary, but behavior must exist.

---

## 47. Suggested Table Fields

## 47.1 `media_assets`

Fields:

* `id`
* `owner_profile_id`
* `uploaded_by_staff_id`
* `entity_type`
* `entity_id`
* `media_purpose`
* `bucket_type`
* `storage_provider`
* `storage_key`
* `public_url`
* `requires_signed_url`
* `original_file_name_safe`
* `generated_file_name`
* `extension`
* `mime_type`
* `file_size_bytes`
* `checksum_hash`
* `width`
* `height`
* `duration_seconds`
* `status`
* `processing_status`
* `scan_status`
* `visibility`
* `is_cover`
* `sort_order`
* `alt_text`
* `caption`
* `created_at`
* `updated_at`
* `deleted_at`

---

## 47.2 `media_variants`

Fields:

* `id`
* `media_asset_id`
* `variant_name`
* `format`
* `storage_key`
* `public_url`
* `requires_signed_url`
* `width`
* `height`
* `file_size_bytes`
* `created_at`

---

## 47.3 `media_links`

Fields:

* `id`
* `media_asset_id`
* `entity_type`
* `entity_id`
* `purpose`
* `sort_order`
* `is_cover`
* `created_at`
* `deleted_at`

---

## 47.4 `media_processing_jobs`

Fields:

* `id`
* `media_asset_id`
* `job_type`
* `status`
* `attempt_count`
* `last_error_safe`
* `queued_at`
* `started_at`
* `completed_at`
* `created_at`
* `updated_at`

---

## 47.5 `media_access_logs`

Fields:

* `id`
* `media_asset_id`
* `accessed_by_profile_id`
* `accessed_by_staff_id`
* `access_reason`
* `access_type`
* `ip_hash`
* `user_agent_hash`
* `created_at`

---

## 47.6 `upload_sessions`

Fields:

* `id`
* `profile_id`
* `staff_id`
* `entity_type`
* `entity_id`
* `purpose`
* `status`
* `expires_at`
* `created_at`
* `updated_at`

---

## 48. Storage Key Rules

Storage keys must be safe.

Rules:

* do not use raw user file name as final path
* do not include phone/email
* do not include private document type with sensitive info if avoidable
* use generated UUID/path
* include environment prefix if needed
* include entity type/purpose safely
* avoid guessable private paths
* never expose private storage key publicly
* keep extension safe/normalized

Example public path:

```txt id="public-storage-path-example"
public/properties/{property_id}/{media_id}/card.webp
```

Example private path:

```txt id="private-storage-path-example"
private/verification/{verification_request_id}/{media_id}/document.pdf
```

---

## 49. Signed URL Rules

Signed URLs are required for private media.

Rules:

* generated server-side only
* short expiry
* user permission checked before generation
* staff permission checked before generation
* access log created for sensitive docs
* signed URL not stored long-term in DB
* signed URL not logged
* no sharing permanent private URLs
* expired URL handled gracefully
* direct storage URL denied

Signed URL creation must be rate-limited for sensitive files.

---

## 50. CDN Rules

CDN is for public media only.

Rules:

* public images/videos/PDFs can use CDN if safe
* private documents must not use public CDN
* cache headers set safely
* purge/revalidate on update/delete
* variants cached
* stale deleted/paused media not public after revalidation
* fallback to storage if CDN degraded and safe
* no fake CDN active status

CDN provider missing:

* show setup-required or fallback direct storage if configured
* do not fake CDN optimization

---

## 51. Media Approval Workflow

Media approval follows parent entity approval.

Examples:

* property image public after property approved
* project brochure public after project approved
* ad banner public after ad approved/paid/active
* profile image public after profile public/approved where needed
* CMS media public after page/post published

Media may also need separate review if:

* ad banner
* verification doc
* RERA proof
* report evidence
* suspicious upload
* user-reported media
* unsafe content

Admin moderation events must be logged.

---

## 52. Media Replacement Rules

Replacing media may require reapproval.

Replacement rules:

* property public image change → property may need reapproval
* project image/video/brochure/floor plan change → project may need reapproval
* ad banner change → ad approval needed
* profile image change → may be immediate or review depending policy
* verification doc replacement → verification review resets/updates
* invoice PDF replacement → audit and legal care
* CMS image replacement → page/post publish/update flow

Old media:

* soft deleted or archived
* public cache purged
* references updated
* rollback possible where needed

---

## 53. Media Delete Rules

Delete rules:

* user can delete own draft media
* user can remove own listing/project media if allowed
* deletion of published media may trigger reapproval
* admin can remove unsafe media with permission
* private docs usually retained according to retention policy
* invoice PDFs retained according to legal/accounting policy
* media soft delete before hard delete
* hard delete after retention/legal approval
* orphan cleanup background job
* CDN purge for public media

No accidental permanent deletion without policy.

---

## 54. Orphan Media Cleanup

Orphan media means uploaded but not linked/used.

Cleanup rules:

* detect temp uploads expired
* detect draft abandoned
* detect removed media
* detect failed processing
* detect deleted entity media after retention
* clean public storage and variants
* clean private storage according to retention
* audit sensitive cleanup
* avoid deleting active linked media
* dry-run/admin report for production cleanup

Cron/background job setup-required until configured.

---

## 55. Storage Lifecycle Rules

Lifecycle may include:

* temp uploads expire after configured time
* deleted public media hard delete after retention
* private docs retained per legal/privacy rules
* invoice PDFs retained per accounting rules
* support/report evidence retained per policy
* orphan variants cleaned
* original backups retained/deleted per policy
* CDN purge on hard delete
* audit deletion

Lifecycle must align with privacy/legal docs.

---

## 56. Upload Rate Limits

Rate limits required for:

* property image upload
* project image upload
* project video upload
* brochure upload
* floor plan upload
* profile image upload
* ad banner upload
* verification document upload
* message attachment upload
* support/report attachment upload
* invoice PDF generation/download
* signed URL generation
* media processing retry
* public ad event media requests where relevant

Rate limit failure must be safe.

---

## 57. Plan / Subscription Media Limits

Plan may limit:

* number of images
* total storage
* video allowed
* brochure allowed
* floor plan count
* ad campaigns
* banner uploads
* profile media options
* message attachment size
* private document upload count if relevant
* invoice PDF access not normally limited

Rules:

* limits server-side
* dashboard shows usage
* upgrade prompt if exceeded
* no fake limit/unlimited if not supported
* plan changes may affect future uploads

---

## 58. Role-Based Media Permissions

## 58.1 Guest

Guest can:

* view public approved media
* view public CMS/blog media
* view public ads

Guest cannot:

* upload media
* view private docs
* view signed URLs
* view dashboard media
* view draft/pending media
* view hidden contact through media
* upload report evidence unless guest reports allowed with abuse protection

---

## 58.2 Owner

Owner can:

* upload property images for own property
* upload own profile image
* upload requirement attachment only if feature allows
* view own draft/pending/rejected media
* delete/replace own allowed media

Owner cannot:

* upload project media
* upload builder ad banners
* access other users’ private media
* access verification docs of others

---

## 58.3 Broker

Broker can:

* upload property images for own property
* upload property brochure if plan/rule allows
* upload own profile/agency image
* upload message/support attachments where allowed
* view own draft/pending/rejected media

Broker cannot:

* upload project media
* access builder project docs
* access other user private media

---

## 58.4 Builder

Builder can:

* upload project images for own project
* upload one project video
* upload project brochure
* upload floor plans
* upload project progress media
* upload company logo/profile image
* upload ad banners
* upload RERA/project proof private docs
* upload message/support attachments where allowed

Builder cannot:

* upload property media as normal property poster
* access other builder private media
* upload PG/hostel/room as project media context
* fake project/RERA proof

---

## 58.5 Staff/Admin

Staff/admin can access media only based on permission.

Permissions:

* view public media
* view private documents
* moderate media
* delete/block media
* export media metadata
* access invoice PDFs
* access support/report attachments
* access verification/RERA docs
* provider/storage admin

Private document access must be logged.

---

## 59. RLS Rules For Media

RLS must enforce:

* public can read approved public media only
* owner can read/write own draft media
* broker can read/write own draft media
* builder can read/write own project/ad media
* wrong owner denied
* wrong builder denied
* private docs denied publicly
* verification docs owner/staff permission only
* RERA docs builder/staff permission only
* message attachments participants only
* support attachments ticket participant/support staff only
* invoice PDFs user/billing staff only
* ad media public only when ad public eligible
* CMS draft media admin/staff only
* provider/storage metadata admin only where sensitive

---

## 60. Public-Safe Media Views

Public media views must include only:

* approved/ready public media
* public URL/variant URL
* alt text/caption
* dimensions
* sort order
* cover flag
* entity ID/slug if safe

Public media views must exclude:

* storage key if private
* private bucket paths
* signed URL
* uploader private data
* scan internal status if sensitive
* private document metadata
* hidden contact
* draft/pending/rejected media
* deleted media
* internal moderation notes

---

## 61. Direct URL Bypass Tests

Test unauthorized access for:

* draft property image
* pending project image
* rejected ad banner
* private verification document
* RERA proof
* message attachment
* support attachment
* report evidence
* invoice PDF
* another user profile upload
* another builder project media
* another builder ad media
* private signed URL after expiry
* raw storage URL
* deleted media URL
* paused listing media cache

Unauthorized must fail.

---

## 62. Media API / Server Action Rules

Media actions must be server-protected.

Actions:

* create upload session
* upload file
* complete upload
* generate signed URL
* reorder media
* set cover
* update caption/alt
* delete media
* replace media
* retry processing
* approve/reject media
* link media to entity
* generate invoice PDF
* purge CDN
* cleanup orphan media

Each action must check:

* auth
* role
* ownership
* permission
* entity status
* provider status
* plan limit
* file validation
* rate limit
* RLS/DB insert/update result

No client-only media authorization.

---

## 63. Media Error Handling

Use safe errors:

* `UPLOAD_PROVIDER_SETUP_REQUIRED`
* `UPLOAD_PROVIDER_UNAVAILABLE`
* `FILE_TOO_LARGE`
* `FILE_TYPE_NOT_ALLOWED`
* `FILE_VALIDATION_FAILED`
* `MEDIA_LIMIT_REACHED`
* `PLAN_UPGRADE_REQUIRED`
* `VIDEO_LIMIT_REACHED`
* `PDF_REQUIRED`
* `IMAGE_REQUIRED`
* `PRIVATE_ACCESS_DENIED`
* `SIGNED_URL_EXPIRED`
* `PROCESSING_FAILED`
* `SCAN_FAILED`
* `MALWARE_BLOCKED`
* `MEDIA_NOT_FOUND`
* `ENTITY_NOT_FOUND`
* `FORBIDDEN`
* `RATE_LIMITED`
* `SERVER_ERROR`

Do not expose raw storage/provider errors.

---

## 64. Logging Rules

Do not log:

* signed URLs
* private storage keys
* raw private document URL
* hidden contact
* OTP
* provider secrets
* R2 secret key
* service role key
* private file contents
* invoice private URL
* user private document metadata beyond safe internal logs
* raw malware scan payload
* raw error with secrets

Safe logs:

* media ID
* entity type
* entity ID
* status
* safe error code
* file type
* file size
* provider name
* attempt count
* timestamp

---

## 65. Performance Rules

Media performance requirements:

* optimized cover images
* responsive variants
* lazy-load galleries
* lazy-load videos
* lazy-load PDFs
* no huge images in card lists
* CDN public media
* cache public media safely
* signed URL only on demand
* dashboard media paginated
* admin media preview lazy
* no N+1 media queries
* variants precomputed or on-demand with caching
* video not loaded in initial page
* PDF preview/download on demand
* thumbnails for admin lists

Core Web Vitals must not be harmed by heavy media.

---

## 66. SEO Rules For Media

Public media SEO:

* descriptive alt text
* safe captions
* image dimensions
* optimized images
* public media only
* no private metadata
* no hidden contact
* no fake schema
* no unapproved images
* canonical page owns media SEO

Private media:

* noindex
* not in sitemap
* not in public schema
* not public URL
* not cached publicly

---

## 67. Accessibility Rules For Media

Media UI must support:

* alt text for public images
* captions where helpful
* keyboard gallery navigation
* focus trap in modal
* close button
* screen reader labels
* video controls
* PDF download label
* progress status
* error messages
* non-color-only status indicators
* large tap targets

Ad images should include accessible label/title through surrounding UI.

---

## 68. Admin Media Moderation

Admin/staff media moderation must support:

* media preview
* uploader info
* entity link
* status
* file type
* size/dimensions
* scan status
* public/private classification
* approve/reject
* request changes
* block/quarantine
* replace/remove where permitted
* internal notes
* audit log
* access log for private docs
* report/fraud link

Staff permission required.

Private doc permission required for sensitive files.

---

## 69. Media Security Bugs

Create critical bug if:

* private document public
* hidden contact leaked in media API
* signed URL accessible without auth
* raw storage URL public for private file
* wrong user downloads invoice
* wrong user views message attachment
* public reads verification/RERA proof
* service role exposed
* R2 secret exposed
* unsafe SVG accepted and served
* executable file uploaded
* fake upload success
* project accepts more than one video
* unapproved media appears public
* deleted media still public after purge window
* client-only media permission
* storage provider missing but upload shown success

---

## 70. Provider Setup-Required Rules

Provider dependencies:

| Provider        | Used For                  | Missing Behavior                                    |
| --------------- | ------------------------- | --------------------------------------------------- |
| Cloudflare R2   | media storage             | uploads setup-required/disabled                     |
| Cloudflare CDN  | public media delivery     | fallback or setup-required                          |
| Image processor | WebP/AVIF/variants        | processing setup-required/fallback original if safe |
| Video processor | thumbnails/conversion     | setup-required/fallback raw if safe/allowed         |
| PDF generator   | invoice PDF               | invoice PDF setup-required                          |
| Malware scanner | file safety               | scan setup-required/quarantine/block depending file |
| Cron/jobs       | cleanup/processing        | cleanup setup-required/manual                       |
| Error tracking  | upload failure monitoring | setup-required                                      |
| Analytics       | media/ad events           | setup-required/DB fallback                          |

No fake provider success.

---

## 71. Cloudflare R2 Environment Expectations

Environment variables may include:

```txt id="r2-env-example"
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_PUBLIC_BUCKET_NAME=
R2_PRIVATE_BUCKET_NAME=
R2_PUBLIC_BASE_URL=
R2_ENDPOINT=
```

Rules:

* secrets server-only
* never expose access key/secret
* `.env.example` updated
* provider status documented
* bucket access tested
* public/private bucket policies verified
* production secrets not committed

---

## 72. CDN Environment Expectations

Environment variables may include:

```txt id="cdn-env-example"
CDN_PUBLIC_BASE_URL=
CLOUDFLARE_ZONE_ID=
CLOUDFLARE_API_TOKEN=
```

Rules:

* CDN token server-only
* purge actions permission-gated
* no private files through CDN
* CDN base URL public-safe only
* setup-required until configured/tested

---

## 73. Media Manual Verification Checklist

Manual verification must check:

### Storage Provider

* provider missing shows setup-required
* R2 env documented
* public upload works if configured
* private upload works if configured
* failed provider shows safe error
* no fake upload success

### Property Images

* owner uploads own property image
* broker uploads own property image
* builder denied property image upload
* guest denied
* cover image set
* reorder works
* remove works
* pending property image not public
* approved property image public
* hidden contact not in public payload

### Project Media

* builder uploads own project images
* owner/broker denied project media
* project one video max enforced
* brochure PDF validated
* floor plan upload validated
* 360 URL validated/setup-required
* pending project media not public
* approved project media public
* video lazy-loads
* PDF lazy/download works

### Profile Media

* user uploads avatar
* crop/remove/change works
* broker logo works
* builder logo works
* storage missing setup-required
* no distortion

### Ad Banners

* desktop banner upload
* tablet banner upload
* mobile banner upload
* invalid file rejected
* unapproved ad banner not public
* approved/paid/active ad banner public
* no distortion
* sponsored label outside/with UI

### Private Documents

* verification doc private
* RERA proof private
* support attachment private
* report evidence private
* message attachment participant-only
* invoice PDF own only
* wrong user denied
* staff permission required
* access logged

### File Security

* bad MIME rejected
* executable rejected
* unsafe SVG rejected/sanitized
* oversized file rejected
* invalid PDF rejected
* signed URL expires
* private storage key not exposed
* EXIF/GPS stripped or tracked as setup-required

### Admin

* media moderation works
* private doc permission works
* access logs visible to permitted admin
* quarantine/reject works
* audit logs created

### Responsive

* upload UI mobile
* gallery mobile
* crop modal mobile
* video viewer mobile
* PDF viewer/download mobile
* admin media preview mobile

Widths:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1366px

---

## 74. Feature Registry Items Required

`FEATURE_REGISTRY.md` must track:

* media storage provider
* public bucket
* private bucket
* signed URLs
* media metadata
* media variants
* image optimization
* EXIF stripping
* SVG safety
* HEIC/HEIF support
* malware scan
* property image upload
* property cover/reorder
* property brochure
* project image upload
* project video one max
* project brochure PDF
* project floor plans
* project progress media
* 360/virtual tour URL
* profile image upload/crop/remove
* broker logo
* builder logo
* ad banner upload desktop/tablet/mobile
* verification document upload
* RERA proof upload
* support attachment upload
* report evidence upload
* message attachment upload
* invoice PDF generation/storage
* CMS/blog media
* media approval/moderation
* private document access logs
* orphan cleanup
* CDN integration
* CDN purge
* media RLS policies
* media manual verification

Each item must have real status.

---

## 75. Common Bugs To Track

Create bug if:

* storage missing but upload says success
* upload succeeds in UI but no DB metadata
* DB metadata exists but storage file missing
* public bucket stores private docs
* private docs have public URL
* signed URL generated without permission
* signed URL logged
* wrong user accesses invoice PDF
* wrong user accesses message attachment
* staff without private-doc permission sees docs
* project allows two videos
* owner/broker uploads project media
* builder uploads property media
* pending media public
* rejected media public
* deleted media still public
* CDN serves private media
* unsafe SVG accepted
* EXIF GPS visible
* hidden contact embedded/leaked
* PDF validation missing
* video huge and blocks page
* gallery loads original huge images in cards
* media admin table unpaginated
* upload form overflows mobile
* crop modal unusable mobile
* no rate limit on upload
* no plan limit server-side
* no audit for private doc access

---

## 76. Current Media/Storage Status

As of this documentation generation stage:

| Area                             | Status           |
| -------------------------------- | ---------------- |
| Cloudflare R2                    | `SETUP_REQUIRED` |
| Cloudflare CDN                   | `SETUP_REQUIRED` |
| Public bucket                    | `NOT_STARTED`    |
| Private bucket                   | `NOT_STARTED`    |
| Signed URLs                      | `NOT_STARTED`    |
| Media metadata tables            | `NOT_STARTED`    |
| Image upload                     | `NOT_STARTED`    |
| Image optimization               | `SETUP_REQUIRED` |
| WebP/AVIF variants               | `SETUP_REQUIRED` |
| EXIF stripping                   | `SETUP_REQUIRED` |
| SVG safety                       | `NOT_STARTED`    |
| HEIC/HEIF handling               | `SETUP_REQUIRED` |
| Malware scanning                 | `SETUP_REQUIRED` |
| Property images                  | `NOT_STARTED`    |
| Property brochure                | `NOT_STARTED`    |
| Project images                   | `NOT_STARTED`    |
| Project video one max            | `NOT_STARTED`    |
| Project brochure PDF             | `NOT_STARTED`    |
| Project floor plans              | `NOT_STARTED`    |
| Project progress media           | `NOT_STARTED`    |
| 360/virtual tour                 | `NOT_STARTED`    |
| Profile image crop/remove/change | `NOT_STARTED`    |
| Broker logo                      | `NOT_STARTED`    |
| Builder logo                     | `NOT_STARTED`    |
| Ad banners                       | `NOT_STARTED`    |
| Verification documents           | `NOT_STARTED`    |
| RERA proof                       | `NOT_STARTED`    |
| Support attachments              | `NOT_STARTED`    |
| Report evidence                  | `NOT_STARTED`    |
| Message attachments              | `NOT_STARTED`    |
| Invoice PDF                      | `SETUP_REQUIRED` |
| CMS/blog media                   | `NOT_STARTED`    |
| Media moderation                 | `NOT_STARTED`    |
| Private document access logs     | `NOT_STARTED`    |
| Orphan cleanup                   | `SETUP_REQUIRED` |
| CDN purge                        | `SETUP_REQUIRED` |
| Media RLS                        | `NOT_STARTED`    |
| Manual verification              | `NOT_STARTED`    |

---

## 77. Documentation Generation Progress

| File No. | File                                                      | Status  |
| -------: | --------------------------------------------------------- | ------- |
|        1 | `CLAUDE.md`                                               | Created |
|        2 | `brain.md`                                                | Created |
|        3 | `FEATURE_REGISTRY.md`                                     | Created |
|        4 | `CHANGELOG.md`                                            | Created |
|        5 | `BUGS_AND_FIXES.md`                                       | Created |
|        6 | `MANUAL_VERIFICATION.md`                                  | Created |
|        7 | `API_PROVIDER_STATUS.md`                                  | Created |
|        8 | `DEPLOYMENT_ROLLBACK.md`                                  | Created |
|        9 | `SECURITY_RLS_CHECKLIST.md`                               | Created |
|       10 | `PERFORMANCE_CHECKLIST.md`                                | Created |
|       11 | `docs/01_PROJECT_MASTER_AND_SCOPE.md`                     | Created |
|       12 | `docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md`        | Created |
|       13 | `docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md`         | Created |
|       14 | `docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md`        | Created |
|       15 | `docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md`          | Created |
|       16 | `docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md`     | Created |
|       17 | `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`     | Created |
|       18 | `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`              | Created |
|       19 | `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`       | Created |
|       20 | `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`    | Created |
|       21 | `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`           | Pending |
|       22 | `docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md`         | Created |
|       23 | `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`         | Pending |
|       24 | `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`         | Pending |
|       25 | `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`           | Pending |
|       26 | `docs/16_ADVANCED_FEATURES_PWA_LOCALIZATION_ANALYTICS.md` | Pending |

---

## 78. Related Documents

This file must stay aligned with:

* `CLAUDE.md`
* `brain.md`
* `FEATURE_REGISTRY.md`
* `CHANGELOG.md`
* `BUGS_AND_FIXES.md`
* `MANUAL_VERIFICATION.md`
* `API_PROVIDER_STATUS.md`
* `DEPLOYMENT_ROLLBACK.md`
* `SECURITY_RLS_CHECKLIST.md`
* `PERFORMANCE_CHECKLIST.md`
* `docs/01_PROJECT_MASTER_AND_SCOPE.md`
* `docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md`
* `docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md`
* `docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md`
* `docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md`
* `docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md`
* `docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md`
* `docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md`
* `docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md`
* `docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md`
* `docs/11_LOCATION_SEARCH_SEO_CMS_BLOG_LEGAL.md`
* `docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md`
* `docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md`
* `docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md`
* implementation prompts
* manual verification prompts
* SQL migrations
* RLS policies

---

## 79. Final Media Rule

Media must be real, safe, optimized and privacy-protected.

Public media must be public-safe.

Private documents must remain private.

Verification and RERA proof must never be public.

Invoice PDFs must be user-scoped.

Message/support/report attachments must be permission-scoped.

Project video is one max.

Upload success must mean real storage and DB metadata success.

Provider missing means setup-required.

Signed URLs must be generated server-side after permission checks.

CDN must never expose private files.

No fake upload.

No fake PDF.

No fake video processing.

No hidden contact leak.

No private document leak.

No fake PASS.
