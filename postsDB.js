// Salvar o post no DB
function savePost(descricao) {
    var TXTdescricao = document.getElementById('descricao');
    var descricao = TXTdescricao.value;
    var TXTtitulo = document.getElementById('titulo');
    var titulo = TXTtitulo.value;
   
   //collection = é a parte onde vão ser exibidos os posts
    return firebase.firestore().collection('postagens').add({
      title: titulo,
      text: descricao,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(error) {
      console.error('Error writing new message to database', error);
    });
  }
  // coisar os campos do form com o js btn.addeventlistener(click, e => {funçao})

  // Exibir posts

const ref = firebase.firestore().collection('postagens');

let requests = [];
ref.onSnapshot(snapshot => {
  snapshot.forEach(doc =>  {
      requests.push({...doc.data(), id: doc.id})
  });
  console.log(requests);

  let html = '';
requests.forEach(request => {
  html += `<p> ${request.text}</p>`;
});
document.getElementById('posts').innerHTML = html;
});




 /* // Loads chat messages history and listens for upcoming ones.
function loadMessages() {
    // Create the query to load the last 12 messages and listen for new ones.
    var query = firebase.firestore()
                    .collection('postagens')
                    .orderBy('timestamp')
    // Start listening to the query.
    query.onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach((doc) =>  {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });
  } */


 