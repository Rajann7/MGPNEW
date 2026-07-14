import type { Metadata } from "next";
import { getCurrentProfile } from "@/lib/auth/session";
import { getHomeFeatured } from "@/lib/home/featured";
import { getPublicBanners } from "@/lib/banner/queries";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HomeHeroSearch } from "@/components/public/HomeHeroSearch";
import { BannerCarousel } from "@/components/banner/BannerCarousel";
import { HomeCategoryTiles } from "@/components/public/HomeCategoryTiles";
import { HomeFeaturedProperties } from "@/components/public/HomeFeaturedProperties";
import { HomeFeaturedProjects } from "@/components/public/HomeFeaturedProjects";
import { HomeRecentlyViewed } from "@/components/public/HomeRecentlyViewed";
import { HomeRoleCards } from "@/components/public/HomeRoleCards";
import { HomeHowItWorks } from "@/components/public/HomeHowItWorks";
import { HomeTrust } from "@/components/public/HomeTrust";

export const metadata: Metadata = {
  title: "Find your next property in Gujarat",
  description:
    "Verified property, plot and project listings from owners, brokers and builders across Ahmedabad, Surat, Vadodara, Rajkot and beyond.",
};

export default async function HomePage() {
  const [profile, featured, banners] = await Promise.all([
    getCurrentProfile(),
    getHomeFeatured(),
    getPublicBanners(),
  ]);

  return (
    <PublicLayout profile={profile}>
      <HomeHeroSearch />
      <BannerCarousel banners={banners} />
      <HomeCategoryTiles />
      <HomeFeaturedProperties items={featured.properties} />
      <HomeFeaturedProjects items={featured.projects} />
      <HomeRecentlyViewed />
      <HomeRoleCards profile={profile} />
      <HomeHowItWorks />
      <HomeTrust />
    </PublicLayout>
  );
}
