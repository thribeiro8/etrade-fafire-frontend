import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from  '../../services/cliente.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  clientes?: Cliente[];
  currentCliente?: Cliente;
  currentIndex = -1;
  nome = '';

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.retrieveClientes();
  }

  retrieveClientes(): void {
    this.clienteService.getAll()
      .subscribe(
        data => {
          this.clientes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveClientes();
    this.currentCliente = undefined;
    this.currentIndex = -1;
  }

  setActiveCliente(cliente: Cliente, index: number): void {
    this.currentCliente = cliente;
    this.currentIndex = index;
  }


  searchNome(): void {
    this.currentCliente = undefined;
    this.currentIndex = -1;

    this.clienteService.findByNome(this.nome)
      .subscribe(
        data => {
          this.clientes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
