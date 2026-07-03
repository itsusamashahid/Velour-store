import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { COLORS } from "@/lib/tokens";
import { getIcon } from "@/lib/icons";
import Plate from "@/components/Plate";
import ProductCard from "@/components/ProductCard";
import TrustRow from "@/components/TrustRow";
import Testimonials from "@/components/Testimonials";

export const revalidate = 60; // refresh product data every minute

export default async function HomePage() {
  const { data: categories } = await supabase.from("categories").select("*");
  const { data: products } = await supabase.from("products").select("*, categories(*)");

  const cats = categories || [];
  const all = products || [];
  const featured = all.filter((p) => p.badge === "Bestseller").slice(0, 4);
  const arrivals = all.filter((p) => p.badge === "New").concat(all.slice(0, 4)).slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-6 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest px-2 py-1 rounded" style={{ color: COLORS.accent, backgroundColor: `${COLORS.accent}14` }}>
            {cats.length} collections · {all.length}+ fragrances
          </span>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl leading-[0.95] mt-4" style={{ color: COLORS.ink }}>
            Fragrance, refined for you, your home, and your car.
          </h1>
          <p className="text-base mt-4 max-w-md" style={{ color: COLORS.muted }}>
            Inspired perfumes, luxury body wash, and car fragrances — crafted to last, delivered nationwide with Cash on Delivery.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <Link href="/shop" className="font-semibold text-sm text-white px-6 py-3 rounded-full hover:opacity-90" style={{ backgroundColor: COLORS.accent }}>
              Explore the collection
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {cats.slice(0, 4).map((c) => {
            const Icon = getIcon(c.icon);
            return <Plate key={c.id} icon={Icon} color={c.color} iconSize={34} className="h-32 rounded-2xl" />;
          })}
        </div>
      </div>

      {/* CATEGORY GRID */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="font-display font-bold text-3xl mb-6" style={{ color: COLORS.ink }}>Shop by category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cats.map((c) => {
            const Icon = getIcon(c.icon);
            const count = all.filter((p) => p.category_id === c.id).length;
            return (
              <Link
                key={c.id}
                href={`/shop?category=${c.id}`}
                className="text-left rounded-xl border bg-white p-4 flex flex-col gap-3 hover:-translate-y-0.5 transition-transform"
                style={{ borderTop: `4px solid ${c.color}`, borderLeftColor: COLORS.line, borderRightColor: COLORS.line, borderBottomColor: COLORS.line }}
              >
                <span className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${c.color}1f` }}>
                  <Icon size={20} color={c.color} />
                </span>
                <div>
                  <div className="font-semibold text-sm" style={{ color: COLORS.ink }}>{c.name}</div>
                  <div className="font-mono text-xs mt-0.5" style={{ color: COLORS.muted }}>{count} products</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <TrustRow />

      {featured.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-3xl" style={{ color: COLORS.ink }}>Bestsellers</h2>
            <Link href="/shop" className="text-sm font-medium flex items-center gap-1" style={{ color: COLORS.accent }}>
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}

      <div className="w-full" style={{ backgroundColor: COLORS.deep }}>
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-3xl text-white">Up to 20% off Body Wash & Shower Gel</h3>
            <p className="text-sm text-white/60 mt-1">Limited-time pricing on our signature bath collection.</p>
          </div>
          <Link href="/shop?category=bodywash" className="font-semibold text-sm px-6 py-3 rounded-full shrink-0" style={{ backgroundColor: COLORS.accent, color: "#fff" }}>
            Shop the deal
          </Link>
        </div>
      </div>

      {arrivals.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="font-display font-bold text-3xl mb-6" style={{ color: COLORS.ink }}>New arrivals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {arrivals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}

      <Testimonials />
    </div>
  );
}
