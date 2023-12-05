export async function fetchStudents() {
  const response = await fetch("http://localhost:8080/students/get-students");
  return response.json();
}

export async function deleteStudent(id) {
  const response = await fetch(`http://localhost:8080/students/delete-student/${id}`, {
    method: "DELETE"
  });
  return response;
}

export async function createStudent(newStudent) {
  const response = await fetch("http://localhost:8080/students/add-student", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newStudents)
  });
  return response;
}

export async function updateStudent(id, updatedStudent) {
  const response = await fetch(`http://localhost:8080/students/edit-student/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedStudent)
  });

  return response;
}

export async function fetchStudent(id) {
  const response = await fetch(`http://localhost:8080/students/student/${id}`);
  return response.json();
}