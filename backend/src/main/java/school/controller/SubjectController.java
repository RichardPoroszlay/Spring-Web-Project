package school.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.dto.SubjectDto;
import school.service.StudentService;
import school.service.SubjectService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/subjects")
public class SubjectController {

    private final SubjectService subjectService;

    @Autowired
    public SubjectController(SubjectService subjectService, StudentService studentService) {
        this.subjectService = subjectService;
    }

    @PostMapping("/add-subject")
    public SubjectDto newSubject(@RequestBody SubjectDto newSubjectDto) {
        return subjectService.addSubject(newSubjectDto);
    }

    @GetMapping("/get-subjects")
    public List<SubjectDto> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @DeleteMapping("/delete-subject/{id}")
    public ResponseEntity<String> deleteSubject(@PathVariable Long id) {
        if(subjectService.deleteSubject(id)) {
            return ResponseEntity.ok("Subject deleted with the id: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There is no subject with id: " + id);
        }
    }

    @PutMapping("/edit-subject/{id}")
    public ResponseEntity<String> editSubject(@PathVariable Long id, @RequestBody SubjectDto editedSubjectDto) {
        if(subjectService.editSubject(id, editedSubjectDto)) {
            return ResponseEntity.ok("Subject edited with the id: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There is no subject with id: " + id);
        }
    }

    @GetMapping("subject/{id}")
    public ResponseEntity<?> getSubjectById(@PathVariable Long id) {
        Optional<SubjectDto> subjectDto = subjectService.getSubjectById(id);

        if(subjectDto.isPresent()) {
            return ResponseEntity.ok(subjectDto.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There is no subject with id: " + id);
        }
    }
}
