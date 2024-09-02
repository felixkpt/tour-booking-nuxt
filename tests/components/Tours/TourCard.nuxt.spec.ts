import { describe, it, beforeEach, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { RouterLinkStub } from '@vue/test-utils'
import TourCard from '~/components/Tours/TourCard.vue'

// Mock tour data
const mockTour = {
  id: 1,
  name: 'Tour A',
  description: 'Description for Tour A',
  price: 100,
  slots: 10,
  featured_image: 'http://example.com/tour-a.jpg',
  image_slides: [],
}

describe('TourCard.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(TourCard, {
      props: {
        tour: mockTour,
      },
      global: {
        stubs: {
          'nuxt-link': RouterLinkStub,
        },
      },
    })
  })

  it('renders tour details correctly', () => {
    expect(wrapper.find('h2').text()).toBe(mockTour.name)
    expect(wrapper.find('p').text()).toContain(mockTour.description)
    expect(wrapper.html()).toContain(`Price: $${mockTour.price}`)
    expect(wrapper.html()).toContain(`Slots Available: ${mockTour.slots}`)
  })

  it('renders the featured image correctly', () => {
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(mockTour.featured_image)
    expect(img.attributes('alt')).toBe(mockTour.name)
  })

  it('renders the correct link for the tour', () => {
    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.props().to).toBe(`/tours/${mockTour.id}`)
  })
})
