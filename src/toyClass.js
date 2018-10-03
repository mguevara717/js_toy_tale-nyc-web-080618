
class Toy {
  constructor(myJson) {
    this.name = myJson.name
    this.image = myJson.image
    this.likes = myJson.likes
    this.id = myJson.id
    Toy.all.push(this)
  }

  render() {
    return (
      `<div class="card">
        <h2>${this.name}</h2>
        <img src=${this.image} class="toy-avatar">
        <p>${this.likes} Likes <p>
        <button id=${this.id} class="like-btn">Like <3</button>
      </div>`
    )
  }

  static find(id) {
    return Toy.all.find((myToy) => {
      return myToy.id == id
    })
  }

} //the class

Toy.all = [];
