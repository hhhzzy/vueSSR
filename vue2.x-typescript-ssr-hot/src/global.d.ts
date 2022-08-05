export {} //  这句不能删
import Vue, { ComponentOptions } from 'vue'
import { Store } from 'vuex'
import { Route } from 'vue-router'

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        // eslint-disable-next-line prettier/prettier
        asyncData?: ({ store, route }: { store: Store<any>, route: Route }) => Promise<any>
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        // eslint-disable-next-line prettier/prettier
        asyncData?: ({ store, route }: { store: Store<any>, route: Route }) => Promise<any>
    }
}
