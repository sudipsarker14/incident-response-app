import React, { useState, useRef } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
function IncidentForm() {
    const navigate = useNavigate();
    const toast = useRef(null);
    const [incident, setIncident] = useState({
        incidentNo: '',
        dateOfIncident: '',
        reportingDate: '',
        natureOfIncident: '',
        placeOfIncident: '',
        briefDescription: '',
        actionsTaken: '',
        incidentStatus: '',
        completionDate: '',
        respondedBy: '',
        initiatorResponsibleOfficer: '',
        impact: '',
        severity: '',
        stakeholders: '',
        actionsRequiredBy: '',
        remarks: '',
    });
    const today = new Date(); 
  today.setHours(0, 0, 0, 0); // Reset today to midnight 00:00:00
    const handleChange = (e) => {
        setIncident({
            ...incident,
            [e.target.name]: e.target.value
        })
    }
    const goToAboutPage = () => {
        navigate('/table');
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        

        if (incident.natureOfIncident === null || incident.natureOfIncident === '') {
            alert('incident.natureOfIncident IS NULL OR EMPTY');
        }
        else if (incident.incidentStatus === null || incident.incidentStatus === '') {
            alert('INCIDENT STATUS IS NULL OR EMPTY');
        }
        else if (incident.severity === null || incident.severity === '') {
            alert('SEVERITY STATUS IS NULL OR EMPTY');
        }
        else if (incident.actionsRequiredBy === null || incident.actionsRequiredBy === '') {
            alert('Actions Required By STATUS IS NULL OR EMPTY');
        }
        else {
            try {
                
                const response = await axios.post('http://localhost:8082/addIncident', incident);
                console.log(response.data);
               // goToAboutPage();
                alert("Incident added successfully");


            } catch (error) {
                console.log(error);
            }
        }
    }
    const nature_incidents = [
        { nature: 'IT Related Incident'},
        { nature: 'Manmade Incident' },
        { nature: 'Natural Calamities Incident' }, 
    ];
    const savarity_selection = [
        { nature: 'Low'},
        { nature: 'Medium' },
        { nature: 'High' }, 
        { nature: 'Extreme' }, 
    ];
    const incident_selection = [
        { nature: 'Open'},
        { nature: 'Close' },
    ];
    return (
        <div className="flex align-items-center justify-content-center">
        <form onSubmit={handleSubmit}>
            {/*         <label>Incident No:</label>
          <input type="text" name="incidentNo" value={incident.incidentNo} onChange={handleChange} />
*/}
            <h1>Incident Response Register</h1>
        <div class="formgrid grid">
        
        <div class="field col-12 md:col-4">
    <div className="card flex justify-content-center">
    <div className="flex flex-column gap-1">
   
                <label htmlFor="dateOfIncident" className="font-bold block mb-2">
                Date Of Incident:
                </label>
                <Calendar
        id="dateOfIncident"
        value={incident.dateOfIncident ? new Date(incident.dateOfIncident) : null}
        dateFormat="dd/mm/yy"
        onChange={(e) => {
          const date = e.value;
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();

          setIncident({
            ...incident,
            dateOfIncident: `${year}-${month}-${day}`,
          });
        }}
        showIcon required
        maxDate={new Date()}  />
            </div>
            </div>
            </div>
            <div class="field col-12 md:col-4">
    <div className="card flex justify-content-center">
    <div className="flex flex-column gap-2">
   
                <label htmlFor="reportingDate" className="font-bold block mb-2">
                Reporting Date:
                </label>
                <Calendar
        id="reportingDate"
        value={incident.reportingDate ? new Date(incident.reportingDate) : null}
        dateFormat="dd/mm/yy"
        onChange={(e) => {
          const date = e.value;
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();

          setIncident({
            ...incident,
            reportingDate: `${year}-${month}-${day}`,
          });
        }}
        showIcon required
        maxDate={new Date()}  />
            </div>
            </div>
            </div>
            <div class="field col-12 md:col-4">
    <div className="card flex justify-content-center">
    <div className="flex flex-column gap-3">
   
                <label htmlFor="completionDate" className="font-bold block mb-2">
                Completion Date:
                </label>
                <Calendar
        id="reportingDate"
        value={incident.completionDate ? new Date(incident.completionDate) : null}
        dateFormat="dd/mm/yy"
        onChange={(e) => {
          const date = e.value;
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();

          setIncident({
            ...incident,
            completionDate: `${year}-${month}-${day}`,
          });
        }}
        showIcon required
        maxDate={new Date()}  />
            </div>
            </div>
            </div>
        {/*
            <label>Nature of Incident:</label>
            <select name="natureOfIncident" value={incident.natureOfIncident} onChange={handleChange} >
                <option value="">Select</option>
                <option value="it">IT Related Incident</option>
                <option value="manmade">Manmade Incident</option>
                <option value="natural">Natural Calamities Incident</option>
            </select>
            */}
           
            <div class="field col-12 md:col-4">
<div className="card flex justify-content-center">
<div className="flex flex-column gap-1">
<label htmlFor="natureOfIncident">Nature of Incident:</label>
            <Dropdown value={incident.natureOfIncident || ''} 
            onChange={(e) => setIncident({ ...incident, natureOfIncident: e.target.value })} 
            required options={nature_incidents} optionLabel="nature" 
                placeholder="Select a Incident" className="w-full md:w-14rem"
                 checkmark={true} highlightOnSelect={false} />
                 <small id="natureOfIncident-help">
            Select the nature of incident where the incident happened.
        </small>
        </div>
        </div>
     </div>

     <div class="field col-12 md:col-4">
<div className="card flex justify-content-center">
<div className="flex flex-column gap-2">
<label htmlFor="incidentStatus">Incident Status:</label>
            <Dropdown value={incident.incidentStatus || ''} 
            onChange={(e) => setIncident({ ...incident, incidentStatus: e.target.value })} 
            required options={incident_selection} optionLabel="nature" 
              className="w-full md:w-14rem"
                 checkmark={true} highlightOnSelect={false} />
                 <small id="incidentStatus-help">
            Select the incident status.
        </small>
        </div>
        </div>
     </div>

   
     <div class="field col-12 md:col-4">
     <div className="card flex justify-content-center">
<div className="flex flex-column gap-3">
<label htmlFor="severity">Severity:</label>
            <Dropdown value={incident.severity || ''} 
            onChange={(e) => setIncident({ ...incident, severity: e.target.value })} 
            required options={savarity_selection} optionLabel="nature" 
                className="w-full md:w-14rem"
                 checkmark={true} highlightOnSelect={false} />
                 <small id="severity-help">
            Select the severity of the incident.
        </small>
        </div>
     </div>
            </div>
          
           
    <div class="field col-12 md:col-6">
    <div className="card flex justify-content-center">
    <div className="flex flex-column gap-2">
        <label htmlFor="placeOfIncident">Place of Incident</label>
        <InputText
            id="placeOfIncident"
            value={incident.placeOfIncident || ''}
            placeholder="Enter the place of incident"
            onChange={(e) => setIncident({ ...incident, placeOfIncident: e.target.value })}
            required
        />
        <small id="placeOfIncident-help">
            Enter the place where the incident happened.
        </small>
    </div>
</div>
            </div>
         
            <div class="field col-12 md:col-6">
    <div className="card flex justify-content-center">
    <div className="flex flex-column gap-1">
        <label htmlFor="briefDescription">Brief Description:</label>
        <InputTextarea autoResize
            id="placeOfIncident"
            value={incident.briefDescription || ''}
            placeholder="Enter the brief description of incident"
            onChange={(e) => setIncident({ ...incident, briefDescription: e.target.value })}
            required
        />
        <small id="briefDescription-help">
            Enter the brief description of incident happened.
        </small>
    </div>
</div>
            </div>
            <div class="field col-12 md:col-6">
    <div className="card flex justify-content-center">
    <div className="flex flex-column gap-2">
        <label htmlFor="briefDescription">Actions Taken:</label>
        <InputTextarea autoResize
            id="actionsTaken"
            value={incident.actionsTaken || ''}

            onChange={(e) => setIncident({ ...incident, actionsTaken: e.target.value })}
            required
        />
        <small id="actionsTaken-help">
            Enter the actions taken during incident happened.
        </small>
    </div>
</div>
            </div>
        
        
            <div className="card flex justify-content-center">
                <label>Responded By:
                    <InputText
                        value={incident.respondedBy || ''}
                        placeholder="Enter Responder name"
                        onChange={(e) => setIncident({ ...incident, respondedBy: e.target.value })}
                        required
                    /> </label>
                    </div>
                    <div className="card flex justify-content-center">
                <label>Initiator:
                    <InputText
                        value={incident.initiator || ''}
                        placeholder="Enter Initiator Name"
                        onChange={(e) => setIncident({ ...incident, initiator: e.target.value })}
                        required
                    /> </label>
                    </div>

                    <div className="card flex justify-content-center">
                <label>Responsible Officer:
                    <InputText
                        value={incident.initiator || ''}
                        placeholder="Enter Responsible officer name"
                        onChange={(e) => setIncident({ ...incident, responsibleOfficer: e.target.value })}
                        required
                    /> </label>
                    </div>

                    <div className="card flex justify-content-center">
                <label>Impact:
                    <InputText
                        value={incident.impact || ''}
                        placeholder="Enter Responsible officer name"
                        onChange={(e) => setIncident({ ...incident, impact: e.target.value })}
                        required
                    /> </label>
                    </div>

            <div className="card flex justify-content-center">
                <label>Stakeholders:
                    <InputText
                        value={incident.stakeholders || ''}
                        placeholder="Enter stake holders names"
                        onChange={(e) => setIncident({ ...incident, stakeholders: e.target.value })}
                        required
                    /> </label>
                    </div>

            <label>Actions Required By:</label>
            <select name="actionsRequiredBy" value={incident.actionsRequiredBy} onChange={handleChange} >
                <option value="">Select</option>
                <option value="branch_manager">Branch Manager</option>
                <option value="po_head">PO Head</option>
                <option value="gmo_head">GMO Head</option>
            </select>
            <div className="card flex justify-content-center">
            <label>Remarks:</label>
            <InputTextarea autoResize value={incident.remarks || ''} 
            onChange={(e) => setIncident({...incident, remarks: e.target.value })} rows={5} cols={30} />
        </div>
            <button type="submit">Submit</button>
            </div>
        </form>
        </div>
    );
}

export default IncidentForm;
