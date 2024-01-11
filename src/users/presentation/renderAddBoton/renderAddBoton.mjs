import { showModal } from '../renderModal/renderModal.mjs'
import './renderAddBoton.css'

export const renderAppBoton = (element)=>{

    const fabButton = document.createElement("button")

    fabButton.innerHTML= "+"
    fabButton.classList.add('fabButton')
    element.append(fabButton)

    fabButton.addEventListener('click',()=>{
        showModal()
    })
}