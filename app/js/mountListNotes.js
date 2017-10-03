(function () {

    const currentUser = sessionStorage.getItem('currentUser');
    const notes = sessionStorage.getItem('notesDB-' + currentUser) ? JSON.parse(sessionStorage.getItem('notesDB-' + currentUser)) : [];
    if (notes.length > 0) {
        notes.forEach(function (note) {
            noteController.addNoteWithId(note.content, note.id);
        });
    }

})();