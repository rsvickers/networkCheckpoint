<template>
    <div class="container-fluid">
        <section class="row">
            <div class="col-12 p-4">
                <h1>Search Profiles</h1>
            </div>
            <div class="col-12 p-4">
                <form @submit.prevent="getProfilesWithSearchQuery()">
                    <div class="mb-3">
                        <label for="profile" class="form-label">Search Profiles...</label>
                        <input v-model="form" type="text" class="form-control" id="profile">
                        <button class="btn btn-primary" type="submit">Submit <i class="mdi mdi-magnify"></i></button>
                    </div>
                </form>
            </div>
        </section>
        <section class="row">
            <div v-for="profile in profiles" :key="profile.id" class="col-12">
                <ProfileResultsPage :profile="profile" />
            </div>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop';
import { profilesService } from '../services/ProfilesService.js';
import ProfileResultsPage from '../components/ProfileResultsPage.vue';

export default {
    setup() {
        const form = ref('');
        return {
            form,
            profiles: computed(() => AppState.profile),
            // profiles: computed(() => AppState.profiles),
            async getProfilesWithSearchQuery() {
                try {
                    const searchQuery = form.value;
                    await profilesService.getProfilesWithSearchQuery(searchQuery);
                }
                catch (error) {
                    Pop.error(error);
                }
            }
        };
    },
    components: { ProfileResultsPage }
};
</script>


<style lang="scss" scoped></style>