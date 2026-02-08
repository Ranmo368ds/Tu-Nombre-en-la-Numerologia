export interface Category {
    id: string;
    name: string;
    icon: string;
}

export const CATEGORIES: Category[] = [
    { id: 'all', name: 'All', icon: '🏠' },
    { id: 'landscaping', name: 'Landscaping', icon: '🌿' },
    { id: 'roofing', name: 'Roofing', icon: '🏠' },
    { id: 'tree-service', name: 'Tree Service', icon: '🌳' },
    { id: 'pool-service', name: 'Pool Service', icon: '🏊' },
    { id: 'hvac', name: 'HVAC', icon: '❄️' },
    { id: 'windows-doors', name: 'Windows & Doors', icon: '🚪' },
    { id: 'painting', name: 'Painting', icon: '🎨' },
    { id: 'electrical', name: 'Electrical', icon: '⚡' },
    { id: 'plumbing', name: 'Plumbing', icon: '🔧' },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹' },
];

export function filterByCategory(
    businesses: Business[],
    categoryId: string
): Business[] {
    if (categoryId === 'all') {
        return businesses;
    }

    return businesses.filter(business =>
        business.category.toLowerCase().replace(/\s+/g, '-') === categoryId
    );
}

export function getCategoryById(id: string): Category | undefined {
    return CATEGORIES.find(cat => cat.id === id);
}

import { Business } from './types';
