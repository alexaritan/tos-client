"use strict";

import rp from "request-promise";

export default class {

  constructor(accessToken){
    this.auth = `Bearer ${accessToken}`;
    this.baseUrl = "https://api.tdameritrade.com/v1/";
  }

  async getTicker(ticker){
    //Validate ticker input.
    if(!ticker) throw new Error("Ticker must be provided as a string.");
    if(typeof ticker !== "string") throw new Error("Ticker must be provided as a string.");

    //Set up options for the request.
    const tck = ticker.toLowerCase();
    const options = {
      method: "GET",
      uri: `${this.baseUrl}marketdata/${tck}/quotes`,
      headers: {
        Authorization: this.auth
      }
    };

    //Make the request to the API.
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