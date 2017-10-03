const noteController = (function () {

    const currentUser = sessionStorage.getItem('currentUser');
    let counter = sessionStorage.getItem('counter-' + currentUser) > 0 ? sessionStorage.getItem('counter-' + currentUser) : 1;
    let addNoteCounter = sessionStorage.getItem('counter-' + currentUser) > 0 ? sessionStorage.getItem('counter-' + currentUser) : 1;

    function addNote(content) {

        const contentP = $('<p>').text(content).addClass('note-content');
        const info = addNotesInfo(addNoteCounter);
        const date = $('<span>').text(getDate());
        info.prepend(date);

        $('<div>').attr('id', 'note_' + (addNoteCounter))
            .addClass('card-panel')
            .addClass('teal')
            .append(contentP)
            .append(info)
            .prependTo(".note-container");
        addNoteCounter++;
    }

    function addNoteWithId(content, id) {
        const contentP = $('<p>').text(content).addClass('note-content');
        const info = addNotesInfo(id);
        const date = $('<span>').text(getDate());
        info.prepend(date);

        $('<div>').attr('id', 'note_' + id)
            .addClass('card-panel')
            .addClass('teal')
            .append(contentP)
            .append(info)
            .prependTo(".note-container");
    }

    function saveNote(content) {

        syncDB.writeNoteToDB(content, counter, currentUser, getDate());
        sessionStorage.setItem('counter-' + currentUser, counter);
        counter++;
    }

    return {
        addNote: addNote,
        saveNote: saveNote,
        addNoteWithId: addNoteWithId,
        lastId: function () {
            return counter;
        }
    }
})();

function getDate() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    const fullDate = day + '/' + month + '/' + year;

    return fullDate;
}