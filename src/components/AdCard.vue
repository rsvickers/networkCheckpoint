<template>
    <div class="p-3">
        <img :src="ad.tall" alt="">
    </div>
</template>


<script>
import { Promotion } from '../models/Promotion.js';
// import { AppState } from '../AppState';
// import { computed, reactive, onMounted } from 'vue';
export default {
    props: {
        ad: { type: Promotion, required: true },
    },
    setup() {
        return {

        }
    }
};
</script>


<style lang="scss" scoped></style>