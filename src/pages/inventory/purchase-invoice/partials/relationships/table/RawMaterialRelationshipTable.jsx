import { useCallback, useEffect, useState } from "react";
import { Alert, Avatar, Badge, Button, Checkbox, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import GlobalPagination from "../../../../../../components/Pagination";
import { BASE_URL , BASE_IMAGE_URL } from "../../../../../../components/const/constant";
import LoadingState from "../../list/LoadingState";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteRawMaterialFailure, deleteRawMaterialStart, deleteRawMaterialSuccess, fetchRawMaterialsFailure, fetchRawMaterialsStart, fetchRawMaterialsSuccess } from "../../../../../../redux/slices/rawMaterialSlice";
import { ImWarning } from "react-icons/im";
import {FiEdit} from 'react-icons/fi';
import { SuccessToast } from "../../../../../../components/ToastNotification";
import { HiInformationCircle } from "react-icons/hi";
import { toggleMultipleSelection } from "../../../../../../redux/slices/selectionSlice";
import useDebounce from "../../../../../../hooks/useDebounce";
import useToken from "../../../../../../hooks/useToken";

const RawMaterialRelationshipTable = ({ filters , createStatus }) => {
  const dispatch = useDispatch();
  const token = useToken();
  const {rawMaterials , error , status} =  useSelector((state) => state.rawMaterials);
  const {multipleSelection} = useSelector((state) => state.selections);
  const [selectedId, setSelectedId] = useState(null);
  const [successToastOpen , setSuccessToastOpen] = useState(false);
  const [openModal , setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchRawMaterials = async (page = 1 , search = filters.search) => {
    dispatch(fetchRawMaterialsStart());
    try {
      const response = await axios.get(`${BASE_URL}/raw-materials/no-invoice`, {
        headers: {
          Authorization : `Bearer ${token}`,  
        },
        params: {
          page,
          "filter[search]": search,
          "filter[status]": filters.status,
          "filter[raw_material_category_id]": filters.category_id,
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

  // Function to hanlde selected id change of raw materials
  const handleMultipleSelect = (id) => {
    dispatch(toggleMultipleSelection(id));
  };

    // Custom debounced fetch function
    const debouncedFetchRawMaterials = useCallback(
      useDebounce((page, query) => {
        fetchRawMaterials(page, query);
      }, 1000),
      [filters]
    );
  
    // Fetch data when filters or page changes
    useEffect(() => {
      debouncedFetchRawMaterials(currentPage, filters.search);
    }, [filters, currentPage , createStatus=='succeeded']);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
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
      <div className="overflow-x-auto lg:max-w-6xl  my-5">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Select</Table.HeadCell>
            <Table.HeadCell>ID</Table.HeadCell>
            {/* <Table.HeadCell>Image</Table.HeadCell> */}
            <Table.HeadCell>Code</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Raw Material Name</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Supplier Code</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Supplier Name</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Remaining Quantity</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Unit Price in USD</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Total Value in USD</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Unit Price in Riel</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Total Value in Riel</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Minimum Stock</Table.HeadCell>
            <Table.HeadCell>location</Table.HeadCell>
            <Table.HeadCell>Created</Table.HeadCell>
            <Table.HeadCell>Updated</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {rawMaterials.length > 0 ? (
              rawMaterials.map((material) => (
                <Table.Row
                  key={material.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                  <Checkbox
                    checked={multipleSelection?.includes(material.id)}
                    onChange={() => handleMultipleSelect(material.id)}
                  />
                  </Table.Cell>  
                  <Table.Cell>
                    {material.id}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.material_code}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.supplier ? (
                      material.supplier.supplier_code
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        <Badge color="failure">N/A</Badge>
                      </div>
                    )}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.supplier ? (
                      material.supplier.name
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        <Badge color="failure">N/A</Badge>
                      </div>
                    )}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                      {material.status === "IN_STOCK" && (
                        <Badge color="success">{material.status}</Badge>
                      )}
                      {material.status === "OUT_OF_STOCK" && (
                        <Badge color="failure">{material.status}</Badge>
                      )}
                    </div>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                      <Badge color={material.category ? "warning" : "failure"}>
                        {material.category ? material.category.category_name : 'NULL'}
                      </Badge>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.quantity}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.remaining_quantity}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">$ {material.unit_price_in_usd}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">$ {material.total_value_in_usd}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{material.unit_price_in_riel} ​៛</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{material.total_value_in_riel} ​៛</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{material.minimum_stock_level}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{material.location}</Table.Cell>
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

    </div>
  );
};

export default RawMaterialRelationshipTable;
