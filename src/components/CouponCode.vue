<template>
    <div>
        <input type="text" class="coupon-code" v-model="code" @input="validate">

        <p v-if="valid">
            Coupon Redeemed: {{ message }}
        </p>
        <p v-else>
            Invalid Coupon Code
        </p>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                code: '',

                // below should be performed via an axios call; overridden in tests.
                coupons: [
//                    {
//                        code: '50OFF',
//                        message: '50% Off!',
//                        discount: 50
//                    },
//                    {
//                        code: 'FREE',
//                        message: 'Entirely Free',
//                        discount: 100
//                    }
                ],
                valid: false
            }
        },
        computed: {
            selectedCoupon() {
                return this.coupons.find(coupon => coupon.code === this.code);
            },
            message() {
                return this.selectedCoupon.message;
            }
        },
        methods: {
            validate() {
                this.valid = !! this.selectedCoupon;
//                this.valid = this.coupons.map(coupon => coupon.code).includes(this.code);

                if (this.valid) {
                    this.$emit('applied', this.selectedCoupon.discount);
                }
            }
        }
    }
</script>