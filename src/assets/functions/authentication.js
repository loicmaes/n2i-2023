import axios from 'axios'

const authKey = 'auth-key'

export async function isAuthenticated (store, recover) {
    const token = localStorage.getItem(authKey)
    if (!token) return false
    axios.defaults.headers.common.Authorization = `Bearer ${token}`

    try {
        const res = await axios.get('/login')
        if (store && recover && res.data.game_id) store.commit('storeGame', {
            id: res.data.game_id
        })
        return res.status === 202
    } catch (e) {
        return false
    }
}

export function login (token) {
    localStorage.setItem(authKey, token)
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export async function logout () {
    localStorage.removeItem(authKey)
}
