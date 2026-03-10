
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes(){
    localStorage.setItem("notes", JSON.stringify(notes));
}

function displayNotes(){

    let container = document.querySelector("#notesContainer");
    container.innerHTML = "";

    notes.forEach((note,index)=>{

        let div = document.createElement("div");
        div.className="note";

        div.innerHTML = `
        <p id="note-${index}">${note}</p>
        <button onclick="editNote(${index})">Edit</button>
        <button onclick="deleteNote(${index})">Delete</button>
        `;

        container.appendChild(div);

    });
}

document.querySelector("#addNote").addEventListener("click",()=>{

    let text = document.querySelector("#noteInput").value;

    if(text.trim() !== ""){
        notes.push(text);
        saveNotes();
        displayNotes();
        document.querySelector("#noteInput").value="";
    }

});

function deleteNote(index){

    notes.splice(index,1);

    saveNotes();

    displayNotes();
}

function editNote(index){

    let newText = prompt("Edit your note:", notes[index]);

    if(newText !== null && newText.trim() !== ""){
        notes[index] = newText;
        saveNotes();
        displayNotes();
    }

}

displayNotes();
