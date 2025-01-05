import { useCallback, useEffect, useState } from "react";
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
import {
  fetchProductsStart,
  fetchProductsFailure,
  fetchProductsSuccess,
  deleteProductStart,
  deleteProductFailure,
  deleteProductSuccess,
} from "../../../../../redux/slices/productSlice";
import { SuccessToast } from "../../../../../components/ToastNotification";
import { ImWarning } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import useDebounce from "../../../../../hooks/useDebounce";

const Product = ({ filters }) => {
  const dispatch = useDispatch();
  const { products, error, status } = useSelector((state) => state.products);
  const [selectedId, setSelectedId] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchProducts = async (page = 1 , query = filters.query) => {
    dispatch(fetchProductsStart());
    try {
      const response = await axios.get(`${BASE_URL}/products`, {
        params: {
          page,
          "filter[search]": query,
          "filter[status]": filters.status,
          "filter[product_category_id]": filters.category_id,
          sort: filters.sort,
        },
      });
      console.log(response);
      dispatch(fetchProductsSuccess(response.data.data));
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotalItems(response.data.total);
    } catch (err) {
      dispatch(fetchProductsFailure(err?.message));
      console.log("Failed to fetch raw materials: " + err.response);
    }
  };

  // Custom debounced fetch function
  const debouncedFetchProducts = useCallback(
    useDebounce((page, query) => {
      fetchProducts(page, query);
    }, 2000), // Adjust the debounce delay as needed
    [filters]
  );

  // Fetch data when filters or page changes
  useEffect(() => {
    debouncedFetchProducts(currentPage, filters.query);
  }, [filters, currentPage]);


  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // delete raw material function
  const handleDelete = async () => {
    if (!selectedId) {
      console.log("No user selected for deletion");
      return;
    }
    dispatch(deleteProductStart());
    try {
      const response = await axios.delete(`${BASE_URL}/product/${selectedId}`);
      console.log(response);
      if (response.status === 200) {
        dispatch(deleteProductSuccess(selectedId));
        setOpenModal(false);
        setSuccessToastOpen(true);
      }
    } catch (err) {
      console.log("Delete error:", err.message);
      dispatch(
        deleteProductFailure(
          err.message || "Error deleting data from the server."
        )
      );
    }
  };

  if (!Array.isArray(products)) {
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
      <div className="overflow-x-auto lg:max-w-7xl  my-5">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Details</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Product Code
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Product Name
            </Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Warehouse location
            </Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Remaining Quantity
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Unit Price in USD
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Total Value in USD
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Exchange Rate USD to Riel
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Unit Price in Riel
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Total Value in Riel
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Exchange Rate Riel to USD
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Minimum Stock
            </Table.HeadCell>
            <Table.HeadCell>Created</Table.HeadCell>
            <Table.HeadCell>Updated</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {products.length > 0 ? (
              products.map((product) => (
                <Table.Row
                  key={product.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-blue-600 dark:text-white">
                    <Link to={`/product/update/${product.id}`}>
                      <Badge>
                        <div className="flex justify-center items-center gap-1">
                          <IoEyeSharp /> View
                        </div>
                      </Badge>
                    </Link>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap">
                    {product.product_images &&
                    product.product_images.length > 0 ? (
                      <Avatar
                        img={`${BASE_IMAGE_URL}/${product.product_images[0].image}`}
                        alt={product.name}
                        className="w-10 h-10 object-cover"
                      />
                    ) : (
                      ""
                    )}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.id}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.product_code}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.product_name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                      {product.status === "IN_STOCK" && (
                        <Badge color="success">{product.status}</Badge>
                      )}
                      {product.status === "LOW_STOCK" && (
                        <Badge color="warning">{product.status}</Badge>
                      )}
                      {product.status === "OUT_OF_STOCK" && (
                        <Badge color="failure">{product.status}</Badge>
                      )}
                    </div>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                      <Badge color={product.category ? "warning" : "failure"}>
                        {product.category
                          ? product.category.category_name
                          : "NULL"}
                      </Badge>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.warehouse_location}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.quantity}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.remaining_quantity}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    $ {product.unit_price_in_usd}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    $ {product.total_value_in_usd}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    ៛ {product.exchange_rate_from_usd_to_riel} / 1$
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.unit_price_in_riel} ​៛
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.total_value_in_riel} ​៛
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    $ {product.exchange_rate_from_riel_to_usd} / 100៛
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.minimum_stock_level}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {new Date(product.created_at).toLocaleString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    , {formatDistanceToNow(new Date(product.created_at))} ago
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {formatDistanceToNow(new Date(product.updated_at))} ago
                  </Table.Cell>
                  <Table.Cell className="flex items-center cursor-pointer gap-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Link to={`/product/update/${product.id}`}>
                      <FiEdit />
                    </Link>
                    <MdDelete
                      className="text-red-600 text-lg cursor-pointer"
                      onClick={() => {
                        setOpenModal(true);
                        setSelectedId(product.id);
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="8" className="text-center py-4">
                  No products found.
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
        <Modal.Header>
          <p className="text-center font-bold text-lg capitalize">
            Are you sure want to delete ?
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className="flex items-center gap-3 p-4 border-l-4 border-red-600 bg-red-100">
            <ImWarning className="text-lg text-red-500" />
            <p className="text-red-500 uppercase text-sm font-semibold">
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

      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="Product deleted successfully!"
      />
    </div>
  );
};

export default Product;
