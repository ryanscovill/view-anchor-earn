import "dotenv/config";
import cors from "cors";
import express from "express";
import {
  AnchorEarn,
  CHAINS,
  DENOMS,
  NETWORKS,
} from "@anchor-protocol/anchor-earn";

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());

app.get("/", async (req, res) => {
  const address = req.query.address;
  if (!address) {
    res.send('');
    return;
  }
  const anchorEarn = new AnchorEarn({
    chain: CHAINS.TERRA,
    network: NETWORKS.COLUMBUS_5,
    address: address
  });
  const balanceInfo = await anchorEarn.balance({
    currencies: [DENOMS.UST],
  });
  const amount = balanceInfo.balances[0].deposit_balance;

  res.json({ balance: parseFloat(amount) });
});

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
