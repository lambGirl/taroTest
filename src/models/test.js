export const namespace = 'test'

export default {
    namespace,

    state: {
        name:'',
        startCity:{},
        endCity:{}
    },

    effects: {
        async queryTest({ payload }, { put }) {
            /*const { data } = await ajax.get(API.getTest, payload)
            put({
                type: 'save',
                payload: data,
            })*/

           // return data
        },
        setStartCity({payload},{put}){
           // console.log("setStartCity", payload);
            put({
                type: 'resetStartCity',
                payload: payload,
            });
        },
        setEndCity({payload},{put}){
            // console.log("setStartCity", payload);
            put({
                type: 'resetEndCity',
                payload: payload,
            });
        }
    },

    reducers: {
        save({ payload }) {
            return payload
        },
        resetStartCity(state, action){
          //  console.log("state", state, action);
            return {
                ...action,
                startCity:state.payload
            }
        },
        resetEndCity(state, action){
            //  console.log("state", state, action);
            return {
                ...action,
                endCity:state.payload
            }
        }
    },
}
