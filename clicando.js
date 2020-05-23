
function clicando(){
    sla(); 
    const user = firebase.auth().currentUser;
    return firebase.firestore().collection('users').doc(user.uid).update({
       vendas: firebase.firestore.FieldValue.increment(1)
    });
};

function sla(){
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
