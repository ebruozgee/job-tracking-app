import Vuex from "vuex"
import form from "./form"
const createStore = () => {
    return new Vuex.Store({
        modules:{
            form
        }
    })
}

export default createStore