import {baseServiceAddress, STATUS} from "SERVICES/common";
import {httpDelete, httpGet, httpPost, httpPut} from "UTILS/FetchUtil";
import {removeConsign, setConsignContent, setConsignList, setConsignState} from "../modules/ducks/Consign";
import {mockProjectData, valueData} from "./mockData";
import {STATE} from "./common";

const consignBase = baseServiceAddress + '/consign';
const consignActivitiBase = baseServiceAddress + '/consignActiviti';

export const getConsignList = (dispatch, callback) => {
    /*    httpGet(projectBase, (result) => {
            const {status, data} = result;
            if (status === STATUS.SUCCESS) {
                dispatch(setProjectList(data));
            }
            callback && callback(status);
        });*/
    /*TEMP*/
    httpGet(consignBase,(result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignList(data));
        }
        callback && callback(status);
    });
    // dispatch(setConsignList([]));/*TODO 可以在这里加一些数据用于测试*/
    const status = STATUS.SUCCESS;
    callback && callback(status);
};

export const getConsign = (dispatch, id, callback) => {
    httpGet(consignBase + '/' + id, (result) => {
//        console.log(result);
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignContent(data));
            console.log(data);
            const {consignation} = data;
            let res = {};
            if (consignation!==undefined)
                res = JSON.parse(consignation);
            const resStatus = STATUS.SUCCESS;
            callback && callback(resStatus);
            return res;
        }
    });
};

export const deleteConsign = (dispatch, id, callback) => {
    httpDelete(consignBase, {id:id}, (result) => {
        console.log("before remove");
        dispatch(removeConsign(id));
        const {status} = result;
        callback && callback(status);
    });
};

export const newConsign = (dispatch, callback) => {
    httpPost(consignBase, {consignation:null,}, (result) => {
        const {data, status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignContent(data));
        }
        callback && callback(status);
    });
};

export const updateConsign = (dispatch, data, callback) => {
    httpPut(consignBase, data, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignContent(data));
        }
        callback && callback(status);
    });
};

export const getConsignState = (dispatch, i, processInstanceID, callback) => {
    httpGet(consignActivitiBase + '/' + processInstanceID, (result) => {
        const {status, data} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignState(i, data.state));
        }
        callback && callback(status);
    })
};

export const putConsignState = (dispatch, pi, data, callback) => {
    httpPut(consignActivitiBase + '/' + pi, data, (result) => {
        const {status} = result;
        if (status === STATUS.SUCCESS) {
            dispatch(setConsignState(-1, /*TODO*/));
        }
        callback && callback(status);
    });
};