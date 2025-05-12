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

import { InputTextarea } from 'primereact/inputtextarea';
const UpdateForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();  // Retrieve the incident ID from the URL
    const [incident, setIncident] = useState({});
    const toast = useRef(null);

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
                        <div className="flex flex-column gap-1">

                            <label htmlFor="incidentNo">Incident ID</label>
                            <InputText id="incidentNo" value={incident.incidentNo} disabled />
                        </div>
                    </div>
                </div>
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
                                showIcon
                                required
                                maxDate={new Date()}
                                minDate={incident.dateOfIncident ? new Date(incident.dateOfIncident) : null}
                                disabled={!incident.dateOfIncident}
                            />

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
                                required
                                maxDate={new Date()}
                                minDate={incident.dateOfIncident ? new Date(incident.dateOfIncident) : null}
                                disabled={!incident.dateOfIncident}
                            />
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
                                className="w-full md:w-14rem"
                                checkmark={true} highlightOnSelect={false} />
                            <small id="natureOfIncident-help">
                                Select the nature of incident.
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
                            <InputText keyfilter="alpha"
                                id="placeOfIncident"
                                value={incident.placeOfIncident || ''}
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
                            <InputTextarea autoResize keyfilter="alpha"
                                id="placeOfIncident"
                                value={incident.briefDescription || ''}
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
                            <InputTextarea autoResize keyfilter="alpha"
                                id="actionsTaken"
                                value={incident.actionsTaken || ''}
                                onChange={(e) => setIncident({ ...incident, actionsTaken: e.target.value })}
                                required
                            />
                            <small id="actionsTaken-help">
                                Enter the actions taken during incident.
                            </small>
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
                                required
                            />
                            <small id="initiator-help">
                                Enter the name of initiator.
                            </small>
                        </div>
                    </div>
                </div>
                <div class="field col-12 md:col-4">
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="initiator" className="font-bold block mb-2">Responsible Officer:</label>
                            <InputText keyfilter="alpha"
                                id="responsibleOfficer"
                                value={incident.responsibleOfficer || ''}
                                onChange={(e) => setIncident({ ...incident, responsibleOfficer: e.target.value })}
                                required
                            />
                            <small id="responsibleOfficer-help">
                                Enter the name of Responsible Officer.
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
                            <InputText keyfilter="alpha"
                                id="impact"
                                value={incident.impact || ''}
                                onChange={(e) => setIncident({ ...incident, impact: e.target.value })}
                                required
                            />
                            <small id="impact-help">
                                Enter the impact of the incident.
                            </small>
                        </div>
                    </div>
                </div>
                <div class="field col-12 md:col-4">
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="stakeholders" className="font-bold block mb-2">Stakeholders:</label>
                            <InputText keyfilter="alpha"
                                id="stakeholders"
                                value={incident.stakeholders || ''}
                                onChange={(e) => setIncident({ ...incident, stakeholders: e.target.value })}
                                required
                            />
                            <small id="impact-help">
                                Enter the stakeholders name.
                            </small>
                        </div>
                    </div>
                </div>
                <div class="field col-12 md:col-4">
                    <div className="card flex justify-content-center">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="remarks" className="font-bold block mb-2">Remarks:</label>
                            <InputTextarea autoResize keyfilter="alpha"
                                id="remarks"
                                value={incident.remarks || ''}
                                onChange={(e) => setIncident({ ...incident, remarks: e.target.value })}
                                required
                            />
                            <small id="remarks-help">
                                Enter the remarks of the incident.
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