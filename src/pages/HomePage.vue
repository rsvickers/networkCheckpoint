<template>
  <div class="container-fluid">
    <section class="row p-4">
      <div class="col-md-9 col-12 mb-4">
        <div v-for="post in posts" :key="post.id">
          <PostCard :post="post" />
        </div>
      </div>
      <div class="col-md-2">

      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js"
import { postsService } from "../services/PostsService.js"
import PostCard from "../components/PostCard.vue";

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
  components: { PostCard }
}
</script>

<style scoped lang="scss"></style>
