import { useState, useEffect } from "react";
import { TextInput, Table, Checkbox } from "flowbite-react";
import { IoSearchOutline } from "react-icons/io5";
import LoadingState from "../../../raw-material/partials/list/LoadingState";
import GlobalPagination from "../../../../../components/Pagination";
import axios from "axios";
import { BASE_URL } from "../../../../../components/const/constant";

const RawMaterialRelationship = ({
  raw_material_ids,
  handleRawMaleRawMaterialsChange,
}) => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Search
  const [filters, setFilters] = useState({
    query: "",
  });

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters({ ...filters, [id]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRawMaterials();
  };

  // Fetch raw materials
  const fetchRawMaterials = async (page = 1) => {
    setStatus("loading");
    try {
      const response = await axios.get(`${BASE_URL}/raw-materials`, {
        params: {
          page,
          "filter[search]": filters.query,
        },
      });
      console.log(response);
      setRawMaterials(response.data.data);
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotalItems(response.data.total);
      setStatus("succeeded");
    } catch (err) {
      console.log(err.response)
      setError("Failed to fetch raw materials: " + err.message);
      setStatus("failed");
    }
  };

  // Fetch data when filters or page changes
  useEffect(() => {
    fetchRawMaterials(currentPage);
  }, [filters, currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // handle checkbox toggle
  const handleCheckboxChange = (id) => {
    if (raw_material_ids.includes(id)) {
      handleRawMaleRawMaterialsChange(
        raw_material_ids.filter((raw_material_id) => raw_material_id !== id)
      );
    } else {
      handleRawMaleRawMaterialsChange([...raw_material_ids, id]);
    }
  };

  // Sort raw materials to show those with relationships first
  const sortedRawMaterials = rawMaterials.sort((a, b) => {
    const aHasRelationship = raw_material_ids.includes(a.id);
    const bHasRelationship = raw_material_ids.includes(b.id);
    return aHasRelationship === bHasRelationship ? 0 : aHasRelationship ? -1 : 1;
  });

  if (status === "loading") {
    return (
      <div>
        <div className="my-5 flex flex-col lg:md:flex-row gap-3 justify-between">
          <form
            onSubmit={handleSearch}
            className="flex flex-col lg:md:flex-row gap-3"
          >
            <TextInput
              placeholder="Search product"
              id="query"
              value={filters.query}
              onChange={handleFilterChange}
              rightIcon={IoSearchOutline}
            />
          </form>
        </div>
        <LoadingState />
        <GlobalPagination
          current_page={currentPage}
          last_page={totalPages}
          from={(currentPage - 1) * 10 + 1} // Assuming 10 items per page
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
      <div>
        <div className="my-5 flex flex-col lg:md:flex-row gap-3 justify-between">
          <form
            onSubmit={handleSearch}
            className="flex flex-col lg:md:flex-row gap-3"
          >
            <TextInput
              placeholder="Search product"
              id="query"
              value={filters.query}
              onChange={handleFilterChange}
              rightIcon={IoSearchOutline}
            />
          </form>
        </div>
      </div>

      <div>
        <div className="overflow-x-auto overflow-y-scroll my-5">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Select</Table.HeadCell>
              <Table.HeadCell>Product Name</Table.HeadCell>
              <Table.HeadCell>Quantity</Table.HeadCell>
              <Table.HeadCell>Unit Price</Table.HeadCell>
              <Table.HeadCell>Unit</Table.HeadCell>
              <Table.HeadCell>Minimum Stock</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {sortedRawMaterials.length > 0 ? (
                sortedRawMaterials.map((material) => (
                  <Table.Row
                    key={material.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      <Checkbox
                        checked={raw_material_ids.includes(material.id)}
                        onChange={() => handleCheckboxChange(material.id)}
                      />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {material.name}
                    </Table.Cell>
                    <Table.Cell>
                      {material.quantity} {material.unit}
                    </Table.Cell>
                    <Table.Cell>{material.unit_price}</Table.Cell>
                    <Table.Cell>{material.unit}</Table.Cell>
                    <Table.Cell>
                      {material.minimum_stock_level} Items
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan="6" className="text-center py-4">
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
            from={(currentPage - 1) * 10 + 1} // Assuming 10 items per page
            to={Math.min(currentPage * 10, totalItems)}
            total={totalItems}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RawMaterialRelationship;
