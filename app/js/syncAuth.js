(function () {

    firebase.initializeApp(getFirebaseConfig());

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            sessionStorage.setItem('currentUser', user.uid);
        } else {
            document.location.href = "index.html";
        }
    });

    const signout = document.querySelector('#sign-out');
    signout.addEventListener('click', e => {
        sessionStorage.removeItem('currentUser');
        $('#note-container').html('');
        firebase.auth().signOut();
    });


}());

function getFirebaseConfig() {
    const config = {
        apiKey: "AIzaSyDF2U0_eL0mjwKGMc_eixpw0ygasL0E4RQ",
        authDomain: "generic-keep.firebaseapp.com",
        databaseURL: "https://generic-keep.firebaseio.com",
        projectId: "generic-keep",
        storageBucket: "generic-keep.appspot.com",
        messagingSenderId: "1084282928313"
    };
    return config;

}