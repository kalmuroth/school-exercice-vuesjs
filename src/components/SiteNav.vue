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
          <li>
            <router-link to="/settings">Option</router-link>
          </li>
          <li><a @click="logout()">Déconnexion</a></li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
