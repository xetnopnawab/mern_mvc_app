import {
    REGISTER_SUCCESS,
    REGISTER_FAILED
} from "../Reducers/actionTypes"
import axios  from "../../utils/AxiosConfig.js"


export const registerUser = (newUser) => dispatch => {
    axios.post('users/signup', newUser)
    .then( success => {
        return dispatch(successRegister)
    })
    .catch(failed => {
       return dispatch(failedRegister(failed.response.data))
    
    });
}
export const successRegister = () => ({
    type:REGISTER_SUCCESS 
})

export const failedRegister = (err) => ({
    type:REGISTER_FAILED,
    payload:errorResolve(err)
});
const errorResolve = (errors) =>{
        
}