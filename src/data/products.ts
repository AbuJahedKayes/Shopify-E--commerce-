import { Product, ReviewItem, ThemeConfig } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'relaxed-cargo-pant',
    name: 'Relaxed Cargo Pant',
    category: 'bottoms',
    price: 90,
    originalPrice: 105,
    description: 'Engineered from a durable nylon & organic cotton blend, these relaxed cargo pants deliver practical versatility with clean, tailored utility.',
    fabricDetails: '65% Organic Cotton, 35% Recycled Ripstop Nylon. Garment washed for vintage texture.',
    sustainabilityNote: 'Produced in a zero-water-waste facility with 100% biodegradable packaging.',
    images: [
      'https://framerusercontent.com/images/f9LjWGzjp8nAa1evQ71cZ34p3yw.jpg?width=1024&height=1024',
      'https://framerusercontent.com/images/SKmBtppOakLoLedvrDemoHvV490.jpg?width=1024&height=1024',
      'https://framerusercontent.com/images/6IZyxJ6TK98MIOu88mTa2lULU.jpg?width=1024&height=1024'
    ],
    colors: [
      { name: 'Earth Earth', hex: '#4A3129' },
      { name: 'Sand Khaki', hex: '#E3DBCF' },
      { name: 'Moss Green', hex: '#3B4D3C' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isBestseller: true,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 42
  },
  {
    id: 'prod-2',
    slug: 'structure-hoodie',
    name: 'Structure Hoodie',
    category: 'outerwear',
    price: 85,
    description: 'Crafted with 100% GOTS certified heavyweight organic cotton. Designed for quiet structure, warmth, and timeless daily comfort.',
    fabricDetails: '450GSM Heavyweight Organic French Terry. Pre-shrunk twice for structured drape.',
    sustainabilityNote: 'Colored using natural non-toxic plant dyes and certified organic washing.',
    images: [
      'https://framerusercontent.com/images/OmhBDxY9PwbcFKQC9G9ROns4.jpg?width=1024&height=1024',
      'https://framerusercontent.com/images/k7BsAiqgCrWCf7k5Ihnk39eZlTM.jpg?width=1024&height=1024',
      'https://framerusercontent.com/images/yr7I2sfr7urDkjknwzZ6fZWhcvg.jpg?width=1024&height=1024'
    ],
    colors: [
      { name: 'Warm Taupe', hex: '#4A3129' },
      { name: 'Stone Grey', hex: '#D2C8BE' },
      { name: 'Charcoal', hex: '#2A2421' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isBestseller: true,
    isNewArrival: true,
    rating: 5.0,
    reviewsCount: 68
  },
  {
    id: 'prod-3',
    slug: 'heavyweight-box-tee',
    name: 'Heavyweight Box Tee',
    category: 'tees',
    price: 35,
    description: 'An ultra-soft 280GSM organic cotton boxy fit tee with reinforced collar stitching and a natural, breathable drape.',
    fabricDetails: '100% GOTS Certified Combed Ring-Spun Organic Cotton.',
    sustainabilityNote: 'Made in Portugal under ethical fair-wage labor standards.',
    images: [
      'https://framerusercontent.com/images/Fdd4DjBsFGTEtApEGwOM0x4bI9Y.jpg?width=1024&height=1024',
      'https://framerusercontent.com/images/o7NwA5FOauXteiOoqfbaB0mhQ.jpg?width=1024&height=1024',
      'https://framerusercontent.com/images/NikhnnbgCUnjUZJKMAxHFWsx4s.jpg?width=1024&height=1024'
    ],
    colors: [
      { name: 'Natural Oatmeal', hex: '#F4F1EB' },
      { name: 'Dark Bark', hex: '#4A3129' },
      { name: 'Olive Shadow', hex: '#585246' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isBestseller: true,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 94
  },
  {
    id: 'prod-4',
    slug: 'technical-overshirt',
    name: 'Technical Overshirt',
    category: 'outerwear',
    price: 110,
    originalPrice: 130,
    description: 'Flawless utility meets minimal design. The matte weather-resistant fabric protects from light elements while keeping a tailored drape.',
    fabricDetails: 'Recycled technical weave with Fluorocarbon-free water-repellent finish.',
    sustainabilityNote: '100% Recycled polyester lining and eco-friendly horn buttons.',
    images: [
      'https://framerusercontent.com/images/opNkgPwrgDRQGIZt2LtiLwJDJOw.jpg?width=1024&height=1024',
      'https://framerusercontent.com/images/tSL1OJhAx2z70VYljYCtKYfTLww.jpg?width=1024&height=1024',
      'https://framerusercontent.com/images/DXO2YC6gtRDRqDCqLrDnjx0.jpg?width=1024&height=1024'
    ],
    colors: [
      { name: 'Deep Earth', hex: '#4A3129' },
      { name: 'Clay Sand', hex: '#E3DBCF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 31
  },
  {
    id: 'prod-5',
    slug: 'organic-pocket-tee',
    name: 'Organic Pocket Tee',
    category: 'tees',
    price: 40,
    description: 'Classic crewneck pocket tee made with unbleached organic cotton in earthy stone and sage tones.',
    fabricDetails: '220GSM Organic Cotton Slub. Soft hand feel.',
    sustainabilityNote: 'No chemical bleach or synthetic pesticides used during cultivation.',
    images: [
      'https://framerusercontent.com/images/XwFp99rmbkoVig8B4fYpHQXv3Ec.jpg?width=1024&height=1024',
      'https://framerusercontent.com/images/wYpHRI3br76achV9q1v5mvt3NhI.jpg?width=1024&height=1024'
    ],
    colors: [
      { name: 'Raw Ochre', hex: '#C29B7F' },
      { name: 'Cream Light', hex: '#F4F1EB' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isNewArrival: true,
    rating: 4.7,
    reviewsCount: 22
  },
  {
    id: 'prod-6',
    slug: 'pleated-linen-trouser',
    name: 'Pleated Linen Trouser',
    category: 'bottoms',
    price: 95,
    description: 'Breathable Belgian flax linen trousers featuring subtle front pleats and a relaxed tapered silhouette.',
    fabricDetails: '100% Sustainable Linen. Softened through bio-wash process.',
    sustainabilityNote: 'Linen requires zero artificial irrigation and absorbs high carbon dioxide during growth.',
    images: [
      'https://framerusercontent.com/images/wALODyyP6YbbLSPSyEBUhBZXaM.jpg?width=1024&height=1024'
    ],
    colors: [
      { name: 'Stone Brown', hex: '#4A3129' },
      { name: 'Natural Linen', hex: '#E3DBCF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 18
  },
  {
    id: 'prod-7',
    slug: 'minimalist-field-jacket',
    name: 'Minimalist Field Jacket',
    category: 'outerwear',
    price: 140,
    description: 'Tailored slow-fashion field jacket with hidden brass snaps and storm flap for multi-season layering.',
    fabricDetails: 'Heavyweight Cotton Canvas with brushed surface.',
    sustainabilityNote: '1-year seam warranty and free lifetime repair program.',
    images: [
      'https://framerusercontent.com/images/QJLFRObcvZEbZfw5OGdM4pfVvA.jpg?width=1024&height=1024'
    ],
    colors: [
      { name: 'Moss Umber', hex: '#4A3129' }
    ],
    sizes: ['M', 'L', 'XL'],
    isNewArrival: true,
    rating: 5.0,
    reviewsCount: 14
  },
  {
    id: 'prod-8',
    slug: 'earth-tone-beanie',
    name: 'Earth-Tone Beanie',
    category: 'headwear',
    price: 30,
    description: 'Ribbed knit cap made from ethically harvested merino wool for subtle warmth and natural tactile texture.',
    fabricDetails: '100% Extra-fine Merino Wool.',
    sustainabilityNote: 'Mulesing-free wool certification with natural thermal regulation.',
    images: [
      'https://framerusercontent.com/images/swUHqoOP3z5TLiz6epymKaI92Q.jpg?width=1024&height=1024'
    ],
    colors: [
      { name: 'Earthy Brown', hex: '#4A3129' },
      { name: 'Oatmeal', hex: '#E3DBCF' }
    ],
    sizes: ['One Size'],
    rating: 4.8,
    reviewsCount: 29
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'David M.',
    role: 'Verified Buyer',
    content: '"Flawless utility meets minimal design. The matte fabric resists the elements while maintaining a clean, tailored drape. An essential layer for everyday wear."',
    rating: 5,
    verified: true,
    productSlug: 'technical-overshirt'
  },
  {
    id: 'rev-2',
    author: 'Elena R.',
    role: 'Verified Buyer',
    content: '"The weight of the organic cotton in the Structure Hoodie is unlike anything I\'ve owned before. It holds its shape perfectly and the earthy tones look so elevated."',
    rating: 5,
    verified: true,
    productSlug: 'structure-hoodie'
  },
  {
    id: 'rev-3',
    author: 'Marcus K.',
    role: 'Verified Buyer',
    content: '"AK-27 gets slow fashion right. The Cargo Pants are incredibly durable yet soft, and knowing they\'re made sustainably makes wearing them feel even better."',
    rating: 5,
    verified: true,
    productSlug: 'relaxed-cargo-pant'
  }
];

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  companyName: 'AK-27 Clothing Co.',
  shortName: 'AK-27',
  copyrightText: '© 2026 AK-27 Clothing Co. All rights reserved',
  heroHeadline: 'NEW ARRIVALS',
  heroSubheadline: 'Curated earth tones and organic textures. Built for the season ahead.',
  
  // Soft as Moss
  ethosTitle: 'Soft as Moss.\nDurable as Stone.',
  ethosDescription: 'We reject the temporary. In a world of fast trends, we choose the slow path. AK-27 is built on a foundation of earth-toned essentials, crafted from organic fibers designed to weather the seasons with you. Quiet luxury isn\'t about the price tag — it\'s about the feeling of wearing something real.',
  ethosVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-working-on-a-garment-41527-large.mp4',
  ethosPosterUrl: 'https://framerusercontent.com/images/3uqRbV20AhgCM9RWfHvD3FlrKFE.jpg?width=960&height=1440',
  
  // Built for the Journey
  journeyTitle: 'BUILT FOR THE JOURNEY',
  journeySubtitle: 'Purpose-built garments designed to move with you across landscapes and seasons. Quiet aesthetics, maximal durability.',
  journeyVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-walking-on-a-forest-path-during-autumn-41523-large.mp4',
  journeyPosterUrl: 'https://framerusercontent.com/images/6IZyxJ6TK98MIOu88mTa2lULU.jpg?width=1024&height=1024',
  
  // Category images
  categories: [
    {
      id: 'tees',
      title: 'TEES',
      subtitle: 'Organic cotton essential tops',
      image: 'https://framerusercontent.com/images/XwFp99rmbkoVig8B4fYpHQXv3Ec.jpg?width=1024&height=1024'
    },
    {
      id: 'bottoms',
      title: 'BOTTOMS',
      subtitle: 'Cargo pants & linen trousers',
      image: 'https://framerusercontent.com/images/wALODyyP6YbbLSPSyEBUhBZXaM.jpg?width=1024&height=1024'
    },
    {
      id: 'outerwear',
      title: 'OUTERWEAR',
      subtitle: 'Technical overshirts & field jackets',
      image: 'https://framerusercontent.com/images/QJLFRObcvZEbZfw5OGdM4pfVvA.jpg?width=1024&height=1024'
    },
    {
      id: 'headwear',
      title: 'HEADWEAR',
      subtitle: 'Merino wool ribbed caps',
      image: 'https://framerusercontent.com/images/swUHqoOP3z5TLiz6epymKaI92Q.jpg?width=1024&height=1024'
    },
    {
      id: 'new-arrivals',
      title: 'NEW ARRIVALS',
      subtitle: 'Latest organic releases',
      image: 'https://framerusercontent.com/images/opNkgPwrgDRQGIZt2LtiLwJDJOw.jpg?width=1024&height=1024'
    }
  ],
  
  // Conscious Metrics
  consciousMetrics: [
    {
      id: 'metric-1',
      value: '0g',
      title: '0g Plastic in Packaging',
      subtitle: 'The Zero-Waste Equation.',
      description: 'We\'ve subtracted plastic entirely, delivering your garments in 100% biodegradable materials for an unboxing as clean as our conscience.'
    },
    {
      id: 'metric-2',
      value: '100%',
      title: '100% GOTS Certified Cotton',
      subtitle: 'The Pure Provenance.',
      description: 'Sourced without compromise, our GOTS-certified fibers ensure a breathable luxury that respects both your skin and the health of the soil.'
    },
    {
      id: 'metric-3',
      value: '1 yr',
      title: '1 Year Warranty on Seams',
      subtitle: 'The Promise of Longevity.',
      description: 'True luxury is durability. We back the structural integrity of every seam for a full year, ensuring your investment stands the test of time.'
    }
  ]
};

