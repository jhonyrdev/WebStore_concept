import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from './models/cliente.model';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  searchTerm: string = '';
  selectedStatus: string = 'todos';
  showAddForm: boolean = false;
  newCliente: Cliente = {
    id: 0,
    nombre: '',
    correo: '',
    telefono: '',
    estado: 'Activo',
    fechaRegistro: new Date().toISOString().split('T')[0],
    totalCompras: 0
  };

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  get filteredClientes(): Cliente[] {
    return this.clientes.filter(c => {
      const matchSearch = c.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                         c.correo.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = this.selectedStatus === 'todos' || c.estado === this.selectedStatus;
      return matchSearch && matchStatus;
    });
  }

  deleteCliente(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      this.clienteService.deleteCliente(id);
    }
  }

  addCliente(): void {
    if (this.newCliente.nombre && this.newCliente.correo && this.newCliente.telefono) {
      this.clienteService.addCliente(this.newCliente);
      this.newCliente = {
        id: 0,
        nombre: '',
        correo: '',
        telefono: '',
        estado: 'Activo',
        fechaRegistro: new Date().toISOString().split('T')[0],
        totalCompras: 0
      };
      this.showAddForm = false;
    }
  }

  toggleForm(): void {
    this.showAddForm = !this.showAddForm;
  }
}
