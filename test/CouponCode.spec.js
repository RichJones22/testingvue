import { mount } from 'vue-test-utils';
import expect from 'expect';
import CouponCode from '../src/components/CouponCode.vue';

describe('CouponCode', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(CouponCode);

        // this is performed via an axios call in the .vue component, but here we use this as a fixture of sorts...
        wrapper.setData({
            coupons: [
                {
                    code: '50OFF',
                    message: '50% Off!',
                    discount: 50
                },
            ]
        });
    });

    it ('accepts a coupon code', () => {
        expect(wrapper.contains('input.coupon-code')).toBe(true);
    });

    it ('validates a real coupon-code', () => {
        enterCouponCode('50OFF');

        expect(wrapper.html()).toContain('Coupon Redeemed: 50% Off!');
    });

    it ('validates a fake coupon-code', () => {
        enterCouponCode('FAKE');

        expect(wrapper.html()).toContain('Invalid Coupon Code');
    });

    it ('broadcasts the percentage discount when a valid coupon code is applied', () => {

        // below are two techniques; one if you want to test via the ui and
        // a second, if you want to just test the methods themselves...

        // - you can just use one or the other; or both...
        // - the second technique locks you to the code; you are forced to change 'code' if it
        //   changes.
        // - the first technique does not...

        // ui technique; here we go through the ui
        enterCouponCode('50OFF');

        // method technique; here we just exercise the methods.
        wrapper.setData({
           code: '50OFF'
        });

        wrapper.vm.validate();


        expect(wrapper.emitted().applied).toBeTruthy();
        expect(wrapper.emitted().applied[0]).toEqual([50]);
    });

    function enterCouponCode(code) {
        let couponCode = wrapper.find('.coupon-code');

        couponCode.element.value = code;
        couponCode.trigger('input');

    }

});