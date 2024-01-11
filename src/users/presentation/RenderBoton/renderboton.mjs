import usersStore from "../../store/usersStore.mjs"
import { renderTable } from "../renderTable/renderTable.mjs"
import './renderBoton.css'

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderBoton = (element)=>{

    const nextBoton = document.createElement('button')
    nextBoton.innerHTML = 'Next >'
    const prevBoton = document.createElement('button')
    prevBoton.innerHTML = '< Prev'
    const currenPageLabel = document.createElement('span')
    currenPageLabel.id = 'current-page'
    currenPageLabel.innerHTML = usersStore.getCurrentPage()

    element.append( prevBoton, currenPageLabel , nextBoton )


    nextBoton.addEventListener('click',async()=>{
        await usersStore.loadNextPage()
        currenPageLabel.innerHTML = usersStore.getCurrentPage()
        renderTable(element)
    })

    prevBoton.addEventListener('click' ,async()=>{
        await usersStore.loadPreviousPage()
        currenPageLabel.innerHTML = usersStore.getCurrentPage()
        renderTable(element)
    })
}