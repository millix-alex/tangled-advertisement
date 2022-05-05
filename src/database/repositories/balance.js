import {Database} from '../database';

export default class Balance {
    constructor(database) {
        this.database = database;
    }

    get(where) {
        return new Promise((resolve, reject) => {
            const {
                    sql,
                    parameters
                } = Database.buildQuery('SELECT * FROM advertisement_advertiser.advertisement_balance',where);
            this.database.all(sql, parameters, (err, data) => {
                if (err) {
                    return reject(err);
                } 
                
                data.map(attribute => {
                    attribute.attribute_type= this.normalizationRepository.getType(attribute.attribute_type_guid)
                    attribute.object        = this.normalizationRepository.getType(attribute.object_guid)
                })
                resolve(data)
            });
        });
    }

    delete(where) {
        return new Promise((resolve, reject) => {

            if(!where){
                return reject("At least one condition must be specified");
            }

            const {
                      sql,
                      parameters
                  } = Database.buildQuery('DELETE FROM advertisement_advertiser.advertisement_balance', where);
            this.database.run(sql, parameters, (err) => {
                if (err) {
                    console.log('[database] error', err);
                    return reject(err);
                }
                resolve();
            });
        });
    }
}