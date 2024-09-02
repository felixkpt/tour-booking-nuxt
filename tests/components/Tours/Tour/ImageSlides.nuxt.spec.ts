// tests/components/Tours/Tour/ImageSlides.nuxt.spec.ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ImageSlides from '~/components/Tours/Tour/ImageSlides.vue'

describe('ImageSlides.vue', () => {
    const imageSlides = [
        'path/to/image1.jpg',
        'path/to/image2.jpg',
        'path/to/image3.jpg',
    ]

    it('renders the component correctly', () => {
        const wrapper = mount(ImageSlides, {
            props: { imageSlides },
        })

        // Ensure the component renders
        expect(wrapper.exists()).toBe(true)

        // Check that all images are rendered correctly
        const images = wrapper.findAll('img')
        expect(images.length).toBe(imageSlides.length)
        images.forEach((img, index) => {
            expect(img.attributes('src')).toBe(imageSlides[index])
        })
    })

    it('shows the correct initial slide', () => {
        const wrapper = mount(ImageSlides, {
            props: { imageSlides },
        })

        // The first slide should be active initially
        const firstSlide = wrapper.find('.carousel-slide.active')
        expect(firstSlide.exists()).toBe(true)
        expect(firstSlide.find('img').attributes('src')).toBe(imageSlides[0])
    })

    it('cycles to the next slide when the next button is clicked', async () => {
        const wrapper = mount(ImageSlides, {
            props: { imageSlides },
        })

        const nextButton = wrapper.find('button[aria-label="next"]')

        if (!nextButton.exists()) {
            throw new Error('Next button not found')
        }

        await nextButton.trigger('click')

        const secondSlide = wrapper.find('.carousel-slide.active')
        expect(secondSlide.exists()).toBe(true)
        expect(secondSlide.find('img').attributes('src')).toBe(imageSlides[1])
    })

    it('cycles to the previous slide when the prev button is clicked', async () => {
        const wrapper = mount(ImageSlides, {
            props: { imageSlides },
        })

        const prevButton = wrapper.find('button[aria-label="prev"]')

        if (!prevButton.exists()) {
            throw new Error('Prev button not found')
        }

        await prevButton.trigger('click')

        const lastSlide = wrapper.find('.carousel-slide.active')
        expect(lastSlide.exists()).toBe(true)
        expect(lastSlide.find('img').attributes('src')).toBe(imageSlides[imageSlides.length - 1])
    })
})
