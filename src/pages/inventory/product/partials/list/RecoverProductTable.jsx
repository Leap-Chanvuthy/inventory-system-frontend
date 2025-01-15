import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Modal, Table, Tooltip , Avatar } from "flowbite-react";
import axios from "axios";
import GlobalPagination from "../../../../../components/Pagination";
import {
  BASE_URL,
  BASE_IMAGE_URL
} from "../../../../../components/const/constant";
import LoadingState from "./LoadingState";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {TbRestore} from 'react-icons/tb';
import { useDispatch, useSelector } from "react-redux";
import { SuccessToast } from "../../../../../components/ToastNotification";
import { CiCircleCheck } from "react-icons/ci";
import { fetchProductsFailure, fetchProductsStart, fetchProductsSuccess, recoverProductFailure, recoverProductStart, recoverProductSuccess } from "../../../../../redux/slices/productSlice";
import useToken from "../../../../../hooks/useToken";

const RecoverProductTable = ({ filters }) => {
  const dispatch = useDispatch();
  const token = useToken();
  const {products , error , status} =  useSelector((state) => state.products);
  const [selectedId, setSelectedId] = useState(null);
  const [successToastOpen , setSuccessToastOpen] = useState(false);
  const [openModal , setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchProduct = async (page = 1) => {
    dispatch(fetchProductsStart());
    try {
      const response = await axios.get(`${BASE_URL}/products/trashed`, {
        headers : {
          Authorization : `Bearer ${token}`
        },
        params: {
          page,
          "filter[search]": filters.query,
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
      dispatch(fetchProductsFailure(err?.message))
      console.log("Failed to fetch raw materials: " + err);
    }
  };

  // Fetch data when filters or page changes
  useEffect(() => {
    fetchProduct(currentPage);
  }, [filters, currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };


  // recover raw material function
  const handleRecover = async () => {
    if (!selectedId) {
      return;
    }
    dispatch(recoverProductStart());
    try {
      const response = await axios.patch(`${BASE_URL}/product/recover/${selectedId}`, {
        headers : {
          Authorization : `Bearer ${token}`
        },
      });
      console.log(response);
      if (response.status === 200) {
        dispatch(recoverProductSuccess(selectedId));
        setOpenModal(false);
        setSuccessToastOpen(true);
      }
    } catch (err) {
      console.log("Restore error:", err.response);
      dispatch(
        recoverProductFailure(err.message || "Error restore data from the server.")
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
      <h2 className="text-md font-bold">Deleted Items</h2>
      <div className="overflow-x-auto lg:max-w-6xl  my-5">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Product Code</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Product Name</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Warehouse location</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Remaining Quantity</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Unit Price in USD</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Total Value in USD</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Exchange Rate USD to Riel</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Unit Price in Riel</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Total Value in Riel</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Exchange Rate Riel to USD</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Minimum Stock</Table.HeadCell>
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
                  <Table.Cell className="whitespace-nowrap">
                    { product.product_images && product.product_images.length > 0 ? (
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
                      {product.status === "OUT_OF_STOCK" && (
                        <Badge color="failure">{product.status}</Badge>
                      )}
                    </div>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                      <Badge color={product.category ? "warning" : "failure"}>
                        {product.category ? product.category.category_name : 'NULL'}
                      </Badge>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{product.warehouse_location}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.quantity}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.remaining_quantity}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">$ {product.unit_price_in_usd}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">$ {product.total_value_in_usd}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">៛ {product.exchange_rate_from_usd_to_riel} / 1$</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{product.unit_price_in_riel} ​៛</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{product.total_value_in_riel} ​៛</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">$ {product.exchange_rate_from_riel_to_usd} / 100៛</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{product.minimum_stock_level}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {new Date(product.created_at).toLocaleString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}, {formatDistanceToNow(new Date(product.created_at))} ago
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {formatDistanceToNow(new Date(product.updated_at))} ago
                  </Table.Cell>
                  <Table.Cell className="flex justify-center items-center cursor-pointer gap-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Tooltip content='Click to recover'>
                        <TbRestore
                          className="text-green-600 text-lg cursor-pointer"
                          onClick={() => {
                            setOpenModal(true);
                            setSelectedId(product.id);
                          }}
                        />
                    </Tooltip>
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
        message="Product restored successfully!"
      />
    </div>
  );
};

export default RecoverProductTable;
