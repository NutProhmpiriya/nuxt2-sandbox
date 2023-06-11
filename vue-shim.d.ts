import Vue from 'vue'

declare module '*.vue' {
    export default Vue
}

declare global {
    interface Window {
        recaptchaVerifier: any
        confirmationResult: any
    }
}

declare module 'ant-design-vue'
