<template>
  <div class="container-fluid">


    <div class="text-center">
      <img :src="account.coverImg" alt="">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded-circle" :src="account.picture" alt="" />
      <p>{{ account.bio }}</p>
    </div>
    <section class="row">
      <div class="col-12 d-flex justify-content-center text-center">
        <form @submit.prevent="editAccount()">
          <input v-model="form.name" type="text" placeholder="Name" maxlength="100" id="name">
          <input v-model="form.class" type="text" placeholder="class..." maxlength="25" id="class">
          <input v-model="form.picture" type="url" placeholder="URL for Img" maxlength="500" id="picture">
          <input v-model="form.coverImg" type="url" placeholder="Cover Img URL" id="coverImg">
          <input v-model="form.github" type="url" placeholder="Github Url" id="github">
          <input v-model="form.linkedin" type="url" placeholder="LinkedIn Url" id="linkedin">
          <input v-model="form.resume" type="url" placeholder="Resume" id="resume">

          <textarea v-model="form.bio" placeholder="Tell us about yourself" maxlength="1000" id="bio" />
          <button class="btn btn-outline-success">Submit</button>
        </form>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState';
import Pop from "../utils/Pop";
import { accountService } from "../services/AccountService";
export default {
  setup() {
    const form = ref({})
    return {
      form,
      account: computed(() => AppState.account),

      async editAccount() {
        try {
          const accountData = form.value
          await accountService.editAccount(accountData)
        }
        catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
input {
  display: block;
}
</style>