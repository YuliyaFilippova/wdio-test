import AllureReporter from "@wdio/allure-reporter";

const fs:any = require('fs');
const unirest: any = require('unirest');

export interface IUserLogin{
    username: string;
    password: string;
}

export class HttpMethods {
  
  public static async post(endpoint:string, headers: object, data: any, baseUrl: string): Promise<any> {
    let result: any;
    AllureReporter.addStep(`[API] Send Post to '${baseUrl}${endpoint}' with headers ${headers} and request body ${data}`);
      result = new Promise(async (resolve) => {
        await unirest.post(baseUrl + endpoint)
          .headers(headers)
          .send(data)
          .end((response) => {
            resolve({
              status: response.status,
              headers: response.headers,
              body: response.body
            });
          });
    });
    return result;
  };

  public static async put(endpoint:string, headers: object, data: any, baseUrl: string): Promise<any> {
    let result: any;
    AllureReporter.addStep(`[API] Send Put to '${baseUrl}${endpoint}' with headers ${headers} and request body ${data}`);
      result = new Promise(async (resolve) => {
        await unirest.put(baseUrl + endpoint)
          .headers(headers)
          .send(data)
          .end((response) => {
            resolve({
              status: response.status,
              headers: response.headers,
              body: response.body
            });
          });
    });
    return result;
  }

  public static async get(endpoint:string, headers: object, baseUrl: string): Promise<any> {
    let result: any;
    AllureReporter.addStep(`[API] Send Get to '${baseUrl}${endpoint}' with headers`);
      result = new Promise(async (resolve) => {
        await unirest.get(baseUrl + endpoint)
          .headers(headers)
          .end((response) => {
            resolve({
              status: response.status,
              headers: response.headers,
              body: response.body
            });
          });
      });
    return result;
  };

  public static async patch(endpoint:string, headers: object, data: any, baseUrl: string): Promise<any> {
    let result: any;
    AllureReporter.addStep(`[API] Send Patch to '${baseUrl}${endpoint}' with headers ${headers} and request body ${data}`);
      result = new Promise(async (resolve) => {
        await unirest.patch(baseUrl + endpoint)
          .headers(headers)
          .send(data)
          .end((response) => {
            resolve({
              status: response.status,
              headers: response.headers,
              body: response.body
            });
          });
      });
    return result;
  };
  
  public static async delete(endpoint:string, headers: object, baseUrl: string): Promise<any> {
    let result: any;
    AllureReporter.addStep(`[API] Send Delete to '${baseUrl}${endpoint}' with headers ${headers}`);
      result = new Promise(async (resolve) => {
        await unirest.delete(baseUrl + endpoint)
          .headers(headers)
          .end((response) => {
            resolve({
              status: response.status,
              headers: response.headers,
              body: response.body
            });
          });
      });
    return result;
  }
}
