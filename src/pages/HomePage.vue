<template>
  <div class="container-fluid">
    <section class="row p-4">
      <div class="col-12 col-md-9 d-flex align-items-center p-2">

        <button data-bs-toggle="modal" data-bs-target="#newPostModal" class="btn btn-outline-success ms-2">Post
          Something!</button>
      </div>
    </section>
    <section class="row">

      <div class="col-md-9 col-12 mb-4">
        <div v-for="post in posts" :key="post.id">
          <PostCard :post="post" />
        </div>
      </div>
    </section>
    <div class="col-md-2">

    </div>
  </div>
  <PostForm />
</template>

<script>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js"
import { postsService } from "../services/PostsService.js"
import PostCard from "../components/PostCard.vue";
import PostForm from "../components/PostForm.vue";

export default {
  setup() {
    onMounted(() => {
      getPosts();
    });
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    return {
      posts: computed(() => AppState.posts)
    };
  },
  components: { PostCard, PostForm }
}
</script>

<style scoped lang="scss"></style>
