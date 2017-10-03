(function () {

    const config = {
        apiKey: "AIzaSyDF2U0_eL0mjwKGMc_eixpw0ygasL0E4RQ",
        authDomain: "generic-keep.firebaseapp.com",
        databaseURL: "https://generic-keep.firebaseio.com",
        projectId: "generic-keep",
        storageBucket: "generic-keep.appspot.com",
        messagingSenderId: "1084282928313"
    };
    firebase.initializeApp(config);

    const txtEmail = document.querySelector('#txtEmail');
    const txtPassword = document.querySelector('#txtPassword');
    const btnLogin = document.querySelector('#btnLogin');
    const emailLabel = document.querySelector('#email-label');
    const passwordLabel = document.querySelector('#password-label');

    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.then(ok => {
            const progressBar = document.querySelector('.progress');
            progressBar.classList.add("progress-active");
            sessionStorage.setItem('currentUser', auth.currentUser.uid);
            setTimeout(function () {
                document.location.href = "app.html";
            }, 2000);

        }).catch(e => {
            if (e.code == "auth/invalid-email") validateForm(emailLabel, "Informe um endereço de email válido", txtEmail, passwordLabel);
            if (e.code == "auth/wrong-password") validateForm(passwordLabel, "Informe uma senha válida", txtPassword, emailLabel);
            if (e.code == "auth/user-not-found") validateForm(emailLabel, "Usuário ou Senha Inválida", txtEmail, passwordLabel)
        });

    });

}());

function validateForm(label, message, focusComponent, removeLabel) {
    removeLabel.dataset.error = "";
    label.dataset.error = message;
    txtPassword.classList.add('invalid');
    txtEmail.classList.add('invalid');
    focusComponent.focus();
}