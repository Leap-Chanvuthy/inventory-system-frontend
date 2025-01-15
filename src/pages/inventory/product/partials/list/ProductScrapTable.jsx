import { useCallback, useEffect, useState } from "react";
import { Avatar, Badge, Button, Modal, Table, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import GlobalPagination from "../../../../../components/Pagination";
import { BASE_URL, BASE_IMAGE_URL } from "../../../../../components/const/constant";
import LoadingState from "./LoadingState";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { MdDelete } from "react-icons/md";
import { SuccessToast } from "../../../../../components/ToastNotification";
import { ImWarning } from "react-icons/im";
import { FiEdit } from "react-icons/fi";

import useDebounce from "../../../../../hooks/useDebounce";
import Update from "../product-scrap/Update";
import useToken from "../../../../../hooks/useToken";

const ProductScrapTable = ({ filters }) => {
  const token = useToken();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchProductScrap = async (page = 1 , query = filters.query) => {
    setStatus("loading");
    try {
      const response = await axios.get(`${BASE_URL}/product-scraps`, {
        headers : {
          Authorization : `Bearer ${token}`
        },
        params: {
          page,
          "filter[search]": query,
          "filter[quantity]": filters.quantity,
          sort: filters.sort,
        },
      });
      console.log('Category Response:',  response)
      setProducts(response.data.data);
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotalItems(response.data.total);
      setStatus("succeeded");
    } catch (err) {
      setError(err.message || "Failed to fetch product scraps");
      setStatus("failed");
    }
  };

    // Custom debounced fetch function
    const debouncedFetchProductScrap = useCallback(
      useDebounce((page, query) => {
        fetchProductScrap(page, query);
      }, 1000),
      [filters]
    );
  
    // Fetch data when filters or page changes
    useEffect(() => {
      debouncedFetchProductScrap(currentPage, filters.query);
    }, [filters, currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    setStatus("loading");
    try {
      const response = await axios.delete(`${BASE_URL}/product-scrap/${selectedId}`, {
        headers : {
          Authorization : `Bearer ${token}`
        },
      });
      if (response.status === 200) {
        setProducts(rawMaterials.filter(material => material.id !== selectedId));
        setOpenModal(false);
        setSuccessToastOpen(true);
        setStatus("succeeded");
      }
    } catch (err) {
      setError(err.message || "Error deleting data from the server.");
      setStatus("failed");
    }
  };

  if (!Array.isArray(products)) {
    return <LoadingState />;
  }

  if (status === "loading") {
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
  }

  if (status === "failed") {
    return <div className="text-center py-5 text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto  my-5">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Quantity Scrap</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Product Code</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Product Name</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Product Status</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Product Category</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Scrap Reason</Table.HeadCell>
            <Table.HeadCell>Created</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {products.length > 0 ? (
              products.map((product) => (
                <Table.Row
                  key={product.id}
                  className="bg-white font-bold dark:border-gray-700 dark:bg-gray-800"
                >

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                        {product.id}
                    </div>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-bold text-red-600 dark:red-600">
                    {product.quantity}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.product.product_code}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.product.product_name}
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                      {product.product.status === "IN_STOCK" && (
                        <Badge color="success">{product.product.status}</Badge>
                      )}
                      {product.product.status === "LOW_STOCK" && (
                        <Badge color="warning">{product.product.status}</Badge>
                      )}
                      {product.product.status === "OUT_OF_STOCK" && (
                        <Badge color="failure">{product.product.status}</Badge>
                      )}
                    </div>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                      <Badge color={product.product.category ? "warning" : "failure"}>
                        {product.product.category
                          ? product.product.category.category_name
                          : "NULL"}
                      </Badge>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {product.reason.length > 10 ? `${product.reason.substring(0, 10)}...` : product.reason}
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap">
                    {new Date(product.created_at).toLocaleString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                  </Table.Cell>
                  <Table.Cell className="flex items-center cursor-pointer gap-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div onClick={() =>{setSelectedId(product.id)}}>
                        <Update product_scrap_id={selectedId} />
                    </div>
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
                  No products scrap found.
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
      

      {/* confirm delete modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Are you sure you want to delete this item?</Modal.Header>
        <Modal.Body>
          <div className="flex items-center gap-3 p-4 border-l-4 border-red-600 bg-red-100 rounded-md">
            <ImWarning className="text-lg text-red-500" />
            <p className="text-red-500">After deletion, the item will appear in the recovery list.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDelete} color="failure">
            {status === "loading" ? <Spinner /> : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>

      <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Raw material category deleted successfully!" />
    </div>
  );
};

export default ProductScrapTable;