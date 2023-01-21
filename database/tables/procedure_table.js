import {CreateTableCommand, DeleteTableCommand, PutItemCommand, ScanCommand} from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import { ddbClient } from "../db_connection.js";

const table_name = 'procedure'

export const params = {
    AttributeDefinitions: [
        {
            AttributeName: "id", //ATTRIBUTE_NAME_1
            AttributeType: "S", //ATTRIBUTE_TYPE
        },
        {
            AttributeName: "name", //ATTRIBUTE_NAME_2
            AttributeType: "S", //ATTRIBUTE_TYPE
        }
    ],
    KeySchema: [
        {
            AttributeName: "id", //ATTRIBUTE_NAME_1
            KeyType: "HASH",
        },
        {
            AttributeName: "name", //ATTRIBUTE_NAME_2
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
        const data = await ddbClient.send(new CreateTableCommand(params))
        console.log("Table Created", data)
        return data
    } catch (err){
        console.log("Error", err)
    }
}

export const delete_table = async () => {
    try {
        const data = await ddbClient.send(new DeleteTableCommand({TableName: table_name}));
        console.log('Table Deleted')
    } catch (err){
        console.log("Error", err);
    }
}

export const addItem = async (name, price, details, time_duration, clinic_id, clinic_name) => {
    try {
        const data = await ddbClient.send(new PutItemCommand({
            TableName: table_name,
            Item: {
                id: { S: uuidv4() },
                name: { S: name },
                price: { S: price },
                details: { S: details },
                time_duration: { S: time_duration },
                clinic_id: { N: clinic_id },
                clinic_name: { S: clinic_name }
            }
        }))
    } catch (err) {
        console.log("Error", err)
    }
}

export const scan = async () => {
    try {
        const data = await ddbClient.send(new ScanCommand({
            TableName: table_name
        }))
        data.Items.forEach(function (element){
            console.log(element)
        })
    } catch (err) {
        console.log("Error", err)
    }
}

// await create_table()
// await addItem("1", "Teeth Cleaning", "120", "Get your teeth cleaned", "90 minutes", "1", "Gomez Dental")
// scan()
