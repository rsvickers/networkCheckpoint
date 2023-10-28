<template>
    <div class="component">
        <section class="p-3 row rounded bg-light shadow  borderStyle">
            <div class="col-12 mb-3 d-flex ">
                <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
                    <img class="avatar rounded-circle" :src="post.creator.picture" :alt="post.creator.name">
                    <p><b>{{ post.creator.name }}</b></p>
                </router-link>
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
            <div class="d-flex justify-content-between">
                <i class="fs-1 text-danger mdi mdi-heart">{{ post.likes.length }}</i>
                <i v-if="account.id == post.creator.id" @click="removePost()" role="button" title="remove post"
                    class="fs-1 text-danger mdi mdi-delete-circle"></i>
            </div>
        </section>

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import { Post } from '../models/Post.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
export default {
    props: {
        post: { type: Post, required: true },
    },
    setup(props) {
        return {
            account: computed(() => AppState.account),

            async removePost() {
                try {
                    const yes = await Pop.confirm('Are you sure about that?')
                    if (!yes) {
                        return
                    }
                    const postId = props.post.id
                    await postsService.removePost(postId)
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
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