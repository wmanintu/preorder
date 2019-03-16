import { shallowMount , createLocalVue } from '@vue/test-utils'
import Menu from '@/components/Menu.vue'

const localVue = createLocalVue()

const menu = {
  data: {
    name: 'Gas Station',
    desc: 'description',
    timestamp: 'tuesday'
  }
}

const wrapper = shallowMount(Menu, {
  localVue: localVue,
  propsData: { menu }
})

describe('Menu.vue', () => {
  // RENDER
  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
  it('renders props.menu when passed', () => {
    expect(wrapper.find('h1').text()).toMatch('Gas Station')
    expect(wrapper.find('p').text()).toMatch('description')
  })
})
