import { Tabs } from "flowbite-react";
import Partial from "../../../components/Partial";
import CreateForm from "./partials/CreateForm";
import { BsUpload } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import RawMaterialImport from "./partials/import/RawMaterialImport";

const Create = () => {
  return (
    <div className="w-full ">
      <Partial title="raw materials" link="create" />

      <Tabs  aria-label="Tabs with icons" variant="underline" className="my-5">
        <Tabs.Item active title="Upload" icon={BsUpload}>
            <CreateForm />
        </Tabs.Item>
        <Tabs.Item title="Import Excel" icon={RiFileExcel2Line}>
           <RawMaterialImport />
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

export default Create;
