import api from '../api/server';
import database from '../database/database';
import network from '../network/network';
import peer from '../network/peer';
import configLoader from '../config/config-loader';
import ntp from './ntp';


class Service {
    constructor() {
        this.initialized = false;
    }

    initialize(options = {}) {
        if (this.initialized) {
            return Promise.resolve();
        }
        this.initialized = true;
        return database.initialize()
                       .then(() => configLoader.load())
                       .then(() => database.checkup())
                       .then(() => ntp.initialize())
                       .then(() => peer.initialize())
                       .then(() => network.initialize())
                       .then(() => api.initialize())
                       .catch(e => {
                           console.log(`[service] ${e && (e.message || e.api_message) || e}`);
                           peer.stop();
                           network.stop();
                           api.stop();
                           this.initialized = false;
                           return new Promise(resolve => setTimeout(() => this.initialize(options).then(resolve), 5000));
                       });
    }

    stop() {
        if (!this.initialized) {
            return;
        }
        this.initialized = false;
    }
}


export default new Service();
