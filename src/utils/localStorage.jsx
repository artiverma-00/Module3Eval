export const getRestaurants=()=>JSON.parse(localStorage.getItem("evalData"))||[];
export const saveRestaurants = (data)=>localStorage.setItem("evalData", JSON.stringify(data));





