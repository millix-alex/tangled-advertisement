import Endpoint from '../endpoint';
import database from '../../database/database';


/**
 * api remove_advertisment_by_id
 */

class _aa74f91cfcf3ddae extends Endpoint {
    constructor() {
        super('aa74f91cfcf3ddae');
    }

    /**
     * remove advertisment by id
     * @param app
     * @param req (p0: advertisement_guid<required>)
     * @param res
     */

    handler(app, req, res) {

        const {
                  p0: advertisementGUID
              } = req.query;                    
            
        const advertiserRepository = database.getRepository('advertiser');
        advertiserRepository.delete({advertisement_guid: advertisementGUID}).then(data => {
            const attributesRepository = database.getRepository('advertiser_attributes');
            return attributesRepository.delete({advertisement_guid: advertisementGUID});
        }).then(data => {
            const balanceRepository = database.getRepository('balance');
            return balanceRepository.delete({advertisement_guid: advertisementGUID});
        }).then(data => {
            const blockLogRepository = database.getRepository('block_log');
            return blockLogRepository.delete({advertisement_guid: advertisementGUID});
        }).then(data => {
            const clickLogRepository = database.getRepository('click_log');
            return clickLogRepository.delete({advertisement_guid: advertisementGUID});
        }).then(data => {
            const requestRepository = database.getRepository('request_log');
            return requestRepository.delete({advertisement_guid: advertisementGUID});
        }).then(data => {
            const ledgerRepository = database.getRepository('ledger');
            ledgerRepository.delete({advertisement_guid: advertisementGUID});
            res.send({
                api_status   : 'success',
                data: data
            });

        }).catch(e => {
            res.send({
                api_status : 'fail',
                api_message: `unexpected generic api error: (${e})`
            })
        })
    }
}


export default new _aa74f91cfcf3ddae();