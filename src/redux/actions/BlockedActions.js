/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { groupBy } from 'lodash';
import {
  PROXIED_ROTTER_BLOCKED_URL,
  FETCH_BLOCKED_LIST_DONE,
  FETCH_BLOCKED_LIST_LOADING,
  FETCH_BLOCKED_LIST_STOP_LOADING,
  FETCH_BLOCKED_LIST_ERROR,
  FETCH_BLOCKED_LIST,
  USERNAME,
} from '../../common/consts';

const iconv = require('iconv-lite');
const arrayBufferToBuffer = require('arraybuffer-to-buffer');
const HtmlTableToJson = require('html-table-to-json');

const getTableFromHTNL = (html) => {
  const domparser = new DOMParser();
  const document = domparser.parseFromString(html, 'text/html');
  const table = document.getElementsByTagName('table')[0].innerHTML;


  return new HtmlTableToJson(table).results[0];
};


export const fectchBlockedWithAxios = () => async (dispatch) => {
  dispatch({
    type: FETCH_BLOCKED_LIST_LOADING,
  });
  try {
    const result = await axios.get(PROXIED_ROTTER_BLOCKED_URL, { responseType: 'arraybuffer' });
    const decodedData = iconv.decode(arrayBufferToBuffer(result.data), 'win-1255');
    const table = getTableFromHTNL(decodedData);
    const blockedList = groupBy(table, USERNAME);
    dispatch({
      type: FETCH_BLOCKED_LIST,
      payload: blockedList,
    });
    setTimeout(() => dispatch({
      type: FETCH_BLOCKED_LIST_STOP_LOADING,
    }), 1500);
    setTimeout(() => dispatch({ type: FETCH_BLOCKED_LIST_DONE }), 3000);
  } catch (err) {
    dispatch({
      type: FETCH_BLOCKED_LIST_ERROR,
    });
  }
};
