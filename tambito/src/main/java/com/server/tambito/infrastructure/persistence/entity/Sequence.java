package com.server.tambito.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "sequence_generator")
@Data
public class Sequence {

    @Id
    private String name;

    private Long value;
}