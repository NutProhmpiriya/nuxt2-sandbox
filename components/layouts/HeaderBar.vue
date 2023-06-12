<template>
    <a-layout-header style="background: #fff; padding: 0">
        <a-row>
            <a-col span="12"> </a-col>
            <a-col span="12" class="d-flex justify-content-end align-items-center" style="height: 64px">
                <h6 style="margin-right: 1rem">{{ currentUser.email }}</h6>
                <a-avatar style="margin-right: 2rem" :src="currentUser.photoURL" :size="40" />
            </a-col>
        </a-row>
    </a-layout-header>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'HeaderBar',
    computed: {
        currentUser() {
            const user = this.$store.getters['auth/user']
            return {
                uid: user?.uid,
                email: user?.email,
                displayName: user?.displayName,
                photoURL: user?.photoURL,
            }
        },
    },
})
</script>
