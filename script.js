const firstName = document.getElementById("name");
const studentNo = document.getElementById("student-number");
const percentage = document.getElementById("percentage");
const button = document.getElementById("add-button");
const form = document.getElementById("mark-form");
const bubbleSortButton = document.getElementById("bubblesort-button")
const canvas = document.getElementById("myChart")
const showGraph = document.getElementById("show Graph-button")
const tablebody = document.getElementById("body");
const students = JSON.parse(localStorage.getItem('students')) || [];
let editingIndex = null;

document.addEventListener("DOMContentLoaded", addTable)
bubbleSortButton.addEventListener("click", () => {
    bubblesort();
    addTable();

});
showGraph.addEventListener("click", () => {
    bubblesort();
    addTable();
    revealChart()

})

function addStudent() {
    if (firstName.value === '' || studentNo.value === '' || percentage.value === '') {
        return;
    }

    const student = {
        firstName: firstName.value,
        studentNo: studentNo.value,
        percentage: percentage.value,
    };

    if (editingIndex !== null) {
        students[editingIndex] = student;
        editingIndex = null;
    } else {
        students.unshift(student);

    }
    localStorage.setItem('students', JSON.stringify(students));
    form.reset();
    addTable();
}

button.addEventListener("click", addStudent);

function bubblesort() {
    const system = students.length;
    for (let i = 0; i < system; i++) {
        for (let j = 0; j < system - 1; j++) {
            if (students[j].percentage > students[j + 1].percentage) {
                let temp = students[j];
                students[j] = students[j + 1]
                students[j + 1] = temp
            }
        }
    }
}

function addTable() {
    tablebody.innerHTML = "";
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.studentNo}</td>
            <td>${student.percentage}</td>
            <td>
                <button class"edit" onclick="editStudent(${index})">Edit</button>
                <button class"delete" onclick="deleteStudent(${index})">Delete</button>
                
            </td>
        `;
        tablebody.append(row);
    });
}


function editStudent(index) {

    const student = students[index];
    firstName.value = student.firstName;
    studentNo.value = student.studentNo;
    percentage.value = student.percentage;
    editingIndex = index;

    localStorage.setItem('students', JSON.stringify(students));
}

function deleteStudent(index) {

    students.splice(index, 1);
    addTable();
}

localStorage.setItem('students', JSON.stringify(students));


document.getElementById('student-number').addEventListener('input', function (event) {
    let value = event.target.value;
    if (value.length > 4) {
        value = value.slice(0, 4);
        event.target.value = value;
    }

});


function revealChart() {
    const label = students.map(student => `${student.firstName} (${student.studentNo})`);
    const data = students.map(student => student.percentage);

    new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: label,
            datasets: [{
                label: 'Percentage (%)',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 4
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }


    });
}
