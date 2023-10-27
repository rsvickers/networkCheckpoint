<template>
    <section class="row">
        <div class="col-12 d-flex justify-content-between">
            <button class="btn btn-success" @click="changePage(newer - 1)"> 👈 Newer Page</button>

            <button class="btn btn-success" @click="changePage(older + 1)"> Older Page 👉 </button>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed } from 'vue';
import { postsService } from '../services/PostsService.js';
export default {
    setup() {
        return {
            newer: computed(() => AppState.newer),
            older: computed(() => AppState.older),
            searchQuery: computed(() => AppState.searchQuery),
            async changePage(pageNumber) {
                const endpointUrl = `api/posts?page=${pageNumber}`
                await postsService.changePage(endpointUrl)
                // api/posts?page=2
            }
        }
    }
};
</script>


<style lang="scss" scoped></style>