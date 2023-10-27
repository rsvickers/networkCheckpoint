<template>
    <div class="container-fluid">
        <section class="row p-5">
            <div v-if="profile">
                <div class="col-8">
                    <img class="cover-img rounded shadow" :src="profile.coverImg" alt="">
                    <div class="d-flex align-items-center p-3">
                        <img class="profile-img shadow" :src="profile.picture" alt="">
                        <p v-if="profile.graduated"><i class="fs-1 mdi mdi-account-school"></i></p>
                        <p v-else></p>
                    </div>
                    <div>
                        <h3>{{ profile.class }}</h3>
                        <h1> {{ profile.name }}</h1>
                        <p>{{ profile.bio }}</p>
                    </div>
                    <a v-if="profile.github != ''" :href="profile.github" :title="`${profile.name}'s GitHub'`"><i
                            class="mdi fs-1 mdi-github"></i></a>
                    <a v-if="profile.linkedin != ''" :href="profile.github" :title="`${profile.name}'s LinkedIn'`"><i
                            class="mdi fs-1 mdi-linkedin"></i></a>
                    <a v-if="profile.resume != ''" :href="profile.resume" :title="`${profile.name}'s Resume'`"><i
                            class="mdi fs-1 mdi-file-outline"></i></a>
                </div>
                <div>

                </div>
            </div>
            <div v-else>
                <div class="col-8">Loading Profile....</div>
            </div>
        </section>

        <section class="row">
            <div v-for="post in posts" :key="post.id" class="col-8">
                <PostCard :post="post" />
            </div>
        </section>
    </div>
</template>

<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger";
import { profilesService } from "../services/ProfilesService"
import PostCard from "../components/PostCard.vue";
export default {
    setup() {
        onMounted(() => {
            getProfileById();
            getPostsByProfileId();
        });
        const route = useRoute();
        async function getProfileById() {
            try {
                const profileId = route.params.profileId;
                logger.log('profile id:', profileId);
                await profilesService.getProfileById(profileId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getPostsByProfileId() {
            try {
                const profileId = route.params.profileId;
                await profilesService.getPostsByProfileId(profileId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            profile: computed(() => AppState.profile),
            posts: computed(() => AppState.posts)
        };
    },
    components: { PostCard }
};
</script>


<style lang="scss" scoped>
.profile-img {
    height: 25vh;
    width: 25vh;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
}

.cover-img {
    height: 35vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}
</style>