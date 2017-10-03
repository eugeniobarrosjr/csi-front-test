const addNotesInfo = (function () {

    function removeNote() {
        const note = document.querySelector('#note_' + this.dataset.id);
        note.classList.add('note-invisible');
        var id = this.dataset.id;
        const currentUser = sessionStorage.getItem('currentUser');
        setTimeout(function () {
            syncDB.removeNoteToDB(id, currentUser);
            note.remove();
        }, 400);
    }

    let editable = false;

    function editNote() {
        var id = this.dataset.id;
        const currentUser = sessionStorage.getItem('currentUser');
        const note = $("#note_" + id);
        const txtContent = note.find(".note-content");

        if (editable) {
            editable = false;
            txtContent.attr("contenteditable", false);
            txtContent.blur();
        } else {
            editable = true;
            txtContent.attr("contenteditable", true);
            txtContent.focus();
        }

        txtContent.blur(function () {
            syncDB.updateNoteToDb(id, currentUser, txtContent.text())
        });

    }

    return function (idNote) {

        const btnEdit = $('<a>')
            .attr("data-id", idNote)
            .addClass('clickable')
            .attr("title", 'Editar anotação')
            .html('<i class="material-icons prefix">mode_edit</i>')
            .click(editNote)

        const btnRemove = $("<a>")
            .attr("data-id", idNote)
            .addClass('clickable')
            .attr("title", 'Excluir anotação')
            .html('<i class="material-icons prefix">cancel</i>')
            .click(removeNote);

        return $("<p>").addClass("right-align")
            .append(btnEdit)
            .append(btnRemove);
    }

})();