import Endpoint from '../endpoint';
import database from '../../database/database';
import config from '../../config/config';
import peer from '../../network/peer';

/**
 * api update_advertisment
 */

class _ef710ca33ad9d2fb extends Endpoint {
    constructor() {
        super('ef710ca33ad9d2fb');
    }

     /**
     * updates ad and returns it content
     * @param app
     * @param req
     * @param res
     * @returns {*}
     */
    handler(app, req, res) {
        let payload;
        try {
            const {
                      p0
                  } = req.query;
            payload = JSON.parse(p0);
        }
        catch (e) {
            return res.status(400).send({
                api_status : 'fail',
                api_message: `p0 is not a valid JSON: ${e}`
            });
        }

        if (
            !payload.guid ||
            !payload.creative_name ||
            !payload.category ||
            !payload.headline ||
            !payload.deck ||
            !payload.url ||
            !payload.target_language ||
            !payload.search_phrase ||
            !payload.daily_budget_mlx ||
            !payload.bid_per_impressions_mlx||
            !payload.head_line_attribute_guid||
            !payload.deck_attribute_guid||
            !payload.target_phrase_attribute_guid||
            !payload.target_language_guid
        ) {
            return res.status(400).send({
                api_status : 'fail',
                api_message: `creative_name<creative_name>, category<category_guid>, headline<headline>, target_language<language>, deck<deck>, url<url>, search_phrase<search_phrase>, daily_budget_mlx<daily_budget_mlx>, bid_per_impressions_mlx<bid_per_1k_impressions_mlx>`
            });
        }

        

        const bidPerImpressionMLX = Math.floor(payload.bid_per_impressions_mlx);
        if (bidPerImpressionMLX > config.ADS_TRANSACTION_AMOUNT_MAX) {
            return res.status(400).send({
                api_status : 'fail',
                api_message: `bid_per_impressions_mlx (${payload.bid_per_impressions_mlx}) is greater than the maximum allowed value: max bid per impression is ${config.ADS_TRANSACTION_AMOUNT_MAX}, current value is ${bidPerImpressionMLX}`
            });
        }

        if (peer.protocolAddressKeyIdentifier === null) {
            return res.send({
                api_status : 'fail',
                api_message: `unexpected generic api error: (wallet not loaded)`
            });
        }

        let pipeline = Promise.resolve();
        pipeline.then(() => {
            const languageRepository   = database.getRepository('language');
            const advertiserRepository = database.getRepository('advertiser');

            const advertisementType         = 'text_headline_deck';
            const expiration                = Math.floor(Math.random() * 10) * 86400;
            const fundingAddress            = `${peer.protocolAddressKeyIdentifier}0a0${peer.protocolAddressKeyIdentifier}`;

            //todo: replace with actual data
            const budgetUSD        = Math.floor(Math.max(100, Math.random() * 1000));
            const bidImpressionUSD = Math.max(0.1, Math.random()).toFixed(2);

            return languageRepository
                .getLanguageByGuid(payload.target_language)
                .then((languageData) => {
                    return advertiserRepository.getCategoryByGuid(payload.category).then(categoryData => {
                        const advertisementAttributes = [
                            {
                                attribute_guid: payload.head_line_attribute_guid,
                                value         : payload.headline
                            },
                            {
                                attribute_guid: payload.deck_attribute_guid,
                                value         : payload.deck
                            },
                            {
                                attribute_guid: payload.target_language,
                                value         : payload.target_phrase
                            },
                            {
                                attribute_guid: payload.target_language_guid,
                                value         : languageData.language_code
                            }
                        ];

                        return advertiserRepository.updateAdvertisement(
                            payload.guid,
                            advertisementType,
                            categoryData.advertisement_category,
                            payload.creative_name,
                            payload.url,
                            fundingAddress,
                            budgetUSD,
                            payload.daily_budget_mlx,
                            bidImpressionUSD,
                            bidPerImpressionMLX,
                            expiration,
                            advertisementAttributes
                        ).then(advertisement => res.send({
                            api_status   : 'ok',
                            api_message  : 'created successfully',
                            advertisement: advertisement
                        }));
                    });

                }).catch(e => res.send({
                    api_status : 'fail',
                    api_message: `unexpected generic api error: (${e})`
                }));
        });
    }
}


export default new _ef710ca33ad9d2fb();