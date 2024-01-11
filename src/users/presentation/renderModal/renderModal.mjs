import modalHtml from './renderModal.html?raw'
import './renderModal.css'
import { getUserById } from '../../useCases/getUserById.mjs';

let modal;
let form;
let loadedUser = {}
/**
 * 
 * @param {string|number} id 
 */
export const showModal = async (id) => {
    modal?.classList.remove('hideModal')
    loadedUser = {}

    if ( !id ) return

    const user = await getUserById(id)
    setFormValues(user)

}

export const hidelModal = () => {
    modal?.classList.add('hideModal')
    form?.reset()

}


const setFormValues = (user) => {

    form.querySelector('[name="firstName"]').value = user.firstName
    form.querySelector('[name="lastName"]').value = user.lastName
    form.querySelector('[name="balance"]').value = user.balance
    form.querySelector('[name="isActive"]').checked = user.isActive

    loadedUser = user
}
/**
 * 
 * @param {HTMLElement} element 
 * @param {(userLike)=> Promise<void>} callback 
 * @returns 
 */
export const renderModal = (element, callback) => {

    if (modal) return
    modal = document.createElement('div')
    modal.innerHTML = modalHtml
    modal.className = 'modalConteiner hideModal'

    form = modal.querySelector('form')

    modal.addEventListener('click', (event) => {

        if (event.target.className === 'modalConteiner') hidelModal()

    })
    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        const formData = new FormData(form)
        const data = {...loadedUser}
        
        for (const [key, value] of formData) {
            if (key === "balance") {
                data[key] = + value
                continue;
            }
            if (key == 'isActive') {
                console.log('546465')
                data[key] = (value === 'on') ? true : false
                continue;

            }

            data[key] = value
        }
        await callback(data)

        hidelModal()
    })

    element.append(modal)



}