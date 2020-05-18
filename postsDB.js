// Salvar o post no DB
const savePost = document.getElementById('savePost');
savePost.addEventListener('click', e =>{

  const user = firebase.auth().currentUser;
  const TXTdescricao = document.getElementById('descricao')
  const TXTtitulo = document.getElementById('titulo');
e.preventDefault();

return firebase.firestore().collection('postagens').add({    
  text: TXTdescricao.value,
  title: TXTtitulo.value,
  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  usuario: user.uid
  }).then(
      alert('Cadastrado com sucesso!'));
});

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


// Minhas vendas
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    firebase.firestore().collection('postagens').where("usuario", "==", user.uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  } else {
    console.log('Nenhuma venda ')
  }
});


// Editar e deletar post
         
 