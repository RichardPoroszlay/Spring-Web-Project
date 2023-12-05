package school.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import school.dto.SubjectDto;
import school.model.Subject;
import school.repository.SubjectRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubjectServiceImpl implements SubjectService {

    private final ModelMapper modelMapper;
    private final SubjectRepository subjectRepository;

    @Autowired
    public SubjectServiceImpl(ModelMapper modelMapper, SubjectRepository subjectRepository) {
        this.modelMapper = modelMapper;
        this.subjectRepository = subjectRepository;
    }

    @Override
    public SubjectDto addSubject(SubjectDto newSubjectDto) {
        Subject newSubject = modelMapper.map(newSubjectDto, Subject.class);
        Subject savedSubject = subjectRepository.save(newSubject);
        return modelMapper.map(savedSubject, SubjectDto.class);
    }

    @Override
    public List<SubjectDto> getAllSubjects() {
        List<Subject> subjects = subjectRepository.findAll();
        List<SubjectDto> subjectDtos = subjects.stream()
                .map(subject -> modelMapper.map(subject, SubjectDto.class))
                .collect(Collectors.toList());
        return subjectDtos;
    }

    @Override
    public boolean deleteSubject(Long id) {
        if(subjectRepository.existsById(id)) {
            subjectRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public boolean editSubject(Long id, SubjectDto editedSubject) {
        Optional<Subject> optionalSubject = subjectRepository.findById(id);

        if(optionalSubject.isPresent()) {
            Subject existingSubject = optionalSubject.get();
            existingSubject.setName(editedSubject.getName());
            // existingSubject.setEnrolledStudents(editedSubject.getEnrolledStudents());

            subjectRepository.save(existingSubject);
            return true;
        }
        return false;
    }

    @Override
    public Optional<SubjectDto> getSubjectById(Long id) {
        Optional<Subject> optionalSubject = subjectRepository.findById(id);

        if(optionalSubject.isPresent()) {
            SubjectDto subjectDto = modelMapper.map(optionalSubject.get(), SubjectDto.class);
            return Optional.of(subjectDto);
        } else {
            return Optional.empty();
        }
    }
}
