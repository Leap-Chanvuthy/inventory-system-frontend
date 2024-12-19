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
import { IoSearchOutline } from "react-icons/io5";

const CustomerExport = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [failToastOpen, setFailToastOpen] = useState(false);

  // initial values and its handle change function
  const [values, setValues] = useState({
    status: "",
    customer_category_id : "",
    phone_number : "",
    email_address : "",
    search : ""
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
          `${BASE_URL}/customer-categories/all`
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
      const response = await axios.get(`${BASE_URL}/customers/export`, {
        params: {
            "filter[customer_status]": values.status,
            "filter[customer_category_id]": values.product_category_id,
            "filter[phone_number]" : values.phone_number,
            "filter[email_address]" : values.email_address,
            "filter[search]" : values.search,
        },
      });
      console.log(response);
      if (response.status === 200) {
        window.location.href = `${BASE_URL}/customers/export?filter[customer_status]=${values.status}&filter[customer_category_id]=${values.customer_category_id}&filter[phone_number]=${values.phone_number}&filter[email_address]=${values.email_address}&filter[search]=${values.search}`;
        setOpenModal(false);
        resetFilters();
        setValues({
            status: "",
            customer_category_id : "",
            phone_number : "",
            email_address : "",
            search : ""
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
        status: "",
        customer_category_id : "",
        phone_number : "",
        email_address : "",
        search : ""
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
                  <Label value="Search" className="font-bold" />
                  <TextInput
                    type="search"
                    id="remaining_quantity"
                    value={values.search}
                    onChange={handleChage}
                    rightIcon={IoSearchOutline}
                  />
                </div>

                <div>
                  <Label value="Customer Status" className="font-bold" />
                  <Select
                    id="status"
                    value={values.status}
                    onChange={handleChage}
                  >
                    <option value="">Select an option</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="SUSPENDED">Suspended</option>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="customer_category_id"
                    value="Customer Category"
                    className="font-bold"
                  />
                  <Select
                    id="customer_category_id"
                    placeholder="Select customer category"
                    value={values.customer_category_id}
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
                  <Label value="Phone Number" className="font-bold" />
                  <TextInput
                    type="text"
                    id="phone_number"
                    value={values.phone_number}
                    onChange={handleChage}
                  />
                </div>

                <div>
                  <Label value="Email Address" className="font-bold" />
                  <TextInput
                    type="text"
                    id="email_address"
                    value={values.email_address}
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
        message="Customers exported successfully !"
      />

      <DangerToast
        open={failToastOpen}
        onClose={() => setFailToastOpen(false)}
        message={`${error} || Something Went Wrong!"`}
      />
    </>
  );
};

export default CustomerExport;
