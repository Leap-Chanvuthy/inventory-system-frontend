import { Table , Button , TextInput , Select} from "flowbite-react";
import GlobalPagination from "../../../components/Pagination";
import { Skeleton } from "@mui/material";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const LoadingState = () => {
    return ( 
        <div>
            <div className="my-5 flex flex-col lg:flex-row gap-3 justify-between">
                <Link to="/users/create">
                    <Button color="info">Create New</Button>
                </Link>
                <div className="flex gap-3">
                    <TextInput placeholder="Search user" rightIcon={IoSearchOutline} />
                    <Select id="role-filter" required>
                        <option value="">Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Stock Controller">Stock Controller</option>
                        <option value="Sales">Sales</option>
                    </Select>
                </div>
            </div>
          <div className="overflow-x-auto h-[65vh] overflow-y-scroll my-5">
              <Table striped>
                  <Table.Head>
                      <Table.HeadCell>
                          <Skeleton variant="rectangular" width={50} height={20} className="bg-gray-300 dark:bg-gray-700" />
                      </Table.HeadCell>
                      <Table.HeadCell>
                          <Skeleton variant="rectangular" width={60} height={20} className="bg-gray-300 dark:bg-gray-700" />
                      </Table.HeadCell>
                      <Table.HeadCell>
                          <Skeleton variant="rectangular" width={150} height={20} className="bg-gray-300 dark:bg-gray-700" />
                      </Table.HeadCell>
                      <Table.HeadCell>
                          <Skeleton variant="rectangular" width={200} height={20} className="bg-gray-300 dark:bg-gray-700" />
                      </Table.HeadCell>
                      <Table.HeadCell>
                          <Skeleton variant="rectangular" width={150} height={20} className="bg-gray-300 dark:bg-gray-700" />
                      </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                      {Array(6).fill().map((_, index) => (
                          <Table.Row
                              key={index}
                              className="bg-white dark:border-gray-700 dark:bg-gray-800"
                          >
                              <Table.Cell>
                                  <Skeleton variant="rectangular" width={20} height={20} className="bg-gray-300 dark:bg-gray-700" />
                              </Table.Cell>
                              <Table.Cell>
                                  <Skeleton variant="circular" width={40} height={40} className="bg-gray-300 dark:bg-gray-700" />
                              </Table.Cell>
                              <Table.Cell>
                                  <Skeleton variant="rectangular" width={120} height={20} className="bg-gray-300 dark:bg-gray-700" />
                              </Table.Cell>
                              <Table.Cell>
                                  <Skeleton variant="rectangular" width={180} height={20} className="bg-gray-300 dark:bg-gray-700" />
                              </Table.Cell>
                              <Table.Cell>
                                  <Skeleton variant="rectangular" width={120} height={20} className="bg-gray-300 dark:bg-gray-700" />
                              </Table.Cell>
                          </Table.Row>
                      ))}
                  </Table.Body>
              </Table>
          </div>
          <GlobalPagination />
      </div>
     );
}
 
export default LoadingState;