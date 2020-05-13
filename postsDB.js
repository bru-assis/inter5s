
// Salvar o post no DB
function savePost(descricao) {
    var TXTdescricao = document.getElementById('descricao');
    var descricao = TXTdescricao.value;
    var TXTtitulo = document.getElementById('titulo');
    var titulo = TXTtitulo.value;
   
   //pegar o uid tbm
    return firebase.firestore().collection('postagens').add({
      title: titulo,
      text: descricao,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      //uid: id
    }).catch(function(error) {
      console.error('Error writing new message to database', error);
    });
  }

  // Exibir posts
const ref = firebase.firestore().collection('postagens');

let requests = [];
ref.onSnapshot(snapshot => {
  snapshot.forEach(doc =>  {
      requests.push({...doc.data(), id: doc.id})
  });

  let html = '';
requests.forEach(request => {
  html += `<p> ${request.text}</p>`;
});
document.getElementById('posts').innerHTML = html;
});



 