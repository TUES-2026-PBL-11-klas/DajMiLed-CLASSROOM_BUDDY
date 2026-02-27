package com.DaiMiLed.server.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.DaiMiLed.server.models.Material;

@Repository
public interface MaterialsRepository extends JpaRepository<Material, Long> {
    @Query(
        value = "SELECT m FROM Material m JOIN FETCH m.user WHERE m.subject = :subject",
        countQuery = "SELECT COUNT(m) FROM Material m WHERE m.subject = :subject"
    )
    Page<Material> findBySubjectWithUser(@Param("subject") String subject, Pageable pageable);
}