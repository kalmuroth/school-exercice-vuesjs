<template>
  <div id="dashboard">
    <transition name="fade">
      <CommentModal v-if="showCommentModal" :post="selectedPost" @close="toggleCommentModal()"></CommentModal>
    </transition>
    <section>
      <div v-if="connected" class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <div class="create-post">
            <p>Poster un message</p>
            <form @submit.prevent>
              <textarea v-model.trim="post.content"></textarea>
              <button @click="createPost()" :disabled="post.content === ''" class="button">Poster</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <div v-if="posts.length">
          <div v-for="post in posts" :key="post.id" class="post">
            <h5>{{ post.userName }}</h5>
            <span>{{ post.createdOn | formatDate }}</span>
            <p>{{ post.content | trimLength }}</p>
            <ul>
              <li v-if="connected"><a @click="toggleCommentModal(post)">Commentaire {{ post.comments }}</a></li>
              <li v-if="connected"><a @click="likePost(post.id, post.likes)">Likes {{ post.likes }}</a></li>
              <li v-if="connected"><a @click="viewPost(post)">Plus de détail</a></li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p class="no-results">Personne n'a encore posté de message</p>
        </div>
      </div>
    </section>

    <!-- full post modal -->
    <transition name="fade">
      <div v-if="showPostModal" class="p-modal">
        <div class="p-container">
          <a @click="closePostModal()" class="close">Fermer</a>
          <div class="post">
            <h5>{{ fullPost.userName }}</h5>
            <span>{{ fullPost.createdOn | formatDate }}</span>
            <p>{{ fullPost.content }}</p>
            <ul>
              <li><a>Commentaire {{ fullPost.comments }}</a></li>
              <li><a>Likes {{ fullPost.likes }}</a></li>
            </ul>
          </div>
          <div v-show="postComments.length" class="comments">
            <div v-for="comment in postComments" :key="comment.id" class="comment">
              <p>{{ comment.userName }}</p>
              <span>{{ comment.createdOn | formatDate }}</span>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { commentsCollection } from '@/firebase'
import { mapState } from 'vuex'
import moment from 'moment'
import CommentModal from '@/components/CommentModal'

export default {
  components: {
    CommentModal
  },
  data() {
    return {
      post: {
        content: ''
      },
      showCommentModal: false,
      selectedPost: {},
      showPostModal: false,
      fullPost: {},
      postComments: []
    }
  },
  computed: {
    ...mapState(['userProfile', 'posts']),
    connected() {
      return Object.keys(this.userProfile).length > 1
    }
  },
  methods: {
    createPost() {
      this.$store.dispatch('createPost', { content: this.post.content })
      this.post.content = ''
    },
    toggleCommentModal(post) {
      this.showCommentModal = !this.showCommentModal

      if (this.showCommentModal) {
        this.selectedPost = post
      } else {
        this.selectedPost = {}
      }
    },
    likePost(id, likesCount) {
      this.$store.dispatch('likePost', { id, likesCount })
    },
    async viewPost(post) {
      const docs = await commentsCollection.where('postId', '==', post.id).get()

      docs.forEach(doc => {
        let comment = doc.data()
        comment.id = doc.id
        this.postComments.push(comment)
      })

      this.fullPost = post
      this.showPostModal = true
    },
    closePostModal() {
      this.postComments = []
      this.showPostModal = false
    }
  },
  filters: {
    formatDate(val) {
      if (!val) { return '-' }

      let date = val.toDate()
      return moment(date).locale('fr').fromNow()
    },
    trimLength(val) {
      if (val.length < 200) { return val }
      return `${val.substring(0, 200)}...`
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
