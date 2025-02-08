import {
    Leaf,
    FlameKindling,
    CircleAlert,
    Heart,
    CircleDot,
    Shell,
    Coffee,
    Sandwich,
    Star,
    BadgeAlert,
    Apple,
    CircleCheck
} from 'lucide-vue-next';

export const dietaryIcons = [
    { icon: Leaf, color: 'bg-green-500', textColor: 'text-green-700', label: 'vegetarian' },
    { icon: Apple, color: 'bg-emerald-500', textColor: 'text-emerald-700', label: 'vegan' },
    { icon: CircleCheck, color: 'bg-amber-500', textColor: 'text-amber-700', label: 'gluten_free' },
    { icon: Sandwich, color: 'bg-red-700', textColor: 'text-red-700', label: 'contains_meat' },
    { icon: Shell, color: 'bg-blue-500', textColor: 'text-blue-700', label: 'contains_seafood' },
    { icon: FlameKindling, color: 'bg-orange-500', textColor: 'text-orange-700', label: 'spicy' },
    { icon: Coffee, color: 'bg-cyan-500', textColor: 'text-cyan-700', label: 'contains_dairy' },
    { icon: CircleDot, color: 'bg-yellow-500', textColor: 'text-yellow-700', label: 'contains_eggs' },
    { icon: Heart, color: 'bg-rose-500', textColor: 'text-rose-700', label: 'heart_healthy' },
    { icon: CircleAlert, color: 'bg-brown-500', textColor: 'text-brown-700', label: 'contains_nuts' },
    { icon: BadgeAlert, color: 'bg-purple-500', textColor: 'text-purple-700', label: 'common_allergens' },
    { icon: Star, color: 'bg-teal-500', textColor: 'text-teal-700', label: 'halal' }
] as const