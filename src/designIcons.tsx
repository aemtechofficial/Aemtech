import {
  BookOpen,
  CreditCard,
  Crown,
  Diamond,
  Eye,
  FileText,
  Frame,
  Gem,
  Globe,
  ListChecks,
  Mail,
  MapPin,
  MessageCircle,
  Paintbrush,
  PenTool,
  Phone,
  Rocket,
  Search,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Wand2,
  Zap,
  BarChart3,
  Pencil,
  LineChart,
  GraduationCap,
  Flame,
  Calendar,
  Clock,
  type LucideIcon,
} from 'lucide-react';

/* ═══════════════════════════════════════
   AEMTECH — DESIGN SYSTEM ICONS
   Centralised replacement for emoji glyphs.
   ═══════════════════════════════════════ */

export const designIcons: Record<string, LucideIcon> = {
  // Service icons (glyph characters used in serviceData)
  '✺': PenTool,
  '◈': Frame,
  '♕': Crown,
  '▣': ShoppingBag,
  '✦': Sparkles,
  '◇': Diamond,
  '⌕': Search,
  '↗': TrendingUp,
  '✧': Star,
  '⚡': Zap,
  '🛡': Shield,

  // Process steps
  '🎯': Target,
  '📋': ListChecks,
  '🎨': Paintbrush,
  '🚀': Rocket,

  // Journey / timeline
  '📚': BookOpen,
  '🌍': Globe,
  '💎': Gem,

  // Contact / misc
  '✉': Mail,
  '📞': Phone,
  '💬': MessageCircle,
  '📍': MapPin,
  '🛡️': ShieldCheck,
  '⏱': Clock,
  '📅': Calendar,
  '🔒': CreditCard,
  '✓': ShieldCheck,
  '🧑‍💼': PenTool,
  '💰': CreditCard,
  '✨': Wand2,
  '💀': Eye,
  '🔥': Flame,
  '📝': FileText,
  '🔭': Eye,
  '🗺': Globe,
  '⭐': Star,
  '🌟': Star,
  '📈': TrendingUp,

  // Numeric / Why-us
  '01': Target,
  '02': Pencil,
  '03': LineChart,
};

/* Named helpers to make JSX cleaner */
export const ServiceIcon = designIcons;
export const SectionIcons = { BookOpen, CreditCard, Crown, Diamond, Eye, FileText, Frame, Gem, Globe, GraduationCap, LineChart, ListChecks, Mail, MapPin, MessageCircle, Paintbrush, Pencil, PenTool, Phone, Rocket, Search, Shield, ShieldCheck, ShoppingBag, Sparkles, Star, Target, TrendingUp, Trophy, Wand2, Zap, BarChart3 };

/* Utility wrapper to simplify usage */
export function Icon({ name, size = 20, className = '', style }: { name: string; size?: number; className?: string; style?: React.CSSProperties }) {
  const IconComp = designIcons[name] || Sparkles;
  return <IconComp size={size} className={className} style={style} aria-hidden />;
}
