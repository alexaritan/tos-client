"use strict";

import rp from "request-promise";

export default class {

  constructor(accessToken){
    this.auth = `Bearer ${accessToken}`;
  }

  async getTicker(ticker){
    //TODO add validation of ticker input. Must be type string, between 1-5 characters, all alphabetic or a /.
    const tck = ticker.toLowerCase();
    const options = {
      method: "GET",
      uri: `https://api.tdameritrade.com/v1/marketdata/${tck}/quotes`,
      headers: {
        Authorization: this.auth
      }
    };

    try{
      return await rp(options);
    }
    catch(e){
      return e;
    }
  }

  getOptionBuyingPower(){
    return 750;
  }

  getLiquidationValue(){
    return 1500;
  }

  getCashValue(){
    return 1000;
  }

  getDayChange(){
    return 100;
  }

  getPctDayChange(){
    return 5.3;
  }

  getYTDChange(){
    return 600;
  }
  
  getPositions(){
    return [];
  }

  getPosition(){
    return {
      ticker: "SPY"
    };
  }

  placeOrder(orders){
    return [];
  }

  cancelOrder(orderId){
    return {};
  }

  getOrder(orderId){
    return {};
  }

}