package school.service;

import school.dto.SubjectDto;

import java.util.List;
import java.util.Optional;

public interface SubjectService {
    SubjectDto addSubject(SubjectDto newSubjectDto);

    List<SubjectDto> getAllSubjects();

    boolean deleteSubject(Long id);

    boolean editSubject(Long id, SubjectDto editedSubject);

    Optional<SubjectDto> getSubjectById(Long id);
}
