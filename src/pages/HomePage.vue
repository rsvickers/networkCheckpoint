<template>
  <div class="container-fluid">
    <section class="row p-4">
      <div class="col-12 col-md-9 d-flex align-items-center">
        <div v-if="account.id">
          <button data-bs-toggle="modal" data-bs-target="#newPostModal" class="btn btn-outline-success ms-2">Post
            Something!</button>
        </div>
      </div>
    </section>
    <section class="row">

      <div class="col-md-8 col-12 mb-4">
        <div v-for="post in posts" :key="post.id">
          <PostCard :post="post" />

        </div>
      </div>
      <div class="col-md-4">
        <div v-for="ad in ads" :key="ad.title">
          <AdCard :ad="ad" />
        </div>
      </div>
    </section>

  </div>

  <PostForm />


  <section class="row">
    <div class="col-12 d-flex justify-content-between">
      <button :disabled="!newer" class="btn btn-success" @click="changePage(newer)"> 👈 Newer Page</button>
      <button :disabled="!older" class="btn btn-success" @click="changePage(older)"> Older Page 👉 </button>
    </div>
  </section>
  <!-- <PaginationComponent /> -->
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "vue";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js"
import { postsService } from "../services/PostsService.js"
import PostCard from "../components/PostCard.vue";
import PostForm from "../components/PostForm.vue";
import AdCard from "../components/AdCard.vue";
import { adsService } from "../services/AdsService.js";
// import PaginationComponent from "../components/PaginationComponent.vue";

export default {
  setup() {
    const account = ref({})
    watchEffect(() => {
      account.value = AppState.account

    })
    onMounted(() => {
      getPosts();
      getAds();

    });
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error);
      }

    }
    async function getAds() {
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      posts: computed(() => AppState.posts),
      newer: computed(() => AppState.newerPage),
      older: computed(() => AppState.olderPage),
      account,
      ads: computed(() => AppState.ad),

      async changePage(url) {
        try {
          await postsService.changePage(url)
        } catch (error) {
          Pop.error(error)
        }
      }

    };
  },
  components: { PostCard, PostForm, AdCard }
}
</script>

<style scoped lang="scss"></style>
