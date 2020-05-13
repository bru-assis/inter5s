//sign in com Google
googleSignIn=()=>{
    provedor = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provedor);
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
    const auth = firebase.auth();

    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
    promise.catch(e => document.getElementsByClassName("erro").innerHTML = e.message);
  //e.preventDefault();
});

// SignUp
btnCreate.addEventListener('click', e =>{
    const email = txtEmail.value;
    const pass = txtPwd.value;
    const auth = firebase.auth();

    var promise = firebase.auth().createUserWithEmailAndPassword(email, pass); //.then(function)
    promise.catch(e => document.getElementsByClassName("erro").innerHTML = e.message);
//e.preventDefault();
       
});

//identifica o login
firebase.auth().onAuthStateChanged(user => {
    if (user) {
          document.getElementById("nomeUser").innerHTML = user.displayName;
          document.getElementById("emailUser").innerHTML = user.email;
          console.log(user);
    } else {
      console.log('não logado');
      document.getElementById("nomeUser").innerHTML = null;
      document.getElementById("emailUser").innerHTML = null;
    }
  });

// Salva o usuário e as informações no db
/*
firebase.auth.user().onCreate(user =>{
firebase.firestore().collection('users').doc(user.uid).set({
  bio: biografia,
  local: localizacao,
  pecas: minhasPecas
});
})
*/


// Sign Out

btnLogOut.addEventListener('click', e =>{
    firebase.auth().signOut(); 
    //e.preventDefault();
});

//preventDefault é pra página não att