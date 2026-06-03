import {
  Layout,
  Layers,
  ShoppingCart,
  Briefcase,
  Code,
  Palette,
  Rocket,
  Gauge,
  Search,
  Smartphone,
  PenTool,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  layout: Layout,
  layers: Layers,
  'shopping-cart': ShoppingCart,
  briefcase: Briefcase,
  code: Code,
  palette: Palette,
  rocket: Rocket,
  gauge: Gauge,
  search: Search,
  smartphone: Smartphone,
  'pen-tool': PenTool,
  sparkles: Sparkles,
}

export function ServiceIcon({ name, className }: { name?: string | null; className?: string }) {
  const Icon = (name && map[name]) || Sparkles
  return <Icon className={className} />
}
