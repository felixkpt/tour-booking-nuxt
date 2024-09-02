import { it, expect, describe, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ToursList from '~/components/Tours/List.vue'
import { RouterLinkStub } from '@vue/test-utils'

// Mock tours data
const mockTours = [
  {
    id: 1,
    name: 'Tour A',
    description: 'Description for Tour A',
    price: 100,
    slots: 10,
    featured_image: 'http://example.com/tour-a.jpg',
    image_slides: [],
  },
  {
    id: 2,
    name: 'Tour B',
    description: 'Description for Tour B',
    price: 150,
    slots: 5,
    featured_image: 'http://example.com/tour-b.jpg',
    image_slides: [],
  },
]

describe('ToursList.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(ToursList, {
      props: {
        tours: mockTours,
        title: 'TravelMate - Discover Your Next Adventure',
        description: 'TravelMate offers a wide range of tours to exciting destinations.',
      },
      global: {
        stubs: {
          'nuxt-link': RouterLinkStub,
        },
      },
    })
  })

  it('renders title and description', () => {
    expect(wrapper.html()).toContain('TravelMate - Discover Your Next Adventure')
    expect(wrapper.html()).toContain('TravelMate offers a wide range of tours to exciting destinations.')
  })

  it('renders a list of tours', () => {
    expect(wrapper.html()).toContain('Tour A')
    expect(wrapper.html()).toContain('Description for Tour A')
    expect(wrapper.html()).toContain('Tour B')
    expect(wrapper.html()).toContain('Description for Tour B')
  })

})
