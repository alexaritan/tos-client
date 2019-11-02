"use strict";

import rp from "request-promise";

export default class {

  //Arguments:
  //accessToken - required; needed to authenticate with every request to the API.
  //refreshToken - optional; needed if the user would like to be able to refresh their accessToken programmatically.
  //clientId - optional; needed if the user would like to be able to refresh their accessToken programmatically.
  constructor(accessToken, refreshToken, clientId){
    //TODO solve the problem of the refreshToken expiring every 90 days - a limit imposed by the TDA API.
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.clientId = clientId;
    this.baseUrl = "https://api.tdameritrade.com/v1/";
  }

  async getTicker(ticker){
    //Validate ticker input.
    if(!ticker) throw new Error({message: "Ticker must be provided as a string."});
    if(typeof ticker !== "string") throw new Error({message: "Ticker must be provided as a string."});

    //Set up options for the request.
    const tck = ticker.toLowerCase();
    const options = {
      method: "GET",
      uri: `${this.baseUrl}marketdata/${tck}/quotes`,
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    };

    //Make the request to the API.
    try{
      return await rp(options);
    }
    catch(e){
      throw e;
    }
  }

  async getAccount(accountId, includePositions, includeOrders){
    if(!accountId) throw new Error("Account ID must be provided.");
    else{
      //Check for optional fields.
      const fields = [];
      if(includePositions) fields.push("positions");
      if(includeOrders) fields.push("orders");

      //Set up options for the request.
      const options = {
        method: "GET",
        uri: `${this.baseUrl}accounts/${accountId}`,
        qs: {
          fields: fields.toString()
        },
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      };

      //Make the request to the API.
      try{
        return await rp(options);
      }
      catch(e){
        throw e;
      }
    }
  }

  async getAccounts(includePositions, includeOrders){
    //Check for optional fields.
    const fields = [];
    if(includePositions) fields.push("positions");
    if(includeOrders) fields.push("orders");

    //Set up options for the request.
    const options = {
      method: "GET",
      uri: `${this.baseUrl}accounts`,
      qs: {
        fields: fields.toString()
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    };

    //Make the request to the API.
    try{
      return await rp(options);
    }
    catch(e){
      throw e;
    }
  }

  placeOrder(orders){
    return [];
  }

  cancelOrder(accountId, orderId){
    if(!accountId) throw new Error("Account ID must be provided.");
    else if(!orderId) throw new Error("Order ID must be provided.");
    else{
      //Set up options for the request.
      const options = {
        method: "DELETE",
        uri: `${this.baseUrl}accounts/${accountId}/orders/${orderId}`,
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      };

      //Make the request to the API.
      try{
        return await rp(options);
      }
      catch(e){
        throw e;
      }
    }
  }

  async getOrder(accountId, orderId){
    if(!accountId) throw new Error("Account ID must be provided.");
    else if(!orderId) throw new Error("Order ID must be provided.");
    else{
      //Set up options for the request.
      const options = {
        method: "GET",
        uri: `${this.baseUrl}accounts/${accountId}/orders/${orderId}`,
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      };

      //Make the request to the API.
      try{
        return await rp(options);
      }
      catch(e){
        throw e;
      }
    }
  }

  async getOrders(accountId, maxResults, fromEnteredTime, toEnteredTime, status){
    //Set up options for the request.
    const options = {
      method: "GET",
      uri: `${this.baseUrl}orders`,
      qs: {
        accountId,
        maxResults,
        fromEnteredTime,
        toEnteredTime,
        status
      },
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    };

    //Make the request to the API.
    try{
      return await rp(options);
    }
    catch(e){
      throw e;
    }
  }

  async refreshAccessToken(){
    //Set up options for the request.
    const options = {
      method: "POST",
      uri: `${this.baseUrl}oauth2/token`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      form: {
        "grant_type": "refresh_token",
        "refresh_token": this.refreshToken,
        "client_id": this.clientId
      }
    };

    //Make the request to the API.
    try{
      const response = await rp(options);
      const parsedResponse = JSON.parse(response);
      if(parsedResponse.access_token) this.accessToken = parsedResponse.access_token;
      else throw new Error({message: "Could not refresh access token."});
      return parsedResponse;
    }
    catch(e){
      throw e;
    }
  }

}