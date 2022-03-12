import { createStore } from 'vuex'
import { users } from './modules/users.module'
import { auth } from './modules/auth.module'

const store = createStore({
    modules: {
        users,
        auth,
    },
})

export default store
