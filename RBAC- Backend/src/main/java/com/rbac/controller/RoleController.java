package com.rbac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.rbac.entity.Role;
import com.rbac.service.RoleService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import com.rbac.exception.*;

@RestController
@RequestMapping("/roles")
@CrossOrigin(origins = "http://localhost:3000")  // Frontend URL
public class RoleController {

    @Autowired
    private RoleService roleService;

    // Get all roles
    @GetMapping
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    // Add a new role
    @PostMapping
    public ResponseEntity<Role> addRole(@RequestBody Role role) {
        Role createdRole = roleService.addRole(role);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRole);
    }

    // Update an existing role
    @PutMapping("/{id}")
    public ResponseEntity<Role> updateRole(@PathVariable("id") Long roleId, @RequestBody Role updatedRole) {
        try {
            Role updated = roleService.updateRole(roleId, updatedRole);
            return ResponseEntity.ok(updated);
        } catch (RoleNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Delete a role
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable("id") Long roleId) {
        boolean deleted = roleService.deleteRole(roleId);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}