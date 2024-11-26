import { useEffect, useState } from "react";
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
import Update from "../category/Update";

const CategoryTable = ({ filters }) => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchRawMaterials = async (page = 1) => {
    setStatus("loading");
    try {
      const response = await axios.get(`${BASE_URL}/product-categories`, {
        params: {
          page,
          "filter[search]": filters.query,
          "filter[category_name]": filters.category_id,
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
      setError(err.message || "Failed to fetch raw materials");
      setStatus("failed");
    }
  };

  useEffect(() => {
    fetchRawMaterials(currentPage);
  }, [filters, currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    setStatus("loading");
    try {
      const response = await axios.delete(`${BASE_URL}/product-category/delete/${selectedId}`);
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
      <div className="overflow-x-auto lg:max-w-6xl  my-5">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Category Name</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Description</Table.HeadCell>
            <Table.HeadCell>Created</Table.HeadCell>
            <Table.HeadCell>Updated</Table.HeadCell>
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
                    {material.category_name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.description}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {new Date(material.created_at).toLocaleString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}, {formatDistanceToNow(new Date(material.created_at))} ago
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {formatDistanceToNow(new Date(material.updated_at))} ago
                  </Table.Cell>
                  <Table.Cell className="flex items-center cursor-pointer gap-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div onClick={() =>{setSelectedId(material.id)}}>
                        <Update product_category_id={selectedId || null} />
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
                  No categories found.
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

      <SuccessToast open={successToastOpen} onClose={() => setSuccessToastOpen(false)} message="Product category deleted successfully!" />
    </div>
  );
};

export default CategoryTable;