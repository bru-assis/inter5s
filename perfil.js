    //Editar perfil 
    const btnAtt = document.getElementById('btnATT');

    btnAtt.addEventListener('click', e =>{
   // var TXTnome = document.getElementById('userName');
    var user = firebase.auth().currentUser;
    var TXTbio = document.getElementById('bio');
    var TXTlocal = document.getElementById('local');
    e.preventDefault();
    /*user.updateProfile({
      displayName: TXTnome.value 
      //photoURL: 
    }); */
    return firebase.firestore().collection('users').doc(user.uid).set({    
        bio: TXTbio.value,
        local: TXTlocal.value,
        //pecas: minhasPecas
      }).then(
          alert('Cadastro completo!'));
    
});   

