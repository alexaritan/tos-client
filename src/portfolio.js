"use strict";

export default class {

  constructor(){
    //TODO Use the constructor to take in client creds to connect to their portfolio.
  }

  getTicker(ticker){
    return {
      ticker: "SPY"
    };
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