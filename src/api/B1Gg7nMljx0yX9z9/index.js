import Endpoint from '../endpoint';
import database from '../../database/database';
import peer from '../../network/peer';

/**
 * api list_ledger_details_by_advetisement
 */

class _B1Gg7nMljx0yX9z9 extends Endpoint {
    constructor() {
        super('B1Gg7nMljx0yX9z9');
    }
    /**
     * returns ledger details by advertisement
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
            return advertiserRepository.getAdsLedger({payment_date_min:0}).then(data => {
                if(data){     
                    let attributesRepository = database.getRepository('consumer_attributes');       
                    attributesRepository.addAdvertisementsAttributes(data).then(advertisements => {   
                        for (const advertisement of advertisements){
                            for (const attribute of advertisement.attributes){
                                advertisement[attribute.attribute_type] = attribute.value; 
                            }
                        }                        
                        res.send({
                            api_status          : 'ok',
                            api_message         : 'fetch successfull',
                            ad_list             : advertisements
                        })
                    }).catch(e => res.send({
                        api_status : 'fail',
                        api_message: `unexpected generic api error: (${e})`
                    }));
                }
                else{
                    res.send({
                        api_status : 'success',
                        api_message: `advertisement not found`
                    });
                }
            })    
                
        }).catch(e => res.send({
            api_status : 'fail',
            api_message: `unexpected generic api error: (${e})`
        }));
    }
}

export default new _B1Gg7nMljx0yX9z9();