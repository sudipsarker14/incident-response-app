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
        console.log(incident);

    try {
        const response = await axios.post('http://localhost:8082/addUser', incident);
        console.log(response.data);
        alert("Incident added successfully");

    } catch (error) {
        console.log(error);
    }
}
    return (
        <form onSubmit={handleSubmit}>
            <label>Incident No:</label>
            <input type="text" name="incidentNo" value={incident.incidentNo} onChange={handleChange} />

            <label>Date Of Incident:</label>
            <input type="date" name="dateOfIncident" value={incident.dateOfIncident} onChange={handleChange} />

            <label>Reporting Date:</label>
            <input type="date" name="reportingDate" value={incident.reportingDate} onChange={handleChange} />

            <label>Nature of Incident:</label>
            <select name="natureOfIncident" value={incident.natureOfIncident} onChange={handleChange}>
                <option value="it">IT Related Incident</option>
                <option value="manmade">Manmade Incident</option>
                <option value="natural">Natural Calamities Incident</option>
            </select>
            <label>Place of Incident:</label>
            <input type="text" name="placeOfIncident" value={incident.placeOfIncident} onChange={handleChange} />

            <label>Brief Description:</label>
            <textarea name="briefDescription" value={incident.briefDescription} onChange={handleChange} />

            <label>Actions Taken:</label>
            <textarea name="actionsTaken" value={incident.actionsTaken} onChange={handleChange} />

            <label>Incident Status:</label>
            <select name="incidentStatus" value={incident.incidentStatus} onChange={handleChange}>
                <option value="open">Open</option>
                <option value="close">Close</option>
            </select>

            <label>Completion Date:</label>
            <input type="date" name="completionDate" value={incident.completionDate} onChange={handleChange} />

            <label>Responded By:</label>
            <input type="text" name="respondedBy" value={incident.respondedBy} onChange={handleChange} />

            <label>Initiator:</label>
            <input type="text" name="initiator" value={incident.initiator} onChange={handleChange} />

            <label>Responsible Officer:</label>
            <input type="text" name="responsibleOfficer" value={incident.responsibleOfficer} onChange={handleChange} />


            <label>Impact:</label>
            <input type="text" name="impact" value={incident.impact} onChange={handleChange} />

            <label>Severity:</label>
            <select name="severity" value={incident.severity} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="extreme">Extreme</option>
            </select>

            <label>Stakeholders:</label>
            <input type="text" name="stakeholders" value={incident.stakeholders} onChange={handleChange} />

            <label>Actions Required By:</label>
            <select name="actionsRequiredBy" value={incident.actionsRequiredBy} onChange={handleChange}>
                <option value="branch_manager">Branch Manager</option>
                <option value="po_head">PO Head</option>
                <option value="gmo_head">GMO Head</option>
            </select>
           
            <label>Remarks:</label>
            <textarea name="remarks" value={incident.remarks} onChange={handleChange} />

            <label>Signature with Name & Designation:</label>
            <input type="text" name="signatureWithNameDesignation" value={incident.signatureWithNameDesignation} onChange={handleChange} />

            <button type="submit">Submit</button>
        </form>
    );
}

export default IncidentForm;
