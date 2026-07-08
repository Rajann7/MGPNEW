# prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md

# My Gujarat Property — Prompt 10 Manual Verification: Media Storage, Uploads, R2 And CDN

> **DESIGN-MATCH CHECK (mandatory):** Verify built screens match `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 5 & 11** and all `docs/12` "Design Add-Ons". Confirm: cover-select + drag-reorder + crop + % upload, brochures stored as PDF (never image), per-viewer watermarked non-downloadable private docs, 10 MB limit shown, 360°/video Setup-Required fallback.

This prompt is for Claude Code.

Use this prompt immediately after completing:

```txt id="matching-implementation-prompt"
prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md
```

This prompt verifies the **Media Storage, Uploads, R2 And CDN** phase.

Do not skip this verification.

Do not start Prompt 11 until this verification is complete or the project owner/Super Admin explicitly accepts a documented `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED` state.

Do not mark PASS without real media provider, upload, file validation, RLS, signed URL, public/private access, secret masking, responsive and docs checks.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md
Prompt Number: 10 Verification
Phase: Media Storage, Uploads, R2 And CDN
Type: Manual Verification Prompt
Matching Implementation Prompt: prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md
Previous Prompt: prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md
Next Implementation Prompt: prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md
```

---

## 2. Verification Purpose

The purpose of this verification phase is to confirm that the media system is real, secure, role-aware, privacy-safe, provider-aware and performance-safe.

This verification checks:

* Cloudflare R2 provider foundation
* CDN/public URL foundation
* public/private bucket strategy
* storage credentials safety
* upload sessions
* signed upload URLs
* signed download URLs
* server-side validation
* property image uploads
* project image uploads
* project video upload foundation
* project brochure PDF upload
* project floor plan upload
* property brochure role rules
* profile/avatar/logo upload
* message attachment placeholder/foundation
* verification/admin document placeholder/foundation
* media metadata tables
* media variants
* entity media links
* processing job foundation
* media audit logs
* cover image
* reorder
* delete/soft delete
* restore foundation
* orphan cleanup foundation
* CDN purge/cache foundation
* image conversion status
* WebP/AVIF status
* HEIC/HEIF handling
* EXIF stripping
* SVG safety
* PDF validation
* video validation
* malware scan placeholder/foundation
* public search/detail media integration
* dashboard media manager integration
* admin media status integration
* RLS policies
* public/private media access separation
* wrong-user media denial
* hidden contact metadata protection
* provider secret masking
* no service role client exposure
* no fake upload success
* no fake CDN
* no fake conversion
* no fake malware scan
* responsive upload/gallery UI
* docs updates
* Prompt 11 readiness

This phase does not verify final production media load testing, final CDN tuning, full video transcoding, full malware scanning provider, full Cloudflare Images, full AI moderation, full ad banner workflow, or final legal/content moderation signoff. Those are later or external operational checks.

---

## 3. Required Docs To Read First

Before verification, read:

```txt id="required-docs"
CLAUDE.md
brain.md
FEATURE_REGISTRY.md
CHANGELOG.md
BUGS_AND_FIXES.md
MANUAL_VERIFICATION.md
API_PROVIDER_STATUS.md
DEPLOYMENT_ROLLBACK.md
SECURITY_RLS_CHECKLIST.md
PERFORMANCE_CHECKLIST.md
prompts/00_PROMPT_USAGE_RULES.md
prompts/01_PROJECT_SETUP_BASELINE.md
prompts/01_MANUAL_VERIFICATION_PROJECT_SETUP_BASELINE.md
prompts/02_AUTH_ROLES_RLS_FOUNDATION.md
prompts/02_MANUAL_VERIFICATION_AUTH_ROLES_RLS_FOUNDATION.md
prompts/03_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
prompts/03_MANUAL_VERIFICATION_PUBLIC_UI_HOME_HEADER_FOOTER_HERO.md
prompts/04_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
prompts/04_MANUAL_VERIFICATION_PROPERTY_PROJECT_REQUIREMENT_SYSTEM.md
prompts/05_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
prompts/05_MANUAL_VERIFICATION_PUBLIC_SEARCH_DETAIL_PROFILE_SEO.md
prompts/06_OWNER_BROKER_BUILDER_DASHBOARDS.md
prompts/06_MANUAL_VERIFICATION_OWNER_BROKER_BUILDER_DASHBOARDS.md
prompts/07_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
prompts/07_MANUAL_VERIFICATION_ADMIN_STAFF_SUPER_ADMIN_SYSTEM.md
prompts/08_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
prompts/08_MANUAL_VERIFICATION_LEADS_CRM_REQUIREMENTS_PROPOSALS_MESSAGES.md
prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md
prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md
docs/01_PROJECT_MASTER_AND_SCOPE.md
docs/02_CLAUDE_WORKFLOW_AND_TOKEN_LIGHT_RULES.md
docs/03_ARCHITECTURE_TECH_STACK_DATABASE_RLS.md
docs/04_AUTH_LOGIN_REGISTER_ROLES_PERMISSIONS.md
docs/05_PUBLIC_ROLES_HOME_PROFILE_DASHBOARD.md
docs/06_PROPERTY_PROJECT_REQUIREMENT_FULL_MATRIX.md
docs/07_LEADS_CRM_PROPOSALS_SITE_VISITS_MESSAGES.md
docs/08_ADMIN_SUPER_ADMIN_STAFF_MODULES.md
docs/09_BILLING_SUBSCRIPTION_PAYMENT_GST_TRIAL.md
docs/10_ADS_PROMOTION_NOTIFICATION_PROVIDER_MODES.md
docs/12_MEDIA_UPLOAD_STORAGE_IMAGE_VIDEO_PDF.md
docs/13_UI_UX_DESIGN_SYSTEM_RESPONSIVE_RULES.md
docs/14_SECURITY_PRIVACY_CONSENT_FRAUD_LEGAL.md
docs/15_PERFORMANCE_DEPLOYMENT_ROLLBACK_QA.md
```

Also inspect all changed implementation files from Prompt 10.

Do not paste full docs into final response.

---

## 4. Verification Scope

This verification covers:

* upload provider setup
* R2/CDN configuration
* server-side storage client
* upload sessions
* signed URL generation
* upload completion verification
* media tables
* media RLS
* entity media ownership
* role-based media actions
* public/private file separation
* file validation
* processing status honesty
* public delivery integration
* dashboard upload manager
* admin media foundation
* cleanup/orphan foundation
* provider setup-required states
* docs/checklist updates

This verification does not cover:

* final production CDN tuning
* final high-volume media load test
* full video transcoding provider
* full malware scanning provider
* full PDF preview rendering if not implemented
* full Cloudflare Images pipeline
* full AI image moderation
* full ad banner lifecycle
* full CMS/blog media lifecycle
* final content/legal moderation workflow
* final production media incident runbook

---

## 5. Verification Method

Use this process:

1. read required docs
2. inspect Prompt 10 changed files
3. inspect media migration
4. inspect storage provider configuration
5. inspect upload API/server actions
6. inspect signed URL generation
7. inspect media metadata model
8. inspect RLS policies
9. inspect role/entity ownership checks
10. inspect file validation
11. inspect public/private bucket separation
12. inspect property media flow
13. inspect project media flow
14. inspect profile media flow
15. inspect PDF/video handling
16. inspect processing/conversion status
17. inspect public search/detail integration
18. inspect dashboard media managers
19. inspect admin media placeholders
20. inspect cleanup/orphan foundation
21. inspect CDN/cache/purge foundation
22. search for provider secret leaks
23. search for service role client exposure
24. search for fake upload/CDN/conversion/scan data
25. search for hidden contact in media metadata
26. run available automated checks
27. run manual smoke checks where possible
28. test responsive widths
29. update required docs
30. create bugs for failures
31. decide final verification result
32. update `brain.md`
33. prepare Prompt 11 readiness note

Do not skip docs updates.

---

## 6. Required File Inspection

Inspect likely changed files:

```txt id="file-inspection"
src/app/api/uploads/
app/api/uploads/
src/app/api/media/
app/api/media/
src/app/dashboard/owner/properties/
app/dashboard/owner/properties/
src/app/dashboard/broker/properties/
app/dashboard/broker/properties/
src/app/dashboard/builder/projects/
app/dashboard/builder/projects/
src/app/dashboard/profile/
app/dashboard/profile/
src/app/admin/media/
app/admin/media/
src/components/media/
components/media/
src/components/upload/
components/upload/
src/components/gallery/
components/gallery/
src/components/property/PropertyGallery.*
components/property/PropertyGallery.*
src/components/project/ProjectGallery.*
components/project/ProjectGallery.*
src/components/profile/ProfileImageUploader.*
components/profile/ProfileImageUploader.*
src/lib/media/
lib/media/
src/lib/uploads/
lib/uploads/
src/lib/storage/
lib/storage/
src/lib/r2/
lib/r2/
src/lib/cloudflare/
lib/cloudflare/
src/lib/actions/media.*
lib/actions/media.*
src/lib/actions/uploads.*
lib/actions/uploads.*
src/lib/validators/media.*
lib/validators/media.*
src/lib/validators/upload.*
lib/validators/upload.*
src/lib/permissions/
lib/permissions/
src/lib/supabase/
lib/supabase/
src/types/media.*
types/media.*
src/types/uploads.*
types/uploads.*
supabase/migrations/
```

Also inspect docs:

```txt id="docs-to-check"
FEATURE_REGISTRY.md
CHANGELOG.md
BUGS_AND_FIXES.md
MANUAL_VERIFICATION.md
API_PROVIDER_STATUS.md
DEPLOYMENT_ROLLBACK.md
SECURITY_RLS_CHECKLIST.md
PERFORMANCE_CHECKLIST.md
brain.md
```

Record exact changed files.

---

## 7. Migration Verification

If Prompt 10 changed database schema, verify migration exists.

Expected pattern:

```txt id="expected-migration"
supabase/migrations/*_media_storage_uploads_r2_cdn.sql
```

Verify migration includes:

* purpose
* phase: Prompt 10
* tables created/changed
* views created/changed
* RLS policies created/changed
* indexes created
* functions/triggers if any
* unique cover constraints if any
* upload cleanup status fields
* media visibility/status fields
* destructive changes yes/no
* backup required yes/no
* rollback notes

If DB changed without migration:

* create critical bug
* mark verification `FAIL`
* do not start Prompt 11

If migration exists without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL` depending data/media risk

If DB not changed because Supabase/env unavailable:

* mark DB/RLS runtime checks `SETUP_REQUIRED`
* do not claim RLS PASS

---

## 8. Expected Table Verification

If schema exists, check for implemented or reused tables.

Possible tables:

```txt id="expected-media-tables"
upload_sessions
media_assets
media_variants
entity_media_links
media_processing_jobs
media_audit_logs
media_moderation_events
media_cleanup_jobs
```

Minimum safe foundation should include:

* upload session tracking or safe alternative
* media asset metadata
* entity media linking
* visibility/status fields
* owner/profile/entity reference
* deleted/soft-delete fields
* RLS enabled
* indexes for owner/entity/status queries
* cleanup/orphan tracking if upload flow creates temporary objects

If implementation claims media complete but no metadata/RLS model exists:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 9. Provider Configuration Verification

Verify media provider configuration.

Expected possible env vars:

```txt id="r2-env"
R2_ACCOUNT_ID
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
R2_BUCKET_PUBLIC
R2_BUCKET_PRIVATE
R2_ENDPOINT
R2_PUBLIC_CDN_URL
R2_REGION
R2_SIGNED_URL_TTL_SECONDS
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ZONE_ID
CLOUDFLARE_CACHE_PURGE_ENABLED
```

Check:

* R2 secrets server-only
* Cloudflare API token server-only
* public CDN URL safe to expose
* missing provider shows `R2_SETUP_REQUIRED`
* upload UI disabled or setup-required when provider missing
* API provider status updated
* no fake provider active
* no fake CDN active

If R2 secret appears in client bundle/UI:

* create critical bug
* mark `FAIL`

---

## 10. Provider Choice Verification

If implementation uses Cloudflare R2:

* verify R2 client is server-side
* verify signed URL flow or server upload flow
* verify bucket/key strategy
* verify CDN URL helper
* verify provider setup states

If implementation uses Supabase Storage temporarily:

* verify docs clearly say R2 is `SETUP_REQUIRED` or `DEFERRED`
* verify same private/public media rules apply
* verify no claim of R2 active
* verify provider status honest

If implementation claims R2 active without code/config/test evidence:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 11. Public / Private Bucket Strategy Verification

Verify bucket strategy.

Public bucket should contain only:

* approved public images
* public optimized variants
* public thumbnails
* public profile logos/avatars if public-safe

Private bucket should contain:

* originals
* draft media
* pending media
* rejected media
* brochures before approval
* floor plans before approval
* videos before approval
* verification documents
* admin documents
* message attachments
* private profile images before publish

Check:

* originals private
* private docs never public
* message attachments private
* draft/pending media private
* public variants only when entity/media ready
* public CDN does not expose private bucket files
* no bucket policy makes everything public

If private bucket/object is publicly reachable:

* create critical bug
* mark `FAIL`

---

## 12. Object Key Verification

Verify object keys are safe.

Rules:

* no phone/email/WhatsApp in object key
* no raw filename without sanitization
* no exact private address in path
* no personal document number in path
* UUID/media ID used
* environment namespace used if possible
* extension normalized
* private docs paths not predictable with PII
* no hidden contact in CDN URL

If object key includes hidden contact/phone/email:

* create bug
* mark `FAIL`

---

## 13. Upload Session Verification

Verify upload session flow.

Upload statuses:

```txt id="upload-statuses"
created
signed_url_issued
uploading
uploaded
validating
processing
ready_private
ready_public
failed
cancelled
expired
deleted
```

Check:

* session created server-side
* auth required
* role/entity ownership checked before URL issued
* media category allowlisted
* session expires
* upload completion verified server-side
* wrong user cannot complete another session
* failed/expired session safe
* no fake uploaded status
* cleanup status tracked for expired sessions

If upload session can be created without auth for private media:

* create critical bug
* mark `FAIL`

---

## 14. Signed Upload URL Verification

If signed upload URL implemented, verify:

* generated server-side only
* provider secret not exposed
* short TTL
* auth/role/entity ownership checked
* expected MIME/type enforced where possible
* object key generated server-side
* file size constraints enforced or verified after upload
* upload completion requires server verification
* wrong user denied
* expired URL handled safely
* duplicate completion safe

If signed URL generation returns secret credentials:

* create critical bug
* mark `FAIL`

---

## 15. Signed Download URL Verification

Verify signed download URL for private media:

* generated server-side only
* auth required
* ownership/participant/admin permission checked
* short TTL
* deleted/expired media denied
* private bucket only accessed via signed URL
* sensitive doc access audited if implemented
* not cached publicly
* wrong user denied
* no provider secrets in URL response beyond signed URL itself

If wrong user can get signed URL:

* create critical bug
* mark `FAIL`

---

## 16. Upload Completion Verification

Verify upload completion:

* checks session ownership
* verifies object exists in storage
* verifies object size/type where possible
* creates media asset record only after real upload
* starts validation/processing honestly
* links media to correct entity only after permission check
* returns safe status
* no fake success if object missing
* no public visibility until ready/public allowed
* handles provider failure safely

If complete upload returns success without real object verification:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 17. Server Upload Endpoint Verification

If using server upload endpoint instead of signed URL:

* auth required
* role/entity ownership checked
* body size limited
* file streamed or memory-safe
* MIME/magic validation
* object key server-generated
* provider secret server-only
* no public write access
* safe error handling
* no fake upload success

If unrestricted upload endpoint exists:

* create critical bug
* mark `FAIL`

---

## 18. File Type Validation Verification

Verify file validation is not extension-only.

Allowed image formats:

```txt id="image-formats"
JPG
JPEG
PNG
WebP
AVIF
GIF
HEIC
HEIF
SVG only if sanitized or rasterized safely
```

Allowed PDF:

```txt id="pdf-formats"
PDF
```

Allowed video:

```txt id="video-formats"
MP4
WebM
MOV
M4V
```

Check:

* MIME validation
* magic byte/signature validation where possible
* extension normalization
* file size validation
* disallowed executable/script files rejected
* dangerous polyglot files rejected where detectable
* clear error for unsupported types

If validation is extension-only:

* create bug
* mark `PARTIAL` or `FAIL` depending exposure

---

## 19. File Size / Dimension Verification

Verify:

* server-side size limits exist/configurable
* UI displays relevant limits
* image dimensions checked where possible
* video duration checked where possible
* PDF page count checked where possible
* huge files cannot crash app
* plan limits override if active
* no fake unlimited upload if not supported

If no server-side size limit exists:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 20. Media Category Verification

Verify media category allowlist:

```txt id="media-categories"
property_image
project_image
project_video
project_brochure_pdf
project_floor_plan
property_brochure_pdf
profile_avatar
profile_logo
builder_logo
broker_logo
message_attachment
verification_document
admin_document
ads_banner_later
cms_image_later
blog_image_later
```

Check:

* category determines allowed MIME/type
* category determines public/private visibility
* category determines role permission
* category determines entity ownership check
* category determines plan/media limit check
* invalid category denied
* no arbitrary category creating public file

If arbitrary category can be passed to make private docs public:

* create critical bug
* mark `FAIL`

---

## 21. Property Media Verification

Verify property media rules:

* Owner can upload images for own property.
* Broker can upload images for own property.
* Builder cannot upload property media.
* Owner/Broker cannot upload to another user's property.
* Property cover image can be set server-side.
* Reorder works server-side.
* Delete/soft delete works.
* Draft/pending property media private.
* Approved/published property media public-safe variants only.
* Hidden contact not in metadata/object key/alt/caption.
* Property brochure PDF allowed only for permitted role/product rule.
* Owner property brochure disabled/setup-required unless product explicitly allows.

If builder can upload property media:

* create critical bug
* mark `FAIL`

If wrong owner can upload/delete/reorder property media:

* create critical bug
* mark `FAIL`

---

## 22. Project Media Verification

Verify project media rules:

* Builder can upload images for own project.
* Owner/Broker cannot upload project media.
* Wrong builder cannot upload/delete/reorder project media.
* Project video max one active video.
* Project brochure PDF allowed for builder.
* Floor plans allowed for builder.
* Draft/pending project media private.
* Approved/published project media public-safe variants only.
* RERA/verification proof docs not exposed as public project media.
* Virtual tour URL validated if implemented.

If Owner/Broker can upload project media:

* create critical bug
* mark `FAIL`

If project video max-one rule can be bypassed:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 23. Requirement Media Verification

Verify requirement media status:

* no public requirement gallery unless explicitly approved
* requirement attachments private if implemented
* contact/identity docs not public
* proposal/message attachments private
* requirement hidden contact protected
* requirement media feature status documented if not implemented

If requirement private attachment is public:

* create critical bug
* mark `FAIL`

---

## 24. Profile Media Verification

Verify profile media:

* user can upload own avatar/logo only
* wrong user denied
* broker/builder public profile image becomes public only if profile/media public-safe
* owner profile image not publicly exposed unless product allows
* original private
* public variant safe
* crop/remove/change works or setup-required
* no hidden contact in filename/alt/caption
* no fake profile image upload success

If user can modify another user's profile image:

* create critical bug
* mark `FAIL`

---

## 25. Message Attachment Verification

If message attachments implemented:

* participant-only upload
* participant-only signed download
* private bucket
* media table RLS
* file validation
* no public CDN URL
* no fake attachment upload
* wrong participant denied
* hidden contact not in metadata
* admin access permission-scoped

If not implemented:

* attachment button hidden or disabled/setup-required
* feature registry accurate

If message attachment is public:

* create critical bug
* mark `FAIL`

---

## 26. Verification / Admin Document Verification

If verification/admin document upload implemented:

* private bucket only
* signed URL only
* explicit permission required
* access audited if implemented
* no public URL
* no CDN public cache
* no public metadata
* no fake document upload
* sensitive docs not in sitemap/public page
* staff permission-scoped

If verification/admin document is publicly accessible:

* create critical bug
* mark `FAIL`

---

## 27. Ads Banner Boundary Verification

Verify ads banner behavior:

* full ads upload lifecycle not implemented unless safe
* category may exist as placeholder
* no fake ad banner upload
* no fake active ad media
* no fake CDN banner display
* provider/status documented
* Prompt 12 still responsible for full ads/promotions

If fake ad banner upload appears real:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 28. Image Processing Verification

Verify image processing status.

Expected/foundation:

* metadata extraction
* dimension validation
* EXIF stripping
* orientation normalization
* thumbnail generation
* WebP conversion
* AVIF conversion if supported
* responsive variants
* original private backup
* safe quality configuration
* no distortion

Check:

* actual conversions only marked ready if created
* failed processing shown honestly
* setup-required if library/provider missing
* variants link to real objects
* no fake WebP/AVIF status
* public pages do not reference non-existent variants

If conversion status says ready but files do not exist:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 29. WebP / AVIF Verification

Check:

* WebP variants real or setup-required
* AVIF variants real or setup-required
* fallback to original/placeholder safe
* variant dimensions recorded
* object keys safe
* CDN URLs real only
* no fake converted file names
* browser fallback safe

If AVIF/WebP shown as generated without actual processing:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 30. HEIC / HEIF Verification

Verify HEIC/HEIF handling:

* accepted only if validation/conversion supported
* if unsupported, clear setup-required/unsupported error
* unsupported HEIC/HEIF not published as broken public image
* docs/provider status updated
* no fake conversion

If HEIC upload claims success but cannot display/process safely:

* create bug
* mark `PARTIAL`

---

## 31. EXIF / Metadata Verification

Verify:

* EXIF stripping implemented or setup-required
* orientation normalized if implemented
* hidden contact not stored in alt/caption/object key
* GPS metadata not public if stripping not implemented
* private originals not public
* metadata extraction does not expose PII publicly
* docs note current EXIF status

If GPS/EXIF hidden private data is publicly exposed:

* create bug
* mark `FAIL` or `PARTIAL` depending severity

---

## 32. SVG Safety Verification

SVG handling must be safe.

Allowed safe outcomes:

* SVG rejected.
* SVG sanitized strongly.
* SVG rasterized to safe image.

Verify:

* raw unsanitized user SVG is not rendered inline
* scripts/event handlers denied
* external references denied
* `javascript:` URLs denied
* public raw SVG disabled unless sanitized
* status documented
* no fake sanitize success

If unsanitized SVG is publicly rendered:

* create critical bug
* mark `FAIL`

---

## 33. PDF Verification

Verify PDF handling:

* MIME/magic validation
* max size validation
* private storage by default
* public access only when category/entity allowed
* signed URL for private PDFs
* brochure role rules enforced
* floor plan rules enforced
* PDF preview setup-required if not implemented
* malware scan setup-required if not implemented
* no fake PDF preview
* hidden contact not auto-inserted in PDF filename/metadata
* private PDFs not public

If private PDF is public:

* create critical bug
* mark `FAIL`

---

## 34. Video Verification

Verify project video handling:

* builder only
* own project only
* one active video max
* allowed formats validated
* size/duration limits configurable
* private until approved/published
* public only if ready/public
* thumbnail real or setup-required
* transcoding setup-required if not implemented
* no fake video processing
* no fake preview

If video processing shown complete without real file/processor:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 35. Virtual Tour URL Verification

If virtual tour URLs implemented, verify provider allowlist:

```txt id="virtual-tour-providers"
matterport.com
my.matterport.com
kuula.co
cloudpano.com
youtube.com
youtu.be
vimeo.com
```

Check:

* URL validated
* iframe generated safely
* raw iframe HTML not trusted
* `javascript:` URLs denied
* `data:` URLs denied
* hidden contact not in URL
* builder own project only
* unsafe provider rejected/setup-required

If raw iframe HTML from user is rendered:

* create critical bug
* mark `FAIL`

---

## 36. Malware Scan Verification

If malware scanning implemented:

* scan result stored
* pending files private
* failed files blocked
* scan logs safe
* no secrets exposed
* admin status visible where permitted

If malware scanning not implemented:

* `MALWARE_SCAN_SETUP_REQUIRED` documented
* high-risk files remain private/limited as appropriate
* no fake safe badge
* provider status updated

If UI says scan passed without scanner:

* create bug
* mark `FAIL`

---

## 37. Media Variant Verification

Verify variants table/records:

* variant points to existing object or setup-required
* variant format correct
* width/height correct
* file size recorded if possible
* public URL only for public-safe variants
* original private
* deleted variants not public
* no fake variant status
* variants not shown before ready

If public page references missing variant object:

* create bug
* mark `PARTIAL`

---

## 38. Entity Media Link Verification

Verify entity media links:

* link entity type allowlisted
* link entity ID valid
* media belongs to same owner/entity or allowed flow
* one active cover per entity/category
* sort order valid
* deleted links not public
* wrong user cannot link foreign media to own entity
* wrong user cannot unlink/delete media

If user can attach another user's media to own listing:

* create critical bug
* mark `FAIL`

---

## 39. Cover Image Verification

Verify cover image:

* only one active cover per entity/category
* set cover requires ownership/permission
* if cover deleted, safe fallback or next cover behavior
* public search/detail uses real ready public cover
* no fake cover image
* no wrong-user cover manipulation

If cover is client-only and not persisted:

* create bug
* mark `PARTIAL`

---

## 40. Reorder Verification

Verify reorder:

* requires ownership/permission
* all media IDs belong to same entity
* no missing/extra foreign IDs
* sort order saved server-side
* UI reflects saved order
* public display uses saved order
* wrong user denied
* deleted media ignored

If reorder can include another user's media:

* create critical bug
* mark `FAIL`

---

## 41. Delete / Soft Delete Verification

Verify delete:

* ownership/permission required
* soft delete DB record
* hide from public UI
* cleanup queued/tracked if appropriate
* CDN purge/cache invalidation foundation
* signed URLs expire or become inaccessible
* audit event if implemented
* cover/sort order updated safely
* no wrong-user delete

If deleted media remains public with no purge/version strategy:

* create bug
* mark `PARTIAL` or `FAIL` depending data sensitivity

---

## 42. Restore Verification

If restore implemented:

* file retained
* permission required
* deleted_at cleared
* public visibility restored only if safe
* audit event
* no restore after cleanup deletion
* wrong user denied

If restore not implemented:

* document status as `NOT_STARTED` or `PARTIAL`

---

## 43. Public Media View Verification

If public media views exist, verify they include only:

* approved/published public entity media
* ready processing status
* approved/not_required moderation status
* public visibility
* safe CDN/public URL
* width/height/alt/caption safe
* cover/sort order

They must exclude:

* private originals
* draft media
* pending media
* deleted media
* rejected/flagged media
* verification documents
* admin documents
* message attachments
* private PDFs
* private RERA/ownership proof docs
* hidden contact
* exact private address
* unnecessary object keys

If public media view exposes private media:

* create critical bug
* mark `FAIL`

---

## 44. Public Search / Detail Integration Verification

Verify public pages:

### Search Cards

* show real public thumbnail or safe placeholder
* use cover image if ready
* no fake image count
* no private/pending media
* no broken image

### Property Detail

* real property gallery
* cover first
* only ready public media
* no private originals
* no pending/rejected media
* no hidden contact in alt/caption
* no fake gallery count

### Project Detail

* real project gallery
* real video only if ready/public
* real brochure/floor plan only if ready/public
* 360 link only if safe/validated
* no private proof docs
* no fake video/PDF

### Profiles

* real public avatar/logo if public-safe
* placeholder if missing
* no private profile image leak

If public detail shows draft/private media:

* create critical bug
* mark `FAIL`

---

## 45. Dashboard Media Manager Verification

Verify dashboard media managers:

* Owner property media manager works or setup-required
* Broker property media manager works or setup-required
* Builder project media manager works or setup-required
* profile image manager works or setup-required
* wrong role controls hidden/denied
* upload progress honest
* validation errors clear
* cover/reorder/delete server-backed
* setup-required if provider missing
* no fake upload success
* no `href="#"`
* no dead buttons

If UI says uploaded successfully but no media record/object exists:

* create bug
* mark `FAIL`

---

## 46. Admin Media Verification

If admin media page/foundation exists, verify:

* permission-scoped
* provider setup status honest
* storage usage real or setup/no-data
* processing jobs real
* failed uploads real
* cleanup queue real/setup
* sensitive media masked/private
* no provider secrets
* no fake storage health
* no fake scan status
* no fake CDN purge

If admin media page exposes provider secrets:

* create critical bug
* mark `FAIL`

---

## 47. Upload Security Deep Check

Verify:

* upload endpoint requires auth
* upload endpoint validates role
* upload endpoint validates entity ownership
* upload endpoint validates category
* upload endpoint validates file type/size
* upload endpoint never exposes secrets
* upload endpoint cannot write arbitrary object key
* upload endpoint cannot write to public bucket for private category
* upload endpoint rate-limit/foundation documented
* upload endpoint safe errors
* upload endpoint no service role client exposure

If user can choose arbitrary object key/bucket:

* create critical bug
* mark `FAIL`

---

## 48. Plan / Billing Limit Verification

If media plan limits integrated with Prompt 09, verify:

* media limit checked server-side
* plan required where applicable
* images per listing limit real
* video allowed only if plan allows
* brochure allowed only if plan allows
* floor plan allowed only if plan allows
* usage counter real
* no fake quota
* no client-only limit
* setup-required/partial documented if not active

If plan media limit claimed active but backend bypass possible:

* create bug
* mark `FAIL`

---

## 49. Hidden Contact Media Metadata Verification

Search media code/data for hidden contact leaks.

Check:

* filenames
* object keys
* alt text
* captions
* EXIF metadata
* PDF metadata
* video metadata
* public URLs
* CDN URLs
* public media views
* notification payloads
* logs/errors
* admin media pages without permission

Search terms:

```txt id="hidden-contact-search"
phone
mobile
email
whatsapp
contact
owner_phone
broker_phone
builder_phone
contact_phone
contact_email
hidden_contact
contact_visibility
```

If hidden contact appears in public media metadata/URL:

* create critical bug
* mark `FAIL`

---

## 50. Provider Secret / Service Role Verification

Search code and client bundles for:

```txt id="secret-patterns"
R2_SECRET_ACCESS_KEY
R2_ACCESS_KEY_ID
CLOUDFLARE_API_TOKEN
SUPABASE_SERVICE_ROLE_KEY
SERVICE_ROLE
AWS_SECRET_ACCESS_KEY
S3_SECRET
R2_ACCOUNT_ID
RAZORPAY_KEY_SECRET
RESEND_API_KEY
SENDGRID_API_KEY
```

Verify:

* no R2 secret in client
* no Cloudflare API token in client
* no service role in client
* no secrets in upload response
* no secrets in provider status UI
* no real secrets in `.env.example`
* no secrets in logs/errors/audit docs

If real secret exposure found:

* do not print secret
* create critical bug
* mark `FAIL`
* recommend secret rotation

---

## 51. Fake Media Verification

Search for fake media behavior.

Not allowed as real:

* fake upload success
* fake CDN URL
* fake image conversion
* fake WebP/AVIF variant
* fake thumbnail
* fake video processing
* fake PDF preview
* fake malware scan passed
* fake public gallery count
* fake storage usage
* fake CDN purge success
* fake upload progress complete
* fake profile image upload
* fake brochure upload

If placeholder images exist:

* must be clearly static placeholders
* must not be treated as uploaded user media
* must not create fake media counts
* must not be in sitemap/schema as user-uploaded media

If fake media appears real:

* create bug
* mark `FAIL`

---

## 52. CDN / Cache Verification

Verify CDN/cache strategy:

* public media has safe cache headers or versioned URLs
* private media not public cached
* CDN URL helper uses configured CDN URL only
* deleted/replaced public media has purge or versioned-key strategy
* purge setup-required if API token missing
* no fake purge success
* no stale private media publicly accessible
* CDN provider status honest

If private media is cached through public CDN:

* create critical bug
* mark `FAIL`

---

## 53. Orphan Cleanup Verification

Verify orphan cleanup foundation:

* expired upload sessions tracked
* uploaded object without media link tracked
* failed processing object tracked
* deleted media cleanup tracked
* unused variants tracked
* cleanup status exists
* cleanup job/cron status documented
* no unlimited orphan growth with no tracking
* private docs retention respected
* no hard delete of sensitive docs without retention rule

Cleanup statuses:

```txt id="cleanup-statuses"
active
pending_cleanup
cleanup_scheduled
cleanup_completed
cleanup_failed
retained_for_audit
```

If no cleanup tracking exists for upload sessions that create objects:

* create bug
* mark `PARTIAL`

---

## 54. Media Audit Verification

If media audit logs implemented, verify logs for:

* upload session created
* signed URL issued
* upload completed
* validation failed
* processing failed
* media linked
* cover changed
* reorder
* delete
* restore
* signed private download
* sensitive document viewed
* admin review
* CDN purge
* cleanup

Audit logs must not store:

* provider secrets
* signed URL full token if sensitive
* private file contents
* OTP/password
* hidden contact unless masked
* raw stack traces

If audit logs store secrets/signed URLs unsafely:

* create bug
* mark `FAIL` or `PARTIAL`

---

## 55. Direct URL / Object Access Verification

Test/inspect:

```txt id="direct-access-checks"
public media URL → allowed only if public/ready
private original URL → denied or signed only
draft media URL → denied or signed only
pending media URL → denied or signed only
verification document URL → denied or signed only
message attachment URL → participant signed only
deleted media URL → denied/expired/purged
wrong user signed URL request → denied
```

If private object is reachable without auth/signed URL:

* create critical bug
* mark `FAIL`

---

## 56. Private Noindex Verification

Verify media-related private pages are noindex:

* upload pages
* dashboard media manager
* private media preview
* signed download pages if any
* admin media pages
* verification document pages
* message attachment pages

Check:

* not in sitemap
* no private media URLs in public sitemap
* no private media metadata in page metadata/schema
* no public share link to private media

If private media page is indexable with private data:

* create critical bug
* mark `FAIL`

---

## 57. Private Cache Verification

Verify private media pages/URLs:

* signed URLs short TTL
* private pages no-store
* dashboard/admin media pages no-store
* private media not in public CDN cache
* private signed URLs not cached in shared caches
* private originals not cached publicly
* deleted media not cached publicly without version/purge strategy

If private media can be publicly cached:

* create critical bug
* mark `FAIL`

---

## 58. RLS Enabled Verification

Verify RLS enabled for media tables:

```txt id="rls-tables"
upload_sessions
media_assets
media_variants
entity_media_links
media_processing_jobs
media_audit_logs
media_moderation_events
media_cleanup_jobs
```

Expected:

* public can read only public-safe media records
* owner/broker/builder can manage own media only
* message participants can access own attachment metadata only if implemented
* admin/staff permission-scoped
* sensitive/private media protected
* wrong user denied

If private media table lacks RLS:

* create critical bug
* mark `FAIL`

If database unavailable:

* mark RLS runtime verification `SETUP_REQUIRED`
* do not mark RLS PASS

---

## 59. RLS Policy Verification

Verify behavior:

* anonymous cannot read private media
* anonymous can read public-ready media only if intended
* user can read/manage own property/project/profile media
* wrong user cannot read/manage another user's private media
* builder cannot manage property media
* owner/broker cannot manage project media
* public cannot read originals
* public cannot read verification/admin docs
* public cannot read message attachments
* signed URL action checks permission
* admin/staff access permission-scoped

If wrong user can manage media:

* create critical bug
* mark `FAIL`

---

## 60. RLS Test Suggestions

If Supabase test environment is available, run equivalent tests:

```txt id="rls-test-scenarios"
1. Anonymous select private media_assets → denied.
2. Anonymous select public ready media view → allowed only for published public entity.
3. Anonymous select draft/pending media → denied.
4. Owner A select Owner A property media → allowed.
5. Owner B select Owner A private property media → denied.
6. Broker A update Broker A property media → allowed.
7. Broker B update Broker A property media → denied.
8. Builder select own project media → allowed.
9. Builder upload/manage property media → denied.
10. Owner/Broker upload/manage project media → denied.
11. Public select verification_document metadata → denied.
12. Message participant select attachment metadata → allowed if implemented.
13. Non-participant select attachment metadata → denied.
14. Staff without sensitive permission select private docs → denied.
15. Admin with permission select private docs → allowed if policy supports it.
```

Record exact results.

Do not mark RLS PASS without tests.

---

## 61. Public Media API Verification

If public media API/routes exist:

* only public-ready media returned
* no private object keys if not needed
* no private originals
* no signed private URLs
* no draft/pending/rejected/deleted media
* no hidden contact
* no exact private address
* response paginated/limited
* safe caching headers

If public media API returns private object keys or signed URLs:

* create bug
* mark `FAIL`

---

## 62. Upload UI Verification

Verify upload UI:

* file picker works
* drag/drop works
* validation errors clear
* progress honest
* retry/cancel safe
* setup-required if provider missing
* remove/delete confirmation
* cover selection
* reorder by explicit drag handle
* no fake progress completion
* no dead buttons
* no `href="#"`
* no accidental navigation
* mobile touch works

If upload UI says success without real upload record:

* create bug
* mark `FAIL`

---

## 63. Gallery UI Verification

Verify gallery UI:

* images fit aspect ratio
* no distortion
* no broken images
* fallback placeholder safe
* cover first
* touch scroll works
* no accidental drag
* images `draggable=false` in public gallery
* fullscreen viewer safe if implemented
* keyboard navigation if viewer implemented
* no horizontal page overflow
* no fake image count
* no private media

If gallery shows private/pending image:

* create critical bug
* mark `FAIL`

---

## 64. Crop / Rotate / Reorder UI Verification

Verify:

* crop real or setup-required
* rotate real or setup-required
* original private preserved
* cropped variant real if marked done
* reorder persisted server-side
* cover persisted server-side
* wrong user denied
* mobile crop/reorder usable if implemented
* no fake save success

If crop/rotate UI exists but does not save real result and says success:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 65. Public Image Performance Verification

Verify public images:

* width/height set where possible
* responsive sizes used
* lazy loading
* priority only for above-fold hero/cover
* thumbnails for cards
* detail variants for gallery
* no huge original served on search cards
* no layout shift
* no broken CDN URL
* public placeholder lightweight

If search cards serve full originals:

* create bug
* mark `PARTIAL`

---

## 66. Build / Lint / Typecheck Verification

Run available checks.

Examples:

```txt id="npm-checks"
npm run lint
npm run typecheck
npm run build
npm test
```

```txt id="pnpm-checks"
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

If scripts missing:

* record `NOT_CONFIGURED`

If checks fail:

* fix safe issues if in scope
* create bug if unresolved
* mark `FAIL` or `PARTIAL`

Build failure blocks PASS.

---

## 67. Upload Test Suggestions

If provider/test environment is available, test:

```txt id="upload-test-scenarios"
1. Owner uploads JPG to own property → success.
2. Owner uploads JPG to another user's property → denied.
3. Broker uploads PNG to own property → success.
4. Builder uploads image to own project → success.
5. Builder uploads image to property → denied.
6. Owner uploads project image → denied.
7. Builder uploads second active project video → denied or replaces through safe flow.
8. Invalid executable disguised as image → denied.
9. Oversized file → denied.
10. Private original direct URL → denied.
11. Public variant for published entity → allowed.
12. Draft media public URL → denied.
13. Wrong user signed URL request → denied.
14. Delete media removes from public detail/search.
15. Reorder media persists after reload.
```

If provider unavailable:

* inspect code
* mark upload runtime tests `SETUP_REQUIRED`
* do not fake runtime PASS

---

## 68. Manual Smoke Test Matrix

If app can run and safe test environment exists, test:

```txt id="manual-smoke-matrix"
Provider:
- missing R2 keys show setup-required
- configured R2 creates signed URL/server upload
- provider secrets not exposed

Property:
- owner upload own property image
- broker upload own property image
- builder denied property upload
- cover/reorder/delete work
- public detail shows only ready public images

Project:
- builder upload project image
- builder upload brochure/floor plan if allowed
- builder upload one video if configured
- owner/broker denied project media
- public project detail shows only ready public media

Profile:
- user upload own avatar/logo
- wrong user denied
- public profile shows public-safe variant

Private:
- verification/admin docs private
- message attachments private/setup-required
- signed URL wrong user denied

Security:
- invalid file rejected
- SVG unsafe rejected/sanitized
- private original not public
- hidden contact not in metadata/object key
```

If safe test environment unavailable:

* inspect code
* mark runtime tests `SETUP_REQUIRED`
* do not fake runtime PASS

---

## 69. Responsive Verification

Test at:

```txt id="responsive-widths"
320px
360px
390px
430px
768px
1024px
1366px
```

Check:

* upload dropzone fits
* file picker usable
* progress list fits
* validation messages readable
* gallery touch scroll works
* no horizontal scroll
* reorder handle usable
* cover button usable
* delete confirmation fits
* media cards stack
* profile crop modal fits if implemented
* project video/PDF cards fit
* public gallery/detail viewer fits
* admin media table becomes cards

If not all widths tested, mark responsive check `PARTIAL`.

Do not mark responsive PASS without testing.

---

## 70. Accessibility Verification

Check media UI:

* upload button labels
* file input accessible
* drag/drop has keyboard alternative
* progress announced or readable
* error messages linked/readable
* image alt fields labeled
* cover/reorder/delete buttons labeled
* icon buttons have aria labels
* focus visible
* gallery controls keyboard accessible if implemented
* modal/drawer focus behavior safe
* status badges not color-only
* large mobile tap targets

If severe accessibility blocker exists:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 71. Performance Verification

Verify:

* no unbounded media queries
* media lists paginated/limited
* thumbnails used for cards
* detail variants used for detail
* originals not served publicly by default
* lazy loading
* CDN cache strategy
* image dimensions prevent layout shift
* processing jobs not blocking UI too long
* upload size limits
* cleanup job foundation
* indexes exist
* build passes

If public listing uses large original images everywhere:

* create bug
* mark `PARTIAL`

---

## 72. Documentation Update Verification

Verify these docs were updated:

```txt id="docs-update-required"
FEATURE_REGISTRY.md
CHANGELOG.md
BUGS_AND_FIXES.md
MANUAL_VERIFICATION.md
API_PROVIDER_STATUS.md
DEPLOYMENT_ROLLBACK.md
SECURITY_RLS_CHECKLIST.md
PERFORMANCE_CHECKLIST.md
brain.md
```

If docs missing updates:

* update them
* mark verification `PARTIAL` until fixed

---

## 73. Feature Registry Verification

Check `FEATURE_REGISTRY.md` includes accurate status for:

* R2 provider foundation
* CDN URL helper
* public/private bucket strategy
* upload sessions
* signed upload URLs
* signed download URLs
* media asset table
* media variants table
* entity media links
* media processing jobs
* media audit logs
* property image upload
* property brochure rules
* project image upload
* project video max-one rule
* project brochure upload
* project floor plan upload
* 360 virtual tour URL validation
* profile image/logo upload
* message attachment placeholder
* verification/admin document placeholder
* image validation
* PDF validation
* video validation
* SVG safety
* HEIC/HEIF handling
* WebP conversion
* AVIF conversion
* thumbnail generation
* EXIF stripping
* cover image
* reorder
* delete/soft delete
* orphan cleanup foundation
* CDN purge foundation
* RLS media policies
* hidden contact media protection
* no fake upload check
* responsive gallery/upload UI

Future features must not be marked done.

---

## 74. Changelog Verification

Check `CHANGELOG.md` includes Prompt 10 entry with:

* date
* summary
* changed files
* new routes/API routes
* migration files if any
* RLS/security changes
* provider status changes
* tests/checks run
* docs updated
* verification status
* known issues
* rollback notes

If missing, update changelog.

---

## 75. Bugs And Fixes Verification

If issues are found, update `BUGS_AND_FIXES.md`.

Possible bug IDs:

* `BUG-MEDIA-FAKE-UPLOAD`
* `BUG-MEDIA-FAKE-CDN`
* `BUG-MEDIA-PROVIDER-SECRET-LEAK`
* `BUG-MEDIA-SERVICE-ROLE-CLIENT`
* `BUG-MEDIA-PRIVATE-PUBLIC-URL`
* `BUG-MEDIA-WRONG-USER-ACCESS`
* `BUG-MEDIA-HIDDEN-CONTACT-METADATA`
* `BUG-MEDIA-SVG-UNSAFE`
* `BUG-MEDIA-PDF-PRIVATE-LEAK`
* `BUG-MEDIA-VIDEO-LIMIT-BYPASS`
* `BUG-MEDIA-PROPERTY-BROCHURE-WRONG-ROLE`
* `BUG-MEDIA-BUILDER-PROPERTY-UPLOAD`
* `BUG-MEDIA-OWNER-PROJECT-UPLOAD`
* `BUG-MEDIA-RLS-MISSING`
* `BUG-MEDIA-UPLOAD-ENDPOINT-UNRESTRICTED`
* `BUG-MEDIA-VALIDATION-EXTENSION-ONLY`
* `BUG-MEDIA-FAKE-CONVERSION`
* `BUG-MEDIA-FAKE-MALWARE-SCAN`
* `BUG-MEDIA-ORPHAN-CLEANUP-MISSING`
* `BUG-MEDIA-MOBILE-UPLOAD-BROKEN`
* `BUG-MEDIA-GALLERY-HORIZONTAL-SCROLL`
* `BUG-MEDIA-BROKEN-PUBLIC-IMAGE`
* `BUG-MEDIA-MIGRATION-MISSING`
* `BUG-MEDIA-BUILD-FAIL`

Use existing bug ID convention if available.

---

## 76. Manual Verification Doc Update

Update `MANUAL_VERIFICATION.md` with Prompt 10 verification entry.

Entry must include:

* phase
* environment
* date
* tester
* routes/features checked
* provider tests
* upload tests
* media category tests
* public/private access tests
* file validation tests
* processing tests
* RLS tests
* responsive widths
* commands run
* expected
* actual
* issues found
* result
* next step

Use exact status.

No vague “works”.

---

## 77. Security Checklist Verification

Update/verify `SECURITY_RLS_CHECKLIST.md`.

Include Prompt 10 results for:

* media RLS
* upload session security
* signed upload URL security
* signed download URL security
* public/private bucket separation
* provider secret masking
* service role server-only
* file type validation
* SVG safety
* PDF/video private access
* hidden contact metadata protection
* wrong-user media denial
* sensitive document access audit
* private noindex/cache
* malware scan status
* cleanup/orphan status
* direct object URL checks
* known issues

If private media leak/secret exposure exists, result cannot be PASS.

---

## 78. Performance Checklist Verification

Update/verify `PERFORMANCE_CHECKLIST.md`.

Include Prompt 10 results for:

* image variant sizes
* WebP status
* AVIF status
* thumbnail generation status
* lazy loading
* responsive image sizes
* CDN cache strategy
* upload size controls
* gallery performance
* no unbounded media queries
* media indexes
* cleanup job status
* public detail/search image performance
* build status
* future media load test notes

---

## 79. Deployment Rollback Verification

Update/verify `DEPLOYMENT_ROLLBACK.md`.

Include:

* Prompt 10 route/component changes
* migration path if any
* R2 bucket/object key strategy
* CDN URL changes
* cache purge strategy
* RLS policies
* provider env vars
* file retention/orphan risk
* cleanup job risk
* rollback notes
* post-deploy upload smoke checks
* verification status

If DB/provider/storage changes exist without rollback notes:

* create bug
* mark `PARTIAL` or `FAIL`

---

## 80. API Provider Status Verification

Update/verify `API_PROVIDER_STATUS.md`.

Relevant statuses:

* Cloudflare R2
* Cloudflare CDN/custom domain
* Cloudflare API token/cache purge
* image processing library
* AVIF/WebP conversion
* HEIC/HEIF conversion
* malware scanning
* video transcoding
* PDF preview generation
* cron/cleanup jobs
* Supabase Database/RLS

Rules:

* no provider active without real test
* missing provider setup-required/not-started
* configured/test mode clearly marked
* no fake CDN/provider success
* no secrets shown

---

## 81. Brain Update Verification

Update `brain.md`.

Must include:

* Prompt 10 implementation summary
* Prompt 10 verification result
* changed files
* routes/API routes checked
* migrations/tables/RLS
* R2/CDN status
* upload status
* image/PDF/video status
* public/private media status
* hidden contact metadata result
* fake upload/CDN/conversion result
* responsive result
* setup-required providers
* bugs/blockers
* commands run
* next prompt:

  * `prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md`
* instruction not to proceed if Prompt 10 failed/blocked

---

## 82. Verification Result Decision

Use these rules.

### PASS

Mark `PASS` only if:

* build passes
* provider status honest
* no fake upload success
* upload flow is real or safely setup-required
* provider secrets not exposed
* service role not client-exposed
* public/private media separation safe
* signed upload/download checks server-side permissions
* file validation server-side
* SVG safely rejected/sanitized/rasterized
* private PDFs/docs/attachments not public
* wrong user media access denied
* role media rules enforced
* property/project/profile media flows safe
* project video max-one rule enforced if video implemented
* public pages show only ready public media
* no hidden contact in media metadata/object keys/public URLs
* no fake CDN/conversion/malware scan status
* cleanup/orphan foundation exists or setup-required documented
* RLS enabled/tested or honestly setup-required with no unsafe claim
* private media noindex/no-store
* responsive checks completed
* docs updated
* no blocking bugs

### PARTIAL

Use `PARTIAL` if:

* R2 credentials missing but upload UI safely setup-required
* signed URL runtime tests unavailable but code reviewed
* image conversion partial
* AVIF/HEIC conversion setup-required
* malware scan setup-required
* video transcoding setup-required
* PDF preview setup-required
* cleanup cron setup-required
* CDN purge setup-required
* message attachments placeholder only
* admin media moderation placeholder only
* RLS runtime tests unavailable but policies/migration reviewed
* responsive/browser checks incomplete
* no fake upload/media and no privacy leak exists

Prompt 11 can start only if user/Super Admin accepts partial and no critical media/security/privacy issue exists.

### FAIL

Use `FAIL` if:

* build fails
* fake upload success shown
* provider secret exposed
* service role client exposure
* private media public
* private bucket public
* hidden contact leaks through media metadata/object key/public URL
* wrong user can access/manage media
* upload endpoint unrestricted
* unsafe SVG publicly rendered
* file validation missing or extension-only for public uploads
* project video max-one rule bypass if video implemented
* public pages show private/pending media
* private docs/message attachments public
* media RLS missing
* DB changes missing migration

Do not start Prompt 11.

### BLOCKED

Use `BLOCKED` if:

* Prompt 04 entity foundation failed
* Prompt 05 detail/search integration failed and media cannot be safely wired
* Prompt 06 dashboards failed and upload UI depends on it
* Prompt 09 plan gate failed and media limits are required
* storage provider choice unresolved
* Supabase/RLS unavailable blocks safe media verification
* cannot inspect required files
* package/build baseline broken
* architecture conflict needs owner decision

### SETUP_REQUIRED

Use `SETUP_REQUIRED` for:

* R2 credentials missing
* CDN URL missing
* Cloudflare API token missing
* image processing library missing
* AVIF/HEIC conversion missing
* malware scanner missing
* video transcoder missing
* PDF preview generator missing
* cron/cleanup worker missing
* Supabase env missing
* safe upload test environment missing

Setup-required is acceptable only when no fake upload/media functionality appears and privacy is protected.

---

## 83. Prompt 11 Readiness Checklist

Prompt 11 can start only if:

* Prompt 10 implementation completed
* Prompt 10 verification completed
* no critical media/privacy/security bug open
* no fake upload success
* no provider secret leak
* no service role client exposure
* no private media public leak
* no wrong-user media access
* no hidden contact metadata leak
* no unsafe SVG public rendering
* public pages use only ready public media or safe placeholders
* docs updated
* `brain.md` updated
* next prompt file exists:

  * `prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md`

If Prompt 11 file is missing, stop and ask/generate it.

---

## 84. Required Manual Verification Entry Format

Add this format to `MANUAL_VERIFICATION.md`:

```txt id="manual-verification-entry-format"
## Prompt 10 Verification — Media Storage, Uploads, R2 And CDN

Date:
Environment:
Tester:
Implementation Prompt:
Verification Prompt:

Files Checked:
- ...

Routes/API Checked:
- upload session:
- signed upload:
- upload complete:
- signed download:
- property media:
- project media:
- profile media:
- public media:
- admin media:

Provider Checks:
- R2:
- CDN:
- public/private buckets:
- provider secrets:
- setup-required:

Upload Checks:
- property images:
- project images:
- project video:
- brochures:
- floor plans:
- profile media:
- message attachments:
- admin/private docs:

Validation Checks:
- MIME:
- magic bytes:
- size:
- dimensions:
- SVG:
- HEIC/HEIF:
- PDF:
- video:
- malware scan:

Processing Checks:
- thumbnails:
- WebP:
- AVIF:
- EXIF:
- PDF preview:
- video transcoding:
- variants:

Access/Security Checks:
- public media:
- private media:
- signed URLs:
- wrong user access:
- role rules:
- hidden contact metadata:
- service role/provider secrets:
- private noindex/cache:

Public/Dashboard UI Checks:
- search cards:
- property detail gallery:
- project detail gallery:
- profile media:
- dashboard upload manager:
- admin media:

Cleanup/CDN Checks:
- delete:
- restore:
- orphan cleanup:
- CDN purge:
- cache headers:

Database/RLS Checks:
- migrations:
- tables:
- indexes:
- RLS policies:
- RLS test result:

Responsive Widths Tested:
- 320px:
- 360px:
- 390px:
- 430px:
- 768px:
- 1024px:
- 1366px:

Commands Run:
- command: result

Expected:
- Media storage/upload foundation is secure and ready for Prompt 11.

Actual:
- ...

Issues Found:
- ...

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can Start Prompt 11:
- Yes/No

Next Step:
- prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md or fix blockers first.
```

---

## 85. Required Final Response Format

Return final verification response in this exact structure:

```txt id="final-response-format"
Verification Summary:
- Prompt 10 Media Storage/Uploads/R2/CDN verification result

Environment:
- local/staging/production/unknown

Files checked:
- important file/folder list

Routes/API checked:
- upload session:
- signed upload:
- upload complete:
- signed download:
- public media:
- property/project/profile media:
- admin media:

Provider/storage:
- R2:
- CDN:
- public/private buckets:
- object key strategy:
- provider setup-required:

Uploads:
- property images:
- property brochure:
- project images:
- project video:
- project brochure:
- floor plans:
- profile media:
- message attachments:
- admin/private documents:

Validation/processing:
- MIME/magic:
- size/dimensions:
- SVG:
- HEIC/HEIF:
- PDF:
- video:
- thumbnails:
- WebP:
- AVIF:
- EXIF:
- malware scan:

UI/public integration:
- search cards:
- property detail:
- project detail:
- profile pages:
- dashboard media manager:
- gallery:
- cover/reorder/delete:

Security/privacy:
- public/private media:
- signed URLs:
- wrong user access:
- role rules:
- hidden contact metadata:
- provider secrets:
- service role:
- private noindex/cache:

Database/RLS:
- migrations:
- tables:
- indexes:
- public media views:
- RLS policies:
- RLS test result:

Performance/CDN/cleanup:
- responsive variants:
- lazy loading:
- cache headers:
- CDN purge:
- orphan cleanup:
- media query limits:

Responsive:
- widths tested:
- upload UI:
- gallery UI:
- admin media:
- horizontal scroll:

Provider/setup-required:
- R2:
- CDN:
- image processing:
- AVIF/HEIC:
- malware scan:
- video transcoding:
- PDF preview:
- cron cleanup:
- Supabase/test upload environment:

Commands run:
- command: PASS/FAIL/NOT_CONFIGURED/BLOCKED

Docs updated:
- file list

Issues found:
- bug IDs or none

Result:
- PASS/PARTIAL/FAIL/BLOCKED/SETUP_REQUIRED

Can start Prompt 11:
- Yes/No
- reason

Next step:
- prompts/11_LOCATION_SEARCH_SEO_CMS_LEGAL.md
```

Do not write vague “verified”.

---

## 86. If Verification Fails

If verification fails:

1. do not start Prompt 11
2. create/update bug entries
3. update `MANUAL_VERIFICATION.md`
4. update `SECURITY_RLS_CHECKLIST.md`
5. update `PERFORMANCE_CHECKLIST.md`
6. update `DEPLOYMENT_ROLLBACK.md`
7. update `API_PROVIDER_STATUS.md` if provider/media issue found
8. update `brain.md`
9. state exact blocker
10. fix if safe and in scope
11. rerun verification
12. only then proceed

Critical media/privacy/security failures block progress.

---

## 87. If Verification Is Partial

If verification is partial:

* document exact partial items
* list setup-required providers
* list untested upload/RLS checks
* list processing gaps
* list cleanup/CDN gaps
* list responsive/browser gaps
* confirm no fake upload success
* confirm no provider secret leak
* confirm no service role client exposure
* confirm no private media leak
* confirm no wrong-user media access
* confirm no hidden contact metadata leak
* confirm public pages do not show private/pending media
* update docs
* ask/require owner acceptance before Prompt 11 if risk is significant

Acceptable partial examples:

* R2 credentials missing but upload disabled/setup-required
* signed URL runtime test unavailable but code reviewed
* image conversion partial
* AVIF/HEIC setup-required
* malware scan setup-required
* video transcoding setup-required
* PDF preview setup-required
* cleanup cron setup-required
* CDN purge setup-required
* message attachments placeholder only
* admin media moderation placeholder only
* RLS runtime tests unavailable but policies reviewed

Not acceptable partial without fix:

* fake upload success
* provider secret leak
* service role client exposure
* private file public URL
* wrong user media access
* unsafe SVG public rendering
* hidden contact in public media URL/metadata
* public pages showing private/pending media
* build fail

---

## 88. If Verification Passes

If verification passes:

* update `MANUAL_VERIFICATION.md` with PASS
* update `FEATURE_REGISTRY.md`
* update `CHANGELOG.md`
* update `SECURITY_RLS_CHECKLIST.md`
* update `PERFORMANCE_CHECKLIST.md`
* update `DEPLOYMENT_ROLLBACK.md`
* update `API_PROVIDER_STATUS.md` if relevant
* update `brain.md`
* final response should say Prompt 11 can start

Do not start Prompt 11 automatically unless user asked to continue.

---

## 89. What Not To Do In This Verification

Do not:

* fake an upload to pass UI
* mark provider active without test/config
* expose R2 secret
* expose Cloudflare API token
* expose service role
* make private bucket public
* use public CDN for private originals/docs
* ignore wrong-user signed URL access
* ignore hidden contact in metadata
* allow unsafe SVG public rendering
* skip file validation
* skip RLS
* skip migration for DB changes
* ignore orphan cleanup
* start Prompt 11 after FAIL/BLOCKED

---

## 90. Quality Bar

This verification is successful when future phases can trust that:

* upload behavior is real or honestly setup-required
* provider secrets are server-only
* public/private buckets are separated
* signed URLs are permission-checked
* media metadata is RLS-protected
* role media rules are enforced
* public pages show only ready public media
* private files are not public
* hidden contact is not in media metadata/object keys/public URLs
* image/PDF/video processing statuses are honest
* upload/gallery UI is usable on mobile
* CDN/cache/cleanup foundations are documented
* no fake media behavior exists
* docs reflect reality
* Prompt 11 can build location/search/SEO/CMS/legal features using safe real media

---

## 91. Final Rule For Prompt 10 Verification

Verify uploads honestly.

Verify R2/CDN honestly.

Verify signed URLs honestly.

Verify media RLS honestly.

Verify public/private access honestly.

Verify file validation honestly.

Verify image/PDF/video processing honestly.

Verify cleanup honestly.

Verify provider secrets honestly.

Verify responsive media UI honestly.

Do not fake upload success.

Do not fake CDN.

Do not fake conversion.

Do not fake malware scan.

Do not expose R2 secrets.

Do not expose service role.

Do not expose private files.

Do not allow wrong-user media access.

Do not allow unsafe SVG public rendering.

Do not leak hidden contact in media metadata.

Do not show private/pending media publicly.

Do not mark PASS without media/security/RLS checks.

Do not skip docs.

Do not skip `brain.md`.

No fake PASS.
