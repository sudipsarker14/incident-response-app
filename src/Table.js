import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { MultiSelect } from 'primereact/multiselect';

const Table = () => {

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
          field: 'initiator',
          header: 'Initiator', // The column header
          sortable: true, // Enable sorting
        },
        {
          field: 'responsibleOfficer',
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
    
    const navigate = useNavigate();
    const [products, setProducts] = useState([])
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [incident, setProduct] = useState();
    const [selectedIncidents, setSelectedIncidents] = useState(null);
    const [dataRefresh, setDataRefresh] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    
    const toast = useRef(null);
    const dt = useRef(null);
    
    const [visibleColumns, setVisibleColumns] = useState(columns);
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


    const openNew = () => {
        navigate('/incident');
    };
    

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

  /*  const editProduct = (incident) => {
        setProduct({...incident});
        setProductDialog(true);
    };*/

    const confirmDeleteProduct = (incident) => {
        console.log("DELETE....",incident.incidentNo);
        setProduct(incident);
        setDeleteProductDialog(true);
    };
    const onColumnToggle = (event) => {
        const selectedColumns = event.value;
        const orderedSelectedColumns = columns.filter(col => selectedColumns.some(sCol => sCol.field === col.field));
        setVisibleColumns(orderedSelectedColumns);
    };
    const deleteProduct = async () => {
        console.log("DELETE....",incident.incidentNo);
        var deleteProductId = incident.incidentNo;
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
            let _products = products.filter((val) => val.id !== incident.id);
            setProducts(_products);
            setDeleteProductDialog(false);
    
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
    

    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
       setDeleteProductsDialog(true);
       // deleteSelectedIncident(selectedIncidents);
    };
     
const deleteSelectedIncident = async () => {           
    try {                                               
        const idsToDelete = selectedIncidents?.map(item => item.incidentNo);

        if (!idsToDelete || !idsToDelete.length) {      
            toast.current.show({                       
                severity: 'warn',
                summary: 'No Selection',
                detail: 'Please select at least one incident to delete.',
                life: 2000,
            });                                         
            return;
        }                                              

        const response = await fetch('http://localhost:8082/deshboard/delete-multiple', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(idsToDelete),
        });

        if (response.ok) {                              
            toast.current.show({                        
                severity: 'success',
                summary: 'Deleted',
                detail: 'Selected incidents deleted successfully.',
                life: 2000,
            });            
            setDataRefresh(!dataRefresh);      
             setDeleteProductsDialog(false);                      

        } else {                                        
            throw new Error('Failed to delete incidents');
        }                                               
    } catch (error) {                                   
        toast.current.show({                            
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Something went wrong!',
            life: 2000,
        });                                             
    }                                                   
};                                                      



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

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };
// Delete & edit button
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
             {/*   <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />*/}
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
                
            </React.Fragment>
        );
    };

    const getSeverity = (incident) => {
        switch (incident.inventoryStatus) {
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
            <MultiSelect
            value={visibleColumns}
            options={columns}
            optionLabel="header"
            onChange={onColumnToggle}
            className="w-full sm:w-20rem"
            display="chip"
        />
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
 
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

   
     
      
    return (
        
        <div>
            <Toolbar className="custom-toolbar" left={<h2> Incident Response Register </h2>} />
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                 <DataTable value={data} columnResizeMode="expand" resizableColumns showGridlines tableStyle={{ minWidth: '50rem' }}
                  selection={selectedIncidents} onSelectionChange={(e) => setSelectedIncidents(e.value)} dataKey={'incidentNo'}
                  paginator rows={10} rowsPerPageOptions={[5, 10, 25]} 
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    {visibleColumns.map((col, index) => (
                              <Column key={index} field={col.field} 
                              header={col.header}
                              sortable={col.sortable}
                               style={col.style} // Apply custom style (width) // Enable sorting
                              />
                            ))}                 
            
                    {/* Edit & Delete button*/}
                  <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column> 
                </DataTable>
            </div>
            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {incident && (
                        <span>
                            Are you sure you want to delete <b>{incident.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {incident && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default Table;
        