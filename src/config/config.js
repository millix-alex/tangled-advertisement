export const DEBUG                       = false;
export const MODE_TEST                   = false;
export const VERSION                     = '1.0.0';
export const NAME                        = 'tangled-advertisement';
export const DATABASE_ENGINE             = 'sqlite';
export const NODE_PORT                   = 15550;
export const NODE_HOST                   = 'localhost';
export const NODE_HOST_FORCE             = false;
export const NODE_BIND_IP                = '0.0.0.0';
export const NODE_PORT_API               = 15555;
export const NODE_NAT_PMP                = true;
export const WEBSOCKET_PROTOCOL          = 'ws://';
export const NETWORK_LONG_TIME_WAIT_MAX  = 3000;
export const NETWORK_SHORT_TIME_WAIT_MAX = 1500;
export const TRANSACTION_ADDRESS_VERSION = MODE_TEST ? 'lal' : '0a0';
export const TRANSACTION_OUTPUT_MAX      = 128;
export const TRANSACTION_PROXY_FEE       = 1000;
export const ADS_TRANSACTION_AMOUNT_MAX  = 9999999;
export const MILLIX_USD_VALUE            = 100000000 / 56; /*TODO: get this from an external api like fiatleak*/

export const NODE_INITIAL_LIST         = [
    {
        host: '89.114.105.216',
        port: 15550
    },
    {
        host: '216.170.172.149',
        port: 15550
    },
    {
        host: '85.25.177.215',
        port: 15550
    },
    {
        host: '72.134.68.165',
        port: 15550
    },
    {
        host: '73.179.28.122',
        port: 15550
    },
    {
        host: '188.250.76.126',
        port: 15550
    },
    {
        host: '65.184.157.115',
        port: 15550
    },
    {
        host: '173.52.72.197',
        port: 15550
    },
    {
        host: '201.103.194.230',
        port: 15550
    }
];
export const DATABASE_CONNECTION       = {};
let DATA_BASE_DIR                      = './millix-tangled';
export const NODE_KEY_PATH             = DATA_BASE_DIR + '/node.json';
export const NODE_CERTIFICATE_KEY_PATH = DATA_BASE_DIR + '/node_certificate_key.pem';
export const NODE_CERTIFICATE_PATH     = DATA_BASE_DIR + '/node_certificate.pem';

if (DATABASE_ENGINE === 'sqlite') {
    DATABASE_CONNECTION.FOLDER                            = DATA_BASE_DIR + '/';
    DATABASE_CONNECTION.FILENAME_TANGLED                  = 'tangled.sqlite';
    DATABASE_CONNECTION.FILENAME_ADVERTISER_ADVERTISEMENT = 'tangled-advertisement-advertiser.sqlite';
    DATABASE_CONNECTION.FILENAME_CONSUMER_ADVERTISEMENT   = 'tangled-advertisement-consumer.sqlite';
    DATABASE_CONNECTION.FILENAME_MILLIX_NODE              = 'millix.sqlite';
    DATABASE_CONNECTION.SCHEMA_VERSION                    = '3';
}

export default {
    NAME,
    DEBUG,
    VERSION,
    MODE_TEST,
    NODE_KEY_PATH,
    DATABASE_ENGINE,
    MILLIX_USD_VALUE,
    NODE_CERTIFICATE_PATH,
    NODE_CERTIFICATE_KEY_PATH,
    ADS_TRANSACTION_AMOUNT_MAX,
    NETWORK_SHORT_TIME_WAIT_MAX,
    TRANSACTION_ADDRESS_VERSION,
    NETWORK_LONG_TIME_WAIT_MAX,
    TRANSACTION_OUTPUT_MAX,
    TRANSACTION_PROXY_FEE,
    DATABASE_CONNECTION,
    WEBSOCKET_PROTOCOL,
    NODE_INITIAL_LIST,
    NODE_HOST_FORCE,
    NODE_PORT_API,
    NODE_NAT_PMP,
    NODE_BIND_IP,
    NODE_PORT,
    NODE_HOST
};
