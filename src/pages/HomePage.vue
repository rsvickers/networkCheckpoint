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


  <section class="row">
    <div class="col-12 d-flex justify-content-between">
      <button class="btn btn-success" @click="changePage(newer)"> 👈 Newer Page</button>
      <button class="btn btn-success" @click="changePage(older)"> Older Page 👉 </button>
    </div>
  </section>
  <!-- <PaginationComponent /> -->
</template>

<script>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js"
import { postsService } from "../services/PostsService.js"
import PostCard from "../components/PostCard.vue";
import PostForm from "../components/PostForm.vue";
// import PaginationComponent from "../components/PaginationComponent.vue";

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
      posts: computed(() => AppState.posts),
      newer: computed(() => AppState.newerPage),
      older: computed(() => AppState.olderPage),
      account: computed(() => AppState.account),

      async changePage(url) {
        try {
          await postsService.changePage(url)
        } catch (error) {
          Pop.error(error)
        }
      }

    };
  },
  components: { PostCard, PostForm, }
}
</script>

<style scoped lang="scss"></style>
