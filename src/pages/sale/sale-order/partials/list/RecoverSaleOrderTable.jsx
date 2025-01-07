import { useCallback, useEffect, useState } from "react";
import { Avatar, Badge, Spinner, Table, Tooltip } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  BASE_URL,
  BASE_IMAGE_URL,
} from "../../../../../components/const/constant";
import { useSelector, useDispatch } from "react-redux";
import GlobalPagination from "../../../../../components/Pagination";
import LoadingState from "./LoadingState";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Button, Modal } from "flowbite-react";
import { SuccessToast } from "../../../../../components/ToastNotification";
import {
  fetchSaleOrderFailed,
  fetchSaleOrderStart,
  fetchSaleOrderSuccess,
  recoverSaleOrderFailure,
  recoverSaleOrderStart,
  recoverSaleOrderSuccess,
} from "../../../../../redux/slices/saleOrderSlice";
import useDebounce from "../../../../../hooks/useDebounce";
import { IoEyeSharp } from "react-icons/io5";
import { CiCircleCheck } from "react-icons/ci";
import { TbRestore } from "react-icons/tb";

const RecoverSaleOrderTable = ({ filters }) => {
  const { saleOrders, error, status } = useSelector(
    (state) => state.saleOrders
  );
  const dispatch = useDispatch();

  // handle delete function
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  console.log(selectedId);
  const [successToastOpen, setSuccessToastOpen] = useState(false);

  const handleRecover = async () => {
    if (!selectedId) {
      console.log("No sale order selected for deletion");
      return;
    }
    dispatch(recoverSaleOrderStart());
    try {
      const response = await axios.patch(
        `${BASE_URL}/sale-order/recover/${selectedId}`
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(recoverSaleOrderSuccess(selectedId));
        setOpenModal(false);
        setSuccessToastOpen(true);
      }
    } catch (err) {
      console.log("Delete error:", err.response);
      dispatch(
        recoverSaleOrderFailure(
          err.message || "Error deleting data from the server."
        )
      );
    }
  };

  // Fetch data & pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchSaleOrders = async (page = 1 , search = filters.search) => {
    dispatch(fetchSaleOrderStart());
    try {
      const response = await axios.get(`${BASE_URL}/sale-orders/trashed`, {
        params: {
          page,
          "filter[search]": search,
          "filter[payment_method]" : filters.payment_method,
          "filter[payment_status]" : filters.payment_status,
          "filter[order_status]" : filters.order_status,
          sort: filters?.sort,
        },
      });
      console.log(response);
      dispatch(fetchSaleOrderSuccess(response.data.data));
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotalItems(response.data.total);
    } catch (err) {
      console.error("Failed to fetch :", err.response);
      dispatch(
        fetchSaleOrderFailed(
          err.message || "Failed to fetch data from the server."
        )
      );
    }
  };

    // Custom debounced fetch function
    const debouncedFetchInvoices = useCallback(
      useDebounce((page, query) => {
        fetchSaleOrders(page, query);
      }, 1000),
      [filters]
    );
  
    // Fetch data when filters or page changes
    useEffect(() => {
      debouncedFetchInvoices(currentPage, filters.search);
    }, [filters, currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

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

  if (!Array.isArray(saleOrders)) {
    return <LoadingState />;
  }

  if (status === "failed")
    return <div className="text-center py-5 text-red-500">Oops! {error}</div>;

  return (
    <div>
      <div className="overflow-x-auto lg:max-w-7xl  my-5">
        <Table striped>
          <Table.Head>
            {/* <Table.HeadCell>Details</Table.HeadCell> */}
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Customer Image
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Customer Name
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Payment Method
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Order Status
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Payment Status
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Status
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Order Date
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Subtotal (Riel)
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Subtotal (USD)
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Tax Amount (Riel)
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Tax Amount (USD)
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Grand Total No Tax (Riel)
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Grand Total No Tax (USD)
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Grand Total With Tax (Riel)
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Grand Total With Tax (USD)
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Clear Payable (%)
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Discount Amount (Riel)
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Discount Amount (USD)
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Discount (%)
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Tax (%)
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Created At</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Deleted At</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Actions
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {saleOrders.length > 0 ? (
              saleOrders.map((saleOrder) => (
                <Table.Row
                  key={saleOrder.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  {/* <Table.Cell className="whitespace-nowrap font-medium text-blue-600 dark:text-white">
                    <Link to={`/sale-order/update/${saleOrder.id}`}>
                      <Badge>
                        <div className="flex justify-center items-center gap-1">
                          <IoEyeSharp /> View
                        </div>
                      </Badge>
                    </Link>
                  </Table.Cell> */}

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {saleOrder.id}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Avatar
                      img={
                        saleOrder.customer
                          ? `${BASE_IMAGE_URL}/${saleOrder?.customer?.image}`
                          : ""
                      }
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {saleOrder.customer.fullname}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-wrap gap-2">
                      {saleOrder.payment_method === "BANK" && (
                        <Badge color="success">{saleOrder.payment_method}</Badge>
                      )}
                      {saleOrder.payment_method === "CREDIT_CARD" && (
                        <Badge color="warning">{saleOrder.payment_method}</Badge>
                      )}
                      {saleOrder.payment_method === "CASH" && (
                        <Badge color="failure">{saleOrder.payment_method}</Badge>
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      <div className="flex flex-wrap gap-2">
                          {saleOrder.order_status === "PENDING" && (
                          <Badge color="pink">{saleOrder.order_status}</Badge>
                          )}
                          {saleOrder.order_status === "PROCESSING" && (
                          <Badge color="purple">{saleOrder.order_status}</Badge>
                          )}
                          {saleOrder.order_status === "DELIVERING" && (
                          <Badge color="default">{saleOrder.order_status}</Badge>
                          )}
                          {saleOrder.order_status === "COMPLETED" && (
                          <Badge color="success">{saleOrder.order_status}</Badge>
                          )}
                        </div>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                          {saleOrder.payment_status === "PAID" && (
                          <Badge color="success">{saleOrder.payment_status}</Badge>
                          )}
                          {saleOrder.payment_status === "UNPAID" && (
                          <Badge color="failure">{saleOrder.payment_status}</Badge>
                          )}
                          {saleOrder.payment_status === "INDEBTED" && (
                          <Badge color="warning">{saleOrder.payment_status}</Badge>
                          )}
                        </div>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                        <Badge color="pink">DELETED</Badge>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap">
                    {new Date(saleOrder.order_date).toLocaleString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {/* , {formatDistanceToNow(new Date(saleOrder.order_date))} ago */}
                  </Table.Cell>

                  <Table.Cell>{saleOrder.sub_total_in_riel} ៛</Table.Cell>
                  <Table.Cell>{saleOrder.sub_total_in_usd} $</Table.Cell>
                  <Table.Cell>{saleOrder.tax_value_in_riel} ៛</Table.Cell>
                  <Table.Cell>{saleOrder.tax_value_in_usd} $</Table.Cell>
                  <Table.Cell>{saleOrder.grand_total_without_tax_in_riel} ៛</Table.Cell>
                  <Table.Cell>{saleOrder.grand_total_without_tax_in_usd} $</Table.Cell>
                  <Table.Cell>{saleOrder.grand_total_with_tax_in_riel} ៛</Table.Cell>
                  <Table.Cell>{saleOrder.grand_total_with_tax_in_usd} $</Table.Cell>
                  <Table.Cell>{saleOrder.clearing_payable_percentage} %</Table.Cell>
                  <Table.Cell>{saleOrder.discount_value_in_riel} ៛</Table.Cell>
                  <Table.Cell>{saleOrder.discount_value_in_usd} $</Table.Cell>
                  <Table.Cell>{saleOrder.discount_percentage} %</Table.Cell>
                  <Table.Cell>{saleOrder.tax_percentage} %</Table.Cell>

                  <Table.Cell className="whitespace-nowrap">
                    {new Date(saleOrder.created_at).toLocaleString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    , {formatDistanceToNow(new Date(saleOrder.created_at))} ago
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {formatDistanceToNow(new Date(saleOrder.deleted_at))} ago
                  </Table.Cell>

                  <Table.Cell className="flex justify-center items-center cursor-pointer gap-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Tooltip content='Click to recover'>
                        <TbRestore
                          className="text-green-600 text-lg cursor-pointer"
                          onClick={() => {
                            setOpenModal(true);
                            setSelectedId(saleOrder.id);
                          }}
                        />
                    </Tooltip>
                  </Table.Cell>

                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="16" className="text-center py-4">
                  No deleted sale orders found.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
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

      <>
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
      </>
      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="Sale Order restored successfully!"
      />
    </div>
  );
};

export default RecoverSaleOrderTable;
