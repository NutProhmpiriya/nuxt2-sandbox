<template>
    <a-layout-header style="background: #fff; padding: 0">
        <a-row>
            <a-col span="12"> </a-col>
            <a-col span="12" class="d-flex justify-content-end align-items-center" style="height: 64px">
                <h6 style="margin-right: 1rem">{{ user.displayName }}</h6>
                <a-avatar style="margin-right: 2rem" :src="user.photoURL" :size="40" />
            </a-col>
        </a-row>
    </a-layout-header>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'HeaderBar',
    computed: {
        user() {
            if (process.client) {
                const getuser = localStorage.getItem('user')
                const user = getuser ? JSON.parse(getuser) : null
                return {
                    uid: user.uid || null,
                    email: user.email || null,
                    displayName: user.displayName || null,
                    photoURL: user.photoURL || null,
                }
            }
            return {
                uid: null,
                email: null,
                displayName: null,
                photoURL: null,
            }
        },
    },
})
</script>
