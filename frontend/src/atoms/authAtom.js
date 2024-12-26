import {atom} from 'recoil'

const authScreenState = atom({
key: "authScreenState",
    default: "login",
});

export default authScreenState