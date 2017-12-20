import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AngularFireList } from 'angularfire2/database';
import { ClientService } from './../shared/client/client.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth/auth.service';
import { Client } from './../shared/client';
import { slideInOutAnimation } from '../animations/index';
 

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class ClientsComponent implements OnInit {
    public clients: Client[];
    public isLoggedIn;
    
    
    constructor(private clientService: ClientService, 
                private authService:  AuthService) { 
        authService.isAuthenticated()
        .subscribe(
          success => this.isLoggedIn = success
        )
    }

    ngOnInit() {
      var clientList = this.clientService.getclients('/clients');
      clientList.snapshotChanges().subscribe(client => {
        this.clients = [],
        client.forEach(list => {
          var listItem = list.payload.toJSON();
          listItem['$key'] = list.key;
          this.clients.push(listItem as Client);
        });
      });
      this.resetForm();
    }
    
    onSubmit(ngForm: NgForm){
      if(ngForm.value.$key == '')
        this.clientService.addClient(ngForm.value);
      else
        this.clientService.updateClient(ngForm.value)
      this.resetForm(ngForm);
    }
    resetForm(ngForm?: NgForm){
      if(ngForm != null)
        ngForm.reset();
      this.clientService.selectedClient = {
        $key : '',
        balance: 0,
        email: '',
        firstName: '',
        lastName: '',
        phone: 0
  
      }
    }
    deleteClient(ngForm: NgForm){
      this.clientService.deleteClient(ngForm.value.$key);
      this.resetForm(); 
    }

    onSelected(client: Client){
      this.clientService.selectedClient = Object.assign({}, client);
    }
  
}
