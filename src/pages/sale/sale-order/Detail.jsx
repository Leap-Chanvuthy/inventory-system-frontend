// import React, { useState } from "react";
// import { Modal, Button, Timeline, Table, Badge, Avatar } from "flowbite-react";
// import { FaFileInvoiceDollar } from "react-icons/fa";
// import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
// import { IoCartOutline } from "react-icons/io5";
// import { FaUserTie } from "react-icons/fa6";

// const Detail = ({ saleOrder , status }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   return (
//     <div>
//       <Button onClick={openModal}>View Sale Order Details</Button>
//       <Modal size="5xl" show={isOpen} onClose={closeModal}>
//         <Modal.Header><p className="font-bold">Sale Order Details</p></Modal.Header>
//         <Modal.Body>
//           <Timeline>
//             <Timeline.Item>
//               <Timeline.Point icon={FaFileInvoiceDollar} />
//               <Timeline.Content>
//                 <Timeline.Title>Invoice Info</Timeline.Title>
//                 <Timeline.Body>
//                   <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-5 my-5">
//                     <div>
//                       <h3 className="font-bold">Invoice Number:</h3>
//                       <p>{saleOrder.sale_invoice_number}</p>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Order Status:</h3>
//                       <p>{saleOrder.order_status}</p>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Payment Status:</h3>
//                       <p>{saleOrder.payment_status}</p>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Order Date:</h3>
//                       <p>{" "}{new Date(saleOrder.order_date).toLocaleString("en-US", {
//                           weekday: "short",
//                           year: "numeric",
//                           month: "short",
//                           day: "numeric",
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </p>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Payment Method:</h3>
//                       <p>{saleOrder.payment_method}</p>
//                     </div>
//                   </div>
//                 </Timeline.Body>
//               </Timeline.Content>
//             </Timeline.Item>
//             <Timeline.Item>
//               <Timeline.Point icon={FaFileInvoiceDollar} />
//               <Timeline.Content>
//                 <Timeline.Title>Invoice Value</Timeline.Title>
//                 <Timeline.Body>
//                   <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-5 my-5">
//                     <div>
//                       <h3 className="font-bold">
//                         Total Amount with Tax (USD):
//                       </h3>
//                       <p>{saleOrder.grand_total_with_tax_in_usd} $</p>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">
//                         Total Amount with Tax (Riel):
//                       </h3>
//                       <p>{saleOrder.grand_total_with_tax_in_riel} ៛</p>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Payable Percentage:</h3>
//                       <p>{saleOrder.clearing_payable_percentage} %</p>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Discount:</h3>
//                       <p>
//                         {saleOrder.discount_percentage} % |{" "}
//                         {saleOrder.discount_value_in_usd} $ /{" "}
//                         {saleOrder.discount_value_in_riel} ៛
//                       </p>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Tax:</h3>
//                       <p>
//                         {saleOrder.tax_percentage} % |{" "}
//                         {saleOrder.tax_value_in_usd} $ /{" "}
//                         {saleOrder.tax_value_in_riel} ៛
//                       </p>
//                     </div>
//                   </div>
//                 </Timeline.Body>
//               </Timeline.Content>
//             </Timeline.Item>
//             <Timeline.Item>
//               <Timeline.Point icon={FaUserTie} />
//               <Timeline.Content>
//                 <Timeline.Title>Customer</Timeline.Title>
//                 <Timeline.Body>
//                   <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-5 my-5">
//                     <div>
//                       <h3 className="font-bold">Customer Name:</h3>
//                       <p>{saleOrder.customer.fullname}</p>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Customer Phone:</h3>
//                       <p>{saleOrder.customer.phone_number}</p>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Customer Phone:</h3>
//                       <p>{saleOrder.customer.email_address}</p>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Shipping Address:</h3>
//                       <p>{saleOrder.customer.shipping_address}</p>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Customer Location:</h3>
//                       <a
//                         href={`https://www.google.com/maps?q=${saleOrder.customer.latitude},${saleOrder.customer.longitude}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-500"
//                       >
//                         View on Google Maps
//                       </a>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Customer Note:</h3>
//                       <p>{saleOrder.customer.customer_note}</p>
//                     </div>
//                   </div>
//                 </Timeline.Body>
//               </Timeline.Content>
//             </Timeline.Item>
//             <Timeline.Item>
//               <Timeline.Point icon={IoCartOutline} />
//               <Timeline.Content>
//                 <Timeline.Title>Description (Product Detail)</Timeline.Title>
//                 <Timeline.Body>
//                     <div className="overflow-x-auto lg:max-w-7xl  my-5">
//                         <Table striped>
//                         <Table.Head>
//                             <Table.HeadCell className="whitespace-nowrap">
//                             Product Code
//                             </Table.HeadCell>
//                             <Table.HeadCell className="whitespace-nowrap">
//                             Product Name
//                             </Table.HeadCell>
//                             <Table.HeadCell className="whitespace-nowrap">
//                             Order Qty
//                             </Table.HeadCell>
//                             <Table.HeadCell>Category</Table.HeadCell>
//                             <Table.HeadCell className="whitespace-nowrap">
//                             Unit Price 
//                             </Table.HeadCell>
//                             <Table.HeadCell className="whitespace-nowrap">
//                             Total Price 
//                             </Table.HeadCell>
//                         </Table.Head>
//                         <Table.Body className="divide-y">
//                             {saleOrder.products.length > 0 ? (
//                             saleOrder.products.map((product) => (
//                                 <Table.Row
//                                 key={product.id}
//                                 className="bg-white dark:border-gray-700 dark:bg-gray-800"
//                                 >
//                                 <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
//                                     {product.product_code}
//                                 </Table.Cell>
//                                 <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
//                                     {product.product_name}
//                                 </Table.Cell>
//                                 <Table.Cell className="whitespace-nowrap font-bold text-green-700 dark:text-white">
//                                     {product.pivot.quantity_sold}
//                                 </Table.Cell>
//                                 <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
//                                     <div className="flex flex-wrap gap-2">
//                                     <Badge color={product.category ? "warning" : "failure"}>
//                                         {product.category
//                                         ? product.category.category_name
//                                         : "NULL"}
//                                     </Badge>
//                                     </div>
//                                 </Table.Cell>
//                                 <Table.Cell className="whitespace-nowrap font-bold text-green-700 dark:text-white">
//                                     $ {product.unit_price_in_usd} | {product.unit_price_in_riel} ៛
//                                 </Table.Cell>
//                                 <Table.Cell className="whitespace-nowrap font-bold text-green-700 dark:text-white">
//                                     $ {product.unit_price_in_usd * product.pivot.quantity_sold} | {product.unit_price_in_riel * product.pivot.quantity_sold} ៛
//                                 </Table.Cell>
//                                 </Table.Row>
//                             ))
//                             ) : (
//                             <Table.Row>
//                                 <Table.Cell colSpan="8" className="text-center py-4">
//                                 No products found.
//                                 </Table.Cell>
//                             </Table.Row>
//                             )}
//                         </Table.Body>
//                         </Table>
//                     </div>
//                 </Timeline.Body>
//               </Timeline.Content>
//             </Timeline.Item>
//             <Timeline.Item>
//               <Timeline.Point icon={FaUserTie} />
//               <Timeline.Content>
//                 <Timeline.Title>Vendor</Timeline.Title>
//                 <Timeline.Body>
//                   <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-5 my-5">
//                     <div>
//                       <h3 className="font-bold">Vendor Name:</h3>
//                       <p>{saleOrder.vender.name}</p>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Vendor Email:</h3>
//                       <p>{saleOrder.vender.email}</p>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Vendor Phone:</h3>
//                       <p>{saleOrder.vender.phone_number}</p>
//                     </div>
//                   </div>
//                 </Timeline.Body>
//               </Timeline.Content>
//             </Timeline.Item>
//           </Timeline>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={closeModal}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Detail;



import React, { useState } from "react";
import { Modal, Button, Timeline, Table, Badge, Avatar } from "flowbite-react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa6";

const Detail = ({ saleOrder, status }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <Button onClick={openModal}>View Sale Order Details</Button>
      <Modal size="5xl" show={isOpen} onClose={closeModal}>
        <Modal.Header>
          <p className="font-bold">Sale Order Details</p>
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
                      <p>{saleOrder?.sale_invoice_number}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Order Status:</h3>
                      <p>{saleOrder?.order_status}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Payment Status:</h3>
                      <p>{saleOrder?.payment_status}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Order Date:</h3>
                      <p>
                        {new Date(saleOrder?.order_date).toLocaleString("en-US", {
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
                      <p>{saleOrder?.payment_method}</p>
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
                      <p>{saleOrder?.grand_total_with_tax_in_usd} $</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Total Amount with Tax (Riel):</h3>
                      <p>{saleOrder?.grand_total_with_tax_in_riel} ៛</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Payable Percentage:</h3>
                      <p>{saleOrder?.clearing_payable_percentage} %</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Discount:</h3>
                      <p>
                        {saleOrder?.discount_percentage} % | {saleOrder?.discount_value_in_usd} $ / {saleOrder?.discount_value_in_riel} ៛
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold">Tax:</h3>
                      <p>
                        {saleOrder?.tax_percentage} % | {saleOrder?.tax_value_in_usd} $ / {saleOrder?.tax_value_in_riel} ៛
                      </p>
                    </div>
                  </div>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={FaUserTie} />
              <Timeline.Content>
                <Timeline.Title>Customer</Timeline.Title>
                <Timeline.Body>
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-5 my-5">
                    <div>
                      <h3 className="font-bold">Customer Name:</h3>
                      <p>{saleOrder?.customer?.fullname}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Customer Phone:</h3>
                      <p>{saleOrder?.customer?.phone_number}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Customer Email:</h3>
                      <p>{saleOrder?.customer?.email_address}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Shipping Address:</h3>
                      <p>{saleOrder?.customer?.shipping_address}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Customer Location:</h3>
                      <a
                        href={`https://www.google.com/maps?q=${saleOrder?.customer?.latitude},${saleOrder?.customer?.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        View on Google Maps
                      </a>
                    </div>
                    <div>
                      <h3 className="font-bold">Customer Note:</h3>
                      <p>{saleOrder?.customer?.customer_note}</p>
                    </div>
                  </div>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={IoCartOutline} />
              <Timeline.Content>
                <Timeline.Title>Description (Product Detail)</Timeline.Title>
                <Timeline.Body>
                  <div className="overflow-x-auto lg:max-w-7xl my-5">
                    <Table striped>
                      <Table.Head>
                        <Table.HeadCell className="whitespace-nowrap">Product Code</Table.HeadCell>
                        <Table.HeadCell className="whitespace-nowrap">Product Name</Table.HeadCell>
                        <Table.HeadCell className="whitespace-nowrap">Order Qty</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell className="whitespace-nowrap">Unit Price</Table.HeadCell>
                        <Table.HeadCell className="whitespace-nowrap">Total Price</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        {saleOrder?.products?.length > 0 ? (
                          saleOrder.products.map((product) => (
                            <Table.Row key={product.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {product.product_code}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {product.product_name}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-bold text-green-700 dark:text-white">
                                {product.pivot.quantity_sold}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                <div className="flex flex-wrap gap-2">
                                  <Badge color={product.category ? "warning" : "failure"}>
                                    {product.category ? product.category.category_name : "NULL"}
                                  </Badge>
                                </div>
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-bold text-green-700 dark:text-white">
                                $ {product.unit_price_in_usd} | {product.unit_price_in_riel} ៛
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-bold text-green-700 dark:text-white">
                                $ {product.unit_price_in_usd * product.pivot.quantity_sold} | {product.unit_price_in_riel * product.pivot.quantity_sold} ៛
                              </Table.Cell>
                            </Table.Row>
                          ))
                        ) : (
                          <Table.Row>
                            <Table.Cell colSpan="8" className="text-center py-4">
                              No products found.
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
                <Timeline.Title>Vendor</Timeline.Title>
                <Timeline.Body>
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-5 my-5">
                    <div>
                      <h3 className="font-bold">Vendor Name:</h3>
                      <p>{saleOrder?.vender?.name}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Vendor Email:</h3>
                      <p>{saleOrder?.vender?.email}</p>
                    </div>
                    <div>
                      <h3 className="font-bold">Vendor Phone:</h3>
                      <p>{saleOrder?.vender?.phone_number}</p>
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