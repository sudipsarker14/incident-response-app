import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { data } from 'react-router-dom';


const Table = () => {
    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    const [products, setProducts] = useState([])
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedIncidents, setSelectedIncidents] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [first, setFirst] = useState([]);

    const [data, setData] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [posts, setPosts] = useState([]);


  // Fetching data from API using Axios
  useEffect(() => {
    axios.get('http://localhost:8082/deshboard')  // Replace with your API URL
      .then(response => {
        setData(response.data);  // Set your API response to the state
        setLoading(false);        // Set loading to false once data is fetched
      })
      .catch(err => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, [dataRefresh]);  // Empty dependency array ensures this runs once when the component is mounted

    /*
    useEffect(() => {
        // Fetch data from the backend (replace URL with actual API endpoint)
        axios.get('https://api.example.com/incidents')
            .then(response => {
                setProducts(response.data); // Set fetched data into products state
                setLoading(false); // Hide loading spinner after data is loaded
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false); // Hide loading spinner even on error
            });
    }, []);*/
   /* useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []);
*/
    /*
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
*/

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };
/*
    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };
*/
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };
/*
    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = {...product };

            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };
*/

    const editProduct = (product) => {
        setProduct({...product});
        setProductDialog(true);
    };
    const confirmDeleteProduct = (product) => {
        console.log("DELETE....",product.incidentNo);
        setProduct(product);
        setDeleteProductDialog(true);
    };
/*
    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);

        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };*/
    const deleteProduct = async (dataKey) => {
        console.log("DELETE....",product.incidentNo);
        var deleteProductId = product.incidentNo;
        try {
            
            const response = await fetch("http://localhost:8082/deshboard/"+deleteProductId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
    
            // Update the local state after the API call is successful
            let _products = products.filter((val) => val.id !== product.id);
            setProducts(_products);
            setDeleteProductDialog(false);
            setProduct(emptyProduct);
    
            // Show success toast
            toast.current.show({
                severity: 'success',
                summary: 'Successful',
                detail: 'Product Deleted',
                life: 3000,
            });
            setDataRefresh(!dataRefresh);
        } catch (error) {
            // Show error toast if API call fails
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete product',
                life: 3000,
            });
        } // Make an API call to delete the product
           
    };
    
/*
    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };
*/
    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      };
/*
    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };
*/
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
       setDeleteProductsDialog(true);
       // deleteSelectedIncident(selectedIncidents);
    };
   /* 
    // Delete selected product
    const deleteSelectedIncidents = () => {
        let _products = products.filter((val) => !selectedIncidents.includes(val));

        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedIncidents(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };
*/const deleteSelectedIncident = async (product) => {
    try {
        // Ensure product and product.selectId are not null or undefined
        const incidentId = product.selectId;
        
        if (!incidentId) {
            toast.current.show({ severity: 'warn', summary: 'No selection', detail: 'No incident selected for deletion', life: 3000 });
            return;
        }

        // Correctly interpolate the id into the URL
        const response = await fetch(`http://localhost:8082/deshboard/${incidentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete incident with ID: ${incidentId}`);
        }

        // Filter the deleted incident out of the products state
        let _products = products.filter((val) => val.id !== incidentId);
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedIncidents(null);

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Incident Deleted', life: 3000 });
    } catch (error) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
    }
};



/*
    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };
    */
    // New & Delete button
    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedIncidents || !selectedIncidents.length} />
            </div>
        );
    };
    // Export button
    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };
/*
    const imageBodyTemplate = (rowData) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };
*/
    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };
// Delete & edit button
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
                
            </React.Fragment>
        );
    };

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Incidents</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
    /*
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );*/
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick= {hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick= {deleteSelectedIncident} />
        </React.Fragment>
    );
    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
      };

   
      const columns = [
        {
          field: 'incidentNo', // Use the correct data key
          header: 'ID', // The column header
          sortable: true,
          style: { width: '200px' }
        },
        {
          field: 'dateOfIncident',
          header: 'Date of Incident', // The column header
          sortable: true, // Enable sorting
        },
        {
          field: 'natureOfIncident',
          header: 'Nature of Incident', // The column header
          sortable: true, // Enable sorting
        },
        {
          field: 'placeOfIncident',
          header: 'Place of Incident', // The column header
          sortable: true, // Enable sorting
        },
        {
          field: 'actionsTaken',
          header: 'Actions Taken', // The column header
          sortable: true, // Enable sorting
        },
        {
          field: 'incidentStatus',
          header: 'Status', // The column header
          sortable: true, // Enable sorting
        },
        {
          field: 'completionDate',
          header: 'Completion Date', // The column header
          sortable: true, // Enable sorting
        },
        {
          field: 'respondedBy',
          header: 'Responded By', // The column header
          sortable: true, // Enable sorting
        },
        {
          field: 'initiator',
          header: 'Initiator', // The column header
          sortable: true, // Enable sorting
        },
        {
          field: 'ResponsibleOfficer',
          header: 'Responsible Officer', // The column header
          sortable: true, // Enable sorting
        },
        {
          field: 'impact',
          header: 'Impact', // The column header
          sortable: true, // Enable sorting
        },
        {
          field: 'severity',
          header: 'Severity', // The column header
          sortable: true, // Enable sorting
        },
        {
          field: 'stakeholders',
          header: 'Stake Holders', // The column header
          sortable: true, // Enable sorting
        },
        {
          field: 'actionsRequiredBy',
          header: 'Actions Required By', // The column header
          sortable: true, // Enable sorting
        },
        {
          field: 'remarks',
          header: 'Remarks', // The column header
          sortable: true, // Enable sorting
        },
        // Add more columns as needed
      ];
      
    return (
        
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                 <DataTable value={data} selection={selectedIncidents} onSelectionChange={(e) => setSelectedIncidents(e.value)} dataKey={'incidentNo'}
                  paginator rows={10} rowsPerPageOptions={[5, 10, 25]} 
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    {columns.map((col, index) => (
                              <Column key={index} field={col.field} 
                              header={col.header}
                              sortable={col.sortable}
                               style={col.style} // Apply custom style (width) // Enable sorting
                              />
                            ))}                 
                 
                   {/*
                    <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="category" header="Category" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    */}
                    {/* Edit & Delete button*/}
                  <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column> 
                </DataTable>
            </div>
{/*
            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
                    </div>
                </div>
            </Dialog>
*/}
            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default Table;
        