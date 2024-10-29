import { useEffect, useState } from "react";
import { Avatar, Badge, Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import GlobalPagination from "../../../../../components/Pagination";
import {
  BASE_URL,
  BASE_IMAGE_URL,
} from "../../../../../components/const/constant";
import LoadingState from "./LoadingState";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ImWarning } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import {
  fetchInvoiceStart,
  fetchInvoiceSuccess,
  fetchInvoiceFailure,
  deleteInvoiceFailure,
  deleteInvoiceStart,
  deleteInvoiceSuccess,
} from "../../../../../redux/slices/invoiceSlice";
import { SuccessToast } from "../../../../../components/ToastNotification";
import { IoPrintOutline } from "react-icons/io5";


const PurchaseInvoiceTable = ({ filters }) => {
  const dispatch = useDispatch();
  const { invoices, error, status } = useSelector((state) => state.invoices);
  console.log(invoices);
//   const [selectedId, setSelectedId] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchInvoice = async (page = 1) => {
    dispatch(fetchInvoiceStart());
    try {
      const response = await axios.get(`${BASE_URL}/purchase-invoices`, {
        params: {
          page,
          'filter[search]' : filters.search,
          'filter[status]' : filters.status,
          'filter[payment_method]' : filters.payment_method,
          'filter[date_range][start_date]' : filters.start_date,
          'filter[date_range][end_date]' : filters.end_date
        },
      });
      console.log(response);
      dispatch(fetchInvoiceSuccess(response.data.data));
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotalItems(response.data.total);
    } catch (err) {
      dispatch(fetchInvoiceFailure(err?.message));
      console.log("Failed to fetch raw materials: " + err?.message);
    }
  };

  // Fetch data when filters or page changes
  useEffect(() => {
    fetchInvoice(currentPage);
  }, [filters, currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // delete raw material function
//   const handleDelete = async () => {
//     if (!selectedId) {
//       console.log("No user selected for deletion");
//       return;
//     }
//     dispatch(deleteInvoiceStart());
//     try {
//       const response = await axios.delete(
//         `${BASE_URL}/raw-material/${selectedId}`
//       );
//       console.log(response);
//       if (response.status === 200) {
//         dispatch(deleteInvoiceSuccess(selectedId));
//         setOpenModal(false);
//         setSuccessToastOpen(true);
//       }
//     } catch (err) {
//       console.log("Delete error:", err.message);
//       dispatch(
//         deleteInvoiceFailure(
//           err.message || "Error deleting data from the server."
//         )
//       );
//     }
//   };

  if (!Array.isArray(invoices)) {
    return <LoadingState />;
  }

  if (status === "loading")
    return (
      <div>
        <LoadingState />
        <GlobalPagination
          current_page={currentPage}
          last_page={totalPages}
          from={(currentPage - 1) * 10 + 1}
          to={Math.min(currentPage * 10, totalItems)}
          total={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    );
  if (status === "failed")
    return <div className="text-center py-5 text-red-500">{error}</div>;

  return (
    <div>
      <div className="overflow-x-auto lg:max-w-6xl  my-5">
        <Table striped>
        <Table.Head>
            <Table.HeadCell className="whitespace-nowrap">Print</Table.HeadCell>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Invoice Number</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Payment Method</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Payment Date</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Subtotal (Riel)</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Subtotal (USD)</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Tax Amount (Riel)</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Tax Amount (USD)</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Grand Total No Tax (Riel)</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Grand Total No Tax (USD)</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Grand Total With Tax (Riel)</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Grand Total With Tax (USD)</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Clear Payable (%)</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Discount Amount (Riel)</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Discount Amount (USD)</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Discount (%)</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Tax (%)</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Created At</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Actions</Table.HeadCell>
            </Table.Head>
          <Table.Body className="divide-y">
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <Table.Row
                  key={invoice.id} // Corrected key here
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 font-medium text-gray-900 dark:text-white"
                >
                    <Table.Cell>
                        <IoPrintOutline className="text-lg text-center font-bold text-yellow-300" />
                    </Table.Cell>
                    <Table.Cell>{invoice.id}</Table.Cell>
                    <Table.Cell>{invoice.invoice_number}</Table.Cell>
                    <Table.Cell>
                        <div className="flex flex-wrap gap-2">
                          {invoice.payment_method === "BANK" && (
                          <Badge color="success">{invoice.payment_method}</Badge>
                          )}
                          {invoice.payment_method === "CREDIT_CARD" && (
                          <Badge color="warning">{invoice.payment_method}</Badge>
                          )}
                          {invoice.payment_method === "CASH" && (
                          <Badge color="danger">{invoice.payment_method}</Badge>
                          )}
                        </div>
                    </Table.Cell>
                    <Table.Cell>{invoice.payment_date}</Table.Cell>
                    <Table.Cell >
                        <div className="flex flex-wrap gap-2">
                          {invoice.status === "PAID" && (
                          <Badge color="success">{invoice.status}</Badge>
                          )}
                          {invoice.status === "UNPAID" && (
                          <Badge color="failure">{invoice.status}</Badge>
                          )}
                          {invoice.status === "INDEBTED" && (
                          <Badge color="warning">{invoice.status}</Badge>
                          )}
                        </div>
                  </Table.Cell>
                  <Table.Cell>{invoice.sub_total_in_riel} ៛</Table.Cell>
                  <Table.Cell>{invoice.sub_total_in_usd} $</Table.Cell>
                  <Table.Cell>{invoice.tax_value_in_riel} ៛</Table.Cell>
                  <Table.Cell>{invoice.tax_value_in_usd} $</Table.Cell>
                  <Table.Cell>{invoice.grand_total_without_tax_in_riel} ៛</Table.Cell>
                  <Table.Cell>{invoice.grand_total_without_tax_in_usd} $</Table.Cell>
                  <Table.Cell>{invoice.grand_total_with_tax_in_riel} ៛</Table.Cell>
                  <Table.Cell>{invoice.grand_total_with_tax_in_usd} $</Table.Cell>
                  <Table.Cell>{invoice.clearing_payable_percentage} %</Table.Cell>
                  <Table.Cell>{invoice.discount_value_in_riel} ៛</Table.Cell>
                  <Table.Cell>{invoice.discount_value_in_usd} $</Table.Cell>
                  <Table.Cell>{invoice.discount_percentage} %</Table.Cell>
                  <Table.Cell>{invoice.tax_percentage} %</Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {new Date(invoice.created_at).toLocaleString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}, {formatDistanceToNow(new Date(invoice.created_at))} ago
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Link to={`/purchase-invoice/update/${invoice.id}`}><FiEdit className="text-green-600 dark:text-green-300 font-bold" /></Link>
                      <MdDelete className="text-red-600 font-bold text-lg" />
                    </div>
                  </Table.Cell>

                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="8" className="text-center py-4">
                  No purchase invoice found.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="my-5">
        <GlobalPagination
          current_page={currentPage}
          last_page={totalPages}
          from={(currentPage - 1) * 10 + 1}
          to={Math.min(currentPage * 10, totalItems)}
          total={totalItems}
          onPageChange={handlePageChange}
        />
      </div>

      {/* <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <p className="text-center font-bold text-lg">
            Are you sure want to delete this item ?
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className="flex items-center gap-3 p-4 border-l-4 border-red-600 bg-red-100 rounded-md">
            <ImWarning className="text-lg text-red-500" />
            <p className="text-red-500">
              After successfully deleted, Item will be shown in active recover
              list.
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleDelete} color="failure">
            {status == "loading" ? <Spinner /> : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal> */}

      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="Raw material deleted successfully!"
      />
    </div>
  );
};

export default PurchaseInvoiceTable;
