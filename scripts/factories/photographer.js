export default function (data) {
  const { name, portrait, tagline, price, country, city, id } = data

  const picture = `assets/images/photographers/${portrait}`

  function getUserCardDOM () {
    const article = document.createElement('article')

    const linkZone = document.createElement('a')
    linkZone.setAttribute('aria-label', name)
    const img = getPicture()
    img.setAttribute('alt', '')
    const h2 = document.createElement('h2')
    linkZone.setAttribute('href', 'photographer.html?id=' + id)
    h2.textContent = name

    const description = document.createElement('p')
    const location = document.createElement('p')
    const pricing = getPrice()
    pricing.classList.add('photographer_section_price')
    description.innerHTML = tagline
    description.classList.add('photographer_section_description')
    location.textContent = city + ', ' + country
    location.classList.add('photographer_section_location')

    linkZone.append(img, h2)
    article.append(linkZone, location, description, pricing)
    return (article)
  }

  function getHeaderProfile () {
    const container = document.getElementsByClassName('photograph-header')[0]
    const title = document.createElement('h1')
    const location = document.createElement('p')
    const description = document.createElement('p')
    const img = getPicture()
    img.setAttribute('alt', name)
    const div = document.createElement('div')

    title.textContent = name
    location.textContent = city + ', ' + country
    description.textContent = tagline

    div.append(title, location, description)
    container.prepend(div)
    container.append(img)
  }

  function getAsideProfile () {
    const main = document.querySelector('main')
    const aside = document.createElement('aside')
    aside.classList.add('asideProfile')

    const likes = document.querySelectorAll('button.like > span')
    let sum = 0
    likes.forEach(element => {
      sum += parseInt(element.textContent)
    })

    const numberLikes = document.createElement('span')
    numberLikes.textContent = sum
    const svgLike = document.createElement('img')
    svgLike.setAttribute('src', 'assets/icons/like_black.svg')
    svgLike.setAttribute('alt', 'likes')

    const totalCountLikes = document.createElement('div')
    totalCountLikes.classList.add('totalCountLikes')
    totalCountLikes.append(numberLikes, svgLike)

    const pricing = getPrice()
    aside.append(totalCountLikes, pricing)
    main.append(aside)
  }

  function getFirstName () {
    return name.split(' ')[0]
  }

  function getPicture () {
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    return img
  }

  function getPrice () {
    const pricing = document.createElement('p')
    pricing.textContent = price + '€/jour'
    return pricing
  }

  return { getFirstName, getAsideProfile, getUserCardDOM, getHeaderProfile }
}
