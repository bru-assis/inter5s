// Salvar o post no DB
function savePost(descricao) {
    var TXTdescricao = document.getElementById('descricao');
    var TXTtitulo = document.getElementById('titulo');
    var user = firebase.auth().currentUser;
   
    return firebase.firestore().collection('postagens').set({
      title: TXTtitulo.value,
      text: TXTdescricao.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      usuario: user.uid
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
  console.log(requests);

  let html = '';
requests.forEach(request => {
  html += `<p> ${request.text}</p>`;
});
document.getElementById('posts').innerHTML = html;
});


 