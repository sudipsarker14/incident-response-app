import React, { useState } from 'react';
import axios from "axios";


function IncidentForm() {

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

    const handleChange = (e) => {
        setIncident({
            ...incident,
            [e.target.name]: e.target.value
        })
    }

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
                alert("Incident added successfully");

            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {/*         <label>Incident No:</label>
          <input type="text" name="incidentNo" value={incident.incidentNo} onChange={handleChange} />
*/}
            <h1>Incident Response Register</h1>
            <label>Date Of Incident:</label>
            <input type="date" name="dateOfIncident" value={incident.dateOfIncident} onChange={handleChange} required />

            <label>Reporting Date:</label>
            <input type="date" name="reportingDate" value={incident.reportingDate} onChange={handleChange} required />

            <label>Nature of Incident:</label>
            <select name="natureOfIncident" value={incident.natureOfIncident} onChange={handleChange} >
                <option value="">Select</option>
                <option value="it">IT Related Incident</option>
                <option value="manmade">Manmade Incident</option>
                <option value="natural">Natural Calamities Incident</option>
            </select>
            <label>Place of Incident:</label>
            <input type="text" name="placeOfIncident" placeholder="Enter the place of incident" value={incident.placeOfIncident} onChange={handleChange} required />

            <label>Brief Description:</label>
            <textarea name="briefDescription" placeholder="Enter the description of incident" value={incident.briefDescription} onChange={handleChange} required />

            <label>Actions Taken:</label>
            <textarea name="actionsTaken" placeholder="Actions taken" value={incident.actionsTaken} onChange={handleChange} required />

            <label>Incident Status:</label>
            <select name="incidentStatus" value={incident.incidentStatus} onChange={handleChange}>
                <option value="">Select</option>
                <option value="open">Open</option>
                <option value="close">Close</option>
            </select>

            <label>Completion Date:</label>
            <input type="date" name="completionDate" value={incident.completionDate} onChange={handleChange} required />

            <label>Responded By:</label>
            <input type="text" name="respondedBy" placeholder="Enter Responder name" value={incident.respondedBy} onChange={handleChange} required />

            <label>Initiator:</label>
            <input type="text" name="initiator" placeholder="Enter initiator name" value={incident.initiator} onChange={handleChange} required />

            <label>Responsible Officer:</label>
            <input type="text" name="responsibleOfficer" placeholder="Enter Responsible officer name" value={incident.responsibleOfficer} onChange={handleChange} required />


            <label>Impact:</label>
            <input type="text" name="impact" placeholder="Enter the impact of incident" value={incident.impact} onChange={handleChange} required />

            <label>Severity:</label>
            <select name="severity" value={incident.severity} onChange={handleChange}>
                <option value="">Select</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="extreme">Extreme</option>
            </select>

            <label>Stakeholders:</label>
            <input type="text" name="stakeholders" placeholder="Enter stake holders names" value={incident.stakeholders} onChange={handleChange} required />

            <label>Actions Required By:</label>
            <select name="actionsRequiredBy" value={incident.actionsRequiredBy} onChange={handleChange} >
                <option value="">Select</option>
                <option value="branch_manager">Branch Manager</option>
                <option value="po_head">PO Head</option>
                <option value="gmo_head">GMO Head</option>
            </select>

            <label>Remarks:</label>
            <textarea name="remarks" placeholder="Enter Remarks" value={incident.remarks} onChange={handleChange} required />
            <button type="submit">Submit</button>

        </form>       
    );
}

export default IncidentForm;
