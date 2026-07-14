/** Banner ad shared types. */

export interface BannerAd {
  id: string;
  advertiser_profile_id: string;
  advertiser_role: string;
  advertiser_name: string | null;
  project_id: string | null;
  title: string;
  cta_label: string;
  destination_url: string;
  placement: string;
  desktop_image_url: string | null;
  desktop_image_path: string | null;
  mobile_image_url: string | null;
  mobile_image_path: string | null;
  gujarat_wide: boolean;
  duration_days: number;
  start_date: string | null;
  end_date: string | null;
  status: string;
  approval_status: string;
  payment_status: string;
  is_paused: boolean;
  rejection_reason: string | null;
  approved_at: string | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
  /** joined target cities */
  targets?: { city_slug: string; city_name: string }[];
  /** joined project summary (for dashboards) */
  project?: { id: string; title: string; city_text: string | null; status: string } | null;
}

/**
 * Public-safe banner for the homepage "Top picks" carousel. Combines the
 * advertiser's creative image with a platform-built project card.
 */
export interface PublicBanner {
  id: string;
  cta_label: string;
  destination_url: string;       // → /project/<slug|id>
  desktop_image_url: string | null;
  mobile_image_url: string | null;
  gujarat_wide: boolean;
  cities: string[];              // target city names (public-safe)
  // Project card (built from the linked project — never advertiser free-text)
  advertiser_name: string | null;
  project_title: string;
  project_city: string | null;
  project_locality: string | null;
  price_label: string | null;
  bhk_label: string | null;
  city_slug: string | null;
}
