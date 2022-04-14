import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from  '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './cliente-details.component.html',
  styleUrls: ['./cliente-details.component.css']
})
export class EditComponent implements OnInit {

  currentCliente: Cliente = {
    nome: '',
    cpf_cnpj: '',
    rua: '',
    bairro: '',
    cidade: '',
    cep: '',
    uf: '',
    fone: '',
    dataNasc: '',
    tipo: '',
    sexo: ''
  };
  message = '';

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getCliente(this.route.snapshot.params['id']);
  }

  getCliente(id: string): void {
    this.clienteService.get(id)
      .subscribe(
        data => {
          this.currentCliente = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentCliente.nome,
      description: this.currentCliente.cpf_cnpj,
      published: status
    };

    this.message = '';

    this.clienteService.update(this.currentCliente.codCli, data)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This Cliente was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  updateCliente(): void {
    this.message = '';

    this.clienteService.update(this.currentCliente.codCli, this.currentCliente)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This Cliente was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteCliente(): void {
    this.clienteService.delete(this.currentCliente.codCli)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/clientes']);
        },
        error => {
          console.log(error);
        });
  }

}
