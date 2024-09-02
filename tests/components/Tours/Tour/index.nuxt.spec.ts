// tests/components/Tours/Tour/index.nuxt.spec.ts
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import Tour from '~/components/Tours/Tour/index.vue';
import type { TourType } from '~/types/tours';

// Mock data for the tour
const mockTour: TourType = {
    name: 'Sample Tour',
    description: 'This is a sample tour description.',
    featured_image: '/path/to/featured_image.jpg',
    price: 100,
    slots: 10,
    image_slides: [
        '/path/to/image1.jpg',
        '/path/to/image2.jpg',
        '/path/to/image3.jpg',
    ],
};

describe('Tour.vue', () => {
    it('renders the tour featured_image and name correctly', () => {
        const wrapper = mount(Tour, {
            props: { tour: mockTour },
        });

        // Check if the tour details are rendered
        expect(wrapper.find('img').attributes('src')).toBe(mockTour.featured_image);
        expect(wrapper.find('h1.tour-name').text()).toBe(mockTour.name);
    });

    it('renders the tour description correctly', () => {
        const wrapper = mount(Tour, {
            props: { tour: mockTour },
        });

        // Check if the tour details are rendered
        expect(wrapper.find('p.tour-description').text()).toContain(mockTour.description);
    });

    it('renders the tour Slots Available and "Book Now" button', () => {
        const wrapper = mount(Tour, {
            props: { tour: mockTour },
        });

        // Check if the tour details are rendered
        expect(wrapper.find('p.tour-slots-available').text()).toContain(`Slots Available: ${mockTour.slots}`);
        expect(wrapper.find('button.book-now').text()).toContain(`Book Now`);
    });

    it('emits "bookTour" event when the "Book Now" button is clicked', async () => {
        const wrapper = mount(Tour, {
            props: { tour: mockTour },
        });

        // Trigger the click event on the "Book Now" button
        await wrapper.find('button').trigger('click');

        // Check if the "bookTour" event was emitted
        expect(wrapper.emitted('bookTour')).toBeTruthy();
        expect(wrapper.emitted('bookTour')!.length).toBe(1);
    });
});
