package com.rbac.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.rbac.entity.Role;
import com.rbac.repository.RoleRepository;
import com.rbac.exception.RoleNotFoundException;
@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    // Fetch all roles
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    // Add a new role
    public Role addRole(Role role) {
        return roleRepository.save(role);
    }

    // Update an existing role
    public Role updateRole(Long roleId, Role updatedRole) {
        return roleRepository.findById(roleId)
                .map(existingRole -> {
                    updatedRole.setId(roleId);
                    return roleRepository.save(updatedRole);
                })
                .orElseThrow(() -> new RoleNotFoundException("Role with ID " + roleId + " not found"));
    }

    // Delete a role by id
    public boolean deleteRole(Long roleId) {
        if (roleRepository.existsById(roleId)) {
            roleRepository.deleteById(roleId);
            return true;
        } else {
            return false;
        }
    }
}