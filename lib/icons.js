import { Wind, Sparkles, Droplet, Gift, Package } from "lucide-react";

export const ICONS = { Wind, Sparkles, Droplet, Gift };

export function getIcon(name) {
  return ICONS[name] || Package;
}
