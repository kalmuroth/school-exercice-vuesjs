import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'
Vue.use(Vuex)

// realtime firebase
fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
    let postsArray = []

    snapshot.forEach(doc => {
        let post = doc.data()
        post.id = doc.id

        postsArray.push(post)
    })

    store.commit('setPosts', postsArray)
})

const store = new Vuex.Store({
    state: {
        userProfile: {},
        posts: [],
        updateUserProfile:{},
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val
        },
        updateUserProfile(state, val) {
            state.userProfile.name = val
        },
        setPerformingRequest(state, val) {
            state.performingRequest = val
        },
        setPosts(state, val) {
            state.posts = val
        }
    },
    actions: {
        async login({ dispatch }, form) {
            // sign user in
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
        },
        async signup({ dispatch }, form) {
            // sign user up
            const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

            // create user object in userCollections
            await fb.usersCollection.doc(user.uid).set({
                name: form.name,
                userName: "user" + form.name
            })

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
        },
        async fetchUserProfile({ commit }, user) {
            // fetch user profile
            const userProfile = await fb.usersCollection.doc(user.uid).get()

            // set user profile in state
            commit('setUserProfile', userProfile.data())

            // change route to dashboard
            if (router.currentRoute.path === '/login') {
                router.push('/')
            }
        },
        async logout({ commit }) {
            // log user out
            await fb.auth.signOut()

            // clear user data from state
            commit('setUserProfile', {})

            // redirect to login view
            router.push('/login')
        },
        async createPost({ state }, post) {
            // create post in firebase
            await fb.postsCollection.add({
                createdOn: new Date(),
                content: post.content,
                userId: fb.auth.currentUser.uid,
                userName: state.userProfile.name,
                comments: 0,
                likes: 0
            })
        },
        async likePost(post, likes) {
            const userId = fb.auth.currentUser.uid
            const docId = `${userId}_${likes.id}`

            // check if user has liked post
            const doc = await fb.likesCollection.doc(docId).get()
            if (doc.exists) { 
                fb.postsCollection.doc(likes.id).update({
                    likes: likes.likesCount - 1
                })
                await fb.likesCollection.doc(docId).delete({
                    postId: likes.id,
                    userId: userId
                })
                return }

            // create post
            await fb.likesCollection.doc(docId).set({
                postId: likes.id,
                userId: userId
            })

            // update post likes count
            fb.postsCollection.doc(likes.id).update({
                likes: likes.likesCount + 1
            })
        },
        async updateProfile({ dispatch, commit }, user) {
            const userId = fb.auth.currentUser.uid
                // update user object

            dispatch('fetchUserProfile', { uid: userId })

            // update all posts by user
            const postDocs = await fb.postsCollection.where('userId', '==', userId).get()
            postDocs.forEach(doc => {
                fb.postsCollection.doc(doc.id).update({
                    userName: user.name
                })
            })

            // update username
            commit('updateUserProfile', user.name)
            fb.usersCollection.doc(userId).update({
                name: user.name
            })

            // update all comments by user
            const commentDocs = await fb.commentsCollection.where('userId', '==', userId).get()
            commentDocs.forEach(doc => {
                fb.commentsCollection.doc(doc.id).update({
                    userName: user.name
                })
            })
        }
    }
})

export default store