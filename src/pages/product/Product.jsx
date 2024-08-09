import { MdKeyboardArrowRight } from "react-icons/md";
import ProductList from "./ProductList";

const Product = () => {
    return ( 
    <div className="">
        <h1 className="text-2xl font-bold">Products </h1>
        <p>List of products available for sales</p>
        <div className="my-5">
            <ProductList />
        </div>


    </div>
     );
}
 
export default Product;