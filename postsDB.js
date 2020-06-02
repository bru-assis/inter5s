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
        //meter um if doc.exist pra exbiri isso ou não tem nada
        let html = '';
        minhasRoupas.forEach(roupa => {
          html += `<li id= ${roupa.id} class="popup" onclick="exibir2(this)">`;
          html += `<img src= "${roupa.imagem}" style="width:50px;height:50px;">`;
          html += `<h5> ${roupa.title}</h5>`;
          
          html += `<div class="popuptext" id= ${request.id}b>`;
          html += `<p> ${roupa.text}</p>`;
          html += `<button data-id= ${roupa.id} onclick="atualizar(this)"> Editar </button>`;
          html += `<button data-id= ${roupa.id} onclick="deletar(this)"> Deletar </button>`;
          html+= `</div>`

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

function exibir2(self) {
  var postId = self.id + "b";

  var popup = document.getElementById(postId);
  popup.classList.toggle("show");
};


// Editar e deletar post
//editar
function atualizar(self){
var postId = self.getAttribute("data-id");
const TXTdescricao = document.getElementById('descricao')
const TXTtitulo = document.getElementById('titulo');
e.preventDefault();

return firebase.firestore().collection('postagens').doc(postId).update({    
text: TXTdescricao.value,
title: TXTtitulo.value
}).then(
    alert('Atualizado com sucesso!'));
};

//deletar
function deletar(self){
  var postId = self.getAttribute("data-id");

  return firebase.firestore().collection('postagens').doc(postId).delete().then(
    alert('Deletado com sucesso!'));
  };
//primeiro vai chamar um alert e no alert que vai ser possível deletar real


//Exibir cada post

const ref = firebase.firestore().collection('postagens');

let requests = [];
ref.onSnapshot(snapshot => {
  snapshot.forEach(doc =>  {
      requests.push({...doc.data(), id: doc.id})
  });

  let html = '';
requests.forEach(request => {
  html += `<li id= ${request.id} class="popup" onclick="exibir(this)">`;
  html += `<img src= "${request.imagem}" style="width:50px;height:50px;">`;
  html += `<h5> ${request.title}</h5>`;

  html += `<div class="popuptext" id= ${request.id}a>`;
  html += `<img src= "${request.imagem}" style="width:50px;height:50px;">`;
  html += `<h5> ${request.title}</h5>`;
  html += `<p> ${request.text}</p>`;
  html+= `</div>`

  html += `</li>`
});
document.getElementById('posts').innerHTML = html;
});

function exibir(self) {
  var postId = self.id + "a";

  var popup = document.getElementById(postId);
  popup.classList.toggle("show");
};