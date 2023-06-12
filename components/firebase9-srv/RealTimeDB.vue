<template>
    <div>
        <h6>RealTime Database</h6>
        <div>
            <input v-model="newPost" class="form-control mb-2" />
            <button class="btn btn-primary" @click="createPost">Create</button>
        </div>

        <div v-for="post in posts" :key="post.id">
            <FormRealtimeData :post="post" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'

export interface Post {
    id: string
    content: string
}

export default Vue.extend({
    name: 'RealTimeDB',
    components: {
        FormRealtimeData: () => import('./FormRealtimeData.vue'),
    },
    data() {
        return {
            posts: null as Post[] | null,
            newPost: '',
        }
    },
    mounted() {
        this.getPosts()
    },

    destroyed() {
        const { instanceRealtimeDB, realtimeDB } = this.$fireV9
        const { ref, off } = realtimeDB
        const docRef = ref(instanceRealtimeDB, 'posts')
        off(docRef)
        console.log('destroyed', 'cancel subscription')
    },

    methods: {
        createPost() {
            const { instanceRealtimeDB, realtimeDB } = this.$fireV9
            const { ref, set } = realtimeDB
            const dataBody = {
                content: this.newPost,
            }
            const docRef = ref(instanceRealtimeDB, 'posts/' + uuidv4())

            set(docRef, dataBody)
                .then(() => {
                    this.$success({
                        title: 'Success',
                        content: 'Document successfully written!',
                    })
                    this.newPost = ''
                })
                .catch((error) => {
                    this.$error({
                        title: 'Error',
                        content: 'Error writing document: ' + error,
                    })
                })
        },

        getPosts() {
            const { instanceRealtimeDB, realtimeDB } = this.$fireV9
            const { ref, onValue } = realtimeDB
            const docRef = ref(instanceRealtimeDB, 'posts')
            onValue(docRef, (snapshot) => {
                const data = snapshot.val()
                const posts = []
                for (const key in data) {
                    posts.push({
                        id: key,
                        ...data[key],
                    })
                }
                this.posts = posts
            })
        },

        getPost(id: string) {
            const { instanceRealtimeDB, realtimeDB } = this.$fireV9
            const { ref, onValue } = realtimeDB
            const docRef = ref(instanceRealtimeDB, 'posts/' + id)
            onValue(docRef, (snapshot) => {
                const data = snapshot.val()
                console.log('data 1', data)
            })
        },
    },
})
</script>

<style scoped></style>
