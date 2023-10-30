<template>
    <div v-if="account" class="modal fade" id="newPostModal" tabindex="-1" aria-labelledby="newPostModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="newBlogModalLabel">New Post Please</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="createPost()">
                        <div>
                            <textarea v-model="form.body" placeholder="Share whats happening..." required maxlength="1000"
                                id="bio" />
                        </div>
                        <div>
                            <input v-model="form.imgUrl" type="url" placeholder="Image URL..." id="imgUrl">
                        </div>

                        <button class="btn btn-primary">Submit</button>
                    </form>
                    <!-- <p @click="editPost()" role="button" class=""><i class="mdi mdi-pencil-circle"></i>Edit</p> -->
                </div>
            </div>
        </div>
    </div>
</template>


<script>
// import { AppState } from '../AppState';
import { computed, ref, watchEffect } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { Modal } from 'bootstrap';
import { AppState } from '../AppState.js';
export default {
    setup() {
        const form = ref({})
        watchEffect(() => {
            // form.value = AppState.posts
        })
        return {
            form,

            async createPost() {
                try {
                    const postData = form.value
                    await postsService.createPost(postData)
                    form.value = {}
                    Modal.getOrCreateInstance('#newPostModal').hide()
                } catch (error) {
                    Pop.error(error)
                }
            },

            async editPost() {
                try {
                    const postData = form.value
                    await postsService.editPost(postData)
                    Modal.getOrCreateInstance('#newPostModal').hide()

                } catch (error) {
                    Pop.error(error)
                }
            },

            account: computed(() => AppState.account)
        }
    }
};
</script>


<style lang="scss" scoped></style>