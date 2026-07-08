# prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md

# My Gujarat Property — Prompt 10: Media Storage, Uploads, R2 And CDN

> **DESIGN SOURCE (mandatory):** Build to match the finished wireframes 1:1. Reference `C:\Users\RAJAN\Documents\MGP DESIGN` **Batches 5 (upload widget) & 11 (private-doc viewer)**, `design-prompts/DESIGN_ADDONS_MASTER.md`, deltas `report-batch-05/11.md`, and `docs/12` "Design Add-Ons". Locked: cover-select + drag-reorder + crop + % upload, brochures stored as PDF (never image), per-viewer watermarked non-downloadable private docs, 10 MB limit shown.

This prompt is for Claude Code.

Use this prompt after completing and verifying:

```txt id="previous-prompts"
prompts/09_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
```

This phase implements the secure media foundation for **My Gujarat Property**:

* image uploads
* property images
* project images
* project video
* brochure PDF
* floor plan images/PDFs
* profile/avatar/logo images
* message attachment placeholder/foundation
* admin document upload placeholder/foundation
* Cloudflare R2 storage foundation
* CDN/public delivery foundation
* private/original file storage
* upload sessions
* signed upload/download URLs
* metadata tables
* image optimization
* WebP/AVIF variant foundation
* original backup
* cover image
* reorder
* crop/rotate placeholder/foundation
* drag-safe gallery interaction
* validation
* malware scan placeholder
* EXIF stripping placeholder/foundation
* SVG safety
* RLS policies
* public/private access separation
* orphan cleanup foundation
* CDN cache purge/revalidation foundation
* no fake upload
* no fake CDN
* no private media leak
* no service role in client
* no fake PASS

Do not fake file upload success.

Do not show fake media as real uploaded media.

Do not expose private files publicly.

Do not expose hidden contact through filenames, alt text, metadata, EXIF, PDFs or CDN URLs.

Do not use service role on the client.

Do not skip RLS.

Do not skip provider setup-required states.

Do not fake PASS.

---

## 1. Prompt Identity

```txt id="prompt-identity"
Prompt File: prompts/10_MEDIA_STORAGE_UPLOADS_R2_CDN.md
Prompt Number: 10
Phase: Media Storage, Uploads, R2 And CDN
Type: Implementation Prompt
Matching Verification Prompt: prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md
Previous Verification Prompt: prompts/09_MANUAL_VERIFICATION_BILLING_PAYMENT_SUBSCRIPTION_TRIAL_GST.md
```

---

## 2. Phase Purpose

The purpose of this phase is to implement a secure, scalable and privacy-safe media upload and delivery foundation.

This phase should implement:

* Cloudflare R2 provider foundation
* CDN/public URL foundation
* upload configuration
* upload sessions
* media metadata records
* media asset records
* media variants
* entity-media linking
* property image upload
* project image upload
* project one-video upload foundation
* brochure PDF upload rules
* floor plan upload rules
* profile/avatar/logo upload foundation
* admin/private document upload placeholder/foundation
* message attachment placeholder/foundation
* image validation
* PDF validation
* video validation
* safe SVG handling
* HEIC/HEIF handling plan
* WebP/AVIF conversion foundation
* thumbnails
* responsive sizes
* lazy loading integration
* original backup private storage
* cover/front image
* reorder
* delete/soft delete
* restore foundation
* orphan cleanup foundation
* private/public bucket separation
* signed URLs
* RLS
* upload rate/size limits
* provider status updates
* docs updates
* checks/tests
* handoff to manual verification prompt

This phase must make media real and safe. No fake media success is allowed.

---

## 3. Required Docs To Read First

Before editing, read:

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

Also inspect existing upload/media/storage/image/video/PDF code before editing.

Do not paste full docs into final response.

---

## 4. Current Code Inspection Required

Before changing code, inspect:

```txt id="inspect-required"
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
src/components/property/
components/property/
src/components/project/
components/project/
src/components/profile/
components/profile/
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
src/lib/actions/media*
lib/actions/media*
src/lib/actions/uploads*
lib/actions/uploads*
src/lib/validators/media*
lib/validators/media*
src/lib/validators/upload*
lib/validators/upload*
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

Search for existing:

* storage provider code
* Supabase storage code
* Cloudflare R2 code
* S3 client code
* upload routes
* signed URL generation
* public URL helpers
* image components
* gallery components
* drag/reorder code
* crop code
* delete code
* media metadata tables
* profile avatar upload
* property image upload
* project image upload
* project video upload
* brochure PDF upload
* floor plan upload
* fake upload success
* fake CDN URL
* hardcoded placeholder images
* public private file leak
* service role in client
* RLS policies

Do not duplicate existing working implementation.

---

## 5. Implementation Scope

This phase may implement:

### 5.1 Storage Provider Foundation

* Cloudflare R2 configuration
* S3-compatible client server-side
* bucket naming
* object key strategy
* public/private object separation
* signed upload URL foundation
* signed download URL foundation
* CDN base URL helper
* provider setup-required handling

### 5.2 Media Tables

* media assets
* media variants
* upload sessions
* entity media links
* media processing jobs
* media audit logs
* media moderation status
* orphan cleanup status

### 5.3 Image Uploads

* property images
* project images
* profile avatar/logo
* cover/front image
* reorder
* delete/soft delete
* thumbnail/variant foundation
* WebP/AVIF conversion foundation
* EXIF stripping placeholder/foundation
* metadata extraction

### 5.4 PDF Uploads

* brochure PDFs
* floor plan PDFs
* private verification/admin docs placeholder/foundation
* PDF validation
* private/public access rules
* role-based brochure rules

### 5.5 Video Uploads

* project video max one
* video validation
* object metadata
* thumbnail placeholder
* transcoding placeholder/setup-required
* CDN delivery only if safe
* no fake video processing

### 5.6 360 / Virtual Tour Links

* Matterport/iframe URL field validation
* allowlist/sanitization
* no unsafe iframe injection
* setup-required for advanced embed handling
* no upload fake

### 5.7 Upload UI

* drag-and-drop
* file picker
* progress
* retry
* cancel
* validation errors
* cover selection
* reorder by drag handle
* crop/rotate placeholder/foundation
* mobile-safe interactions
* no accidental navigation
* no fake progress completion

### 5.8 Public Delivery

* public media only for approved/published public entities
* private media signed URLs only
* optimized image component integration
* lazy loading
* no hidden contact in media alt/metadata
* CDN purge/revalidation foundation

### 5.9 Docs

Update all memory docs.

---

## 6. Out Of Scope For This Phase

Do not fully implement:

* advanced AI image enhancement
* AI moderation
* full malware scanning provider unless available
* full video transcoding pipeline unless provider exists
* full background job system if unavailable
* full Cloudflare Images unless explicitly configured
* final production CDN tuning
* full media analytics
* full watermarking automation unless safe
* full document verification workflow
* full admin fraud investigation
* full PWA offline media cache
* final production media load testing
* final legal review of uploaded content

This phase may create foundations and setup-required states for these.

---

## 7. Hard Media Safety Rules

Claude must enforce:

```txt id="hard-media-rules"
No fake upload success.
No fake CDN URL.
No private file public URL.
No hidden contact in public media metadata.
No service role in client.
No unrestricted upload endpoint.
No frontend-only file validation.
No public access to original/private files.
No SVG execution risk.
No PDF public leak.
No video fake processing.
No orphan file accumulation without tracking.
No RLS bypass.
```

Forbidden:

* direct client upload using server secrets
* public write bucket
* public read of private/original/verification docs
* fake WebP/AVIF conversion status
* fake malware scan success
* fake upload progress
* fake thumbnail generation
* fake CDN purge success
* hidden contact in filenames/alt text/EXIF
* file type validation by extension only

---

## 8. Provider Configuration

Recommended provider: Cloudflare R2 with CDN/custom domain.

Environment variables may include:

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

Rules:

* R2 secret access key server-only
* API token server-only
* public CDN URL can be public
* missing env shows `R2_SETUP_REQUIRED`
* upload UI disabled/setup-required if provider missing
* no fake provider active
* update `API_PROVIDER_STATUS.md`

If using Supabase Storage instead of R2 temporarily:

* document provider choice
* keep same security/privacy rules
* mark R2 as `SETUP_REQUIRED` or `DEFERRED`
* do not claim Cloudflare R2 active

---

## 9. Storage Bucket Strategy

Recommended buckets:

```txt id="bucket-strategy"
Public bucket:
- published entity images
- public optimized variants
- public thumbnails
- public profile logos/avatars if user opted public

Private bucket:
- originals
- pending listing media
- draft listing media
- brochures before approval
- floor plans before approval
- project videos before approval
- verification documents
- admin documents
- message attachments
- private profile images before publish
```

Rules:

* original backup private
* public variants generated only after safety checks
* pending/draft media private
* approved/published entity public media can be public/CDN
* deleted/paused/private entity media should not be public unless intentionally retained and inaccessible from public UI
* private bucket access via signed URL only

---

## 10. Object Key Strategy

Use safe object keys.

Example:

```txt id="object-key-strategy"
media/{environment}/{entity_type}/{entity_id}/{media_id}/original/{safe_filename}
media/{environment}/{entity_type}/{entity_id}/{media_id}/variants/{variant_name}.{ext}
private/{environment}/{profile_id}/{media_id}/original/{safe_filename}
```

Rules:

* never include phone/email in object key
* never include raw user filename directly without sanitization
* use UUID/media ID
* keep extension normalized
* avoid predictable sensitive paths for private docs
* include environment namespace
* avoid PII in URL
* avoid exact address in path

---

## 11. File Type Rules

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

Allowed video formats:

```txt id="video-formats"
MP4
WebM
MOV
M4V
```

Rules:

* validate MIME and magic bytes where possible
* extension-only validation is not enough
* SVG is high-risk; sanitize, rasterize or disable with clear setup-required
* HEIC/HEIF may require conversion provider/library; otherwise setup-required
* GIF can be large; enforce size/dimension limits
* reject executable/script files
* reject polyglot files where detectable
* reject dangerous PDFs if scanner unavailable and private handling required

---

## 12. Size And Dimension Rules

Use configurable limits.

Do not invent final business limits as hard product truth unless already configured.

Suggested defaults can be placeholders:

```txt id="suggested-limits"
image_max_size_mb: configurable
pdf_max_size_mb: configurable
video_max_size_mb: configurable
profile_image_max_size_mb: configurable
max_image_width_px: configurable
max_image_height_px: configurable
thumbnail_widths: 320, 640, 960, 1280
quality_webp: configurable
quality_avif: configurable
```

Rules:

* limits must be enforced server-side
* UI shows limits
* plan limits may override
* no “unlimited” unless safe
* rejected files show clear error
* huge files do not crash app

User product requirement says no arbitrary min/max should be forced visually as product restriction unless needed for safety/provider/plan; keep limits configurable and documented.

---

## 13. Media Category Rules

Media categories:

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

Rules:

* category allowlisted
* category determines allowed type
* category determines public/private visibility
* category determines role permissions
* category determines entity link
* category determines plan/limit checks
* category determines processing pipeline

---

## 14. Property Media Rules

Property media may include:

* multiple property images
* cover/front image
* image reorder
* image delete/restore foundation
* optional property brochure only if product allows for broker/builder

Rules:

* Owner/Broker can upload property images for own property.
* Builder cannot upload property media because builder cannot create property.
* Broker can upload property brochure PDF if allowed by product rules.
* Builder cannot upload property brochure because builder cannot own property.
* Owner brochure PDF should remain disabled/setup-required unless product owner explicitly allows it.
* Draft/pending property media private.
* Approved/published property media public-safe variants can be public.
* Hidden contact must not appear in image metadata/alt text/object key.
* Wrong user cannot upload/delete/reorder media.

---

## 15. Project Media Rules

Project media may include:

* project images
* one project video max
* brochure PDF
* floor plan images/PDFs
* 360/Matterport/iframe URL
* construction progress images later/foundation

Rules:

* Builder can upload media for own project.
* Owner/Broker cannot upload project media.
* Project video max one active public video unless product later changes.
* Project brochure PDF allowed for builder.
* Floor plans allowed for builder.
* Draft/pending project media private.
* Approved/published project media public-safe variants can be public.
* Private RERA/verification proof docs must not become public project media.
* Wrong builder cannot upload/delete/reorder media.

---

## 16. Requirement Media Rules

Requirements usually should not need public media.

Rules:

* requirement attachments, if any, should be private.
* requirement contact/identity docs must not be public.
* requirement matching/proposal attachments can be message/private attachments later.
* Do not create public requirement gallery unless product explicitly approves.
* Hidden contact protected.

If requirement media not implemented, document `NOT_STARTED` or `DEFERRED`.

---

## 17. Profile Media Rules

Profile media may include:

* avatar
* logo
* broker agency logo
* builder company logo
* profile cover image later

Rules:

* user can upload own profile image.
* broker/builder public profile logo can become public if profile is public.
* owner profile image remains private or public-safe only if product allows.
* crop/remove/change supported or foundation created.
* original private.
* public variant safe.
* wrong user denied.
* no hidden contact in filename/alt.

---

## 18. Message Attachment Rules

Message attachments are private.

Rules:

* participant-only access.
* stored in private bucket.
* signed URLs only.
* upload requires thread participant check.
* full attachment upload can be setup-required if media provider or RLS not ready.
* no fake attachment upload.
* file type/size validation.
* attachments not public.
* admin access permission-scoped.

If message attachment upload is not implemented, disable button with setup-required.

---

## 19. Verification / Admin Document Rules

Verification/admin documents are sensitive.

Examples:

* identity proof
* RERA proof
* ownership proof
* company docs
* payment proof
* support attachments
* fraud evidence

Rules:

* private bucket only.
* signed URLs only.
* explicit permission required.
* view action audited.
* no public URL.
* no CDN public cache.
* no public metadata.
* no thumbnail public unless explicitly safe and private.
* no fake document upload.
* admin/staff access permission-scoped.

---

## 20. Ads Banner Boundary

Ad banner uploads are later Prompt 12.

This phase may prepare media category:

* `ads_banner_later`

Do not implement full ads media lifecycle now unless safe.

Rules:

* no fake ad banner upload.
* no fake ad CDN display.
* no fake impressions/clicks.
* banner dimensions may be defined later.
* keep provider/setup-ready foundation only.

---

## 21. Upload Session Requirements

Upload sessions should include:

* session ID
* user/profile ID
* entity type
* entity ID
* media category
* upload status
* expected MIME/type
* max bytes
* object key
* signed URL expiry
* created_at
* expires_at
* completed_at
* failed_at
* error_code

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

Rules:

* session created server-side
* auth required
* role/entity ownership checked before URL issued
* session expires
* upload completion verified server-side
* wrong user cannot complete another session
* no fake uploaded status

---

## 22. Media Asset Fields

Suggested `media_assets` fields:

* `id`
* `owner_profile_id`
* `entity_type`
* `entity_id`
* `media_category`
* `bucket_type`
* `storage_provider`
* `bucket_name`
* `object_key`
* `original_filename_safe`
* `mime_type`
* `file_extension`
* `file_size_bytes`
* `width`
* `height`
* `duration_seconds`
* `page_count`
* `checksum`
* `visibility`
* `processing_status`
* `moderation_status`
* `is_cover`
* `sort_order`
* `alt_text`
* `caption`
* `created_at`
* `updated_at`
* `deleted_at`

Visibility values:

```txt id="media-visibility-values"
private
public
entity_published_public
signed_only
admin_only
deleted
```

Processing statuses:

```txt id="media-processing-statuses"
pending
validated
processing
ready
failed
not_required
setup_required
```

Moderation statuses:

```txt id="media-moderation-statuses"
pending
approved
rejected
flagged
not_required
```

---

## 23. Media Variant Fields

Suggested `media_variants` fields:

* `id`
* `media_asset_id`
* `variant_name`
* `format`
* `width`
* `height`
* `file_size_bytes`
* `bucket_name`
* `object_key`
* `public_url`
* `cdn_url`
* `processing_status`
* `created_at`
* `deleted_at`

Variant examples:

```txt id="media-variants"
thumb_320_webp
card_640_webp
detail_960_webp
hero_1280_webp
thumb_320_avif
card_640_avif
detail_960_avif
original_private
pdf_original_private
video_original_private
video_public_mp4
```

Rules:

* variants real only
* no fake conversion status
* public URL only for public-safe variants
* original remains private unless explicitly allowed

---

## 24. Entity Media Link Fields

Suggested `entity_media_links` fields:

* `id`
* `entity_type`
* `entity_id`
* `media_asset_id`
* `media_category`
* `sort_order`
* `is_cover`
* `is_public`
* `created_by_profile_id`
* `created_at`
* `updated_at`
* `deleted_at`

Rules:

* one active cover per entity/category
* sort order server-validated
* link ownership checked
* wrong user denied
* deleted links not public

---

## 25. Upload Processing Job Fields

If processing jobs are implemented or queued:

* `id`
* `media_asset_id`
* `job_type`
* `status`
* `attempt_count`
* `last_error_safe`
* `scheduled_at`
* `started_at`
* `completed_at`
* `created_at`

Job types:

```txt id="media-job-types"
validate_file
extract_metadata
strip_exif
convert_webp
convert_avif
generate_thumbnail
scan_malware
sanitize_svg
generate_pdf_preview
transcode_video
purge_cdn_cache
cleanup_orphan
```

Rules:

* background jobs may be setup-required if infrastructure missing
* no fake job success
* failed jobs visible safely
* processing status honest

---

## 26. Image Processing Requirements

Image processing should include foundation for:

* metadata extraction
* dimension validation
* EXIF stripping
* orientation normalization
* safe thumbnail generation
* WebP conversion
* AVIF conversion where supported
* responsive variants
* original private backup
* quality configuration
* no distortion
* lazy loading integration

If image processing library not available:

* store original safely
* show setup-required for conversion
* do not claim conversion done

---

## 27. HEIC / HEIF Handling

HEIC/HEIF support may require extra tooling.

Rules:

* accept only if conversion/validation supported
* if unsupported, show clear setup-required/unsupported message
* do not fake conversion
* do not store unsupported file as public if browser cannot display
* document provider/library requirement

---

## 28. SVG Safety Handling

SVG is high-risk.

Allowed options:

1. sanitize SVG strongly,
2. rasterize SVG to safe image,
3. reject SVG with setup-required/unsupported message.

Rules:

* never render unsanitized user SVG inline.
* never allow script/event handlers.
* never allow external references.
* never store raw SVG publicly unless sanitized and policy-approved.
* if unsure, reject SVG safely and document.

---

## 29. PDF Processing Requirements

PDF handling should include:

* MIME/magic byte validation
* max size validation
* page count extraction if possible
* private storage by default
* public access only when entity approved and category allowed
* signed URLs for private PDFs
* no fake PDF preview
* PDF preview image setup-required if not implemented
* malware scan placeholder
* no hidden contact in filename/metadata if possible

Brochure rules:

* broker property brochure if allowed
* builder project brochure allowed
* owner property brochure disabled unless product approves
* project floor plan PDF allowed for builder

---

## 30. Video Processing Requirements

Project video rules:

* builder only
* own project only
* one active video max
* allowed formats only
* size/duration limits configurable
* private until approved/published
* public CDN only if ready
* thumbnail placeholder/setup-required if no processor
* transcoding setup-required if not implemented
* no fake transcoding
* no fake video preview

If video processing/provider is not ready:

* upload can be disabled or private-only setup-required
* document status

---

## 31. 360 / Virtual Tour URL Requirements

Project virtual tour may support URL fields.

Allowed providers can be allowlisted:

```txt id="virtual-tour-providers"
matterport.com
my.matterport.com
kuula.co
cloudpano.com
youtube.com
youtu.be
vimeo.com
```

Rules:

* validate URL
* sanitize iframe embed
* never trust raw iframe HTML from user
* store URL only, generate embed safely
* no javascript URLs
* no data URLs
* no hidden contact in URL
* preview setup-required if not safe
* builder own project only

---

## 32. Gallery UX Requirements

Gallery/upload UI should support:

* select files
* drag and drop
* preview
* progress
* retry
* cancel
* remove
* reorder
* set cover/front
* view validation errors
* loading state
* empty state
* setup-required state
* disabled state with reason
* mobile-safe interactions

Rules:

* `draggable=false` for images unless using explicit drag handle
* reorder by handle, not accidental image drag
* touch scroll must not trigger reorder accidentally
* no auto-copy
* no broken preview
* no fake uploaded state
* no horizontal scroll

---

## 33. Crop / Rotate / Reorder Rules

Crop/rotate may be foundation.

Rules:

* profile image crop desirable.
* property/project image crop optional/foundation.
* original preserved private.
* cropped variant generated real or setup-required.
* rotation real or setup-required.
* reorder saved server-side.
* cover image saved server-side.
* wrong user cannot reorder/delete.

If crop UI exists but does not save real result:

* mark setup-required or partial
* do not fake success

---

## 34. Alt Text / Caption Rules

Alt text/caption should be safe.

Rules:

* user can provide alt/caption if implemented.
* sanitize text.
* no phone/email/WhatsApp auto-fill.
* no hidden contact in public alt text.
* fallback alt text generic and safe.
* do not use private exact address in alt text.
* captions public only if media public.

If alt text contains hidden contact from database field automatically:

* create bug/fail in verification later.

---

## 35. Public Media Delivery Rules

Public media can be delivered when:

* entity is approved/published
* media asset approved/ready
* media category public-safe
* variant exists
* visibility allows public
* no moderation block
* linked entity not deleted/private
* CDN URL configured or public storage URL safe

Public media must not include:

* draft media
* pending media
* rejected media
* private originals
* private docs
* verification docs
* message attachments
* hidden contact
* exact private address in metadata

---

## 36. Private Media Delivery Rules

Private media requires:

* auth
* ownership/participant/staff permission
* signed URL
* short TTL
* audit for sensitive document access where applicable
* no public cache
* no public CDN URL
* no sitemap/indexing
* no metadata leak

Private media includes:

* originals
* draft/pending listing media
* verification docs
* admin documents
* message attachments
* private PDFs
* rejected media

---

## 37. Signed URL Requirements

Signed URL generation must:

* be server-side
* require auth
* check permission
* use short TTL
* avoid exposing provider secret
* log/audit sensitive access where needed
* not be cached publicly
* reject wrong user
* reject deleted/expired media

If provider does not support signed URLs:

* document blocker/setup-required
* do not expose private files publicly

---

## 38. Upload Security Validation

Validation must happen server-side.

Check:

* user auth
* role
* entity ownership
* media category
* MIME
* magic bytes where possible
* size
* dimensions/duration/page count where possible
* plan/usage limits if configured
* extension safety
* filename sanitization
* object key safety
* virus/malware scan placeholder
* moderation status
* rate limit/abuse protection

Client-side validation is user experience only, not security.

---

## 39. Plan / Billing Limit Integration

Integrate with Prompt 09 if available.

Plan-gated media features may include:

* images per listing
* video allowed
* brochure allowed
* floor plan allowed
* storage quota
* agent/team uploads later
* ads banner upload later

Rules:

* media limit check server-side
* no fake quota
* no upload if plan not allowed and gate active
* if plan media limits not fully active, document `PARTIAL`
* do not bypass role limits

---

## 40. Role Permission Rules

### Owner

Owner can:

* upload images for own properties
* upload profile avatar if enabled
* delete/reorder own property images

Owner cannot:

* upload project media
* upload project brochure/video/floor plans
* upload property brochure unless product explicitly allows
* access other users' media

### Broker

Broker can:

* upload images for own properties
* upload property brochure PDF if allowed
* upload profile/avatar/logo
* delete/reorder own property images

Broker cannot:

* upload project media
* access other users' media

### Builder

Builder can:

* upload images for own projects
* upload one project video
* upload project brochure PDF
* upload floor plans
* upload builder logo/profile media
* add 360/virtual tour URL

Builder cannot:

* upload normal property media
* access other users' private media

### Admin/Staff

Admin/staff can:

* access media according to permissions
* review/moderate media if module exists
* view sensitive docs only with permission
* audit sensitive access

Admin/staff cannot:

* access provider secrets through media UI
* bypass audit for sensitive docs
* publish fake media

---

## 41. Media Moderation Foundation

Media moderation may include:

* pending
* approved
* rejected
* flagged
* not_required

Rules:

* public media only if approved/not_required and entity public
* rejected media hidden
* flagged media hidden or review state
* admin/staff review later if not implemented
* no fake approval
* no fake malware scan

If moderation not implemented, use safe default:

* user media private until entity approval
* public only after entity approval and safety checks
* document `PARTIAL`

---

## 42. Malware Scan Placeholder

Malware scanning is important for PDFs/videos/docs.

If provider not implemented:

* mark `MALWARE_SCAN_SETUP_REQUIRED`
* keep sensitive/high-risk files private if needed
* warn admin docs are not production-ready for public downloads
* do not claim scan passed
* do not show fake safe badge

If scan provider implemented:

* result stored
* failed files blocked
* pending files private
* scan logs safe
* no secrets exposed

---

## 43. Upload Rate Limit / Abuse Foundation

Add or prepare rate limits for:

* signed upload URL creation
* upload completion
* media deletion
* reorder
* profile image updates
* message attachment uploads
* PDF uploads
* video uploads

Rules:

* rate limit status documented
* duplicate upload requests safe
* failed uploads not unlimited spam
* orphan cleanup tracking
* no fake rate-limit claim

---

## 44. Orphan Cleanup Requirements

Orphan cleanup foundation should track:

* upload sessions expired
* uploaded object not linked
* media asset deleted
* entity deleted
* media link deleted
* failed processing object
* unused variants
* old originals retention
* R2 orphan cleanup status

Possible cleanup statuses:

```txt id="cleanup-statuses"
active
pending_cleanup
cleanup_scheduled
cleanup_completed
cleanup_failed
retained_for_audit
```

Rules:

* no immediate hard delete if audit/retention requires keeping
* private docs retention respected
* cleanup job may be setup-required
* do not leave unlimited orphan growth without tracking
* update deployment rollback and performance docs

---

## 45. Delete / Restore Rules

Media delete should:

* require ownership/permission
* soft delete DB record
* hide from public UI
* queue object cleanup if appropriate
* keep audit record
* update cover/sort order
* purge CDN if public
* not delete other user's media
* not leave broken gallery

Restore foundation:

* allowed if file retained and permission exists
* restore not required if cleanup completed

---

## 46. CDN Cache / Purge Requirements

CDN foundation should include:

* CDN base URL helper
* cache headers for public media
* versioned object keys or cache busting
* purge foundation for replaced/deleted public media
* setup-required if Cloudflare API token missing
* no fake purge success
* private media no public CDN cache
* public media not stale after delete if possible

If purge not implemented:

* use versioned keys and document purge setup-required

---

## 47. Public Search / Detail Integration

Update public pages from Prompt 05 to use real media:

* search cards use real public thumbnail or safe placeholder
* property detail gallery uses real public variants
* project detail gallery uses real public variants
* project video appears only if real/ready/public
* brochure/floor plan links appear only if real/ready/public
* profile pages use real public avatar/logo
* no fake images
* no broken images
* no private media URLs
* no hidden contact in alt/caption

---

## 48. Dashboard Integration

Update dashboards from Prompt 06:

* owner property media manager
* broker property media manager
* builder project media manager
* profile image manager
* billing/plan media limit messages if available
* upload setup-required states
* progress/error states
* reorder/delete
* no fake upload success
* no wrong-role upload CTA

---

## 49. Admin Integration

Admin media foundation may include:

* media list placeholder
* flagged media queue placeholder
* storage health/setup status
* sensitive document access permission
* provider status
* cleanup job status placeholder

Rules:

* admin media module permission-scoped
* no provider secrets
* no fake storage health
* no fake malware scan
* no fake CDN active
* sensitive media masked/private

---

## 50. API Routes / Server Actions

Implement safe server actions/API routes for:

```txt id="server-actions"
create_upload_session
get_signed_upload_url
complete_upload
validate_uploaded_object
process_media_asset
create_media_variants
set_cover_media
reorder_media
delete_media
restore_media
get_signed_download_url
get_public_media_for_entity
update_media_alt_caption
upload_profile_image
remove_profile_image
upload_property_images
upload_property_brochure
upload_project_images
upload_project_video
upload_project_brochure
upload_project_floor_plan
save_project_virtual_tour_url
admin_review_media
admin_get_media_status
admin_purge_media_cache
cleanup_orphan_media
```

Only implement what is safe and in scope.

Each action must:

* require auth where needed
* validate role/entity ownership
* validate media category
* validate plan/media limits where active
* validate file type/size
* use server-only storage credentials
* enforce RLS
* return safe typed errors
* avoid secrets in response
* avoid fake success

---

## 51. Error Handling Rules

Use safe errors:

```txt id="safe-errors"
AUTH_REQUIRED
ROLE_NOT_ALLOWED
FORBIDDEN
ENTITY_NOT_FOUND
MEDIA_NOT_FOUND
UPLOAD_PROVIDER_SETUP_REQUIRED
R2_SETUP_REQUIRED
CDN_SETUP_REQUIRED
SIGNED_URL_FAILED
UPLOAD_SESSION_EXPIRED
FILE_TOO_LARGE
FILE_TYPE_NOT_ALLOWED
INVALID_MIME_TYPE
INVALID_FILE_SIGNATURE
IMAGE_PROCESSING_SETUP_REQUIRED
IMAGE_PROCESSING_FAILED
PDF_PROCESSING_SETUP_REQUIRED
VIDEO_PROCESSING_SETUP_REQUIRED
MALWARE_SCAN_SETUP_REQUIRED
MALWARE_SCAN_FAILED
MEDIA_LIMIT_EXCEEDED
PLAN_REQUIRED
PLAN_LIMIT_EXCEEDED
NOT_OWNER
NOT_PARTICIPANT
PRIVATE_MEDIA_FORBIDDEN
INVALID_STATUS_TRANSITION
CDN_PURGE_SETUP_REQUIRED
CLEANUP_SETUP_REQUIRED
UNKNOWN_ERROR
```

Do not expose:

* provider secrets
* service role key
* bucket secret
* raw stack trace
* SQL errors
* hidden contact
* private file path to wrong user
* signed URL to wrong user

---

## 52. Input Validation Rules

Validate:

* entity type
* entity ID
* media category
* upload session ID
* file name
* file extension
* MIME type
* file size
* image dimensions
* video duration
* PDF page count
* sort order
* cover flag
* alt text
* caption
* virtual tour URL
* user role
* entity ownership
* plan limit
* media visibility

Invalid input must not create public file.

---

## 53. RLS Requirements

RLS must protect media tables.

Rules:

* public can read only public-safe media rows/variants.
* public cannot read private originals.
* public cannot read draft/pending media.
* owner can read/manage own entity media.
* broker can read/manage own property media.
* builder can read/manage own project media.
* message participants can read private attachment metadata where implemented.
* admin/staff access permission-scoped.
* public denied for verification/admin docs.
* wrong user denied.
* service role server-only.
* signed URL generation checks permissions.

Frontend hiding is not security.

---

## 54. Public Media View Requirements

If public media views are created, they must include only:

* media linked to approved/published public entity
* media visibility public/entity_published_public
* ready processing status
* approved/not_required moderation status
* safe CDN/public URL
* width/height/alt/caption safe
* sort order and cover flag

Public media views must exclude:

* private originals
* draft/pending media
* deleted media
* rejected/flagged media
* verification docs
* admin docs
* message attachments
* private PDFs
* private project proof docs
* hidden contact
* exact private address
* provider object keys if not needed

---

## 55. RLS Table Expectations

Enable RLS for:

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

If using existing tables, verify equivalent protections.

If any private media table lacks RLS:

* do not mark complete
* create bug
* mark result `FAIL`

---

## 56. SQL Migration Rule

If DB changes are needed, create migration:

```txt id="migration-name"
supabase/migrations/YYYYMMDDHHMMSS_media_storage_uploads_r2_cdn.sql
```

Migration must include:

* purpose
* phase: Prompt 10
* tables created/changed
* views created/changed
* RLS policies created/changed
* indexes created
* functions/triggers if any
* unique cover constraints if any
* cleanup status fields
* destructive changes yes/no
* backup required yes/no
* rollback notes

No DB change without migration.

---

## 57. Suggested Indexes

Add/verify indexes for:

### Upload Sessions

* profile ID
* entity type/entity ID
* media category
* status
* expires_at
* created_at

### Media Assets

* owner profile ID
* entity type/entity ID
* media category
* visibility
* processing status
* moderation status
* deleted_at
* created_at

### Media Variants

* media_asset_id
* variant_name
* format
* processing_status

### Entity Media Links

* entity type/entity ID
* media_asset_id
* sort_order
* is_cover
* deleted_at

### Processing Jobs

* media_asset_id
* job_type
* status
* scheduled_at

### Audit/Cleanup

* media_asset_id
* action
* created_at
* cleanup_status

---

## 58. Storage Provider Client Rules

Storage client must:

* run server-side only for secrets
* support put/get/delete/head where needed
* support presigned upload where possible
* support presigned download for private files
* hide provider errors from users
* handle missing provider config
* avoid logging secrets
* not bundle secret env vars client-side
* use least-privilege keys where possible

If direct browser upload uses signed URL:

* signed URL generated server-side
* TTL short
* content type/size constraints where possible
* completion verified server-side

---

## 59. Upload Flow Requirements

Recommended flow:

1. user selects file
2. client validates basic UX constraints
3. server creates upload session after auth/role/entity checks
4. server returns signed upload URL or upload route
5. client uploads file
6. client calls complete upload
7. server verifies object exists
8. server validates metadata
9. server creates media asset record
10. server queues/executes processing
11. variants created if supported
12. media linked to entity
13. UI shows ready/private/public status honestly

Rules:

* no fake completion before object verified
* failed processing shown honestly
* public display only after ready and allowed
* cleanup if upload not completed

---

## 60. Fallback Upload Flow

If signed upload is not implemented:

* server upload endpoint may be used
* enforce body size limits
* stream file if possible
* validate server-side
* upload to R2/Supabase server-side
* no service role/client leak
* no memory overload
* setup-required if framework cannot safely handle files

Do not fake upload.

---

## 61. Public Image Component Requirements

Use optimized image rendering where possible.

Requirements:

* correct width/height/aspect ratio
* no distortion
* lazy loading
* priority only for above-fold hero image
* responsive `sizes`
* placeholder/skeleton
* safe alt text
* fallback if image missing
* no broken image
* no private signed URL on public page
* no hidden contact in alt/caption

---

## 62. Gallery Interaction Requirements

Gallery must support:

* horizontal touch scroll
* tap to view
* no accidental drag on scroll
* fullscreen viewer if implemented
* close on back/outside where appropriate
* keyboard accessibility
* reorder only in edit mode
* explicit drag handle
* remove/delete confirmation
* cover indicator

Rules:

* images `draggable=false` in public gallery
* edit drag handle separate
* mobile scroll threshold safe
* no auto-copy
* no layout shift

---

## 63. Cover Image Rules

Cover image:

* one active cover per entity/media category
* if cover deleted, next media can become cover or none
* cover set server-side
* public search/detail uses cover if ready/public
* wrong user denied
* cover flag cannot be manipulated by wrong user

If no cover:

* safe placeholder
* no fake image

---

## 64. Reorder Rules

Reorder:

* entity owner only
* validates all media IDs belong to same entity
* validates no missing/extra IDs
* saves sort_order server-side
* updates UI
* no client-only reorder
* wrong user denied
* deleted media ignored

---

## 65. Delete Rules

Delete media:

* entity owner/admin permission only
* soft delete DB row
* unlink from entity public view
* queue cleanup/purge if applicable
* public page no longer shows media
* signed URLs invalid/expire
* audit delete
* no hard delete of sensitive docs unless retention allows

---

## 66. Public Detail Media Requirements

Property detail should show:

* real property images
* cover first
* gallery
* no fake count
* no private media
* no pending/rejected media
* no hidden contact

Project detail should show:

* real project images
* cover first
* real video only if ready/public
* real brochure/floor plans only if ready/public
* 360 URL only if safe/validated
* no fake media

Profile pages should show:

* real logo/avatar if public-safe
* fallback placeholder if missing
* no private image leak

---

## 67. Dashboard Media Manager Requirements

Media manager should show:

* current media
* upload button if allowed
* setup-required if provider missing
* plan limit notice if active
* processing status
* failed status
* retry if possible
* set cover
* reorder
* delete
* alt/caption edit if implemented
* validation messages
* no fake success
* no wrong-role controls

---

## 68. Admin Media Status Requirements

Admin media/status page may show:

* provider setup status
* storage usage placeholder/real if available
* processing jobs
* failed uploads
* flagged media
* cleanup queue
* sensitive docs access controls

Rules:

* permission-scoped
* no provider secrets
* no fake storage usage
* no fake scan status
* no fake CDN purge
* no public access

---

## 69. CDN / Cache Headers

For public media:

* long cache headers if versioned object keys
* immutable variants where safe
* CDN URL helper
* cache busting when replaced
* purge setup-required if not implemented

For private media:

* no public cache
* signed URL short TTL
* no sitemap/indexing
* no shareable public URL

---

## 70. Cleanup / Lifecycle Policy

Document and implement foundation for:

* R2 lifecycle rules if configured
* private original retention
* deleted media cleanup
* orphan upload cleanup
* failed processing cleanup
* variant cleanup
* old signed URL expiration
* CDN purge/revalidation

If automated cleanup not implemented:

* create cleanup job table/status
* mark cron/setup-required
* update `API_PROVIDER_STATUS.md`

---

## 71. Rollback Requirements

Media rollout must be rollback-safe.

Before destructive changes:

* no destructive DB changes without backup
* no hard delete of existing files without owner approval
* no bucket policy weakening
* no public bucket conversion of private files
* no URL migration without fallback
* no CDN cutover without setup doc

Rollback notes must include:

* DB migration rollback
* R2 object key impact
* CDN cache impact
* provider env rollback
* private/public URL rollback
* orphan cleanup risk

---

## 72. Provider Status Updates

Update `API_PROVIDER_STATUS.md` for:

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

Statuses should be accurate:

```txt id="provider-status-values"
NOT_STARTED
SETUP_REQUIRED
CONFIGURED
TEST_MODE
ACTIVE
PARTIAL
BLOCKED
```

Do not mark active without real test.

---

## 73. Feature Registry Updates

Update `FEATURE_REGISTRY.md` for:

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

Use accurate statuses.

---

## 74. Changelog Update

Update `CHANGELOG.md`.

Include:

* date
* Prompt 10
* summary
* changed files
* new routes/API routes
* migration files if any
* RLS/security changes
* provider status changes
* tests/checks run
* docs updated
* known issues
* rollback notes
* manual verification pending

---

## 75. Bugs And Fixes Update

Update `BUGS_AND_FIXES.md` if issues found.

Possible bugs:

* fake upload success
* provider secret leak
* service role client exposure
* private file public URL
* wrong user media access
* hidden contact in media metadata
* SVG unsafe rendering
* PDF private leak
* project video limit bypass
* property brochure wrong role
* builder wrong property media access
* owner/broker wrong project media access
* media RLS missing
* upload endpoint unrestricted
* file validation extension-only
* CDN fake active
* fake image conversion
* fake malware scan
* orphan cleanup missing
* upload mobile broken
* gallery horizontal scroll
* broken public image
* migration missing
* build failure

---

## 76. Manual Verification Update

Update `MANUAL_VERIFICATION.md`.

For implementation prompt, record:

* Prompt 10 implementation status
* manual verification pending:

  * `prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md`
* media routes/features needing verification
* provider setup-required states
* upload tests pending
* RLS tests pending
* responsive checks pending
* known bugs

Do not mark manual verification PASS from implementation prompt alone.

---

## 77. Security Checklist Update

Update `SECURITY_RLS_CHECKLIST.md`.

Include:

* media RLS
* upload session security
* signed URL checks
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
* known issues

---

## 78. Performance Checklist Update

Update `PERFORMANCE_CHECKLIST.md`.

Include:

* image variant sizes
* WebP/AVIF status
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

## 79. Deployment Rollback Update

Update `DEPLOYMENT_ROLLBACK.md`.

Include:

* media route/component changes
* migration path if any
* R2 bucket/object key strategy
* CDN URL changes
* cache purge strategy
* RLS policies
* provider env vars
* rollback notes
* file retention/orphan risk
* cleanup job risk
* post-deploy upload smoke checks
* verification status

If migration/provider changes exist, rollback notes are mandatory.

---

## 80. Brain Update

Update `brain.md`.

Include:

* Prompt 10 implementation summary
* changed files
* routes/API routes added/changed
* migration files if any
* media tables/RLS status
* R2/CDN status
* upload status
* image/PDF/video status
* public/private access status
* processing/conversion status
* cleanup status
* provider setup-required states
* bugs/blockers
* tests/checks run
* next prompt:

  * `prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md`
* exact resume instruction

---

## 81. Expected Changed Files

Possible changed files:

```txt id="expected-changed-files"
src/app/api/uploads/create-session/route.ts
src/app/api/uploads/complete/route.ts
src/app/api/media/signed-url/route.ts
src/app/api/media/public/[id]/route.ts
src/app/dashboard/owner/properties/*/media/*
src/app/dashboard/broker/properties/*/media/*
src/app/dashboard/builder/projects/*/media/*
src/app/dashboard/profile/media/*
src/app/admin/media/*
src/components/media/*
src/components/upload/*
src/components/gallery/*
src/components/property/PropertyGallery.tsx
src/components/project/ProjectGallery.tsx
src/components/profile/ProfileImageUploader.tsx
src/lib/media/*
src/lib/uploads/*
src/lib/storage/*
src/lib/r2/*
src/lib/cloudflare/*
src/lib/actions/media.ts
src/lib/actions/uploads.ts
src/lib/validators/media.ts
src/lib/validators/upload.ts
src/lib/permissions/media-permissions.ts
src/types/media.ts
src/types/uploads.ts
supabase/migrations/*_media_storage_uploads_r2_cdn.sql
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

Actual paths may differ.

Only change needed files.

---

## 82. Expected Output From This Phase

At the end of Prompt 10 implementation, project should have:

* secure media storage foundation
* R2 provider setup-aware code
* CDN URL helper
* upload sessions
* signed upload/download foundation
* media metadata tables
* public/private media access separation
* property image upload foundation
* project image/video/brochure/floor plan upload foundation
* profile media upload foundation
* PDF/video validation foundation
* image optimization/conversion foundation
* cover image and reorder
* delete/soft delete
* orphan cleanup foundation
* public search/detail gallery integration
* dashboard media manager integration
* RLS policies
* provider setup-required states
* no fake upload
* no private file leak
* docs updated
* checks run
* manual verification pending

---

## 83. Forbidden Outcomes

This phase must not leave:

* fake upload success
* fake CDN URL
* fake image conversion
* fake malware scan
* fake video processing
* service role in client
* R2 secret in client
* public access to private files
* hidden contact in media metadata
* unsafe SVG rendering
* unrestricted upload endpoint
* extension-only validation
* project video limit bypass
* wrong user media access
* owner/broker project media upload
* builder property media upload
* private docs public
* message attachments public
* media RLS missing
* DB changes without migration
* orphan cleanup untracked
* docs outdated
* manual verification skipped

---

## 84. Phase Completion Status Rules

### `DONE`

Use when implementation completed but manual verification pending.

### `PASS`

Do not use from implementation prompt alone unless manual verification also completed and documented.

### `PARTIAL`

Use if:

* R2 provider setup-required but upload UI safely disabled
* signed URLs foundation exists but provider runtime test unavailable
* image conversion partial
* AVIF/HEIC conversion setup-required
* malware scan setup-required
* video transcoding setup-required
* PDF preview setup-required
* cleanup cron setup-required
* CDN purge setup-required
* message attachments placeholder only
* admin media moderation placeholder only
* RLS runtime tests pending
* responsive/browser checks pending

### `FAIL`

Use if:

* build fails
* fake upload success
* provider secret exposed
* service role client exposure
* private media public
* hidden contact leaks through media metadata
* wrong user media access
* upload endpoint unrestricted
* unsafe SVG public rendering
* file validation missing
* project video max-one rule bypass
* media RLS missing
* DB changes missing migration
* public pages show private/pending media

### `BLOCKED`

Use if:

* Prompt 04 entity foundation failed
* Prompt 05 detail/search media integration impossible
* Prompt 06 dashboards failed and upload UI depends on it
* Prompt 09 plan gates failed and media limits depend on it
* storage provider choice unresolved
* Supabase/RLS unavailable blocks safe media tables
* package/build baseline broken
* architecture conflict needs owner decision

### `SETUP_REQUIRED`

Use for:

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

Setup-required is acceptable only if no fake upload/media functionality appears and privacy is protected.

---

## 85. Final Response Required Format

Return final response in this structure:

```txt id="prompt-10-final-response-format"
Summary:
- what media/storage/R2/CDN foundation was implemented

Changed files:
- path list

SQL migrations:
- path list or none

Storage/provider:
- R2:
- CDN:
- public/private buckets:
- signed upload:
- signed download:
- provider setup-required:

Media tables:
- upload sessions:
- media assets:
- variants:
- entity links:
- processing jobs:
- audit/cleanup:

Uploads:
- property images:
- property brochure:
- project images:
- project video:
- project brochure:
- floor plans:
- profile media:
- message/admin documents:

Processing:
- image validation:
- WebP:
- AVIF:
- HEIC/HEIF:
- EXIF:
- SVG:
- PDF:
- video:
- malware scan:

UI integration:
- public search/detail:
- dashboard media manager:
- gallery:
- cover/reorder/delete:
- profile uploader:

RLS/security:
- private media:
- public media:
- wrong user denial:
- hidden contact metadata:
- service role/provider secrets:
- signed URL TTL:
- private cache/noindex:

Performance/CDN:
- variants:
- lazy loading:
- cache headers:
- purge:
- cleanup/orphans:

Provider/setup-required:
- R2:
- CDN:
- image processing:
- malware scan:
- video transcoding:
- PDF preview:
- cron cleanup:

Docs updated:
- path list

Tests/checks run:
- command: result

Bugs/issues found:
- bug IDs or none

Rollback notes:
- code:
- database:
- storage objects:
- CDN/cache:
- RLS:
- cleanup:

Manual verification:
- pending prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md

Next step:
- run prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md
```

Do not say only “done”.

---

## 86. Matching Manual Verification Reminder

After this implementation prompt, run:

```txt id="next-verification-prompt"
prompts/10_MANUAL_VERIFICATION_MEDIA_STORAGE_UPLOADS_R2_CDN.md
```

Do not start Prompt 11 until Prompt 10 verification passes or is explicitly accepted as `PARTIAL`, `BLOCKED` or `SETUP_REQUIRED`.

---

## 87. Common Bugs To Watch For

Create/track bugs for:

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

## 88. Quality Bar

This phase is successful when future phases can rely on:

* uploads are real or honestly setup-required
* storage provider secrets are server-only
* R2/CDN status is honest
* media metadata is tracked
* RLS protects media
* public/private media is separated
* signed URLs are permission-checked
* property/project/profile media flows are role-safe
* project video max-one rule is enforced
* PDF/video/private docs do not leak
* images are optimized or honestly partial
* cover/reorder/delete are server-backed
* public pages show only ready public media
* dashboards show upload status honestly
* no fake upload/media/CDN/conversion exists
* docs reflect reality
* manual verification is ready

---

## 89. Final Rule For Prompt 10

Implement media safely.

Use real uploads or honest setup-required states.

Protect private files.

Protect hidden contact.

Use RLS.

Use server-side validation.

Use server-only provider secrets.

Use signed URLs for private media.

Use public URLs only for approved public media.

Use safe SVG handling.

Use honest image/PDF/video processing statuses.

Do not fake upload success.

Do not fake CDN.

Do not fake conversion.

Do not fake malware scan.

Do not expose service role.

Do not expose R2 secrets.

Do not expose private files.

Do not allow wrong-user media access.

Do not allow unrestricted upload endpoints.

Do not skip migrations for DB changes.

Do not skip docs.

Do not skip checks.

Do not skip manual verification.

No fake PASS.
