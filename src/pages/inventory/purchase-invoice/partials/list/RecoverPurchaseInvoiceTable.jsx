import { useEffect , useState } from "react";
import { Badge, Button, Modal, Table, Tooltip } from "flowbite-react";
import axios from "axios";
import GlobalPagination from "../../../../../components/Pagination";
import {
  BASE_URL
} from "../../../../../components/const/constant";
import LoadingState from "./LoadingState";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInvoiceStart,
  fetchInvoiceSuccess,
  fetchInvoiceFailure,
  recoverInvoiceStart,
  recoverInvoiceSuccess,
  recoverInvoiceFailure,
} from "../../../../../redux/slices/invoiceSlice";
import { SuccessToast } from "../../../../../components/ToastNotification";
import { TbRestore } from "react-icons/tb";
import {CiCircleCheck} from 'react-icons/ci';
import useToken from "../../../../../hooks/useToken";

const RecoverPurchaseInvoiceTable = ({ filters }) => {
  const dispatch = useDispatch();
  const token = useToken();
  const { invoices, error, status } = useSelector((state) => state.invoices);
  const [selectedId, setSelectedId] = useState(null);
  const [successToastOpen , setSuccessToastOpen] = useState(false);
  const [openModal , setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchInvoices = async (page = 1) => {
    dispatch(fetchInvoiceStart());
    try {
      const response = await axios.get(`${BASE_URL}/purchase-invoices/trashed`, {
        headers : {
          Authorization : `Bearer ${token}`,
        },
        params: {
          page,
          'filter[search]' : filters.search,
          'filter[status]' : filters.status,
          'filter[payment_method]' : filters.payment_method,
          'filter[date_range][start_date]' : filters.start_date,
          'filter[date_range][end_date]' : filters.end_date,
          sort : filters.sort,
        },
      });
      dispatch(fetchInvoiceSuccess(response.data.data));
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotalItems(response.data.total);
    } catch (err) {
      dispatch(fetchInvoiceFailure(err?.message))
      console.log("Failed to fetch raw materials: " + err.response);
    }
  };

  // Fetch data when filters or page changes
  useEffect(() => {
    fetchInvoices(currentPage);
  }, [filters, currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };


  // recover raw material function
  const handleRecover = async () => {
    if (!selectedId) {
      console.log("No raw material selected for deletion");
      return;
    }
    dispatch(recoverInvoiceStart());
    try {
      const response = await axios.patch(`${BASE_URL}/purchase-invoice/recover/${selectedId}`, {} ,{
        headers : {
          Authorization : `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        dispatch(recoverInvoiceSuccess(selectedId));
        setOpenModal(false);
        setSuccessToastOpen(true);
      }
    } catch (err) {
      console.log("Restore error:", err.response);
      dispatch(
        recoverInvoiceFailure(err.message || "Error restore data from the server.")
      );
    }
  };

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
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Invoice Number</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Payment Method</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Payment Date</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Supplier Name</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Supplier Code</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Supplier Email</Table.HeadCell>
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
                  key={invoice.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 font-medium text-gray-900 dark:text-white"
                >
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
                          <Badge color="failure">{invoice.payment_method}</Badge>
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
                  <Table.Cell>
                    <div className="flex flex-wrap gap-2">
                      <Badge color="purple">{invoice.supplier.name}</Badge>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{invoice.supplier.supplier_code}</Table.Cell>
                  <Table.Cell>{invoice.supplier.email}</Table.Cell>
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

                  <Table.Cell className="flex justify-center items-center cursor-pointer gap-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Tooltip content='Click to recover'>
                        <TbRestore
                          className="text-green-600 text-lg cursor-pointer"
                          onClick={() => {
                            setOpenModal(true);
                            setSelectedId(invoice.id);
                          }}
                        />
                    </Tooltip>
                  </Table.Cell>

                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="8" className="text-center py-4">
                  No deleted purchase invoice found.
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

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header><p className="text-center font-bold text-lg">Are you sure want to recover this item ?</p></Modal.Header>
        <Modal.Body>
          <div className="flex items-center gap-3 p-4 border-l-4 border-green-600 bg-green-100">
            <CiCircleCheck className="text-lg text-green-500" />
            <p className="text-green-500 uppercase text-sm font-semibold">After successfully restored, Item will be shown in active list.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleRecover} color='success'>
            {status == "loading" ? <Spinner /> : "Restore"}
          </Button>
        </Modal.Footer>
      </Modal>

      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="Raw material deleted successfully!"
      />
    </div>
  );
};

export default RecoverPurchaseInvoiceTable;
