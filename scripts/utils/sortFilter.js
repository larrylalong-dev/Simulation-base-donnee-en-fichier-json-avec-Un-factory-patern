import lightboxGallery from './lightboxGallery.js'
import { createMediasList } from '../pages/photographer.js'
import initLikeManagement from './likeManagement.js'

const buttonOpener = document.querySelector('.dropdown')
const selectElement = document.querySelectorAll("li[role='option']")
const menu = document.querySelector('.dropdown-content')
const elements = document.querySelectorAll('li')
let mediasArray

export default function initSortFilter (mediasList) {
  mediasArray = mediasList
  buttonOpener.addEventListener('click', (e) => {
    elements.forEach((elem) => {
      if (elem.innerText === e.target.innerText) {
        elem.classList.add('hidden')
        elem.setAttribute('aria-selected', 'false')
      } else {
        elem.setAttribute('aria-selected', 'true')
        elem.classList.remove('hidden')
      }
    })
    if (e.target.getAttribute('aria-expanded') === 'false') {
      openDropdown()
    } else {
      closeDropdown()
    }
  })
  selectElement.forEach(elem => elem.addEventListener('click', (e) => changeFilter(e)))
}

function openDropdown () {
  menu.setAttribute('aria-hidden', 'false')
  menu.classList.add('visible')
  buttonOpener.classList.add('active')
  buttonOpener.setAttribute('aria-expanded', 'true')
}

function closeDropdown () {
  menu.setAttribute('aria-hidden', 'true')
  menu.classList.remove('visible')
  buttonOpener.classList.remove('active')
  buttonOpener.setAttribute('aria-expanded', 'false')
}

function changeFilter (e) {
  const { dataset } = e.target
  const { sort } = dataset
  createMediasList(sortFilter(sort, mediasArray))
  menu.classList.remove('visible')
  menu.setAttribute('aria-activedescendant', e.target.id)
  buttonOpener.classList.remove('active')
  buttonOpener.textContent = e.target.innerText
  menu.setAttribute('aria-hidden', 'true')
  buttonOpener.setAttribute('aria-expanded', 'false')
  lightboxGallery(mediasArray)
  initLikeManagement()
}

function sortFilter (sortBy, mediasArray) {
  switch (sortBy) {
    case 'popularity':
      mediasArray.sort((a, b) => {
        return b.likes - a.likes
      })
      break
    case 'date':
      mediasArray.sort(({ date: a }, { date: b }) => {
        return new Date(b) - new Date(a)
      })
      break
    case 'title':
      mediasArray.sort((a, b) => {
        return a.title.localeCompare(b.title)
      })
      break
    default:
      mediasArray.sort((a, b) => {
        return b.likes - a.likes
      })
      break
  }
  return mediasArray
}
