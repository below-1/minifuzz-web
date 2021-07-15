import { api } from 'boot/axios';

const URL = '/v1/api/session';

export const createSessionAPI = (payload) => {
  return api.post(URL, payload)
    .then(resp => resp.data);
}