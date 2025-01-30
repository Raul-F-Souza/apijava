package com.senai.apijava.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senai.apijava.model.Aluno;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {

}