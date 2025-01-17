import { useCallback, useEffect, useState } from "react";
import { Badge, Checkbox, Table, Tooltip } from "flowbite-react";
import axios from "axios";
import GlobalPagination from "../../../../../../components/Pagination";
import {
  BASE_URL,
  BASE_IMAGE_URL,
} from "../../../../../../components/const/constant";
import LoadingState from "../../list/LoadingState";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useDispatch, useSelector } from "react-redux";
import {
  addMaterialToCart,
  fetchRawMaterialsFailure,
  fetchRawMaterialsStart,
  fetchRawMaterialsSuccess,
  removeMaterialFromCart,
} from "../../../../../../redux/slices/rawMaterialSlice";
import {
  resetSingleSelectionState,
  toggleSingleSelection,
} from "../../../../../../redux/slices/selectionSlice";
import useDebounce from "../../../../../../hooks/useDebounce";
import useToken from "../../../../../../hooks/useToken";

const RawMaterialRelationshipTable = ({ filters, setOpenModal  }) => {
  const token = useToken();
  const dispatch = useDispatch();
  const { materialOnCart, rawMaterials, error, status } = useSelector(
    (state) => state.rawMaterials
  );

  const { singleSelection } = useSelector((state) => state.selections);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchRawMaterials = async (page = 1, query = filters.query) => {
    dispatch(fetchRawMaterialsStart());
    try {
      const response = await axios.get(`${BASE_URL}/raw-materials`, {
        headers : {
          Authorization : `Bearer ${token}`
        },
        params: {
          page,
          "filter[search]": query,
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
      dispatch(fetchRawMaterialsFailure(err?.message));
      console.log("Failed to fetch raw materials: " + err);
    }
  };

  // Function to hanlde selected id change of raw materials
  const handleSingleSelect = (id, material) => {
    dispatch(toggleSingleSelection(id));
    setTimeout(() => {
      setOpenModal(false);
    }, 500);
    if (singleSelection == id) {
      dispatch(removeMaterialFromCart({ id }));
    } else {
      dispatch(addMaterialToCart(material));
    }
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
    debouncedFetchRawMaterials(currentPage, filters.query);
  }, [filters, currentPage]);

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
            <Table.HeadCell className="whitespace-nowrap">
              Material Name
            </Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Remaining Quantity
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Supplier Code
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Supplier Name
            </Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Unit Price in USD
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Total Value in USD
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Unit Price in Riel
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Total Value in Riel
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Minimum Stock
            </Table.HeadCell>
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
                    <Tooltip content="Click to select">
                      <Checkbox
                        checked={singleSelection == material.id}
                        onChange={() =>
                          handleSingleSelect(material.id, material)
                        }
                      />
                    </Tooltip>
                  </Table.Cell>
                  <Table.Cell>{material.id}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.material_code}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.quantity}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.remaining_quantity}
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
                      {material.status === "LOW_STOCK" && (
                        <Badge color="warning">{material.status}</Badge>
                      )}
                      {material.status === "OUT_OF_STOCK" && (
                        <Badge color="failure">{material.status}</Badge>
                      )}
                    </div>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                      <Badge color={material.category ? "warning" : "failure"}>
                        {material.category
                          ? material.category.category_name
                          : "NULL"}
                      </Badge>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    $ {material.unit_price_in_usd}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    $ {material.total_value_in_usd}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.unit_price_in_riel} ​៛
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.total_value_in_riel} ​៛
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.minimum_stock_level}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.location}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {new Date(material.created_at).toLocaleString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    , {formatDistanceToNow(new Date(material.created_at))} ago
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
