import axios from "axios";
import {store} from "../app/store"

const API_URL = "https://api.spotify.com/v1/"

export const searchArtists = async (searchKey) => {
    const {token} = store.getState().login
    const {data: {artists: {items}}} = await axios.get(API_URL + 'search/', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "artist"
        }
    })

    return items;
}

// export const fetchArtist = async (id) => {
//     const {token} = store.getState().login
//     const {data} = await axios.get(`${API_URL}artists/${id}`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     })
//
//     console.log('data', data)
//     return data;
// }