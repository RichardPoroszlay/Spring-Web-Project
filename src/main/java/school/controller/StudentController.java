package school.controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.dto.StudentDto;
import school.model.Student;
import school.service.StudentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("students/")
public class StudentController {
    private final StudentService studentService;

    @Autowired

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/add-student")
    public StudentDto newStudent(@RequestBody StudentDto newStudentDto) {
        return studentService.addStudent(newStudentDto);
    }

    @GetMapping("/get-students")
    public List<StudentDto> getAllStudents() {
        return studentService.getAllStudents();
    }

    @DeleteMapping("delete-student/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        if(studentService.deleteStudent(id)) {
            return ResponseEntity.ok("Student deleted with the id: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There is no student with id: " + id);
        }
    }

    @PutMapping("/edit-student/{id}")
    public ResponseEntity<String> editStudent(@PathVariable Long id, @RequestBody Student editedStudent) {
        if(studentService.editStudent(id, editedStudent)) {
            return ResponseEntity.ok("Student edited with the id: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There is no student with id: " + id);
        }
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable Long id) {
        Optional<StudentDto> studentDto = studentService.getStudentById(id);

        if(studentDto.isPresent()) {
            return ResponseEntity.ok(studentDto.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There is no student with id: " + id);
        }
    }
}
