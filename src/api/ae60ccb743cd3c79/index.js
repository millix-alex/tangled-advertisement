import Endpoint from '../endpoint';
import database from '../../database/database';


/**
 * api get_advertisment_by_id
 */

class _ae60ccb743cd3c79 extends Endpoint {
    constructor() {
        super('ae60ccb743cd3c79');
    }

     /**
     * returns advertisment by id
     * @param app
     * @param req (p0: advertisement_guid<required>)
     * @param res
     */

    handler(app, req, res) {

        const {
            p0: advertisementGUID
        } = req.query;

        const advertiserRepository = database.getRepository('advertiser');
        advertiserRepository.getAdvertisementById(advertisementGUID)
                            .then(data => res.send(data))
                            .catch(e => res.send({
                                api_status : 'fail',
                                api_message: `unexpected generic api error: (${e})`
                            }));
       /* advertiserRepository.getAdvertisement(advertisementGUID)
        .then(advertisement => res.send({
            api_status   : 'ok',
            advertisement: advertisement
        }))*/

                        
    }

}


export default new _ae60ccb743cd3c79();