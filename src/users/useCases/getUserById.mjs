
/**
 * 
 * @param {String| number} id 
 * @returns {Promise<user>}
 */

import { localHostUserToModel } from "../mappers/localHostUser.mjs"

export const getUserById = async(id) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users/${id}`
    const res = await fetch(url)
    const data = await res.json()
    const user = localHostUserToModel(data)
    return user
}
