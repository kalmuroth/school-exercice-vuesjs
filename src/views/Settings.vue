<template>
  <section id="settings">
    <div class="col1">
      <h3>Compte</h3>
      <p>Mettre à jour votre profil</p>
      <form @submit.prevent>
        <label for="name">Speudo</label>
        <input v-model.trim="name" type="text" :placeholder="userProfile.name" id="name" />

        <button @click="updateProfile()" class="button">Mise à jour</button>

        <transition name="fade">
        <p v-if="showSuccess" class="success">Profil à jour</p>
        <p v-if="showError" class="error">Nom de profil invalide</p>
      </transition>
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
      showSuccess: false,
      showError: false
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

      if(this.name == ''){
        this.showError = true
      }
      else{
        this.showSuccess = true
      }

      this.name = ''

      setTimeout(() => {
        this.showSuccess = false
        this.showError = false
      }, 2000)
    }
  }
}
</script>
