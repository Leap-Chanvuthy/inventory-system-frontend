import { Button, Label, Modal, Spinner, Textarea, TextInput } from "flowbite-react";
import { useState  } from "react";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { BASE_URL } from "../../../../../components/const/constant";
import { DangerToast, SuccessToast } from "../../../../../components/ToastNotification";
import { IoIosArrowBack } from "react-icons/io";


const Create = () => {
  const [error , setError] = useState(null);
  const [loading , setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [successToastOpen , setSuccessToastOpen] = useState(false);
  const [failToastOpen , setFailToastOpen] = useState(false);

  // initial values

  const [values , setValues] = useState({
    category_name : "",
    description : ""
  })

  // function to handle values changing
  const handleChange = (e) =>{
    const value = e.target.value;
    const key = e.target.id
    setValues({...values , [key] : value});
  }

  // Sending post request
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    try {
        const response = await axios.post (`${BASE_URL}/product-category/create` , values);
        console.log(response);
        setValues({
          category_name: "",
          description: "",
        });
        setLoading(false);
        setSuccessToastOpen(true)
        setOpenModal(false);
    }catch (err){
        console.log(err);
        setError(err?.response?.data?.errors);
        setFailToastOpen(true);
        setLoading(false)
    }

  }


  const resetForm = () => {
    setValues({
      category_name: "",
      description: "",
    });
  };


  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
        <div className="flex items-center gap-1">
            <FaPlus/>
            Category
        </div>
      </Button>
      <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
        <Modal.Header>
            <h3 className="font-semibold p-4">Product Category</h3>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="category_name" value="Category name" />
              </div>
              <TextInput
                type="text"
                id="category_name"
                value={values.category_name}
                onChange={handleChange}
                className={`${
                    error?.category_name
                      ? "border-[1.5px] border-red-400 rounded-md"
                      : ""
                  } `}
                  helperText={
                    error?.category_name && (
                      <>
                        <span className="font-medium text-red-400">
                          {error.category_name}
                        </span>
                      </>
                    )
                  }

              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="descritpion" value="Your description" />
              </div>
              <Textarea
                 id="description" 
                 value={values.description} 
                 onChange={handleChange}
                 className={`${
                    error?.description
                      ? "border-[1.5px] border-red-400 rounded-md"
                      : ""
                  } `}
                  helperText={
                    error?.description && (
                      <>
                        <span className="font-medium text-red-400">
                          {error.description}
                        </span>
                      </>
                    )
                  } 
               />
            </div>

            <div className="flex gap-5">
              <Button color="gray" onClick={() => {setOpenModal(false)}}>
                <IoIosArrowBack className="mr-2" />
                Back
              </Button>
              <Button color="failure" onClick={resetForm} className="w-sm">
                Cancel
              </Button>
              <Button type="submit" className="w-full">
                {loading ? (
                  <div>
                    <Spinner /> Saving
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
            </div>

          </form>
        </Modal.Body>
      </Modal>

      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message={'Created successfully'}
      />

      <DangerToast
        open={failToastOpen}
        onClose={() => setFailToastOpen(false)}
        message={`Something Went Wrong!"`}
      />
    </>
  );
}


export default Create;
