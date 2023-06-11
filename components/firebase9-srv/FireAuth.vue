<template>
    <a-tabs tab-position="top">
        <a-tab-pane key="Manual" tab="FireAuth Manual">
            <FireAuthManual />
        </a-tab-pane>
        <a-tab-pane key="Ui" tab="FireAuth Ui">
            <FireAuthUi />
        </a-tab-pane>
    </a-tabs>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'FireAuth',
    components: {
        FireAuthManual: () => import('./FireAuthManual.vue'),
        FireAuthUi: () => import('./FireAuthUi.vue'),
    },
    data: () => ({
        currentTab: 'fireAuth',
    }),
})
</script>
