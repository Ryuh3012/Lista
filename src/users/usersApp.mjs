import { renderBoton } from "./presentation/RenderBoton/renderboton.mjs"
import { renderAppBoton } from "./presentation/renderAddBoton/renderAddBoton.mjs"
import { renderModal } from "./presentation/renderModal/renderModal.mjs"
import { renderTable } from "./presentation/renderTable/renderTable.mjs"
import usersStore from "./store/usersStore.mjs"
import { saverUser } from "./useCases/dataUsers.mjs"
/**
 * 
 * @param {HTMLDivElement} element 
 */


export const userApp = async (element) => {

    element.innerHTML = 'Loading...'
    await usersStore.loadNextPage()
    element.innerHTML = ''

    renderTable(element)
    renderBoton(element)
    renderAppBoton(element)
    renderModal(element, async (userLike) => {
        const user = await saverUser(userLike)
        usersStore.onUserChanged(user)
        console.log(user)
        renderTable()
    })

}