import { loadUsersByPage } from "../useCases/loadUsersByPage.mjs"


    let currentPage = 0 
    let user = []



const loadNextPage = async () => {
    
    const users = await loadUsersByPage( currentPage + 1)
    if(users.length === 0) return ;
    currentPage += 1
    user = users

}


const loadPreviousPage = async () => {

    if(currentPage === 1) {return};
    const users = await loadUsersByPage(currentPage - 1)

    currentPage -= 1
    user = users

    
}

const onUserChanged = (updateUser) => {

let wasFiybd = false

    user = user.map( user =>{
        if(user.id ===  updateUser.id){
            wasFiybd = true
            return updateUser
        }
        return user
    })
    if( user.length < 10 && !wasFiybd){
        user.push(updateUser)
    }
    
}
const reloadPage = async () => {
    const users = await loadUsersByPage( currentPage )
    if(users.length === 0) {
        await loadPreviousPage()
        return
    } ;
    user = users

}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,
/**
 * 
 * @returns {User[]}
 */
    getUsers: () => [...user],
    
    getCurrentPage : ()=> currentPage
    
}