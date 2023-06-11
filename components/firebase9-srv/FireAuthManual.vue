<template>
    <section>
        <h3>FireAuth Manual</h3>
        <a-row :gutter="24">
            <a-col :span="8">
                <!-- google -->
                <a-button class="mb-3" type="danger" block @click="() => signinWithPopup('google')">
                    Signin with Gmail and Popup
                </a-button>
                <a-button class="mb-3" type="danger" block @click="() => signinWithRedirect('google')">
                    Signin with Gmail and Redirect
                </a-button>

                <!-- facebook -->
                <a-divider />
                <a-button class="mb-3" type="primary" block @click="() => signinWithPopup('facebook')">
                    Signin with Facebook
                </a-button>
                <a-button class="mb-3" type="primary" block @click="() => signinWithRedirect('facebook')">
                    Signin with Facebook
                </a-button>
                <a-divider />

                <!-- email & password -->
                <a-form-model ref="formSignin" :model="formSignin" :rules="rules">
                    <a-form-model-item ref="email" prop="email">
                        <a-input v-model="formSignin.email" placeholder="Email" />
                    </a-form-model-item>
                    <a-form-model-item ref="password" prop="password">
                        <a-input v-model="formSignin.password" placeholder="Password" />
                    </a-form-model-item>
                    <a-button block class="mb-3" type="primary" @click="signupWithEmailAndPassword">
                        Signup with Email & password
                    </a-button>
                    <a-button block class="mb-3" type="primary" @click="signinWithEmailAndPassword">
                        Signin with Email & password
                    </a-button>
                    <a-button block class="mb-3" type="primary" @click="signOutApp">
                        Signout with Email & password
                    </a-button>
                    <a-button block class="mb-3" type="primary" @click="resetForm"> Reset Form </a-button>
                </a-form-model>

                <!-- Phone Number -->
                <a-divider />
                <h4>Phone Number</h4>
                <a-row>
                    <h6>Recaptcha Type</h6>
                    <pre>{{ recaptchaType }}</pre>
                </a-row>

                <a-radio-group v-model="recaptchaType" class="mb-3">
                    <a-radio value="invisible"> invisible </a-radio>
                    <a-radio value="normal"> normal </a-radio>
                </a-radio-group>

                <a-input v-model="phoneNumber" placeholder="Phone Number" class="mb-3" />
                <a-button class="mb-3" type="primary" block @click="requestOTP"> Request OTP </a-button>
                <a-input v-model="otpCode" placeholder="Phone Number" class="mb-3" />
                <a-button class="mb-3" type="primary" block @click="verifyOTP"> Verify OTP </a-button>
                <a-button class="mb-3" type="primary" block @click="clearSigninPhone"> Clear </a-button>
                <div id="recaptcha-container"></div>
                <a-divider />

                <a-button class="mb-3" block type="primary" @click="signout"> Signout </a-button>
            </a-col>
            <a-col :span="16">
                <h4>Current user</h4>
                <div v-if="currentUser" class="alert alert-primary">
                    <pre>{{ currentUser }}</pre>
                </div>
                <a-divider />
                <div class="d-flex justify-content-between">
                    <h4>Result Authen</h4>
                    <a-button type="danger" @click="clearResult">Clear Result</a-button>
                </div>
                <a-spin v-if="isLoadingResult" size="large" />
                <pre v-if="resultSignIn" class="alert alert-success">{{ resultSignIn }}</pre>
                <pre v-if="reusltSigninError" class="alert alert-danger">{{ reusltSigninError }}</pre>
            </a-col>
        </a-row>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'FireAuthManual',
    components: {},
    data: () => ({
        currentTab: 'fireAuth',
        resultSignIn: '',
        reusltSigninError: '',
        isLoadingResult: false,
        providerSignIn: '',
        formSignin: {
            email: '',
            password: '',
        },
        rules: {
            email: [{ required: true, message: 'Please input email', trigger: 'blur' }],
            password: [{ required: true, message: 'Please input password', trigger: 'blur' }],
        },
        currentUser: '',
        phoneNumber: '',
        otpCode: '',
        recaptchaType: 'invisible',
    }),

    created() {
        this.getResultSignInWithRedirect('created')
    },

    methods: {
        signIn(value: string) {
            alert(value)
        },

        signinWithPopup(providerSignIn: string) {
            this.clearResult()
            const { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } = this.$fireV9.fireAuth
            let providerAuth = null
            if (providerSignIn === 'google') providerAuth = new GoogleAuthProvider()
            if (providerSignIn === 'facebook') providerAuth = new FacebookAuthProvider()
            if (!providerAuth) {
                this.$error({
                    title: 'Error',
                    content: 'Provider not found',
                })
                this.reusltSigninError = 'Provider not found'
                return
            }
            signInWithPopup(this.$fireV9.instanceAuth, providerAuth)
                .then((result) => {
                    this.resultSignIn = JSON.stringify(result, null, 2)
                    this.currentUser = JSON.stringify(this.$fireV9.instanceAuth.currentUser, null, 2)
                    this.setUidUser()
                })
                .catch((error) => {
                    this.reusltSigninError = JSON.stringify(error, null, 2)
                })
        },

        signinWithRedirect(providerSignIn: string) {
            this.clearResult()
            const { signInWithRedirect, GoogleAuthProvider, FacebookAuthProvider } = this.$fireV9.fireAuth

            let providerAuth = null
            if (providerSignIn === 'google') providerAuth = new GoogleAuthProvider()
            if (providerSignIn === 'facebook') providerAuth = new FacebookAuthProvider()
            if (!providerAuth) {
                alert('Provider not found')
                this.reusltSigninError = 'Provider not found'
                return
            }
            signInWithRedirect(this.$fireV9.instanceAuth, providerAuth)
        },

        getResultSignInWithRedirect(status: string) {
            this.isLoadingResult = true

            const { getRedirectResult } = this.$fireV9.fireAuth
            getRedirectResult(this.$fireV9.instanceAuth)
                .then((result) => {
                    if (!result) return
                    this.resultSignIn = JSON.stringify({ result, status }, null, 2)
                    this.currentUser = JSON.stringify(this.$fireV9.instanceAuth.currentUser, null, 2)
                    this.setUidUser()
                })
                .catch((error) => {
                    this.reusltSigninError = JSON.stringify({ error, status }, null, 2)
                })
                .finally(() => {
                    this.isLoadingResult = false
                    this.providerSignIn = ''
                })
        },

        signupWithEmailAndPassword() {
            this.clearResult()
            const { createUserWithEmailAndPassword } = this.$fireV9.fireAuth
            createUserWithEmailAndPassword(this.$fireV9.instanceAuth, this.formSignin.email, this.formSignin.password)
                .then((result) => {
                    this.resultSignIn = JSON.stringify(result, null, 2)
                    this.currentUser = JSON.stringify(this.$fireV9.instanceAuth.currentUser, null, 2)
                })
                .catch((error) => {
                    const h = this.$createElement
                    this.$error({
                        title: 'Error',
                        content: h('pre', { class: 'alert alert-danger' }, JSON.stringify(error, null, 2)),
                    })
                    this.reusltSigninError = JSON.stringify(error, null, 2)
                })
                .finally(() => {
                    // this.resetForm()
                })
        },

        signinWithEmailAndPassword() {
            this.clearResult()
            const { signInWithEmailAndPassword } = this.$fireV9.fireAuth
            signInWithEmailAndPassword(this.$fireV9.instanceAuth, this.formSignin.email, this.formSignin.password)
                .then((result) => {
                    this.resultSignIn = JSON.stringify(result, null, 2)
                    this.currentUser = JSON.stringify(this.$fireV9.instanceAuth.currentUser, null, 2)
                })
                .catch((error) => {
                    this.reusltSigninError = JSON.stringify(error, null, 2)
                })
                .finally(() => {
                    // this.resetForm()
                })
        },

        signOutApp() {
            this.clearResult()
            const { signOut } = this.$fireV9.fireAuth
            signOut(this.$fireV9.instanceAuth)
                .then((result) => {
                    this.resultSignIn = JSON.stringify(result, null, 2)
                })
                .catch((error) => {
                    this.reusltSigninError = JSON.stringify(error, null, 2)
                })
                .finally(() => {
                    // this.resetForm()
                })
        },

        requestOTP() {
            this.clearResult()
            this.$fireV9.instanceAuth.languageCode = 'th'
            const { RecaptchaVerifier } = this.$fireV9.fireAuth
            window.recaptchaVerifier = new RecaptchaVerifier(
                'recaptcha-container',
                {
                    size: 'invisible',
                    callback: (response: any) => {
                        // reCAPTCHA solved, allow signInWithPhoneNumber.
                        // onSignInSubmit();
                        this.resultSignIn = JSON.stringify({ ...response, name: 'recaptchaVerifier' }, null, 2)
                    },
                    'expired-callback': () => {
                        // Response expired. Ask user to solve reCAPTCHA again.
                        // ...
                        alert(`expired-callback`)
                    },
                },
                this.$fireV9.instanceAuth
            )
            const appVerifier = window.recaptchaVerifier
            const { signInWithPhoneNumber } = this.$fireV9.fireAuth
            signInWithPhoneNumber(this.$fireV9.instanceAuth, this.phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult
                    this.resultSignIn = JSON.stringify(
                        { ...confirmationResult, name: 'signinWithPhoneNumber' },
                        null,
                        2
                    )
                })
                .catch((error) => {
                    // Error; SMS not sent
                    // ...
                    this.reusltSigninError = JSON.stringify(error, null, 2)
                })
        },

        verifyOTP() {
            const confirmationResult = window.confirmationResult
            confirmationResult
                .confirm(this.otpCode)
                .then((result: any) => {
                    this.resultSignIn = JSON.stringify(result, null, 2)
                })
                .catch((error: any) => {
                    this.reusltSigninError = JSON.stringify(error, null, 2)
                })
        },

        clearSigninPhone() {
            this.phoneNumber = ''
            this.otpCode = ''
        },

        resetForm() {
            ;(this.$refs.formSignin as any).resetFields()
        },

        signout() {
            alert('signout')
        },

        clearResult() {
            this.resultSignIn = ''
            this.reusltSigninError = ''
            this.currentUser = ''
        },

        setUidUser() {
            if (this.$fireV9.instanceAuth.currentUser) {
                localStorage.setItem('user', JSON.stringify(this.$fireV9.instanceAuth.currentUser))
            }
        },
    },
})
</script>

<style>
::v-deep .ant-btn-primary .btn-black {
    background-color: #000;
    border-color: #000;
    color: #fff;
}
</style>
