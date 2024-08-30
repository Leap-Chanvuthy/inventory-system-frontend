import { Table } from "flowbite-react";
import { Skeleton } from "@mui/material";

const LoadingState = () => {
  return (
    <div className="overflow-x-auto h-[65vh] overflow-y-scroll my-5">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>
            <Skeleton
              variant="rectangular"
              width={60}
              height={20}
              className="bg-gray-300 dark:bg-gray-600"
            />
          </Table.HeadCell>
          <Table.HeadCell>
            <Skeleton
              variant="rectangular"
              width={60}
              height={20}
              className="bg-gray-300 dark:bg-gray-600"
            />
          </Table.HeadCell>
          <Table.HeadCell>
            <Skeleton
              variant="rectangular"
              width={60}
              height={20}
              className="bg-gray-300 dark:bg-gray-600"
            />
          </Table.HeadCell>
          <Table.HeadCell>
            <Skeleton
              variant="rectangular"
              width={150}
              height={20}
              className="bg-gray-300 dark:bg-gray-600"
            />
          </Table.HeadCell>
          <Table.HeadCell>
            <Skeleton
              variant="rectangular"
              width={200}
              height={20}
              className="bg-gray-300 dark:bg-gray-600"
            />
          </Table.HeadCell>
          <Table.HeadCell>
            <Skeleton
              variant="rectangular"
              width={150}
              height={20}
              className="bg-gray-300 dark:bg-gray-600"
            />
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {Array(10)
            .fill()
            .map((_, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={20}
                    className="bg-gray-200 dark:bg-gray-600"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={20}
                    className="bg-gray-200 dark:bg-gray-600"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={20}
                    className="bg-gray-200 dark:bg-gray-600"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton
                    variant="rectangular"
                    width={180}
                    height={20}
                    className="bg-gray-200 dark:bg-gray-600"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton
                    variant="rectangular"
                    width={200}
                    height={20}
                    className="bg-gray-200 dark:bg-gray-600"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton
                    variant="rectangular"
                    width={120}
                    height={20}
                    className="bg-gray-200 dark:bg-gray-600"
                  />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default LoadingState;
