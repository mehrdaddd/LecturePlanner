import { store } from '../data/store';
import axios from 'axios';
export const isAuthenticated = () => {
    let token = store.getState().profile.token
    if(token !== '' && token != null && token != "null"){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        localStorage.setItem('token', token)
        return true
    }
    const t = localStorage.getItem('token')
    if (t == null || t === undefined || t === '' || t == "null")
        return false
    else {
        token = t
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return true
    }
    return false
}