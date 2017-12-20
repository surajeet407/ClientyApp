import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Client } from './../client';

@Injectable()
export class ClientService {
  clients: AngularFireList<any>;
  selectedClient: Client  = new Client();

  constructor(private db: AngularFireDatabase) { }
  
  getclients(listPath) {
    this.clients = this.db.list(listPath);
    return this.clients;
  }
  addClient(client: Client){
    this.clients.push({
      balance: client.balance,
      email: client.email,
      firstName: client.firstName,
      lastName: client.lastName,
      phone: client.phone
    });
  }
  updateClient(client: Client){
    this.clients.update(client.$key, {
      balance: client.balance,
      email: client.email,
      firstName: client.firstName,
      lastName: client.lastName,
      phone: client.phone
    });
  }
  deleteClient(key: string){
    this.clients.remove(key);
  }
}
