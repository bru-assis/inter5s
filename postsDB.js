// Salvar o post no DB
var btnImg = document.getElementById('btnImg');

btnImg.addEventListener('change', e =>{
    const file = e.target.files[0];
    const filename = file.name;
    const ref = firebase.storage().ref('/imagens/' + filename);
    const task = ref.put(file);
    task.then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
       var img = document.getElementById('btnImg');
       img.src = url;
      })
      .catch(console.error);
})

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
  usuario: user.uid,
  imagem: btnImg.src
  }); 
});

// Exibir posts

const ref = firebase.firestore().collection('postagens');

let requests = [];
ref.onSnapshot(snapshot => {
  snapshot.forEach(doc =>  {
      requests.push({...doc.data(), id: doc.id})
  });

  let html = '';
requests.forEach(request => {
  html += `<li>`
  html += `<h5> ${request.title}</h5>`;
  html += `<p> ${request.text}</p>`;
  html += `<img src= "${request.imagem}" style="width:50px;height:50px;">`;
  html += `</li>`
});
document.getElementById('posts').innerHTML = html;
});


// Minhas vendas
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    let minhasRoupas = [];
    firebase.firestore().collection('postagens').where("usuario", "==", user.uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          minhasRoupas.push({...doc.data(), id: doc.id});
        });
        let html = '';
        minhasRoupas.forEach(roupa => {
          html += `<li>`
          html += `<h5> ${roupa.title}</h5>`;
          html += `<p> ${roupa.text}</p>`;
          //html += `<img src= "${roupa.imagem}" style="width:50px;height:50px;">`;
          html += `<button id= "ATTPost"> Editar </button>`;
          html += `<button id= "DELPost"> Deletar </button>`;
          html += `</li>`
        });
        document.getElementById('minhasVendas').innerHTML = html;

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  } else {
    document.getElementById('minhasVendas').innerHTML = "Você não está vendendo/trocando nenhuma roupa.";
  }
});


// Editar e deletar post
//editar
  const attPost = document.getElementById('ATTPost');
  const delPost = document.getElementById('DELPost');

attPost.addEventListener('click', e =>{
const TXTdescricao = document.getElementById('descricao')
const TXTtitulo = document.getElementById('titulo');
e.preventDefault();

return firebase.firestore().collection('postagens').doc(doc.id).update({    
text: TXTdescricao.value,
title: TXTtitulo.value
}).then(
    alert('Atualizado com sucesso!'));
});

//deletar
//primeiro vai chamar um alert e no alert que vai ser possível deletar real
delPost.addEventListener('click', e =>{
e.preventDefault();

return firebase.firestore().collection('postagens').doc(doc.id).delete().then(
    alert('Deletado com sucesso!'));
});        
 