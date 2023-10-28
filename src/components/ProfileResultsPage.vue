<template>
    <div class="container-fluid">
        <section class="row">

            <div class="col-8">

                <div class="d-flex align-items-center p-3">
                    <router-link :to="{ name: 'Profile', params: { profileId: profile.id } }">
                        <img class="profile-img shadow" :src="profile.picture" alt="">
                    </router-link>
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
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Profile } from '../models/Profile.js';
export default {
    props: {
        profile: { type: Profile, required: true }
    },
    setup() {
        return {

        }
    }
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