import { Client } from "@elastic/elasticsearch";


export class ElasticSearchService{

    constructor(indexName){
        this.elasticClient = new Client({
            node: "http://localhost:9200",  // config.elasticsearch_url
        });
        this.indexName = indexName;
    }

    async createIndex(modelMapping){
        if(await this.elasticClient.indices.exists({ index: this.indexName })){
            return;
        }

        this.elasticClient.indices.create({
            index: this.indexName,
            mappings: modelMapping,
            settings: {
                number_of_replicas: 5,      // config.elastic_replicas
                number_of_shards: 2,        // config.elastic_shards
            },
        });
    }

    async saveDocument(model){
        return this.client.index({
            index: this.indexName,
            type: '_doc',
            id: model.id,       // important
            body: model,
        });
    }

    async addBulkDocuments() {
        const payload = data.map((item) => [
            {
              index: {
                _index: this.indexName,
                _type: '_doc',
                _id: item.id,
              },
            }, item,
        ]);

        return await this.client.bulk({ refresh: true, body: payload });
    };

    async findDocuments(searchQuery){
        return await this.elasticClient.search({
            index: this.indexName,
            query: { bool: searchQuery },
        });
    }

}


const stationElasticService = new ElasticSearchService('station_index');
const movieElasticService = new ElasticSearchService('movie_index');

export { stationElasticService, movieElasticService };
