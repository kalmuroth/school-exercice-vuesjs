<template>
  <div id="app">
    <SiteNav></SiteNav>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SiteNav from '@/components/SiteNav'

export default {
  components: {
    SiteNav
  },
  computed: {
    ...mapState(['userProfile'])
  }
}
</script>
