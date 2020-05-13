    // atualizar o perfil e adicionar usuário no db

    //var username = TXTnome.value;

    /*var TXTbio = document.getElementById('bio');
    var biografia = TXTbio.value;
    var TXTlocal = document.getElementById('local');
    var localizacao = TXTlocal.value;
    var TXTpecas = document.getElementById('pecas');
    var minhasPecas = TXTlocal.value;*/

    var btnAtt = document.getElementById('btnATT');

    btnAtt.addEventListener('click', e =>{
    var TXTnome = document.getElementById('userName');
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: TXTnome.value 
      //photoURL: 
    }); 
});   

