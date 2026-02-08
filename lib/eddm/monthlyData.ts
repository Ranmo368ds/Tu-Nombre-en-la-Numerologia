import { MonthlyFlyer } from './types';

// February 2026 - PLACEHOLDER DATA
// Total Slots: 20 businesses (3 filled, 17 AVAILABLE)
const february2026: MonthlyFlyer = {
    month: 'february-2026',
    businesses: [
        // ✅ FILLED SLOTS (3/20)
        {
            id: 'tree-service-1',
            name: 'Elite Tree Service',
            category: 'Tree Service',
            description: 'Professional tree care specialists serving Chicago NW Suburbs for over 15 years. Licensed, insured, and certified arborists. We provide expert tree trimming, removal, stump grinding, and emergency storm damage services. Free estimates and same-day emergency response available.',
            phone: '(847) 555-0101',
            website: 'https://example.com',
            services: [
                'Tree Trimming & Pruning',
                'Tree Removal (Any Size)',
                'Stump Grinding & Removal',
                'Emergency Storm Damage',
                'Tree Health Assessment',
                'Cabling & Bracing',
                'Land Clearing',
                'Firewood Delivery'
            ],
            isPrime: true,
            monthFeatured: 'february-2026',
            rating: 4.9,
            reviewCount: 127,
        },
        {
            id: 'landscaping-1',
            name: 'Green Paradise Landscaping',
            category: 'Landscaping',
            description: 'Transform your outdoor space into a beautiful paradise! We specialize in custom landscape design, installation, and year-round maintenance. From elegant patios to lush gardens, our experienced team brings your vision to life. Serving residential and commercial properties throughout the Northwest Suburbs.',
            phone: '(847) 555-0102',
            services: [
                'Custom Landscape Design',
                'Lawn Installation & Sodding',
                'Garden Bed Design',
                'Patio & Walkway Installation',
                'Retaining Walls',
                'Irrigation Systems',
                'Spring & Fall Cleanup',
                'Weekly Lawn Maintenance',
                'Mulching & Edging',
                'Seasonal Flower Planting'
            ],
            isPrime: false,
            monthFeatured: 'february-2026',
            rating: 4.8,
            reviewCount: 89,
        },
        {
            id: 'roofing-1',
            name: 'Superior Roofing',
            category: 'Roofing',
            description: 'Your trusted roofing experts with 20+ years of excellence! We specialize in residential and commercial roofing installation, repair, and replacement. All work backed by comprehensive warranties. GAF Master Elite Certified. Free roof inspections and detailed estimates. Financing options available.',
            phone: '(847) 555-0103',
            website: 'https://example.com',
            services: [
                'Complete Roof Replacement',
                'Roof Repairs & Leak Detection',
                'Shingle Installation (Asphalt, Metal, Tile)',
                'Flat Roof Systems',
                'Gutter Installation & Repair',
                'Soffit & Fascia Repair',
                'Roof Ventilation',
                'Emergency Roof Tarping',
                'Free Roof Inspections',
                'Insurance Claim Assistance'
            ],
            isPrime: true,
            monthFeatured: 'february-2026',
            rating: 5.0,
            reviewCount: 156,
        },

        // 🔲 EMPTY SLOTS - AVAILABLE FOR BUSINESSES (17/20)
        {
            id: 'slot-4',
            name: '[AVAILABLE SLOT #4]',
            category: 'Landscaping',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
        {
            id: 'slot-5',
            name: '[AVAILABLE SLOT #5]',
            category: 'Roofing',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
        {
            id: 'slot-6',
            name: '[AVAILABLE SLOT #6]',
            category: 'Plumbing',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
        {
            id: 'slot-7',
            name: '[AVAILABLE SLOT #7]',
            category: 'Electrical',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
        {
            id: 'slot-8',
            name: '[AVAILABLE SLOT #8]',
            category: 'Cleaning',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
        {
            id: 'slot-9',
            name: '[AVAILABLE SLOT #9]',
            category: 'Painting',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
        {
            id: 'slot-10',
            name: '[AVAILABLE SLOT #10]',
            category: 'HVAC',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
        {
            id: 'slot-11',
            name: '[AVAILABLE SLOT #11]',
            category: 'Windows & Doors',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
        {
            id: 'slot-12',
            name: '[AVAILABLE SLOT #12]',
            category: 'Landscaping',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
        {
            id: 'slot-13',
            name: '[AVAILABLE SLOT #13]',
            category: 'Tree Service',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
        {
            id: 'slot-14',
            name: '[AVAILABLE SLOT #14]',
            category: 'Pool Service',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
        {
            id: 'slot-15',
            name: '[AVAILABLE SLOT #15]',
            category: 'Fence',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
        {
            id: 'slot-16',
            name: '[AVAILABLE SLOT #16]',
            category: 'Roofing',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
        {
            id: 'slot-17',
            name: '[AVAILABLE SLOT #17]',
            category: 'Cleaning',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
        {
            id: 'slot-18',
            name: '[AVAILABLE SLOT #18]',
            category: 'Electrical',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
        {
            id: 'slot-19',
            name: '[AVAILABLE SLOT #19]',
            category: 'Painting',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
        {
            id: 'slot-20',
            name: '[AVAILABLE SLOT #20]',
            category: 'HVAC',
            description: 'This advertising space is available. Contact us to feature your business here!',
            phone: '(847) XXX-XXXX',
            services: ['Add Your Services'],
            isPrime: false,
            monthFeatured: 'february-2026',
        },
    ],
    educationalContent: [
        {
            id: 'edu-1',
            title: 'Seasonal Flowers - Spring 2026',
            content: 'Discover the best flowers to plant in spring in Illinois.',
            category: 'Landscaping',
        },
        {
            id: 'edu-2',
            title: 'Most Popular Roof Colors 2026',
            content: 'Roofing color trends for this year.',
            category: 'Roofing',
        },
    ],
    games: [
        { type: 'sudoku', title: 'Daily Sudoku', difficulty: 'medium' },
        { type: 'crossword', title: 'Services Crossword', difficulty: 'easy' },
        { type: 'wordsearch', title: 'Word Search', difficulty: 'easy' },
    ],
};

// Database of all monthly flyers
const monthlyDatabase: Record<string, MonthlyFlyer> = {
    'february-2026': february2026,
    // Add more months as needed
};

export function getMonthlyData(month: string): MonthlyFlyer | null {
    return monthlyDatabase[month] || null;
}

export function getArchivedMonths(): string[] {
    return Object.keys(monthlyDatabase).sort().reverse();
}

export function getCurrentMonth(): string {
    const now = new Date();
    const monthNames = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    return `${month}-${year}`;
}
