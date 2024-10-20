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
import { deleteRawMaterialFailure, deleteRawMaterialStart, deleteRawMaterialSuccess, fetchRawMaterialsFailure, fetchRawMaterialsStart, fetchRawMaterialsSuccess } from "../../../../../redux/slices/rawMaterialSlice";
import { SuccessToast } from "../../../../../components/ToastNotification";
import { LuTriangle } from "react-icons/lu";

const RawMaterialTable = ({ filters }) => {
  const dispatch = useDispatch();
  const {rawMaterials , error , status} =  useSelector((state) => state.rawMaterials);
  const [selectedId, setSelectedId] = useState(null);
  const [successToastOpen , setSuccessToastOpen] = useState(false);
  const [openModal , setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchRawMaterials = async (page = 1) => {
    dispatch(fetchRawMaterialsStart());
    try {
      const response = await axios.get(`${BASE_URL}/raw-materials`, {
        params: {
          page,
          "filter[search]": filters.query,
          "filter[status]": filters.status,
          "filter[raw_material_category]": filters.category,
          sort: filters.sort,
        },
      });
      dispatch(fetchRawMaterialsSuccess(response.data.data));
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotalItems(response.data.total);
    } catch (err) {
      dispatch(fetchRawMaterialsFailure(err?.message))
      console.log("Failed to fetch raw materials: " + err.message);
    }
  };

  // Fetch data when filters or page changes
  useEffect(() => {
    fetchRawMaterials(currentPage);
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
    dispatch(deleteRawMaterialStart());
    try {
      const response = await axios.delete(`${BASE_URL}/raw-material/${selectedId}`);
      console.log(response);
      if (response.status === 200) {
        dispatch(deleteRawMaterialSuccess(selectedId));
        setOpenModal(false);
        setSuccessToastOpen(true);
      }
    } catch (err) {
      console.log("Delete error:", err.message);
      dispatch(
        deleteRawMaterialFailure(err.message || "Error deleting data from the server.")
      );
    }
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
  if (status === "failed")
    return <div className="text-center py-5 text-red-500">{error}</div>;

  return (
    <div>
      <div className="overflow-x-auto lg:max-w-6xl  my-5">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Code</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Product Name</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Unit Price</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Total Value</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Minimum Stock</Table.HeadCell>
            <Table.HeadCell>location</Table.HeadCell>
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
                  <Table.Cell className="whitespace-nowrap">
                    {material.raw_material_images.length > 0 ? (
                      <Avatar
                        img={`${BASE_IMAGE_URL}/${material.raw_material_images[0].image}`}
                        alt={material.name}
                        className="w-16 h-16 object-cover"
                      />
                    ) : (
                      ""
                    )}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.material_code}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.status === "IN_STOCK" && (
                      <Badge color="success">{material.status}</Badge>
                    )}
                    {material.status === "OUT_OF_STOCK" && (
                      <Badge color="failure">{material.status}</Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.quantity} {material.unit}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{material.unit_price}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{material.total_value}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{material.minimum_stock_level}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{material.location}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {formatDistanceToNow(new Date(material.created_at))} ago
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {formatDistanceToNow(new Date(material.updated_at))} ago
                  </Table.Cell>
                  <Table.Cell className="flex items-center cursor-pointer gap-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Link
                      to={`/raw-material/update/${material.id}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </Link>
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
                  No raw materials found.
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
        <Modal.Body>
          <p className="text-center font-bold text-lg">Are you sure want to delete this user ?</p>
          <div className="flex flex-col p-4 my-4 border-l-4 border-red-600 bg-red-100 rounded-md">
            <div className="flex items-center gap-2 mx-4 font-bold text-red-900">
              <LuTriangle />
              <p>Warning</p>
            </div>
            <p className="mx-4 text-red-400">Once you deleted this raw material, Data will not be recovered!</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDelete} color='failure'>
            {status == "loading" ? <Spinner /> : "Delete"}
          </Button>
          <Button onClick={() => setOpenModal(false)}>
            Decline
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

export default RawMaterialTable;
