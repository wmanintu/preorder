import { shallowMount } from '@vue/test-utils'
import Item from '@/components/Item.vue'

describe('Item.vue', () => {
  it('renders props.msg when passed', () => {
    const item = {
      item_name: 'Hot Dog'
    }
    const wrapper = shallowMount(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).toMatch('Hot Dog')
  })
})
