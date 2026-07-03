import { COLORS } from "@/lib/tokens";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-display font-extrabold text-4xl mb-4" style={{ color: COLORS.ink }}>About Velour</h1>
      <p className="text-sm leading-relaxed" style={{ color: COLORS.muted }}>
        Velour is a fragrance house for Pakistan — inspired perfumes, luxury body wash, and car
        fragrances, all delivered nationwide with Cash on Delivery. Edit this page's text anytime
        in app/about/page.js.
      </p>
    </div>
  );
}
