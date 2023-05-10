import { getOnePhotographer, getData } from '../factories/data.js'
import photographerFactory from '../factories/photographer.js'
import { mediaFactory } from '../factories/media.js'
import initLikeManagement from '../utils/likeManagement.js'
import initSortFilter from '../utils/sortFilter.js'
import lightboxGallery from '../utils/lightboxGallery.js'
import { initContactForm } from '../utils/contactForm.js'

const params = new URLSearchParams(window.location.search)

if (!params.has('id')) {
  document.location.href = 'index.html'
}
const id = parseInt(params.get('id'))

let mediasArray = []

export function createMediasList () {
  const nodes = []
  const section = document.querySelector('.mediasList')
  for (const media of mediasArray) {
    nodes.push(mediaFactory(media).getMediaDom())
  }
  section.innerHTML = ''
  section.append(...nodes)
}

async function init () {
  const photographer = await getOnePhotographer(id)
  const data = await getData()

  photographerFactory(photographer).getHeaderProfile()
  mediasArray = data.media.filter(mediaObj => mediaObj.photographerId === id)
  const firstName = photographerFactory(photographer).getFirstName()
  localStorage.setItem('firstName', firstName)
  document.getElementById('modalTitle').textContent += ' ' + firstName
  document.querySelector('title').textContent += firstName

  createMediasList()
  photographerFactory(photographer).getAsideProfile()
  lightboxGallery(mediasArray)
  initSortFilter(mediasArray)
  initLikeManagement()
  initContactForm()
}

init()
