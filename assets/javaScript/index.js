// courses array
var courses;

//course variables
var courseName = document.getElementById('courseName');
var courseCategory = document.getElementById('courseCategory');
var coursePrice = document.getElementById('coursePrice');
var courseDescription = document.getElementById('courseDescription');
var currentIndex = 0;

//html tags to use
var tableBody = document.getElementById('display');
var addBtn = document.getElementById('add');
var deleteAllCourse = document.getElementById('deleteAllCourses');
var search = document.getElementById('search');
var clear = document.getElementById('clear');
var updateBtn = document.getElementById('update');


if( JSON.parse(localStorage.getItem('courses')) == null ) {
    courses = [];
} else {
    courses = JSON.parse(localStorage.getItem('courses'));
}
viewCourses();


//onClick function
addBtn.onclick = function(e) {
    e.preventDefault();
    var course = {
        cname: courseName.value,
        category: courseCategory.value,
        price: coursePrice.value,
        description: courseDescription.value,
    }
    if(addBtn.innerHTML == 'Add Course') {
        addCourse(course);
    }
    else if(addBtn.innerHTML == 'Update Course') {
        updateCourse();
    }
}

function addCourse(course) {
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
    clearInputs();
    viewCourses();
    Swal.fire(
        'Course successfully added!',
        'You add it!',
        'success'
      )
}

//clear inputs function
function clearInputs() {
    courseName.value = '';
    courseCategory.value = '';
    coursePrice.value = '';
    courseDescription.value = ''
}

//clear inputs from botton
clear.onclick = function(e) {
    e.preventDefault();
    clearInputs();
}

//display courses array in the table
function viewCourses() {

    var data = '';
    

    for( var i = 0; i < courses.length; i++ ) {
        data += `
        <tr>
            <td>${i+1}</td>
            <td>${courses[i].cname}</td>
            <td class="hideInSmall">${courses[i].category}</td>
            <td>${courses[i].price}</td>
            <td class="hideInSmall">${courses[i].description}</td>
            <td class="text-center"><button class="btn btn-success" onclick="editCourse(${i})" id="update">edit</button></td>
            <td class="text-center"><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>
        </tr>
        `;
    }
    tableBody.innerHTML = data;
}

// delete a course
function deleteCourse(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index, 1);
            localStorage.setItem('courses', JSON.stringify(courses));
            viewCourses();
            Swal.fire(
                'Deleted!',
                'Your cou has been deleted.',
                'success'
            )
        }
    })
}

//search for a course
function searchCourse() {
    var searchKey = search.value;

    var data = '';

    for( var i = 0; i < courses.length; i++ ) {
        if((courses[i].cname.toLowerCase().includes(searchKey.toLowerCase())) || (courses[i].category.toLowerCase().includes(searchKey.toLowerCase()))) {
        data += `
        <tr>
            <td>${i+1}</td>
            <td>${courses[i].cname}</td>
            <td class="hideInSmall">${courses[i].category}</td>
            <td>${courses[i].price}</td>
            <td class="hideInSmall">${courses[i].description}</td>
            <td class="text-center"><button class="btn btn-success" id="update">edit</button></td>
            <td class="text-center"><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>
        </tr>
        `}
    }
    tableBody.innerHTML = data;
}

//delete all courses
deleteAllCourses.onclick = function deleteAllCourses() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            courses = [];
            tableBody.innerHTML = '';
            localStorage.setItem('courses', JSON.stringify(courses));
            Swal.fire(
                'Deleted!',
                'Your course has been deleted.',
                'success'
            )
        }
    })
}

//update course calling function
function editCourse(index) {
    var current = courses[index]

    courseName.value = current.cname;
    courseCategory.value = current.category;
    coursePrice.value = current.price;
    courseDescription.value = current.description;

    addBtn.innerHTML = 'Update Course';
    currentIndex = index;
}

// update course data
function updateCourse() {
    var course = {
        cname: courseName.value,
        category: courseCategory.value,
        price: coursePrice.value,
        description: courseDescription.value,
    }
    var oldName = courses[currentIndex].cname;

    courses[currentIndex] = course;
    localStorage.setItem('courses', JSON.stringify(courses));
    viewCourses();
    clearInputs();
    addBtn.innerHTML = 'Add Course';

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${oldName} course updated`,
        showConfirmButton: false,
        timer: 2000
      })
}


//for name validation
courseName.onkeyup = function() {
    pattern = /^[A-Z][a-zA-Z\s0-9]{1,19}$/
    
    if(pattern.test(courseName.value)) {
        courseName.classList.remove('is-invalid');
        courseName.classList.add('is-valid');
        addBtn.removeAttribute('disabled');
    }
    else {
        courseName.classList.remove('is-valid');
        courseName.classList.add('is-invalid');
        addBtn.setAttribute('disabled','disabled');
    }
}

//for category validation
courseCategory.onkeyup = function() {
    pattern = /^[A-Z][a-zA-Z\s0-9]{1,19}$/
    
    if(pattern.test(courseCategory.value)) {
        courseCategory.classList.remove('is-invalid');
        courseCategory.classList.add('is-valid');
        addBtn.removeAttribute('disabled');
    }
    else {
        courseCategory.classList.remove('is-valid');
        courseCategory.classList.add('is-invalid');
        addBtn.setAttribute('disabled','disabled');
    }
}

//for price validation
coursePrice.onkeyup = function() {
    pattern = /^[0-9]{1,4}$/
    
    if(pattern.test(coursePrice.value)) {
        coursePrice.classList.remove('is-invalid');
        coursePrice.classList.add('is-valid');
        addBtn.removeAttribute('disabled');
    }
    else {
        coursePrice.classList.remove('is-valid');
        coursePrice.classList.add('is-invalid');
        addBtn.setAttribute('disabled','disabled');
    }
}

//for describtion validation
courseDescription.onkeyup = function() {
    pattern = /^[A-Za-zA-Z\s0-9]{2,100}$/
    
    if(pattern.test(courseDescription.value)) {
        courseDescription.classList.remove('is-invalid');
        courseDescription.classList.add('is-valid');
        addBtn.removeAttribute('disabled');
    }
    else {
        courseDescription.classList.remove('is-valid');
        courseDescription.classList.add('is-invalid');
        addBtn.setAttribute('disabled','disabled');
    }
}