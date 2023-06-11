<template>
    <div>
        <h3>FirebaseV9</h3>
        <a-tabs :default-active-key="section" @change="callback">
            <a-tab-pane key="fireAuth" tab="Auth">
                <FireAuth />
            </a-tab-pane>
            <a-tab-pane key="fireStore" tab="Database" force-render>
                <FireStore />
            </a-tab-pane>
            <a-tab-pane key="storeage" tab="Storeage">
                <FireStorage />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'FirebaseV9',
    components: {
        FireAuth: () => import('@/components/firebase9-srv/FireAuth.vue'),
        FireStore: () => import('@/components/firebase9-srv/FireStore.vue'),
        FireStorage: () => import('@/components/firebase9-srv/FireStorage.vue'),
    },
    data: () => ({
        section: 'fireAuth',
    }),
    computed: {
        firebaseConfig() {
            return JSON.stringify(this.$nuxt.context.env, null, 2)
        },
    },
    watch: {
        section() {
            this.$router.replace({ query: { section: this.section } })
        },
    },
    created() {
        if (!this.$route.query.section) {
            this.$router.replace({ query: { section: this.section } })
            return
        }
        this.section = (this.$route.query.section as string) || 'fireAuth'
    },
    methods: {
        callback(key: any) {
            this.section = key
        },
    },
})
</script>
