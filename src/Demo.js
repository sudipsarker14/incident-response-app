import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import React, { useState, useEffect, useRef } from 'react';

const Demo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
      const toast = useRef(null);
      const dt = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);

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
  }, []);  // Empty dependency array ensures this runs once when the component is mounted

  // Define columns for the DataTable
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Incidents</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
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

  // Handle loading or error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
     <div>
    <Toast ref={toast} />
    <div className='card'>
    <DataTable value={data} paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
     paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
      
        {columns.map((col, index) => (
          <Column key={index} field={col.field} 
          header={col.header}
          sortable={col.sortable}
           style={col.style} // Apply custom style (width) // Enable sorting
          />
        ))}
      </DataTable>
    </div>
    </div>
  );
};

export default Demo;
