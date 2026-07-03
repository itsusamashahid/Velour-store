import { COLORS } from "@/lib/tokens";
import Stars from "./Stars";

const TESTIMONIALS = [
  { name: "Ahmed Khan", text: "The oud and amber scent lasts the whole day. Packaging feels genuinely premium for the price.", rating: 5 },
  { name: "Fatima Ali", text: "Ordered a gift box for my sister's birthday — beautifully presented, and it arrived right on time.", rating: 5 },
  { name: "Bilal Hussain", text: "The car diffuser is subtle, not overpowering like most. Refill scent lasts nearly a month.", rating: 4 },
  { name: "Sana Malik", text: "Rose & musk is now my everyday fragrance. COD made it an easy first purchase to trust.", rating: 5 },
  { name: "Usman Tariq", text: "Body wash smells like a proper spa product, not a drugstore one. Will reorder.", rating: 4 },
  { name: "Ayesha Siddiqui", text: "Support replied on WhatsApp within minutes when I asked about scent notes before buying.", rating: 5 },
];

export default function Testimonials() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="font-display font-bold text-3xl mb-1" style={{ color: COLORS.ink }}>What our customers are saying</h2>
      <p className="text-sm mb-8" style={{ color: COLORS.muted }}>Real feedback from customers across Pakistan</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="p-5 rounded-xl border bg-white flex flex-col gap-3" style={{ borderColor: COLORS.line }}>
            <Stars rating={t.rating} />
            <p className="text-sm leading-relaxed" style={{ color: COLORS.ink }}>"{t.text}"</p>
            <div className="flex items-center gap-2 mt-auto pt-1">
              <div className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs text-white" style={{ backgroundColor: COLORS.accent }}>
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <span className="text-sm font-medium" style={{ color: COLORS.ink }}>{t.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
