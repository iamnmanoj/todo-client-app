import { TodoItem } from './todo-item';
import config from '../config.json';

//data or store
export function ChethanServiceClient(eventManager) {

  this.apiURL = config.serviceURL;
  this.eventManager = eventManager;

  this.init = function () {
    this.eventManager.subscribe('appInitCompleted', () => {
      this.get().then((response) => {
        this.eventManager.emit('dataLoadCompleted', response);
      })
    });
  }
}

ChethanServiceClient.prototype.get = async function () {
  return (await fetch(this.apiURL, { method: 'Get' })).json();
};
ChethanServiceClient.prototype.set = async (options) => {
  //Set the headers here
  const headers = new Headers();
  headers.append('content-type', 'application/json');

  return (await fetch(this.apiURL, {
    ...options,
    headers,
  })).json();
};
ChethanServiceClient.prototype.create = async function (name) {
  try {
    return this.set({
      method: 'POST',
      body: JSON.stringify(new TodoItem(name)),
    });
  } catch (e) {
    console.log('Something went wrong');
  }
};
ChethanServiceClient.prototype.edit = async function (taskId, body) {
  return this.set(`/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
};
ChethanServiceClient.prototype.delete = async function (taskId) {
  return this.set(`/${taskId}`, {
    method: 'DELETE',
  });
};