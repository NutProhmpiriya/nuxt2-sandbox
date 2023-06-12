<template>
    <section>
        <!-- form -->
        <a-form-model layout="inline" :model="formCreate" @submit="createPost" @submit.native.prevent>
            <a-form-model-item>
                <a-input v-model="formCreate.content" placeholder="Post">
                    <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
                </a-input>
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary" html-type="submit" :disabled="formCreate.content === ''">
                    create post
                </a-button>
            </a-form-model-item>
        </a-form-model>
        <pre>{{ dataFocus }}</pre>
        <!-- table getOne, updateOne -->
        <a-table :role-key="(recode) => recode.id" :columns="columns" :data-source="posts">
            <template #operation="id">
                <a href="javascript:;" @click="updatePost">Update</a>
                <a-popconfirm title="Sure to delete ?" @confirm="() => deletePost(id)">
                    <a href="javascript:;">Delete</a>
                </a-popconfirm>
            </template>
        </a-table>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Post',
        dataIndex: 'post',
        key: 'post',
    },
    {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: 'Owner',
        dataIndex: 'owner',
        key: 'owner',
    },
    {
        title: 'operation',
        dataIndex: 'id',
        key: 'operation',
        scopedSlots: {
            customRender: 'operation',
        },
    },
]

type Post = {
    id: string
    post: string
    content: string
    owner: string
}

export default Vue.extend({
    name: 'FireStore',
    data() {
        return {
            posts: [] as Post[],
            formCreate: {
                content: '',
                owner: '',
            },
            formUpdate: {
                id: '',
                name: '',
                email: '',
                phone: '',
            },
            columns,
            dataFocus: {} as Post,
        }
    },

    computed: {
        user() {
            return this.$store.getters['auth/user']
        },
    },

    mounted() {
        this.findManyPost()
        this.listenerDoc()
    },

    methods: {
        async createPost(e: Event) {
            try {
                e.preventDefault()
                const h = this.$createElement

                const bodyData = {
                    post: this.formCreate.content,
                    owner: this.user.uid,
                }

                const { instanceFirestore, fireStore } = this.$fireV9
                const { addDoc, collection } = fireStore
                const docRef = await addDoc(collection(instanceFirestore, 'posts'), bodyData)
                    .then((docRef) => {
                        this.formCreate.content = ''
                        this.findManyPost()
                        return docRef
                    })
                    .catch((error) => {
                        throw new Error(error)
                    })
                this.$info({
                    title: 'Create Post',
                    content: h('div', { style: 'margin-top: 1rem' }, [
                        h('p', {}, 'Post created successfully'),
                        h('p', {}, `ID: ${docRef.id}`),
                    ]),
                })
            } catch (error: any) {
                this.$error({
                    title: 'Create Post',
                    content: error.message,
                })
            }
        },

        async findManyPost() {
            try {
                const { instanceFirestore, fireStore } = this.$fireV9
                const { collection, getDocs } = fireStore
                const querySnapshot = await getDocs(collection(instanceFirestore, 'posts'))

                this.posts = []
                querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    this.posts.push({
                        id: doc.id,
                        post: data.post,
                        content: data.content,
                        owner: data.owner,
                    })
                })
            } catch (error: any) {
                this.$error({
                    title: 'Find Many Post',
                    content: error.message,
                })
            }
        },

        updatePost() {
            try {
                const h = this.$createElement
                this.$info({
                    title: 'Update Post',
                    content: h('div', { style: 'margin-top: 1rem' }, [
                        h('p', {}, 'Post updated successfully'),
                        h('p', {}, `ID: ${this.formUpdate.id}`),
                    ]),
                })
            } catch (error: any) {
                this.$error({
                    title: 'Update Post',
                    content: error.message,
                })
            }
        },

        deletePost(id: string) {
            try {
                const h = this.$createElement
                const { instanceFirestore, fireStore } = this.$fireV9
                const { doc, deleteDoc } = fireStore
                const docRef = doc(instanceFirestore, 'posts', id)
                deleteDoc(docRef)
                    .then(() => {
                        this.$info({
                            title: 'Delete Post',
                            content: h('div', { style: 'margin-top: 1rem' }, [h('p', {}, 'Post deleted successfully')]),
                        })
                        this.findManyPost()
                    })
                    .catch((error) => {
                        throw new Error(error)
                    })
            } catch (error: any) {
                this.$error({
                    title: 'Delete Post',
                    content: error.message,
                })
            }
        },

        async findOne(id = 'BAIj4UkhQHeuyGnZDC4h') {
            try {
                const { instanceFirestore, fireStore } = this.$fireV9
                const { doc, getDoc } = fireStore
                const docRef = doc(instanceFirestore, 'posts', id)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    return {
                        id: docSnap.id,
                        post: docSnap.data().post,
                        content: docSnap.data().content,
                        owner: docSnap.data().owner,
                    }
                } else {
                    throw new Error('No such document!')
                }
            } catch (error: any) {
                this.$error({
                    title: 'Listener Doc',
                    content: error.message,
                })
            }
        },

        listenerDoc() {
            try {
                const { instanceFirestore, fireStore } = this.$fireV9
                const { doc, onSnapshot } = fireStore
                const docRef = doc(instanceFirestore, 'posts', 'BAIj4UkhQHeuyGnZDC4h')
                const unsub = onSnapshot(docRef, (docSnap) => {
                    if (docSnap.exists()) {
                        this.dataFocus = {
                            id: docSnap.id,
                            post: docSnap.data().post,
                            content: docSnap.data().content,
                            owner: docSnap.data().owner,
                        }
                        if (this.dataFocus.post === 'update') {
                            unsub()
                        }
                    } else {
                        throw new Error('No such document!')
                    }
                })
            } catch (error: any) {
                this.$error({
                    title: 'Listener Doc',
                    content: error.message,
                })
            }
        },
    },
})
</script>
