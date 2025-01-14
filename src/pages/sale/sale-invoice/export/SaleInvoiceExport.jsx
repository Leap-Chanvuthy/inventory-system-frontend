import axios from "axios";
import { Button, Modal, TextInput, Select, Label, Spinner} from "flowbite-react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../components/const/constant";
import { DangerToast , SuccessToast } from "../../../../components/ToastNotification";
import { MdOutlineFileDownload } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import useToken from "../../../../hooks/useToken";

const SaleInvoiceExport = ({sale_id}) => {
  const token = useToken();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [failToastOpen, setFailToastOpen] = useState(false);

  // initial values and its handle change function
  const [values, setValues] = useState({
    id: "",
    payment_method: "",
    order_status: "",
    payment_status: "",
    order_date: "",
    discount_percentage: "",
    tax_percentage: "",
    clearing_payable_percentage: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  // get export file
  const exportSaleOrders = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/sale-orders/export`, {
        headers : {
            Authorization : `Bearer ${token}`
        },
        params: {
          "filter[id]": sale_id,
          },
          responseType: 'blob',
      });
      console.log(response);
      if (response.status === 200) {
        window.location.href = `${BASE_URL}/sale-orders/export?filter[id]=${sale_id}`;
        setOpenModal(false);
        resetFilters();
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


  useEffect(() =>{
    exportSaleOrders();
  },[sale_id])

  const resetFilters = () => {
    setValues({
        id: "",
        payment_method: "",
        order_status: "",
        payment_status: "",
        order_date: "",
        discount_percentage: "",
        tax_percentage: "",
        clearing_payable_percentage: "",
        start_date: "",
        end_date: "",
    });
  };

  return (
    <>
      <Button onClick={() => {setOpenModal(true)}} color='gray' disabled={loading}>
        {loading ? <Spinner /> :
        <MdOutlineFileDownload /> }
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <form onSubmit={exportSaleOrders}>
          <Modal.Header className="dark:bg-gray-800 dark:text-white">
            <p className="font-bold">Export</p>
          </Modal.Header>
          <Modal.Body className="dark:bg-gray-800 dark:text-gray-400">
            <div className="flex items-center gap-3 p-4 border-l-4 border-green-600 bg-green-100">
              <TiTick className="text-lg text-green-500" />
              <p className="text-green-500  uppercase text-sm font-semibold">
                Click button below to download this sale invoice.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className="dark:bg-gray-800">
            <Button
              type="submit"
              className="dark:bg-cyan-700 dark:hover:bg-cyan-800"
              disabled={loading}
            >
              {loading == true ? "Exporting" : "Export"}
            </Button>

            <Button onClick={resetFilters} color="failure">
              Clear
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="Sale orders exported successfully !"
      />

      <DangerToast
        open={failToastOpen}
        onClose={() => setFailToastOpen(false)}
        message={`${error} || Something Went Wrong!"`}
      />
    </>
  );
};

export default SaleInvoiceExport;
