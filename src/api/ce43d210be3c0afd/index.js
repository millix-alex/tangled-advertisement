import Endpoint from '../endpoint';
import database from '../../database/database';
import peer from '../../network/peer';

/**
 * api list_ad
 */

class _ce43d210be3c0afd extends Endpoint {
    constructor() {
        super('ce43d210be3c0afd');
    }

    /**
     * returns list of ads by given
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

        let pipeline = Promise.resolve();
        pipeline.then(() => {
            const advertiserRepository = database.getRepository('advertiser');
            return advertiserRepository.getAdvertisementRunningCounters().then(counters => res.send({
                    api_status        : 'ok',
                    api_message       : 'fetch successfull',
                    counters          : counters
                }
            ));
        }).catch(e => res.send({
            api_status : 'fail',
            api_message: `unexpected generic api error: (${e})`
        }));
    
    }
}

export default new _ce43d210be3c0afd();