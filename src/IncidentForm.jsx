import React, { useState, useRef } from 'react';
import axios from "axios";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from "primereact/toolbar";
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
        initiator: '',
        responsibleOfficer: '',
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

    const accept = () => {
        toast.current.show({ 
            severity: 'info', 
            summary: 'Confirmed', 
            detail: 'You have accepted', 
            life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
    const confirm1 = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: handleSubmit,
            accept,
            reject
        });
    };

    const confirm2 = () => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
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
        { nature: 'IT Related Incident' },
        { nature: 'Manmade Incident' },
        { nature: 'Natural Calamities Incident' },
    ];
    const savarity_selection = [
        { nature: 'Low' },
        { nature: 'Medium' },
        { nature: 'High' },
        { nature: 'Extreme' },
    ];
    const incident_selection = [
        { nature: 'Open' },
        { nature: 'Close' },
    ];
    const actions_required_by = [
        { nature: 'Branch Manager' },
        { nature: 'PO Head' },
        { nature: 'GMO Head' },
    ];
    return (

        <form onSubmit={handleSubmit}>

           <Toolbar className="custom-toolbar" left={<h1> Incident Response Register </h1>} />
   
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
                                maxDate={new Date()} />
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
                                maxDate={new Date()} />
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
                                maxDate={new Date()} />
                        </div>
                    </div>
                </div>

                <div class="field col-12 md:col-4">
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column gap-1">
                            <label htmlFor="natureOfIncident" className="font-bold block mb-2">Nature of Incident:</label>
                            <Dropdown value={incident.natureOfIncident || ''}
                                onChange={(e) => setIncident({ ...incident, natureOfIncident: e.value })}
                                required options={nature_incidents} optionLabel="nature" optionValue="nature"
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
                            <label htmlFor="incidentStatus" className="font-bold block mb-2">Incident Status:</label>
                            <Dropdown value={incident.incidentStatus || ''}
                                onChange={(e) => setIncident({ ...incident, incidentStatus: e.value })}
                                required options={incident_selection} optionLabel="nature" optionValue="nature"
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
                            <label htmlFor="severity" className="font-bold block mb-2">Severity:</label>
                            <Dropdown value={incident.severity || ''}
                                onChange={(e) => setIncident({ ...incident, severity: e.value })}
                                required options={savarity_selection} optionLabel="nature" optionValue="nature"
                                className="w-full md:w-14rem"
                                checkmark={true} highlightOnSelect={false} />
                            <small id="severity-help">
                                Select the severity of the incident.
                            </small>
                        </div>
                    </div>
                </div>


                <div class="field col-12 md:col-4">
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="placeOfIncident" className="font-bold block mb-2">Place of Incident</label>
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

                <div class="field col-12 md:col-4">
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column gap-1">
                            <label htmlFor="briefDescription" className="font-bold block mb-2">Brief Description:</label>
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
                <div class="field col-12 md:col-4">
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="actionsTaken" className="font-bold block mb-2">Actions Taken:</label>
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

                <div class="field col-12 md:col-4">
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="initiator" className="font-bold block mb-2">Initiator:</label>
                            <InputText
                                id="initiator"
                                value={incident.initiator || ''}
                                onChange={(e) => setIncident({ ...incident, initiator: e.target.value })}
                                required
                            />
                            <small id="initiator-help">
                                Enter the initiator.
                            </small>
                        </div>
                    </div>
                </div>
                <div class="field col-12 md:col-4">
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="initiator" className="font-bold block mb-2">Responsible Officer:</label>
                            <InputText
                                id="responsibleOfficer"
                                value={incident.responsibleOfficer || ''}

                                onChange={(e) => setIncident({ ...incident, responsibleOfficer: e.target.value })}
                                required
                            />
                            <small id="responsibleOfficer-help">
                                Enter the responsibleOfficer.
                            </small>
                        </div>
                    </div>
                </div>


                <div class="field col-12 md:col-4">
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column gap-3">
                            <label htmlFor="actionsRequiredBy" className="font-bold block mb-2">Actions Required By:</label>
                            <Dropdown value={incident.actionsRequiredBy || ''}
                                onChange={(e) => setIncident({ ...incident, actionsRequiredBy: e.value })}
                                required options={actions_required_by} optionLabel="nature" optionValue="nature"
                                className="w-full md:w-14rem"
                                checkmark={true} highlightOnSelect={false} />
                            <small id="actionsRequiredBy-help">
                                Select the actionsRequiredBy of the incident.
                            </small>
                        </div>
                    </div>
                </div>

                <div class="field col-12 md:col-4">
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="impact" className="font-bold block mb-2">Impact:</label>
                            <InputText
                                id="impact"
                                value={incident.impact || ''}
                                placeholder="Enter the impact of incident"
                                onChange={(e) => setIncident({ ...incident, impact: e.target.value })}
                                required
                            />
                            <small id="impact-help">
                                Enter the place where the incident happened.
                            </small>
                        </div>
                    </div>
                </div>
                <div class="field col-12 md:col-4">
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="stakeholders" className="font-bold block mb-2">Stakeholders:</label>
                            <InputText
                                id="stakeholders"
                                value={incident.stakeholders || ''}
                                placeholder="Enter the stakeholders of incident"
                                onChange={(e) => setIncident({ ...incident, stakeholders: e.target.value })}
                                required
                            />
                            <small id="impact-help">
                                Enter the stakeholders where the incident happened.
                            </small>
                        </div>
                    </div>
                </div>
                <div class="field col-12 md:col-4">
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="remarks" className="font-bold block mb-2">Remarks:</label>
                            <InputTextarea autoResize
                                id="remarks"
                                value={incident.remarks || ''}
                                placeholder="Enter the remarks of incident"
                                onChange={(e) => setIncident({ ...incident, remarks: e.target.value })}
                                required
                            />
                            <small id="remarks-help">
                                Enter the stakeholders where the incident happened.
                            </small>
                        </div>
                    </div>
                </div>
                <Toast ref={toast} />
                <ConfirmDialog />
                <div class="field col-12 md:col-12">
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column">
                            <ButtonGroup>
                                <Button label="Save" onClick={confirm1} icon="pi pi-check" />
                                <Button label="Cancel" icon="pi pi-times" />
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default IncidentForm;
