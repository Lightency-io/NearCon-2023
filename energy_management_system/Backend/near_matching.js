const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const { InfluxDB, Point } = require("@influxdata/influxdb-client");
const cors = require("cors");
const bodyParser = require("body-parser");
const nearAPI = require("near-api-js");
const fs = require("fs");
const homedir = require("os").homedir();
require("dotenv").config();
const path = require("path");
const { log } = require("console");

async function main() {
  // NEAR and InfluxDB configuration setup
  const { KeyPair, keyStores } = nearAPI;
  const credentials = JSON.parse(
    fs.readFileSync(homedir + process.env.KEY_PATH)
  );
  const myKeyStore = new keyStores.InMemoryKeyStore();
  myKeyStore.setKey(
    process.env.NETWORK_ID,
    process.env.ACCOUNT_ID,
    KeyPair.fromString(credentials.private_key)
  );

  const connectionConfig = {
    networkId: "testnet",
    keyStore: myKeyStore,
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };

  // NEAR account creation function
  createAccount = async function (accountName) {
    const nearConnection = await nearAPI.connect(connectionConfig);
    const account = await nearConnection.account(process.env.ACCOUNT_ID);

    const keyPair = nearAPI.KeyPair.fromRandom("ed25519"); // Generate a random key pair
    const publicKey = keyPair.getPublicKey().toString();

    await myKeyStore.setKey(connectionConfig.networkId, accountName, keyPair);

    // Define the object to save in the desired format
    const keyPairData = {
      account_id: accountName,
      public_key: keyPair.getPublicKey().toString(),
      private_key: "ed25519:" + Buffer.from(keyPair.secretKey).toString(),
    };

    // Convert the keyPairData object to a JSON string
    const keyPairJson = JSON.stringify(keyPairData, null, 2);
    // Save the key pair to a file
    fs.writeFileSync(
      homedir + "/.near-credentials/testnet/" + accountName + ".json",
      keyPairJson
    );

    console.log(`Key pair saved to ${accountName}.json`);

    await account.functionCall({
      contractId: "testnet",
      methodName: "create_account",
      args: {
        new_account_id: accountName,
        new_public_key: publicKey,
      },
      gas: "300000000000000",
      attachedDeposit: nearAPI.utils.format.parseNearAmount("1"),
    });

    const keyFilePath = path.join(
      homedir,
      "/.near-credentials/testnet/",
      `${accountName}.json`
    );
    return keyPairData;
  };

  // NEAR USDT transfer function
  sendUSDT = async function (senderID, recipientID, amount) {
    const near = await nearAPI.connect(connectionConfig);

    const keyFilePath =
      homedir + "/.near-credentials/testnet/" + senderID + ".json";
    if (fs.existsSync(keyFilePath)) {
      const keyPairJson = JSON.parse(fs.readFileSync(keyFilePath));
      const keyPair = nearAPI.KeyPair.fromString(
        keyPairJson.private_key.slice(8)
      );
      myKeyStore.setKey(near.config.networkId, senderID, keyPair);
    }
    // Load the sender's account
    const sender = await near.account(senderID);

    // Send the NEAR tokens
    return await sender.signAndSendTransaction({
      receiverId: "usdt.fakes.testnet",
      actions: [
        nearAPI.transactions.functionCall(
          "storage_deposit",
          {
            account_id: recipientID,
          },
          "150000000000000",
          "1250000000000000000000"
        ),
        nearAPI.transactions.functionCall(
          "ft_transfer",
          {
            receiver_id: recipientID,
            amount: amount,
          },
          "30000000000000",
          "1"
        ),
      ],
    });
  };
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  // InfluxDB client setup
  const token = process.env.INFLUXDB_TOKEN;
  const url = process.env.INFLUXDB_URL;
  const influxDB_client = new InfluxDB({ url, token });
  const org = process.env.INFLUXDB_ORG;
  const bucket = process.env.INFLUXDB_BUCKET;

  // MongoDB client setup
  const client = new MongoClient(process.env.MONGODB_URI);

  client
    .connect()
    .then(() => {
      // Database and collections setup
      const db = client.db("matching");
      const collections = {
        buyers_collection: db.collection("buyers"),
        sellers_collection: db.collection("sellers"),
        users_collection: db.collection("users"),
        transactions_collection: db.collection("transactions"),
      };
      console.log("Connection with database established");
      // Score calculation function
      function calculateScore(buyer, seller, distanceCharge) {
        // Get the buyer and seller properties
        const EB = buyer.EB;
        const ES = seller.ES;
        const PB = buyer.PB;
        const DS = seller.DS;
        const DB = buyer.DB;
        const EPB = buyer.EPB;
        const EPS = seller.EPS;
        const XS = seller.XB;
        const YS = seller.YB;
        const XB = buyer.XB;
        const YB = buyer.YB;

        // Calculate distance from coordinates
        const d = Math.sqrt(Math.pow(XS - XB, 2) + Math.pow(YS - YB, 2));

        // Dummy function for energy type preference
        function EP(choice1, choice2) {
          if (choice1 === choice2 && choice1 !== "Grid") {
            return 1;
          } else if (choice1 === "Grid" || choice2 === "Grid") {
            return 0.1;
          } else {
            return 0.5;
          }
        }

        // Calculate score based on the given conditions
        if (d <= DB && d <= DS) {
          return Math.min(EB, ES) + (PB - d * distanceCharge) * EP(EPB, EPS);
        } else if (d <= DB && d > DS) {
          return Math.min(EB, ES) + 0.5 * (DS / d + EP(EPB, EPS));
        } else if (d > DB && d <= DS) {
          return Math.min(EB, ES) + 0.5 * (DB / d + EP(EPB, EPS));
        } else {
          return Math.min(EB, ES) + (1 / 3) * (DB / d + DS / d + EP(EPB, EPS));
        }
      }

      // Best match finding function
      function find_best_match(buyers, sellers, distanceCharge) {
        let bestScore = -Infinity;
        let bestMatch = null;

        for (const buyer of buyers) {
          for (const seller of sellers) {
            const score = calculateScore(buyer, seller, distanceCharge);
            if (score > bestScore) {
              bestScore = score;
              bestMatch = [buyer, seller];
            }
          }
        }

        return bestMatch;
      }

      // Transaction execution function
      async function execute_transaction(
        buyers,
        sellers,
        transaction,
        next_buyer,
        next_seller
      ) {
        const buyer = transaction[0];
        const seller = transaction[1];

        const transaction_energy = Math.min(buyer.EB, seller.ES);

        buyer.EB -= transaction_energy;
        seller.ES -= transaction_energy;
        const BUYER_ADDRESS = buyer.account_address;
        const SELLER_ADDRESS = seller.account_address;

        // Calculate transaction price based on McAfee pricing
        const transactionPrice =
          next_buyer && next_seller
            ? (next_buyer.PB + next_seller.PS) / 2
            : (buyer.PB + seller.PS) / 2;

        try {
          let transaction_reciept = await sendUSDT(
            BUYER_ADDRESS,
            SELLER_ADDRESS,
            Math.ceil(
              transactionPrice * (transaction_energy / 1000) * 1000000
            ).toString()
          );

          // Update buyer and seller data in the database
          if (buyer.EB == 0) {
            // Delete the buyer document if energy balance reaches zero
            await collections.buyers_collection.deleteOne({ _id: buyer._id });
          } else {
            // Update the remaining energy balance in the database
            await collections.buyers_collection.updateOne(
              { _id: buyer._id },
              { $set: { EB: buyer.EB } }
            );
          }

          if (seller.ES == 0) {
            // Delete the seller document if energy balance reaches zero
            await collections.sellers_collection.deleteOne({ _id: seller._id });
          } else {
            // Update the remaining energy balance in the database
            await collections.sellers_collection.updateOne(
              { _id: seller._id },
              { $set: { ES: seller.ES } }
            );
          }

          //Insert transaction into the database
          const newTransaction = {
            buyer: buyer.name,
            seller: seller.name,
            EnergyTransacted: transaction_energy,
            TransactionPrice: transactionPrice,
            TransactionReceipt: transaction_reciept.transaction.hash,
            Timestamp: new Date(),
          };
          await collections.transactions_collection.insertOne(newTransaction);
        } catch (error) {
          console.error(`Transaction failed: ${error.message}`);
        }
      }

      async function match(buyers, sellers, distanceCharge) {
        if (buyers.length === 0 || sellers.length === 0) {
          return; // Terminate the recursion when there are no buyers or sellers left
        }

        const bestMatch = find_best_match(buyers, sellers, distanceCharge);
        if (bestMatch) {
          // Find the next highest bid and ask prices
          const nextBuyer = buyers.find((b) => b.PB < bestMatch[0].PB);
          const nextSeller = sellers.find((s) => s.PS > bestMatch[1].PS);

          await execute_transaction(
            buyers,
            sellers,
            bestMatch,
            nextBuyer,
            nextSeller
          );
          const B = await collections.buyers_collection.find().toArray();
          const S = await collections.sellers_collection.find().toArray();
          match(B, S, distanceCharge);
        } else {
          // Terminate the recursion when no more matches are found
          return;
        }
      }

      filter_buyers_sellers = async function () {
        try {
          const users = await collections.users_collection.find().toArray();

          for (const user of users) {
            const edge_number = user.edge; // Assuming "edge" is the field in user data
            if (edge_number !== null) {
              let queryClient = influxDB_client.getQueryApi(org);
              const query = `from(bucket: "${bucket}")
                |> range(start: -1m)
                |> filter(fn: (r) => r["_measurement"] == "data")
                |> filter(fn: (r) => r["_field"] == "_sum/GridActivePower")
                |> filter(fn: (r) => r["edge"] == "${edge_number}")
                |> sum(column: "_value")`;

              queryClient.queryRows(query, {
                next(row, tableMeta) {
                  const o = tableMeta.toObject(row);
                  // Assuming '_value' is the field that holds the energy value
                  const value = parseFloat(o._value);

                  if (value > 0) {
                    // Update or insert buyer
                    collections.buyers_collection.findOneAndUpdate(
                      user,
                      { $inc: { EB: value } },
                      { upsert: true, new: true },
                      (err, doc) => {
                        if (err) {
                          console.error("Error updating buyer:", err);
                        }
                      }
                    );
                  } else {
                    // Update or insert seller
                    collections.sellers_collection.findOneAndUpdate(
                      user,
                      { $inc: { ES: -value } }, // Assuming you want to subtract the value since it's negative
                      { upsert: true, new: true },
                      (err, doc) => {
                        if (err) {
                          console.error("Error updating seller:", err);
                        }
                      }
                    );
                  }
                },
                error(error) {
                  console.error("Error querying InfluxDB:", error);
                },
                complete() {
                  console.log(
                    "Completed InfluxDB query for edge number:",
                    edge_number
                  );
                },
              });
            }
          }
        } catch (error) {
          console.error("Error in filter_buyers_sellers function:", error);
        }
      };
      filter_buyers_sellers();
      // API routes setup
      // Create a new user
      app.post("/users", async (req, res) => {
        try {
          function removeSpaces(inputString) {
            // Use the replace() method with a regular expression to remove spaces
            return inputString.replace(/\s/g, "");
          }
          // Generate a new near account
          let name = removeSpaces(req.body.name);
          const newAccount = await createAccount(
            "powerchain_lightency_" + name.toLowerCase() + ".testnet"
          );
          const newUser = req.body;
          newUser.account_address = newAccount.account_id;
          newUser.account_private_key = newAccount.private_key;
          await collections.users_collection.insertOne(newUser);
          res.status(201).json({ message: "User added successfully!" });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });

      // Get all buyers
      app.get("/buyers", async (req, res) => {
        try {
          const buyers = await collections.buyers_collection.find().toArray();
          return res.json(buyers);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });

      // GET /sellers - Retrieve all sellers
      app.get("/sellers", async (req, res) => {
        try {
          const sellers = await collections.sellers_collection.find().toArray();
          return res.json(sellers);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });

      // GET /transactions - Retrieve all transactions
      app.get("/transactions", async (req, res) => {
        try {
          const transactions = await collections.transactions_collection
            .find()
            .toArray();
          return res.json(transactions);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });

      // GET /transactions/:user_address - Retrieve transactions for a specific user
      app.get("/transactions/:user_address", async (req, res) => {
        const { user_address } = req.params;
        try {
          const transactions = await collections.transactions_collection
            .find({
              $or: [{ buyer: user_address }, { seller: user_address }],
            })
            .toArray();
          return res.json(transactions);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });

      match_buyers_sellers = async () => {
        try {
          // Retrieve buyers and sellers data from the database
          let buyers = await collections.buyers_collection.find().toArray();
          let sellers = await collections.sellers_collection.find().toArray();

          buyers.sort((a, b) => b.PB - a.PB); // Assuming PB is the price buyers are willing to pay
          sellers.sort((a, b) => a.PS - b.PS); // Assuming PS is the price sellers are asking

          // Define the distance charge or any other required parameters
          const distance_charge = 0.5;

          await match(buyers, sellers, distance_charge);
          console.log("match executes successfully");
        } catch (error) {
          console.error("Error in match_buyers_sellers function:", error);
        }
      };
      match_buyers_sellers();
      // Start the server
      const port = process.env.PORT || 5000;
      app.listen(port);
    })
    .catch((error) => {
      console.error("Database connection error:", error);
    });
}

// Call the async function
main().catch(console.error);
