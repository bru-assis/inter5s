//sign in com Google
const googleSignIn = document.getElementById('googleSignIn');
googleSignIn.addEventListener('click', e=>{
    provedor = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provedor);
    e.preventDefault();
    });


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
      return firebase.firestore().collection('users').doc(userCredential.user.uid).set({    
        bio: TXTbio.value,
        local: TXTlocal.value,
      }).then(userCredential =>{
        //resolver essa parte do displayName
        userCredential.user.updateProfile({
          displayName: document.getElementById('userName').value
        })
      }).then(
          alert('Cadastro completo!'));
    }).catch(function(error){
      console.log(error);
    });
    
    });
       


//identifica o login
firebase.auth().onAuthStateChanged(user => {
    if (user) {
          document.getElementById("nomeUser").innerHTML = user.displayName;
          document.getElementById("emailUser").innerHTML = user.email;
          console.log(user);
          if(user.displayName!=null){
            document.getElementById('userName').defaultValue = user.displayName;
          };        
    } else {
      console.log('não logado');
      document.getElementById("nomeUser").innerHTML = null;
      document.getElementById("emailUser").innerHTML = null;
    }
  });


// Sign Out

btnLogOut.addEventListener('click', e =>{
    firebase.auth().signOut(); 
});

