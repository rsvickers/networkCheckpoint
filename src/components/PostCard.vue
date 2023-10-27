<template>
    <div class="component">
        <section class="p-3 row rounded bg-light shadow  borderStyle">
            <div class="col-12 mb-3 d-flex ">
                <img class="avatar rounded-circle" :src="post.creator.picture" :alt="post.creator.name">
                <p><b>{{ post.creator.name }}</b></p>
                <p v-if="post.creator.graduated"><i class="mdi mdi-account-school"></i></p>
                <p v-else></p>
                <div>
                    <p>{{ post.createdAt.toLocaleTimeString() }}</p>
                </div>
            </div>
            <div>
                <p>{{ post.body }}</p>
                <img v-if="post.imgUrl" :src="post.imgUrl" alt="">
                <p v-else></p>
            </div>
        </section>

    </div>
</template>


<script>
// import { AppState } from '../AppState';
// import { computed, reactive, onMounted } from 'vue';
import { Post } from '../models/Post.js';
export default {
    props: {
        post: { type: Post, required: true },
    },
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped>
.avatar {
    height: 13vh;
    width: 13vh;
    object-fit: cover;
    object-position: center;
}

.borderStyle {
    border: 3px solid rgba(73, 73, 73, 0.651);
}

img {
    height: 50vh;
    width: 70%;
    object-fit: cover;
    object-position: center;
}
</style>