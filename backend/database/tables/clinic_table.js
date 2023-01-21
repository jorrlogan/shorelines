// Import required AWS SDK clients and commands for Node.js
import { CreateTableCommand, DeleteTableCommand, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb"
import { v4 as uuidv4 } from 'uuid';
import {ddbClient} from "../db_connection.js";
const table_name = 'clinic'

// Set the parameters
export const params = {
    AttributeDefinitions: [
        {
            AttributeName: "id", //ATTRIBUTE_NAME_1
            AttributeType: "S", //ATTRIBUTE_TYPE
        },
        {
            AttributeName: "clinic", //ATTRIBUTE_NAME_2
            AttributeType: "S", //ATTRIBUTE_TYPE
        },
    ],
    KeySchema: [
        {
            AttributeName: "id", //ATTRIBUTE_NAME_1
            KeyType: "HASH",
        },
        {
            AttributeName: "clinic", //ATTRIBUTE_NAME_2
            KeyType: "RANGE",
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
    },
    TableName: table_name, //TABLE_NAME
    StreamSpecification: {
        StreamEnabled: false,
    },
};

export const create_table = async () => {
    try {
        const data = await ddbClient.send(new CreateTableCommand(params));
        console.log("Table Created", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
};

export const delete_table = async () => {
    try {
        const data = await ddbClient.send(new DeleteTableCommand({TableName: table_name}));
        console.log('Table Deleted')
    } catch (err){
        console.log("Error", err);
    }
}

export const addItem = async (name, latitude, longitude, overall_rating) => {
    try {
        const data = await ddbClient.send(new PutItemCommand({
            TableName: table_name,
            Item: {
                id: { S: uuidv4() },
                clinic: { S: name },
                latitude: { N: latitude },
                longitude: { N: longitude },
                overall_rating: { N: overall_rating }
            }
        }));
        console.log(data);
        return data;
    } catch (err) {
        console.error("Error", err);

    }
}

export const scan = async () => {
    try {
        const data = await ddbClient.send(new ScanCommand({
            TableName: table_name
        }))
        let items = []
        data.Items.forEach(function (element) {
           items.push( {
                id: element.id.S,
                clinic: element.clinic.S,
                latitude: element.latitude.N,
                longitude: element.longitude.N,
                overall_rating: element.overall_rating.N
            })
        })
        console.log(items)
        return items
    } catch (err) {
        console.log("Error", err)
    }
}

export default { addItem, scan }

// delete_table()
// await create_table()
// let ratings = [{ rating: 4.5, description: "Great experience with gomez dental"}]
// addItem( "Gomez Dental", "32.663132", "-115.415467", "4.7")
// scan()

