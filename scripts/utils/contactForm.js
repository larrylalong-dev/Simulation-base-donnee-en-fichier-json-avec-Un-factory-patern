const modal = document.querySelector('.modalOverlay')
const main = document.querySelector('main')
const body = document.querySelector('body')
const form = document.querySelector('form')
const buttonForm = document.querySelector('.contact_button')
const closeForm = document.querySelector('.closeForm')

export function initContactForm () {
  buttonForm.addEventListener('click', displayModal)
  closeForm.addEventListener('click', closeModal)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(getData())
  })

  closeForm.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  })
}

function displayModal () {
  modal.setAttribute('aria-hidden', 'false')
  main.setAttribute('aria-hidden', 'true')
  body.classList.add('disableOverflow')
  modal.classList.remove('hidden')
  closeForm.focus()
}

function closeModal () {
  modal.setAttribute('aria-hidden', 'true')
  main.setAttribute('aria-hidden', 'false')
  body.classList.remove('disableOverflow')
  modal.classList.add('hidden')
  buttonForm.focus()
}

function getData () {
  const firstName = form.elements.firstName.value
  const lastName = form.elements.lastName.value
  const email = form.elements.email.value
  const message = form.elements.message.value
  return {
    firstName,
    lastName,
    email,
    message
  }
}
