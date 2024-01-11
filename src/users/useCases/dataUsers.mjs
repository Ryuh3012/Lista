import { localHostUserToModel } from '../mappers/localHostUser.mjs'
import { userModelToLocalhost } from '../mappers/userToLocalHost.mjs'
import { User } from '../models/user.mjs'
/**
 * 
 * @param {data<User>} userData 
 */
export const saverUser = async (userData) => {



    const user = new User(userData)

    if (!user.firstName || !user.lastName) {
        throw "firstName & lastName no existe"
    }

    const userToSave = userModelToLocalhost(user)
    let userUpdated
    
    if(user.id){
        userUpdated = await updateUser(userToSave)
    }
    else{
        userUpdated = await createUser(userToSave)
    }
    return localHostUserToModel(  userUpdated )
}

const updateUser = async (user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const updatedUser = await res.json()

    console.log({ updatedUser })
    return updatedUser
}
const createUser = async (user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users`
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const newUSer = await res.json()

    return newUSer
}