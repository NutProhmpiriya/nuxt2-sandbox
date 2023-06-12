<template>
    <div class="mt-3">
        <input v-model="content" class="form-control mb-2" />
        <button class="btn btn-warning" @click="updatePost({ ...post, content })">Update</button>
        <button class="btn btn-danger" @click="deletePost(post)">Delete</button>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'

export interface Post {
    id: string
    content: string
}

export default defineComponent({
    name: 'FormRealtimeData',
    props: {
        post: {
            type: Object as PropType<Post>,
            required: true,
        },
    },
    data() {
        return {
            editMode: false,
            content: this.post.content,
        }
    },
    methods: {
        deletePost(post: Post) {
            const { instanceRealtimeDB, realtimeDB } = this.$fireV9
            const { ref, remove } = realtimeDB
            const docRef = ref(instanceRealtimeDB, 'posts/' + post.id)
            remove(docRef)
                .then(() => {
                    this.$success({
                        title: 'Success',
                        content: 'Document successfully deleted!',
                    })
                })
                .catch((error) => {
                    this.$error({
                        title: 'Error',
                        content: 'Error removing document: ' + error,
                    })
                })
        },

        updatePost({ id, content }: Post) {
            const { instanceRealtimeDB, realtimeDB } = this.$fireV9
            const { ref, update } = realtimeDB
            const docRef = ref(instanceRealtimeDB, 'posts/' + id)
            const dataBody = {
                content,
            }
            update(docRef, dataBody)
                .then(() => {
                    this.$success({
                        title: 'Success',
                        content: 'Document successfully updated!',
                    })
                })
                .catch((error) => {
                    this.$error({
                        title: 'Error',
                        content: 'Error updating document: ' + error,
                    })
                })
        },
    },
})
</script>
