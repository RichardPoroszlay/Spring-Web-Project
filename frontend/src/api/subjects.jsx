export async function fetchSubjects() {
  const response = await fetch("http://localhost:8080/get-subjects");
  return response.json();
}

export async function deleteSubject(id) {
  const response = await fetch(`http://localhost:8080/delete-subject/${id}`, {
    method: "DELETE"
  });
  return response;
}

export async function createSubject(newSubject) {
  const response = await fetch("http://localhost:8080/add-subject", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newSubject)
  });
  return response;
}

export async function updateSubject(id, updatedSubject) {
  const response = await fetch(`http://localhost:8080/edit-subject/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedSubject)
  });

  return response;
}

export async function fetchSubject(id) {
  const response = await fetch(`http://localhost:8080/subject/${id}`);
  return response.json();
}
