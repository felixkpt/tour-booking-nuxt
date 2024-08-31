// server/tours/index.js
export default defineEventHandler((event) => {
    return [
      {
        id: 1,
        name: 'City Tour',
        description: 'Explore the city',
        price: 50,
        slots: 10,
        featured_image: 'https://picsum.photos/seed/city/400/300',
        image_slides: [
          'https://picsum.photos/seed/city1/400/300',
          'https://picsum.photos/seed/city2/400/300',
          'https://picsum.photos/seed/city3/400/300',
          'https://picsum.photos/seed/city2/400/300',
        ],
      },
      {
        id: 2,
        name: 'Mountain Adventure',
        description: 'Hiking and camping',
        price: 150,
        slots: 5,
        featured_image: 'https://picsum.photos/seed/mountain/400/300',
        image_slides: [
          'https://picsum.photos/seed/mountain2/400/300',
          'https://picsum.photos/seed/mountain1/400/300',
          'https://picsum.photos/seed/mountain2/400/300',
          'https://picsum.photos/seed/mountain3/400/300'
        ],
      },
      {
        id: 3,
        name: 'Beach Escape',
        description: 'Relax at the beach',
        price: 100,
        slots: 20,
        featured_image: 'https://picsum.photos/seed/beach/400/300',
        image_slides: [
          'https://picsum.photos/seed/beach1/400/300',
          'https://picsum.photos/seed/beach2/400/300',
          'https://picsum.photos/seed/beach3/400/300',
          'https://picsum.photos/seed/beach1/400/300',
        ],
      },
      {
        id: 4,
        name: 'Cultural Heritage',
        description: 'Visit historical sites',
        price: 80,
        slots: 15,
        featured_image: 'https://picsum.photos/seed/culture/400/300',
        image_slides: [
          'https://picsum.photos/seed/culture2/400/300',
          'https://picsum.photos/seed/culture1/400/300',
          'https://picsum.photos/seed/culture2/400/300',
          'https://picsum.photos/seed/culture3/400/300'
        ],
      },
      {
        id: 5,
        name: 'Safari Tour',
        description: 'Wildlife and nature',
        price: 200,
        slots: 8,
        featured_image: 'https://picsum.photos/seed/safari/400/300',
        image_slides: [
          'https://picsum.photos/seed/safari1/400/300',
          'https://picsum.photos/seed/safari2/400/300',
          'https://picsum.photos/seed/safari1/400/300',
          'https://picsum.photos/seed/safari3/400/300'
        ],
      },
      {
        id: 6,
        name: 'Food Tasting',
        description: 'Experience local cuisine',
        price: 70,
        slots: 12,
        featured_image: 'https://picsum.photos/seed/food/400/300',
        image_slides: [
          'https://picsum.photos/seed/food1/400/300',
          'https://picsum.photos/seed/food2/400/300',
          'https://picsum.photos/seed/food1/400/300',
          'https://picsum.photos/seed/food3/400/300'
        ],
      },
      {
        id: 7,
        name: 'Nightlife Experience',
        description: 'Explore the nightlife',
        price: 60,
        slots: 18,
        featured_image: 'https://picsum.photos/seed/nightlife/400/300',
        image_slides: [
          'https://picsum.photos/seed/nightlife1/400/300',
          'https://picsum.photos/seed/nightlife2/400/300',
          'https://picsum.photos/seed/nightlife1/400/300',
          'https://picsum.photos/seed/nightlife3/400/300'
        ],
      },
      {
        id: 8,
        name: 'Art & Museums',
        description: 'Visit art galleries and museums',
        price: 90,
        slots: 10,
        featured_image: 'https://picsum.photos/seed/art/400/300',
        image_slides: [
          'https://picsum.photos/seed/art1/400/300',
          'https://picsum.photos/seed/art2/400/300',
          'https://picsum.photos/seed/art1/400/300',
          'https://picsum.photos/seed/art3/400/300'
        ],
      },
      {
        id: 9,
        name: 'River Cruise',
        description: 'Cruise along the river',
        price: 120,
        slots: 7,
        featured_image: 'https://picsum.photos/seed/river/400/300',
        image_slides: [
          'https://picsum.photos/seed/river1/400/300',
          'https://picsum.photos/seed/river2/400/300',
          'https://picsum.photos/seed/river1/400/300',
          'https://picsum.photos/seed/river3/400/300'
        ],
      },
      {
        id: 10,
        name: 'Wine Tasting',
        description: 'Visit vineyards and taste wines',
        price: 110,
        slots: 9,
        featured_image: 'https://picsum.photos/seed/wine/400/300',
        image_slides: [
          'https://picsum.photos/seed/wine1/400/300',
          'https://picsum.photos/seed/wine2/400/300',
          'https://picsum.photos/seed/wine1/400/300',
          'https://picsum.photos/seed/wine3/400/300'
        ],
      },
    ];
  });
  