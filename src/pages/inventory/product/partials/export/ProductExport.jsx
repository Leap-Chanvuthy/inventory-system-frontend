import axios from "axios";
import {
  Button,
  Modal,
  TextInput,
  Select,
  Label,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../../components/const/constant";
import {
  DangerToast,
  SuccessToast,
} from "../../../../../components/ToastNotification";

const ProductExport = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [failToastOpen, setFailToastOpen] = useState(false);

  // initial values and its handle change function
  const [values, setValues] = useState({
    product_name: "",
    status: "",
    product_code: "",
    quantity: "",
    remaining_quantity: "",
    minimum_stock_level: "",
    unit_of_measurement: "",
    package_size: "",
    product_category_id: "",
    start_date: "",
    end_date: "",
  });


  const handleChage = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  // get raw material category
  const [categories, setCategories] = useState([]);
  console.log(categories);

  useEffect(() => {
    const getCategory = async (e) => {
      try {
        const response = await axios.get(
          `${BASE_URL}/product-categories/all`
        );
        console.log(response.data);
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategory();
  }, []);

  // get export file
  const exportProducts = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/products/export`, {
        params: {
          "filter[product_name]": values.product_name,
          "filter[status]": values.status,
          "filter[product_code]": values.product_code,
          "fitler[quantity]": values.quantity,
          "filter[remaining_quantity]": values.quantity,
          "filter[minimum_stock_level]": values.minimum_stock_level,
          "filter[unit_of_measurement]": values.unit_of_measurement,
          "filter[package_size]": values.package_size,
          "filter[product_category_id]": values.product_category_id,
          "filter[start_date]": values.start_date,
          "filter[end_date]": values.end_date,
        },
      });
      console.log(response);
      if (response.status === 200) {
        window.location.href = `${BASE_URL}/products/export?filter[product_name]=${values.product_name}&filter[status]=${values.status}&filter[product_code]=${values.product_code}&filter[remaining_quantity]=${values.remaining_quantity}&filter[minimum_stock_level]=${values.minimum_stock_level}&filter[unit_of_measurement]=${values.unit_of_measurement}&filter[package_size]=${values.package_size}&filter[product_category_id]=${values.product_category_id}&filter[start_date]=${values.start_date}&filter[end_date]=${values.end_date}`;
        setOpenModal(false);
        resetFilters();
        setValues({
          product_name: "",
          status: "",
          product_code: "",
          quantity: "",
          remaining_quantity: "",
          minimum_stock_level: "",
          unit_of_measurement: "",
          package_size: "",
          product_category_id: "",
          start_date: "",
          end_date: "",
        });
      }
      setLoading(false);
      setSuccessToastOpen(true);
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.error);
      console.log(err);
      setFailToastOpen(true);
    }
  };


  const resetFilters = () =>{
    setValues({
        product_name: "",
        status: "",
        product_code: "",
        quantity: "",
        remaining_quantity: "",
        minimum_stock_level: "",
        unit_of_measurement: "",
        package_size: "",
        product_category_id: "",
        start_date: "",
        end_date: "",
    });
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Export</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <form onSubmit={exportProducts}>
          <Modal.Header className="dark:bg-gray-800 dark:text-white">
            <p className="font-bold">Export</p>
          </Modal.Header>
          <Modal.Body className="dark:bg-gray-800 dark:text-gray-400">
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label value="Product Status" className="font-bold" />
                  <Select
                    id="status"
                    value={values.status}
                    onChange={handleChage}
                  >
                    <option value="">Select an option</option>
                    <option value="IN_STOCK">In stock</option>
                    <option value="OUT_OF_STOCK">Out of stock</option>
                    <option value="LOW_STOCK">Low stock</option>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="product_category_id"
                    value="Product Category"
                    className="font-bold"
                  />
                  <Select
                    id="product_category_id"
                    placeholder="Select product category"
                    value={values.raw_material_category_id}
                    onChange={handleChage}
                  >
                    <option value="">Select an option</option>
                    {categories &&
                      categories.map((category) => (
                        <option value={category.id}>
                          {category.category_name}
                        </option>
                      ))}
                  </Select>
                </div>

                <div>
                  <Label value="Unit of Measurement" className="font-bold" />
                  <TextInput
                    type="text"
                    id="unit_of_measurement"
                    value={values.unit_of_measurement}
                    onChange={handleChage}
                  />
                </div>

                <div>
                  <Label value="Quantity" className="font-bold" />
                  <TextInput
                    type="number"
                    id="quantity"
                    value={values.quantity}
                    onChange={handleChage}
                  />
                </div>

                <div>
                  <Label value="Remaining Quantity" className="font-bold" />
                  <TextInput
                    type="number"
                    id="remaining_quantity"
                    value={values.remaining_quantity}
                    onChange={handleChage}
                  />
                </div>

                <div>
                  <Label value="Minimum Stock Level" className="font-bold" />
                  <TextInput
                    type="text"
                    id="minimum_stock_level"
                    value={values.minimum_stock_level}
                    onChange={handleChage}
                  />
                </div>

                <div>
                  <Label value="Product Code" className="font-bold" />
                  <TextInput
                    type="text"
                    id="product_code"
                    value={values.product_code}
                    onChange={handleChage}
                  />
                </div>

                <div>
                  <Label value="Product Name" className="font-bold" />
                  <TextInput
                    type="text"
                    id="product_name"
                    value={values.product_name}
                    onChange={handleChage}
                  />
                </div>

                <div>
                  <Label value="Package Size" className="font-bold" />
                  <TextInput
                    type="text"
                    id="package_size"
                    value={values.package_size}
                    onChange={handleChage}
                  />
                </div>

                <div>
                  <Label value="From Date" className="font-semibold" />
                  <TextInput
                    type="date"
                    id="start_date"
                    value={values.start_date}
                    onChange={handleChage}
                  />
                </div>
                <div>
                  <Label value="To Date" className="font-semibold" />
                  <TextInput
                    type="date"
                    id="end_date"
                    value={values.end_date}
                    onChange={handleChage}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="dark:bg-gray-800">
            <Button
              type="submit"
              className="dark:bg-cyan-700 dark:hover:bg-cyan-800"
            >
              {loading == true ? "Exporting" : "Export"}
            </Button>

            <Button onClick={resetFilters} color="failure" >Clear</Button>
          </Modal.Footer>
        </form>
      </Modal>

      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="Product exported successfully !"
      />

      <DangerToast
        open={failToastOpen}
        onClose={() => setFailToastOpen(false)}
        message={`${error} || Something Went Wrong!"`}
      />
    </>
  );
};

export default ProductExport;