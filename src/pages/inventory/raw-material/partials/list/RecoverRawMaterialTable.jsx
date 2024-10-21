import { useEffect, useState } from "react";
import { Badge, Button, Modal, Table, Tooltip } from "flowbite-react";
import axios from "axios";
import GlobalPagination from "../../../../../components/Pagination";
import {
  BASE_URL,
} from "../../../../../components/const/constant";
import LoadingState from "./LoadingState";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {TbRestore} from 'react-icons/tb';
import { useDispatch, useSelector } from "react-redux";
import { recoverRawMaterialFailure, recoverRawMaterialStart, recoverRawMaterialSuccess, fetchRawMaterialsFailure, fetchRawMaterialsStart, fetchRawMaterialsSuccess } from "../../../../../redux/slices/rawMaterialSlice";
import { SuccessToast } from "../../../../../components/ToastNotification";
import { CiCircleCheck } from "react-icons/ci";


const RecoverRawMaterialTable = ({ filters }) => {
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
      const response = await axios.get(`${BASE_URL}/raw-materials/trashed`, {
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
      console.log("Failed to fetch raw materials: " + err.response);
    }
  };

  // Fetch data when filters or page changes
  useEffect(() => {
    fetchRawMaterials(currentPage);
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
    dispatch(recoverRawMaterialStart());
    try {
      const response = await axios.patch(`${BASE_URL}/raw-materials/recover/${selectedId}`);
      console.log(response);
      if (response.status === 200) {
        dispatch(recoverRawMaterialSuccess(selectedId));
        setOpenModal(false);
        setSuccessToastOpen(true);
      }
    } catch (err) {
      console.log("Restore error:", err.response);
      dispatch(
        recoverRawMaterialFailure(err.message || "Error restore data from the server.")
      );
    }
  };

  if (!Array.isArray(rawMaterials)) {
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
            <Table.HeadCell>Code</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Product Name</Table.HeadCell>
            <Table.HeadCell>Material Status</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Status</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Remaining Quantity</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Unit Price in USD</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Total Value in USD</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Unit Price in Riel</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Total Value in Riel</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Minimum Stock</Table.HeadCell>
            <Table.HeadCell>location</Table.HeadCell>
            <Table.HeadCell>Created</Table.HeadCell>
            <Table.HeadCell>Updated</Table.HeadCell>
            <Table.HeadCell>Deleted</Table.HeadCell>
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
                    {material.quantity}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Badge color="failure">DELETED</Badge>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.remaining_quantity}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-green-600 dark:text-green-300">$ {material.unit_price_in_usd}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-green-600 dark:text-green-300">$ {material.total_value_in_usd}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-green-600 dark:text-green-300">{material.unit_price_in_riel} ​៛</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-green-600 dark:text-green-300">{material.total_value_in_riel} ​៛</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{material.minimum_stock_level}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{material.location}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {formatDistanceToNow(new Date(material.created_at))} ago
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {formatDistanceToNow(new Date(material.updated_at))} ago
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {formatDistanceToNow(new Date(material.deleted_at))} ago
                  </Table.Cell>
                  <Table.Cell className="flex justify-center items-center cursor-pointer gap-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Tooltip content='Click to recover'>
                        <TbRestore
                          className="text-green-600 text-lg cursor-pointer"
                          onClick={() => {
                            setOpenModal(true);
                            setSelectedId(material.id);
                          }}
                        />
                    </Tooltip>
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
        <Modal.Header><p className="text-center font-bold text-lg">Are you sure want to recover this item ?</p></Modal.Header>
        <Modal.Body>
          <div className="flex items-center gap-3 p-4 border-l-4 border-green-600 bg-green-100 rounded-md">
            <CiCircleCheck className="text-lg text-green-500" />
            <p className="text-green-500">After successfully restored, Item will be shown in active list.</p>
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
        message="Raw material restored successfully!"
      />
    </div>
  );
};

export default RecoverRawMaterialTable;
