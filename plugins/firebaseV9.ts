import { Plugin } from '@nuxt/types'
import * as fireStore from 'firebase/firestore'
import * as fireAuth from 'firebase/auth'
import { getPerformance } from 'firebase/performance'
import { initializeApp, getApps } from 'firebase/app'

declare module 'vue/types/vue' {
    interface Vue {
        $fireV9: {
            instanceAuth: ReturnType<typeof fireAuth.getAuth>,
            instanceDB: ReturnType<typeof fireStore.getFirestore>,
            instancePerf: ReturnType<typeof getPerformance>,
            fireStore: typeof fireStore,
            fireAuth: typeof fireAuth,
            firebaseApp: ReturnType<typeof initializeApp>
        }
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $fireV9: {
            instanceAuth: ReturnType<typeof fireAuth.getAuth>,
            instanceDB: ReturnType<typeof fireStore.getFirestore>,
            instancePerf: ReturnType<typeof getPerformance>,
            fireStore: typeof fireStore,
            fireAuth: typeof fireAuth
            firebaseApp: ReturnType<typeof initializeApp>
        }
    }
}

declare module 'vuex/types/index' {
    // eslint-disable-next-line 
    interface Store<S> {
        $fireV9: {
            instanceAuth: ReturnType<typeof fireAuth.getAuth>,
            instanceDB: ReturnType<typeof fireStore.getFirestore>,
            instancePerf: ReturnType<typeof getPerformance>,
            fireStore: typeof fireStore,
            fireAuth: typeof fireAuth
            firebaseApp: ReturnType<typeof initializeApp>
        }
    }
}

const firebasePlugin: Plugin = (ctx, inject) => {
    const firebaseConfig = {
        apiKey: ctx.env.FIREBASE_API_KEY,
        authDomain: ctx.env.FIREBASE_AUTH_DOMAIN,
        projectId: ctx.env.FIREBASE_PROJECT_ID,
        storageBucket: ctx.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: ctx.env.FIREBASE_MESSAGEING_SENDER_ID,
        appId: ctx.env.FIREBASE_APP_ID,
        measurementId: ctx.env.FIEBASE_MEASUREMENT_ID
    }

    const apps = getApps()
    let firebaseApp: any = null
    if (!apps.length) {
        firebaseApp = initializeApp(firebaseConfig)
    } else {
        firebaseApp = apps[0]
    }

    const instanceAuth = fireAuth.getAuth(firebaseApp)
    const instanceDB = fireStore.getFirestore(firebaseApp)

    inject('fireV9', {
        instanceAuth,
        instanceDB,
        firebaseApp,
        fireStore,
        fireAuth,
        instancePerf: () => {
            if (process.client && firebaseApp) {
                return getPerformance(firebaseApp)
            }
        }
    })
}

export default firebasePlugin;