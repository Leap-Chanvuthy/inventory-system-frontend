import Partial from "../../../components/Partial";
import CreateForm from "./partials/CreateForm";
import { Tabs } from "flowbite-react";
import { BsUpload , BsDownload } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";

import { MdDashboard } from "react-icons/md";
import SupplierImport from "./partials/Import/SupplierImport";
import SupplierExport from "./partials/Export/SupplierExport";

const Create = () => {
  return (
    <div className="w-full ">
      <Partial title="suppliers" link="create" />

      <Tabs  aria-label="Tabs with icons" variant="underline" className="my-5">
        <Tabs.Item active title="Upload" icon={BsUpload}>
            <CreateForm />
        </Tabs.Item>
        <Tabs.Item title="Import Excel" icon={RiFileExcel2Line}>
            <SupplierImport />
        </Tabs.Item>
        <Tabs.Item title="Download Supplier Data" icon={BsDownload}>
          <SupplierExport />
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

export default Create;
