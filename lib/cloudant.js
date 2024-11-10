import {CloudantV1} from "@ibm-cloud/cloudant";

const CLOUDANT_URL = process.env.CLOUDANT_URL;
const CLOUDANT_APIKEY = process.env.CLOUDANT_APIKEY;
const CLOUDANT_SERVICE_NAME = process.env.CLOUDANT_SERVICE_NAME;
const CLOUDANT_DB_NAME = process.env.CLOUDANT_DB_NAME;

// check the env variables
if (!CLOUDANT_URL) {
    throw new Error('Define the CLOUDANT_URL environmental variable');
}

if (!CLOUDANT_APIKEY) {
    throw new Error('Define the CLOUDANT_APIKEY environmental variable');
}

if (!CLOUDANT_DB_NAME) {
    throw new Error('Define the CLOUDANT_DB_NAME environmental variable');
}
console.log(CLOUDANT_URL);
//console.log(CLOUDANT_APIKEY);
console.log(CLOUDANT_DB_NAME);

let cachedClient = null;

export async function connectToDatabase() {
    // check the cached.
    if (cachedClient) {
        // load from cache
        return {
            client: cachedClient,
        };
    }

    // set the connection options
    const opts = {
        serviceName: "CLOUDANT"
    };

    // Connect to cluster
    let client = CloudantV1.newInstance(opts);
    client.getServerInformation().then((serverInformation) => {
        const version = serverInformation.result.version;
        console.log(`Server version ${version}`);
    });
    

    client.getDatabaseInformation({ db: CLOUDANT_DB_NAME }).then((dbInfo) => {
        const documentCount = dbInfo.result.doc_count;
        const dbNameResult = dbInfo.result.db_name;
      
        // 4. Show document count in database =================================
        console.log(
          `Document count in "${dbNameResult}" database is ` + documentCount + '.'
        );
    });
      

    // set cache
    cachedClient = client;

    return {
        client: cachedClient,
    };
}