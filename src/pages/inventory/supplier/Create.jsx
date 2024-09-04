import Partial from "../../../components/Partial";
import CreateForm from "./partials/CreateForm";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { RiFileExcel2Line } from "react-icons/ri";

import { MdDashboard } from "react-icons/md";
import SupplierImport from "./partials/Import/SupplierImport";

const Create = () => {
  return (
    <div className="w-full ">
      <Partial title="suppliers" link="create" />

      <Tabs  aria-label="Tabs with icons" variant="underline" className="my-5">
        <Tabs.Item active title="Upload" icon={HiUserCircle}>
            <CreateForm />
        </Tabs.Item>
        <Tabs.Item title="Import Excel" icon={RiFileExcel2Line}>
            <SupplierImport />
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

export default Create;
