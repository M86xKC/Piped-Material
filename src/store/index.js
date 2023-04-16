import Vue from 'vue'
import Vuex from 'vuex'

import { PrefsStore, initializePrefEvents } from '@/store/prefs-store'
import { AuthenticationStore, initializeAuthEvents } from '@/store/authentication-store'
import { WatchedVideosPlaylist } from '@/store/watched-videos-playlist'
import { i18nStore } from '@/store/i18n-store'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		prefs: PrefsStore,
		auth: AuthenticationStore,
		i18n: i18nStore,
		plHistory: WatchedVideosPlaylist
	}
})

initializePrefEvents(store)
initializeAuthEvents(store)

export default store
