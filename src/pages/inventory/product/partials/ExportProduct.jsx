import { Button, Modal , TextInput , Select } from "flowbite-react";
import { useState } from "react";

const ExportProduct = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Export</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="dark:bg-gray-800 dark:text-white">
          Export Product Data
        </Modal.Header>
        <Modal.Body className="dark:bg-gray-800 dark:text-gray-400">
          <div className="space-y-6">
          <div className="flex flex-col lg:md:flex-row gap-3">
              <TextInput placeholder="Search product"  />
              <Select id="countries" required>
                <option>Category</option>
                <option>Raw Meterials</option>
                <option>Work In Progress</option>
                <option>Packaging</option>
                <option>Finished Goods</option>
              </Select>
              <Select id="countries" required>
                <option>Stock Level</option>
                <option>Lowest</option>
                <option>Highest</option>
              </Select>
              <Select id="countries" required>
                <option>Stock Level</option>
                <option>Lowest</option>
                <option>Highest</option>
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="dark:bg-gray-800">
          <Button onClick={() => setOpenModal(false)} className="dark:bg-cyan-700 dark:hover:bg-cyan-800">
            Export
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)} className="dark:bg-gray-600 dark:hover:bg-gray-700">
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ExportProduct;