// Import required AWS SDK clients and commands for Node.js
import { CreateTableCommand, DeleteTableCommand, PutItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb"
import { ddbClient } from "../db_connection.js"
const table_name = 'user'

// Set the parameters
export const params = {
    AttributeDefinitions: [
        {
            AttributeName: "email", //ATTRIBUTE_NAME_1
            AttributeType: "S", //ATTRIBUTE_TYPE
        }
    ],
    KeySchema: [
        {
            AttributeName: "email", //ATTRIBUTE_NAME_1
            KeyType: "HASH",
        }
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

export const addItem = async (email) => {
    console.log(table_name)
    console.log(email)
    console.log(ddbClient)
    try {
        const data = await ddbClient.send(new PutItemCommand({
            TableName: table_name,
            Item: {
                email: { S: email }
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
            console.log(element)
            items.push({email: element.email.S})
        })
        return items
    } catch (err) {
        console.log("Error", err)
    }
}
export default {addItem, scan}


// await create_table()
// await addItem("logan24orr@gmail.com")
// delete_table()
// scan()



