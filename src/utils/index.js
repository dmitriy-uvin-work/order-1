import { mapKeys, camelCase, snakeCase } from 'lodash-es';


/**
 * Transforms keys from camelCase to snake_case
 * TODO: recursive support for nested objects/arrays ?
 * @param {*} data
 */
const transformRequest = (data = {}) => {
    const res = mapKeys(data, (_, key) => snakeCase(key));
    return JSON.stringify(res);
}

/**
 * Transforms keys from snake_case to camelCase
 * @param {string} data 
 */
const transformResponse = (data = "{}") => {
    const jsonData = JSON.parse(data);
    console.log({jsonData});

    // transform res.data.data => res.data
    if (typeof jsonData.data === 'object') {
        const res = mapKeys(jsonData.data, (_, key) => camelCase(key));
        res.status = jsonData.status;
        return res;
    }

    return jsonData;
}

/**
 * Get URL to rediret user to to after successful login
 * @param {int} status 
 * @param {string} userType 
 */
const getUserRedirectURL = (status, userType) => {
    let url = '';

    if (status === LoginStatusEnum.OK) {
        url = userType === 'advertiser' ? '/dashboard' : '/find-jobs';
    }

    if (status === LoginStatusEnum.INCOMPLETE) {
        url = `/signup/${userType}/complete-account`;
    }

    if (status === LoginStatusEnum.DISABLED) {
        url = '/login';
    }

    return url;
}


export {
    transformRequest,
    transformResponse,
    getUserRedirectURL
}
        