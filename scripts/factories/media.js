export function mediaFactory (data) {
  const name = localStorage.getItem('firstName').replace('-', '_')
  const { id, title, image, likes, video } = data

  const pictureSource = `assets/images/${name}/${data.image}`
  const videoSource = `assets/images/${name}/${data.video}`

  function getMediaDom () {
    const container = document.createElement('div')
    container.classList.add('mediaElement')

    const media = image ? getImageDom() : getVideoDom()
    media.setAttribute('data-id', id)
    media.classList.add('mediaSource')
    media.tabIndex = '0'

    const description = document.createElement('div')
    description.classList.add('mediaDescription')

    const mediaTitle = document.createElement('p')
    mediaTitle.textContent = title
    const button = document.createElement('button')
    button.type = 'button'
    button.classList.add('like')
    const { numberLikes, svgLike } = getLikes()
    button.append(numberLikes, svgLike)
    button.setAttribute('data-likes', likes)

    description.append(mediaTitle, button)
    container.append(media, description)
    return container
  }

  function getImageDom () {
    const image = document.createElement('img')
    image.setAttribute('src', pictureSource)
    image.setAttribute('alt', `${title}, closeup view`)
    return image
  }

  function getVideoDom () {
    const video = document.createElement('video')
    const source = document.createElement('source')
    source.setAttribute('src', videoSource)
    source.setAttribute('type', 'video/mp4')
    video.appendChild(source)
    return video
  }

  function getLikes () {
    const numberLikes = document.createElement('span')
    numberLikes.textContent = likes
    const svgLike = document.createElement('img')
    svgLike.setAttribute('src', 'assets/icons/like.svg')
    svgLike.setAttribute('alt', 'likes')
    return { numberLikes, svgLike }
  }

  function getLightbox () {
    const h3 = document.createElement('h3')
    const media = image ? getImageDom() : getVideoDom()
    if (video) {
      media.controls = true
    }
    h3.textContent = title
    return { media, h3 }
  }

  return { getMediaDom, getLikes, getLightbox }
}
