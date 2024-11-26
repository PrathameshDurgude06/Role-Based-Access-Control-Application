package com.rbac.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rbac.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
