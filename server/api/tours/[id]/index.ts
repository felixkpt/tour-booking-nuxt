// server/api/tours/tour/[id]/index.ts
export default defineEventHandler((event) => {
    {

        return {
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
        }
    }
})