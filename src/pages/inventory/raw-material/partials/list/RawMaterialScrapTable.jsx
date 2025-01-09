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
import Update from "../raw-material-scrap/Update";

const RawMaterialScrapTable = ({ filters }) => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchRawMaterialScrap = async (page = 1 , query = filters.query) => {
    setStatus("loading");
    try {
      const response = await axios.get(`${BASE_URL}/raw-material-scraps`, {
        params: {
          page,
          "filter[search]": query,
          "filter[quantity]": filters.quantity,
          sort: filters.sort,
        },
      });
      console.log('Category Response:',  response)
      setRawMaterials(response.data.data);
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotalItems(response.data.total);
      setStatus("succeeded");
    } catch (err) {
      setError(err.message || "Failed to fetch raw material scraps");
      setStatus("failed");
    }
  };

    // Custom debounced fetch function
    const debouncedFetchRawMaterialScrap = useCallback(
      useDebounce((page, query) => {
        fetchRawMaterialScrap(page, query);
      }, 1000),
      [filters]
    );
  
    // Fetch data when filters or page changes
    useEffect(() => {
      debouncedFetchRawMaterialScrap(currentPage, filters.query);
    }, [filters, currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    setStatus("loading");
    try {
      const response = await axios.delete(`${BASE_URL}/raw-material-scrap/${selectedId}`);
      if (response.status === 200) {
        setRawMaterials(rawMaterials.filter(material => material.id !== selectedId));
        setOpenModal(false);
        setSuccessToastOpen(true);
        setStatus("succeeded");
      }
    } catch (err) {
      setError(err.message || "Error deleting data from the server.");
      setStatus("failed");
    }
  };

  if (!Array.isArray(rawMaterials)) {
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
            <Table.HeadCell className="whitespace-nowrap">Material Code</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Material Name</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Material Status</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Material Category</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Scrap Reason</Table.HeadCell>
            <Table.HeadCell>Created</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {rawMaterials.length > 0 ? (
              rawMaterials.map((material) => (
                <Table.Row
                  key={material.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                        {material.id}
                    </div>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.quantity}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.raw_material.material_code}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.raw_material.name}
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                      {material.raw_material.status === "IN_STOCK" && (
                        <Badge color="success">{material.raw_material.status}</Badge>
                      )}
                      {material.raw_material.status === "LOW_STOCK" && (
                        <Badge color="warning">{material.raw_material.status}</Badge>
                      )}
                      {material.raw_material.status === "OUT_OF_STOCK" && (
                        <Badge color="failure">{material.raw_material.status}</Badge>
                      )}
                    </div>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                      <Badge color={material.raw_material.category ? "warning" : "failure"}>
                        {material.raw_material.category
                          ? material.raw_material.category.category_name
                          : "NULL"}
                      </Badge>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.reason.length > 10 ? `${material.reason.substring(0, 10)}...` : material.reason}
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap">
                    {new Date(material.created_at).toLocaleString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                  </Table.Cell>
                  <Table.Cell className="flex items-center cursor-pointer gap-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div onClick={() =>{setSelectedId(material.id)}}>
                        <Update raw_material_scrap_id={selectedId} />
                    </div>
                    <MdDelete
                      className="text-red-600 text-lg cursor-pointer"
                      onClick={() => {
                        setOpenModal(true);
                        setSelectedId(material.id);
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="8" className="text-center py-4">
                  No raw materials scrap found.
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

export default RawMaterialScrapTable;