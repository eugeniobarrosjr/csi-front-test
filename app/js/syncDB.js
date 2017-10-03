const syncDB = (function () {

    function writeNoteToDB(content, id, currentUser, date) {
        const note = {
            id: id,
            content: content,
            date: date
        }

        const notes = sessionStorage.getItem('notesDB-' + currentUser) ? JSON.parse(sessionStorage.getItem('notesDB-' + currentUser)) : [];
        notes.push(note);
        sessionStorage.setItem('notesDB-' + currentUser, JSON.stringify(notes));
    }

    function removeNoteToDB(id, currentUser) {
        const notes = sessionStorage.getItem('notesDB-' + currentUser) ? JSON.parse(sessionStorage.getItem('notesDB-' + currentUser)) : [];
        console.log(notes);
        $.each(notes, function (i) {

            if (notes[i].id == id) {
                console.log('foi');
                notes.splice(i, 1);
                return false;
            }
        });
        sessionStorage.setItem('notesDB-' + currentUser, JSON.stringify(notes));
    }

    function updateNoteToDb(id, currentUser, value) {
        const notes = sessionStorage.getItem('notesDB-' + currentUser) ? JSON.parse(sessionStorage.getItem('notesDB-' + currentUser)) : [];
        $.each(notes, function (i) {
            if (notes[i].id == id) {
                notes[i].content = value;
            }
        });
        sessionStorage.setItem('notesDB-' + currentUser, JSON.stringify(notes));
    }

    return {
        writeNoteToDB: writeNoteToDB,
        removeNoteToDB: removeNoteToDB,
        updateNoteToDb: updateNoteToDb
    };

})();