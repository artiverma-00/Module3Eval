import RestaurantCard from "@/components/RestaurantCard";
import { getRestaurants } from "@/utils/localStorage";
import Navbar from "../components/Navbar"

export default function customerDashboard(){
const data = getRestaurants();
return(
              <>
              <Navbar data={data} />
              {data.map((el) => (
<RestaurantCard key = {el.restaurantID} data = {el}/>
              ))}
              </>
)
}
