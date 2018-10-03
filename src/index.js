document.addEventListener("DOMContentLoaded", () => {

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const cardToyTag = document.createElement('div')
const toyContainerToAppend = document.getElementById('toy-collection')
const likeButton = document.getElementsByClassName('like-btn')

let addToy = false

// YOUR CODE HERE
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

fetch('http://localhost:3000/toys/')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
      myJson.forEach((toy) => {
        const newToy = new Toy(toy)
        toyContainerToAppend.innerHTML += newToy.render()
      })

  })

  toyForm.addEventListener("submit", function(event) {
    event.preventDefault()
      const userInputNewToyName = event.target.querySelector("#ToyNameId").value
      const userInputNewToyURL = event.target.querySelector("#ToyImageId").value
      const newToy = {
        "name": userInputNewToyName,
        "image": userInputNewToyURL,
        "likes": 0
      }

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify (
        newToy
      )
    }).then(response => response.json())
      .then(jsonToys => {
        const newCreatedToy = new Toy(jsonToys)
        toyContainerToAppend.innerHTML += newCreatedToy.render()

    })
    event.target.reset()
  })


  toyContainerToAppend.addEventListener("click", function(event) {
      let buttonId = event.target.id
      console.log(buttonId)

      let findToy = Toy.find(buttonId)
      console.log(findToy)
      let likeCount = findToy.likes

      fetch(`http://localhost:3000/toys/${buttonId}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            likes: ++findToy.likes
          })
        }).then((response) => {
          return response.json()
        }).then((jsonObj) => {
          Object.assign(findToy, jsonObj) //takes this first object and assigns it to the second argument
          event.target.parentElement.parentElement.querySelector('p').innerText = `${findToy.likes} Likes`
        })
  })





}) //end of DOM loader
