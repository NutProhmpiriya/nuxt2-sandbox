export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'nuxt2-sandbox',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            // <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
            {
                rel: 'stylesheet',
                href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
                integrity: 'sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM',
                crossorigin:"anonymous"
            }
        ],
        script: [
//             <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS" crossorigin="anonymous"></script>
            {
                src: "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js",
                integrity: "sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r",
                crossorigin: "anonymous",
                async: true
            },
            {
                src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js",
                integrity: "sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS",
                crossorigin: "anonymous",
                async: true
            }

        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['ant-design-vue/dist/antd.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/antd-ui',
        '@/plugins/firebaseV9'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    env: {
        FIREBASE_API_KEY: "AIzaSyACuMBT6IFMu-bsg1dKbPyjr6BhoB2oCS4",
        FIREBASE_AUTH_DOMAIN: "n2p-sandbox.firebaseapp.com",
        FIREBASE_PROJECT_ID: "n2p-sandbox",
        FIREBASE_STORAGE_BUCKET: "n2p-sandbox.appspot.com",
        FIREBASE_MESSAGEING_SENDER_ID: "745257279549",
        FIREBASE_APP_ID: "1:745257279549:web:2eafaba1bbb8f029110a54",
        FIEBASE_MEASUREMENT_ID: "G-9QD7YNF3MK"
    },
    plubicRuntimeConfig: {},
    privateRuntimeConfig: {

    },
}
