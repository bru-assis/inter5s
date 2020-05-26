
function clicando(){
    gamificacao(); 
    const user = firebase.auth().currentUser;
    return firebase.firestore().collection('users').doc(user.uid).update({
       vendas: firebase.firestore.FieldValue.increment(1)//add uma função dessa no authstatechanged pra salvar os logins,ai funciona no mesmo esquema
    });
};

function gamificacao(){
    const user = firebase.auth().currentUser;
    const ref = firebase.firestore().collection('users').doc(user.uid);

    ref.onSnapshot(snapshot => {
      var cliques = snapshot.data().vendas;
      console.log(cliques);
      if(cliques > 10){
        document.getElementById("medal1").style = "background-color: purple; opacity: 100%";
     
       };
   
      if(cliques == 30){
        document.getElementById("medal1").style = "background-color: green; opacity: 100%";
       };
    });
 
}

