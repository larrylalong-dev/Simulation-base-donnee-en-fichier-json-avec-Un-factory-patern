import { mediaFactory } from '../factories/media.js'

export default function lightboxGallery (mediasArray) {
  const medias = document.querySelectorAll('.mediaSource')
  const body = document.querySelector('body')
  const main = document.querySelector('main')
  const lightbox = document.querySelector('#lightbox')
  const lightboxContent = document.querySelector('.lightboxContent')
  const aside = document.querySelector('aside.asideProfile')
  const nextButton = document.querySelector('#lightboxRight')
  const previousButton = document.querySelector('#lightboxLeft')
  const closeButton = document.querySelector('.lightboxClose')
  let index

  for (const oneMedia of medias) {
    oneMedia.addEventListener('click', (e) => openLightbox(e))
    oneMedia.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        openLightbox(e)
      }
    })
  }

  nextButton.addEventListener('click', displayNextMedia)
  previousButton.addEventListener('click', displayPreviousMedia)
  closeButton.addEventListener('click', closeLightbox)
  closeButton.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox()
    }
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      if (previousButton.classList.contains('hidden')) {
        return
      }
      displayPreviousMedia()
    }
    if (e.key === 'ArrowRight') {
      if (nextButton.classList.contains('hidden')) {
        return
      }
      displayNextMedia()
    }
    if (e.key === 'Escape') {
      closeLightbox()
    }
  })

  function openLightbox (e) {
    const { dataset } = e.target
    const { id } = dataset
    aside.classList.add('hidden')
    const element = mediasArray.filter(mediaObj => mediaObj.id === parseInt(id))[0]
    index = mediasArray.indexOf(element)
    hiddenArrow()
    lightbox.classList.add('visible')
    lightbox.setAttribute('aria-hidden', 'false')
    body.classList.add('disableOverflow')
    main.setAttribute('aria-hidden', 'true')
    lightbox.classList.remove('hidden')
    const { media, h3 } = mediaFactory(element).getLightbox()
    lightboxContent.append(media, h3)
    closeButton.focus()
  }

  function hiddenArrow () {
    previousButton.classList.remove('hidden')
    nextButton.classList.remove('hidden')
    if (mediasArray[index + 1] === undefined) {
      nextButton.classList.add('hidden')
    } else if (mediasArray[index - 1] === undefined) {
      previousButton.classList.add('hidden')
    }
  }

  function closeLightbox () {
    lightbox.classList.remove('visible')
    body.classList.remove('disableOverflow')
    lightbox.setAttribute('aria-hidden', 'true')
    main.setAttribute('aria-hidden', 'false')
    aside.classList.remove('hidden')
    lightbox.classList.add('hidden')
    lightboxContent.innerHTML = ''
    const element = document.querySelector(`[data-id="${mediasArray[index].id}"]`)
    element.focus()
    index = null
  }

  function displayPreviousMedia () {
    lightboxContent.innerHTML = ''
    index = index - 1
    hiddenArrow()
    const previousImage = mediasArray[index]
    const { media, h3 } = mediaFactory(previousImage).getLightbox()
    lightboxContent.append(media, h3)
  }

  function displayNextMedia () {
    lightboxContent.innerHTML = ''
    index = index + 1
    hiddenArrow()
    const nextImage = mediasArray[index]
    const { media, h3 } = mediaFactory(nextImage).getLightbox()
    lightboxContent.append(media, h3)
  }
}
