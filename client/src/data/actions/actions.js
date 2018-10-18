import * as actiontypes from "./action-types"

import axios from 'axios'


export const test = (test) => {
    return {
        type: actiontypes.TEST_TYPE,
        payload: test
    }
}

export const beginHttpReq = () => {
    return {
        type: actiontypes.BEGIN_HTTP_REQ
    }
}
export const endHttpReq = () => {
    return {
        type: actiontypes.END_HTTP_REQ
    }
}
export const errorHttpReq = () => {
    return {
        type: actiontypes.ERROR_HTTP_REQ
    }
}

export const testApi = () => {
    return ds => {
        ds(beginHttpReq())
        axios.get("https://www.fh-kiel.de/")
            .then(response => {
                //update store
                console.log("success")
                ds(endHttpReq())
            })
            .catch(error => {
                ds(errorHttpReq())
                ds(endHttpReq())
                console.log("failed")
            })
    }
}