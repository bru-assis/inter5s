//sign in com Google
const googleSignIn = document.getElementById('googleSignIn');
googleSignIn.addEventListener('click', e=>{
    provedor = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provedor);
    firebase.auth().getRedirectResult();
    e.preventDefault();
  });

  function saveDB(){
    firebase.auth().getRedirectResult().then(function(result){
      return firebase.firestore().collection('users').doc(result.user.uid).get().then(()=> {
        firebase.firestore().collection('users').doc(result.user.uid)
          .add({    
            bio: '',
            local: '',
            vendas: 0
        });
        /*var doc = doc.id;
        if(!doc.id){
          firebase.firestore().collection('users').doc(result.user.uid)
          .set({    
            bio: '',
            local: '',
            vendas: 0
        });
      }*/}).catch(function(error){
        console.log(error);
      }); 
  });
    
};

    
//sign in email e senha
const txtEmail = document.getElementById('txtEmail');
const txtPwd = document.getElementById('txtPwd');
const btnLogin = document.getElementById('btnLogin');
const btnCreate = document.getElementById('btnCreate');
const btnLogOut = document.getElementById('btnLogOut');

// LogIn
btnLogin.addEventListener('click', e =>{
    const email = txtEmail.value;
    const pass = txtPwd.value;

    firebase.auth().signInWithEmailAndPassword(email, pass);
    
  e.preventDefault();
});

// SignUp
btnCreate.addEventListener('click', e =>{
    const email = txtEmail.value;
    const pass = txtPwd.value;
    const TXTbio = document.getElementById('bio');
    const TXTlocal = document.getElementById('local');
    
    e.preventDefault();

    firebase.auth().createUserWithEmailAndPassword(email, pass).then(userCredential =>{
      userCredential.user.updateProfile({
        displayName: document.getElementById('userName').value
      });
      return firebase.firestore().collection('users').doc(userCredential.user.uid).set({    
        bio: TXTbio.value,
        local: TXTlocal.value,
        vendas: 0
      }).then(
          alert('Cadastro completo!'));
    }).catch(function(error){
      console.log(error);
    });
    
    });
       


//identifica o login
firebase.auth().onAuthStateChanged(user => {
    if (user) {
          document.getElementById('fLogin').style.display='none'
          document.getElementById("nomeUser").innerHTML = user.displayName;
          document.getElementById("emailUser").innerHTML = user.email;
          console.log(user);
          gamificacao();
          saveDB();
          //criar uma function que verifica quantas vezes o user logou
          if(user.displayName!=null){
            document.getElementById('userName').defaultValue = user.displayName;
          };        
    } else {
      document.getElementById('fLogin').style.display='block'
      console.log('não logado');
      document.getElementById("nomeUser").innerHTML = null;
      document.getElementById("emailUser").innerHTML = null;
    }
  });


// Sign Out

btnLogOut.addEventListener('click', e =>{
    firebase.auth().signOut(); 
});
