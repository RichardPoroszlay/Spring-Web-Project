package school.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import school.model.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {}