import { it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import App from '~/app.vue'

it('renders a list of tours', async () => {
  const mockTours = [
    {
      id: 1,
      name: 'Tour A',
      description: 'Description for Tour A',
      price: '$100',
      slots: 10,
    },
    {
      id: 2,
      name: 'Tour B',
      description: 'Description for Tour B',
      price: '$150',
      slots: 5,
    },
  ]

  const component = await mountSuspended(App, {
    route: '/test',
    mocks: {
      $axios: {
        $get: () => Promise.resolve(mockTours),
      },
    },
  })

  expect(component.html()).toContain('Available Tours')
  expect(component.html()).toContain('Tour A')
  expect(component.html()).toContain('Description for Tour A')
  expect(component.html()).toContain('Tour B')
  expect(component.html()).toContain('Description for Tour B')
})
