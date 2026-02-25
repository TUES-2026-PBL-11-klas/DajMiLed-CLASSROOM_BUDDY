package com.DaiMiLed.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DaiMiLed.server.models.Material;

@Repository
public interface MaterialsRepository extends JpaRepository<Material, Long>{}
