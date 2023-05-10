let totalLikes

export default function initLikeManagement () {
  const buttons = document.querySelectorAll('button.like')
  const totaltotalCountLikes = document.querySelector('div.totalCountLikes')
  totalLikes = totaltotalCountLikes.querySelector('span')
  for (const button of buttons) {
    button.addEventListener('click', (e) => {
      likeManagement(button)
    })
  }
}

function likeManagement (button) {
  const { dataset } = button
  const { likes } = dataset
  const count = button.querySelector('span')
  let counter = parseInt(count.textContent)
  let totalCounter = parseInt(totalLikes.textContent)
  if (parseInt(likes) === counter) {
    count.textContent = ++counter
    totalLikes.textContent = ++totalCounter
  } else {
    count.textContent = --counter
    totalLikes.textContent = --totalCounter
  }
}
