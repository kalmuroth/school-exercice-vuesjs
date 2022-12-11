<template>
  <header>
    <section>
      <div class="col1">
        <router-link to="/">
          <h3>MyNetWork</h3>
        </router-link>
        <ul class="inline">
          <li>
            <router-link to="/">Accueil</router-link>
          </li>
          <li v-if="connected">
            <router-link to="/settings">Option</router-link>
          </li>
          <li v-if="connected">
            <a @click="logout()">Déconnexion</a>
          </li>
          <li v-else>
            <router-link to="/login">Connexion</router-link>
          </li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    ...mapState(['userProfile']),
    connected() {
      return Object.keys(this.userProfile).length > 1
    }
  }
}
</script>
