import Endpoint from '../endpoint';
import database from '../../database/database';
import peer from '../../network/peer';

/**
 * api list_ad_by_consumer
 */

class _B1Gg7nMljx0yX9z9 extends Endpoint {
    constructor() {
        super('B1Gg7nMljx0yX9z9');
    }
    /**
     * returns list the last 24 hs of ads per consumer
     * @param app
     * @param req
     * @param res
     */
    handler(app, req, res) {
        if (peer.protocolAddressKeyIdentifier === null) {
            return res.send({
                api_status : 'fail',
                api_message: `unexpected generic api error: (wallet not loaded)`
            });
        }

        const {
            p0: from_unix_date
        } = req.query;

        let pipeline = Promise.resolve();
        pipeline.then(() => {
            const advertiserRepository = database.getRepository('consumer');
            return advertiserRepository.getAdsLedgerDetails({'settlement_ledger.create_date_min':from_unix_date}).then(data => res.send({
                    api_status          : 'ok',
                    api_message         : 'fetch successfull',
                    ad_list             : data
                }
            ));
        }).catch(e => res.send({
            api_status : 'fail',
            api_message: `unexpected generic api error: (${e})`
        }));
    
    }
}

export default new _B1Gg7nMljx0yX9z9();