import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";


const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")): [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")): 0,
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {

        // add to cart
        addToCart: (state, action) => {
            const course = action.payload
            const index = state.cart.findIndex( (item) => item._id === course._id)

            // if course already exist in the cart
            if(index >= 0) {
                toast.error("Course already exist in cart")
                return
            }
            
            // if the course is not in the cart add it to the cart
            state.cart.push(course)

            // update the total quantity and price
            state.totalItems++
            state.total += course.price

            // updatae the local storage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

            // taost
            toast.success("Course added to the cart");
        },
        
        // remove from cart
        removeFromCart: (state, action) => {
            const toastId = toast.loading("Loading...")
            const courseId = action.payload;
            const index = state.cart.findIndex( (item) => item._id === courseId)
            // if course is present in the cart remove if from the cart
            if(index >= 0) {
                state.total -= state.course.price
                state.totalItems--
                
                // for remove the course from the cart using index 
                state.cart.splice(index, 1)

                // then update the local storage
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

                toast.dismiss(toastId)
                // toast
                toast.error("course removed from the cart");
            }
        },

        // reset cart
        resetCart: (state) => {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;

            // update the local storage
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
        },
    }
})

// export the reducer 
export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;

// export slice
export default cartSlice.reducer;
