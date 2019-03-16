import { shallowMount , createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import AmountInput from '@/components/AmountInput.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)

const item = {
  id: 453,
  menu_id: 312,
  amount: 2,
  consumers: [
    {
      user_id: 115
    },
    {
      user_id: 868
    }
  ]
}

const auth = {
  currentUser: {
    displayName: 'Wut Manintu',
    uid: 868
  }
}

const wrapper = shallowMount(AmountInput, {
  localVue: localVue,
  propsData: { item }
})

wrapper.setData({ auth: auth })

describe('Item.vue', () => {
  // RENDER
  it('renders a vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
  it('renders props.item.amount when passed', () => {
    expect(wrapper.text()).toMatch('2')
  })
  // METHOD
  it('method findExistingConsumer', () => {
    let value = wrapper.vm.findExistingConsumer()
    expect(value.user_id).toEqual(868)
  })
  it('method createNewConsumerPayload', () => {
    let received = wrapper.vm.createNewConsumerPayload()
    let expected = {
      item_id: 453,
      menu_id: 312,
      user_id: 868,
      user_display_name: 'Wut Manintu',
      amount: 1
    }
    expect(expected).toEqual(received)
  })
  it('method createUpdateConsumerPayload', () => {
    let received = wrapper.vm.createUpdateConsumerPayload('add', '1DEnqj1i2312')
    let expected = {
      item_id: 453,
      menu_id: 312,
      user_id: 868,
      user_display_name: 'Wut Manintu',
      consumerId: '1DEnqj1i2312',
      type: 'add'
    }
    expect(expected).toEqual(received)
  })
})
