import { getData } from '../factories/data.js'
import photographerFactory from '../factories/photographer.js'

async function init () {
  const { photographers } = await getData()
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    const userCard = photographerFactory(photographer).getUserCardDOM()
    photographersSection.appendChild(userCard)
  })
};

init()
