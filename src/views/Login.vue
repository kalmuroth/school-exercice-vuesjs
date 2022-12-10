<template>
  <div id="login">
      <section>
        <div class="col1">
          <h1>MyNetWork</h1>
          <p>Une application web, un mini site de type réseau social</p>
        </div>

        <div :class="{ 'signup-form': !showLoginForm }" class="col2">
          <form v-if="showLoginForm" @submit.prevent>
            <h1>S'identifier</h1>
              <div>
                <label for="email1">Email</label>
                <input v-model.trim="loginForm.email" type="text" placeholder="Adresse E-mail" id="email1" />
              </div>

              <div>
                <label for="password1">Mot de passe</label>
                <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
              </div>

              <button @click="login()" class="button">Connexion</button>
            
              <div class="extras">
                <a @click="toggleForm()">Crée un compte</a>
              </div>
          </form>

          <form v-else @submit.prevent>
            <h1>Inscription</h1>
            <div>
              <label for="name">Speudo</label>
              <input v-model.trim="signupForm.name" type="text" placeholder="Votre Speudo" id="name" />
            </div>
            <div>
              <label for="email2">Email</label>
              <input v-model.trim="signupForm.email" type="text" placeholder="votre@email.com" id="email2" />
            </div>
            <div>
              <label for="password2">Mot de passe</label>
              <input v-model.trim="signupForm.password" type="password" placeholder="minimum 6 caractères" id="password2" />
            </div>
            <button @click="signup()" class="button">Enregistrer</button>
            <div class="extras">
              <a @click="toggleForm()">Revenir à la page d'avant</a>
            </div>
          </form>
        </div>
      </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
    }
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
      })
    }
  }
}
</script>
