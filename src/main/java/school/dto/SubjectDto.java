package school.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubjectDto {
    private Long id;
    private String name;
    //private Set<StudentDto> enrolledStudents = new HashSet<>();
}
