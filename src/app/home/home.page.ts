import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  public todoList: Array<{title: string, completed: boolean}> = [];
  addedTodo = '';

  constructor(public alertController: AlertController) {
    if(!this.todoList) {
      this.todoList = [];
    } else {
      this.todoList = JSON.parse(localStorage.getItem("todos"));
    }
  }

  async emptyAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'Unvalid value!',
      buttons: ['OK']
    });
  }

  add() {
    if(this.addedTodo != '') {
      console.log(this.addedTodo);
      this.todoList.push({title: this.addedTodo, completed: false});
      console.log(this.todoList);
      localStorage.setItem("todos", JSON.stringify(this.todoList));
    } else {
        this.emptyAlert();
    }
  }

  complete(index: number) {
    if(this.todoList[index].completed === true) {
      this.todoList[index].completed = false;
    } else {
      this.todoList[index].completed = true;
    }
    console.log(this.todoList);
    localStorage.setItem("todos", JSON.stringify(this.todoList));
  }

  async update(index: number) {
    let alert = await this.alertController.create({
      message: 'Edit your task',
      inputs: [{ name: 'editTask', placeholder: 'Task' }],
      buttons: [{ text: 'Cancel', role:'cancel' },
                { text: 'Update', handler: data => { this.todoList[index].title = data.editTask;
                                                     localStorage.setItem("todos", JSON.stringify(this.todoList)); }}]
    });
    alert.present();
  }

  delete(index: number) {
    this.todoList.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(this.todoList));
  }

}
