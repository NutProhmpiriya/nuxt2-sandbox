<template>
    <a-layout-sider>
        <div class="logo" />
        <a-menu theme="dark" :default-selected-keys="defaultSelectedKeys" mode="inline" @click="handleClickMenu">
            <a-menu-item key="home">
                <a-icon type="pie-chart" />
                <span>Home</span>
            </a-menu-item>
            <a-menu-item key="firebaseV9">
                <a-icon type="pie-chart" />
                <span>Firebase V9 Srv.</span>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'LeftSiderBar',
    data() {
        return {
            collapsed: false,
            defaultSelectedKeys: (() => {
                if (this.$route.path === '/') {
                    return ['home']
                }
                if (this.$route.path === '/firebaseV9-srv') {
                    return ['firebaseV9']
                }
            })(),
        }
    },
    watch: {
        $route(value: any) {
            if (value.path === '/') {
                this.defaultSelectedKeys = ['home']
            } else if (value.path === '/firebaseV9-srv') {
                this.defaultSelectedKeys = ['firebaseV9']
            }
        },
    },
    methods: {
        handleClickMenu(event: any) {
            switch (event.key) {
                case 'home':
                    this.$router.push('/')
                    break
                case 'firebaseV9':
                    this.$router.push('/firebaseV9-srv')
                    break
                default:
                    break
            }
        },
    },
})
</script>

<style>
.logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
}
</style>
