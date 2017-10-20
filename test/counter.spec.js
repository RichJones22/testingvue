import { mount } from 'vue-test-utils';
import Counter from '../src/components/Counter.vue';
import expect from 'expect';

describe ('Counter', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Counter);
    });

    it ('defaults to a count of 0', () => {
        expect(wrapper.vm.count).toBe(0);
    });

    // tests underlying logic.
    it ('increments the count when the increment button is clicked', () => {
        wrapper.setData({ count: 0});

        wrapper.find('.increment').trigger('click');

        expect(wrapper.vm.count).toBe(1);
    });

    it ('decrements the count when the decrement button is clicked', () => {
        expect(wrapper.vm.count).toBe(0);

        wrapper.find('.increment').trigger('click');
        wrapper.find('.increment').trigger('click');

        wrapper.find('.decrement').trigger('click');

        expect(wrapper.vm.count).toBe(1);
    });

    it ('never goes below 0', () => {
        expect(wrapper.vm.count).toBe(0);

        expect(wrapper.find('.decrement').hasStyle('display', 'none')).toBe(true);

        wrapper.find('.increment').trigger('click');

        expect(wrapper.find('.decrement').hasStyle('display', 'none')).toBe(false);
    });

    // tests what is presented to the user; check the dom.
    it ('presents the current count', () => {
        expect(wrapper.find('.count').html()).toContain(0);

        wrapper.find('button').trigger('click');

        expect(wrapper.find('.count').html()).toContain(1);
    });
});