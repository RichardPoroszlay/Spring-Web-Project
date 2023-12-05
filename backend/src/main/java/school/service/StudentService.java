package school.service;

import school.dto.StudentDto;
import school.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    StudentDto addStudent(StudentDto newStudentDto);

    List<StudentDto> getAllStudents();

    boolean deleteStudent(Long id);

    boolean editStudent(Long id, Student editedStudent);

    Optional<StudentDto> getStudentById(Long id);
}
