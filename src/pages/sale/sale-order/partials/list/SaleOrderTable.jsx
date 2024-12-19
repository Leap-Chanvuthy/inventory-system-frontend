import { useEffect, useState } from "react";
import { Avatar, Badge, Spinner, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  BASE_URL,
  BASE_IMAGE_URL,
} from "../../../../../components/const/constant";
import { useSelector, useDispatch } from "react-redux";
import GlobalPagination from "../../../../../components/Pagination";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import LoadingState from "./LoadingState";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Button, Modal } from "flowbite-react";
import { SuccessToast } from "../../../../../components/ToastNotification";
import { ImWarning } from "react-icons/im";
import {
  deleteCustomerFailed,
  deleteCustomerStart,
  deleteCustomerSuccess,
  fetchCustomerFailed,
  fetchCustomerStart,
  fetchCustomerSuccess,
} from "../../../../../redux/slices/customerSlice";
import {
  fetchSaleOrderFailed,
  fetchSaleOrderStart,
  fetchSaleOrderSuccess,
} from "../../../../../redux/slices/saleOrderSlice";

const SaleOrderTable = ({ filters }) => {
  const { saleOrders, error, status } = useSelector(
    (state) => state.saleOrders
  );
  console.log(saleOrders);
  const dispatch = useDispatch();

  // handle delete function
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);

  const handleDelete = async () => {
    if (!selectedId) {
      console.log("No sale order selected for deletion");
      return;
    }
    dispatch(deleteCustomerStart());
    try {
      const response = await axios.delete(
        `${BASE_URL}/sale-order/${selectedId}`
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(deleteCustomerSuccess(selectedId));
        setOpenModal(false);
        setSuccessToastOpen(true);
      }
    } catch (err) {
      console.log("Delete error:", err.response);
      dispatch(
        deleteCustomerFailed(
          err.message || "Error deleting data from the server."
        )
      );
    }
  };

  // Fetch data & pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCustomers = async (page = 1) => {
    dispatch(fetchSaleOrderStart());
    try {
      const response = await axios.get(`${BASE_URL}/sale-orders`, {
        params: {
          page,
          "filter[search]": filters?.search,
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

  useEffect(() => {
    fetchCustomers(currentPage);
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
      <div className="overflow-x-auto lg:max-w-6xl  my-5">
        <Table striped>
          <Table.Head>
            <Table.HeadCell className="whitespace-nowrap">
              Customer Image
            </Table.HeadCell>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Customer Name
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Order Status
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Payment Status
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
            <Table.HeadCell className="whitespace-nowrap">Updated At</Table.HeadCell>
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
                    {saleOrder.id}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {saleOrder.customer.fullname}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                      <Badge color="warning">{saleOrder.order_status}</Badge>
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
                    {formatDistanceToNow(new Date(saleOrder.updated_at))} ago
                  </Table.Cell>

                  <Table.Cell className="flex items-center cursor-pointer gap-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Link to={`/sale-order/update/${saleOrder.id}`}>
                      <FiEdit />
                    </Link>
                    <MdDelete
                      className="text-red-600 text-lg cursor-pointer"
                      onClick={() => {
                        setOpenModal(true);
                        setSelectedId(saleOrder.id);
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="16" className="text-center py-4">
                  No sale orders found.
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
          <Modal.Header>
            <p className="text-center font-bold text-lg capitalize">
              Are you sure want to delete ?
            </p>
          </Modal.Header>
          <Modal.Body>
            <div className="flex items-center gap-3 p-4 border-l-4 border-red-600 bg-red-100">
              <ImWarning className="text-lg text-red-500" />
              <p className="text-red-500  uppercase text-sm font-semibold">
                Item will be shown in recover list after deleted.
              </p>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={handleDelete} color="failure">
              {status == "loading" ? <Spinner /> : "Delete"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="Sale Order deleted successfully!"
      />
    </div>
  );
};

export default SaleOrderTable;
