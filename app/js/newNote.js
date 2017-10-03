(function () {

    const btnSave = document.querySelector('#btn-save');
    btnSave.addEventListener('click', function (e) {
        txtContent = $('#txt-note').val();

        if (txtContent) {
            noteController.addNote(txtContent);
            noteController.saveNote(txtContent);
        }
        $('#txt-note').val('');

        e.preventDefault();

    });

})()