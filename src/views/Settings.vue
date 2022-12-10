<template>
  <section id="settings">
    <div class="col1">
      <h3>Compte</h3>
      <p>Mettre à jour votre profil</p>

      <transition name="fade">
        <p v-if="showSuccess" class="success">Profil à jour</p>
      </transition>

      <form @submit.prevent>
        <label for="name">Speudo</label>
        <input v-model.trim="name" type="text" :placeholder="userProfile.name" id="name" />

        <button @click="updateProfile()" class="button">Mise à jour</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      name: '',
      showSuccess: false
    }
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('updateProfile', {
        name: this.name !== '' ? this.name : this.userProfile.name
      })

      this.name = ''

      this.showSuccess = true

      setTimeout(() => {
        this.showSuccess = false
      }, 2000)
    }
  }
}
</script>
