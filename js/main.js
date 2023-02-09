let studentName = document.getElementById('studentName');
let studentID = document.getElementById('studentID');
let studentGrade = document.getElementById('studentGrade');
let note = document.getElementById('note');
let mainBtn = document.getElementById('mainBtn');

// let students = [];
let students;
if(localStorage.getItem("studentData") == null){ //first time in website so no data stored yet => new customer => null
    students = [];
}else{
    students = JSON.parse(localStorage.getItem("studentData")); //old customer => there is old [stored] data =>not null
    displayData();
}
function stNameValidation(){
    let regx = /^[A-Z][a-z]{2,5}$/;

    if(regx.test(studentName.value) == true){
        studentName.classList.add("is-valid");  //bootstrab 5v class
        studentName.classList.remove("is-invalid");
        return true;
    }else{
        studentName.classList.add("is-invalid");
        studentName.classList.remove("is-valid");
        return false;
    }
}
studentName.addEventListener('keyup', stNameValidation);

function addStudent(){
    if (stNameValidation() == true){
        let student = {
            name: studentName.value,
            id: studentID.value,
            grade: studentGrade.value,
            stNote: note.value
        }
        students.push(student);
        localStorage.setItem("studentData", JSON.stringify(students)); //save data in browser local storage
        mainBtn.innerHTML = 'Add Student'; //so it return back after update
        displayData()
        clearData();
        console.log(students);
    }
};



mainBtn.addEventListener('click', addStudent);

function clearData() {
    
    studentName.value = '';
    studentID.value = '';
    studentGrade.value = '';
    note.value = '';
}

function displayData() {
    let data = '';
    for(let i = 0; i < students.length; i++){
        data += `<tr >
        <td>${i+1}</td>
        <td>${students[i].name}</td>
        <td>${students[i].id}</td>
        <td >${students[i].grade}</td>
        <td>${students[i].stNote}</td>
        <td><button onclick='update(${i})' class="btn btn-warning" id="update">Update</button></td>
        <td><button onclick='deletStudent(${i})' class="btn btn-danger" id="delete">Delete</button></td>
    </tr>`
    }
    document.getElementById('stData').innerHTML = data;
}

function deletStudent(stIndex) {
    
    students.splice(stIndex, 1);
    localStorage.setItem("studentData", JSON.stringify(students)); //save changed data in browser local storage
    displayData();
}

function search(stSearch) {

    let data = '';
    for(let i = 0; i < students.length; i++){
        if (students[i].name.toLowerCase().includes(stSearch.toLowerCase()) == true) {
                data += `<tr >
                <td>${i+1}</td>
                <td>${students[i].name}</td>
                <td>${students[i].id}</td>
                <td >${students[i].grade}</td>
                <td>${students[i].stNote}</td>
                <td><button class="btn btn-warning" id="update">Update</button></td>
                <td><button onclick='deletStudent(${i})' class="btn btn-danger" id="delete">Delete</button></td>
            </tr>`
        }else{
            console.log('Not found');
        }
    }
    document.getElementById('stData').innerHTML = data;
}

function update(stIndex) {
    studentName.value = students[stIndex].name;
    studentID.value = students[stIndex].id;
    studentGrade.value =students[stIndex].grade;
    note.value = students[stIndex].note;
    mainBtn.innerHTML = 'Update';
    deletStudent(stIndex);
}