const quoteListUl = document.getElementById("quote-list")
const quotesUrl = 'http://localhost:3000/quotes?_embed=likes'

fetch(quotesUrl)
  .then(r => r.json())
  .then(arr => arr.forEach(renderEachQuote))
    //   arr.forEach(item => {
        
    //   })
//   })
//   .then(console.log)
//   .then(quotesArr => quotesArr.forEach(renderEachQuote))
    //  .then((quotesArr) => {
    //      quotesArr.forEach((quoteObj) => {
    //         renderEachQuote(quoteObj)
    //      })
    // })
    //  .then(quotesArr => 
    //     quotesArr.forEach(quote => 
    //         renderEachQuote(quote)))
       
function renderEachQuote(quoteObj) {
    let outerElement = document.createElement('li')
    outerElement.className = 'quote-card'
    outerElement.innerHTML = 
    `
    <blockquote class="blockquote">
      <p class="mb-0">${quoteObj.quote}</p>
      <footer class="blockquote-footer">${quoteObj.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>${quoteObj.likes.length}</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
    `
    quoteListUl.append(outerElement)

    let delButton = outerElement.querySelector('.btn-danger')
    delButton.addEventListener('click', e => {
        console.log(outerElement)
        // fetch('http://localhost:3000/quotes/${quoteObj.id}', {
        //     method: "DELETE"
        // })
        // .then(r => r.json())
        // .then(r => {
        //     outerElement.remove()
        // })
    })

    let likeButton = outerElement.querySelector('.btn-success')
    let likesSpan = outerElement.querySelector('span')
    // console.log(likesSpan)
    likeButton.addEventListener('click', e => {
        fetch('http://localhost:3000/likes', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "quoteId": quoteObj.id
            })
        })
        .then(r => r.json())
        // .then(console.log)   click-quote-id-2 => {quoteId: 2, id: 8}
        .then((newlikes) => {
            quoteObj.likes.push(newlikes)
            likesSpan.innerText = quoteObj.likes.length
        })
    })
}
