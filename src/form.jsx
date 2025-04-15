
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateItems = () => {

const products = useLoaderData();

const {_id, name, origin,image_url, price, weight, stock, description} = products;

  const handleUpdateItem = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image_url = form.image_url.value;
    const weight = form.weight.value;
    const origin = form.origin.value;
    const price = form.price.value;
    const description = form.description.value;
    const stock = form.stock.value;
   

   const updateItem = {name, image_url, price, weight,  origin, stock, description}


   fetch(`https://parcel-management-server-sigma.vercel.app/items/${_id}`,{
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updateItem),
  }
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    if (data.modifiedCount > 0) {
      Swal.fire({
        title: "success",
        text: "Update successfully",
        icon: "success",
        confirmButtonText: "Cool",
      });
    }
  });

  }


    return (
        <div>
          <Helmet>
                <title>Fast Food || UpdateItems</title>
            </Helmet>
             <div className="grid justify-items-center my-10">
      <div className=" w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleUpdateItem} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Food Name</span>
            </label>
            <input name="name" defaultValue={name}
              type="text"
              placeholder="Food name"
              className="input input-bordered"
              
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input name="image_url" defaultValue={image_url}
              type="text"
              placeholder="Image"
              className="input input-bordered"
             
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Weight</span>
            </label>
            <input name="weight" defaultValue={weight}
              type="number"
              placeholder="weight"
              className="input input-bordered"
              
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Origin</span>
            </label>
            <input name="origin" defaultValue={origin}
              type="text"
              placeholder="Category Name"
              className="input input-bordered"
            
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input name="price" defaultValue={price}
              type="text"
              placeholder="Price"
              className="input input-bordered"
             
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Stock</span>
            </label>
            <input name="stock" defaultValue={stock}
              type="number"
              placeholder="Quantity"
              className="input input-bordered"
              
            />
          </div>
         
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input name="description" defaultValue={description}
              type="text"
              placeholder="Description"
              className="input input-bordered"
              
            />
          </div>

          <div className="form-control mt-6">
            <button  className="btn btn-primary">Update Product</button>
          </div>
        </form>
      </div>
    </div>
        </div>
    );
};

export default UpdateItems;