import {Database} from '../database';

export default class ConsumerAttributes {
    constructor(database) {
        this.database = database;
    }

    setNormalizationRepository(repository) {
        this.normalizationRepository = repository;
    }   

    getAttributes(where) {
        return new Promise((resolve, reject) => {
            const {
                    sql,
                    parameters
                } = Database.buildQuery('SELECT * FROM advertisement_consumer.advertisement_attribute',where);
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

    addAdvertisementsAttributes(ads) {
        return new Promise((resolve, reject) => {

            const advertisements = {};
            ads.forEach(advertisement => {
                advertisements[advertisement.advertisement_guid] = {
                    ...advertisement,
                    attributes: []
                };
            });

            const advertisementGUIDs = _.keys(advertisements);
            this.database.all(`SELECT *
                                FROM advertisement_consumer.advertisement_attribute
                                WHERE advertisement_guid IN (${advertisementGUIDs.map(() => '?').join(',')})`, advertisementGUIDs, (err, data) => {
                if (err) {
                    return reject(err);
                }

                data.forEach(attribute => {
                    advertisements[attribute.advertisement_guid].attributes.push({
                        attribute_guid: attribute.advertisement_attribute_guid,
                        attribute_type: this.normalizationRepository.getType(attribute.attribute_type_guid),
                        object        : this.normalizationRepository.getType(attribute.object_guid),
                        value         : attribute.value
                    });
                });

                resolve(_.values(advertisements));
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
                  } = Database.buildQuery('DELETE FROM advertisement_consumer.advertisement_attribute', where);
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