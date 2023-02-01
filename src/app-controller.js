import { EventManager } from './utils/event-manager';
import { ChethanServiceClient } from './chethan-service-client';
import { View } from './view';

export function AppController() {

    this.eventmanager = new EventManager();

    this.initDependencies = function () {
        new View(this.eventmanager).init();
        new ChethanServiceClient(this.eventmanager).init()
        this.loadApp();
    }

    this.loadApp = function () {
        this.eventmanager.emit('appInitCompleted')
    }
};

new AppController().initDependencies()
