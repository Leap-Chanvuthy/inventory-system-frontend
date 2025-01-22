import React, { useState } from "react";
import { Modal, Button, Timeline, Table, Badge, Avatar } from "flowbite-react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa6";

const Detail = ({ purchaseInvoice }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <Button onClick={openModal}>View Purchase Invoice Details</Button>
      <Modal size="5xl" show={isOpen} onClose={closeModal}>
        <Modal.Header>
          <p className="font-bold">Purchase Invoice Details</p>
        </Modal.Header>
        <Modal.Body>
          <Timeline>
            <Timeline.Item>
              <Timeline.Point icon={FaFileInvoiceDollar} />
              <Timeline.Content>
                <Timeline.Title>Invoice Info</Timeline.Title>
                <Timeline.Body>
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-5 my-5">
                    <div>
                      <h3 className="font-bold">Invoice Number:</h3>
                      <p>{purchaseInvoice?.invoice_number}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Payment Status:</h3>
                      <p>{purchaseInvoice?.status}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Payment Date:</h3>
                      <p>
                        {new Date(purchaseInvoice?.payment_date).toLocaleString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold">Payment Method:</h3>
                      <p>{purchaseInvoice?.payment_method}</p>
                    </div>
                  </div>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={FaFileInvoiceDollar} />
              <Timeline.Content>
                <Timeline.Title>Invoice Value</Timeline.Title>
                <Timeline.Body>
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-5 my-5">
                    <div>
                      <h3 className="font-bold">Total Amount with Tax (USD):</h3>
                      <p>{purchaseInvoice?.grand_total_with_tax_in_usd} $</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Total Amount with Tax (Riel):</h3>
                      <p>{purchaseInvoice?.grand_total_with_tax_in_riel} ៛</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Payable Percentage:</h3>
                      <p>{purchaseInvoice?.clearing_payable_percentage} %</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Discount:</h3>
                      <p>
                        {purchaseInvoice?.discount_percentage} % | {purchaseInvoice?.discount_value_in_usd} $ / {purchaseInvoice?.discount_value_in_riel} ៛
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold">Tax:</h3>
                      <p>
                        {purchaseInvoice?.tax_percentage} % | {purchaseInvoice?.tax_value_in_usd} $ / {purchaseInvoice?.tax_value_in_riel} ៛
                      </p>
                    </div>
                  </div>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={IoCartOutline} />
              <Timeline.Content>
                <Timeline.Title>Description (Raw Material Detail)</Timeline.Title>
                <Timeline.Body>
                  <div className="overflow-x-auto lg:max-w-7xl my-5">
                    <Table striped>
                      <Table.Head>
                        <Table.HeadCell className="whitespace-nowrap">Material Code</Table.HeadCell>
                        <Table.HeadCell className="whitespace-nowrap">Material Name</Table.HeadCell>
                        <Table.HeadCell className="whitespace-nowrap">Quantity</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell className="whitespace-nowrap">Unit Price</Table.HeadCell>
                        <Table.HeadCell className="whitespace-nowrap">Total Price</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        {purchaseInvoice?.purchase_invoice_details?.length > 0 ? (
                          purchaseInvoice.purchase_invoice_details.map((detail) => (
                            <Table.Row key={detail.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {detail.raw_material?.material_code}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {detail.raw_material?.name}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-bold text-green-700 dark:text-white">
                                {detail.quantity}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                <div className="flex flex-wrap gap-2">
                                  <Badge color={detail.raw_material?.category ? "warning" : "failure"}>
                                    {detail.raw_material?.category ? detail.raw_material.category.category_name : "NULL"}
                                  </Badge>
                                </div>
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-bold text-green-700 dark:text-white">
                                $ {detail.raw_material?.unit_price_in_usd} | {detail.raw_material?.unit_price_in_riel} ៛
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-bold text-green-700 dark:text-white">
                                $ {detail.total_price_in_usd} | {detail.total_price_in_riel} ៛
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
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={FaUserTie} />
              <Timeline.Content>
                <Timeline.Title>Supplier</Timeline.Title>
                <Timeline.Body>
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-5 my-5">
                    <div>
                      <h3 className="font-bold">Supplier Name:</h3>
                      <p>{purchaseInvoice?.supplier?.name}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Supplier Email:</h3>
                      <p>{purchaseInvoice?.supplier?.email}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Supplier Phone:</h3>
                      <p>{purchaseInvoice?.supplier?.phone_number}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Supplier Location:</h3>
                      <a
                        href={`https://www.google.com/maps?q=${purchaseInvoice?.supplier?.latitude},${purchaseInvoice?.supplier?.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        View on Google Maps
                      </a>
                    </div>
                    <div>
                      <h3 className="font-bold">Supplier Note:</h3>
                      <p>{purchaseInvoice?.supplier?.note}</p>
                    </div>
                  </div>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Detail;