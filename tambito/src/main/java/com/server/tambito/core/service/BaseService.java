package com.server.tambito.core.service;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

public abstract class BaseService<E, ID> {

    protected final JpaRepository<E, ID> repo;

    protected BaseService(JpaRepository<E, ID> repo) {
        this.repo = repo;
    }

    public List<E> findAll() {
        return repo.findAll();
    }

    public Optional<E> findById(ID id) {
        return repo.findById(id);
    }

    public E save(E entity) {
        return repo.save(entity);
    }

    public E update(E entity) {
        return repo.save(entity);
    }

    public void deleteById(ID id) {
        repo.deleteById(id);
    }
}