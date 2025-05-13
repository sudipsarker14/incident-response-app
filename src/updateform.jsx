import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from "primereact/toolbar";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { InputTextarea } from 'primereact/inputtextarea';
const UpdateForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();  // Retrieve the incident ID from the URL
    const [incident, setIncident] = useState({});
    const toast = useRef(null);
const [submitted, setSubmitted] = useState(false);
    // Fetch incident data by incidentNo (id)
    useEffect(() => {
        axios.get(`http://localhost:8082/deshboard/${id}`)
            .then(response => {
                setIncident(response.data);  // Set the data for the incident
            })
            .catch(error => {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to fetch incident data',
                    life: 3000,
                });
            });
    }, [id]);  // Fetch incident data when `id` changes

    // Handle the form submission for updating the incident
    const updateIncident = async () => {
         setSubmitted(true);
        try {
            const response = await axios.patch(
                `http://localhost:8082/deshboard/${incident.incidentNo}`,
                incident
            );

            if (response.status === 200) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Update Successful',
                    detail: 'Incident Updated',
                    life: 3000,
                });
                setTimeout(() => {

                    navigate(`/table`);

                }, 3000);
            }
        } catch (error) {
            console.error('Error updating incident:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update incident',
                life: 3000,
            });
        }
    };
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

        <div>
            <Toolbar className="custom-toolbar" left={<h2> Update Incident </h2>} />
            <Toast ref={toast} />
            <div class="formgrid grid">
                <div class="field col-12 md:col-4">
                                        <div className="card flex justify-content-center">
                                            <div className="flex flex-column gap-2">
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
                                                    placeholder='Enter the date of Incident'
                                                    showIcon
                                                    maxDate={new Date()}
                                                    className={submitted && !incident.dateOfIncident ? 'p-invalid' : ''} required
                                                />
                                                <small id="dateOfIncident-help">
                                                    Date of the Incident occurred.
                                                </small>
                                                {submitted && !incident.dateOfIncident && (
                                                    <Message severity="error" text="Date of Incident is required" />
                                                )}
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
                                                    placeholder='Enter the date of Reporting'
                                                    showIcon
                                                    maxDate={new Date()}
                                                    minDate={incident.dateOfIncident ? new Date(incident.dateOfIncident) : null}
                                                    disabled={!incident.dateOfIncident}
                                                    className={submitted && !incident.reportingDate ? 'p-invalid' : ''} required
                                                />
                                                <small id="reportingDate-help">
                                                    Date of the Incident reporting.
                                                </small>
                                                {submitted && !incident.reportingDate && (
                                                    <Message severity="error" text="Reporting Date is required" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                
                                    <div class="field col-12 md:col-4">
                                        <div className="card flex justify-content-center">
                                            <div className="flex flex-column gap-2">
                                                <label htmlFor="natureOfIncident" className="font-bold block mb-2">Nature of Incident:</label>
                                                <Dropdown value={incident.natureOfIncident || ''}
                
                                                    onChange={(e) => setIncident({ ...incident, natureOfIncident: e.value })}
                                                    options={nature_incidents} optionLabel="nature" optionValue="nature"
                                                    checkmark={true} highlightOnSelect={false}
                                                    className="w-full md:w-18rem ${submitted && !incident.natureOfIncident ? 'p-invalid' : ''}"
                                                    placeholder='Select the nature of incident.'
                                                    required
                                                />
                                                {submitted && !incident.natureOfIncident && (
                                                    <Message severity="error" text="Nature of Incident is required" />
                                                )}
                
                                                <small id="natureOfIncident-help">
                                                    What type of Incident occurred
                                                </small>
                
                                            </div>
                                        </div>
                                    </div>
                
                                    <div class="field col-12 md:col-4">
                                        <div className="card flex justify-content-center">
                                            <div className="flex flex-column gap-3">
                                                <label htmlFor="placeOfIncident" className="font-bold block mb-2">Place of Incident</label>
                                                <InputText keyfilter="alpha"
                                                    id="placeOfIncident"
                                                    value={incident.placeOfIncident || ''}
                                                    onChange={(e) => setIncident({ ...incident, placeOfIncident: e.target.value })}
                                                    className={submitted && !incident.placeOfIncident ? 'p-invalid' : ''}
                                                    required placeholder='Enter the place of incident'
                                                />
                                                {submitted && !incident.placeOfIncident && (
                                                    <Message severity="error" text="Place of Incident is required" />
                                                )}
                                                <small id="placeOfIncident-help">
                                                   Exact location where the incident happened.
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                
                                    <div class="field col-12 md:col-4">
                                        <div className="card flex justify-content-center">
                                            <div className="flex flex-column gap-2">
                                                <label htmlFor="briefDescription" className="font-bold block mb-2">Description:</label>
                                                <InputTextarea autoResize keyfilter="alpha"
                                                    id="briefDescription"
                                                    value={incident.briefDescription || ''}
                                                    onChange={(e) => setIncident({ ...incident, briefDescription: e.target.value })}
                                                    className={"w-full md:w-18rem $submitted && !incident.briefDescription ? 'p-invalid' : ''"}
                                                    required placeholder='Enter the description of incident happened.'
                                                />
                                                {submitted && !incident.briefDescription && (
                                                    <Message severity="error" text="Description is required" />
                                                )}
                
                                                <small id="briefDescription-help">
                                                   Brief the description of incident happened.
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                               <div className="field col-12 md:col-4">
                    <div className="card flex justify-content-center" style={{ padding: '1rem' }}>
                        <div className="flex flex-column gap-2 w-full md:w-18rem mx-auto">
                            <label htmlFor="actionsTaken" className="font-bold block mb-2">Actions Taken:</label>
                            <InputTextarea
                                autoResize
                                keyfilter="alpha"
                                id="actionsTaken"
                                value={incident.actionsTaken || ''}
                                onChange={(e) => setIncident({ ...incident, actionsTaken: e.target.value })}
                                className={`w-full ${submitted && !incident.actionsTaken ? 'p-invalid' : ''}`}
                                required
                                placeholder="Enter what type of actions taken by victim"
                            />
                            {submitted && !incident.actionsTaken && (
                                <Message severity="error" text="Actions Taken is required" />
                            )}
                            <small id="actionsTaken-help">
                                What type of actions taken by victim eg. notify police station, local administrative officer etc. 
                            </small>
                        </div>
                    </div>
                </div>
                                    <div className="field col-12 md:col-4">
                    <div className="card flex justify-content-center" style={{ padding: '1rem' }}>
                        <div className="flex flex-column gap-2 w-full md:w-18rem mx-auto">
                            <label htmlFor="incidentStatus" className="font-bold block mb-2">
                                Incident Status:
                            </label>
                            <Dropdown
                                value={incident.incidentStatus || ''}
                                onChange={(e) => {
                                    setIncident({ ...incident, incidentStatus: e.value });
                                    if (e.value !== 'Close') {
                                        setIncident((prev) => ({ ...prev, completionDate: '' }));
                                    }
                                }}
                                options={incident_selection}
                                optionLabel="nature"
                                optionValue="nature"
                                className={`w-full ${submitted && !incident.incidentStatus ? 'p-invalid' : ''}`}
                                required
                                placeholder="Select the incident status"
                                checkmark={true}
                                highlightOnSelect={false}
                            />
                            {submitted && !incident.incidentStatus && (
                                <Message severity="error" text="Incident Status is required" />
                            )}
                            <small id="incidentStatus-help">
                                Incident status will be open until Incident resolved.
                                If the Incident resolved then status will be close.
                            </small>
                        </div>
                    </div>
                </div>
                
                                    <div className="field col-12 md:col-4">
                                        <div className="card flex justify-content-center">
                                            <div className="flex flex-column gap-2">
                                                <label htmlFor="completionDate" className="font-bold block mb-2">Completion Date:</label>
                                                <Calendar
                                                    id="completionDate"
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
                                                    showIcon
                                                    placeholder='Enter the date of Completion'
                                                    maxDate={new Date()}
                                                    minDate={incident.dateOfIncident ? new Date(incident.dateOfIncident) : null}
                                                    disabled={incident.incidentStatus !== 'Close'}
                                                    className={submitted && !incident.completionDate && incident.incidentStatus === 'Close' ? 'p-invalid' : ''}
                                                    required={incident.incidentStatus === 'Close'}
                                                />
                                                <small id="completionDate-help">Date of the Incident resolved.</small>
                
                                                {submitted && !incident.completionDate && incident.incidentStatus === 'Close' && (
                                                    <Message severity="error" text="Completion Date is required" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                
                                    <div class="field col-12 md:col-4">
                                        <div className="card flex justify-content-center">
                                            <div className="flex flex-column gap-2">
                                                <label htmlFor="initiator" className="font-bold block mb-2">Initiator:</label>
                                                <InputText keyfilter="alpha"
                                                    id="initiator"
                                                    value={incident.initiator || ''}
                                                    onChange={(e) => setIncident({ ...incident, initiator: e.target.value })}
                                                    className={"w-full md:w-18rem $submitted && !incident.initiator ? 'p-invalid' : ''"}
                                                    required placeholder='Enter the name of initiator.'
                                                />
                                                {submitted && !incident.initiator && (
                                                    <Message severity="error" text="Initiator is required" />
                                                )}
                                                <small id="initiator-help">
                                                    Initiator will be who creates the Incident reporting.
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                   
                
                <div className="field col-12 md:col-4">
                    <div className="card flex justify-content-center py-3 px-4">
                        <div className="flex flex-column gap-3 w-full md:w-18rem">
                            <label htmlFor="responsibleOfficer" className="font-bold block mb-2">Responsible Officer:</label>
                            <InputText
                                keyfilter="alpha"
                                id="responsibleOfficer"
                                value={incident.responsibleOfficer || ''}
                                onChange={(e) => setIncident({ ...incident, responsibleOfficer: e.target.value })}
                                className={`w-full ${submitted && !incident.responsibleOfficer ? 'p-invalid' : ''}`}
                                required
                                placeholder="Enter the name of Responsible Officer."
                            />
                            {submitted && !incident.responsibleOfficer && (
                                <Message severity="error" text="Responsible officer is required" />
                            )}
                            <small id="responsibleOfficer-help">
                                Responsible Officer will be employee who creates the Incident reporting.
                            </small>
                        </div>
                    </div>
                </div>
                
                <div className="field col-12 md:col-4">
                    <div className="card flex justify-content-center" style={{ padding: '1rem' }}>
                        <div className="flex flex-column gap-3 w-full md:w-18rem mx-auto">
                            <label htmlFor="impact" className="font-bold block mb-2">Impact:</label>
                            <InputText
                                keyfilter="alpha"
                                id="impact"
                                value={incident.impact || ''}
                                onChange={(e) => setIncident({ ...incident, impact: e.target.value })}
                                className={`w-full ${submitted && !incident.impact ? 'p-invalid' : ''}`}
                                required
                                placeholder="Enter the impact of incident."
                            />
                            {submitted && !incident.impact && (
                                <Message severity="error" text="Impact is required" />
                            )}
                            <small id="impact-help">
                                eg. financial loss, physical equipment damage, physical injury etc.
                            </small>
                        </div>
                    </div>
                </div>
                
                                    <div class="field col-12 md:col-4">
                                        <div className="card flex justify-content-center">
                                            <div className="flex flex-column gap-2">
                                                <label htmlFor="severity" className="font-bold block mb-2">Severity:</label>
                                                <Dropdown value={incident.severity || ''}
                                                    onChange={(e) => setIncident({ ...incident, severity: e.value })}
                                                    options={savarity_selection} optionLabel="nature" optionValue="nature"
                                                    className="w-full md:w-18rem ${submitted && !incident.severity ? 'p-invalid' : ''}"
                                                    required placeholder='Select the severity of incident'
                                                    checkmark={true} highlightOnSelect={false} />
                                                {submitted && !incident.severity && (
                                                    <Message severity="error" text="Severity is required" />
                                                )}
                                                   <small id="severity-help">
                                Severity will be low, medium, high and extreme.
                            </small>
                
                                            </div>
                                        </div>
                                    </div>
                
                                   <div className="field col-12 md:col-4">
                    <div className="card flex justify-content-center" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                        <div className="flex flex-column gap-2 w-full md:w-18rem mx-auto">
                            <label htmlFor="stakeholders" className="font-bold block mb-2">Stakeholders:</label>
                            <InputText
                                keyfilter="alpha"
                                id="stakeholders"
                                value={incident.stakeholders || ''}
                                placeholder='Enter the stake holders name'
                                onChange={(e) => setIncident({ ...incident, stakeholders: e.target.value })}
                                className={`w-full ${submitted && !incident.stakeholders ? 'p-invalid' : ''}`}
                                required
                            />
                            {submitted && !incident.stakeholders && (
                                <Message severity="error" text="Stake holders are required" />
                            )}
                            <small id="stakeholders-help">
                                eg. Customers, Bank Employees, Shareholders, Investors, Regulatory Authorities etc.
                            </small>
                        </div>
                    </div>
                </div>
                                    <div class="field col-12 md:col-4">
                                        <div className="card flex justify-content-center py-6">
                                            <div className="flex flex-column gap-2">
                                                <label htmlFor="actionsRequiredBy" className="font-bold block mb-2">Actions Required By:</label>
                                                <Dropdown value={incident.actionsRequiredBy || ''}
                                                    onChange={(e) => setIncident({ ...incident, actionsRequiredBy: e.value })}
                                                    options={actions_required_by} optionLabel="nature" optionValue="nature"
                                                    className="w-full md:w-18rem ${submitted && !incident.actionsRequiredBy ? 'p-invalid' : ''}"
                                                    checkmark={true} highlightOnSelect={false}
                                                    required placeholder='Enter who taken the actions'
                                                />
                                                {submitted && !incident.actionsRequiredBy && (
                                                    <Message severity="error" text="Actions is required" />
                                                )}
                                                <small id="actionsRequiredBy-help">
                                                    Who have taken the legal actions.
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                
                                    <div className="field col-12 md:col-4">
                    <div className="card flex justify-content-center px-4">
                        <div className="flex flex-column gap-2 w-full md:w-18rem mx-auto">
                            <label htmlFor="remarks" className="font-bold block mb-2">Remarks:</label>
                            <InputTextarea
                                autoResize
                                keyfilter="alpha"
                                id="remarks"
                                value={incident.remarks || ''}
                                onChange={(e) => setIncident({ ...incident, remarks: e.target.value })}
                                className={`w-full ${submitted && !incident.remarks ? 'p-invalid' : ''}`}
                                placeholder='Enter the remarks'
                                required
                            />
                            {submitted && !incident.remarks && (
                                <Message severity="error" text="Remarks are required" />
                            )}
                            <small id="remarks-help" className="text-justify">
                                Incident related remarks by victimization and who resolved the Incident.
                            </small>
                        </div>
                    </div>
                </div>
                <div class="field col-12 md:col-6">
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column gap-2">
                            <Button label="Update Incident" icon="pi pi-check" onClick={updateIncident} />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default UpdateForm;