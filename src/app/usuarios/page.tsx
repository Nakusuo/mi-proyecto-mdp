'use client';

import React, { useState, useEffect } from 'react';

type User = {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  activo: boolean;
  roles: string[];
};

type Role = {
  ID_rol: number;
  nombre: string;
};

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  // Cerrar modal con ESC
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 999,
          cursor: 'pointer',
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 30,
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          width: '90%',
          maxWidth: 450,
          zIndex: 1000,
          cursor: 'default',
        }}
      >
        {children}
      </div>
    </>
  );
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<{ roles: string[]; password: string }>({ roles: [], password: '' });

  useEffect(() => {
    async function fetchData() {
      try {
        const resUsers = await fetch('/api/users');
        const usersData = await resUsers.json();

        const normalizedUsers = usersData.map((user: any) => ({
          ...user,
          roles: user.roles ?? [],
        }));

        setUsers(normalizedUsers);

        const resRoles = await fetch('/api/roles');
        const rolesData = await resRoles.json();
        setRoles(rolesData);
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    }
    fetchData();
  }, []);

  const startEditing = (user: User) => {
    setEditingUser(user);
    setEditForm({ roles: [...user.roles], password: '' });
  };

  const saveChanges = async (id: number) => {
    try {
      await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      setEditingUser(null);
      // Actualizar usuarios para reflejar cambios
      const resUsers = await fetch('/api/users');
      const usersData = await resUsers.json();
      setUsers(usersData.map((user: any) => ({ ...user, roles: user.roles ?? [] })));
    } catch (error) {
      console.error('Error guardando cambios:', error);
    }
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: '40px auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#222',
        backgroundColor: '#f9f9fb',
        borderRadius: 8,
        padding: 20,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: 30, color: '#2c3e50' }}>Gestión de Usuarios</h1>

      {users.length === 0 && <p style={{ textAlign: 'center', color: '#999' }}>Cargando usuarios...</p>}

      {users.map(user => (
        <div
          key={user.id}
          style={{
            padding: '15px 20px',
            marginBottom: 15,
            borderRadius: 6,
            backgroundColor: '#fff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <b style={{ color: '#34495e' }}>
              {user.nombre} {user.apellido}
            </b>{' '}
            - <span style={{ color: '#7f8c8d' }}>{(user.roles ?? []).join(', ') || 'Sin roles'}</span>
          </div>
          <button
            onClick={() => startEditing(user)}
            style={{
              backgroundColor: '#2980b9',
              color: '#fff',
              border: 'none',
              padding: '6px 14px',
              borderRadius: 4,
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3498db')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2980b9')}
          >
            Editar
          </button>
        </div>
      ))}

      {editingUser && (
        <Modal onClose={() => setEditingUser(null)}>
          <h2 style={{ marginTop: 0, marginBottom: 20, color: '#2c3e50' }}>
            Editar: {editingUser.nombre} {editingUser.apellido}
          </h2>

          <label
            htmlFor="rolesSelect"
            style={{ display: 'block', marginBottom: 8, fontWeight: '600', color: '#2c3e50' }}
          >
            Roles (mantén Ctrl o Cmd para seleccionar varios)
          </label>
          <select
            id="rolesSelect"
            multiple
            value={editForm.roles}
            onChange={e => {
              const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
              setEditForm({ ...editForm, roles: selectedOptions });
            }}
            style={{
              width: '100%',
              height: 110,
              fontSize: 15,
              padding: 8,
              borderRadius: 5,
              border: '1px solid #ccc',
              color: '#34495e',
              backgroundColor: '#fff',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
              outlineColor: '#2980b9',
              userSelect: 'none',
            }}
          >
            {roles.map(role => (
              <option key={role.ID_rol} value={role.nombre}>
                {role.nombre}
              </option>
            ))}
          </select>

          <label
            htmlFor="passwordInput"
            style={{ display: 'block', marginTop: 15, marginBottom: 8, fontWeight: '600', color: '#2c3e50' }}
          >
            Nueva Contraseña
          </label>
          <input
            id="passwordInput"
            type="password"
            placeholder="Nueva contraseña"
            value={editForm.password}
            onChange={e => setEditForm({ ...editForm, password: e.target.value })}
            style={{
              width: '100%',
              padding: 8,
              fontSize: 15,
              borderRadius: 5,
              border: '1px solid #ccc',
              outlineColor: '#2980b9',
              color: '#34495e',
            }}
          />

          <div style={{ marginTop: 25, display: 'flex', gap: 12 }}>
            <button
              onClick={() => saveChanges(editingUser.id)}
              style={{
                flex: 1,
                backgroundColor: '#27ae60',
                color: 'white',
                padding: '12px 0',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2ecc71')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#27ae60')}
            >
              Guardar
            </button>
            <button
              onClick={() => setEditingUser(null)}
              style={{
                flex: 1,
                backgroundColor: '#c0392b',
                color: 'white',
                padding: '12px 0',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e74c3c')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#c0392b')}
            >
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
