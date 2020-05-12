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

   firebase.auth().signInWithEmailAndPassword(email, pass);
  //e.preventDefault();
});

// SignUp
btnCreate.addEventListener('click', e =>{
    const email = txtEmail.value;
    const pass = txtPwd.value;
    const auth = firebase.auth();

    const promise = firebase.auth().createUserWithEmailAndPassword(email, pass); 
    promise.catch(e => console.log(e.message));
//e.preventDefault();
       
});


//identifica o login
firebase.auth().onAuthStateChanged(user => {
    if (user) {
          document.getElementById("nomeUser").innerHTML = user.email;

    } else {
      console.log('não logado');
      document.getElementById("nomeUser").innerHTML = null;
    }
  });


// Sign Out

btnLogOut.addEventListener('click', e =>{
    firebase.auth().signOut(); 
    //e.preventDefault();
});

//preventDefault é pra página não att