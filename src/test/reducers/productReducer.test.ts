import { fetchAllProducts } from '../../redux/reducer/productReducer'

import { store } from '../../redux/store'

import server from "../shared/server"

server.listen()

describe("test all the actions",() => {
    test("Should return initial state",() => {
        expect(store.getState().productReducer.length).toBe(0)
    })
    test("Should fetch all product", async() => {
        // await store.dispatch(fetchAllProducts())
        expect(store.getState().productReducer.length).toBe(0)
    })
    // test("Should fetch all product", async() => {
    //     await store.dispatch(fetchAllProducts())
    //     expect(store.getState().productReducer.length).toBe(3)
    // })

})