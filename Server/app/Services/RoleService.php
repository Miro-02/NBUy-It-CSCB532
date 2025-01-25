<?php

namespace App\Services;

use App\Models\Role;

class RoleService
{
    public function getAll()
    {
        return Role::all();
    }

    public function getById($id)
    {
        return Role::findOrFail($id);
    }

    /* public function create(array $data)
    {
        return Role::create($data);
    }

    public function update($id, array $data)
    {
        $role = Role::findOrFail($id);
        $role->update($data);
        return $role;
    }

    public function delete($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
    } */
}
