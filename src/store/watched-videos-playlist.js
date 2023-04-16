const WATCHED_HISTORY_PLAYLIST_UNIQID = '5d0615c7-b6a7-4bd5-8450-fa740cd92df7'

export const WatchedVideosPlaylist = {
	namespaced: true,
	state: () => ({
		playlistID: ''
	}),
	mutations: {
		replaceID (state, nextID) {
			state.playlistID = nextID
		}
	},
	actions: {
		async resolvePlaylistID ({ dispatch, commit }) {
			const playlists = await dispatch('auth/makeRequest', {
				method: 'GET',
				path: '/user/playlists'
			}, {
				root: true
			})
			let found = false; let pl
			for (const _pl of playlists) {
				const sdp = _pl.shortDescription ?? ''
				if (sdp.includes(WATCHED_HISTORY_PLAYLIST_UNIQID) || _pl.name === 'Watch History') {
					found = true
					pl = _pl
					break
				}
			}
			if (!found) {
				const { playlistId } = await dispatch('auth/makeRequest', {
					method: 'POST',
					path: '/user/playlists/create',
					data: {
						name: 'Watch History',
						shortDescription: WATCHED_HISTORY_PLAYLIST_UNIQID
					}
				}, {
					root: true
				})
				pl = {
					id: playlistId
				}
			}
			commit('replaceID', pl.id)
		},
		async addVideo ({ state, dispatch }, videoID) {
			await dispatch('auth/makeRequest', {
				method: 'POST',
				path: '/user/playlists/add',
				data: {
					playlistId: state.playlistID,
					videoId: videoID
				}
			}, {
				root: true
			})
		}
	}
}
