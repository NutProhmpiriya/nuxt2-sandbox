<template>
    <a-layout id="components-layout-demo-custom-trigger" class="a-layout">
        <LeftSiderBar />
        <a-layout>
            <HeaderBar />
            <a-layout-content
                :style="{
                    margin: '24px 16px',
                    padding: '24px',
                    background: '#fff',
                    minHeight: '280px',
                }"
            >
                <nuxt />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'DefaultLayout',
    components: {
        HeaderBar: () => import('@/components/layouts/HeaderBar.vue'),
        LeftSiderBar: () => import('@/components/layouts/LeftSiderBar.vue'),
    },

    mounted() {
        const reuslt = this.$store.getters['auth/user']
        if (!reuslt) {
            const getUserLocal = localStorage.getItem('user')
            const praseUsr = getUserLocal ? JSON.parse(getUserLocal) : null
            if (praseUsr) {
                this.$store.dispatch('auth/setUser', praseUsr)
            }
        }
    },
})
</script>

<style scoped>
.a-layout {
    min-height: 100vh;
}
</style>
