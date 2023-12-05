package school.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import school.dto.StudentDto;
import school.model.Student;
import school.repository.StudentRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    private final ModelMapper modelMapper;
    private final StudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(ModelMapper modelMapper, StudentRepository studentRepository) {
        this.modelMapper = modelMapper;
        this.studentRepository = studentRepository;
    }

    @Override
    public StudentDto addStudent(StudentDto newStudentDto) {
        Student newStudent = modelMapper.map(newStudentDto, Student.class);
        Student savedStudent = studentRepository.save(newStudent);
        return modelMapper.map(savedStudent, StudentDto.class);
    }

    @Override
    public List<StudentDto> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        List<StudentDto> studentDtos = students.stream()
                .map(student -> modelMapper.map(student, StudentDto.class))
                .collect(Collectors.toList());
        return studentDtos;
    }

    @Override
    public boolean deleteStudent(Long id) {
        if(studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean editStudent(Long id, Student editedStudent) {
        Optional<Student> optionalStudent = studentRepository.findById(id);

        if(optionalStudent.isPresent()) {
            Student existingStudent = optionalStudent.get();
            existingStudent.setName(editedStudent.getName());
            existingStudent.setSubject(editedStudent.getSubject());

            studentRepository.save(existingStudent);
            return true;
        }
        return false;
    }

    @Override
    public Optional<StudentDto> getStudentById(Long id) {
        Optional<Student> optionalStudent = studentRepository.findById(id);

        if(optionalStudent.isPresent()) {
            StudentDto studentDto = modelMapper.map(optionalStudent.get(), StudentDto.class);
            return Optional.of(studentDto);
        } else {
            return Optional.empty();
        }
    }
}
