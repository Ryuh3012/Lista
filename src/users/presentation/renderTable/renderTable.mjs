import usersStore from '../../store/usersStore.mjs'
import { deleteUSer } from '../../useCases/deleteUser.mjs'
import { showModal } from '../renderModal/renderModal.mjs'
import './renderTable.css'

let table

const createTable = () => {
    const table = document.createElement('table')
    const tableHeaders = document.createElement('thead')
    tableHeaders.innerHTML = `
    <tr>
        <th>#ID</th>
        <th>Balance</th>
        <th>fistName</th>
        <th>LastName</th>
        <th>Activo</th>
        <th>Actions</th>
    </tr>
    `
    const tableBody = document.createElement('tbody')
    table.append(tableHeaders, tableBody)
    return table
}

const tableDeleteList= async(event)=>{
    const element = event.target.closest('.deleteUSer')
    if(!element) return
    const id = element.getAttribute('data-id')
    try {
        await deleteUSer(id)
        await usersStore.reloadPage()
        document.querySelector('#current-page').innerHTML=usersStore.getCurrentPage()
        renderTable()
    } catch (error) {
        console.log(error)
        alert('No se pudo eliminar')
    }
}

const tableSelect= (event)=>{
    const element = event.target.closest('.selectUser')
    if(!element) return
    const id = element.getAttribute('data-id')
    showModal(id)
}
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = (element) => {

    const users = usersStore.getUsers()
    if (!table) {
        table = createTable()
        element.append(table)

        table.addEventListener('click', tableSelect)
        table.addEventListener('click', tableDeleteList)

    }

    let tableHTML = ''
    users.forEach(user => {
        tableHTML += `
        <tr>
            <td>${user.id}</td>
            <td>${user.balance}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.isActive}</td>
            <td>
            <a href= "#/" class ='selectUser' data-id="${user.id}">Select</a>
            <a href= "#/" class= 'deleteUSer' data-id="${user.id}">Delete</a>
            </td>
        </tr>`
    })

    table.querySelector('tbody').innerHTML = tableHTML

}