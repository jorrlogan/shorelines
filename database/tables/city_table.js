// Import required AWS SDK clients and commands for Node.js
import {ddbClient} from "../db_connection.js";
import { v4 as uuidv4 } from 'uuid';

import { CreateTableCommand, DeleteTableCommand, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb"
const table_name = 'city'

// Set the parameters
export const params = {
    AttributeDefinitions: [
        {
            AttributeName: "id", //ATTRIBUTE_NAME_1
            AttributeType: "S", //ATTRIBUTE_TYPE
        },
        {
            AttributeName: "city", //ATTRIBUTE_NAME_2
            AttributeType: "S", //ATTRIBUTE_TYPE
        },
    ],
    KeySchema: [
        {
            AttributeName: "id", //ATTRIBUTE_NAME_1
            KeyType: "HASH",
        },
        {
            AttributeName: "city", //ATTRIBUTE_NAME_2
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

export const addItem = async (city) => {
    try {
        const data = await ddbClient.send(new PutItemCommand({
            TableName: table_name,
            Item: {
                id: { S: uuidv4() },
                city: { S: city }
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
            console.log(element.id.S + " " + element.city.S)
            items.push(
                {
                    id: element.id.S,
                    city: element.city.S
                }
            )
        })
        return items
    } catch (err) {
        console.log("Error", err)
    }
}

export default { scan }





