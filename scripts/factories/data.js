export async function getData () {
  const response = await fetch('./data/photographers.json')
    .then((response) => response.json())
    .catch((e) => console.error(e))
  return await response
}

export async function getOnePhotographer (id) {
  const response = await getData()
  const photographer = response.photographers.filter(element => element.id === id)[0]
  if (photographer === undefined) {
    window.location = 'index.html'
  }
  return photographer
}
